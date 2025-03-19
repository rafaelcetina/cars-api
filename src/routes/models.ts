/* eslint-disable @typescript-eslint/no-floating-promises */
import express from 'express'
import { ModelController } from '../controllers/ModelController'

const router = express.Router()

const modelController = new ModelController()
router.get('/', (_req, res) => {
  modelController.getAll(_req, res)
})

router.put('/:id', (req, res) => {
  modelController.update(req, res)
})

export { router as modelRoutes }
