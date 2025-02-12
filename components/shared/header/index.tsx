import Image from 'next/image'
import Link from 'next/link'
import Menu from './menu'
import { APP_NAME } from '@/lib/constants'
const header = () => {
  return (
    <header className='w-full border-b'>
      <div className='wrapper flex justify-between'>
        <div className='flex-start'>
          <Link href='/' className='flex flex-start items-center'>
            <Image src='/images/globe.svg' alt={`${APP_NAME} logo`} height={48} width={48} priority={true} />
            <span className='hidden lg:block font-bold text-2xl ml-3'>{APP_NAME}</span>
          </Link>
        </div>

        <Menu></Menu>
      </div>
    </header>
  )
}

export default header
