export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || 'prostore'
export const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

export const signInDefaultValues = {
  email: 'admin@example.com',
  password: '123456'
}

export const signUpDefaultValues = {
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
}
