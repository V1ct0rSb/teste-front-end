import catalogoLocal from './catalogo-produtos.json'

export interface Product {
  productName: string
  descriptionShort: string
  photo: string
  price: number
}

interface ProductsResponse {
  success: boolean
  products: Product[]
}

export interface CatalogResult {
  products: Product[]
  source: 'online' | 'local'
}

const PRODUCTS_URL =
  'https://app.econverse.com.br/teste-front-end/junior/tecnologia/lista-produtos/produtos.json'

export async function fetchProducts(signal: AbortSignal): Promise<CatalogResult> {
  try {
    const response = await fetch(PRODUCTS_URL, { signal })
    if (!response.ok) {
      throw new Error(`O serviço de produtos respondeu com o status ${response.status}.`)
    }

    const data: unknown = await response.json()
    if (!isProductsResponse(data)) {
      throw new Error('A lista de produtos recebida está em um formato inválido.')
    }

    return { products: data.products, source: 'online' }
  } catch (error) {
    if (signal.aborted) throw error

    // O serviço remoto não habilita CORS; o catálogo incluído vai manter a home funcional.
    return { products: catalogoLocal.products, source: 'local' }
  }
}

function isProductsResponse(value: unknown): value is ProductsResponse {
  if (typeof value !== 'object' || value === null || !('success' in value) || !('products' in value)) {
    return false
  }

  const response = value as { success: unknown; products: unknown }
  return (
    response.success === true &&
    Array.isArray(response.products) &&
    response.products.every(isProduct)
  )
}

function isProduct(value: unknown): value is Product {
  if (typeof value !== 'object' || value === null) return false

  return (
    'productName' in value &&
    typeof value.productName === 'string' &&
    'descriptionShort' in value &&
    typeof value.descriptionShort === 'string' &&
    'photo' in value &&
    typeof value.photo === 'string' &&
    'price' in value &&
    typeof value.price === 'number' &&
    Number.isFinite(value.price)
  )
}
