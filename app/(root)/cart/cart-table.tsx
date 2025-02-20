'use client'
import { useRouter } from 'next/router'
import { toast, useToast } from '@/hooks/use-toast'
import { useTransition } from 'react'
import { addItemToCart, removeItemFromCart } from '@/lib/actions/cart-actions'
import { ArrowRight, Loader, Minus, Plus } from 'lucide-react'
import { Cart } from '@/types'
import Image from 'next/image'
import Link from 'next/link'
import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
const CartTable = ({ cart }: { cart: Cart }) => {
  // const router = useRouter()
  // const { toast } = useToast()
  const [isPending, startTransition] = useTransition()
  // const [isAdding, startAdding] = useTransition()
  return (
    <div>
      <h1> {cart.sessionCartId}</h1>
      {!cart || cart.items?.length === 0 ? (
        <div>
          Cart is empty, <Link href='/'>continue shopping</Link>
        </div>
      ) : (
        <div className='grid md:grid-cols-4 md:gap-5'>
          <div className='overflow-x-auto md:col-span-3 '>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Price</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {cart.items?.length !== 0 &&
                  cart.items?.map((item) => (
                    <TableRow key={item.slug}>
                      <TableCell>
                        <Link href={`/product/${item.slug}`} className='flex items-center'>
                          <Image src={item.image} alt={item.name} width={50} height={50}></Image>
                          <span>{item.name}</span>
                        </Link>
                      </TableCell>
                      <TableCell className='flex-cener gap-2'>
                        <Button
                          disabled={isPending}
                          onClick={() => {
                            startTransition(async () => {
                              const res = await removeItemFromCart(item.productId)
                              if (!res.success) {
                                toast({ variant: 'destructive', description: res.message })
                              }
                            })
                          }}
                        >
                          {isPending ? (
                            <Loader className='w-4 h-4 animate-spin'></Loader>
                          ) : (
                            <Minus className='w-4 h-4'></Minus>
                          )}
                        </Button>
                        <span>{item.qty}</span>
                        <Button
                          disabled={isPending}
                          onClick={() => {
                            startTransition(async () => {
                              const res = await addItemToCart(item)
                              if (!res.success) {
                                toast({ variant: 'destructive', description: res.message })
                              }
                            })
                          }}
                        >
                          {isPending ? (
                            <Loader className='w-4 h-4 animate-spin'></Loader>
                          ) : (
                            <Plus className='w-4 h-4'></Plus>
                          )}
                        </Button>
                      </TableCell>
                      <TableCell>${item.price}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
    </div>
  )
}

export default CartTable
