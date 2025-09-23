import React from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';

Modal.setAppElement('#root');

const ConfirmDialog = ({ isOpen, message, onConfirm, onCancel, isAlert = false }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onCancel}
      shouldCloseOnOverlayClick={false}
      shouldCloseOnEsc={false}
      style={{
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          padding: '20px',
          borderRadius: '10px',
          maxWidth: '400px',
          textAlign: 'center',
          zIndex: 10000
        },
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 9999
        }
      }}
    >
      <Message>{message}</Message>
      <ButtonContainer>
        <ConfirmButton onClick={onConfirm}>Aceptar</ConfirmButton>
        {!isAlert && <CancelButton onClick={onCancel}>Cancelar</CancelButton>}
      </ButtonContainer>
    </Modal>
  );
};

const Message = styled.p`
  margin-bottom: 20px;
  font-size: 16px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;

const ConfirmButton = styled.button`
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #45a049;
  }
`;

const CancelButton = styled.button`
  background-color: #f44336;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #da190b;
  }
`;

export default ConfirmDialog;