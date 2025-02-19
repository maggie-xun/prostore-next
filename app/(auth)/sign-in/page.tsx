import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import Image from 'next/image'
import { APP_NAME } from '@/lib/constants'
import CredentialsSignInForm from './credentials-signin-form'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'

const SignPage = async (props: { searchParams: Promise<{ callbackUrl: string }> }) => {
  const { callbackUrl } = await props.searchParams
  const session = await auth()
  if (session) {
    return redirect(callbackUrl || '/')
  }
  return (
    <div className='w-ful max-w-md mx-auto'>
      <Card>
        <CardHeader className='space-y-4'>
          <Link href='/' className='flex-center'>
            <Image src='/images/logo.svg' alt={`${APP_NAME} logo`} height={100} width={100} priority={true}></Image>
            <CardTitle className='text-center'>Sign In</CardTitle>
            <CardDescription className='text-center'>Sign to your account</CardDescription>
          </Link>
        </CardHeader>
        <CardContent className='space-y-4'>
          <CredentialsSignInForm></CredentialsSignInForm>
        </CardContent>
      </Card>
    </div>
  )
}

export default SignPage
