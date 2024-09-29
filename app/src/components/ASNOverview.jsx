import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { useEffect, useState } from 'react';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

export const ASNOverview = ({ analysisResult }) => {
  const [areaChartData, setAreaChartData] = useState(null);
  const [statusChartData, setStatusChartData] = useState(null);
  const [envioEntradaChartData, setEnvioEntradaChartData] = useState(null); // Nuevo estado para el gráfico de Envío de entrada

  useEffect(() => {
    if (analysisResult && analysisResult.area_percentage && analysisResult.status_percentage && analysisResult.envio_entrada_percentage) {
      // Preparar datos para el gráfico de porcentaje por área
      const areaLabels = Object.keys(analysisResult.area_percentage || {});
      const areaValues = Object.values(analysisResult.area_percentage || {});

      const areaData = {
        labels: areaLabels,
        datasets: [
          {
            label: 'Porcentaje',
            data: areaValues,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      };
      setAreaChartData(areaData);

      // Preparar datos para el gráfico de porcentaje de estado del producto
      const statusLabels = Object.keys(analysisResult.status_percentage || {});
      const statusValues = Object.values(analysisResult.status_percentage || {});

      const statusData = {
        labels: statusLabels,
        datasets: [
          {
            label: 'Porcentaje de Estado',
            data: statusValues,
            backgroundColor: ['#4caf50', '#ff5722'], // Verde para Recibido, Naranja para Sin Recibir
          },
        ],
      };
      setStatusChartData(statusData);

      // Preparar datos para el gráfico de porcentaje de Envío de entrada
      const envioLabels = Object.keys(analysisResult.envio_entrada_percentage || {});
      const envioValues = Object.values(analysisResult.envio_entrada_percentage || {});

      const envioEntradaData = {
        labels: envioLabels,
        datasets: [
          {
            label: 'Porcentaje de Envío de Entrada',
            data: envioValues,
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1,
          },
        ],
      };
      setEnvioEntradaChartData(envioEntradaData); // Establecer datos del gráfico de Envío de entrada
    }
  }, [analysisResult]);

  // Verificar si analysisResult está definido antes de renderizar los gráficos
  if (!analysisResult || !areaChartData || !statusChartData || !envioEntradaChartData) {
    return <p>Loading...</p>; // Mostrar un mensaje de carga o spinner si analysisResult o los gráficos no están listos
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
      {/* Card de LPN */}
      <div className="bg-white shadow-lg p-4 rounded-lg flex flex-col items-center justify-center">
        <h2 className="text-lg font-bold">LPN'S TOTALES DEL ASN</h2>
        <p className="text-6xl font-extrabold text-center mt-4">{analysisResult.total_lpns}</p>
      </div>

      {/* Card de Producto con más unidades */}
      <div className="bg-white shadow-lg p-4 rounded-lg flex flex-col items-center justify-center">
        <h2 className="text-lg font-bold">PRODUCTO TOP DEL ASN</h2>
        <p>{analysisResult.top_product.description}</p>
        <p>SKU: {analysisResult.top_product.sku}</p>
        <p>Unidades: {analysisResult.top_product.units}</p>
      </div>

      {/* Card de porcentaje por área */}
      <div className="bg-white shadow-lg p-4 rounded-lg flex flex-col items-center justify-center">
        <h2 className="text-lg font-bold">PRODUCTOS POR ÁREAS (%)</h2>
        <div>
          <Bar
            data={areaChartData}
            options={{
              responsive: true,
              plugins: { legend: { display: false } },
              scales: {
                x: {
                  ticks: {
                    maxRotation: 0, // Evita la rotación de las etiquetas
                    minRotation: 0,
                    callback: function (value) {
                      const label = this.getLabelForValue(value);
                      return label.length > 10 ? label.substr(0, 10) + '...' : label; // Recortar etiquetas largas
                    },
                  },
                },
              },
            }}
          />
        </div>
      </div>

      {/* Card de estado del producto */}
      <div className="bg-white shadow-lg p-4 rounded-lg flex flex-col items-center justify-center">
        <h2 className="text-lg font-bold">RECIBIDO VS SIN RECIBIR</h2>
        <div>
          <Doughnut
            data={statusChartData}
            options={{ responsive: true, plugins: { legend: { position: 'bottom' } } }}
          />
        </div>
      </div>

      {/* Nueva Card de Envío de Entrada */}
      <div className="bg-white shadow-lg p-4 rounded-lg flex flex-col items-center justify-center">
        <h2 className="text-lg font-bold">OSXXX-XXX-XXX (%)</h2>
        <div>
          <Bar
            data={envioEntradaChartData}
            options={{
              responsive: true,
              plugins: { legend: { display: false } },
              scales: {
                x: {
                  ticks: {
                    maxRotation: 0,
                    minRotation: 0,
                  },
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};
