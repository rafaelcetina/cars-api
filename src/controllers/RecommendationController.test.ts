import { RecommendationController } from './RecommendationController'
import { Request, Response } from 'express'

// Mock de las dependencias
jest.mock(
  '../modules/recommendations/infrastructure/RecommendationContainer',
  () => ({
    RecommendationContainer: {
      recommendationsGenerator: jest.fn(() => ({
        generateForBrand: jest
          .fn()
          .mockResolvedValue('Mock recommendation for brand'),
        generateForModel: jest
          .fn()
          .mockResolvedValue('Mock recommendation for model'),
      })),
      recommendationsGetter: jest.fn(() => ({
        getByBrandId: jest.fn().mockResolvedValue([
          {
            id: '1',
            brand_id: '1',
            content: 'Mock recommendation',
            created_at: new Date(),
          },
        ]),
        getByBrandAndModel: jest.fn().mockResolvedValue({
          id: '1',
          brand_id: '1',
          model_id: '1',
          content: 'Mock recommendation',
          created_at: new Date(),
        }),
      })),
    },
  }),
)

describe('RecommendationController', () => {
  let controller: RecommendationController
  let mockRequest: Partial<Request>
  let mockResponse: Partial<Response>
  let mockJson: jest.Mock

  beforeEach(() => {
    controller = new RecommendationController()
    mockJson = jest.fn()
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: mockJson,
    }
  })

  describe('generateForBrand', () => {
    it('should generate recommendation for brand successfully', async () => {
      mockRequest = {
        params: { brandId: '1' },
      }

      await controller.generateForBrand(
        mockRequest as Request,
        mockResponse as Response,
      )

      expect(mockResponse.status).toHaveBeenCalledWith(200)
      expect(mockJson).toHaveBeenCalledWith({
        success: true,
        data: {
          brand_id: '1',
          recommendation: 'Mock recommendation for brand',
        },
      })
    })

    it('should return error when brandId is missing', async () => {
      mockRequest = {
        params: {},
      }

      await controller.generateForBrand(
        mockRequest as Request,
        mockResponse as Response,
      )

      expect(mockResponse.status).toHaveBeenCalledWith(400)
      expect(mockJson).toHaveBeenCalledWith({
        message: 'Brand ID is required',
      })
    })
  })

  describe('generateForModel', () => {
    it('should generate recommendation for model successfully', async () => {
      mockRequest = {
        params: { brandId: '1', modelId: '1' },
      }

      await controller.generateForModel(
        mockRequest as Request,
        mockResponse as Response,
      )

      expect(mockResponse.status).toHaveBeenCalledWith(200)
      expect(mockJson).toHaveBeenCalledWith({
        success: true,
        data: {
          brand_id: '1',
          model_id: '1',
          recommendation: 'Mock recommendation for model',
        },
      })
    })

    it('should return error when brandId or modelId is missing', async () => {
      mockRequest = {
        params: { brandId: '1' },
      }

      await controller.generateForModel(
        mockRequest as Request,
        mockResponse as Response,
      )

      expect(mockResponse.status).toHaveBeenCalledWith(400)
      expect(mockJson).toHaveBeenCalledWith({
        message: 'Brand ID and Model ID are required',
      })
    })
  })
})
