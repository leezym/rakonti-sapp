/**
 * @author Martín Vladimir Alonso Sierra Galvis 
 * @version 1.0.1
 */

import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setNarrative, setNarrativeInfo } from '../../redux-store/reducers/storySlice';

function RNarrative({ narrative, right }) {
  const dispatch = useDispatch();

  const onLinkClicked = () => {
    dispatch(setNarrative(narrative));
    dispatch(setNarrativeInfo(null));
  }

  const onPlusClicked = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(setNarrativeInfo(narrative));
  }
  
  return <NarrativeLink to='/features' onClick={onLinkClicked} right={right}>
    <NarrativeImage src={narrative.url} alt='narrative-image'/>
    <PlusContainer>
      <PlusButton onClick={onPlusClicked}>
        <PlusImage 
          src='images/plus-icon.png' 
          alt='plus'/>
      </PlusButton>
    </PlusContainer>
    <Description>
      { narrative.summary }
    </Description>
  </NarrativeLink>
}

const Description = styled.p`
  color: white;
  font-size: 0.7em;
  margin-left: 10px;
  position: absolute;
  top: 23%;
  text-align: justify;
  width: 85%;
`;

const NarrativeLink = styled(Link)`
  background-color: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  height: 90%;
  justify-content: center;
  margin: ${({ right }) => right ? '0px 0px 0px 80px' : '0px 80px 0px 0px'};
  padding: 0;
  position: relative;
  width: 60%;
`;

const NarrativeImage = styled.img`
  height: 100%;
  width: 100%;
`;

const PlusButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  margin: 15px 15px 0px 0px;
  padding: 0;
`;

const PlusContainer = styled.div`
  align-items: center;
  display: flex;
  height: 50px;
  justify-content: flex-end;
  position: absolute;
  top: 0;
  width: 100%;
`;

const PlusImage = styled.img`
  height: 25px;
  width: 25px;
`;

export default RNarrative;