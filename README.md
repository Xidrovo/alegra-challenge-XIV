# Aplicación Desafío de Alegra!

Bienvenido a la **Carrera de Imágenes de Alegra**, una aplicación dinámica donde los vendedores compiten por mostrar su mejor imagen a los clientes. ¿Están listos para destacarse y llegar entre los primeros? Solo necesitan adquirir 20 puntos, y cada votación otorga 1 punto. ¡Prueba la demo y participa en la diversión!

## Demo

Visita [alegra-xiv.surge.sh](https://alegra-xiv.surge.sh) para probar la demo en vivo.

## Acerca del Proyecto

Esta aplicación invita a los vendedores a aportar con su mejor imagen para el deleite de los clientes. El objetivo es sencillo: alcanzar los 20 puntos a través de las votaciones de los usuarios. Cada voto es un paso adelante hacia la victoria.

## Stack Tecnológico

Este proyecto ha sido desarrollado utilizando un poderoso conjunto de tecnologías modernas, asegurando una experiencia de usuario fluida y una arquitectura robusta:

![Nuxt.js](https://img.shields.io/badge/-Nuxt.js-00DC82?style=for-the-badge&logo=nuxt.js&logoColor=white)
![Vue 3](https://img.shields.io/badge/-Vue%203-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/-Tailwind%20CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

- **Nuxt.js**: Un framework intuitivo basado en Vue que simplifica el desarrollo web, proporcionando una estructura clara y herramientas poderosas.
- **Vue 3**: La última versión de Vue, el framework progresivo para construir interfaces de usuario, que trae composición API, mejor rendimiento y más.
- **Tailwind CSS**: Un framework CSS de utilidad primera que permite un diseño rápido y responsivo con clases personalizables directamente en el marcado.

### Servicios Utilizados

La aplicación hace uso de dos servicios clave para su funcionamiento:

1. **Unsplash API**: Para obtener una amplia gama de imágenes de alta calidad. Esta API ofrece acceso a miles de fotos proporcionadas por fotógrafos de todo el mundo, permitiéndonos mostrar las mejores imágenes a nuestros usuarios.

2. **Alegra API**: Utilizamos dos endpoints principales de Alegra:
   - `GET /sellers`: Para obtener la lista de vendedores participantes.
   - `POST /invoices`: Para crear facturas asociadas a las compras de los usuarios en la plataforma.

## Instalación

Para instalar y ejecutar el proyecto en tu entorno local, sigue estos pasos:

### Requisitos Previos

Asegúrate de tener instalado [Node.js](https://nodejs.org/) (que incluye npm) en tu sistema.

### Pasos

1. Clona el repositorio en tu máquina local:
   ```bash
   git clone git@github.com:Xidrovo/alegra-challenge-XIV.git
   cd alegra-challenge-XIV
   ```
2. Instala las dependencias del proyecto:
   ```bash
   npm install
   ```
3. Ejecuta el proyecto en modo desarrollo:
   ```bash
   npm run dev
   ```
