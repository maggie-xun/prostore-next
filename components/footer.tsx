import { APP_NAME } from '@/lib/constants'
const Footer = () => {
  const currentYear = new Date().getFullYear()
  return (
    <footer className='w-full border-t'>
      <div className='p-5 flex justify-center'>
        {currentYear} &copy; {APP_NAME}
      </div>
    </footer>
  )
}

export default Footer
