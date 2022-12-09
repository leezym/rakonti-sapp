/**
 * @author Martín Vladimir Alonso Sierra Galvis 
 * @version 1.0.0
 */

import styled from 'styled-components';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import RCharactersView from './views/RCharactersView';
import RFeaturesView from './views/RFeaturesView';
import RHomeView from './views/RHomeView';
import RMapView from './views/RMapView';
import RModesView from './views/RModesView';
import RNarrativesView from './views/RNarrativesView';
import RStageView from './views/RStageView';

function App() {
  const navigate = useNavigate();
  const backIcon = useSelector(state => state.ui.backIcon);
  const menuIcon = useSelector(state => state.ui.menuIcon);

  const onBackClicked = () => {
    navigate(-1);
  }

  return (
    <div>
      { backIcon && <BackButton onClick={onBackClicked}>
          <Icon src={`images/${backIcon}`} alt='back-icon'/>
        </BackButton> }
      <MenuButton>
        <Icon src={`images/${menuIcon}`} alt='menu-icon'/>
      </MenuButton>

      <Routes>
        <Route path='/' element={<RHomeView/>}/>
        <Route path='/modes' element={<RModesView/>}/>
        <Route path='/narratives' element={<RNarrativesView/>}/>
        <Route path='/features' element={<RFeaturesView/>}/>
        <Route path='/characters' element={<RCharactersView/>}/>
        <Route path='/map' element={<RMapView/>}/>
        <Route path='/stage' element={<RStageView/>}/>
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
