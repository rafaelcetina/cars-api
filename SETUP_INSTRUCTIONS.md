# Configuración del Sistema de Recomendaciones con IA

## 🚀 Funcionalidad Implementada

He creado un sistema completo de recomendaciones con IA para tu API de autos que incluye:

### ✨ Características Principales

1. **Generación de Recomendaciones con IA**: Integración con OpenAI para generar recomendaciones personalizadas
2. **Cache Inteligente**: Las recomendaciones se generan solo una vez y se almacenan en la base de datos
3. **Recomendaciones por Marca y Modelo**: Soporte para recomendaciones específicas de marcas y modelos
4. **Fallback System**: Si la API de IA falla, genera recomendaciones básicas
5. **Arquitectura Limpia**: Sigue los principios de Clean Architecture con separación de responsabilidades

### 📁 Estructura del Proyecto

```
src/modules/recommendations/
├── application/
│   ├── RecommendationsGenerator.ts    # Lógica de generación de recomendaciones
│   └── RecommendationsGetter.ts       # Lógica de obtención de recomendaciones
├── domain/
│   ├── entities/
│   │   └── Recommendation.ts          # Entidad de recomendación
│   ├── interfaces/
│   │   └── RecommendationRepository.ts # Interfaz del repositorio
│   └── services/
│       └── AIService.ts               # Servicio de IA (OpenAI)
└── infrastructure/
    ├── RecommendationContainer.ts     # Contenedor de dependencias
    └── repositories/
        └── DbRecommendationRepository.ts # Repositorio de base de datos
```

## 🔧 Configuración Requerida

### 1. Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=cars_db
DB_USER=db_user
DB_PASSWORD=your_password

# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key_here

# Server Configuration
PORT=3000
NODE_ENV=development
```

### 2. Base de Datos

Ejecuta el script SQL actualizado que incluye la nueva tabla:

```bash
npm run migrate
```

### 3. Instalación de Dependencias

```bash
npm install
```

## 🌐 Endpoints Disponibles

### Generar Recomendación para una Marca

```http
POST /api/brands/:brandId/recommendation
```

**Ejemplo de respuesta:**

```json
{
  "success": true,
  "data": {
    "brand_id": "1",
    "recommendation": "Toyota es una marca reconocida por su confiabilidad y durabilidad..."
  }
}
```

### Generar Recomendación para un Modelo

```http
POST /api/brands/:brandId/models/:modelId/recommendation
```

**Ejemplo de respuesta:**

```json
{
  "success": true,
  "data": {
    "brand_id": "1",
    "model_id": "5",
    "recommendation": "El Toyota Camry ofrece una excelente combinación de confort..."
  }
}
```

### Obtener Recomendaciones de una Marca

```http
GET /api/brands/:brandId/recommendations
```

### Obtener Recomendación de un Modelo

```http
GET /api/brands/:brandId/models/:modelId/recommendation
```

## 🎯 Cómo Funciona

1. **Primera Solicitud**: Cuando se solicita una recomendación por primera vez:

   - Se verifica si ya existe en la base de datos
   - Si no existe, se genera usando OpenAI
   - Se guarda en la base de datos para futuras consultas

2. **Solicitudes Posteriores**:

   - Se devuelve la recomendación almacenada
   - No se consume la API de OpenAI nuevamente

3. **Manejo de Errores**:
   - Si OpenAI falla, se genera una recomendación básica
   - Se mantiene la funcionalidad incluso sin conexión a IA

## 🔑 Configuración de OpenAI

1. Obtén una API key de OpenAI en: https://platform.openai.com/api-keys
2. Agrega la key al archivo `.env`
3. El sistema usará GPT-3.5-turbo para generar recomendaciones

## 🧪 Pruebas

Para ejecutar las pruebas (requiere base de datos configurada):

```bash
npm test
```

## 🚀 Ejecución

```bash
# Desarrollo
npm run dev

# Producción
npm run build
npm start
```

## 📊 Beneficios

- **Eficiencia**: Recomendaciones generadas una sola vez
- **Escalabilidad**: Sistema preparado para múltiples solicitudes
- **Confiabilidad**: Fallback system para garantizar funcionamiento
- **Mantenibilidad**: Código limpio y bien estructurado
- **Flexibilidad**: Fácil de extender y modificar

## 🔮 Próximos Pasos Sugeridos

1. Configurar la base de datos PostgreSQL
2. Obtener y configurar la API key de OpenAI
3. Probar los endpoints con datos reales
4. Considerar agregar más proveedores de IA
5. Implementar métricas y monitoreo
6. Agregar autenticación si es necesario

¡El sistema está listo para usar! 🎉
