/**
 * @author Martín Vladimir Alonso Sierra Galvis 
 * @version 1.0.0
 */

import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setMode } from '../redux-store/reducers/storySlice';

import BackgroundImage from '../styled/BackgroundImage';

function RModeDescription({ mode }) {
  const dispatch = useDispatch();

  const onBackClicked = () => {
    dispatch(setMode(null));
  }

  return <ModeContainer>
    <BackgroundImage src={mode.backgroundUrl} alt='classic-background'/>
    <DescriptionContainer>
      <ColumnContainer>
        <Title>{ mode.title }</Title>
        <BackButton onClick={onBackClicked}>
          Volver
        </BackButton>
      </ColumnContainer>
      <ColumnContainer right>
        <Description>
          {
            mode.description.split('%br%').map((text, i) => (
              <React.Fragment key={i}>
                <span>{ text }</span>
                <br/>
                <br/>
              </React.Fragment>
            ))
          }
        </Description>
        <ContinueLink to='/'>
          <ContinueImage src='images/right-arrow.png' alt='continue-button'/>
        </ContinueLink>
      </ColumnContainer>
    </DescriptionContainer>
  </ModeContainer>
}

const BackButton = styled.button`
  background-color: transparent;
  border: none;
  bottom: 0;
  color: white;
  cursor: pointer;
  margin-left: 21px;
  position: absolute;
  text-decoration: underline;
`;

const ColumnContainer = styled.div`
  width: ${({ right }) => right ? '58%' : '42%'};
`;

const ContinueLink = styled(Link)`
  position: absolute;
  right: -25px;
  top: calc(50% - 25px);
`;

const ContinueImage = styled.img`
  height: 50px;
  width: 58px;
`;

const Description = styled.p`
  color: white;
  height: 100%;
  padding: 25px 70px 5px 0px;
  overflow: hidden;
  text-align: justify;
`;

const DescriptionContainer = styled.div`
  display: flex;
  height: 50%;
  position: absolute;
  right: 5%;
  width: 71%;

  @media (min-width: 1524px) {
    right: 10%;
    width: 61%;
  }
`;

const ModeContainer= styled.div`
  align-items: center;
  display: flex;
  height: 100vh;
  justify-content: flex-end;
  width: 100%;
`;

const Title = styled.h1`
  color: white;
  font-size: 2em;
  font-weight: 500;
  padding: 20px 0px 0px 25px;
`;

export default RModeDescription;