import React from 'react';
import { useState,useEffect } from 'react';
import { useSelector} from 'react-redux';
import Countdown, {zeroPad}from 'react-countdown';


function Counter() {
    let id=11;

    const [timeL, setTimeL] = useState(0);
    const discount = useSelector(state => state.discount);
    
    let disc= discount.filter(item => item.sneakerId === id);
    let disc2=0
    disc[0]?disc2=disc[0].expiration:disc=0;
    

   const Completionist = () => <span>The offer price has expired!</span>;

  function diff(){ 

   const date1 = new Date();
      const date2 = new Date(disc2)
      const diffTime = Math.abs(date2 - date1);
      return diffTime;
  }
  const renderer = ({ days, hours, minutes, seconds }) => (
    <span>
     days:{zeroPad(days)} hours:{zeroPad(hours)} minutes:{zeroPad(minutes)} seconds:{zeroPad(seconds)}
    </span>
  );
 
  useEffect(() => {

    setTimeL(diff())
  

 }, [discount]);

  return (
    <div>
    {timeL > 0 && <h4>time remaining for discount</h4>}
    {timeL> 0 && <Countdown date={Date.now() + timeL}
    renderer={renderer}
    >
    <Completionist />
  </Countdown>}
  </div>
  );
}

export default Counter;