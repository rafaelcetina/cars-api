export interface AIService {
  generateRecommendation(
    brandName: string,
    modelName?: string,
    averagePrice?: number,
  ): Promise<string>
}

export class OpenAIRecommendationService implements AIService {
  private readonly apiKey: string
  private readonly baseURL: string

  constructor() {
    this.apiKey = process.env.OPENAI_API_KEY || ''
    this.baseURL = 'https://api.openai.com/v1'
  }

  async generateRecommendation(
    brandName: string,
    modelName?: string,
    averagePrice?: number,
  ): Promise<string> {
    if (!this.apiKey) {
      throw new Error('OpenAI API key not configured')
    }

    const prompt = this.buildPrompt(brandName, modelName, averagePrice)

    try {
      const response = await fetch(`${this.baseURL}/chat/completions`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content:
                'Eres un experto en automóviles que proporciona recomendaciones útiles y detalladas sobre marcas y modelos de autos.',
            },
            {
              role: 'user',
              content: prompt,
            },
          ],
          max_tokens: 500,
          temperature: 0.7,
        }),
      })

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status}`)
      }

      const data = await response.json()
      return data.choices[0].message.content.trim()
    } catch (error) {
      console.error('Error generating AI recommendation:', error)
      return this.getFallbackRecommendation(brandName, modelName, averagePrice)
    }
  }

  private buildPrompt(
    brandName: string,
    modelName?: string,
    averagePrice?: number,
  ): string {
    let prompt = `Genera una recomendación detallada y útil para la marca de automóvil "${brandName}"`

    if (modelName) {
      prompt += ` y específicamente para el modelo "${modelName}"`
    }

    if (averagePrice) {
      prompt += `. El precio promedio es de $${averagePrice.toLocaleString()}`
    }

    prompt += `. La recomendación debe incluir:
    - Ventajas y características destacadas
    - Consideraciones importantes para el comprador
    - Comparación con la competencia
    - Consejos de mantenimiento o uso
    - Valor por dinero
    
    Proporciona una recomendación práctica y objetiva de máximo 300 palabras.`

    return prompt
  }

  private getFallbackRecommendation(
    brandName: string,
    modelName?: string,
    averagePrice?: number,
  ): string {
    let recommendation = `${brandName} es una marca reconocida en la industria automotriz. `

    if (modelName) {
      recommendation += `El modelo ${modelName} ofrece una excelente combinación de rendimiento y confiabilidad. `
    }

    if (averagePrice) {
      recommendation += `Con un precio promedio de $${averagePrice.toLocaleString()}, representa una buena opción en su segmento. `
    }

    recommendation += `Recomendamos considerar esta opción si buscas calidad y respaldo de marca. Consulta con un asesor para obtener más detalles específicos sobre este vehículo.`

    return recommendation
  }
}
