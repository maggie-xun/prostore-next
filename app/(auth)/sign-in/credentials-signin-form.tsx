'use client'
import { signInDefaultValues } from '@/lib/constants'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { signInWithCredentials } from '@/lib/actions/user.actions'
import { useSearchParams } from 'next/navigation'
const CredentialsSignInForm = () => {
  const [data, action] = useActionState(signInWithCredentials, {
    success: false,
    message: ''
  })
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackurl') || '/'
  const SignInButton = () => {
    const { pending } = useFormStatus()
    return (
      <Button disabled={pending} className='w-full' variant='default'>
        {pending ? 'Signing In...' : 'Sign In'}
      </Button>
    )
  }
  return (
    <form action={action}>
      <input type='hidden' name='callbackUrl' value={callbackUrl} />
      <div>
        <div>
          <label htmlFor='email'>Email</label>
          <Input
            id='email'
            name='email'
            type='email'
            required
            autoComplete='paemailssword'
            defaultValue={signInDefaultValues.email}
          ></Input>
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <Input
            id='password'
            name='password'
            type='password'
            required
            autoComplete='password'
            defaultValue={signInDefaultValues.password}
          ></Input>
        </div>
        <div>
          <SignInButton></SignInButton>
        </div>

        {data && !data.success && <div className='text-center text-destructive'>{data.message}</div>}
        <div className='text-sm text-center text-muted-foreground'>
          Don&apos;t have an account?{''}
          <Link href='/sign-up' target='_seft' className='link'>
            Sign Up
          </Link>
        </div>
      </div>
    </form>
  )
}

export default CredentialsSignInForm
