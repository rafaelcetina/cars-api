import { ModelsGetter } from '../application/ModelsGetter'
import { DbModelRepository } from './repositories/DbModelRepository'
import { ModelRepository } from '../domain/interfaces/ModelRepository'
import { ModelsCreator } from '../application/ModelsCreator'

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
class ModelContainer {
  // aqui se elige el repositorio a usar
  private static readonly _modelRepository = new DbModelRepository()

  static getModelRepository (): ModelRepository {
    return this._modelRepository
  }

  static modelsGetter (): ModelsGetter {
    return new ModelsGetter(this.getModelRepository())
  }

  static modelsCreator (): ModelsCreator {
    return new ModelsCreator(this.getModelRepository())
  }
}

export { ModelContainer }
