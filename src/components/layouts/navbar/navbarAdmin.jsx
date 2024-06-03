import { Link, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import React, {useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { obtenerUsuario } from "@/services/usuario/usuarioService";


function NavbarAdmin() {
    const navigate = useNavigate();
    const [avatarUrl, setAvatarUrl] = useState("https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1095249842.jpg");
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const userNumber = sessionStorage.getItem("userNumber");
        if (userNumber) {
            obtenerUsuario(userNumber)
                .then((data) => {
                    if (data && data.image_link) {
                        setAvatarUrl(data.image_link);
                    }
                })
                .catch((error) => {
                    console.error("Error al obtener los datos del usuario", error);
                });
        }
    }, []);

    const handleLogout = () => {
        // Borra todo lo que tiene la sessionStorage
        sessionStorage.clear();
        // Redirige al usuario a la página de inicio de sesión o a la página principal
        navigate('/');
    };

    return (
        <nav className="inset-x- top-0 z-50 bg-gradient-to-r from-cyan-500 to-blue-500 shadow dark:bg-gray-950">
            <div className="container px-4 md:px-0">
                <div className="flex h-14 items-center">
                    <div className="text-3xl font-bold">SIEPROF</div>
                    <nav className="ml-auto flex items-center space-x-4">
                        <Link to={'/homeAdmin'}
                            className="font-medium text-sm border-b-2 border-transparent transition-colors hover:text-gray-900 hover:border-gray-100 dark:hover:text-gray-50 dark:hover:border-gray-800"
                        >Inicio</Link>
                        <Link to={'/registerStudent'}
                            className="font-medium text-sm border-b-2 border-transparent transition-colors hover:text-gray-900 hover:border-gray-100 dark:hover:text-gray-50 dark:hover:border-gray-800"
                        >Alumnos</Link>
                        <Link to={'/pageEmpresas'}
                            className="font-medium text-sm border-b-2 border-transparent transition-colors hover:text-gray-900 hover:border-gray-100 dark:hover:text-gray-50 dark:hover:border-gray-800"
                        >Empresas</Link>
                        <Link to={'/registerAdmin'}
                            className="font-medium text-sm border-b-2 border-transparent transition-colors hover:text-gray-900 hover:border-gray-100 dark:hover:text-gray-50 dark:hover:border-gray-800"
                        >Administradores</Link>
                        <Link to='/settingsAdmin'
                            className="flex items-center font-medium text-sm border-b-2 border-transparent transition-colors hover:text-gray-900 hover:border-gray-100 dark:hover:text-gray-50 dark:hover:border-gray-800"
                        >
                            <span>Mi perfil</span>
                            <span className="ml-2">
                                <Avatar>
                                    <AvatarImage src={avatarUrl} />
                                    <AvatarFallback>L</AvatarFallback>
                                </Avatar>
                            </span>
                        </Link>
                        <div className="relative inline-block text-left">
                            <button
                            onClick={handleLogout}
                            className="flex items-center font-medium text-sm border-b-2 border-transparent transition-colors hover:text-gray-900 hover:border-gray-100 dark:hover:text-gray-50 dark:hover:border-gray-800"
                            >
                                <FontAwesomeIcon icon={faRightFromBracket} size="xl"/>
                            </button>
                        </div>
                    </nav>
                </div>
            </div>
        </nav>
    )
}

export default NavbarAdmin;