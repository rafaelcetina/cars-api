import { Brand } from '../domain/entities/Brand'
import { BrandRepository } from '../domain/interfaces/BrandRepository'

export class BrandsGetter {
  constructor (private readonly repository: BrandRepository) {}

  async get (): Promise<Brand[]> {
    const data = await this.repository.findAll()
    return this.mapBrandResponse(data)
  }

  mapBrandResponse (brands: Brand[]): Brand[] {
    return brands.map((brand) => ({
      id: brand.id,
      name: brand.name,
      average_price: Number(brand.average_price)
    }))
  }
}
