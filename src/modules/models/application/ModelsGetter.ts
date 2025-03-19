import { Model, ModelResponse } from '../domain/entities/Model'
import { ModelRepository } from '../domain/interfaces/ModelRepository'

export class ModelsGetter {
  constructor (private readonly repository: ModelRepository) { }

  async getByBrandId (brandId: string): Promise<ModelResponse[]> {
    const data = await this.repository.findByBrandId(brandId)
    return this.mapModelResponse(data)
  }

  async getAll (greaterThan: number | null, lessThan: number | null): Promise<ModelResponse[]> {
    if (greaterThan !== null && lessThan !== null && greaterThan >= lessThan) {
      throw new Error('greaterThan must be less than lessThan')
    }

    const data = await this.repository.findAll(greaterThan, lessThan)

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
