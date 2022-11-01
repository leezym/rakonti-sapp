/**
 * @author Martín Vladimir Alonso Sierra Galvis 
 * @version 1.0.0
 */

import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import BackgroundImage from '../../styled/BackgroundImage';
import RFeature from './RFeature';
import features from '../../redux-store/data/features';
import icons from '../../redux-store/data/icons';

function RFeaturePanel() {
  const genre = useSelector(state => state.story.genre);
  const plot = useSelector(state => state.story.plot);
  const desire = useSelector(state => state.story.desire);
  const timeSpace = useSelector(state => state.story.timeSpace);

  return <div>
    <BackgroundImage 
      src='images/features-background.jpg' 
      alt='features-background'/>
    <ColumnContainer>
      <CharacterImage 
        src='images/character-statue.png'
        alt='character-statue'/>
      <CharacterAuraImage
        src='images/character-aura.png'
        alt='character-aura'/>

      { genre && <FeatureIcon src='images/genre-icon.png' alt='genre' code='genre'/> }
      { plot && <FeatureIcon src='images/plot-icon.png' alt='plot' code='plot'/> }
      { desire && <FeatureIcon src='images/desire-icon.png' alt='desire' code='desire'/> }
      { timeSpace && <FeatureIcon src='images/ts-icon.png' alt='time-space' code='timeSpace'/> }
    </ColumnContainer>
    <ColumnContainer right>
      <FeaturesContainer>
        <RFeature feature={features.genre} name='gender'/>
        <RFeature feature={features.plot} name='plot'/>
        <RFeature feature={features.desire} name='desire'/>
        <RFeature feature={features.timeSpace} name='timeSpace'/>
      </FeaturesContainer>
      <ContinueLink to='/characters'>
        <ContinueImage 
          src='images/continue.png'
          alt='continue-image'/>
      </ContinueLink>
    </ColumnContainer>
  </div>
}

const CharacterAuraImage = styled.img`
  height: 54%;
  position: absolute;
  top: 7%;
  width: 65%;
`;

const CharacterImage = styled.img`
  height: 84%;
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

const FeatureIcon = styled.img`
  height: ${({ code }) => icons[code].height };
  position: absolute;
  right: ${({ code }) => icons[code].right };
  top: ${({ code }) => icons[code].top };
  transform: rotate(${({ code }) => icons[code].rotation });
  width: ${({ code }) => icons[code].width };

  @media (min-width: 1524px) {
    height: calc(${({ code }) => icons[code].height} + 16px);
    top: calc(${({ code }) => icons[code].top} + 1%);
    width: calc(${({ code }) => icons[code].width} + 20px);
  }
`;

export default RFeaturePanel;