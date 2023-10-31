import { Canvas } from '@react-three/fiber'
import { Sky } from '@react-three/drei'
import { Physics } from '@react-three/cannon'
import { Ground } from './components/Ground.jsx'
import { FPV as Fpv } from './components/FPV.jsx';
import { Player1 } from './components/Player1.jsx';
import { Cubes } from './components/Cubes.jsx';
import { TextureSelector } from './components/TextureSelect.jsx';

function App() { 
 return ( 
  <>
  <Canvas>
    <Sky sunPosition={[100, 100, 20]} />
    <ambientLight intensity={0.5} />
    <Fpv />

    <Physics>
      <Cubes />
      <Player1 />
      <Ground />
    </Physics>
  </Canvas>
  
  <div className='pointer'>
    + <span className='textRandom'>nuwa gei</span>
  </div>
  <TextureSelector />
  </>
  )
}

export default App
