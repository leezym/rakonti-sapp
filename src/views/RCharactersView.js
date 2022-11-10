/**
 * @author Martín Vladimir Alonso Sierra Galvis 
 * @version 1.0.1
 */

import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCharacter, setCharacterIndex } from '../redux-store/reducers/storySlice';

import RCharacter from '../components/character/RCharacter';

import { personalities } from '../redux-store/data/characters';

function RCharactersView() {
  const currentIndex = useSelector(state => state.story.characterIndex);

  const dispatch = useDispatch();

  const onArrowClicked = (e) => {
    const { name } = e.target;
    let newIndex = name === 'up' ? currentIndex - 1 : currentIndex + 1;

    /** Correción del índice para evitar errores */
    const { length } = personalities;
    if (newIndex < 0) {
      newIndex = length - 1;
    }
    else if (newIndex > length - 1) {
      newIndex = 0;
    }

    dispatch(setCharacterIndex(newIndex));
  }

  const onContinueClicked = () => {
    dispatch(setCharacter(personalities[currentIndex]));
  }

  return <div>
    <CharacterImage src={personalities[currentIndex].url} alt='character-image'/>
    <OverlayContainer>
      <CharacterContainer>
        <ColumnContainer>
          <Button onClick={onArrowClicked} top={true}>
            <ArrowImage src='images/up-arrow.png' alt='up-arrow' name='up'/>
          </Button>
          <Button onClick={onArrowClicked}>
            <ArrowImage src='images/down-arrow.png' alt='down-arrow' name='down'/>
          </Button>
        </ColumnContainer>
        <ColumnContainer right={true}>
          <RCharacter personality={personalities[currentIndex]}/>
        </ColumnContainer>
      </CharacterContainer>
      <ContinueLink onClick={onContinueClicked} to='/map'>
        <ContinueImage src='images/continue.png' alt='continue'/>
      </ContinueLink>
    </OverlayContainer>
  </div>
}

const ArrowImage = styled.img`
  height: 100%;
  width: 100%;
`;

const Button = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  height: 40px;
  margin-bottom: ${({ top }) => top ? '20px' : '0px'};
  padding: 0;
  width: 35px;
`;

const CharacterContainer = styled.div`
  display: flex;
  height: 40vh;
  margin-bottom: 150px;
  margin-right: 180px;
  width: 40%;
`;

const CharacterImage = styled.img`
  max-height: 100vh;
  object-fit: cover;
  max-width: 100%;
  vertical-align: middle;
`;

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: ${({ right }) => right ? '30px': '0px'};
`;

const ContinueImage = styled.img`
  height: 100px;
  width: 100px;
`;

const ContinueLink = styled(Link)`
  bottom: 4%;
  position: absolute;
  right: 5%;
`;

const OverlayContainer = styled.div`
  align-items: flex-end;
  display: flex;
  height: 100vh;
  justify-content: flex-end;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
`;

export default RCharactersView;