"use client"


import useRoutes from '@/app/hooks/useRoutes'
import { User } from '@prisma/client'
import { signOut } from 'next-auth/react'
import React, { useState } from 'react'
import { HiArrowLeftOnRectangle } from "react-icons/hi2"
import { PiWechatLogoBold } from 'react-icons/pi'
import Avatar from '../avatar/Avatar'
import DesktopSidbarItem from './DesktopSidebarItem'
import SettingModel from './SettingModel'

interface DesktopSidebarProps {
  currentUser: User
}

const DesktopSidebar: React.FC<DesktopSidebarProps> = ({ currentUser }) => {

  const routes = useRoutes()

  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <>
      <SettingModel currentUser={currentUser} isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <div className="lg:fixed lg:inset-y-0 lg:left-0 lg:z-40  hidden lg:overflow-y-auto lg:flex lg:flex-col justify-center items-start lg:w-20 min-w-20 h-full border-r">
        <div className="flex flex-col justify-between items-center h-full shadow bg-white w-full px-4 py-5">

          <div className='flex flex-col items-center'>
            <PiWechatLogoBold size={34} className="text-primary" />
            <p className='text-[10px] font-extrabold text-primary'>Chat Me</p>
          </div>
          <nav className="mt-4 flex flex-col justify-between">
            <ul role="list" className="flex flex-col items-center space-y-3">
              {
                routes.map((item, i) => (
                  <DesktopSidbarItem key={item.label} href={item.href} label={item.label} icon={item.icon} active={item.active} />
                ))
              }
            </ul>
          </nav>
          <nav className="mt-4 flex flex-col justify-between items-center gap-y-4">
            <ul>
              <DesktopSidbarItem href="" label="Logout" icon={HiArrowLeftOnRectangle} onClick={() => signOut()} />
            </ul>
            <div onClick={() => setIsOpen(true)} className="cursor-pointer hover:opacity-75 transition">
              <Avatar user={currentUser} />
            </div>
          </nav>
        </div>
      </div>
    </>
  )
}

export default DesktopSidebar