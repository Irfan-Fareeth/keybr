import React, { useState, useEffect } from 'react';
import Pad from '../Pad/Pad'
import Accuracy from '../accuracy/accuracy'
import Highestwpm from '../higheswpm/highestwpm'
import Changemode from '../changemode/changemode'
import CustomWords from '../custom words/custom words button'
const home = () => {
    const [mode, setMode] = useState('');
    const [loading, setLoading] = useState(true);
  
    const getCurrentMode = async () => {
      try {
        const response = await fetch('http://localhost:3000/getCurrentMode');
        const jsonData = await response.json();
        console.log(jsonData + '-jsonvalue');
        setMode(jsonData);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch current mode', error);
      }
    };
  
    useEffect(() => {
      getCurrentMode();
    }, []);
  
    if (loading) {
      return <div>Loading...</div>;
    }
  return (
    <div>
    
    <div>
        <Pad mode={mode} />
       
      </div>
    </div>
  )
}

export default home
