import { Route, Routes } from 'react-router-dom';
import RCharacterView from './views/RCharacterView';
import RCharactersView from './views/RCharactersView';
import RFeaturesView from './views/RFeaturesView';
import RLoginView from './views/RLoginView';
import RRegisterView from './views/RRegisterView';
import RHomeView from './views/RHomeView';
import RMapView from './views/RMapView';
import RNarrativesView from './views/RNarrativesView';
import NotFoundView from './views/NotFoundView';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<RLoginView />} />
        <Route path='/register' element={<RRegisterView />} />
        <Route path='/home' element={<RHomeView />} />
        <Route path='/narratives' element={<RNarrativesView />} />
        <Route path='/features' element={<RFeaturesView />} />
        <Route path='/features/:id_historia' element={<RFeaturesView />} />
        <Route path='/character' element={<RCharacterView />} />
        <Route path='/character/:id_personaje' element={<RCharacterView />} />
        <Route path='/characters/:id_historia' element={<RCharactersView />} />
        <Route path='/map/:id_historia' element={<RMapView />} />
        
        {/* catch-all para rutas no definidas */}
        <Route path="*" element={<NotFoundView />} />
      </Routes>
    </div>
  );
}

export default App;