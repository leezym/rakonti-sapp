/**
 * @author Martín Vladimir Alonso Sierra Galvis 
 * @version 1.0.1
 * 
 * @description 
 * 
 */

//import styled from 'styled-components';
import { useSelector } from 'react-redux';

import BackgroundImage from '../styled/BackgroundImage';

function RStageView() {
  const currentStage = useSelector(state => state.story.currentStage);

  return <div>
    <BackgroundImage 
      src={currentStage.backgroundUrl} 
      alt='stage-background'/>
  </div>
}

export default RStageView;