import { Model } from '../entities/Model'

export interface ModelRepository {
  findByBrandId: (brandId: string) => Promise<Model[]>
}
