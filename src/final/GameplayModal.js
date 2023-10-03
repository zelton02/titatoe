import Modal from 'react-modal';
import React from 'react';

const customStyles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    content: {
      position: 'relative',
    },
    closeButton: {
      position: 'absolute',
      top: '20px',
      right: '32px',
      cursor: 'pointer',
      fontSize: '32px',
    },
  };

function GameplayModal({ isOpen, onRequestClose }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Gameplay Steps"
    >
      <div style={customStyles.closeButton} onClick={onRequestClose}>
        <span>&times;</span>
      </div>
      <h2>How to Play:</h2>
      <p>1: Players take turns choosing their cube on the first layer's grid.</p>
      <p>2: The goal is to form winning lines (horizontal, vertical, or diagonal) on the current layer to earn 5 points.</p>
      <p>3: Once the first layer is filled, move to the second layer.</p>
      <p>4: Continue playing, layer by layer, until the third layer is reached.</p>
      <p>5: After all three layers are filled, the central cube becomes a shared space for both players.</p>
      <p>6: 3D Tic-Tac-Toe winning lines across all layers are calculated.</p>
      <p>7: One (1) point are awarded for each winning line.</p>
      <p>8: The player with the most points wins!</p>

    </Modal>
  );
}

export default GameplayModal;
