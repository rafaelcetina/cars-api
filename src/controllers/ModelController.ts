import { Request, Response } from 'express'
import { ModelContainer } from '../modules/models/infrastructure/ModelContainer'
import { ModelResponse } from '../modules/models/domain/entities/Model'

export class ModelController {
  private readonly getModels = ModelContainer.modelsGetter()

  async getByBrandId (_req: Request, res: Response): Promise<Response<ModelResponse[]>> {
    const models = await this.getModels.getByBrandId(_req.params.id)

    if (models === null || models.length === 0) {
      return res.status(404).json({ message: 'Models not found' })
    }

    return res.status(200).json(models)
  }
}
