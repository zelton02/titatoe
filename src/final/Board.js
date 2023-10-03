import React, { useEffect } from 'react';
import Layer from './Layer';


function Board({ gameState, setGameState, initialState }) {

  const handleLayerComplete = (winner) => {
    console.log('Layer Complete 1');
    if (winner === 'X') {
      setGameState({
        ...gameState,
        Xscore: gameState.Xscore + 1,
      });
    } else {
      setGameState({
        ...gameState,
        Oscore: gameState.Oscore + 1,
      });
    }

    if (gameState.currentLayer < 3) {
      setGameState({
        ...gameState,
        currentLayer: gameState.currentLayer + 1,
      });
      console.log('Layer Not Yet Completed');
    } else {
      // Transition to the central cube phase or end the game
      // Implement the logic to check for the final winner here
      // Example: checkWinningConditions();
      console.log('Game Completed');
      
      const playerXLines = calculateLines(gameState.layers, 'X');
      const playerOLines = calculateLines(gameState.layers, 'O');

      setGameState({
        ...gameState,
        Xscore: gameState.Xscore + playerXLines,
        Oscore: gameState.Oscore + playerOLines,
      });
    }
  };

  useEffect(() => {
    if (gameState.isFinalLayerComplete) {
      console.log('Game Completed');
      const playerXLines = calculateLines(gameState.layers, 'X');
      const playerOLines = calculateLines(gameState.layers, 'O');

      setGameState({
        ...gameState,
        Xscore: gameState.Xscore + playerXLines,
        Oscore: gameState.Oscore + playerOLines,
      });
    }
  }, [gameState.isFinalLayerComplete]);

  const calculateLines = (layers, player) => {
    layers[1][1][1] = player;

    let lines = 0;
  
    const winningCombinations = [
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
  
    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
  
      // Check if all three cells in the combination are marked by the player
      if (
        layers[a[0]][a[1]][a[2]] === player &&
        layers[b[0]][b[1]][b[2]] === player &&
        layers[c[0]][c[1]][c[2]] === player
      ) {
        lines++;
      }
    }
  
    return lines;
  };

  const renderLayer = () => {
    const layers = [];
    for (let i = 0; i < Math.min(gameState.currentLayer, 3); i++) {
      layers.push(
        <Layer
          key={i}
          layerNumber={i}
          layerData={gameState.layers[i]}
          gameState={gameState}
          setGameState={setGameState}
          onLayerComplete={handleLayerComplete}
        />
      );
    }
    return layers;
  };

  return (
      renderLayer()
  );
}

export default Board;
