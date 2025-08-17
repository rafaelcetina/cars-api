import { Router } from 'express'
import { RecommendationController } from '../controllers/RecommendationController'

const router = Router()
const recommendationController = new RecommendationController()

// Generar recomendación para una marca
router.post(
  '/brands/:brandId/recommendation',
  recommendationController.generateForBrand.bind(recommendationController),
)

// Generar recomendación para un modelo específico
router.post(
  '/brands/:brandId/models/:modelId/recommendation',
  recommendationController.generateForModel.bind(recommendationController),
)

// Obtener recomendaciones existentes para una marca
router.get(
  '/brands/:brandId/recommendations',
  recommendationController.getByBrand.bind(recommendationController),
)

// Obtener recomendación específica para un modelo
router.get(
  '/brands/:brandId/models/:modelId/recommendation',
  recommendationController.getByBrandAndModel.bind(recommendationController),
)

export default router
