export class Model {
  constructor (
    public readonly id: string,
    public name: string,
    public average_price: number,
    public brand_id: string
  ) {}
}

export interface ModelResponse {
  id: string
  name: string
  average_price: number
}
