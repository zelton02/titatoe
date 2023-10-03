// src/components/Square.js
import React from 'react';
import * as THREE from "three";

function Square({ value, onClick }) {
  let color = "#bbbxc4";
  
  if (value === 'X') {
    color = 0xff0000;
  }
  else if (value === 'O') {
    color = 0x0000ff;
  }

  const material = new THREE.MeshPhongMaterial({
    color: color,
    opacity: 0.6, // Set opacity for transparency
    transparent: true, // Enable transparency
    depthWrite: false,
  });

  const geometry = new THREE.BoxGeometry(1, 1, 1); // width, height, depth

  return (
    <mesh 
      material={material} 
      geometry={geometry} 
      onClick={onClick} 
    />
  );
}

export default Square;
