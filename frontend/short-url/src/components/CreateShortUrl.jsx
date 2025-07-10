// import React from 'react'
import { useState } from "react";
import "./CreateShortUrl.css";

const CreateShortUrl = () => {
  const [url, setUrl] = useState("");

  const handleGenerateUrl = (e) => {
    e.preventDefault();
    console.log(url);
    generateUrl();
  };

  const generateUrl = async () => {
    try {
      const res = await fetch(`http://localhost:3000/url/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log(`Error in POST Request: `, error);
    }
  };

  return (
    <div>
      <input
        type="text"
        name="url"
        id="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="https://www.example.com"
      />
      <button onClick={handleGenerateUrl}>Generate Short Url</button>
    </div>
  );
};

export default CreateShortUrl;
