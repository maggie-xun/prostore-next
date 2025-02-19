import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function convertToPlainObject<T>(value: T): T {
  return JSON.parse(JSON.stringify(value))
}

//format number with decimal olaces
export function formatNumberWithDecimal(num: number): string {
  const [int, decimal] = num.toString().split('.')
  return decimal ? `${int}.${decimal.padEnd(2, '0')}` : `${int}.00`
}

//format error
//eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function formatError(error: any) {
  if (error.name === 'ZodError') {
    const fieldErrors = Object.keys(error.errors).map((field) => error.errors[field].message)
    return fieldErrors.join('. ')
  } else if (error.name === 'PrismaClientKnownRequestError' && error.code === 'P2002') {
    const field = error.meta?.target ? error.meta.tartget[0] : 'Field'
    return `${field.chartAt(0).toUppercase() + field.slice(1)} already exists`
  } else {
    return typeof error.message === 'string' ? error.message : JSON.stringify(error.message)
  }
}
// round nmber to 2 decimal places
export function roundToTwo(value: number | string) {
  if (typeof value === 'string') {
    return Math.round((Number(value) + Number.EPSILON) * 100) / 100
  } else if (typeof value === 'number') {
    return Math.round((value + Number.EPSILON) * 100) / 100
  } else {
    throw new Error('Value must be a number or string')
  }
}
