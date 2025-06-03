import { spawn } from 'child_process';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { prompt } = req.body;
  if (!prompt) {
    res.status(400).json({ error: 'Missing prompt' });
    return;
  }

  const process = spawn('python', ['components/local_llama.py', prompt]);
  let output = '';

  process.stdout.on('data', (data) => {
    output += data.toString();
  });

  process.stderr.on('data', (data) => {
    console.error(data.toString());
  });

  process.on('close', () => {
    res.status(200).json({ result: output.trim() });
  });
}
