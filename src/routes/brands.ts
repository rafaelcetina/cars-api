/* eslint-disable @typescript-eslint/no-floating-promises */
import express from 'express'
import { BrandController } from '../controllers/BrandController'
import { ModelController } from '../controllers/ModelController'

const router = express.Router()

const brandController = new BrandController()
const modelController = new ModelController()
router.get('/', (_req, res) => {
  brandController.getAll(_req, res)
})

router.get('/:id/models', (_req, res) => {
  modelController.getByBrandId(_req, res)
})

router.post('/', (req, res) => {
  brandController.create(req, res)
})

export { router as brandRoutes }
