import ProductCard from './product-card'
import { Product } from '@/types'
const ProductList = ({ data, title, limit }: { data: Product[]; title?: string; limit: number }) => {
  const limitedData = data.slice(0, limit)
  return (
    <div className='my-10'>
      <h2 className='h2-bold mb-4'> {title} </h2>
      {limitedData.length > 0 ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {data.map((product: Product) => (
            <ProductCard product={product} key={product.slug}></ProductCard>
          ))}
        </div>
      ) : (
        'No products found'
      )}
    </div>
  )
}

export default ProductList
