import React, { useEffect, useState } from 'react'

const Accuracy = () => {
    let [accuracy, setAccuracy] = useState(0);


    const getAccuracy = async()=>
    {
        try{       
            const response =  await fetch("http://localhost:3000/getaccuracy");
            const jsonData =  await response.json();
            console.log(jsonData);
            const highestaccuracy = jsonData[0].highestaccuracy;
            
            setAccuracy(highestaccuracy);
    }catch (err) {
                console.error(err.message);
            }
    
    }
    
  useEffect(() => {
    getAccuracy();
  }, []);
  return (
    <div>
            
            <pre>Accuracy:  {accuracy}</pre>
    </div>
  );
}

export default Accuracy;
