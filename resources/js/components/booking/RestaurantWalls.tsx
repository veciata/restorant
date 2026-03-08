import React from 'react';

interface RestaurantWallsProps {
    position?: [number, number, number];
}

export default function RestaurantWalls({ position = [0, 0, 0] }: RestaurantWallsProps) {
    return (
        <group position={position}>
            {/* Floor */}
            <mesh position={[0, -0.1, 0]} receiveShadow>
                <planeGeometry args={[30, 30]} />
                <meshStandardMaterial color="#D4A574" roughness={0.8} />
            </mesh>

            {/* Back Wall */}
            <mesh position={[0, 4, -15]} castShadow receiveShadow>
                <boxGeometry args={[30, 8, 0.5]} />
                <meshStandardMaterial color="#E5E7EB" roughness={0.6} />
            </mesh>

            {/* Front Wall with Windows */}
            <group position={[0, 4, 15]}>
                <mesh position={[0, 0, -15]} castShadow receiveShadow>
                    <boxGeometry args={[30, 8, 0.5]} />
                    <meshStandardMaterial color="#E5E7EB" roughness={0.6} />
                </mesh>
                
                {/* Windows */}
                <mesh position={[-10, 2, -14.9]} castShadow receiveShadow>
                    <planeGeometry args={[3, 3]} />
                    <meshStandardMaterial color="#87CEEB" transparent opacity={0.8} />
                </mesh>
                <mesh position={[0, 2, -14.9]} castShadow receiveShadow>
                    <planeGeometry args={[3, 3]} />
                    <meshStandardMaterial color="#87CEEB" transparent opacity={0.8} />
                </mesh>
                <mesh position={[10, 2, -14.9]} castShadow receiveShadow>
                    <planeGeometry args={[3, 3]} />
                    <meshStandardMaterial color="#87CEEB" transparent opacity={0.8} />
                </mesh>
            </group>

            {/* Left Wall */}
            <mesh position={[-15, 4, 0]} castShadow receiveShadow>
                <boxGeometry args={[0.5, 8, 30]} />
                <meshStandardMaterial color="#E5E7EB" roughness={0.6} />
            </mesh>

            {/* Right Wall */}
            <mesh position={[15, 4, 0]} castShadow receiveShadow>
                <boxGeometry args={[0.5, 8, 30]} />
                <meshStandardMaterial color="#E5E7EB" roughness={0.6} />
            </mesh>

            {/* Ceiling */}
            <mesh position={[0, 8, 0]} receiveShadow>
                <boxGeometry args={[30, 0.5, 30]} />
                <meshStandardMaterial color="#F5F5F4" roughness={0.7} />
            </mesh>
        </group>
    );
}
