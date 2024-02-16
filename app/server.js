const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors()); 

app.post('/execute-command', (req, res) => {
  const { command } = req.body;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      res.status(500).json({ error: error.message });
      return;
    }
    if (stderr) {
      console.error(`Error: ${stderr}`);
      res.status(500).json({ error: stderr });
      return;
    }

    res.json({ output: stdout });
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});