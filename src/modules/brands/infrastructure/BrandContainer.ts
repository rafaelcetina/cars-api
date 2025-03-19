import { BrandsCreator } from '../application/BrandsCreator'
import { BrandsGetter } from '../application/BrandsGetter'
import { BrandRepository } from '../domain/interfaces/BrandRepository'
import { DbBrandRepository } from './repositories/DbBrandRepository'

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
class BrandContainer {
  // aqui se elige el repositorio a usar
  private static readonly _brandRepository = new DbBrandRepository()

  static getBrandRepository (): BrandRepository {
    return this._brandRepository
  }

  static brandsGetter (): BrandsGetter {
    return new BrandsGetter(this.getBrandRepository())
  }

  static brandsCreator (): BrandsCreator {
    return new BrandsCreator(this.getBrandRepository())
  }
}

export { BrandContainer }
