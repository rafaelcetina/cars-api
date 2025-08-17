import {
  Recommendation,
  RecommendationRequest,
} from '../entities/Recommendation';

export interface RecommendationRepository {
  findByBrandId(brandId: string): Promise<Recommendation[]>;
  findByBrandAndModel(
    brandId: string,
    modelId: string
  ): Promise<Recommendation | null>;
  create(recommendation: RecommendationRequest): Promise<void>;
  exists(brandId: string, modelId?: string): Promise<boolean>;
}
