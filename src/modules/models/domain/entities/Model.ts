import { IsNumber, IsOptional, IsString, Min } from 'class-validator'

export class CreateModelDto {
  @IsString()
  name!: string

  @IsNumber()
  brand_id!: number

  @IsNumber()
  @Min(100000)
  @IsOptional()
  average_price!: number
}
export class Model {
  constructor (
    public readonly id: string,
    public name: string,
    public average_price: number,
    public brand_id: string
  ) {}
}

export interface ModelRequest {
  name: string
  average_price: number
  brand_id: string
}

export interface ModelResponse {
  id: string
  name: string
  average_price: number
}
