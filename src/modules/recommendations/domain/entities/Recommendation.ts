import { IsNumber, IsOptional, IsString } from 'class-validator'

export class CreateRecommendationDto {
  @IsNumber()
  brand_id!: number

  @IsNumber()
  @IsOptional()
  model_id?: number

  @IsString()
  content!: string
}

export class Recommendation {
  constructor(
    public readonly id: string,
    public brand_id: string,
    public content: string,
    public created_at: Date,
    public model_id?: string,
  ) {}
}

export interface RecommendationRequest {
  brand_id: number
  model_id?: number
  content: string
}

export interface RecommendationResponse {
  id: string
  brand_id: string
  model_id?: string
  content: string
  created_at: Date
}
