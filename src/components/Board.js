import React, { useState } from 'react';
import Layer from './Layer';

const Board = () => {
  const initialLayers = Array(3).fill(Array(3).fill(Array(3).fill(null)));
  const [layers, setLayers] = useState(initialLayers);
  const [xIsNext, setXIsNext] = useState(true);

  const handleClick = (layerIndex, rowIndex, cellIndex) => {
    if (layers[layerIndex][rowIndex][cellIndex] || calculateWinner(layers)) {
      return;
    }

    const newLayers = layers.map((layer, i) => {
      if (i === layerIndex) {
        const newRow = [...layer[rowIndex]];
        newRow[cellIndex] = xIsNext ? 'X' : 'O';
        return layer.map((row, j) => (j === rowIndex ? newRow : row));
      }
      return layer;
    });

    setLayers(newLayers);
    setXIsNext(!xIsNext);
  };

  const calculateWinner = (layers) => {
    // Define all possible winning combinations in 3D
    const winningCombinations = [
      // Horizontal, vertical, and diagonal combinations within each layer
    [[0, 0, 0], [0, 0, 1], [0, 0, 2]],
    [[0, 1, 0], [0, 1, 1], [0, 1, 2]],
    [[0, 2, 0], [0, 2, 1], [0, 2, 2]],
    [[1, 0, 0], [1, 0, 1], [1, 0, 2]],
    [[1, 1, 0], [1, 1, 1], [1, 1, 2]],
    [[1, 2, 0], [1, 2, 1], [1, 2, 2]],
    [[2, 0, 0], [2, 0, 1], [2, 0, 2]],
    [[2, 1, 0], [2, 1, 1], [2, 1, 2]],
    [[2, 2, 0], [2, 2, 1], [2, 2, 2]],

    // Horizontal combinations across layers
    [[0, 0, 0], [1, 0, 0], [2, 0, 0]],
    [[0, 1, 0], [1, 1, 0], [2, 1, 0]],
    [[0, 2, 0], [1, 2, 0], [2, 2, 0]],
    [[0, 0, 1], [1, 0, 1], [2, 0, 1]],
    [[0, 1, 1], [1, 1, 1], [2, 1, 1]],
    [[0, 2, 1], [1, 2, 1], [2, 2, 1]],
    [[0, 0, 2], [1, 0, 2], [2, 0, 2]],
    [[0, 1, 2], [1, 1, 2], [2, 1, 2]],
    [[0, 2, 2], [1, 2, 2], [2, 2, 2]],

    // Diagonal combinations within each layer
    [[0, 0, 0], [1, 1, 1], [2, 2, 2]],
    [[0, 0, 2], [1, 1, 1], [2, 2, 0]],
    [[0, 2, 0], [1, 1, 1], [2, 0, 2]],
    [[0, 2, 2], [1, 1, 1], [2, 0, 0]],

    // Vertical combinations across layers
    [[0, 0, 0], [1, 0, 0], [2, 0, 0]],
    [[0, 0, 1], [1, 0, 1], [2, 0, 1]],
    [[0, 0, 2], [1, 0, 2], [2, 0, 2]],
    [[0, 1, 0], [1, 1, 0], [2, 1, 0]],
    [[0, 1, 1], [1, 1, 1], [2, 1, 1]],
    [[0, 1, 2], [1, 1, 2], [2, 1, 2]],
    [[0, 2, 0], [1, 2, 0], [2, 2, 0]],
    [[0, 2, 1], [1, 2, 1], [2, 2, 1]],
    [[0, 2, 2], [1, 2, 2], [2, 2, 2]],

    // Diagonal combinations across layers

    [[0, 0, 0], [1, 1, 0], [2, 2, 0]],
    [[0, 0, 2], [1, 1, 2], [2, 2, 2]],
    [[0, 2, 0], [1, 1, 0], [2, 0, 0]],
    [[0, 2, 2], [1, 1, 2], [2, 0, 2]],

    // Vertical combinations across layers

    [[0, 0, 0], [1, 0, 0], [2, 0, 0]],
    [[0, 0, 1], [1, 0, 1], [2, 0, 1]],
    [[0, 0, 2], [1, 0, 2], [2, 0, 2]],
    [[0, 1, 0], [1, 1, 0], [2, 1, 0]],
    [[0, 1, 1], [1, 1, 1], [2, 1, 1]],
    [[0, 1, 2], [1, 1, 2], [2, 1, 2]],
    [[0, 2, 0], [1, 2, 0], [2, 2, 0]],
    [[0, 2, 1], [1, 2, 1], [2, 2, 1]],
    [[0, 2, 2], [1, 2, 2], [2, 2, 2]],
    ];

    // Check each winning combination
    for (const combination of winningCombinations) {
      const [a, b, c] = combination;

      // Check if all three cells in the combination are marked by the same player
      if (
        layers[a[0]][a[1]][a[2]] &&
        layers[a[0]][a[1]][a[2]] === layers[b[0]][b[1]][b[2]] &&
        layers[a[0]][a[1]][a[2]] === layers[c[0]][c[1]][c[2]]
      ) {
        return layers[a[0]][a[1]][a[2]]; // Return the winning player ('X' or 'O')
      }
    }

    // If no winner is found, return null
    return null;
  };

  const renderLayers = () => {
    return layers.map((layer, layerIndex) => (
      <Layer
        key={layerIndex}
        cells={layer}
        onClick={(rowIndex, cellIndex) => handleClick(layerIndex, rowIndex, cellIndex)}
      />
    ));
  };

  const winner = calculateWinner(layers);
  const status = winner ? `Winner: ${winner}` : `Next player: ${xIsNext ? 'X' : 'O'}`;

  return (
    <div className="board">
      <div className="status">{status}</div>
      {renderLayers()}
    </div>
  );
};

export default Board;
