import { getMyCart } from '@/lib/actions/cart-actions'
import CartTable from './cart-table'
const CartPage = async () => {
  const cart = await getMyCart()
  console.log(cart, 'cart')
  return (
    <div>
      {cart ? <CartTable cart={cart}></CartTable> : <p>Loading...</p>}
    </div>
  )
}

export default CartPage
