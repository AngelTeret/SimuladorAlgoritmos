document.addEventListener('DOMContentLoaded', () => {
  'use strict';
  const $ = id => document.getElementById(id);
  function mustHave(id) {
    const el = $(id);
    if (!el) console.error(`Elemento no encontrado en DOM: #${id}`);
    return el;
  }

  // DOM
  const pname = mustHave('pname');
  const pburst = mustHave('pburst');
  const parrival = mustHave('parrival');
  const pquantum = $('pquantum'); // opcional
  const addBtn = mustHave('addProc');
  const addSampleBtn = mustHave('addSample');
  const procTableBody = document.querySelector('#procTable tbody');
  const algorithmEl = mustHave('algorithm');
  const defaultQuantumEl = mustHave('defaultQuantum');
  const speedEl = mustHave('speed');
  const startBtn = mustHave('startBtn');
  const pauseBtn = mustHave('pauseBtn');
  const resetBtn = mustHave('resetBtn');
  const timeDisplay = mustHave('timeDisplay');
  const unitBar = mustHave('unitBar');
  const currentProcPill = mustHave('currentProcPill');
  const readyCount = mustHave('readyCount');
  const readyList = mustHave('readyList');
  const historyTableBody = document.querySelector('#historyTable tbody');
  const ganttCanvas = mustHave('gantt');
  const legendDiv = mustHave('legend');
  const procTableExample = document.querySelector('#procTableExample tbody');
  const procTableManual = document.querySelector('#procTableManual tbody');
  const clearSampleBtn = mustHave('clearSampleBtn');
  const clearManualBtn = mustHave('clearManualBtn');


  // check
  const critical = [pname,pburst,parrival,addBtn,procTableBody,algorithmEl,defaultQuantumEl,
    speedEl,startBtn,pauseBtn,resetBtn,timeDisplay,unitBar,currentProcPill,
    readyCount,readyList,historyTableBody,ganttCanvas,legendDiv, addSampleBtn];
  if (critical.some(x => !x)) {
    alert('Faltan elementos en la página. Revisa la consola (F12).');
    return;
  }

  const ctx = ganttCanvas.getContext('2d');

  // state
  let processes = [];
  let pidCounter = 1;
  let unitDuration = parseInt(speedEl.value,10) || 800;
  let algorithm = algorithmEl.value;
  let defaultQuantum = parseInt(defaultQuantumEl.value,10) || 2;
  let simTimer = null, animTimer = null, simTime = 0, current = null, readyQueue = [], isRunning = false;

  // utils
  function colorForPid(pid){
    const hue = (pid * 47) % 360;
    return `hsl(${hue} 70% 55%)`;
  }

  function resetSimulationState(){
    simTime = 0; current = null; readyQueue = []; isRunning = false;
    clearInterval(simTimer); simTimer = null; clearTimeout(animTimer); animTimer = null;
    processes.forEach(p => {
      p.remaining = p.burst; p.segments = []; p.startedAt = null; p.completedAt = null; p._rrCounter = null;
    });
    timeDisplay.textContent = `t = ${simTime}`;
    unitBar.style.transition = 'none'; unitBar.style.width = '0%';
    currentProcPill.textContent = 'CPU: --';
    historyTableBody.innerHTML = '';
    drawGantt(); renderReadyList(); renderHistory(); renderLegend();
    console.log('Simulación reiniciada.');
  }

  function addProcess(name, burst, arrival, quantum, isExample=false){
  const pid = pidCounter++;
  const p = {
    pid, name: name || `P${pid}`, burst: Math.max(1, parseInt(burst,10)),
    arrival: Math.max(0, parseInt(arrival,10)),
    remaining: Math.max(1, parseInt(burst,10)),
    quantum: quantum ? parseInt(quantum,10) : null,
    segments: [], color: colorForPid(pid),
    startedAt: null, completedAt: null,
    isExample
  };
  processes.push(p);
  processes.sort((a,b) => a.pid - b.pid);
  renderProcTables(); renderLegend();
}


  function renderProcTables() {
  procTableExample.innerHTML = '';
  procTableManual.innerHTML = '';

  processes.forEach(p => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${p.pid}</td><td>${p.name}</td><td>${p.burst}</td><td>${p.arrival}</td>`;
    
    if (p.isExample) procTableExample.appendChild(tr); 
    else procTableManual.appendChild(tr);
  });
}


  function renderLegend(){
    legendDiv.innerHTML = '';
    processes.forEach(p => {
      const div = document.createElement('div');
      div.className = 'item';
      div.innerHTML = `<div style="width:14px;height:14px;border-radius:4px;background:${p.color};margin-right:8px"></div>
                       <div style="color:var(--muted)">${p.name} (PID:${p.pid})</div>`;
      legendDiv.appendChild(div);
    });
  }

  function renderReadyList(){
    readyList.innerHTML = '';
    let nodes = [];
    if(algorithm === 'FCFS' || algorithm === 'RR'){ nodes = readyQueue.slice(); }
    else { nodes = processes.filter(p => p.remaining>0 && p.arrival <= simTime && !p.completedAt && p !== current);
           nodes.sort((a,b) => a.remaining - b.remaining || a.arrival - b.arrival || a.pid - b.pid); }
    nodes.forEach(p => {
      const d = document.createElement('div');
      d.className = 'queue-item';
      d.innerHTML = `<div style="width:10px;height:24px;background:${p.color};border-radius:4px;margin-right:8px"></div>
                    <div style="flex:1"><div style="font-weight:700">${p.name} <span style="color:var(--muted);font-weight:600">PID:${p.pid}</span></div>
                    <div style="font-size:12px;color:var(--muted)">Rem: ${p.remaining} | Arr: ${p.arrival}</div></div>`;
      readyList.appendChild(d);
    });
    readyCount.textContent = `Lista: ${nodes.length}`;
  }

  function renderHistory(){
    historyTableBody.innerHTML = '';
    const byPid = processes.slice().sort((a,b)=>a.pid-b.pid);
    byPid.forEach(p => {
      const start = p.startedAt != null ? p.startedAt : '-';
      const end = p.completedAt != null ? p.completedAt : '-';
      const turnaround = (p.completedAt != null) ? (p.completedAt - p.arrival) : '-';
      const waiting = (p.completedAt != null) ? ((p.completedAt - p.arrival) - p.burst) : '-';
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${p.pid}</td><td>${p.name}</td><td>${p.arrival}</td><td>${p.burst}</td>
                      <td>${start}</td><td>${end}</td><td>${turnaround}</td><td>${waiting}</td>`;
      historyTableBody.appendChild(tr);
    });
  }

  function drawGantt(){
    const padLeft = 80, padTop = 20, rowH = 28;
    const maxCompletion = Math.max(...processes.map(p => p.completedAt || 0), simTime);
    const totalUnits = Math.max(10, maxCompletion + 2);
    const pxPerUnit = 24;
    const rows = Math.max(6, processes.length);
    const width = Math.max(ganttCanvas.clientWidth, (totalUnits+2)*pxPerUnit + padLeft);
    const height = Math.max(220, rows * rowH + padTop + 40);
    const ratio = window.devicePixelRatio || 1;
    ganttCanvas.width = Math.floor(width * ratio);
    ganttCanvas.height = Math.floor(height * ratio);
    ganttCanvas.style.width = width + 'px';
    ganttCanvas.style.height = height + 'px';
    ctx.setTransform(ratio,0,0,ratio,0,0);
    ctx.clearRect(0,0,width,height);
    ctx.fillStyle = '#071826';
    ctx.fillRect(0,0,width,height);
    ctx.font = '12px Arial';
    ctx.fillStyle = 'rgba(255,255,255,0.08)';
    for(let u=0; u<= totalUnits; u++){
      const x = padLeft + u*pxPerUnit;
      ctx.fillRect(x, padTop, 1, height-padTop-20);
      if(u % 2 === 0){
        ctx.fillStyle = 'rgba(255,255,255,0.12)';
        ctx.fillText(String(u), x+4, padTop-6);
        ctx.fillStyle = 'rgba(255,255,255,0.08)';
      }
    }
    processes.forEach((p, idx) => {
      const y = padTop + idx*rowH;
      ctx.fillStyle = 'rgba(255,255,255,0.9)';
      ctx.fillText(`${p.name} (PID:${p.pid})`, 8, y + 18);
      p.segments.forEach(seg => {
        const sx = padLeft + seg.start * pxPerUnit;
        const w = (seg.end - seg.start) * pxPerUnit;
        const bh = rowH - 8;
        const by = y + 6;
        ctx.fillStyle = p.color;
        ctx.fillRect(sx, by, Math.max(2,w), bh);
        ctx.fillStyle = '#021014';
        ctx.fillText(`${seg.end - seg.start}`, sx + 6, by + bh/2 + 5);
      });
    });
    const markerX = padLeft + simTime * pxPerUnit;
    ctx.strokeStyle = 'rgba(255,120,80,0.9)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(markerX, padTop-4);
    ctx.lineTo(markerX, height-24);
    ctx.stroke();
  }

  });