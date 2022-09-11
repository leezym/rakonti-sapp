/**
 * @author Martín Vladimir Alonso Sierra Galvis 
 * @version 1.0.1
 */

import styled from 'styled-components';

import BackgroundImage from '../../styled/BackgroundImage';
import RCarousel from '../other/RCarousel';
import RFeatureItem from './RFeatureItem';

function RFeatureSelector({ feature }) {
  return <div>
    <BackgroundImage 
      src='images/features-background.jpg'
      alt='selector-background'/>
    <TitleContainer>
      <Title>{ feature.name }</Title>
    </TitleContainer>
    <OverlayContainer>
      <CarouselContainer>
        {feature.options.length > 0 && <RCarousel>
          {
            feature.options.map(item => (
              <RFeatureItem 
                key={item.id} 
                code={feature.code}
                feature={feature.name} 
                item={item}/>
            ))
          }
        </RCarousel>}
      </CarouselContainer>
    </OverlayContainer>
  </div>
}

const CarouselContainer = styled.div`
  width: 100%;
`;

const OverlayContainer = styled.div`
  align-items: center;
  display: flex;
  height: 100vh;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
`;

const Title = styled.h1`
  color: #3A466B;
  font-size: 3em;
  font-weight: 700;
  padding: 0px 50px;
`;

const TitleContainer = styled.div`
  align-items: baseline;
  display: flex;
  height: 100px;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
`;

export default RFeatureSelector;