import { z } from 'zod'
import { formatNumberWithDecimalPlaces } from './utils'

export const insertProductSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters').max(255),
  slug: z.string().min(3, 'Slug must be at least 3 characters').max(255),
  category: z.string(),
  description: z.string(),
  images: z.array(z.string()),
  brand: z.string(),
  rating: z.string(),
  numReviews: z.number(),
  stock: z.coerce.number(),
  isFeatured: z.boolean(),
  banner: z.string().nullable(),
  price:z.string().refine((val)=>/^\d+(\.\d(2))?$/.test(formatNumberWithDecimalPlaces(Number(val))),'Invalid price')
})
