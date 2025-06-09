'use client'

import { Button } from '@/components/ui/button'
import { LoginLink, RegisterLink } from '@kinde-oss/kinde-auth-nextjs/components'
import { useState } from 'react'

const AuthButtons = () => {

    const [isLoading, setIsLoading] = useState(false)

    return <div className='flex gap-3 flex-1 md:flex-row flex-col relative z-50 justify-center items-center' >
        <RegisterLink className='flex-1' onClick={() => setIsLoading(true)} >
            <Button className='w-50' variant='outline' disabled={isLoading} >
                Sign Up
            </Button>
        </RegisterLink>
        <LoginLink className='flex-1' onClick={() => setIsLoading(true)} >
            <Button className='w-50' disabled={isLoading} >
                Login
            </Button>
        </LoginLink>
    </div>
}

export default AuthButtons