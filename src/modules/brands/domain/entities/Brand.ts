import { IsString } from 'class-validator'

export class CreateBrandDto {
  @IsString()
  name!: string
}

export class Brand {
  constructor (
    public readonly id: string,
    public name: string,
    public average_price?: number
  ) {}
}

export interface BrandRequest {
  name: string
}
