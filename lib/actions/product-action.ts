'use server'
// import { PrismaClient } from '@prisma/client'
import { prisma } from '@/db/prisma'
import { convertToPlainObject } from '../utils'

export async function getLatestProducts() {
  // const prisma = new PrismaClient()
  const products = await prisma.product.findMany({ take: 4, orderBy: { createdAt: 'desc' } })
  return convertToPlainObject(products)
}
export async function getProductBySlug(slug: string) {
  // const prisma = new PrismaClient()
  const product = await prisma.product.findUnique({ where: { slug } })
  return convertToPlainObject(product)
}