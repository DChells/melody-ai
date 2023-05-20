// test Script to test OPENAI API
import React, { useState } from 'react';
import { Configuration, OpenAIApi } from 'openai';

const envtest = process.env.OPENAI_API_KEY;

const configuration = new Configuration({
    apiKey: apiKey,
  });
  const openai = new OpenAIApi(configuration);
  

const GptPage = () => {
    const [entry, setEntry] = useState('');
    const [output, setOutput] = useState('');
   
    const handleSubmit = async () => {
        console.log('Submitting...');
        console.log(apiKey);
        console.log(envtest);
    
        try {
            const completion = await openai.createChatCompletion({
                model: 'gpt-3.5-turbo',
                messages: [
                    { role: 'system', content: 'You are a helpful assistant.' },
                    { role: 'user', content: entry },
                ],
            });
            console.log(completion.data.choices[0].message);
    
            const message = completion.data.choices[0].message;
            setOutput(message.content);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const [buttonText, setButtonText] = useState("Submit");

    const handleClick = () => {
        console.log("button test");
      };
    
      
    return (
      <div>
        <h1>OpenAI Codex</h1>
        <textarea
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
          placeholder="Enter your text"
        />
        <button onClick={handleSubmit}>Submit</button>
        <div>{output}</div>
      </div>
    );
  };
  
export default GptPage;