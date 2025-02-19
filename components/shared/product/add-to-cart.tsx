'use client'
import { Cart, CartItem } from '@/types'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'
import { addItemToCart } from '@/lib/actions/cart-actions'
import { removeItemFromCart } from '@/lib/actions/cart-actions'
import { ToastAction } from '@/components/ui/toast'
import { Minus, Plus, Loader } from 'lucide-react'
import { useTransition } from 'react'
const AddToCart = ({ cart, item }: { cart?: Cart; item: CartItem }) => {
  const router = useRouter()
  const { toast } = useToast()
  const [isPending, startTransition] = useTransition()
  const handleAddToCart = async () => {
    startTransition(async () => {
      const res = await addItemToCart(item)
      if (!res.success) {
        toast({
          variant: 'destructive',
          description: res.message
        })
        return
      }
      toast({
        description: res.message,
        action: (
          <ToastAction
            className='bg-primary texxt-white hover:bg-grey-800'
            altText='Go to cart'
            onClick={() => {
              router.push('/cart')
            }}
          >
            Go to cart
          </ToastAction>
        )
      })
    })
  }
  const handleRemoveFromCart = async () => {
    startTransition(async () => {
      const res = await removeItemFromCart(item.productId)
      toast({
        variant: res.success ? 'default' : 'destructive',
        description: res.message
      })
      return
    })
  }
  const existItem = cart && cart.items.find((x) => x.productId === item.productId)

  return existItem ? (
    <div>
      <Button type='button' variant='outline' onClick={handleRemoveFromCart}>
        {isPending ? <Loader className='w-4 h-4 animate-spin'></Loader> : <Minus className='h-4 w-4'></Minus>}
      </Button>
      <span className='px-2'>{existItem.qty}</span>
      <Button type='button' variant='outline' onClick={handleAddToCart}>
        {isPending ? <Loader className='w-4 h-4 animate-spin'></Loader> : <Plus className='h-4 w-4'></Plus>}
      </Button>
    </div>
  ) : (
    <Button className='w-full' type='button' onClick={handleAddToCart}>
      {isPending ? <Loader className='w-4 h-4 animate-spin'></Loader> : 'Add To Card'}
    </Button>
  )
}

export default AddToCart
