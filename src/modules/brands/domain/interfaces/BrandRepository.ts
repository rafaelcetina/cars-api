import { Brand, BrandRequest } from '../entities/Brand'

export interface BrandRepository {
  findAll: () => Promise<Brand[]>
  create: (brand: BrandRequest) => Promise<void>
}
