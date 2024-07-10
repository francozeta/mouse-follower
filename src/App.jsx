import './App.css'

import { useState } from 'react'
import { useEffect } from 'react'

function App() {
  const [enabled, setEnabled] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    console.log('Effect:', { enabled })

    const handleMove = (event) => {
      const { clientX, clientY } = event;
      setPosition({ x: clientX, y: clientY });
    }

    if (enabled) window.addEventListener('pointermove', handleMove);
  }, [enabled])

  return (
    <>
      <main>
        <div style={{
          position: 'absolute',
          backgroundColor: 'rgba(0,0,0.5)',
          border: '1px solid #fff',
          borderRadius: '50%',
          opacity: 0.8,
          pointerEvents: 'none',
          left: -25,
          top: -25,
          width: 50,
          height: 50,
          transform: `translate(${position.x}px, ${position.y}px)`
        }}>

        </div>
        <h3>Mouse follower</h3>
        <button onClick={() => { setEnabled(!enabled) }}>
          {enabled ? 'Desactivar' : 'Activar'} Seguir Puntero
        </button>
      </main>
    </>
  )
}

export default App
