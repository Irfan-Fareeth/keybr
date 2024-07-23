import React, { useEffect, useState } from 'react'

const Highestwpm = () => {
    let [highestWpm, setHighestWpm] = useState(0);


    const getHighestWpm = async()=>
    {
        try{       
            const response =  await fetch("http://localhost:3000/gethighestwpm");
            const jsonData =  await response.json();
            console.log(jsonData);
            const highestwpm = jsonData[0].highestwpms;
            
            setHighestWpm(highestwpm);
    }catch (err) {
                console.error(err.message);
            }
    
    }
    
  useEffect(() => {
    getHighestWpm();
  }, []);
  return (
    <div>
            
            <pre>Highestwpm:  {highestWpm}</pre>
    </div>
  );
}

export default Highestwpm;
