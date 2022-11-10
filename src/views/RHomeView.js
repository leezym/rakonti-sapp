/**
 * @author Martín Vladimir Alonso Sierra Galvis 
 * @version 1.0.1
 */

import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setBackIcon, setMenuIcon } from '../redux-store/reducers/uiSlice';
import styled from 'styled-components';

import BackgroundImage from '../styled/BackgroundImage';

function RHomeView() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setBackIcon(null));
    dispatch(setMenuIcon('menu-icon.png'));
  });

  return <div>
    <BackgroundImage src='images/rakonti-background.jpg' alt='rakonti-background'/>
    <MenuContainer>
      <MenuButton to='/modes'>NUEVA HISTORIA</MenuButton>
      <MenuImage src='images/menu-circle.png' alt='menu-circle'/>
      <MenuButton to='/'>CARGAR HISTORIA</MenuButton>
    </MenuContainer>
  </div>;
}

const MenuButton = styled(Link)`
  background-color: transparent;
  color: #1C2833;
  border: none;
  font-size: 1em;
  font-weight: 500;
  margin: 0px 5px;
  text-decoration: none;
`;

const MenuContainer = styled.div`
  align-items: center;
  display: flex;
  height: 60px;
  justify-content: center;
  position: absolute;
  top: 35%;
  width: 95%;
`;

const MenuImage = styled.img`
  height: 40px;
  margin: 0px 15px;
  width: 40px;
`;

export default RHomeView;