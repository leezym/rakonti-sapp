/**
 * @author Martín Vladimir Alonso Sierra Galvis 
 * @version 1.0.0
 */

import styled from 'styled-components';

function RFeatureCard({ onSelected, code, feature, name }) {
  const onFeatureClicked = () => {
    let description = feature.description;
    if (code === 'timeSpace') {
      description += ` (${feature.period})`;
    }

    onSelected(description);
  }

  return <FeatureButton onClick={onFeatureClicked}>
    <ImageContainer>
      <FeatureImage 
        src={feature.url} 
        alt='feature-image'
        code={code}/>
    </ImageContainer>
    <Title>{ name }</Title>
    <Name>{feature.name}</Name>
  </FeatureButton>
}

const FeatureButton = styled.button`
  align-items: center;
  background-color: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  margin: 0 8px;
  padding: 0;
  width: 80px;
`;

const FeatureImage = styled.img`
  max-height: ${({ code }) => code === 'desire' ? '55px' : '70px'};
  object-fit: contain;
  transform: rotate(${({ code }) => code === 'desire' ? '90deg' : '0deg'});
  vertical-align: bottom;
  width: 55px;
`;

const ImageContainer = styled.div`
  align-items: flex-end;
  display: flex;
  height: 70px;
`;

const Name = styled.p`
  font-size: 1em;
  font-style: italic;
  text-align: center;
  margin: 0;
  max-width: 100%;
`;

const Title = styled.h1`
  font-size: 1em;
  font-weight: bold;
  text-align: center;
  margin: 10px 0 0 0;
  max-width: 100%;
`;

export default RFeatureCard;