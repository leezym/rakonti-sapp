/**
 * @author Martín Vladimir Alonso Sierra Galvis 
 * @version 1.0.0
 * 
 * @description
 * Componente encargado de mostrar las fortalezas y debilidades de cada 
 * uno de los personajes.
 */

import styled from 'styled-components';

function RCharacterTraits({ onClose, traitName, traits }) {
  return <TraitsContainer>
    <TraitsHeader>
      <TraitsTitle traitName={traitName}>
        { traitName === 'strengths' ? 'FORTALEZAS' : 'DEBILIDADES' }
      </TraitsTitle>
      <CloseButton onClick={onClose}>
        <CloseImage src='images/close.png' alt='close-traits'/>
      </CloseButton>
    </TraitsHeader>
    <TraitsList>
      {
        traits.map((trait, i) => (
          <TraitItem key={i}>
            { trait }
          </TraitItem>
          
        ))
      }
    </TraitsList>
  </TraitsContainer>
}

const CloseButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  height: 20px; 
  min-width: 20px;
`;

const CloseImage = styled.img`
  height: 100%; 
  width: 100%;
`;

const TraitItem = styled.li`
  color: gray;
  font-size: 1em;
  margin: 2px 0;
  text-align: justify;
`;

const TraitsContainer = styled.div`
  width: 100%;
`;

const TraitsHeader = styled.div`
  align-items: center;
  border-bottom: 1px solid darkgray;
  display: flex;
  justify-content: space-between;
  margin-top: 11px;
  padding: 5px 10px;
  width: 100%;
`;

const TraitsList = styled.ul`
  padding: 0 35px;
  overflow: hidden;
  width: 100%;
`;

const TraitsTitle = styled.h1`
  color: ${({ traitName }) => traitName === 'strengths' ? '#8496B2' : '#825657'};
  font-size: 1.6em; 
  margin: 0;
`;

export default RCharacterTraits;