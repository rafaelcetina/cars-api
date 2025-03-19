import { Request, Response } from 'express'
import { ModelContainer } from '../modules/models/infrastructure/ModelContainer'
import { CreateModelDto, ModelRequest, ModelResponse, UpdateModelDto } from '../modules/models/domain/entities/Model'
import { validate } from 'class-validator'

export class ModelController {
  private readonly getModels = ModelContainer.modelsGetter()

  async getByBrandId (_req: Request, res: Response): Promise<Response<ModelResponse[]>> {
    const models = await this.getModels.getByBrandId(_req.params.id)

    if (models === null || models.length === 0) {
      return res.status(404).json({ message: 'Models not found' })
    }

    return res.status(200).json(models)
  }

  async getAll (_req: Request, res: Response): Promise<Response<ModelResponse[]>> {
    let lessThan = null
    let greaterThan = null

    if (_req.query.greater !== undefined) {
      const greaterThanRequest = Number(_req.query.greater)
      if (isNaN(greaterThanRequest)) {
        return res.status(400).json({ message: 'Invalid query parameter: greater' })
      }
      greaterThan = greaterThanRequest
    }

    if (_req.query.lower !== undefined) {
      const lessThanRequest = Number(_req.query.lower)
      if (isNaN(lessThanRequest)) {
        return res.status(400).json({ message: 'Invalid query parameter: lower' })
      }
      lessThan = lessThanRequest
    }
    try {
      const models = await this.getModels.getAll(greaterThan, lessThan)
      if (models === null || models.length === 0) {
        return res.status(404).json({ message: 'Models not found' })
      }
      return res.status(200).json(models)
    } catch (error: any) {
      return res.status(400).json({ message: 'Error getting Models', detail: error.message })
    }
  }

  async create (req: Request, res: Response): Promise<Response> {
    const brandId = Number(req.params.id)

    const dto = Object.assign(new CreateModelDto(), { ...req.body, brand_id: brandId })
    const errors = await validate(dto)

    if (errors.length > 0) {
      return res.status(400).json({ errors })
    }
    try {
      await ModelContainer.modelsCreator().create(dto as ModelRequest)
    } catch (error: any) {
      return res.status(400).json({ message: 'Error creating Model', detail: error.detail })
    }

    return res.status(201).json({ message: 'Model created' })
  }

  async update (_req: Request, _res: Response): Promise<Response> {
    const modelId = Number(_req.params.id)
    const dto = Object.assign(new UpdateModelDto(), { ..._req.body, id: modelId })
    const errors = await validate(dto)

    if (errors.length > 0) {
      return _res.status(400).json({ errors })
    }

    try {
      await ModelContainer.modelsCreator().update(dto as ModelRequest)
      return _res.status(200).json({ message: 'Model updated' })
    } catch (error: any) {
      return _res.status(400).json({ message: 'Error updating Model', detail: error.detail })
    }
  }
}
