import { RecommendationRepository } from '../domain/interfaces/RecommendationRepository';
import { Recommendation } from '../domain/entities/Recommendation';

export class RecommendationsGetter {
  constructor(
    private readonly recommendationRepository: RecommendationRepository
  ) {}

  async getByBrandId(brandId: string): Promise<Recommendation[]> {
    return await this.recommendationRepository.findByBrandId(brandId);
  }

  async getByBrandAndModel(
    brandId: string,
    modelId: string
  ): Promise<Recommendation | null> {
    return await this.recommendationRepository.findByBrandAndModel(
      brandId,
      modelId
    );
  }
}
