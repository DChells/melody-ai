import { exec } from 'child_process';

export default function handler(req, res) {
  // Execute the Python script
  exec('python text2midi.py', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      res.status(500).end();
      return;
    }

    // Handle the script output
    console.log(`Script output: ${stdout}`);
    res.status(200).json({ output: stdout });
  });
}
