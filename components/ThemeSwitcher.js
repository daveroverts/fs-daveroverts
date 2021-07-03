import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { SunIcon, MoonIcon } from '@heroicons/react/outline'
import nightwind from 'nightwind/helper';

export const ThemeSwitcher = () => {
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme()
    const toggle = () => {
        nightwind.beforeTransition()
        if (theme !== 'dark') {
            setTheme('dark')
        } else {
            setTheme('light')
        }
    }

    useEffect(() => setMounted(true), [])

    if (!mounted) return null

    return (
        <div className="flex items-center justify-between p-3 text-xl font-bold rounded-md hover:bg-gray-200">
            <button aria-label="Toggle theme" onClick={toggle}>
                {theme === 'dark' ? <SunIcon className="w-5 h-5"/> : <MoonIcon className="w-5 h-5"/>}
            </button>
        </div>
    )
}
