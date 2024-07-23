const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json()); //req.body


app.get("/getCurrentMode", async(req, res)=>
{
  try{
    
      let mode = await pool.query('select currentmode from userdetails where email =$1', ['irfanfareeths@gmail.com']);
      mode = mode.rows[0].currentmode;      
      res.json(mode);
      console.log('gettingcurrentnode..');

  }catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to fetch currentMode" });
  }
});

app.put("/updateCurrentMode/:selectedMode", async (req, res) => {
  try {
    const { selectedMode } = req.params;
  
    await pool.query('update userdetails set currentmode =$1 where email = $2',[selectedMode, 'irfanfareeths@gmail.com']);


  } catch (err) {
    console.error(err.message);
  }
});

app.put("/updateCustomText/:customInput", async (req, res) => {
  try {
    const { customInput } = req.params;
  
    await pool.query('update userdetails set custom =$1 where email = $2',[customInput, 'irfanfareeths@gmail.com']);


  } catch (err) {
    console.error(err.message);
  }
});

app.get("/getCustomText", async (req, res) => {
  try {
    const customText = await pool.query("SELECT custom from userdetails where email = $1", ['irfanfareeths@gmail.com']);
    
  console.log('customtext' - customText.rows[0].custom);
    res.json(customText.rows[0].custom);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to fetch target text" });
  }
});

app.get("/normaltext", async (req, res) => {
  try {
    const mode = req.query.mode;
    
    const normaltextResult = await pool.query("SELECT * FROM normaltext WHERE modetype=$1", [mode]);
    
    const length = normaltextResult.rowCount;
    
    let random = Math.floor(Math.random()*length);

    const normaltext = normaltextResult.rows[random];
  
    res.json(normaltext);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to fetch target text" });
  }
});


// app.post("/updateAverageWpm", async (req, res) => {
//   try {
//     const { value } = req.body;
//     if (!isNaN(value)) {
//       const oldAverage = await pool.query('select averagewpm from wpm where email =$1',[email]);
//       await pool.query("INSERT INTO wpm (wpm) VALUES ($1)", [value]);
//       res.status(200).json({ success: "WPM inserted successfully" });
//     } else {
//       res.status(400).json({ error: "Invalid WPM value" });
//     }
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).json({ error: "Failed to insert WPM" });
//   }
// });

app.get('/getaccuracy', async(req, res)=>
{
  try
  {
    const accuracy = await pool.query("SELECT highestaccuracy FROM wpm where email =$1",['irfanfareeths@gmail.com']);

    res.json(accuracy.rows);
  }catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to update average WPM" });
  }

})
app.get('/gethighestwpm', async(req, res)=>
  {
    try
    {
      const wpm = await pool.query("SELECT highestwpms FROM wpm where email =$1",['irfanfareeths@gmail.com']);
  
      res.json(wpm.rows);
    }catch (err) {
      console.error(err.message);
      res.status(500).json({ error: "Failed to update average WPM" });
    }
  
  })
app.post("/updateAverageWpm", async (req, res) => {
  try {
    
    const email = 'irfanfareeths@gmail.com';
    
    const { value } = req.body;
    const {accuracy } = req.body;
    if (!isNaN(value) && req.body.value!=Infinity) {
     
      //to fetch previous accuracy and update highesaccuracy;
      let previousaccuracy = await pool.query("select highestaccuracy from wpm where email= $1", ['irfanfareeths@gmail.com']);
      previousaccuracy = previousaccuracy.rows[0].highestaccuracy;
      console.log(accuracy);
      if(accuracy > previousaccuracy)
          await pool.query("update wpm set highestaccuracy = $1 where email = $2", [accuracy, 'irfanfareeths@gmail.com']);
      // accuracy updated;


      //to fetch previous highest wpm and update highes wpm
      let previouswpm = await pool.query("select highestwpms from wpm where email = $1", ['irfanfareeths@gmail.com']);

      previouswpm = previouswpm.rows[0].highestwpms;
      console.log('previouswpm:' + previouswpm + 'currentwpm:' + value);
      if( value>previouswpm )
        await pool.query("update wpm set highestwpms = $1 where email = $2", [value, 'irfanfareeths@gmail.com']);
      //highestwpm updated


      //to find noofwpm entered  and update count
      const toFindCount = await pool.query("select noofsubmittedwpms from wpm where email = $1", ['irfanfareeths@gmail.com']);
      const count = toFindCount.rows[0].noofsubmittedwpms;
      await pool.query(
      "UPDATE wpm SET noofsubmittedwpms = $1 WHERE email = $2",
      [count+1, 'irfanfareeths@gmail.com']
    );
      //count updated

       let totalwpm = await pool.query("select totalwpm from wpm where email = $1",['irfanfareeths@gmail.com']);
       totalwpm = totalwpm.rows[0].totalwpm;
       console.log(totalwpm);
       let newwpm = totalwpm +  parseFloat(value);
       console.log(newwpm);
      await pool.query(
        "update wpm set totalwpm = $1 where email = $2",[newwpm.toFixed(2),'irfanfareeths@gmail.com']
      );
      
      
      // Check if old average exists
      const oldAverageResult = await pool.query("SELECT totalwpm FROM wpm WHERE email = $1", [email]);
      if (oldAverageResult.rows.length > 0) {
        let oldaverage = parseFloat(oldAverageResult.rows[0].totalwpm);
        
        // Calculate new average
        let average = (oldaverage + parseFloat(value)) / (count+1);
        
 

        if (!isNaN(average) & average!=Infinity) {
          await pool.query(
            "UPDATE wpm SET averagewpm = $1 WHERE email = $2",
            [average, email]
          );
          res.json("Average WPM was updated!");
        } else {
          res.status(400).json({ error: "Calculated average is not a number" });
        }
      } else {
        res.status(404).json({ error: "Email not found" });
      }
    } else {
      res.status(400).json({ error: "Provided WPM value is not a number" });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to update average WPM" });
  }
});


app.get('/getaveragewpm', async (req, res) => {
  try {
    const averageWpm = await pool.query("SELECT averagewpm FROM wpm where email =$1",['irfanfareeths@gmail.com']);

    res.json(averageWpm.rows);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: "Failed to fetch average WPM" });
  }
});

app.listen(3000, () => {
  console.log("server has started on port 3000");
});
  