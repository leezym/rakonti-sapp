import styled from 'styled-components';
import RFilesView from './RFilesView';

function PopUp({ setNarrative, setFeature, setGenre, setPlot, setDesire, setTime, setCharacters, setPersonalities, setRoles, setCurrentStage, showPopup, setShowPopup }) {  
  const closePopup = () => {
    setShowPopup(false);
  };

  return <>
    {showPopup && (
      <PopupOverlay>
        <PopupContent>
          <CloseButton onClick={closePopup}>X</CloseButton>
          <RFilesView
            setNarrative={setNarrative}
            setFeature={setFeature}
            setGenre={setGenre}
            setPlot={setPlot}
            setDesire={setDesire}
            setTime={setTime}
            setCharacters={setCharacters}
            setPersonalities={setPersonalities}
            setRoles={setRoles}
            setCurrentStage={setCurrentStage}
            closePopup={closePopup}
          />
        </PopupContent>
      </PopupOverlay>
    )}
  </>
}

const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const PopupContent = styled.div`
  background: white;
  padding: 30px;
  border-radius: 12px;
  width: 80%;
  height: 70%;
  overflow: auto;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 15px;
  background: transparent;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: #43474f;
  border: solid;
`;

export default PopUp;