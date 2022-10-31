/**
 * @author Martín Vladimir Alonso Sierra Galvis 
 * @version 1.0.0
 */

import { Route, Routes } from 'react-router-dom';

import RCharactersView from './views/RCharactersView';
import REditorView from './views/REditorView';
import RFeaturesView from './views/RFeaturesView';
import RHomeView from './views/RHomeView';
import RModesView from './views/RModesView';
import RNarrativesView from './views/RNarrativesView';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<RHomeView/>}/>
        <Route path='/modes' element={<RModesView/>}/>
        <Route path='/narratives' element={<RNarrativesView/>}/>
        <Route path='/features' element={<RFeaturesView/>}/>
        <Route path='/characters' element={<RCharactersView/>}/>
        <Route path='/editor' element={<REditorView/>}/>
      </Routes>
    </div>
  );
}

export default App;
