import { PrismaClient } from '@prisma/client'
import sampleData from './sample-data'
async function main() {
  const prisma = new PrismaClient()
  await prisma.product.deleteMany()
  await prisma.account.deleteMany()
  await prisma.session.deleteMany()
  await prisma.verificationToken.deleteMany()
  await prisma.user.deleteMany()

  await prisma.product.createMany({ data: sampleData.products })
  await prisma.user.createMany({data:sampleData.users})
  // await prisma.product.createMany({data:sampleData.products})
  // await prisma.product.createMany({data:sampleData.products})
  // for (const product of sampleData.products) {
  //   await prisma.product.create({
  //     data: product
  //   })
  // }
}
main()
