import { Card, CardContent, CardHeader } from '@/components/ui/card'
import Link from 'next/link'
import Image from 'next/image'
import ProductPrice from './product-price'
import { Product } from '@/types'
const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Card className='w-full max-w-sm'>
      <CardHeader title='Product Card'>
        <Link href={`/product/${product.name}`}>
          <Image src={product.images[0]} alt={product.name} height={300} width={300} priority={true} />
        </Link>
      </CardHeader>
      <CardContent className='p-4 gird gap-4'>
        <div className='text-xs'>{product.brand}</div>
        <Link href={`/product/${product.slug}`}>
          <h2 className='font-medium text-xs'>{product.name}</h2>
        </Link>
        <div className='flex-between gap-4'>
          <p>{product.rating} stars</p>
          {product.stock > 0 ? (
            <ProductPrice value={Number(product.price)} className='text-bold' />
          ) : (
            // <p className='text-bold'>Price: ${product.price}</p>
            <p className='text-destructive'>Out of Stock</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default ProductCard
