import { Model } from '../../domain/entities/Model'
import { ModelRepository } from '../../domain/interfaces/ModelRepository'
import pool from '../../../shared/domain/PgClient'
export class DbModelRepository implements ModelRepository {
  async findByBrandId (brandId: string): Promise<Model[]> {
    const data = await pool.query(`SELECT * FROM public.model WHERE brand_id = $1
      ORDER BY id ASC`, [brandId])

    return data.rows
  }
}
