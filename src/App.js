/**
 * @author Martín Vladimir Alonso Sierra Galvis 
 * @version 1.0.0
 */

import styled from 'styled-components';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import RCharacterView from './views/RCharacterView';
import RCharactersView from './views/RCharactersView';
import RFeaturesView from './views/RFeaturesView';
import RLoginView from './views/RLoginView';
import RRegisterView from './views/RRegisterView';
import RHomeView from './views/RHomeView';
import RMapView from './views/RMapView';
import RNarrativesView from './views/RNarrativesView';

function App() {
  const navigate = useNavigate();
  const backIcon = useSelector(state => state.ui.backIcon);
  const menuIcon = useSelector(state => state.ui.menuIcon);

  const onBackClicked = () => {
    navigate(-1);
  }

  return (
    <div>
      {/* backIcon && <BackButton onClick={onBackClicked}>
          <Icon src={`images/${backIcon}`} alt='back-icon'/>
        </BackButton> */}
      {/*<MenuButton>
        <Icon src={`images/${menuIcon}`} alt='menu-icon'/>
      </MenuButton>*/}

      <Routes>
        <Route path='/' element={<RLoginView/>}/>
        <Route path='/register' element={<RRegisterView/>}/>
        <Route path='/home' element={<RHomeView/>}/>
        <Route path='/narratives' element={<RNarrativesView/>}/>
        <Route path='/features' element={<RFeaturesView/>}/>
        <Route path='/features/:id_historia' element={<RFeaturesView/>}/>
        <Route path='/character' element={<RCharacterView/>}/>
        <Route path='/character/:id_personaje' element={<RCharacterView />} /> 
        <Route path='/characters/:id_historia' element={<RCharactersView/>}/>
        <Route path='/map/:id_historia' element={<RMapView/>}/>
      </Routes>
    </div>
  );
}

const Button = styled.button`
  background-color: transparent; 
  border: none;
  cursor: pointer;
  padding: 0;
  position: absolute;
  z-index: 999;
`;

const BackButton = styled(Button)`
  bottom: 20px;
  height: 20px;
  left: 20px;
  width: 20px;
`;

const MenuButton = styled(Button)`
  height: 15px;
  right: 25px;
  top: 15px;
  width: 15px;
`;

const Icon = styled.img`
  height: 100%;
  width: 100%;
`;

export default App;
