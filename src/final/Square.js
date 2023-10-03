import React from 'react';
import * as THREE from "three";

function Square({ value, rowIndex, colIndex, layerNumber, onClick, position, onHover, isHovered }) {
  let color = "#bbbxc4";
  
  if (value === 'X') {
    color = "#ff2a6d";
  }
  else if (value === 'O') {
    color = "#05d9e8";
  }

  const scale = isHovered ? [1.1, 1.1, 1.1] : [1, 1, 1];

  const material = new THREE.MeshPhongMaterial({
    color: color,
    opacity: 0.6, // Set opacity for transparency
    transparent: true, // Enable transparency
    depthWrite: false,
  });

  const geometry = new THREE.BoxGeometry(1, 1, 1); // width, height, depth

  const handleClick = () => {
    onClick(layerNumber, rowIndex, colIndex);
  };

  const handleHover = () => {
    onHover(rowIndex, colIndex);
  };

  return (
    <mesh 
      material={material} 
      geometry={geometry}
      position={position} // Adjust the position of the square
      scale={scale}
      onClick={handleClick} // Call the handleClick function on click 
      onPointerEnter={handleHover}
    />
  );
}

export default Square;
