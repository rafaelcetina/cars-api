# Sistema de Recomendaciones con IA

Este módulo agrega funcionalidad de recomendaciones generadas por IA para marcas y modelos de autos.

## Configuración

### Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

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

### Instalación de Dependencias

```bash
npm install
```

### Configuración de la Base de Datos

Ejecuta el script SQL actualizado que incluye la nueva tabla de recomendaciones:

```bash
npm run migrate
```

## Endpoints Disponibles

### Generar Recomendación para una Marca

```
POST /api/brands/:brandId/recommendation
```

**Respuesta:**

```json
{
  "success": true,
  "data": {
    "brand_id": "1",
    "recommendation": "Toyota es una marca reconocida por su confiabilidad..."
  }
}
```

### Generar Recomendación para un Modelo

```
POST /api/brands/:brandId/models/:modelId/recommendation
```

**Respuesta:**

```json
{
  "success": true,
  "data": {
    "brand_id": "1",
    "model_id": "5",
    "recommendation": "El Toyota Camry ofrece una excelente combinación..."
  }
}
```

### Obtener Recomendaciones de una Marca

```
GET /api/brands/:brandId/recommendations
```

**Respuesta:**

```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "brand_id": "1",
      "model_id": null,
      "content": "Toyota es una marca reconocida...",
      "created_at": "2024-01-15T10:30:00Z"
    }
  ]
}
```

### Obtener Recomendación de un Modelo

```
GET /api/brands/:brandId/models/:modelId/recommendation
```

**Respuesta:**

```json
{
  "success": true,
  "data": {
    "id": "2",
    "brand_id": "1",
    "model_id": "5",
    "content": "El Toyota Camry ofrece...",
    "created_at": "2024-01-15T10:35:00Z"
  }
}
```

## Características

1. **Generación Única**: Las recomendaciones se generan solo una vez y se almacenan en la base de datos
2. **Cache Inteligente**: Si ya existe una recomendación, se devuelve la existente sin generar una nueva
3. **Fallback**: Si hay problemas con la API de OpenAI, se genera una recomendación básica
4. **Contexto Rico**: Las recomendaciones incluyen información sobre precio promedio y características específicas

## Estructura del Proyecto

```
src/modules/recommendations/
├── application/
│   ├── RecommendationsGenerator.ts
│   └── RecommendationsGetter.ts
├── domain/
│   ├── entities/
│   │   └── Recommendation.ts
│   ├── interfaces/
│   │   └── RecommendationRepository.ts
│   └── services/
│       └── AIService.ts
└── infrastructure/
    ├── RecommendationContainer.ts
    └── repositories/
        └── DbRecommendationRepository.ts
```

## Uso

1. **Primera vez**: Al llamar un endpoint de generación, se creará la recomendación usando IA
2. **Siguientes veces**: Se devolverá la recomendación almacenada en la base de datos
3. **Manejo de errores**: Si la API de IA falla, se genera una recomendación básica

## Notas Importantes

- Se requiere una API key válida de OpenAI
- Las recomendaciones se generan de forma asíncrona
- El sistema es escalable y puede manejar múltiples solicitudes
- Las recomendaciones incluyen información contextual sobre precios y características
