import {React , useState , useEffect} from 'react'
import { Card , TextField , Button, Typography} from '@mui/material'

export default function ChatUI({socket  , userDetails}) {

    const [currentMessage, setcurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);


    const handleSend = async () => {
        if(currentMessage !== ""){
            var messageData = {
                userDetails:userDetails,
                message : currentMessage,
                time:
                    new Date(Date.now()).getHours() + 
                    ":"+
                    new Date(Date.now()).getMinutes()+
                    ":"+
                    new Date(Date.now()).getSeconds()
            }


            await socket.emit("send_msg", messageData);

            // setcurrentMessage('')

        }
    }

    useEffect(() => {
        socket.on("receive_msg", (data) => {
          console.log('tnx you sm');
        });
      }, [socket]);

  return (

    <div style={{ margin:'25px'}}>
        <Card sx={{width: '600px',padding:'10px' , display:'flex' , flexDirection:'column'}}>

{/* Header */}
            <div>
                <Typography variant='h5' sx={{ color: '#010101', fontWeight: 'bold', margin: '10px 0px' , textAlign:'center' }} > Live Chat </Typography>
            </div>


    {/* Body */}
    <div>
        <h2>Loading..</h2>
    </div>



            {/* Footer */}
            <div style={{display:'flex'}}>
                <TextField size='small' placeholder='Say Hi..' sx={{flex:1,margin:'10px 5px'}} value={currentMessage} onChange={(e) => { setcurrentMessage(e.target.value)}} />

                <Button variant='contained' size='small' sx={{margin:'10px 5px'}} onClick={()=>handleSend()}> Send </Button>
            </div>

        </Card>
    </div>


  )
}
