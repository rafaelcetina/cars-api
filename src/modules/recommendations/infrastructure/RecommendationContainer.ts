import { RecommendationsGenerator } from '../application/RecommendationsGenerator';
import { RecommendationsGetter } from '../application/RecommendationsGetter';
import { DbRecommendationRepository } from './repositories/DbRecommendationRepository';
import { OpenAIRecommendationService } from '../domain/services/AIService';
import { BrandContainer } from '../../brands/infrastructure/BrandContainer';
import { ModelContainer } from '../../models/infrastructure/ModelContainer';

export class RecommendationContainer {
  private static recommendationRepository: DbRecommendationRepository;
  private static aiService: OpenAIRecommendationService;
  private static recommendationsGeneratorInstance: RecommendationsGenerator;
  private static recommendationsGetterInstance: RecommendationsGetter;

  static recommendationRepositoryInstance(): DbRecommendationRepository {
    if (!this.recommendationRepository) {
      this.recommendationRepository = new DbRecommendationRepository();
    }
    return this.recommendationRepository;
  }

  static aiServiceInstance(): OpenAIRecommendationService {
    if (!this.aiService) {
      this.aiService = new OpenAIRecommendationService();
    }
    return this.aiService;
  }

  static recommendationsGenerator(): RecommendationsGenerator {
    if (!this.recommendationsGeneratorInstance) {
      this.recommendationsGeneratorInstance = new RecommendationsGenerator(
        this.recommendationRepositoryInstance(),
        this.aiServiceInstance(),
        BrandContainer.getBrandRepository(),
        ModelContainer.getModelRepository()
      );
    }
    return this.recommendationsGeneratorInstance;
  }

  static recommendationsGetter(): RecommendationsGetter {
    if (!this.recommendationsGetterInstance) {
      this.recommendationsGetterInstance = new RecommendationsGetter(
        this.recommendationRepositoryInstance()
      );
    }
    return this.recommendationsGetterInstance;
  }
}
