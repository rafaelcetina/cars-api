import { Request, Response } from 'express'
import { BrandContainer } from '../modules/brands/infrastructure/BrandContainer'
import {
  Brand,
  BrandRequest,
  CreateBrandDto,
} from '../modules/brands/domain/entities/Brand'
import { validate } from 'class-validator'

export class BrandController {
  // private getAllBrands = DIContainer.getGetAllBooksUseCase();
  private readonly getAllBrands = BrandContainer.brandsGetter()

  async getAll(_req: Request, res: Response): Promise<Response<Brand[]>> {
    const brands = await this.getAllBrands.get()

    return res.status(200).json(brands)
  }

  async create(req: Request, res: Response): Promise<Response> {
    const dto = Object.assign(new CreateBrandDto(), req.body)
    const errors = await validate(dto)

    if (errors.length > 0) {
      return res.status(400).json({ errors })
    }
    try {
      await BrandContainer.brandsCreator().create(dto as BrandRequest)
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: 'Error creating brand', detail: error.detail })
    }

    return res.status(201).json({ message: 'Brand created' })
  }
}
