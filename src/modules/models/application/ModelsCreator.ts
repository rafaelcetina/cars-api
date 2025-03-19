import { ModelRequest } from '../domain/entities/Model'
import { ModelRepository } from '../domain/interfaces/ModelRepository'

export class ModelsCreator {
  constructor (private readonly repository: ModelRepository) {}

  async create (model: ModelRequest): Promise<void> {
    return await this.repository.create(model)
  }
}
