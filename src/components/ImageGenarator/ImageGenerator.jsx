import React, { useRef, useState } from 'react';
import './ImageGenerator.css';
import Bg_image from '../Assets/rk.jpg';

const ImageGenerator = () => {
  const [image_url, setImage_url] = useState('/');
  let inputRef = useRef(null);
  const [loading,setLoading] = useState()

  const ImageGenerator = async () => {
    if (inputRef.current.value === '') {
      return 0;
    }

    const response = await fetch(
      'https://api.openai.com/v1/images/generations',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer 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',
          'User-Agent': 'chrome',
        },
        body: JSON.stringify({
          prompt: `${inputRef.current.value}`,
          n: 1,
          size: '512x512',
        }),
      }
    );

    let data = await response.json();
    let data_array = data.data;
setImage_url(data_array[0].url);
  };

  return (
    <div className="ai-img-generator">
      <div className="gradient"></div>
      <div className="header">
        Ai image <span>Generator</span>
      </div>
      <div className="img-loading">
        <div className="image">
          <img src={image_url === '/' ? Bg_image : image_url} alt="" />
        </div>
      </div>
      <div className="search-box">
        <input
          type="text"
          ref={inputRef}
          className="search-input"
          placeholder="describe what you want to see"
        />
        <div className="generate-btn" onClick={() => ImageGenerator()}>
          Generate
        </div>
      </div>
    </div>
  );
};

export default ImageGenerator;
