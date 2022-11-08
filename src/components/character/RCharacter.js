/**
 * @author Martín Vladimir Alonso Sierra Galvis 
 * @version 1.0.0
 */

import styled from 'styled-components';

function RCharacter({ personality }) {
  return <div>
    <Subtitle>Personaje</Subtitle>
    <Title>{ personality.name }</Title>
    <Description>{ personality.description }</Description>
  </div>
}

const Description = styled.p`
  color: gray;
  margin: 20px 0 0 10px;
  text-align: justify;
`;

const Subtitle = styled.h3`
  color: darkgray;
  font-size: 1.7em;
  font-weight: 500;
  margin: 0;
`;

const Title = styled.h1`
  font-size: 3.5em;
  font-weight: 600;
  margin: 0 0 0 10px;
`;

export default RCharacter;