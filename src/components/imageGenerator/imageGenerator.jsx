import React from 'react';
import './imageGenerator.css';
import { useRef } from 'react';
import default_image from '../Assets/AiImage.jpg';

const ImageGenerator = () => {
    const [image_url, setImageUrl] = React.useState("/");
    let inputRef=useRef(null);

    const [loading, setLoading] = React.useState(false);
    const imageGenerator = async () => {
        if(inputRef.current.value === ""){
            return 0;
        }
        setLoading(true);
         
         const response= await fetch(
            "https://api.openai.com/v1/images/generations",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization:
                    `Bearer ${apiKey}`,
                     "User-Agent": "Chrome",
                },
                body:JSON.stringify({
                    prompt:`${inputRef.current.value}`,
                    n:1,
                    size:"512x512",
                }),
            }
         );

         let data=await response.json();
         
         let data_array= data.data;
         
         setImageUrl(data_array[0].url);
         console.log(data_array[0].url);
         setLoading(false);
    }

  return (
    <div  className='ai-image-generator' >
    <div className='header'> AI Image <span> Generator </span> </div>
    <div className='img-loading'>
        <div className='image'> <img src={image_url=== "/" ? default_image:image_url}/> </div>
            <div className="loading">
                <div className={loading ?"loading-bar-full":"loading-bar"}></div>
                <div className={loading?'loading-text':'diplay-none'
                }>Loading.... </div>
            </div>
    </div>
    <div className='search-box'>
        <input type="text"  ref={inputRef} className="search-input" placeholder="Search for images" />
        {/* {console.log(inputRef)} */}

        <div className='generate-btn' onClick={()=>{imageGenerator()}}> Generate </div>
    </div>
    </div>
  );
};
export default ImageGenerator;