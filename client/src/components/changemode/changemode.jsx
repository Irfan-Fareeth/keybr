import React from 'react'

const Changemode = () => {

          const updateCurrentMode = async e => {
          e.preventDefault();
          try {
            const selectedMode = e.target.elements.passage_type.value;
            
          
            await fetch(
              `http://localhost:3000/updateCurrentMode/${selectedMode}`,
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
      <div className='changeModeButton'>
        <form action="/" onSubmit={updateCurrentMode}>
            <label htmlFor="passage_type">change text type</label>
            <select id="passage_type" name="passage_type">
                <option value="c">C++</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
                <option value="html">html/css</option>
                <option value="custom">custom</option>
            </select>
            <input type="submit"/>
        </form>
      </div>
    </div>
  )
}

export default Changemode
