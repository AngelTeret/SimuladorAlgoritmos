# Simulador de Planificación de Procesos

## Descripción del Proyecto
Este proyecto es un simulador interactivo que representa la gestión de procesos en un sistema operativo, implementando **algoritmos de planificación de CPU** expropiativos y no expropiativos.  
Permite crear procesos manualmente o usar procesos de ejemplo, definiendo su tiempo en CPU, instante de llegada y quantum (cuando aplica). El simulador muestra cómo los procesos se ejecutan según el algoritmo seleccionado.

El simulador incluye:
- Elección de algoritmo de planificación: FCFS, SJF, SRTF, Round Robin.
- Visualización de la cola de procesos listos y del proceso en ejecución.
- Historial de procesos ejecutados con tiempos de inicio, fin, turnaround y espera.
- Gantt Chart en tiempo real para visualizar la ejecución de procesos.
- Control de simulación: iniciar, pausar y reiniciar.
- Asignación automática de PID y colores para cada proceso.
- Generación de procesos de ejemplo y posibilidad de agregar procesos manuales.

---

## Tecnologías Utilizadas
- HTML → Estructura de la interfaz y elementos del simulador.
- CSS → Estilos y diseño responsivo.
- JavaScript → Lógica de simulación, algoritmos de planificación, animaciones y actualización en tiempo real.

Nota: Se utilizó **JavaScript puro**, sin frameworks ni librerías externas.

---

## Instalación y Uso

### 1. Clonar el Repositorio
```bash
git clone https://github.com/AngelTeret/SimuladorAlgoritmos
```

### 2. Abrir el Proyecto
- Ubicarse en la carpeta clonada:
```bash
cd SimuladorAlgoritmos
```
- Abrir el archivo `index.html` en cualquier navegador moderno (Chrome, Firefox, Edge, etc.).

### 3. Uso del Simulador
1. **Agregar un proceso manualmente**  
   - Ingresar un nombre (opcional).  
   - Definir tiempo en CPU (burst).  
   - Indicar instante de llegada.  
   - Definir quantum si se usa Round Robin.  
   - Presionar "Agregar Proceso".

2. **Agregar procesos de ejemplo**  
   - Presionar "Agregar Procesos de Ejemplo" para cargar automáticamente un conjunto de procesos predeterminados.

3. **Control de simulación**  
   - **Iniciar**: comienza la simulación.  
   - **Pausar/Resume**: pausa o reanuda la simulación.  
   - **Reiniciar**: reinicia la simulación y los estados de los procesos.

4. **Visualización**  
   - **CPU actual**: muestra el proceso que se está ejecutando y su tiempo restante.  
   - **Cola de listos**: lista de procesos que esperan su turno.  
   - **Historial**: muestra los tiempos de inicio, fin, turnaround y espera de cada proceso.  
   - **Gantt Chart**: diagrama que representa gráficamente la ejecución de los procesos.

---

## Capturas de Pantalla del Funcionamiento
Imágenes alojadas en Google Drive en los siguientes enlaces:

- [Vista General del Simulador](https://drive.google.com/drive/folders/1sHdWfEuunckYnO1qj8WFGDXqI1uRekJP?usp=sharing)  
- [Cola de Procesos y CPU](https://drive.google.com/drive/folders/1eUkPel3pEN3w7CPmYx4YuRoPKRsRLmBp?usp=sharing)  
- [Gantt Chart y Historial](https://drive.google.com/drive/folders/1r7E6IJdMCyojWOmeKibzv2YV8QslhhPT?usp=sharing)

---

## Autor
Proyecto desarrollado por el **grupo No.4**, según los requerimientos del Proyecto 2 del curso de Sistemas Operativos.
