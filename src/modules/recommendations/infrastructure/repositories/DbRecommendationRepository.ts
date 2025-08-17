import {
  Recommendation,
  RecommendationRequest,
} from '../../domain/entities/Recommendation';
import { RecommendationRepository } from '../../domain/interfaces/RecommendationRepository';
import pool from '../../../shared/domain/PgClient';

export class DbRecommendationRepository implements RecommendationRepository {
  async findByBrandId(brandId: string): Promise<Recommendation[]> {
    const data = await pool.query(
      `SELECT id, brand_id, model_id, content, created_at 
       FROM public.recommendation 
       WHERE brand_id = $1 
       ORDER BY created_at DESC`,
      [brandId]
    );

    return data.rows.map(
      (row) =>
        new Recommendation(
          row.id.toString(),
          row.brand_id.toString(),
          row.model_id ? row.model_id.toString() : undefined,
          row.content,
          row.created_at
        )
    );
  }

  async findByBrandAndModel(
    brandId: string,
    modelId: string
  ): Promise<Recommendation | null> {
    const data = await pool.query(
      `SELECT id, brand_id, model_id, content, created_at 
       FROM public.recommendation 
       WHERE brand_id = $1 AND model_id = $2`,
      [brandId, modelId]
    );

    if (data.rows.length === 0) {
      return null;
    }

    const row = data.rows[0];
    return new Recommendation(
      row.id.toString(),
      row.brand_id.toString(),
      row.model_id.toString(),
      row.content,
      row.created_at
    );
  }

  async create(recommendation: RecommendationRequest): Promise<void> {
    if (recommendation.model_id) {
      await pool.query(
        'INSERT INTO public.recommendation (brand_id, model_id, content) VALUES ($1, $2, $3)',
        [
          recommendation.brand_id,
          recommendation.model_id,
          recommendation.content,
        ]
      );
    } else {
      await pool.query(
        'INSERT INTO public.recommendation (brand_id, content) VALUES ($1, $2)',
        [recommendation.brand_id, recommendation.content]
      );
    }
  }

  async exists(brandId: string, modelId?: string): Promise<boolean> {
    let query: string;
    let params: any[];

    if (modelId) {
      query =
        'SELECT COUNT(*) FROM public.recommendation WHERE brand_id = $1 AND model_id = $2';
      params = [brandId, modelId];
    } else {
      query =
        'SELECT COUNT(*) FROM public.recommendation WHERE brand_id = $1 AND model_id IS NULL';
      params = [brandId];
    }

    const result = await pool.query(query, params);
    return parseInt(result.rows[0].count) > 0;
  }
}
