# MELI Test Práctico - Front End

## A continuación se presenta la documentación para poder instalar y utilizar la aplicación del Test Práctico de MELI para el área de front end.

## Requerimientos

- Node.js v.15.x.x
- npm v.7.x.x

Esta aplicación consiste de dos componentes:

1. Servidor Express (Node.js)
2. Cliente (React)

Antes de poder utilizar la aplicación , es necesario ejecutar el script adecuado de `setup`, según el ambiente, el cual se ubica en el directorio raíz del proyecto:

### Mac OS

```sh
sh setup.sh
```

### Windows

```sh
setup.bat
```

Este script se encarga de instalar todas las dependencias necesarias tanto para el servidor como para el cliente.

Una vez que se ejecute el script de `setup`, tanto el servidor como el cliente web estarán habilitados y listos para utilizar.

El servidor corre en el puerto `3001` y el cliente en el puerto `3000`. Asegúrate de mantener estos puertos libres antes de iniciar el proceso.

La aplicación web se puede acceder desde `http://localhost:3000`.

## Pruebas

Este proyecto cuenta con un pequeño suite de pruebas de integración y unitarias para validar ciertas funcionalidades de la aplicación.

Para ejecutar el suite de pruebas, es necesario tener habilitado ambos el servidor y el cliente. Esto puede ser a través del script `setup` correspondiente.

Una vez que esté habilitada la aplicación entera, abre una terminal y navega hacia la raiz del cliente:

```sh
cd <ubicación-de-tu-proyecto-local>/client
```

Una vez en la raíz del proyecto cliente, ingresa el siguiente comando:

```sh
npm test
```

Se deberá ejecutar el suite de pruebas y mostrar que cada una fue ejecutada de forma exitosa.
