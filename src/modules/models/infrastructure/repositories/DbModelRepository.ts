import { Model, ModelRequest } from '../../domain/entities/Model'
import { ModelRepository } from '../../domain/interfaces/ModelRepository'
import pool from '../../../shared/domain/PgClient'
export class DbModelRepository implements ModelRepository {
  async findByBrandId (brandId: string): Promise<Model[]> {
    const data = await pool.query(`SELECT * FROM public.model WHERE brand_id = $1
      ORDER BY id ASC`, [brandId])

    return data.rows
  }

  async findAll (greaterThan: number | null, lessThan: number | null): Promise<Model[]> {
    const query = `SELECT * FROM public.model
      ${greaterThan !== null ? `WHERE average_price > ${greaterThan}` : ''}
      ${greaterThan !== null && lessThan !== null ? 'AND' : ''}
      ${greaterThan === null && lessThan !== null ? 'WHERE' : ''}
      ${lessThan !== null ? `average_price < ${lessThan}` : ''}
      ORDER BY id ASC`

    const data = await pool.query(query)

    return data.rows
  }

  async create (model: ModelRequest): Promise<void> {
    await pool.query('INSERT INTO public.model (name, average_price, brand_id) VALUES ($1, $2, $3)',
      [model.name, model.average_price, model.brand_id])
  }

  async update (model: ModelRequest): Promise<void> {
    await pool.query('UPDATE public.model SET average_price = $1 WHERE id = $2',
      [model.average_price, model.id])
  }
}
