import CardDataStudent from "@/components/layouts/cards/cardDataStudent";
import CardSchoolStudent from "@/components/layouts/cards/CardSchoolStudent";
import CardUploadCV from "@/components/layouts/cards/cardUploadCV";
import CardExpStudent from "@/components/layouts/cards/cardExpStudent";
import CardPersonalStudent from "@/components/layouts/cards/cardPersonalStudent";
import NavbarStud from "@/components/layouts/navbar/navbarStud"; 
import { Link } from "react-router-dom";
import React, { useState } from 'react';

function SettingStud() {
    const [selectedSection, setSelectedSection] = useState('personal-information');

    return (
        <div>
            <NavbarStud />
            <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
                
                <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
                    <div className="flex h-full max-h-screen flex-col gap-2">
                        <div className="flex h-[60px] items-center border-b px-6">
                            
                        </div>
                        <div className="flex-1 overflow-auto py-2">
                            <nav className="grid items-start px-4 text-sm font-medium">
                                <Link 
                                    onClick={() => setSelectedSection('personal-information')}
                                    className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-gray-900 dark:hover:text-gray-50 ${selectedSection === 'personal-information' ? 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50' : 'text-gray-500 dark:text-gray-400'}`}
                                >Información Personal</Link>
                                <Link 
                                    onClick={() => setSelectedSection('school-information')}
                                    className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-gray-900 dark:hover:text-gray-50 ${selectedSection === 'school-information' ? 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50' : 'text-gray-500 dark:text-gray-400'}`}
                                >Información Escolar</Link>
                                <Link 
                                    onClick={() => setSelectedSection('curriculum')}
                                    className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-gray-900 dark:hover:text-gray-50 ${selectedSection === 'curriculum' ? 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50' : 'text-gray-500 dark:text-gray-400'}`}
                                >Curriculum</Link>
                                <Link 
                                    onClick={() => setSelectedSection('experience')}
                                    className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-gray-900 dark:hover:text-gray-50 ${selectedSection === 'experience' ? 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50' : 'text-gray-500 dark:text-gray-400'}`}
                                >Experiencia</Link>
                                <Link 
                                    onClick={() => setSelectedSection('personalizar')}
                                    className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-gray-900 dark:hover:text-gray-50 ${selectedSection === 'personalizar' ? 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50' : 'text-gray-500 dark:text-gray-400'}`}
                                >Personalizar</Link>
                                
                            </nav>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col">
                    <main className="flex-1 p-6">
                        <div className="space-y-6">
                            <div>
                                <h1 className="text-2xl font-bold">Mi perfil</h1>
                                <p className="text-gray-500 dark:text-gray-400">Actualiza la información de tu cuenta para mejorar tu experiencia.</p>
                            </div>

                            {selectedSection === 'personal-information' && (
                                <CardDataStudent/>
                            )}{selectedSection === 'curriculum' && (
                                <CardUploadCV/>
                            )}{selectedSection === 'school-information' && (
                                <CardSchoolStudent/>
                            )}{selectedSection === 'experience' && (
                                <CardExpStudent/>
                            )}
                            {selectedSection === 'personalizar' && (
                                <CardPersonalStudent/>
                            )}


                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}

export default SettingStud;