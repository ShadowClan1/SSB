import React, { useContext, useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { client } from "../client/client";
import ContextH from "../Contexthook/ContextH";
import Spinner from "./Spinner";

export default function CreateNote() {
  const [val, setval] = useState("")
const context = useContext(ContextH);
const {onChangecn , post, handleClick} = context
const [imageAsset, setImageAsset] = useState()
const [wrongImageType, setWrongImageType] = useState(false)
const [loading, setLoading] = useState(false)
const uploadImage = (e)=>{ 
  const selectedFile = e.target.files[0];
  //uploading asset to sanity 
  if(
    selectedFile.type === 'image/png' ||
    selectedFile.type === 'image/svg' ||
    selectedFile.type === 'image/jpg' ||
    selectedFile.type === 'image/jpeg' ||
    selectedFile.type === 'image/gif' ||
    selectedFile.type === 'image/tiff' 
  ){setWrongImageType(false);
    setLoading(true)
    client.assets.upload('image', selectedFile, {
      contentType : selectedFile.type, filename: selectedFile.name
    }).then((document)=>{
      setImageAsset(document);
      setLoading(false);
    })
    .catch((error)=>{console.log('upload failed', error.message)})

  }
  else{
setWrongImageType(true);
  }

}
  return (
    
    <div className="flex flex-col justify-center items-center mt-5 lg:4/5">
<div className="flex lg:flex-row flex-col justify-center items-center bg-white lg:p-5 p-3 lg:w-4/5 w-full">
  <div className='bg-secondaryColor p-3 flex flex-0.7 w-full '>
    <div className='flex justify-center items-center flex-col border-2 border-dotted border-gray-300 w-full h-420'>
    {loading && (<div className='mt-20'><Spinner/></div>)}
{ !imageAsset ?(<label>
  <div className='flex flex-col items-center justify-center h-full'><div className='flex flex-col justify-center items-center'>
    <p className='font-bold text-2xl'><AiOutlineCloudUpload/> </p>
    <p className='text-lg'>Click to upload</p>
    </div> 
    <p className='mt-32 text-gray-400'> Recommendation: Use high-quality JPEG, JPG, PNG, GIF or TIFF less than 20 MB</p>

  </div>
  <input type='file' name='upload-image' onChange={uploadImage} className='h-0 w-0'/>
</label>): (
  <div className='relative h-full'>
    <img src={imageAsset?.url} alt='uploaded-pic'  
    className='h-full w-full'/>
    <button type='button' className='absolute bottom-3 right-3 p-3 rounded-full bg-white text-xl cursor-pointer outline-none  hove:shadow-md transition-all duration-500 ease-in-out' onClick={()=>setImageAsset(null)}><MdDelete/></button>
  </div>
)}


    </div>
    </div> 
  
   </div>
    </div>
   
  );
}
