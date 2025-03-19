import { ModelsCreator } from './ModelsCreator'
import { ModelRepository } from '../domain/interfaces/ModelRepository'
import { ModelRequest } from '../domain/entities/Model'

describe('ModelsCreator', () => {
  let mockRepository: jest.Mocked<ModelRepository>
  let modelsCreator: ModelsCreator

  beforeEach(() => {
    mockRepository = {
      create: jest.fn(),
      update: jest.fn()
    } as any
    modelsCreator = new ModelsCreator(mockRepository)
  })

  it('should call repository.create when create is invoked', async () => {
    const model: ModelRequest = {
      name: 'New Model',
      average_price: 1000,
      brand_id: '1'
    }

    await modelsCreator.create(model)

    expect(mockRepository.create).toHaveBeenCalledWith(model)
    expect(mockRepository.create).toHaveBeenCalledTimes(1)
  })

  it('should call repository.update when update is invoked', async () => {
    const model: ModelRequest = {
      id: '1',
      average_price: 1000
    }

    await modelsCreator.update(model)

    expect(mockRepository.update).toHaveBeenCalledWith(model)
    expect(mockRepository.update).toHaveBeenCalledTimes(1)
  })
})

describe('ModelsCreator', () => {
  // Successfully create a model with valid ModelRequest data
  it('should create a model with valid data', async () => {
    // Arrange
    const mockRepository = {
      create: jest.fn().mockResolvedValue(undefined)
    } as unknown as ModelRepository

    const modelsCreator = new ModelsCreator(mockRepository)

    const modelRequest: ModelRequest = {
      id: '123',
      name: 'Test Model',
      average_price: 1000,
      brand_id: 'brand-123'
    }

    // Act
    await modelsCreator.create(modelRequest)

    // Assert
    expect(mockRepository.create).toHaveBeenCalledWith(modelRequest)
    expect(mockRepository.create).toHaveBeenCalledTimes(1)
  })

  // Handle create with missing optional fields (id, name)
  it('should create a model with only required fields', async () => {
    // Arrange
    const mockRepository = {
      create: jest.fn().mockResolvedValue(undefined)
    } as unknown as ModelRepository

    const modelsCreator = new ModelsCreator(mockRepository)

    const modelRequest: ModelRequest = {
      average_price: 1500,
      brand_id: '1'
    }

    // Act
    await modelsCreator.create(modelRequest)

    // Assert
    expect(mockRepository.create).toHaveBeenCalledWith(modelRequest)
    expect(mockRepository.create).toHaveBeenCalledTimes(1)
  })
})
