/**
 * @author Martín Vladimir Alonso Sierra Galvis 
 * @version 1.0.0
 */

import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setMode, setModeInfo } from '../../redux-store/reducers/storySlice';
import { setBackIcon } from '../../redux-store/reducers/uiSlice';

function RModeInfo({ mode }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setBackIcon(null));
  });

  const onBackClicked = () => {
    dispatch(setModeInfo(null));
  }

  const onContinueClicked = () => {
    dispatch(setMode(mode));
    dispatch(setModeInfo(null));
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
        <ContinueLink onClick={onContinueClicked} to='/narratives'>
          <ContinueImage src='images/right-arrow.png' alt='continue-button'/>
        </ContinueLink>
      </ColumnContainer>
    </DescriptionContainer>
  </ModeContainer>
}

const BackgroundImage = styled.img`
  height: 100vh;
  width: 100vw;
  object-fit: cover;
  vertical-align: middle;
  horizontal-align: middle;
`;

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
  justify-content: flex-end;
`;

const Title = styled.h1`
  color: white;
  font-size: 2em;
  font-weight: 500;
  padding: 20px 0px 0px 25px;
`;

export default RModeInfo;