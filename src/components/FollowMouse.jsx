import { useEffect, useState} from "react";

const FollowMouse = () => {
  const [enabled, setEnabled] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    console.log('Effect:', { enabled })

    const handleMove = (event) => {
      const { clientX, clientY } = event;
      setPosition({ x: clientX, y: clientY });
    }

    if (enabled) window.addEventListener('pointermove', handleMove);

    //Cleanup function to avoid memory leak when component unmounts
    // -> when the component is disassembled
    // -> when the dependencies change (like 'enabled'), before executing the cleanup function
    return () => {
      console.log('Cleanup: Mouse follower is going to be unmounted...  Goodbye!  Goodbye');
      window.removeEventListener('pointermove', handleMove);
    }
  }, [enabled])

  //Change body className
  useEffect(() => {
    document.body.classList.toggle('no-cursor', enabled)
    return () => {
      document.body.classList.remove('no-cursor');
    }
  }, [enabled])
  // [] -> It excutes only once when the component mounts
  // [enabled] -> It re-executes every time 'enabled' changes
  // undefined -> It re-executes every time the component mounts
  return (
    <>
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
      }} />
      <h3>Mouse follower</h3>
      <button onClick={() => { setEnabled(!enabled) }}>
        {enabled ? 'Desactivar' : 'Activar'} Seguir Puntero
      </button>
    </>
  )
}


export default FollowMouse;