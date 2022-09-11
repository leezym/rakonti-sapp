/**
 * @author Martín Vladimir Alonso Sierra Galvis 
 * @version 1.0.1
 */

import { useSelector } from 'react-redux';

import RFeaturePanel from '../components/feature/RFeaturePanel';
import RFeatureSelector from '../components/feature/RFeatureSelector';

function RFeaturesView() {
  const feature = useSelector(state => state.story.feature);

  return <div>
    {
      feature === null || feature === undefined ?
      <RFeaturePanel/>
      :
      <RFeatureSelector feature={feature}/>
    }
  </div>
}

export default RFeaturesView;