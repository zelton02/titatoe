import React, { useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';

function TicTacToe() {
  const boardSize = 3;
  const winningCombos = [
    [[0, 0, 0], [0, 0, 1], [0, 0, 2]],
    [[1, 0, 0], [1, 0, 1], [1, 0, 2]],
    [[2, 0, 0], [2, 0, 1], [2, 0, 2]],
    // Add more winning combinations for rows, columns, and diagonals
  ];

  const squares = Array(boardSize)
    .fill(null)
    .map(() =>
      Array(boardSize)
        .fill(null)
        .map(() => null)
    );

  const xColor = new THREE.Color(0x0000ff); // Blue
  const oColor = new THREE.Color(0xff0000); // Red

  const handleClick = (row, col) => {
    // Implement game logic here, marking squares as X or O
  };

  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      {/* Create the 3D board and squares */}
      {squares.map((row, rowIndex) =>
        row.map((_, colIndex) => (
          <mesh
            key={`${rowIndex}-${colIndex}`}
            position={[colIndex, -rowIndex, 0]}
            onClick={() => handleClick(rowIndex, colIndex)}
          >
            <boxGeometry args={[1, 1, 0.1]} />
            <meshStandardMaterial color={squares[rowIndex][colIndex] === 'X' ? xColor : oColor} />
          </mesh>
        ))
      )}
    </Canvas>
  );
}

export default TicTacToe;