/**
 * @author Martín Vladimir Alonso Sierra Galvis 
 * @version 1.0.1
 */

import { useSelector } from 'react-redux';

import RModeInfo from '../components/mode/RModeInfo';
import RModePanel from '../components/mode/RModePanel';

function RModesView() {
  const mode = useSelector(state => state.story.mode);

  return <div>
    {
      mode === null || mode === undefined ?
      <RModePanel/>
      :
      <RModeInfo mode={mode}/>
    }
  </div>
}

export default RModesView;