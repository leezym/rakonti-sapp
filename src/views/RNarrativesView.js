/**
 * @author Martín Vladimir Alonso Sierra Galvis 
 * @version 1.0.1
 */

import { useSelector } from 'react-redux';

import RNarrativePanel from '../components/narrative/RNarrativePanel';

function RNarrativesView() {
  const narrative = useSelector(state => state.story.narrative);
  return <div>
    {
      narrative === null || narrative === undefined ? 
      <RNarrativePanel/>
      :
      null
    }
  </div>
}

export default RNarrativesView;