/**
 * @author Martín Vladimir Alonso Sierra Galvis 
 * @version 1.0.1
 */

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { 
  setBackIcon, 
  setMenuIcon, 
  setFigurePos, 
  setEditingMode  
} from '../redux-store/reducers/uiSlice';
import { 
  setMode, 
  setNarrative, 
  setFeature, 
  setFeatureItem, 
  setCharacter, 
  setCharacterIndex, 
  setCurrentStage, 
  setCurrentStageIndex, 
  setText, 
  setAudios 
} from '../redux-store/reducers/storySlice';
import styled from 'styled-components';

function LoadStory({ formData, handleChange }) {
  const historias = [
    {
      id_historia: 1,
      titulo: "Inicio",
      estructura: "Pantalla principal",
      fecha_edicion: "2024-05-16T10:23:00Z"
    },
    {
      id_historia: 2,
      titulo: "FIN",
      estructura: "Pantalla final",
      fecha_edicion: "2025-05-16T10:23:00Z"
    }
  ];

  /*const [historias, setHistorias] = useState([]);

  useEffect(() => {
    const fetchHistorias = async () => {
      try {
        const response = await axios.get(`/rakonti/historias/${idUsuario}`);
        setHistorias(response.data);
      } catch (error) {
        console.error('Error al obtener historias:', error);
      }
    };

    if (idUsuario) {
      fetchHistorias();
    }
  }, [idUsuario]);*/

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

  return (
    <>
      <Subtitle>Tus Historias</Subtitle>
      <div style={{ marginTop: '20px', overflowX: 'auto', width: '100%' }}>
        <table style={{
          width: '100%',
          height: '100%',
          borderCollapse: 'collapse'
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
            {historias
              .sort((a, b) => new Date(b.fecha_edicion) - new Date(a.fecha_edicion))
              .map((historia) => (
                <tr key={historia.id_historia}>
                  <td style={{ padding: '8px', textAlign: 'center' }}>{historia.titulo}</td>
                  <td style={{ padding: '8px', textAlign: 'center' }}>{formatearFecha(historia.fecha_edicion)}</td>
                  <td style={{ padding: '8px', textAlign: 'center' }}>{historia.descripcion}</td>
                </tr>
            ))}
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

  useEffect(() => {
    dispatch(setBackIcon(null));
    dispatch(setMenuIcon('menu-icon.png'));

    /** Hard reset de todos los estados */
    dispatch(setFigurePos(null));
    dispatch(setEditingMode(false));

    dispatch(setMode(null));
    dispatch(setNarrative(null));
    dispatch(setFeature(null));
    dispatch(setFeatureItem({ key: 'genre', value: null }));
    dispatch(setFeatureItem({ key: 'plot', value: null }));
    dispatch(setFeatureItem({ key: 'desire', value: null }));
    dispatch(setFeatureItem({ key: 'timeSpace', value: null }));
    dispatch(setCharacter(null));
    dispatch(setCharacterIndex(0));
    dispatch(setCurrentStage(null));
    dispatch(setCurrentStageIndex(-1));
    dispatch(setText([]));
    dispatch(setAudios([]));
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
          {vistaActiva === 'cargarHistoria' && <LoadStory />}
        </MenuContainer>
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
  flex: 0 0 20%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  height: 100%;

  @media (max-width: 768px) {
    flex: none;
    flex-direction: row;
    width: 100%;
    justify-content: center;
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
    margin-top: 20px;
  }
`;

const MenuContainer = styled.div`
  width: 100%;
  height: 100%;
  background-image: url('images/big-section.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 40px;
  padding: 20px;
  box-sizing: border-box;
  margin-bottom:30px;
  
  @media (max-width: 768px) {
    border-radius: 30px;
  }
`;

const Title = styled.h1`
  font-size:40x;
  font-weight: 800;
  color: #43474f;
  text-align: center;
  margin-bottom: 20px;
`;

const Subtitle = styled.div`
  font-size: 18px;
  font-weight: 800;
  color: #43474f;
  align-self: flex-start;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-size: 14px;
  font-weight: 600;
  color: #43474f;
`;

const MenuImage = styled.img`
  height: 40px;
  margin: 0px 15px;
  width: 40px;
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

export default RHomeView;