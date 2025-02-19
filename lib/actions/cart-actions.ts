'use server'
import { CartItem } from '@/types'
import { cookies } from 'next/headers'
import { convertToPlainObject, formatError, roundToTwo } from '../utils'
import { auth } from '@/auth'
import { prisma } from '@/db/prisma'
import { cartItemSchema, insertCartSchema } from '../validators'
import { revalidatePath } from 'next/cache'
import { Prisma } from '@prisma/client'

//calculate cart prices
const calcPrice = (items: CartItem[]) => {
  const itemsPrice = roundToTwo(items.reduce((acc, item) => acc + Number(item.price) * item.qty, 0))
  const shippingPrice = roundToTwo(itemsPrice > 100 ? 0 : 10)
  const taxPrice = roundToTwo(0.15 * itemsPrice)
  const totalPrice = roundToTwo(itemsPrice + shippingPrice + taxPrice)
  return {
    itemsPrice: itemsPrice.toFixed(2),
    shippingPrice: shippingPrice.toFixed(2),
    taxPrice: taxPrice.toFixed(2),
    totalPrice: totalPrice.toFixed(2)
  }
}
export async function addItemToCart(data: CartItem) {
  try {
    const sessionCartId = (await cookies()).get('sessionCartId')?.value
    if (!sessionCartId) throw new Error('cart session not found')
    // get session and userId
    const session = await auth()
    const userId = session?.user?.id ? (session.user.id as string) : undefined
    const cart = await getMyCart()
    //parse and validate item
    console.log(data, 'product data')
    const item = cartItemSchema.parse(data)

    // find product in database
    const product = await prisma.product.findFirst({
      where: { id: item.productId }
    })
    if (!product) throw new Error('Product not found')
    if (!cart) {
      // create new cart
      const newCart = insertCartSchema.parse({
        userId: userId,
        items: [item],
        sessionCartId: sessionCartId,
        ...calcPrice([item])
      })
      await prisma.cart.create({
        data: newCart
      })
      revalidatePath(`/product/${product.slug}`)

      return {
        success: true,
        message: `${product.name} added to cart`
      }
    } else {
      // check if item already exists in cart
      const existingItem = cart.items.find((i) => i.productId === item.productId)
      if (existingItem) {
        // check stock
        if (product.stock < existingItem.qty + 1) {
          throw new Error('Product out of stock')
        }
        //     // update item quantity
        ;(cart.items as CartItem[]).find((x) => x.productId === item.productId)!.qty = existingItem.qty + 1
        // await prisma.cartItem.update({
        //   where: { id: existingItem.id },
        //   data: { qty: existingItem.qty + item.qty }
        // })
      } else {
        // check stock
        if (product.stock < 1) {
          throw new Error('Product out of stock')
        }
        cart.items.push(item)
        //     // add new item to cart
        //     await prisma.cartItem.create({
        //       data: {
        //         cartId: cart.id,
        //         ...item,
        //         price: product.price,
        //         name: product.name,
        //         image: product.image
        //       }
        //     })
      }
      //   // update cart prices
      await prisma.cart.update({
        where: { id: cart.id },
        data: {
          items: cart.items as Prisma.CartUpdateitemsInput[],
          ...calcPrice(cart.items as CartItem[])
        }
      })
      revalidatePath(`/product/${product.slug}`)
      return { sucess: true, message: `${product.name} ${existingItem ? 'updated in' : 'added to'}  cart` }
    }
  } catch (error) {
    // console.log(error, 'requirederror')
    return {
      success: false,
      message: formatError(error)
    }
  }
}

export async function getMyCart() {
  const sessionCartId = (await cookies()).get('sessionCartId')?.value
  if (!sessionCartId) throw new Error('cart session not found')
  const session = await auth()
  const userId = session?.user?.id ? (session.user.id as string) : undefined

  // get user cart from database
  const cart = await prisma.cart.findFirst({
    where: userId ? { userId: userId } : { sessionCartId: sessionCartId }
  })
  if (!cart) return undefined

  //convert decimal and return
  return convertToPlainObject({
    ...cart,
    items: cart.items as CartItem[],
    itemsPrice: cart.itemsPrice.toString(),
    totalPrice: cart.totalPrice.toString(),
    shippingPrice: cart.shippingPrice.toString(),
    taxPrice: cart.taxPrice.toString()
  })
}

export async function removeItemFromCart(productId: string) {
  try {
    const sessionCartId = (await cookies()).get('sessionCartId')?.value
    if (!sessionCartId) throw new Error('cart session not found')
    // get product
    const product = await prisma.product.findFirst({
      where: { id: productId }
    })
    if (!product) throw new Error('Product not found')
    //get cart
    const cart = await getMyCart()
    if (!cart) throw new Error('Cart not found')
    // check for items
    const item = cart.items.find((i) => i.productId === productId)
    if (!item) throw new Error('Item not found')

    if (item.qty === 1) {
      cart.items = cart.items.filter((i) => i.productId !== productId)
    } else {
      cart.items.find((i) => i.productId === productId)!.qty = item.qty - 1
    }
    await prisma.cart.update({
      where: { id: cart.id },
      data: {
        items: cart.items as Prisma.CartUpdateitemsInput[],
        ...calcPrice(cart.items as CartItem[])
      }
    })
    revalidatePath(`/product/${product.slug}`)
    return { success: true, message: `${product.name} removed from cart ` }
  } catch (error) {
    return {
      success: false,
      message: formatError(error)
    }
  }
}
