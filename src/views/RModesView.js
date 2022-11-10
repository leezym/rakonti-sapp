/**
 * @author Martín Vladimir Alonso Sierra Galvis 
 * @version 1.0.1
 */

import { useSelector } from 'react-redux';

import RModeInfo from '../components/mode/RModeInfo';
import RModePanel from '../components/mode/RModePanel';

function RModesView() {
  const modeInfo = useSelector(state => state.story.modeInfo);

  return <div>
    {
      modeInfo === null || modeInfo === undefined ?
      <RModePanel/>
      :
      <RModeInfo mode={modeInfo}/>
    }
  </div>
}

export default RModesView;