/**
 * @author Martín Vladimir Alonso Sierra Galvis 
 * @version 1.0.1
 */

import styled from 'styled-components';

function RCarousel({ children }) {
  const onArrowClicked = (e) => {
    e.preventDefault();
    e.stopPropagation();

    /** Calcular el movimiento del scroll dependiendo de la flecha clickeada */
    const { name } = e.target;
    const scroller = document.getElementById('scroller');
    const scrollOffset = name === 'left' ? -120 : 120;
    scroller.scrollLeft += scrollOffset;
  }

  return <Container>
    <ArrowButton onClick={onArrowClicked} name='left'>
      <ArrowImage 
        name='left'
        src='images/carousel-left.png'
        alt='carousel-left-arrow'/>
    </ArrowButton>
    <ScrollerContainer id='scroller'>
      <Scroller>
        { children }
      </Scroller>
    </ScrollerContainer>
    <ArrowButton onClick={onArrowClicked} name='right' right>
      <ArrowImage 
        name='right'
        src='images/carousel-right.png'
        alt='carousel-right-arrow'/>
    </ArrowButton>
  </Container>
}

const ArrowButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  left: ${({ right }) => right ? 'calc(100% - 95px)' : '15px'};
  padding: 0;
  position: absolute;
  top: calc(50% - 35px);
  z-index: 10;
`;

const ArrowImage = styled.img`
  height: 70px;
  width: 80px;
`;

const Container = styled.div`
  position: relative;
`;

const ScrollerContainer = styled.div`
  align-items: center;
  display: flex;
  height: 100vh;
  max-width: 100%;
  overflow-x: scroll;
  scroll-behavior: smooth;
  overscroll-behavior-inline: content;

  scroll-snap-type: inline mandatory;
  & > * {
    scroll-snap-align: start;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Scroller = styled.div`
  display: flex;
  max-height: 350px;
`;

export default RCarousel;