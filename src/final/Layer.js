import React, { useState, useEffect } from 'react';
import Square from './Square';

function Layer({ layerNumber, layerData, gameState, setGameState }) {
  const layerSpacing = 1.2;
  const [isWinnerDeclared, setIsWinnerDeclared] = useState(false);

  const [currentHoveredSquare, setCurrentHoveredSquare] = useState(null);

  const handleSquareHover = (rowIndex, colIndex) => {
    setCurrentHoveredSquare({ rowIndex, colIndex });
  };

  useEffect(() => {
    console.log("X Score:", gameState.Xscore, "O Score:", gameState.Oscore);
  }, [gameState.Xscore, gameState.Oscore]);

  const handleSquareClick = (layerNumber, row, col) => {
    if (layerNumber !== gameState.currentLayer - 1) {
      console.log("Square in the previous layer, click disabled.");
      return;
    }


    if (layerData[row][col] || gameState.isFinalLayerComplete) return;

    const newLayerData = JSON.parse(JSON.stringify(gameState.layers));
    newLayerData[layerNumber][row][col] = gameState.xIsNext ? 'X' : 'O';


    setGameState((prevState) => ({
      ...prevState,
      layers: newLayerData,
      xIsNext: !gameState.xIsNext,
    }));

    const winner = calculateWinner(newLayerData[layerNumber]);
    if (winner && !isWinnerDeclared) {
      handleLayerWin(winner);
      setIsWinnerDeclared(true);
    }

    const filledSquares = newLayerData[layerNumber].flat().filter(Boolean).length;
    
    if (filledSquares === 9) {
      console.log('Layer Complete');
      handleLayerComplete();
    }
  };

  const calculateWinner = (layerData) => {
    const winningCombinations = [
      // Horizontal, vertical, and diagonal combinations within each layer
      // Rows
      [[0, 0], [0, 1], [0, 2]],
      [[1, 0], [1, 1], [1, 2]],
      [[2, 0], [2, 1], [2, 2]],
      // Columns
      [[0, 0], [1, 0], [2, 0]],
      [[0, 1], [1, 1], [2, 1]],
      [[0, 2], [1, 2], [2, 2]],
      // Diagonals
      [[0, 0], [1, 1], [2, 2]],
      [[0, 2], [1, 1], [2, 0]],
    ];

    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (
        layerData[a[0]][a[1]] &&
        layerData[a[0]][a[1]] === layerData[b[0]][b[1]] &&
        layerData[a[0]][a[1]] === layerData[c[0]][c[1]]
      ) {
        return layerData[a[0]][a[1]]; // Return the winner
      }
    }

    return null;
  };

  const handleLayerComplete = () => {
    if (layerNumber < 2) {
        setGameState((prevState) => ({
            ...prevState,
            currentLayer: gameState.currentLayer + 1,
          }));

    } else {
        setGameState((prevState) => ({
            ...prevState,
            isFinalLayerComplete: true,
        }))
    }
  }

  const handleLayerWin = (winner) => {
    setGameState((prevState) => {
      const scoringPlayer = winner === 'X' ? 'X' : 'O';
      return {
        ...prevState,
        [`${scoringPlayer}score`]: prevState[`${scoringPlayer}score`] + 5,
      };
    });
  };

  const renderSquare = (row, col) => {
    const value = layerData[row][col];
    const positionX = (col - 1) * layerSpacing;
    const positionY = (layerNumber) * layerSpacing;
    const positionZ = (row - 1) * layerSpacing;

    return (
      <Square
        value={value}
        rowIndex={row}
        colIndex={col}
        layerNumber={layerNumber}
        onClick={handleSquareClick}
        position={[positionX, positionY, positionZ]}
        onHover={handleSquareHover}
                  isHovered={currentHoveredSquare && 
                    currentHoveredSquare.rowIndex === row &&
                    currentHoveredSquare.colIndex === col}
      />
    );
  };

  return (
    layerData.map((rowData, row) => (
      <React.Fragment key={`row-${row}`}>
        {rowData.map((_cell, col) => (
          renderSquare(row, col)
        ))}
      </React.Fragment>
    ))
  );
}

export default Layer;
