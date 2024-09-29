import { useState } from 'react';
import { FaFileExcel, FaUpload, FaSearch } from 'react-icons/fa';
import axios from 'axios';

export const ASNControls = ({ setAnalysisResult }) => {
  const [file, setFile] = useState(null);
  const [filePath, setFilePath] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Por favor, selecciona un archivo');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setFilePath(response.data.file_path);
      alert(response.data.message);
    } catch (error) {
      console.error('Error al subir el archivo', error);
      alert('Error al subir el archivo');
    }
  };

  const handleAnalyze = async () => {
    if (!filePath) {
      alert('Primero sube un archivo');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/analyze', {
        file_path: filePath,
      });
      const analysisData = response.data;
      if (!analysisData || Object.keys(analysisData).length === 0) {
        alert('Sin datos. Primero sube un archivo válido.');
      } else {
        setAnalysisResult(analysisData);
      }
    } catch (error) {
      console.error('Error al analizar el archivo', error);
      alert('Error al analizar el archivo');
    }
  };

  return (
    <div className="flex flex-col lg:flex-row items-center gap-4 py-4">
      <label className="flex items-center px-4 py-2 bg-green-600 text-white font-semibold rounded-md cursor-pointer hover:bg-green-700">
        <FaFileExcel className="mr-2" /> Elegir archivo
        <input type="file" className="hidden" onChange={handleFileChange} />
      </label>

      <button
        onClick={handleUpload}
        className="flex items-center px-4 py-2 bg-orange-500 text-white font-semibold rounded-md hover:bg-orange-600"
      >
        <FaUpload className="mr-2" /> Cargar ASN
      </button>

      <button
        onClick={handleAnalyze}
        className="flex items-center px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
      >
        <FaSearch className="mr-2" /> Analizar
      </button>
    </div>
  );
};
