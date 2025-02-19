'use client'
import { signUpDefaultValues } from '@/lib/constants'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { signUpUser } from '@/lib/actions/user.actions'
import { useSearchParams } from 'next/navigation'
const SignUpForm = () => {
  const [data, action] = useActionState(signUpUser, {
    success: false,
    message: ''
  })
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackurl') || '/'
  const SignUpButton = () => {
    const { pending } = useFormStatus()
    return (
      <Button disabled={pending} className='w-full' variant='default'>
        {pending ? 'Signing Up...' : 'Sign Up'}
      </Button>
    )
  }
  return (
    <form action={action}>
      <input type='hidden' name='callbackUrl' value={callbackUrl} />
      <div>
        <div>
          <label htmlFor='name'>Name</label>
          <Input
            id='name'
            name='name'
            type='name'
            required
            autoComplete='name'
            defaultValue={signUpDefaultValues.email}
          ></Input>
        </div>
        <div>
          <label htmlFor='email'>Email</label>
          <Input
            id='email'
            name='email'
            type='email'
            required
            autoComplete='email'
            defaultValue={signUpDefaultValues.email}
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
            defaultValue={signUpDefaultValues.password}
          ></Input>
        </div>
        <div>
          <label htmlFor='confirmPassword'>ConfirmPassword</label>
          <Input
            id='confirmPassword'
            name='confirmPassword'
            type='confirmPassword'
            required
            autoComplete='confirmPassword'
            defaultValue={signUpDefaultValues.confirmPassword}
          ></Input>
        </div>
        <div>
          <SignUpButton></SignUpButton>
        </div>

        {data && !data.success && <div className='text-center text-destructive'>{data.message}</div>}
        <div className='text-sm text-center text-muted-foreground'>
          Already have an account?{''}
          <Link href='/sign-in' target='_seft' className='link'>
            Sign Up
          </Link>
        </div>
      </div>
    </form>
  )
}

export default SignUpForm
