import React from 'react';
import Cell from './Cell';

const Layer = ({ cells, onClick }) => {
  return (
    <div className="layer">
      {cells.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((cell, cellIndex) => (
            <Cell
              key={cellIndex}
              value={cell}
              onClick={() => onClick(rowIndex, cellIndex)}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Layer;
