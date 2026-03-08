import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, ContactShadows } from '@react-three/drei';
import TableMesh from './TableMesh';

interface Table {
    id: number;
    number: string;
    position: [number, number, number];
    status: 'available' | 'occupied' | 'reserved';
    capacity: number;
}

interface TableSceneProps {
    tables: Table[];
    selectedTableId: number | null;
    onTableSelect: (id: number) => void;
}

export default function TableScene({ tables, selectedTableId, onTableSelect }: TableSceneProps) {
    return (
        <div className="w-full h-full bg-slate-100 rounded-3xl overflow-hidden shadow-2xl relative shadow-orange-500/5">
            <Canvas shadows className="w-full h-full">
                <PerspectiveCamera makeDefault position={[12, 10, 12]} fov={40} />
                <OrbitControls
                    enablePan={false}
                    maxPolarAngle={Math.PI / 2.2}
                    minDistance={5}
                    maxDistance={25}
                    autoRotate={!selectedTableId}
                    autoRotateSpeed={0.5}
                />

                <ambientLight intensity={0.4} />
                <spotLight
                    position={[15, 20, 5]}
                    angle={0.25}
                    penumbra={1}
                    intensity={2}
                    castShadow
                    shadow-mapSize={[2048, 2048]}
                />

                <Suspense fallback={null}>
                    <group position={[0, -2, 0]}>
                        {tables.map((table) => (
                            <TableMesh
                                key={table.id}
                                id={table.id}
                                number={table.number}
                                position={table.position}
                                status={selectedTableId === table.id ? 'selected' : table.status}
                                onClick={() => table.status === 'available' && onTableSelect(table.id)}
                            />
                        ))}

                        {/* Room Floor */}
                        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]} receiveShadow>
                            <planeGeometry args={[30, 30]} />
                            <meshStandardMaterial color="#374151" roughness={0.7} />
                        </mesh>
                    </group>

                    <Environment preset="city" />
                    <ContactShadows
                        position={[0, -2, 0]}
                        opacity={0.5}
                        blur={2}
                        far={5}
                        resolution={1024}
                    />
                </Suspense>
            </Canvas>

            {/* Hint overlay */}
            <div className="absolute top-6 left-6 pointer-events-none">
                <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">3D Seating Viewer</p>
                <div className="flex gap-4 mt-2">
                    <StatusHint color="bg-emerald-500" label="Free" />
                    <StatusHint color="bg-amber-500" label="Reserved" />
                    <StatusHint color="bg-rose-500" label="Full" />
                </div>
            </div>
        </div>
    );
}

function StatusHint({ color, label }: { color: string; label: string }) {
    return (
        <div className="flex items-center gap-1.5 opacity-70">
            <span className={`h-2 w-2 rounded-full ${color}`} />
            <span className="text-[9px] uppercase font-bold text-gray-500 tracking-tighter">{label}</span>
        </div>
    );
}
