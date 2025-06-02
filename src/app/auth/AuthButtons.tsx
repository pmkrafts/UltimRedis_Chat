import { Button } from '@/components/ui/button'
import React from 'react'

const AuthButtons = () => {
    return <div className='flex gap-3 flex-1 md:flex-row flex-col relative z-50 justify-center items-center' >
        <Button className='w-50' variant='outline' >
            Sign Up
        </Button>
        <Button className='w-50'>
            Login
        </Button>
    </div>
}

export default AuthButtons