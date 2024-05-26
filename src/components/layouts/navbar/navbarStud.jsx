import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import React, { useState } from 'react';


function NavbarStud() {
    return (
        <nav className="inset-x- top-0 z-50 bg-gradient-to-r from-cyan-500 to-blue-500 shadow dark:bg-gray-950">
            <div className="container px-4 md:px-0">
                <div className="flex h-14 items-center">
                    <div className="text-3xl font-bold">SIEPROF</div>
                    <nav className="ml-auto flex items-center space-x-4">
                    <Link Link to={'/homeStudent'}
                        className="font-medium text-sm border-b-2 border-transparent transition-colors hover:text-gray-900 hover:border-gray-100 dark:hover:text-gray-50 dark:hover:border-gray-800"
                        >Inicio</Link>
                        <Link to={'/'}
                            className="font-medium text-sm border-b-2 border-transparent transition-colors hover:text-gray-900 hover:border-gray-100 dark:hover:text-gray-50 dark:hover:border-gray-800"
                        >Empresas</Link>
                        <Link Link to={'/'}
                        className="font-medium text-sm border-b-2 border-transparent transition-colors hover:text-gray-900 hover:border-gray-100 dark:hover:text-gray-50 dark:hover:border-gray-800"
                        >Notificaciones</Link>
                        <Link to='/settingsStudent'
                            className="flex items-center font-medium text-sm border-b-2 border-transparent transition-colors hover:text-gray-900 hover:border-gray-100 dark:hover:text-gray-50 dark:hover:border-gray-800"
                        >
                            <span>Mi perfil</span>
                            <span className="ml-2">
                                <Avatar>
                                    <AvatarImage src="https://github.com/shadcn.png" />
                                    <AvatarFallback>L</AvatarFallback>
                                </Avatar>
                            </span>
                        </Link>
                        <Link to='/'
                            className="flex items-center font-medium text-sm border-b-2 border-transparent transition-colors hover:text-gray-900 hover:border-gray-100 dark:hover:text-gray-50 dark:hover:border-gray-800"
                        >Salir</Link>
                    </nav>
                </div>
            </div>
        </nav>
    )

}export default NavbarStud;