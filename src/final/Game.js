import React, { useState, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { FaQuestionCircle } from 'react-icons/fa';
import Board from './Board';
import GameplayModal from './GameplayModal';
import '../styles/Game.scss';

function Game() {
  const initialState = {
    xIsNext: true,
    currentLayer: 1,
    Xscore: 0,
    Oscore: 0,
    winner: null,
    isFinalLayerComplete: false,
    layers: Array(3)
      .fill(null)
      .map(() =>
        Array(3)
          .fill(null)
          .map(() => Array(3).fill(null))
      ),
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    console.log(gameState.layers);
    console.log("X Score:", gameState.Xscore, "O Score:", gameState.Oscore);
  });

  const [gameState, setGameState] = useState({ ...initialState });

  // Ref for the camera and controls
  const cameraRef = useRef();
  const controlsRef = useRef();

  const initialCameraPosition = [4, 4, 4]; // Adjust the camera position
  const initialTargetPosition = [0, 0, 0]; // Center of the Tic-Tac-Toe board

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      <Canvas 
        camera={{ position: initialCameraPosition }}
        style={{ background: "#01012B" }}
      >
        <ambientLight intensity={0.7} color={0xffffff} />
        <directionalLight intensity={1} color={0xffffff} position={[10, 20, 0]} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        <OrbitControls
          ref={controlsRef}
          args={[cameraRef.current]}
          target={initialTargetPosition}
          autoRotate = {true}
          autoRotateSpeed = {0.5}
          enableDamping
        />
        <Board gameState={gameState} setGameState={setGameState} initialState={initialState}/>
      </Canvas>
      <div className="scoring-board">
        <div className="x-score">Red Team: {gameState.Xscore}</div>
        <div className="o-score">Blue Team: {gameState.Oscore}</div>
      </div>
      <div className="gameplay-modal">
        {/* Button to open the modal */}
        <div onClick={openModal} style={{ cursor: 'pointer', color: "#bbbxc4" }}>
          <FaQuestionCircle size={24} /> {/* Adjust the size as needed */}
        </div>

        {/* Render the modal component */}
        <GameplayModal isOpen={isModalOpen} onRequestClose={closeModal} />
        <button className='reset-button' onClick={() => setGameState({ ...initialState })}>Reset</button>
      </div>
    </div>
  );
}

export default Game;
