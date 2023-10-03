// src/components/Board.js
import React from 'react';
import Square from './Square';

function Board({ squares, onClick }) {
  const renderSquare = (i) => {
    return <Square value={squares[i]} onClick={() => onClick(i)} />;
  };

  return (
    <group>
      {/* Implement your 3D board here */}
      {Array.from({ length: 3 }, (_, row) => (
        <group key={row}>
          {Array.from({ length: 3 }, (_, col) => (
            <group key={col}>
              <mesh position={[(col - 1) * 1.4, 0, (row - 1) * 1.4]}>
                {renderSquare(col + row * 3)}
              </mesh>
            </group>
          ))}
        </group>
      ))}
    </group>
  );
}

export default Board;
