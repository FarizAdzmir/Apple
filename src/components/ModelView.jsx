import { Html, OrbitControls, PerspectiveCamera, View } from "@react-three/drei";

import * as THREE from 'three'
import Lights from './Lights';
import Loader from './Loader';
import IPhone from './IPhone';
import { Suspense, useEffect } from "react";

const ModelView = ({ index, groupRef, gsapType, controlRef, setRotationState, size, item }) => {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  useEffect(() => {
    if (isMobile) {
      document.body.style.overflowX = "hidden";
      document.documentElement.style.overflowX = "hidden";
    }
    return () => {
      document.body.style.overflowX = "";
      document.documentElement.style.overflowX = "";
    };
  }, []);

  return (
    <View
      index={index}
      id={gsapType}
      className={`w-full h-full absolute ${index === 2 ? 'right-[-100%]' : ''}`}
    >
      {/* Ambient Light */}
      <ambientLight intensity={0.3} />

      <PerspectiveCamera makeDefault position={[0, 0, 4]} />

      <Lights />

      {!isMobile && (
        <OrbitControls 
          makeDefault
          ref={controlRef}
          enableZoom={false}
          enablePan={false}
          rotateSpeed={0.4}
          target={new THREE.Vector3(0, 0 ,0)}
          onEnd={() => setRotationState(controlRef.current.getAzimuthalAngle())}
        />
      )}

      <group ref={groupRef} name={`${index === 1} ? 'small' : 'large`} position={[0, 0 ,0]}>
        <Suspense fallback={<Loader />}>
          <IPhone 
            scale={index === 1 ? [15, 15, 15] : [17, 17, 17]}
            item={item}
            size={size}
          />
        </Suspense>
      </group>
    </View>
  )
}

export default ModelView
