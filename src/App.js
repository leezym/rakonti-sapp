/**
 * @author Martín Vladimir Alonso Sierra Galvis 
 * @version 1.0.0
 */

import { Route, Routes } from 'react-router-dom';

import RHomeView from './views/RHomeView';
import RModesView from './views/RModesView';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<RHomeView/>}/>
        <Route path='/modes' element={<RModesView/>}/>
      </Routes>
    </div>
  );
}

export default App;
