import React, { useState } from "react";
import NavbarStud from "@/components/layouts/navbar/navbarStud";
import TableEmpresasForAlumnos from "@/components/layouts/tables/tableEmpresasForAlumnos";
import { Link } from "react-router-dom";



function PageEmpresaForAlumnos() {

  const [selectedSection, setSelectedSection] = useState('all-vacancies');
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
                                    onClick={() => setSelectedSection('all-vacancies')}
                                    className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-gray-900 dark:hover:text-gray-50 ${selectedSection === 'all-vacancies' ? 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50' : 'text-gray-500 dark:text-gray-400'}`}
                                >Todas las vacantes</Link>
                                <Link 
                                    onClick={() => setSelectedSection('recommended-vacancies')}
                                    className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-gray-900 dark:hover:text-gray-50 ${selectedSection === 'recommended-vacancies' ? 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50' : 'text-gray-500 dark:text-gray-400'}`}
                                >Vacantes para ti</Link>
                                
                            </nav>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col">
                    <main className="flex-1 p-6">
                        <div className="space-y-6">
                           

                            {selectedSection === 'all-vacancies' && (
                              //pasar parametro al componente

                                <TableEmpresasForAlumnos
                                tipoVacante={1}
                                />
                            )}{selectedSection === 'recommended-vacancies' && (
                       
                               <TableEmpresasForAlumnos
                                tipoVacante={0}
                                />
                            )}


                        </div>
                    </main>
                </div>
      </div>

    </div>


   
  );
}

export default PageEmpresaForAlumnos;