
import './App.css';
import Sketch from "react-p5";
import p5 from "p5";
import { useEffect, useState, useRef } from 'react';
import { screen } from '@testing-library/react';


/*

  return (
    <g className="filtercss">
      <defs>
        <filter id="filter" x="0" y="0">
          <feGaussianBlur in="SourceGraphic" stdDeviation="30" />
        </filter>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#661192" stopOpacity="0%" />
          <stop offset="100%" stopColor="#661192" stopOpacity="100%" />
        </linearGradient>
        <linearGradient id="grad2" x1="50%" y1="0%" x2="75%" y2="90%">
          <stop offset="0%" stopColor="#0588D5" stopOpacity="100%" />
          <stop offset="30%" stopColor="#0588D5" stopOpacity="100%" />
          <stop offset="100%" stopColor="#0588D5" stopOpacity="0%" />
        </linearGradient>
        <linearGradient id="grad3" x1="0%" y1="25%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#C23380" stopOpacity="100%" />
          <stop offset="30%" stopColor="#C23380" stopOpacity="100%" />
          <stop offset="100%" stopColor="#C23380" stopOpacity="0%" />
        </linearGradient>
        <linearGradient id="grad4" x1="0%" y1="25%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#200F73" stopOpacity="0%" />
          <stop offset="30%" stopColor="#200F73" stopOpacity="100%" />
          <stop offset="100%" stopColor="#200F73" stopOpacity="100%" />
        </linearGradient>
      </defs>



      <path className='blurred' d={`M 500 500 Q -50 500, 100 200 T420 250 T 500 500`} strokeWidth={0} fill="url(#grad1)" />
      <path d={`M 500 500 Q ${calculateSinMove(650, 50)} 400, ${calculateCosMove(1000, 50)} 500 T 700 200 T 500 500`} strokeWidth={0} fill='url(#grad2)' />
      <path d={`M 500 500 Q 600 850, 200 925, Q 750 950 , 950 650 T 500 500`} strokeWidth={0} fill='url(#grad3)' stroke="black" /> 
<path d={`M 500 500 Q 600 850, 200 925, Q -50 850, 30 550 T 500 500`} strokeWidth={0} fill="url(#grad4)" />
    </g >



  )


*/

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}


function SvgBg(props) {
  const { count, width, height } = props;

  function calculateSinMove(center, parameter) {
    return Math.sin(count) * parameter + center
  }

  function calculateCosMove(center, parameter) {
    return Math.cos(count) * parameter + center
  }



  return (
    <g className="filtercss">
      <defs>
        <filter id="filter" x="0" y="0">
          <feGaussianBlur in="SourceGraphic" stdDeviation="30" />
        </filter>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#661192" stopOpacity="0%" />
          <stop offset="100%" stopColor="#661192" stopOpacity="100%" />
        </linearGradient>
        <linearGradient id="grad2" x1="50%" y1="0%" x2="75%" y2="90%">
          <stop offset="0%" stopColor="#0588D5" stopOpacity="100%" />
          <stop offset="30%" stopColor="#0588D5" stopOpacity="100%" />
          <stop offset="100%" stopColor="#0588D5" stopOpacity="0%" />
        </linearGradient>
        <linearGradient id="grad3" x1="0%" y1="25%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#C23380" stopOpacity="100%" />
          <stop offset="30%" stopColor="#C23380" stopOpacity="100%" />
          <stop offset="100%" stopColor="#C23380" stopOpacity="0%" />
        </linearGradient>
        <linearGradient id="grad4" x1="0%" y1="25%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#200F73" stopOpacity="0%" />
          <stop offset="30%" stopColor="#200F73" stopOpacity="100%" />
          <stop offset="100%" stopColor="#200F73" stopOpacity="100%" />
        </linearGradient>
      </defs>



      <path className='blurred' d={`M 500 500 Q -50 500, ${calculateCosMove(100, 50)} 200 T ${calculateCosMove(420, 50)} ${calculateSinMove(250, 50)} T 500 500`} strokeWidth={0} fill="url(#grad1)" />
      <path d={`M 500 500 Q 650 400, ${calculateCosMove(1000, 50)} ${calculateSinMove(500, 50)} T 700 200 T ${calculateCosMove(500, 50)} ${calculateSinMove(500, 50)}`} strokeWidth={0} fill='url(#grad2)' />
      <path d={`M 500 500 Q ${calculateSinMove(600, 50)} 850, ${calculateCosMove(200, 50)} ${calculateSinMove(925, 50)}, Q 750 950 , ${calculateCosMove(950, 50)} ${calculateSinMove(650, 50)} T 500 500`} strokeWidth={0} fill='url(#grad3)' stroke="black" /> {/*pembe*/}
      <path d={`M 500 500 Q 600 ${calculateSinMove(850, 50)}, ${calculateCosMove(200, 50)} 925, Q -50 ${calculateSinMove(850, 50)}, 30 ${calculateSinMove(550, 50)} T 500 500`} strokeWidth={0} fill="url(#grad4)" />
    </g>



  )
}
function App() {
  const { height, width } = useWindowDimensions();

  const [count, setCount] = useState(0)

  // Use useRef for mutable variables that we want to persist
  // without triggering a re-render on their change
  const requestRef = useRef();
  const previousTimeRef = useRef();

  const animate = time => {
    if (previousTimeRef.current !== undefined) {
      const deltaTime = time - previousTimeRef.current;

      setCount(prevCount => (prevCount + deltaTime * 0.002) % 360);
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  }

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);


  return (
    <>
      <div className='appDiv'>

        <div className='blur1'></div>
        <svg className='svg' width={width} height={height} xmlns="http://www.w3.org/2000/svg">
          <SvgBg count={count} width={width} height={height} />
        </svg>

      </div>
    </>
  )
}

export default App;
