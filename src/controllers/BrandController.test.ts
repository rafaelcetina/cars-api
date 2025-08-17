/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/consistent-type-assertions */

import { Request, Response } from 'express'
import { Brand } from '../modules/brands/domain/entities/Brand'
import { BrandContainer } from '../modules/brands/infrastructure/BrandContainer'
import { BrandController } from './BrandController'

describe('BrandController', () => {
  // getAll method returns all brands with 200 status code
  it('should return all brands with 200 status code', async () => {
    // Arrange
    const mockBrands = [
      new Brand('1', 'Tesla', 100),
      new Brand('2', 'Audi', 90),
    ]

    const mockGetAllBrands = {
      get: jest.fn().mockResolvedValue(mockBrands),
    } as unknown as ReturnType<(typeof BrandContainer)['brandsGetter']>

    jest.spyOn(BrandContainer, 'brandsGetter').mockReturnValue(mockGetAllBrands)

    const controller = new BrandController()
    const mockRequest = {} as Request
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    } as unknown as Response

    // Act
    await controller.getAll(mockRequest, mockResponse)

    // Assert
    expect(mockGetAllBrands.get).toHaveBeenCalled()
    expect(mockResponse.status).toHaveBeenCalledWith(200)
    expect(mockResponse.json).toHaveBeenCalledWith(mockBrands)
  })

  // create method handles validation errors and returns 400 status code with errors
  it('should return 400 status code when validation fails', async () => {
    // Arrange
    const mockValidationErrors = [
      { property: 'name', constraints: { isString: 'name must be a string' } },
    ]

    jest
      .spyOn(require('class-validator'), 'validate')
      .mockResolvedValue(mockValidationErrors)

    const controller = new BrandController()
    const mockRequest = {
      body: { name: 123 }, // Invalid name (not a string)
    } as Request

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    } as unknown as Response

    // Act
    await controller.create(mockRequest, mockResponse)

    // Assert
    expect(mockResponse.status).toHaveBeenCalledWith(400)
    expect(mockResponse.json).toHaveBeenCalledWith({
      errors: mockValidationErrors,
    })
  })
})
