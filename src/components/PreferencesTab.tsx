'use client'

import { MoonIcon, SunIcon, Volume2, VolumeX } from "lucide-react"
import useSound from 'use-sound';
import { Button } from "./ui/button"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { usePreferences } from "@/store/usePreferences"

const PreferencesTab = () => {

    const { setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)
    const { soundEnabled, setSoundEnabled } = usePreferences()
    const [playMouseCLick] = useSound('/sounds/mouse-click.mp3')
    const [playSoundOn] = useSound('/sounds/sound-on.mp3', { volume: 0.5 })
    const [playSoundOff] = useSound('/sounds/sound-off.mp3', { volume: 0.2 })

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    return <div className="flex flex-wrap gap-2 px-1 md:px-2">
        <Button variant="outline" size={"icon"}
            onClick={() => {
                setTheme("light")
                if (soundEnabled) playMouseCLick();
            }}>
            <SunIcon className="size-[1.2rem] text-muted-foreground" />
        </Button>
        <Button variant="outline" size={"icon"}
            onClick={() => {
                setTheme("dark")
                if (soundEnabled) playMouseCLick();
            }}>
            <MoonIcon className="size-[1.2rem] text-muted-foreground" />
        </Button>
        <Button variant="outline" size={"icon"}
            onClick={() => {
                setSoundEnabled(!soundEnabled)
                if (soundEnabled) { playSoundOff(); } else { playSoundOn(); }
            }}
        >
            {soundEnabled ?
                <Volume2 className="size-[1.2rem] text-muted-foreground" />
                :
                <VolumeX className="size-[1.2rem] text-muted-foreground opacity-50" />
            }
        </Button>
    </div>
}

export default PreferencesTab