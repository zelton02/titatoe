import React, { useRef } from 'react';
import { useFrame } from 'react-three-fiber';
import { Mesh } from 'three';

function Box(props) {
    const mesh = useRef<Mesh>();
    useFrame(() => {
        if (mesh.current) mesh.current.rotation.x += 0.01;
    });

    return (
        <mesh {...props} ref={mesh}>
            <boxGeometry args={[1, 1, 1]} />
            <meshBasicMaterial color="lightblue" />
        </mesh>
    );
}

export default Box;