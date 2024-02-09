import bcrypt from 'bcrypt'

import prisma from '@/app/libs/prismadb'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    try {

        const body = await request.json()

        const { name, email, password, confirmPassword } = body

        if (!name || !email || !password || !confirmPassword) {
            return new NextResponse('Please fill all required fields', { status: 401 })
        }

        if (password !== confirmPassword) {
            return new NextResponse('Password and Confirm Password must be the same', { status: 401 })
        }

        const hashedPassword = await bcrypt.hash(password, 12)

        const user = await prisma.user.create({
            data: {
                name, email, hashedPassword
            }
        })

        return NextResponse.json(user)

    } catch (error) {
        console.log('REGISTER_ERROR', error)
        return new NextResponse('Internal Server Error', { status: 500 })
    }
}