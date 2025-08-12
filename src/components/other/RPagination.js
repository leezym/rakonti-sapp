/**
 * @author Martín Vladimir Alonso Sierra Galvis 
 * @version 1.0.1
 * 
 * @description 
 * Componente encargado de renderizar un Patrón de Diseño UI 
 * Paginación para mostrar, en un principio, las etapas de las 
 * diferentes estructuras narrativas.
 */

import React from 'react';
import styled from 'styled-components';

function RPagination({ items, label, stage, vertical }) {
  return <PaginationContainer vertical={vertical}>
    {
      items.map((item, i) => (
        <React.Fragment key={item.id}>
          <DotContainer>
            <Dot/>
            <DotHighlight show={i === stage}/>
            { label && i === stage && <Label>{item.name}</Label> }
          </DotContainer>
          { i !== items.length - 1 && <Line vertical={vertical}/> }
        </React.Fragment>
      ))
    }
  </PaginationContainer>
}

const Dot = styled.span`
  background-color: darkgray;
  border-radius: 50%;
  height: 7px;
  width: 7px; 
`;

const DotContainer = styled.div`
  align-items: center;
  display: flex;
  height: 7px;
  justify-content: center;
  width: 7px;
`;

const DotHighlight = styled.div`
  background-color: ${({ show }) => show ? 'rgba(0, 0, 0, 0.15)' : 'transparent'};
  border-radius: 50%; 
  height: 18px;
  position: absolute;
  width: 18px;
`;

const Label = styled.h3`
  font-size: 0.75em;
  font-weight: 700;
  left: -190px;
  position: absolute; 
  text-align: right;
  width: 180px;
`;

const Line = styled.span`
  background-color: darkgray;
  height: ${({ vertical }) => vertical ? '34px' : '1px'}; 
  width: ${({ vertical }) => vertical ? '1px' : '34px'};
`;

const PaginationContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: ${({ vertical }) => vertical ? 'column' : 'row'};
  height: ${({ vertical }) => vertical ? '100%' : '14px'};
  justify-content: center;
  width: ${({ vertical }) => vertical ? '14px' : '100%'};
`;

export default RPagination;