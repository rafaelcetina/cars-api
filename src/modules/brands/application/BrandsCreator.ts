import { BrandRequest } from '../domain/entities/Brand'
import { BrandRepository } from '../domain/interfaces/BrandRepository'

export class BrandsCreator {
  constructor (private readonly repository: BrandRepository) {}

  async create (brand: BrandRequest): Promise<void> {
    return await this.repository.create(brand)
  }
}
