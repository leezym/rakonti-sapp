import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { 
  setBackIcon, 
  setMenuIcon, 
  setFigurePos, 
  setEditingMode  
} from '../redux-store/reducers/uiSlice';
import {
  setNarrative, 
  setFeature,
  setCharacters,
  setCurrentStage
} from '../redux-store/reducers/storySlice';
import styled from 'styled-components';

function LoadStory({ currentPage, itemsPerPage, historias, setHistorias, id_usuario }) {
  const [estructuras, setEstructuras] = useState({});
  const [filaSeleccionada, setFilaSeleccionada] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const historiasPaginadas = historias
    .sort((a, b) => new Date(b.fecha_edicion) - new Date(a.fecha_edicion))
    .slice(startIndex, endIndex);

  useEffect(() => {
    axios.get(`http://localhost:5001/rakonti/historias/${id_usuario}`)
      .then(res => setHistorias(res.data))
      .catch(err => console.error('Error al cargar las historias del usuario:', err));
  }, []);

  useEffect(() => {
    if (historias.length === 0) return;

    const fetchEstructuras = async () => {
      const peticiones = historias.map(historia =>
        axios.get(`http://localhost:5001/rakonti/estructuras-narrativas/${historia.id_estructura}`)
          .then(res => ({ id_historia: historia.id_historia, estructura: res.data }))
          .catch(() => ({ id_historia: historia.id_historia, estructura: { nombre: 'Desconocida' } }))
      );

      const resultados = await axios.all(peticiones);
      const mapEstructuras = {};

      resultados.forEach(({ id_historia, estructura }) => {
        mapEstructuras[id_historia] = estructura;
      });

      setEstructuras(mapEstructuras);
    };

    fetchEstructuras();
  }, [historias]);

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
    setFilaSeleccionada(historia.id_historia);

    const estructuraCompleta = estructuras[historia.id_historia];

    if (!estructuraCompleta) {
      console.warn('Estructura no encontrada para la historia:', historia.id_historia);
      return;
    }

    try {
      const response = await axios.get(`http://localhost:5001/rakonti/personajes/historia/${historia.id_historia}`);

      dispatch(setNarrative(estructuraCompleta));
      dispatch(setFeature(historia));
      dispatch(setCharacters(response.data));
      dispatch(setCurrentStage(historia.paso_actual));

      // pdte

      navigate(`/map/${historia.id_historia}`);
    } catch (error) {
      console.error('Error al obtener personajes de la historia:', error);
    }  
  };

  return (
    <>
      <Subtitle>Tus Historias</Subtitle>
      <div style={{ marginTop: '20px', overflowX: 'auto', width: '100%' }}>
        <table style={{
          width: '100%',
          height: '100%',
          borderCollapse: 'collapse',
          borderSpacing: 0
        }}>
          <thead>
            <tr>
              <th style={{ padding: '8px', width: '33.33%', textAlign: 'center' }}>Nombre</th>
              <th style={{ padding: '8px', width: '33.33%', textAlign: 'center' }}>Última Edición</th>
              <th style={{ padding: '8px', width: '33.33%', textAlign: 'center' }}>Estructura</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={3} style={{
                height: '20px',
                backgroundImage: 'url("/images/table-line.png")',
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
                  <TableCell selected={filaSeleccionada === historia.id_historia}>{estructuras[historia.id_historia]?.nombre || 'Desconocida'}</TableCell>
                </TableRow>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

function RHomeView() {  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [vistaActiva, setVistaActiva] = useState('');
  const [historias, setHistorias] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(historias.length / itemsPerPage);
  const id_usuario = localStorage.getItem('id_usuario');

  useEffect(() => {
    dispatch(setNarrative(null));
    dispatch(setFeature(null));
    dispatch(setCharacters([]));
    dispatch(setCurrentStage(0));
  }, [dispatch]);

  return <div>
    <BackgroundImage src='images/rakonti-background.jpg' alt='rakonti-background'/>

    <Container>
      <LeftColumn>
        <Button onClick={() => navigate('/narratives')}>Nueva historia</Button>
        <Button onClick={() => setVistaActiva('cargarHistoria')}>Cargar historia</Button>
        <Button>Configuración</Button>
      </LeftColumn>
      <RightColumn>  
        <MenuContainer>
          {
            vistaActiva === 'cargarHistoria' && 
            <LoadStory 
              currentPage={currentPage} 
              itemsPerPage={itemsPerPage} 
              historias={historias} 
              setHistorias={setHistorias}
              id_usuario={id_usuario}
            />
          }
        </MenuContainer>
        <div style={{ marginTop: '10px', textAlign: 'center' }}>
          <ButtonPagination
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Anterior
          </ButtonPagination>

          <span style={{ margin: '0 10px', fontSize: '12px', color: 'white' }}>
            Página {currentPage} de {totalPages}
          </span>

          <ButtonPagination
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Siguiente
          </ButtonPagination>
        </div>
      </RightColumn>
    </Container>
  </div>;
}

const BackgroundImage = styled.img`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  object-fit: cover;
  z-index: -1;
`;

const Container = styled.div`
  top: 250px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 95vw; 
  box-sizing: border-box;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
    padding: 20px;
  }
`;

const LeftColumn = styled.div`
  margin-top:50px;
  flex: 0 0 20%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  height: 100%;

  @media (max-width: 768px) {
    margin-top:0px;
    flex: none;
    flex-direction: row;
    width: 100%;
    justify-content: center;
    align-items: center;
  }
`;
    
const RightColumn = styled.div`
  flex: 0 0 80%;
  display: flex;
  flex-direction: column;
  height: 100%;
  
  @media (max-width: 768px) {
    flex: none;
    width: 100%;
    justify-content: center;
    align-items: center;
  }
`;

const MenuContainer = styled.div`
  padding: 40px 10px 50px 10px;
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

  @media (max-width: 768px) {
    width: 100%;
    padding: 35px;
    border-radius: 80px;
  }
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
  padding: 15px 8px;
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
  font-size: 18px;
  font-weight: 800;
  color: #43474f;
  align-self: flex-start;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 15px;
  border: none;
  background-image: url('images/white-button.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 10px;
  background-color: transparent;
  color: #43474f;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    color: gray;
  }

  &:active {
    transform: scale(0.98);
  }
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

export default RHomeView;