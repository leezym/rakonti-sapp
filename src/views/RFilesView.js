import api from "../api/axiosConfig";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import styled from 'styled-components';
import downloadWordDocument from '../functions/downloadWordDocument';

function LoadStory({ currentPage, itemsPerPage, historias, setHistorias, id_usuario, setNarrative, setFeature, setGenre, setPlot, setDesire, setTime, setCharacters, setPersonalities, setRoles, setCurrentStage, closePopup }) {
  const [filaSeleccionada, setFilaSeleccionada] = useState(null);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const historiasPaginadas = historias
    .sort((a, b) => new Date(b.fecha_edicion) - new Date(a.fecha_edicion))
    .slice(startIndex, endIndex);

  useEffect(() => {
    setLoading(true);
    api.get(`/historias/${id_usuario}`)
      .then(res => setHistorias(res.data))
      .catch(err => console.error('Error al cargar las historias del usuario:', err))
      .finally(() => setLoading(false));
  }, [id_usuario]);

  const formatearFecha = (fechaString) => {
    const fecha = new Date(fechaString);
    const hoy = new Date();
    const msPorDia = 1000 * 60 * 60 * 24;
    const diferenciaDias = Math.floor((hoy - fecha) / msPorDia);

    if (diferenciaDias < 1) return 'Hace menos de 1 día';
    if (diferenciaDias === 1) return 'Hace 1 día';
    if (diferenciaDias <= 6) return `Hace ${diferenciaDias} días`;
    if (diferenciaDias <= 13) return 'Hace 1 semana';

    return fecha.toLocaleDateString('es-CO');
  };

  const handleSeleccionarFila = async (historia) => {
    if (!window.confirm("¿Estás seguro de cargar esta historia?")) return;

    setFilaSeleccionada(historia.id_historia);

    try {
      dispatch(setNarrative(historia.estructuras_narrativas));
      dispatch(setFeature(historia));
      dispatch(setGenre(historia.generos));
      dispatch(setPlot(historia.tramas));
      dispatch(setDesire(historia.objetos_deseo));
      dispatch(setTime(historia.tiempo_espacio));
      dispatch(setCharacters(historia.personajes));
      dispatch(setPersonalities(historia.personajes.map(p => p.personalidades)));
      dispatch(setRoles(historia.personajes.map(p => p.roles)));
      dispatch(setCurrentStage(historia.paso_actual));

      closePopup();
      navigate(`/map/${historia.id_historia}`);

    } catch (error) {
      console.error('Error al cargar datos de la historia:', error.response?.data || error.message);
    }
  };

  return (
    <>
      <Subtitle>Da clic en la historia que quieras cargar:</Subtitle>
      <br/>

      {loading && historiasPaginadas.length !== 0 ? (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <p>Cargando tus historias...</p>
        </div>
      ) : (
        <div style={{ marginTop: '5px', marginBottom: '20px', overflowX: 'auto', width: '100%' }}>
          <table style={{
            width: '100%',
            height: '100%',
            borderCollapse: 'collapse',
            borderSpacing: 0
          }}>
            <thead>
              <tr>
                <th style={{ padding: '8px', width: '25%', textAlign: 'center' }}>Nombre</th>
                <th style={{ padding: '8px', width: '25%', textAlign: 'center' }}>Última Edición</th>
                <th style={{ padding: '8px', width: '25%', textAlign: 'center' }}>Estructura</th>
                <th style={{ padding: '8px', width: '25%', textAlign: 'center' }}>Exportar</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={4} style={{
                  height: '20px',
                  backgroundImage: 'url("images/table-line.png")',
                  backgroundRepeat: 'repeat-x',
                  backgroundPosition: 'bottom',
                  backgroundSize: '100% 100%',
                  padding: 0,
                  margin: 0,
                  border: 'none'
                }} />
              </tr>
              {historiasPaginadas.map(historia => {
                return (
                  <TableRow
                    key={historia.id_historia}
                    selected={filaSeleccionada === historia.id_historia}
                    onClick={() => handleSeleccionarFila(historia)}
                  >
                    <TableCell selected={filaSeleccionada === historia.id_historia}>{historia.titulo}</TableCell>
                    <TableCell selected={filaSeleccionada === historia.id_historia}>{formatearFecha(historia.fecha_edicion)}</TableCell>
                    <TableCell selected={filaSeleccionada === historia.id_historia}>{historia.estructuras_narrativas.nombre}</TableCell>
                    <TableCell selected={filaSeleccionada === historia.id_historia}>
                      <button
                        onClick={async e => {
                          e.stopPropagation();

                          try {
                            // 1. Obtener pasos de la estructura narrativa
                            const pasosRes = await api.get(`/pasos-estructura-narrativa/estructura/${historia.id_estructura}`);
                            const stages = pasosRes.data;

                            // 2. Obtener contenidos de la historia
                            const contenidosRes = await api.get(`/pasos-estructura-narrativa-historia/historia/${historia.id_historia}`);
                            const contenidosArray = contenidosRes.data; 

                            // 3. Construir objeto stepContents { id_paso_estructura: contenido, ... }
                            const stepContents = {};
                            contenidosArray.forEach(item => {
                              stepContents[item.id_paso_estructura] = item.contenido;
                            });

                            // 4. Llamar la función para descargar Word
                            downloadWordDocument(historia.titulo, stages, stepContents);

                          } catch (error) {
                            console.error("Error al descargar documento Word:", error);
                            alert("Error al descargar el documento Word.");
                          }
                        }}
                        style={{ cursor: "pointer", padding: "6px 12px", fontSize: "12px" }}
                      >
                        Descargar
                      </button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </tbody>
          </table>
        </div>          
      )}      
    </>
  );
}

function RFilesView({ setNarrative, setFeature, setGenre, setPlot, setDesire, setTime, setCharacters, setPersonalities, setRoles, setCurrentStage, closePopup }) {  
  const [historias, setHistorias] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(historias.length / itemsPerPage);
  const id_usuario = localStorage.getItem('id_usuario');

  return <>
    <MenuContainer>
      <LoadStory 
        currentPage={currentPage} 
        itemsPerPage={itemsPerPage} 
        historias={historias} 
        setHistorias={setHistorias}
        id_usuario={id_usuario}
        setNarrative={setNarrative}
        setFeature={setFeature}
        setGenre={setGenre}
        setPlot={setPlot}
        setDesire={setDesire}
        setTime={setTime}
        setCharacters={setCharacters}
        setPersonalities={setPersonalities}
        setRoles={setRoles}
        setCurrentStage={setCurrentStage}
        closePopup={closePopup}
      />
    </MenuContainer>

    <div style={{ width:'96%', textAlign: 'center', bottom: 0, margin:'20px 0px'}}>
      <ButtonPagination
        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
      >
        Anterior
      </ButtonPagination>

      <span style={{ margin: '0 10px', fontSize: '12px', color: '#43474f' }}>
        Página {currentPage} de {totalPages}
      </span>

      <ButtonPagination
        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
      >
        Siguiente
      </ButtonPagination>
    </div>
  </>;
}

const MenuContainer = styled.div`
  z-index: 9999;
  padding: 0px 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url('images/section.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  width: 100%;
  box-sizing: border-box;
  border-radius: 45px;
`;

const TableRow = styled.tr`
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: rgba(0, 0, 0, 0.08); /* hover suave */
  }

  &:active {
    background-color: rgba(0, 0, 0, 0.18); /* click visible */
  }

  ${({ selected }) =>
    selected &&
    `
      background-color: rgba(0, 0, 0, 0.18); /* fila seleccionada */
    `}
`;

const TableCell = styled.td`
  font-size: 14px;
  padding: 15px 15px;
  text-align: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  transition: background-color 0.2s ease;

  ${TableRow}:hover & {
    background-color: rgba(0, 0, 0, 0.08);
  }

  ${TableRow}:active & {
    background-color: rgba(0, 0, 0, 0.18);
  }

  ${({ selected }) =>
    selected &&
    `
      background-color: rgba(0, 0, 0, 0.18);
    `}
`;

const Subtitle = styled.div`
  margin-left:40px;
  font-size: 16px;
  font-weight: 800;
  color: #43474f;
  align-self: center;
`;

const ButtonPagination = styled.button`
  padding: 10px 10px;
  font-size: 12px;
  border: none;
  border-radius: 5px;
  background-color: #43474f;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    color: gray;
  }

  &:active {
    transform: scale(0.98);
  }
`;

export default RFilesView;