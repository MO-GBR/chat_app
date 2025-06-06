import React from 'react'
import Preview from '../Components/Preview';
import { THEMES } from '../Constants';
import { useTheme } from '../Lib/Zustand';

const Theme = () => {
    const { theme, setTheme } = useTheme();
    return (
        <div className='themes'>
            <div className="space-y-6">
                <div className="flex flex-col gap-1">
                    <h2 className="text-lg font-semibold">Theme</h2>
                    <p className="text-sm text-base-content/70">Choose a theme for your chat interface</p>
                </div>
                <div className='grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2'>
                    {
                        THEMES.map((t, index) => (
                            <button key={index} className={`
                                group flex flex-col items-center gap-1.5 p-2 cursor-pointer rounded-lg transition-colors
                                ${theme === t ? "bg-base-200" : "hover:bg-base-200/50"}
                            `} onClick={() => setTheme(t)}>
                                <div className="relative h-8 w-full rounded-md overflow-hidden" data-theme={t}>
                                    <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
                                        <div className="rounded bg-primary"></div>
                                        <div className="rounded bg-secondary"></div>
                                        <div className="rounded bg-accent"></div>
                                        <div className="rounded bg-neutral"></div>
                                    </div>
                                </div>
                                <span className="text-[11px] font-medium truncate w-full text-center">
                                    {t.charAt(0).toUpperCase() + t.slice(1)}
                                </span>
                            </button>
                        ))
                    }
                </div>
                {/* Preview */}
                <h3 className="text-lg font-semibold mb-3">Preview</h3>
                <Preview />
            </div>
        </div>
    )
}

export default Theme