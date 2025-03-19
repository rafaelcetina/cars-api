import { ModelRequest } from '../domain/entities/Model'
import { ModelRepository } from '../domain/interfaces/ModelRepository'

export class ModelsCreator {
  constructor (private readonly repository: ModelRepository) {}

  async create (model: ModelRequest): Promise<void> {
    await this.repository.create(model)
  }

  async update (model: ModelRequest): Promise<void> {
    await this.repository.update(model)
  }
}
