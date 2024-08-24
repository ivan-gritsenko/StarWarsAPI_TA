import React from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';
import { useModalStore } from '../../../store';
import { Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface ModalProps {
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ children }) => {
  const { isOpen, onClose } = useModalStore();
  if (!isOpen) return null;

  const portalRoot = document.getElementById('portal-root');

  if (!portalRoot) {
    throw new Error("error");
  }

  return ReactDOM.createPortal(
    <Box className="modal-overlay">
      <Box className="modal-content" onClick={e => e.stopPropagation()}>
        <Box className="modal-header">
          <h2>StarWars</h2>
          <IconButton className="modal-close-button" onClick={onClose} sx={{
            p: 0,
            transition: "all 0.3s ease",
            '&:hover': {
              bgcolor: '#2D77BF',
              color: 'white',
            },
          }}>
            <CloseIcon sx={{
              p: "8px",
              width: "24px",
              height: "24px",
              color: "black", transition: "all 0.3s ease",
              '&:hover': {
                color: 'white',
              },
            }} />
          </IconButton>
        </Box>
        {children}
      </Box>
    </Box>,
    portalRoot
  );
};

export default Modal;
