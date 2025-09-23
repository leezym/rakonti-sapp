import React, { useState } from 'react';
import ConfirmDialog from '../components/ConfirmDialog';

let confirmResolve;
let confirmReject;

export const ConfirmProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isAlert, setIsAlert] = useState(false);

  const showConfirm = (msg, alertMode = false) => {
    setMessage(msg);
    setIsAlert(alertMode);
    setIsOpen(true);
    if (!alertMode) {
      return new Promise((resolve, reject) => {
        confirmResolve = resolve;
        confirmReject = reject;
      });
    }
  };

  const handleConfirm = () => {
    setIsOpen(false);
    if (!isAlert && confirmResolve) confirmResolve(true);
  };

  const handleCancel = () => {
    setIsOpen(false);
    if (!isAlert && confirmResolve) confirmResolve(false);
  };

  // Override window.confirm and window.alert
  window.confirm = (msg) => showConfirm(msg, false);
  window.alert = (msg) => showConfirm(msg, true);

  return (
    <>
      {children}
      <ConfirmDialog
        isOpen={isOpen}
        message={message}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        isAlert={isAlert}
      />
    </>
  );
};

export const customConfirm = (message) => {
  return new Promise((resolve, reject) => {
    confirmResolve = resolve;
    confirmReject = reject;
    // This will be handled by the component
  });
};
