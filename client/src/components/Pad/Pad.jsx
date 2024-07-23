import React, { useState, useEffect,useContext } from 'react';
import Wpm from '../wordperminute/wpm';

const Pad = (props) => {
  let [targetText, setTargetText] = useState(' ');
  let [id, setId] = useState(0);
  let [colors, setColors] = useState([]);
  let [permanentColors, setPermanentColors] = useState([]);
  let [currentIndex, setCurrentIndex] = useState(0);
  let [start, setStart] = useState(false);
  let [wrongLetters, setWrongLetters] = useState(0);

  let [changeTarget, setTarget] = useState(0);

 
  const getTargetText = async (id) => {
    try {
       
      console.log('passagefrom = ' + props.mode);
      const response =  await fetch(`http://localhost:3000/normaltext?mode=${props.mode}`);
      const jsonData =  await response.json();

      
       

      setTargetText(jsonData.passage);
      
      setTarget(changeTarget?0:1);
      
    
    } catch (err) {
      console.error(err.message);
    }
  };
  const getCustomText = async () => {
    try {
       
      console.log('passagefrom = ' + props.mode);
      const response =  await fetch(`http://localhost:3000/getCustomText`);
      const jsonData =  await response.json();

      
       

      setTargetText(jsonData);
      
      setTarget(changeTarget?0:1);
      
    
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
  if(props.mode != 'custom')
    getTargetText(id);
   else
    {
        getCustomText();
    }
    
     }, [id]);

  useEffect(() => {
    setColors(Array(targetText.length).fill('black'));
    setPermanentColors(Array(targetText.length).fill(false));
    setCurrentIndex(0);
    setWrongLetters(0);
  }, [changeTarget]);

  const handleKeyPress = (e) => {
    if (currentIndex === 0) {
      setStart(true);
    }

    const char = String.fromCharCode(e.which);
    
    if (char === targetText[currentIndex]) {
      // Correct character typed
      if (!permanentColors[currentIndex]) {
        const newColors = [...colors];
        newColors[currentIndex] = 'grey';  
        setColors(newColors);
      }
      if (currentIndex >= targetText.length - 1) {
        setStart(false);
        setTimeout(() => {
          setId(id + 1);
        }, 1000);
      } 
      setCurrentIndex(currentIndex + 1);
      
    } else {
      // Incorrect character typed
      const newColors = [...colors];
      if (newColors[currentIndex] !== 'red') {
        setWrongLetters(wrongLetters + 1);
      }
      newColors[currentIndex] = 'red';
      const newPermanentColors = [...permanentColors];
      newPermanentColors[currentIndex] = true;
      setColors(newColors);
      setPermanentColors(newPermanentColors);
    }
  };

  useEffect(() => {
    window.addEventListener('keypress', handleKeyPress);
    return () => {
      window.removeEventListener('keypress', handleKeyPress);
    };
  }, [currentIndex, colors, permanentColors, targetText, wrongLetters]);


  return (
    <div>
      <h1>Typing Practice</h1>
      {<Wpm start={start} targetText={targetText} correctLetters={targetText.length - wrongLetters} wrongLetters={wrongLetters} /> }
      <div>
        {targetText.split('').map((char, index) => (
          <span key={index} style={{ color: colors[index], textDecoration: currentIndex === index ? 'underline' : 'none' }}>
            {char}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Pad;
