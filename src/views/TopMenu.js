import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setFeature } from '../redux-store/reducers/storySlice';
import styled from 'styled-components';
import api from '../api/axiosConfig';

function TopMenu({ refsTutorial, showTutorial, feature, handleSave, handleFeature, handleCharacters, handleTips, handleToggleSteps, hasUnsavedChanges, popUp, showSteps }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const isMapRoute = location.pathname.startsWith('/map/');

  const [isEditing, setIsEditing] = useState(false);
  const [titulo, setTitulo] = useState(feature?.titulo || '');
  const inputRef = useRef(null);

  useEffect(() => {
    setTitulo(feature?.titulo || '');
  }, [feature?.titulo]);

  const handleDoubleClick = () => {
    setTitulo(feature?.titulo || '');
    setIsEditing(true);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const handleBlur = async () => {
    setIsEditing(false);

    const tituloLimpio = titulo?.trim() || '';

    // Antes esto solo hacía dispatch(setFeature(...)) — el título editado
    // por doble clic quedaba SOLO en Redux. Se persistía en el backend nada
    // más si, después, el usuario pasaba por "Guardar" o "Siguiente paso"
    // en RMapView (que sí manda ...feature completo en su PUT). Si en cambio
    // el usuario navegaba a Home/Personajes/Pilares o cerraba la app sin
    // pasar por ahí, el cambio de título se perdía en silencio (mismo
    // patrón que el bug ya corregido de "feature" desactualizado en Redux).
    // Ahora se guarda de inmediato en el backend al perder el foco, sin
    // depender de otro flujo posterior.
    if (!tituloLimpio || tituloLimpio === feature?.titulo?.trim()) {
      // Sin cambio real, o título vacío: no llamamos al backend (un título
      // vacío no debería aceptarse) y restauramos el valor mostrado.
      setTitulo(feature?.titulo || '');
      return;
    }

    const featureActualizada = { ...feature, titulo: tituloLimpio };

    // Durante el wizard de "4 pilares" (RFeaturesView.js), la historia
    // todavía no existe en el backend hasta terminar el paso 5 — feature.id_historia
    // es undefined en ese tramo. Antes, editar el título aquí (doble clic en
    // el TopMenu, visible durante todo el wizard) intentaba de todas formas
    // hacer PUT /historias/undefined, que fallaba con un error confuso justo
    // al crear la historia por primera vez. Ahora, si todavía no hay
    // id_historia, el título se actualiza solo en Redux — RFeaturesView.js ya
    // toma feature.titulo al hacer el POST /historias inicial, así que el
    // título editado aquí queda incluido igual, sin necesidad de un PUT.
    if (!feature?.id_historia) {
      dispatch(setFeature(featureActualizada));
      return;
    }

    try {
      const historiaResponse = await api.put(`/historias/${feature.id_historia}`, featureActualizada);
      dispatch(setFeature(historiaResponse.data?.data || featureActualizada));
    } catch (error) {
      const errorMsg = error.response?.data?.error || error.response?.data?.detalle || 'Error al guardar el título';
      alert(errorMsg);
      // No se pudo guardar: revertimos el título mostrado al que sigue
      // vigente en el backend, para no dar la impresión de que sí cambió.
      setTitulo(feature?.titulo || '');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      inputRef.current.blur();
    }
  };

  const handleChange = (e) => {
    setTitulo(e.target.value);
  };

  const handleClick = async (label) => {
    if (hasUnsavedChanges) {
      const confirm = await window.confirm("Tienes cambios sin guardar. ¿Estás seguro de continuar?");
      if (!confirm) return;
    }

    navigate(`/${label}`);
  };

  return (
    <MenuContainer>
      <MenuSection ref={refsTutorial?.menu_left}>
        <IconButton onClick={() => handleClick('home')} disabled={showTutorial}>
          <IconImage src="images/home-icon.png" loading='lazy' alt="Home"/>
        </IconButton>
        {isMapRoute && (
          <IconButton onClick={handleSave} disabled={showTutorial}>
            <IconImage src="images/save-icon.png" loading='lazy' alt="Guardar"/>
          </IconButton>
        )}
        <IconButton onClick={() => popUp()} disabled={showTutorial}>
          <IconImage src="images/folder-icon.png" loading='lazy' alt="Cargar"/>
        </IconButton>
      </MenuSection>

      {feature && (
        <TitleWrapper ref={refsTutorial?.title}>
          {isEditing ? (
            <Input
              ref={inputRef}
              value={titulo}
              onChange={handleChange}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              maxLength={50}
            />
          ) : (
            <TitleText
              onDoubleClick={handleDoubleClick}
              isPlaceholder={!titulo || titulo.trim() === ''}
            >
              {titulo?.trim() || 'Haz doble clic para editar'}
            </TitleText>
          )}
        </TitleWrapper>
      )}

      <MenuSection ref={refsTutorial?.menu_right}>
        {isMapRoute && (
        <>
          <IconButton onClick={handleFeature} disabled={showSteps || showTutorial}>
            <IconImage src="images/structure-icon.png" loading='lazy' alt="Pilares" />
          </IconButton>
          <IconButton onClick={handleCharacters} disabled={showSteps || showTutorial}>
            <IconImage src="images/characters-icon.png" loading='lazy' alt="Personajes" />
          </IconButton>
          <IconButton onClick={handleTips} disabled={showSteps || showTutorial}>
            <IconImage src="images/tips-icon.png" loading='lazy' alt="Tips" />
          </IconButton>
          <IconButton onClick={handleToggleSteps} disabled={showTutorial}>
            <IconImage src="images/view-icon.png" loading='lazy' alt="Escritura" />
          </IconButton>
        </>
        )}
      </MenuSection>
    </MenuContainer>
  );
}

const MenuContainer = styled.div`
  position: sticky;
  top: 0;
  z-index: 999;
  opacity: 1;
  background-image: url('images/top-bar.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 20px;
`;

const MenuSection = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
    
const IconButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  margin: 0;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    opacity: 0.5;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;
  
const IconImage = styled.img`
  width: 50px;
  height: 50px;
  object-fit: contain;
`;

const TitleWrapper = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  max-width: 50%;
`;

const TitleText = styled.h1`
  font-size: 25px;
  font-weight: bold;
  color: ${({ isPlaceholder }) => (isPlaceholder ? 'white' : '#43474f')};
  margin: 10px 0;
  cursor: pointer;
`;
  
const Input = styled.input`
  font-size: 28px;
  font-weight: bold;
  color: #43474f;
  background: transparent;
  border: none;
  outline: none;
  width: 100%;
  margin: 10px 0;
  padding: 0;
  caret-color: #43474f;
  text-align: center;

  &:focus {
    outline: none;
  }
`;

export default TopMenu;