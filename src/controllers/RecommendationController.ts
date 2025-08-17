import { Request, Response } from 'express'
import { RecommendationContainer } from '../modules/recommendations/infrastructure/RecommendationContainer'

export class RecommendationController {
  private readonly recommendationsGenerator =
    RecommendationContainer.recommendationsGenerator()
  private readonly recommendationsGetter =
    RecommendationContainer.recommendationsGetter()

  async generateForBrand(req: Request, res: Response): Promise<Response> {
    try {
      const { brandId } = req.params

      if (!brandId) {
        return res.status(400).json({ message: 'Brand ID is required' })
      }

      const recommendation =
        await this.recommendationsGenerator.generateForBrand(brandId)

      return res.status(200).json({
        success: true,
        data: {
          brand_id: brandId,
          recommendation,
        },
      })
    } catch (error: any) {
      console.error('Error generating recommendation for brand:', error)
      return res.status(500).json({
        success: false,
        message: error.message || 'Error generating recommendation',
      })
    }
  }

  async generateForModel(req: Request, res: Response): Promise<Response> {
    try {
      const { brandId, modelId } = req.params

      if (!brandId || !modelId) {
        return res
          .status(400)
          .json({ message: 'Brand ID and Model ID are required' })
      }

      const recommendation =
        await this.recommendationsGenerator.generateForModel(brandId, modelId)

      return res.status(200).json({
        success: true,
        data: {
          brand_id: brandId,
          model_id: modelId,
          recommendation,
        },
      })
    } catch (error: any) {
      console.error('Error generating recommendation for model:', error)
      return res.status(500).json({
        success: false,
        message: error.message || 'Error generating recommendation',
      })
    }
  }

  async getByBrand(req: Request, res: Response): Promise<Response> {
    try {
      const { brandId } = req.params

      if (!brandId) {
        return res.status(400).json({ message: 'Brand ID is required' })
      }

      const recommendations =
        await this.recommendationsGetter.getByBrandId(brandId)

      return res.status(200).json({
        success: true,
        data: recommendations,
      })
    } catch (error: any) {
      console.error('Error getting recommendations for brand:', error)
      return res.status(500).json({
        success: false,
        message: error.message || 'Error getting recommendations',
      })
    }
  }

  async getByBrandAndModel(req: Request, res: Response): Promise<Response> {
    try {
      const { brandId, modelId } = req.params

      if (!brandId || !modelId) {
        return res
          .status(400)
          .json({ message: 'Brand ID and Model ID are required' })
      }

      const recommendation =
        await this.recommendationsGetter.getByBrandAndModel(brandId, modelId)

      if (!recommendation) {
        return res.status(404).json({
          success: false,
          message: 'Recommendation not found',
        })
      }

      return res.status(200).json({
        success: true,
        data: recommendation,
      })
    } catch (error: any) {
      console.error('Error getting recommendation for brand and model:', error)
      return res.status(500).json({
        success: false,
        message: error.message || 'Error getting recommendation',
      })
    }
  }
}
