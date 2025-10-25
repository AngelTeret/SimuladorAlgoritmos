# Simulador de Procesos — Algoritmos de Planificación

## Descripción del Proyecto
Este proyecto es un **simulador interactivo de planificación de procesos**, que representa cómo un sistema operativo gestiona la ejecución de procesos mediante distintos **algoritmos de planificación de CPU**.  

El sistema permite agregar procesos, definir sus tiempos de llegada y ráfagas de CPU, y observar su ejecución visualmente bajo diferentes políticas de planificación.  
Cada unidad de tiempo equivale a **3 segundos**, lo que facilita observar el comportamiento del CPU y la cola de listos en tiempo real.

El simulador incluye:
- Implementación de los algoritmos **FCFS (First Come, First Served)**, **SJF (Shortest Job First)** y **Round Robin**.  
- Control del tiempo de simulación (cada unidad = 3 segundos).  
- Visualización dinámica del proceso en ejecución y la cola de listos.  
- Ejecución con distintos algoritmos reutilizando los mismos procesos cargados.  
- Presentación de la **tabla de eficiencia** con tiempos de espera, retorno y el proceso más eficiente.  
- Configuración del **quantum** para Round Robin.  

---

## Tecnologías Utilizadas
- **JavaScript** → Lógica principal del simulador y control de los algoritmos de planificación.  
- **HTML5** → Estructura del entorno visual e interfaz de usuario.  
- **CSS3** → Diseño, colores y animaciones del simulador.  
- **DOM Manipulation & setTimeout / setInterval** → Control del tiempo y simulación paso a paso.  

El proyecto fue desarrollado **como aplicación web**, sin necesidad de instalar software adicional ni usar frameworks externos.

---

## Instalación y Uso

### 1. Clonar el Repositorio
```bash
git clone https://github.com/AngelTeret/SimuladorAlgoritmos
```

### 2. Abrir el Proyecto
- Abrir la carpeta del proyecto con tu editor preferido (**VS Code**, **Sublime Text**, etc.).  
- No requiere compilación. Solo abre el archivo **`index.html`** en tu navegador.  

### 3. Uso del Simulador

1. **Agregar procesos manualmente**  
   - Ingresar el **nombre del proceso**, su **instante de llegada** y **tiempo en CPU**.  
   - Presionar el botón **“Agregar Proceso”** antes de iniciar la simulación.

2. **Seleccionar algoritmo de planificación**  
   - Elegir entre **FCFS**, **SJF** o **Round Robin**.  
   - Si se selecciona Round Robin, ingresar el **valor del quantum**.

3. **Iniciar simulación**  
   - Presionar **“Iniciar”** para comenzar la ejecución.  
   - Cada unidad de tiempo dura **3 segundos**, permitiendo observar la ejecución paso a paso.

4. **Visualización y resultados**  
   - Se muestra en pantalla el proceso actual en ejecución, la cola de listos y los tiempos restantes.  
   - Al finalizar, se despliega la **tabla de eficiencia**, destacando el proceso más eficiente.  
   - Es posible **reiniciar o ejecutar otro algoritmo** reutilizando los mismos procesos cargados.

---

## Capturas de Pantalla del Funcionamiento
Imágenes alojadas en Google Drive en los siguientes enlaces:

- [Vista general del simulador](https://drive.google.com/drive/folders/1Oy5E4EJfTDH_EoZOwk5iCranLGzYkEq6?usp=sharing)  
- [Ejecución FCFS y cola de procesos](https://drive.google.com/drive/folders/1AY3Vt_kykpM8u8netQ0ggp3LMH-hUVB0?usp=sharing)  
- [Tabla de eficiencia y algoritmo Round Robin](https://drive.google.com/drive/folders/1iXTLuSTEltw822aS4AOtkJWvSrMuHz0q?usp=sharing)  

---

## Autor
Proyecto desarrollado por el **Grupo No. 4**, como parte del **Proyecto Final de Sistemas Operativos**. 

