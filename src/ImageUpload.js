import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import db from "./firebase";
import {storage} from "./firebase";
import firebase from './firebase';
import "./ImageUpload.css";
import moment from "moment";
function ImageUpload({username}) {
  const [image, setImage]= useState(null);
  const [progress, setProgress] = useState(0);
  const [caption, setCaption] = useState('');
  
const handleChange=(e) => {
    if(e.target.files[0]){
        setImage(e.target.files[0]);
    }
};

useEffect(() =>{
    console.log(moment().format('MMMM Do YYYY, h:mm:ss a'));
    
},[])
const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
        "state_changed",
        (snapshot) =>{
            //progress function....
            const progress = Math.round(
                (snapshot.bytesTransferred/snapshot.totalBytes)*100
            );
            setProgress(progress);
        },
        (error) => {
            //error function...
            console.log(error);
            alert(error.message);
        },
        ()=>{
            //complete function...
            storage
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then(url => {
                //post image inside db
                db.collection("posts").add({
                    timestamp: `${moment().format('MMMM Do YYYY, h:mm:ss a')}`,
                    caption: caption,
                    imageUrl: url,
                    username: username
                });
             setProgress(0);
             setCaption("");
             setImage(null);   
            });
        }
    )
}

  return (
    <div className="imageupload">
    <progress className="imageupload_progess" value={progress} max="100" />
    <input type="text" placeholder='Enter a caption...' onChange={event=> setCaption(event.target.value)} value={caption}/>
    <input type="file" onChange={handleChange} />
    <Button onClick={handleUpload}>
        Upload
    </Button>
    
    </div>
  )
}

export default ImageUpload