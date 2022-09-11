/**
 * @author Martín Vladimir Alonso Sierra Galvis 
 * @version 1.0.0
 */

import styled from 'styled-components';
import { Link } from 'react-router-dom';

import BackgroundImage from '../../styled/BackgroundImage';
import RFeature from './RFeature';
import features from '../../redux-store/data/features';

function RFeaturePanel() {
  return <div>
    <BackgroundImage 
      src='images/features-background.jpg' 
      alt='features-background'/>
    <ColumnContainer>
      <CharacterImage 
        src='images/character-statue.png'
        alt='character-statue'/>
    </ColumnContainer>
    <ColumnContainer right>
      <FeaturesContainer>
        <RFeature feature={features.genre} name='gender'/>
        <RFeature feature={features.plot} name='plot'/>
        <RFeature feature={features.desire} name='desire'/>
        <RFeature feature={features.timeSpace} name='timeSpace'/>
      </FeaturesContainer>
      <ContinueLink to='/'>
        <ContinueImage 
          src='images/continue.png'
          alt='continue-image'/>
      </ContinueLink>
    </ColumnContainer>
  </div>
}

const CharacterImage = styled.img`
  height: 90%;
  vertical-align: middle;
  width: 80%;

  @media (min-width: 1524px) {
    width: 74%;
  }
`;

const ColumnContainer = styled.div`
  align-items: center;
  display: flex;
  height: 100vh;
  justify-content: center;
  position: absolute;
  left: ${({ right }) => right ? '50%' : '0'};
  top: 0;
  width: 50%;
`;

const ContinueImage = styled.img`
  height: 100px;
  width: 100px;
`;

const ContinueLink = styled(Link)`
  bottom: 8%;
  position: absolute;
  right: 9%;
`;

const FeaturesContainer = styled.div`
  align-items: flex-end;
  display: flex;
  flex-direction: column;
  height: 68%;
  width: 80%;
`;

export default RFeaturePanel;