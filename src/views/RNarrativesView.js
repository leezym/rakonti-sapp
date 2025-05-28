/**
 * @author Martín Vladimir Alonso Sierra Galvis 
 * @version 1.0.1
 */

import { useSelector } from 'react-redux';

import RNarrativeInfo from '../components/narrative/RNarrativeInfo';
import RNarrativePanel from '../components/narrative/RNarrativePanel';

function RNarrativesView() {
  const narrativeInfo = useSelector(state => state.story.narrativeInfo);
  
  return <div>
    {
      narrativeInfo === null || narrativeInfo === undefined ? 
      <RNarrativePanel/>
      :
      <RNarrativeInfo estructura={narrativeInfo}/>
    }
  </div>
}

export default RNarrativesView;