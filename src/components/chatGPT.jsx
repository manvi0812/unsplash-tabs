import { useState } from 'react';
import axios from 'axios';

export default function ChatGPT() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');

  const HTTP = 'http://localhost:8020/chat';

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${HTTP}`, { prompt })
      .then((res) => setResponse(res.data))
      .catch((err) => console.log(err));
  };

  const handlePrompt = (e) => {
    setPrompt(e.target.value);
  };

  return (
    <div>
      <h1>Chat GPT</h1>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label>Ask Questions</label>
          <input
            type='text'
            placeholder='Enter text'
            value={prompt}
            onChange={handlePrompt}
          />
        </div>
        <button type='submit'>Generate</button>
      </form>
      <div>{response ? response : 'Ask me anything...'}</div>
    </div>
  );
}
