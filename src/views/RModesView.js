/**
 * @author Martín Vladimir Alonso Sierra Galvis 
 * @version 1.0.1
 */

import { useSelector } from 'react-redux';

import RModeDescription from '../components/RModeDescription';
import RModes from '../components/RModes';

function RModesView() {
  const mode = useSelector(state => state.story.mode);

  return <div>
    {
      mode === null || mode === undefined ?
      <RModes/>
      :
      <RModeDescription mode={mode}/>
    }
  </div>
}

export default RModesView;