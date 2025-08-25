import { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setFeature } from '../redux-store/reducers/storySlice';
import styled from 'styled-components';

function TopMenu({ refsTutorial, isNewStory, feature, handleSave, handleFeature, handleCharacters, handleTips, handleToggleSteps, hasUnsavedChanges, popUp, showSteps }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const isMapRoute = location.pathname.startsWith('/map/');
  
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef(null);

  const handleDoubleClick = () => {
    setIsEditing(true);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      inputRef.current.blur();
    }
  };

  const handleChange = (e) => {
    dispatch(setFeature({
      ...feature,
      titulo: e.target.value
    }));
  };

  const handleClick = (label) => {
    if (hasUnsavedChanges) {
      const confirm = window.confirm("Tienes cambios sin guardar. ¿Estás seguro de continuar?");
      if (!confirm) return;
    }
    
    navigate(`/${label}`);
  };

  return (
    <MenuContainer>
      <MenuSection ref={refsTutorial?.menu_left}>
        <IconButton onClick={() => handleClick('home')}>
          <IconImage src="images/home-icon.png" alt="Home" />
        </IconButton>
        {(isMapRoute || isNewStory) && (
          <IconButton onClick={handleSave}>
            <IconImage src="images/save-icon.png" alt="Guardar" />
          </IconButton>
        )}
        <IconButton onClick={() => popUp()}>
          <IconImage src="images/folder-icon.png" alt="Cargar" />
        </IconButton>
      </MenuSection>

      {feature && (
        <TitleWrapper ref={refsTutorial?.title}>
          {isEditing ? (
            <TitleInput
              ref={inputRef}
              value={feature.titulo}
              onChange={handleChange}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              maxLength={50}
            />
          ) : (
            <TitleText
              onDoubleClick={handleDoubleClick}
              isPlaceholder={!feature.titulo || feature.titulo.trim() === ''}
            >
              {feature.titulo?.trim() || 'Haz doble clic para editar'}
            </TitleText>
          )}
        </TitleWrapper>
      )}

      <MenuSection ref={refsTutorial?.menu_right}>
        {(isMapRoute || isNewStory) && (
        <>
          <IconButton onClick={handleFeature} disabled={showSteps}>
            <IconImage src="images/structure-icon.png" alt="Pilares" />
          </IconButton>
          <IconButton onClick={handleCharacters} disabled={showSteps}>
            <IconImage src="images/characters-icon.png" alt="Personajes" />
          </IconButton>
          <IconButton onClick={handleTips} disabled={showSteps}>
            <IconImage src="images/tips-icon.png" alt="Tips" />
          </IconButton>
          <IconButton onClick={handleToggleSteps}>
            <IconImage src="images/view-icon.png" alt="Escritura" />
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
  background-image: url('images/top-bar.png');
  opacity: 1;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 20px 10px 10px 10px;
  }
`;

const MenuSection = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  @media (max-width: 768px) {
    margin-bottom: 10px;
    width: 100%;
    justify-content: center;
  }
`;
    
const IconButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  margin: 0;
  width: 50px;
  height: 50px;
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

  @media (max-width: 768px) {
    position: relative;
    left: 0%;
    transform: translateX(0%);
  }
`;

const TitleText = styled.h1`
  font-size: 28px;
  font-weight: bold;
  color: ${({ isPlaceholder }) => (isPlaceholder ? 'white' : '#43474f')};
  margin: 10px 0;
  cursor: pointer;
`;
  
const TitleInput = styled.input`
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