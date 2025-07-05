import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setFeature } from '../redux-store/reducers/storySlice';
import styled from 'styled-components';

function TopMenu({feature, handleSave}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
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
    navigate(`/${label}`);
  };

  return (
    <MenuContainer>
      <MenuSection>
        <IconButton onClick={() => handleClick('home')}>
          <IconImage src="images/home-icon.png" alt="Home" />
        </IconButton>
        <IconButton onClick={() => handleSave()}>
          <IconImage src="images/save-icon.png" alt="Save" />
        </IconButton>
        <IconButton onClick={() => handleClick('Folder')}>
          <IconImage src="images/folder-icon.png" alt="Folder" />
        </IconButton>
      </MenuSection>

      {feature?.titulo !== undefined && (
        <MenuSection>{isEditing ? (
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
              isPlaceholder={feature.titulo?.trim() === ''}
            >
              {feature.titulo?.trim() !== '' ? feature.titulo : 'Haz doble clic para editar'}
            </TitleText>
          )}
        </MenuSection>
      )}

      <MenuSection>
        <IconButton onClick={() => handleClick('Options')}>
          <IconImage src="images/options-icon.png" alt="Options" />
        </IconButton>
        <IconButton onClick={() => handleClick('Profile')}>
          <IconImage src="images/profile-icon.png" alt="Profile" />
        </IconButton>
        <IconButton onClick={() => handleClick('Graph')}>
          <IconImage src="images/graph-icon.png" alt="Graph" />
        </IconButton>
        <IconButton onClick={() => handleClick('View')}>
          <IconImage src="images/view-icon.png" alt="View" />
        </IconButton>
      </MenuSection>
    </MenuContainer>
  );
}

const MenuContainer = styled.div`
  position: sticky;
  top: 0;
  z-index: 9999;
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
`;
  
const IconImage = styled.img`
  width: 50px;
  height: 50px;
  object-fit: contain;
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
  
  &:focus {
    outline: none;
  }
`;
  
export default TopMenu;