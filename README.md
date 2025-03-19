# Prueba Técnica para Nexu

### Api Marcas y Modelos 🎉

#### 📱 Aplicación Web, elaborada para la prueba técnica.

Decidí utilizar Clean Architecture para separar la aplicación en módulos que permitan escalar y mejorar el mantenimiento de la aplicación.

Use Express para desarrollar los endpoints requeridos

Con Clean Architecture tenemos los beneficios de poder cambiar implementaciones de código de manera sencilla, además de poder hacer testing de mejor manera.

El manejador de base de datos <b>PostgreSql</b> el cuál se encuentra encapsulado en la misma Arquitectura.

El sitio es publicado en Producción gracias al servicio de <b>Render.com</b>, el cuál es gratuito para sitios estáticos, el enlace se encuentra en la descripción de este repositorio.

## 📄 Stack

- NodeJS
- Typescript
- PostgreSql
- Clean Architecture ✨

## 👷 Configuración del proyecto

### Dump de la base de datos

En este archivo

`database.sql`

Se encuentran los scripts para crear las tablas, además de algunos scripts para agregar permisos al usuario que se conectará.

En este archivo

`dump.js`

Se ejecuta para hacer el llenado de las tablas con la información en el JSON

`models.json`

(Observación: tenía un registro duplicado)

### Ejecutar el dump

`
node dump.js
`

### Instalar dependencias

```sh
npm install
```

### Iniciar el proyecto en modo desarrollo (🧐 configura tus variables de entorno)

```sh
npm dev
```

### Revisión de tipos, compilación y compresión para Producción

```sh
npm build
```

## 🧑‍💻 Author

- [@rafaelcetina](https://www.github.com/rafalcetina)
