import './App.css';
import io from 'socket.io-client'
import { Button, Card, TextField, Typography } from '@mui/material'
import { useEffect, useState } from 'react';
import ChatUI from './ChatUI';

const socket = io.connect("http://localhost:3001")

function App() {


  const [userDetails, setUserDetails] = useState({
    userName: "",
    roomId: ""
  })

  const handleJoinRoom = () =>{
    if(userDetails.userName !== "" && userDetails.roomId !== ""){
      socket.emit('join_room' , userDetails.roomId)
    }
  }



  
  


  return (


    <div style={{ display: 'flex', flexDirection:'column' , alignItems:'center' ,justifyContent: 'center', margin: '25px', }}>
      <Card sx={{ width: '600px', padding: '10px' }}>
        <Typography variant='h5' sx={{ color: '#010101', fontWeight: 'bold', margin: '10px 0px' , textAlign:'center' }}> Join Now </Typography>

        <TextField sx={{ margin: '10px 0px' }} variant='outlined' color='primary' size='small' placeholder='Enter User Name' fullWidth value={userDetails.userName} onChange={(e) => { setUserDetails({ ...userDetails, userName: e.target.value }) }} />


        <TextField sx={{ margin: '10px 0px' }} variant='outlined' color='primary' size='small' placeholder='Enter Room ID' fullWidth value={userDetails.roomId} onChange={(e) => { setUserDetails({ ...userDetails, roomId: e.target.value }) }} />

        <Button sx={{ margin: '10px 0px' }} variant='contained' color='primary' size='small' fullWidth onClick={()=>handleJoinRoom()}> Join Room </Button>

      </Card>


      <ChatUI socket={socket} userDetails={userDetails} />

    </div>

  );
}

export default App;
