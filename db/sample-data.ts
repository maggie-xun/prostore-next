import { hashSync } from 'bcrypt-ts-edge'
const sampleData = {
  users: [
    {
      name: 'John',
      email: 'admin@example.com',
      password: hashSync('123456', 10),
      role: 'admin'
    },
    {
      name: 'Jane',
      email: 'user@example.com',
      password: hashSync('123456', 10),
      role: 'user'
    }
  ],
  products: [
    {
      name: 'Product 1',
      price: 100,
      slug: 'product-1',
      category: 'Category 1',
      description: 'Description 1',
      images: ['/images/product.svg'],
      brand: 'Brand 1',
      // rating: 4.5,
      numReviews: 10,
      stock: 10,
      isFeatured: true,
      banner: 'Sale'
    },
    {
      name: 'Product 2',
      price: 200,
      slug: 'product-2',

      category: 'Category 2',
      description: 'Description 2',
      images: ['/images/product.svg'],
      brand: 'Brand 2',
      rating: 4.0,
      numReviews: 10,
      stock: 0,
      isFeatured: true,
      banner: 'Sale'
    },
    {
      name: 'Product 2',
      price: 200,
      slug: 'product-3',

      category: 'Category 2',
      description: 'Description 2',
      images: ['/images/product.svg'],
      brand: 'Brand 2',
      rating: 4.0,
      numReviews: 10,
      stock: 20,
      isFeatured: true,
      banner: 'Sale'
    },
    {
      name: 'Product 2',
      price: 200,
      slug: 'product-4',

      category: 'Category 2',
      description: 'Description 2',
      images: ['/images/product.svg'],
      brand: 'Brand 2',
      rating: 4.0,
      numReviews: 10,
      stock: 20,
      isFeatured: true,
      banner: 'Sale'
    },
    {
      name: 'Product 2',
      price: 200,
      slug: 'product-5',

      category: 'Category 2',
      description: 'Description 2',
      images: ['/images/product.svg'],
      brand: 'Brand 2',
      rating: 4.0,
      numReviews: 10,
      stock: 20,
      isFeatured: true,
      banner: 'Sale'
    },
    {
      name: 'Product 2',
      price: 200,
      slug: 'product-6',

      category: 'Category 2',
      description: 'Description 2',
      images: ['/images/product.svg'],
      brand: 'Brand 2',
      rating: 4.0,
      numReviews: 10,
      stock: 20,
      isFeatured: true,
      banner: 'Sale'
    }
  ]
}
export default sampleData
