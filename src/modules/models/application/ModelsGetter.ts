import { Model, ModelResponse } from '../domain/entities/Model'
import { ModelRepository } from '../domain/interfaces/ModelRepository'

export class ModelsGetter {
  constructor (private readonly repository: ModelRepository) {}

  async getByBrandId (brandId: string): Promise<ModelResponse[]> {
    const data = await this.repository.findByBrandId(brandId)
    return this.mapModelResponse(data)
  }

  mapModelResponse (models: Model[]): ModelResponse[] {
    return models.map((model) => ({
      id: model.id,
      name: model.name,
      average_price: Number(model.average_price)
    }))
  }
}
