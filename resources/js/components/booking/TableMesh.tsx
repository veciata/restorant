import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Html } from '@react-three/drei';
import * as THREE from 'three';

interface TableMeshProps {
    id: number;
    number: string;
    position: [number, number, number];
    status: 'available' | 'occupied' | 'reserved' | 'selected';
    onClick: () => void;
}

export default function TableMesh({ id, number, position, status, onClick }: TableMeshProps) {
    const meshRef = useRef<THREE.Mesh>(null);
    const [hovered, setHovered] = useState(false);

    // Color based on status
    const colors = {
        available: '#10b981',
        occupied: '#ef4444',
        reserved: '#f59e0b',
        selected: '#3b82f6',
    };

    const color = status === 'selected' ? colors.selected : (hovered ? '#fbbf24' : colors[status]);

    return (
        <group position={position}>
            {/* Table Base */}
            <mesh
                ref={meshRef}
                onClick={onClick}
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
                castShadow
                receiveShadow
            >
                <cylinderGeometry args={[0.8, 0.8, 0.1, 32]} />
                <meshStandardMaterial color="#4b5563" roughness={0.3} metalness={0.6} />
            </mesh>

            {/* Table Surface */}
            <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
                <cylinderGeometry args={[1.2, 1.2, 0.1, 32]} />
                <meshStandardMaterial color={color} />
            </mesh>

            {/* Table Leg */}
            <mesh position={[0, 0.25, 0]}>
                <cylinderGeometry args={[0.1, 0.1, 0.5, 32]} />
                <meshStandardMaterial color="#374151" roughness={0.5} metalness={0.8} />
            </mesh>

            {/* Table Number */}
            <Text
                position={[0, 0.56, 0]}
                rotation={[-Math.PI / 2, 0, 0]}
                fontSize={0.3}
                color="white"
                anchorX="center"
                anchorY="middle"
            >
                {number}
            </Text>

            {/* Tooltip if hovered */}
            {hovered && (
                <Html position={[0, 0.8, 0]} center distanceFactor={10}>
                    <div className="bg-black/90 text-white text-[10px] px-3 py-1.5 rounded-full border border-gray-700 pointer-events-none whitespace-nowrap shadow-xl">
                        Table {number} • {status.toUpperCase()}
                    </div>
                </Html>
            )}
        </group>
    );
}
