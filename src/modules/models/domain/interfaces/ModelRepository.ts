import { Model, ModelRequest } from '../entities/Model'

export interface ModelRepository {
  findByBrandId: (brandId: string) => Promise<Model[]>
  create: (model: ModelRequest) => Promise<void>
  findAll: (greaterThan: number | null, lessThan: number | null) => Promise<Model[]>
  update: (model: ModelRequest) => Promise<void>
}
