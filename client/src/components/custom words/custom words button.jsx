import React from 'react'

const customWords = (props) => {
    const updateCustomText = async () => {
        
        try {
          
           let customInput = document.getElementById('customInput');
           customInput = customInput.value; 
           console.log(customInput);
          await fetch(
            `http://localhost:3000/updateCustomText/${customInput}`,
            {
              method: "PUT",
              headers: { "Content-Type": "application/json" }
        
            }
          );
    
          
        } catch (err) {
          console.error(err.message);
        }
      };
  return (
    <div>
      <div className='customWords'>
        <textarea id = 'customInput' placeholder='Enter custom words'>

        </textarea>
        <button onClick={updateCustomText}>ENTER</button>
        
      </div>
    </div>
  )
}

export default customWords;
