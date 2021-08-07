import { MoonIcon, SunIcon } from '@heroicons/react/outline';
import { useTheme } from 'next-themes';
import nightwind from 'nightwind/helper';
import { useEffect, useState } from 'react';

export const ThemeSwitcher = () => {
    const [mounted, setMounted] = useState(false)
    const { resolvedTheme, setTheme } = useTheme()
    const toggle = () => {
        nightwind.beforeTransition()
        if (resolvedTheme !== 'dark') {
            setTheme('dark')
        } else {
            setTheme('light')
        }
    }

    useEffect(() => setMounted(true), [])

    if (!mounted) return null

    return (
        <>
            <button aria-label="Toggle theme" className="flex items-center justify-between p-3 text-xl font-bold rounded-md hover:bg-gray-200" onClick={toggle}>
                {resolvedTheme !== 'dark' ? <MoonIcon className="w-5 h-5" /> : <SunIcon className="w-5 h-5" />}
            </button>
        </>
    )
}
