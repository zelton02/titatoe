import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { MeshBasicMaterial, Vector3 } from 'three';

function Cell(props) {
  const ref = useRef();
  const [value, setValue] = useState(null);

  // Function to handle click events on the cell
  const handleClick = () => {
    if (!value && !props.isGameOver) {
      // Set the cell to 'X' or 'O' based on the current player
      setValue(props.currentPlayer);
      props.onCellClick(props.index);
    }
  };

  // Subscribe to the render-loop, change the color of the cell based on the value ('X' or 'O')
  useFrame(() => {
    const color = value === 'X' ? 'blue' : value === 'O' ? 'red' : 'white';
    ref.current.material.color.set(color);
  });

  return (
    <mesh
      {...props}
      ref={ref}
      onClick={handleClick}
      scale={props.hovered ? [1.05, 1.05, 1.05] : [1, 1, 1]}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color="white" />
    </mesh>`=6`=.
  );
}

function Board() {
  const [cells, setCells] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [isGameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);

  // Function to handle cell clicks
  const handleCellClick = (index) => {
    if (!isGameOver) {
      const newCells = [...cells];
      if (!newCells[index]) {
        newCells[index] = currentPlayer;
        setCells(newCells);
        const currentWinner = checkWinner(newCells);
        if (currentWinner) {
          setGameOver(true);
          setWinner(currentWinner);
        } else {
          setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
        }
      }
    }
  };

  // Check for a winner
  const checkWinner = (cells) => {
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
        return cells[a];
      }
    }

    if (cells.every((cell) => cell !== null)) {
      // If all cells are filled and there's no winner, it's a draw.
      setGameOver(true);
    }

    return null;
  };

  useEffect(() => {
    if (isGameOver) {
      console.log(`Game over! Winner: ${winner || 'Draw'}`);
    }
  }, [isGameOver, winner]);

  return (
    <group position={new Vector3(-1, 1, -1)}>
      {cells.map((value, index) => (
        <Cell
          key={index}
          position={[index % 3, -Math.floor(index / 3), 0]}
          index={index}
          onCellClick={handleCellClick}
          currentPlayer={currentPlayer}
          isGameOver={isGameOver}
        />
      ))}
    </group>
  );
}

export default function App() {
  // Set the initial camera position and target position
  const initialCameraPosition = [0, 5, 5]; // Adjust the camera position
  const initialTargetPosition = [-5, 0, 0]; // Center of the Tic-Tac-Toe board

  return (
    <Canvas camera={{ position: initialCameraPosition }}>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      <OrbitControls target={initialTargetPosition} enableDamping />
      {/* Center the Tic-Tac-Toe board */}
      <group position={initialTargetPosition}>
        <Board />
      </group>
    </Canvas>
  );
}
