## Encontrar momento de degradación de aplicaciones
Script NodeJS que puede ser utilizado para encontrar el momento de degración de las aplicaciones que exponen endpoints http.
Consiste en ejecutar peticiones cada n tiempo variando la concurrencia, buscando identificar como varia el throughput (TPS). Puede ser utilizado para la generación de datos que permita construir este tipo de gráficas: 

![NodeJS Performance](./assets/java.png)

También es una herramienta útil cuando se quiere comparar el performance ofrecido por dos frameworks, por ejemplo comparar el momento de degradación de una aplicación NodeJS vs una aplicación Spring Boot: 

![NodeJS vs Spring](./assets/node.png)

Para la ejecución de cada punto de medición se utiliza la herramienta **Wrk**:
https://github.com/wg/wrk


## ¿Cómo empezar?

Instale la herramienta wrk:
```
brew install wrk
```

### Utilización básica
1. Abra el archivo index.js y cambie la constante apiURL por la url de la aplicación de la que desea encontrar el momento de degración. 

2. Instale dependencias 
```
npm install
```

3. Ejecute la aplicación
```
npm start
```

4. Espere la ejecución de la prueba. 

5. Los datos del resultado los puede encontrar en result.txt. Cada fila corresponde a una medición; el primer  elemento es la concurrencia utilizada, el segundo es la cantidad de tps obtenidos. 

5. Grafique utilizando una herramienta como excel (Próximamente este script tendrá la capacidad de generar gráficas propias :D)

### Utilización avanzada
El script cuenta con algunas parametrizaciones, definidas como constantes al inicio, y que usted puede variar a su gusto:  

**duration**: Tiempo de duración de cada request de medición (Por defecto está en 3 segundos cada ejecución)
**iterations**: Cantidad de ejecuciones que desea realizar (Por defecto son 1600, cada una de 3 segundos)
**threads**: Cantidad de hilos utilizados por Wrk para la ejecución del benchmark
**initialIter**: ¿Cuál es la concurrencia inicial que desea manejar?


## ¿Cómo contribuir?
Las siguientes funcionalidades están dentro del roadMap de este script: 

1. Generación automática de las gráficas basado en los resultados obtenidos en el archivo result.txt
2. Construcción de un paquete que quede disponible en la terminal como un comando independiente. El objetivo es sacar como parámetros lo que hoy son constantes dentro del script. (La distribución puede ser como imagen Docker).









