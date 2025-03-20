# Prueba Técnica para Nexu

### Api Marcas y Modelos 🎉

#### 📱 Aplicación Web, elaborada para la prueba técnica.

Decidí utilizar Clean Architecture para separar la aplicación en módulos que permitan escalar y mejorar el mantenimiento de la aplicación.

Use Express para desarrollar los endpoints requeridos

Con Clean Architecture tenemos los beneficios de poder cambiar implementaciones de código de manera sencilla, además de poder hacer testing de mejor manera.

El manejador de base de datos <b>PostgreSql</b> el cuál se encuentra encapsulado en la misma Arquitectura.

El sitio es publicado en Producción gracias al servicio de <b>Render.com</b>, el cuál es gratuito para sitios estáticos, el enlace se encuentra en la descripción de este repositorio.

### Nota
Debido a que es un servidor gratuito, por ahora, el servidor se detiene después de 15 minutos de inactividad. Si el servicio tarda en responder, es porque no ha recibido peticiones en los últimos 15 minutos

## Rutas

| Path | Method | Description | Parameters / Body
| --- | --- | --- | --- |
| `/brands` | GET | List all **brands** |
| `/brands/:id/models` | GET | List all **models** given brand | `id` ID of an Object returned from /brands |
| `/brands` | POST | Add new **brand** | `name` string for brand name |
| `/brands/:id/models` | POST | Add model given **brand** id | `id` ID of an Object returned from /brands. `name` string for brand name. Optional: `average_price` amount of average price for model|
| `/models/:id` | PUT | Modify **model** attributes | `id` ID of an Model. `average_price` amount of average price for model|
| `/models?greater=&lower=` | GET | List **models** | Optional: `greater` amount of average_price greater than. Optional:`lower` amount of average_price lower than |


### Request examples

```jsonc
// POST /brands
{
  "name": "Toyota"
}
```

```jsonc
// POST /brands/1/models
{
  "name": "Prius",
  "average_price": 406400
}
```

```jsonc
// PUT /models/33
{
  "average_price": 506400
}
```
` # GET /models?greater=380000&lower=400000 `



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

### Correr Tests unitarios JEST

```sh
npm run test
```

## Conclusiones y observaciones
El endpoint
`
PUT /models/:id
`
Lo cambiaría por PATCH al no ser un cambio del modelo completo, no requiere que sea PUT

El response de ejemplo en la lista de Brands: El campo dice 'nombre' pero en realidad es 'name'


Con algo más de tiempo podriamos agregar Swagger al proyecto para tener Documentación

## 🧑‍💻 Author

- [@rafaelcetina](https://www.github.com/rafalcetina)
