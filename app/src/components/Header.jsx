import { useState } from 'react';
import logo from '../assets/Promart_logo.webp'; // Importamos el logo

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false); // Estado para controlar el toggle en móviles

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo, siempre visible en móviles */}
        <div>
          <img src={logo} alt="Promart Logo" className="w-24 lg:w-32" /> {/* Ajustamos el tamaño para móviles */}
        </div>

        {/* Botón de menú en móviles */}
        <div className="lg:hidden">
          <button onClick={toggleMenu} className="focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
              <path d="M216 128H40a8 8 0 010-16h176a8 8 0 010 16zm0 48H40a8 8 0 010-16h176a8 8 0 010 16zm0-96H40a8 8 0 010-16h176a8 8 0 010 16z" />
            </svg>
          </button>
        </div>

        {/* Menú en desktop */}
        <nav className="hidden lg:flex lg:items-center lg:gap-8">
          <a href="#asn" className="text-md font-bold text-[#1C160C] hover:text-orange-500">ASN</a>
          <a href="#ingresa-mercaderia" className="text-md font-bold text-[#1C160C] hover:text-orange-500">Ingresa Mercadería</a>
          <a href="#reporte-incidencias" className="text-md font-bold text-[#1C160C] hover:text-orange-500">Reporte de Incidencias</a>
        </nav>
      </div>

      {/* Estilo condicional para móviles: Menú se despliega debajo cuando está abierto */}
      {isOpen && (
        <div className="lg:hidden bg-white shadow-md">
          <nav className="flex flex-col gap-4 p-4">
            <a href="#asn" className="text-md font-bold text-[#1C160C] hover:text-orange-500">ASN</a>
            <a href="#ingresa-mercaderia" className="text-md font-bold text-[#1C160C] hover:text-orange-500">Ingresa Mercadería</a>
            <a href="#reporte-incidencias" className="text-md font-bold text-[#1C160C] hover:text-orange-500">Reporte de Incidencias</a>
          </nav>
        </div>
      )}
    </header>
  );
};
