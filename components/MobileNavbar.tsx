"use client"
import Link from 'next/link'
import React, { useRef, useState } from 'react'

import { HelpCircle, Home, IndianRupee, Phone } from 'lucide-react';
import { FcAbout } from 'react-icons/fc';
import FeaturNav from './user-view/FeaturNav';
import MobileFeatureNav from './user-view/MobileFeatureNav';
export default function MobileNavbar() {
    const [isOpen, setIsOpen] = useState(false)

    const [openMenus, setOpenMenus] = useState([]);
    const menuRef = useRef<HTMLDivElement | null>(null);

    const menuItems = [
        {
            title: 'Home',
            icon: <Home />,
            link:'/'
        },
        {
            title: 'About',
            icon: <FcAbout />,
            link:'/about'
        },
        {
            title: 'Price',
            icon: <IndianRupee />,
            link:'/price'
        },
        {
            title: 'Help',
            icon: <HelpCircle />,
            link:'/help'
        },
        {
            title: 'Contact-Us',
            icon: <Phone />,
            link:'/contact-us'
        },


    ];
    const moveMenu = () => {
        if (menuRef.current) {
            if (!isOpen) {
                menuRef.current.style.position = 'absolute';
                menuRef.current.style.left = '80%';
                menuRef.current.style.padding = '1rem';
                menuRef.current.style.borderRadius = '100px';
                menuRef.current.style.zIndex = '1000';
            } else {
                menuRef.current.style.position = 'static';
                menuRef.current.style.padding = '0';
                menuRef.current.style.borderRadius = '0px';
            }
        }
    };
    const MonitorMenu = ['profile', 'orders', 'settings', 'saved products']
    

        return (<div className='md:hidden'>
            <div className='  flex flex-col justify-center items-center bg-white gap-[4.5px] z-20 cursor-pointer' ref={menuRef} onClick={() => { setIsOpen((prev) => !prev); moveMenu() }}>
                <div className={`w-6 h-1 bg-blue-600 rounded-sm origin-left ease-in-out duration-500 ${isOpen ? "rotate-45" : ''}`}></div>
                <div className={`w-6 h-1 bg-blue-600 rounded-sm ease-in-out duration-500 ${isOpen ? "opacity-0" : ''}`}></div>
                <div className={`w-6 h-1 bg-blue-600 rounded-sm origin-left ease-in-out duration-500 ${isOpen ? "-rotate-45" : ''}`}></div>
            </div>
            {isOpen &&
                <div className="fixed flex w-full h-full top-0 left-0  justify-center   z-[50]">
                    <div className='w-[80%] h-full' onClick={()=>{ setIsOpen((prev) => !prev); moveMenu() }}>
                        <nav className="w-full h-full  shadow-lg text-xl  bg-slate-100">
                            <ul className="py-4 " >
                                {menuItems.map((item, index) => (
                                    <Link href={item.link} key={index} className="mb-2">
                                        <button
                                            
                                            className="w-full flex items-center justify-between px-4 py-2  transition-colors duration-200 ease-in-out"
                                        >
                                            <div className="flex items-center">
                                                <span className="mr-2">{item.icon}</span>
                                                <span>{item.title}</span>
                                            </div>
                                            {/* {openMenus.includes(index) ? <FaChevronUp /> : <FaChevronDown />} */}
                                        </button>
                                        
                                    </Link>
                                ))}
                            </ul>
                            <hr className='bg-black h-[2px]' />
                             <MobileFeatureNav/>
                        </nav>


                    </div>
                    <div className='w-[25%] bg-black bg-opacity-50' onClick={() => { setIsOpen((prev) => !prev); moveMenu() }}>

                    </div>
                </div>
            }
        </div>)
    }


// export default MobileNavbar
