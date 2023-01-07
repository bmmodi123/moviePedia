import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Demo() {
  const [text, setText] = useState('');

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get('https://ipowatch.in/');
      setText(response.data);
    }
    fetchData();
  }, []);

  return (
    <div>
      <p>{text}</p>
    </div>
  );
}

export default Demo;
