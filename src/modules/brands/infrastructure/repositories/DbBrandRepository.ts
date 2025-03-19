import { Brand, BrandRequest } from '../../domain/entities/Brand'
import { BrandRepository } from '../../domain/interfaces/BrandRepository'
import pool from '../../../shared/domain/PgClient'
export class DbBrandRepository implements BrandRepository {
  async findAll (): Promise<Brand[]> {
    const data = await pool.query(`SELECT b.id, b.name, ROUND(AVG(m.average_price)) average_price
      FROM public.brand b LEFT JOIN
      public.model m on b.id = m.brand_id GROUP BY b.id ORDER BY b.id ASC`)

    return data.rows
  }

  async create (brand: BrandRequest): Promise<void> {
    await pool.query('INSERT INTO public.brand (name) VALUES ($1)', [brand.name])
  }
}
