// import { Button } from '@/components/ui/button'
// const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
import ProductList from '@/components/shared/product/product-list'
// import sampleData from "@/db/sample-data"
import { getLatestProducts } from '@/lib/actions/product.actions'
const Homepage = async () => {
  const sampleData = await getLatestProducts()
  return <ProductList data={sampleData} title='Featured Products' limit={4} />
}

export default Homepage
