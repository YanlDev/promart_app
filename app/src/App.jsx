import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Header } from './components/Header';
import { ASNControls } from './components/ASNControls';
import { ASNOverview } from './components/ASNOverview'; // Importamos el componente de vista general

const App = () => {
  const [analysisResult, setAnalysisResult] = useState(null);  // Definir el estado para los resultados del análisis

  return (
    <Router>
      <Header />
      <Routes>
        {/* Ruta para la pestaña ASN con los controles y las tarjetas */}
        <Route
          path="/asn"
          element={
            <div className="container mx-auto px-4">
              <ASNControls setAnalysisResult={setAnalysisResult} /> {/* Pasamos la función setAnalysisResult */}
              <ASNOverview analysisResult={analysisResult} />  {/* Pasamos los resultados del análisis */}
            </div>
          }
        />
        
        {/* Otras rutas para las demás secciones */}
      </Routes>
    </Router>
  );
};

export default App;
