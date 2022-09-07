/**
 * @author Martín Vladimir Alonso Sierra Galvis 
 * @version 1.0.1
 */
import { Link } from 'react-router-dom';
import styled from 'styled-components';

function RHomeView() {
  return <div>
    <BackgroundImage src='images/rakonti-background.jpg' alt='rakonti-background'/>
    <MenuContainer>
      <MenuButton to='/modes'>NUEVA HISTORIA</MenuButton>
      <MenuImage src='images/menu-circle.png' alt='menu-circle'/>
      <MenuButton to='/'>CARGAR HISTORIA</MenuButton>
    </MenuContainer>
  </div>;
}

const BackgroundImage = styled.img`
  height: 100vh;
  object-fit: cover;
  vertical-align: middle;
  width: 100%;
`;

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
  top: 240px;
  width: 95%;
`;

const MenuImage = styled.img`
  height: 40px;
  margin: 0px 15px;
  width: 40px;
`;

export default RHomeView;