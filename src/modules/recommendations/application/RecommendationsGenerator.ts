import { RecommendationRepository } from '../domain/interfaces/RecommendationRepository'
import { AIService } from '../domain/services/AIService'
import { BrandRepository } from '../../brands/domain/interfaces/BrandRepository'
import { ModelRepository } from '../../models/domain/interfaces/ModelRepository'

export class RecommendationsGenerator {
  constructor(
    private readonly recommendationRepository: RecommendationRepository,
    private readonly aiService: AIService,
    private readonly brandRepository: BrandRepository,
    private readonly modelRepository: ModelRepository,
  ) {}

  async generateForBrand(brandId: string): Promise<string> {
    // Verificar si ya existe una recomendación para esta marca
    const exists = await this.recommendationRepository.exists(brandId)
    if (exists) {
      const recommendations =
        await this.recommendationRepository.findByBrandId(brandId)
      return recommendations[0].content
    }

    // Obtener información de la marca
    const brands = await this.brandRepository.findAll()
    const brand = brands.find((b) => b.id === brandId)
    if (!brand) {
      throw new Error('Brand not found')
    }

    // Generar recomendación con IA
    const recommendation = await this.aiService.generateRecommendation(
      brand.name,
      undefined,
      brand.average_price,
    )

    // Guardar en base de datos
    await this.recommendationRepository.create({
      brand_id: parseInt(brandId),
      content: recommendation,
    })

    return recommendation
  }

  async generateForModel(brandId: string, modelId: string): Promise<string> {
    // Verificar si ya existe una recomendación para este modelo
    const exists = await this.recommendationRepository.exists(brandId, modelId)
    if (exists) {
      const recommendation =
        await this.recommendationRepository.findByBrandAndModel(
          brandId,
          modelId,
        )
      return recommendation!.content
    }

    // Obtener información de la marca y modelo
    const brands = await this.brandRepository.findAll()
    const brand = brands.find((b) => Number(b.id) === Number(brandId))

    if (!brand) {
      throw new Error('Brand not found')
    }

    const models = await this.modelRepository.findAll(null, null)
    const model = models.find(
      (m) =>
        Number(m.id) === Number(modelId) &&
        Number(m.brand_id) === Number(brandId),
    )
    if (!model) {
      throw new Error('Model not found for this brand')
    }

    // Generar recomendación con IA
    const recommendation = await this.aiService.generateRecommendation(
      brand.name,
      model.name,
      model.average_price,
    )

    // Guardar en base de datos
    await this.recommendationRepository.create({
      brand_id: parseInt(brandId),
      model_id: parseInt(modelId),
      content: recommendation,
    })

    return recommendation
  }
}
