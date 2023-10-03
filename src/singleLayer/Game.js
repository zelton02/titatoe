// src/components/Game.js
import React, { useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Board from './Board';
import * as THREE from "three";

function Game() {

  const [squares, setSquares] = useState(Array(9).fill(null)); // Store the game state
  const [xIsNext, setXIsNext] = useState(true);

  // Ref for the camera and controls
  const cameraRef = useRef();
  const controlsRef = useRef();

  const calculateWinner = (squares) => {
    // Define the winning combinations (rows, columns, diagonals)
    const lines = [
      [0, 1, 2], // Top row
      [3, 4, 5], // Middle row
      [6, 7, 8], // Bottom row
      [0, 3, 6], // Left column
      [1, 4, 7], // Middle column
      [2, 5, 8], // Right column
      [0, 4, 8], // Diagonal from top-left to bottom-right
      [2, 4, 6], // Diagonal from top-right to bottom-left
    ];
  
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      // Check if all three squares in a line have the same value (X or O)
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        // Return the winning symbol (X or O)
        return squares[a];
      }
    }
  
    // If no winner is found, return null
    return null;
  };
  

  const handleClick = (i) => {
    // If there's already a winner or the square is occupied, do nothing
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    // Create a copy of the squares array
    const newSquares = squares.slice();

    // Set the current player's symbol (X or O)
    newSquares[i] = xIsNext ? 'X' : 'O';

    // Update the game state and toggle the player's turn
    setSquares(newSquares);
    setXIsNext(!xIsNext);
  };

  const initialCameraPosition = [3, 3, 3]; // Adjust the camera position
  const initialTargetPosition = [0, 0, 0]; // Center of the Tic-Tac-Toe board

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas camera={{ position: initialCameraPosition}}>
        <ambientLight intensity={0.7} color={0xffffff}/>
        <directionalLight intensity={1} color={0xffffff} position={[10, 20, 0]} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        <OrbitControls
          ref={controlsRef}
          args={[cameraRef.current]}
          target={initialTargetPosition}
          enableDamping
        />
        <Board squares={squares} onClick={handleClick} />
      </Canvas>
    </div>

  );
}

export default Game;
