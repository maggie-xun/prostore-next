'use client'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
const NotFoundPage = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <Image src='/images/logo.svg' alt='404' height={300} width={300} priority={true} />
      <div className='p-d w-1/3 rounded-lg shadow-md text-center'>
        <h1 className='text-3xl font-bold mb-4'>Not Found</h1>
        <Button variant='outline' className='mt-4 ml-2' onClick={() => (window.location.href = '/')}>
          Back to home
        </Button>
      </div>
    </div>
  )
}

export default NotFoundPage
