'use client'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem
} from '@/components/ui/dropdown-menu'
import { Moon, Sun, SunMoon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
const ModeToggle = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => setMounted(true), [])

  if (!mounted) return null
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='btn btn-ghost focus-visible:ring-0 focus-visible:ring-offset-0'>
          {theme === 'system' ? <SunMoon /> : theme === 'dark' ? <Moon /> : <Sun />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel asChild>Mode</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem checked={theme === 'system'} onSelect={() => setTheme('system')}>
          System
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem checked={theme === 'dark'} onSelect={() => setTheme('dark')}>
          Dark
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem checked={theme === 'light'} onSelect={() => setTheme('light')}>
          Light
        </DropdownMenuCheckboxItem>
        {/* <DropdownMenu.Item onSelect={() => setTheme('dark')}>Dark</DropdownMenu.Item>
        <DropdownMenu.Item onSelect={() => setTheme('light')}>Light</DropdownMenu.Item> */}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ModeToggle
