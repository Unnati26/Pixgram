import React, {useState, useEffect} from 'react';
import './App.css';
import Post from './Post';
import db from "./firebase";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import {auth} from "./firebase";
import ImageUpload from './ImageUpload';

const style = {
  position: 'absolute' ,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
function App() {
  const [posts, setPosts]= useState([]);
  const [open, setOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [username, setUsername]= useState('');
  const [password, setPassword]= useState('');
  const [email, setEmail]= useState('');
  const [user,setUser] = useState(null);
 useEffect(() =>{
  const unsubscribe= auth.onAuthStateChanged((authUser) =>{
    if (authUser){
        //user has logged in...
        console.log(authUser);
        setUser(authUser);

        if(authUser.displayName){
          // don't update username
        }else{
          //if we just created someone...
          return authUser.updateProfile({
            displayName: username,
          });
        }
    } else {
       //user has logged out...
       setUser(null);
    } 
  })
  return() =>{
    //perform some cleanup actions
    unsubscribe();
  }
 },[user, username]);
 
  useEffect(() =>{
    //this is where the code runs
       db.collection('posts').orderBy('timestamp','desc').onSnapshot(snapshot=>{
      //every time a new post is added, this code runs...
        setPosts(snapshot.docs.map(doc => ({
          id: doc.id,
          post: doc.data()
        })));
       
      })
  },[]);

  const signUp = (event) =>{
    event.preventDefault();
    auth
    .createUserWithEmailAndPassword(email, password)
    .then((authUser) =>{
      return authUser.user.updateProfile({
        displayName: username
      })
    })
    .catch((error)=> alert(error.message));
  }
  const signIn=(event) =>{
    event.preventDefault();
    auth
    .signInWithEmailAndPassword(email, password)
    .catch((error) => alert(error.message))
  setOpenSignIn(false);  
  
  }
  
  
  return (
    <div className="App">
   

    
    <Modal
        open={open}
        onClose={() => setOpen(false)}
        
      >
      <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
          <center>
       <img
       className="app_headerImage"
       src="./images/instagram.svg"
       alt=""
       height="30px;"
       />
       <form className="app_signup">
       <Input
        placeholder="username"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        />
       <Input
        placeholder="email"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        />
        <Input
        placeholder="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}

        />
        <Button type="submit" onClick={signUp}>Sign Up</Button>
        </form>
       </center>
          </Typography>
          
        </Box>

      </Modal>
      <Modal
        open={openSignIn}
        onClose={() => setOpenSignIn(false)}
        
      >
      <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
          <center>
       <img
       className="app_headerImage"
       src="./images/pixgram.jpg"
       alt=""
       height="60px;"
       />
       <form className="app_signup">
       
       <Input
        placeholder="email"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        />
        <Input
        placeholder="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}

        />
        <Button type="submit" onClick={signIn}>Sign In</Button>
        </form>
       </center>
          </Typography>
          
        </Box>

      </Modal>
      
      <div className="app_header"> 
       {/* bem */}
       <img
       className="app_headerImage"
       src="./images/pixgram.jpg"
       alt=""
       
       height="60px;"
       />
       {user ? (
        <Button onClick={()=> auth.signOut()}>Logout</Button>
        ):(
          <div className="app_loginContainer">
          <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
          <Button onClick={() => setOpen(true)}>Sign Up</Button>
        </div>
        )}
      
       

      </div>
      
      
      <div className="app_posts">
      <div className="app_postsLeft">
      {
        posts.map(({id, post}) =>(
          <Post key={id} postId={id} user={user} username={post.username} caption={post.caption} imageUrl={post.imageUrl} />
        ))
      }
      
      </div>

      
      <div className="app_postsRight">
      
</div>
</div>

  
      {user?.displayName ? (
      <ImageUpload username={user.displayName} />

    ):(
      <h3 className='sorry'>Sorry you need to login to upload!</h3>
    )}
      
    </div>
  );
}

export default App;
