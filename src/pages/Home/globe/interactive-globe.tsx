"use client";

// Para todo esto se uso
// https://www.naturalearthdata.com/downloads/
// https://mapshaper.org/

// check here for more datasets ...
// https://github.com/martynafford/natural-earth-geojson
// non-geojson datasets: https://www.naturalearthdata.com/downloads/

import { useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";
import { drawThreeGeo } from "./threeGeoJSON";
import getStarfield from "./getStarfield";

function Globe() {
    const groupRef = useRef<THREE.Group>(null);
    const { scene } = useThree();
    const glowRef = useRef<THREE.Mesh>(null);

    // 🟢 Configurar la escena inicial (líneas del globo, estrellas, países)
    useEffect(() => {
        const group = groupRef.current;
        if (!group) return;

        // 🌐 Borde del globo
        const geometry = new THREE.SphereGeometry(1.99, 128, 128);
        const lineMat = new THREE.LineBasicMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.1,
        });
        const edges = new THREE.EdgesGeometry(geometry);
        group.add(new THREE.LineSegments(edges, lineMat));

        // 🩶 Globo base relleno (gris oscuro mate)
        const globeMaterial = new THREE.MeshStandardMaterial({
            color: 0x52525c,     // gris oscuro
            roughness: 1.0,      // superficie mate
            metalness: 0.0,      // sin brillo metálico
        });
        const globeMesh = new THREE.Mesh(new THREE.SphereGeometry(1.99, 128, 128), globeMaterial);

        group.add(globeMesh);


        // ✨ Campo estelar
        const stars = getStarfield({ numStars: 800, fog: false });
        group.add(stars);

        // 🌍 Archivos a cargar (puedes añadir más)
        const files = [
            { path: "/geojson/ne_110m/ne_110m_physical/ne_110m_land.json", color: 0xf54a00 },
            { path: "/geojson/ne_110m/ne_110m_countries.json", color: 0xf54a00 },
        ];

        // ⚡ Cargar y añadir cada dataset
        files.forEach(async (file) => {
            try {
                const res = await fetch(file.path);
                const data = await res.json();

                const layer = drawThreeGeo({
                    json: data,
                    radius: 2,
                    materialOptions: {
                        color: file.color,
                        transparent: true,
                        opacity: 0.7,
                        linewidth: 2,
                    },
                });

                group.add(layer);
            } catch (err) {
                console.warn(`❌ Error cargando ${file.path}`, err);
            }
        });

        return () => {
            group.clear();
        };
    }, [scene]);


    // 🌀 Animación
    useFrame(({ clock }) => {
        const group = groupRef.current;
        const glow = glowRef.current;
        if (group) group.rotation.y += 0.0008;
        if (glow) {
            const scale = 1 + Math.sin(clock.getElapsedTime() * 2) * 0.15;
            glow.scale.set(scale, scale, scale);
        }
    });

    return <group ref={groupRef} />;
}

export default function GlobeScene() {

    return (
        <div className="w-full h-full bg-black rounded-lg overflow-hidden">
            <Canvas
                camera={{ position: [0, 0, 5], fov: 75 }}
                onCreated={({ gl, scene }) => {
                    gl.setClearColor(0x000000);
                    scene.fog = new THREE.FogExp2(0x000000, 0.3);
                }}
            >
                {/* Control orbital suave */}
                <OrbitControls enableDamping dampingFactor={0.05} minDistance={3} maxDistance={20} />

                {/* Luz ambiental */}
                <ambientLight intensity={0.6} />
                <pointLight position={[10, 10, 10]} />

                {/* Escena */}
                <Globe />

                {/* Estrellas extra opcionales */}
                <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade />
            </Canvas>
        </div>
    );
}
