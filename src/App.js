/**
 * @author Martín Vladimir Alonso Sierra Galvis 
 * @version 1.0.0
 */
import { Route, Routes } from 'react-router-dom';

import RHomeView from './views/RHomeView';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<RHomeView/>}/>
      </Routes>
    </div>
  );
}

export default App;
