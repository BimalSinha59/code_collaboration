import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import {toast} from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';


function HomePage() {

    const navigate = useNavigate();
    const [roomId,setRoomId]=useState('');
    const [username, setusername]=useState('')
    const createNewRoom = (e) => {
        e.preventDefault();
        const id = uuidv4();
        setRoomId(id);
        toast.success('Created a new room')
    }


    const joinRoom = () => {
        if(!roomId || !username){
            toast.error('Room Id & User Name is required')
            return;
        }

        //Redirect
        navigate(`/editor/${roomId}`, {
            state: {
                username,
            },
        })
    }

    const handleInputEnter = (e) => {
        //console.log('event', e.code);
        if(e.code === 'Enter'){
            joinRoom();
        }
    }

    return (
        <div className='homePageWrapper'>
            <div className='formWrapper'>
                <img className="homePageLogo" src="#" alt="#" />
                <h4 className='mainLabel'>Paste invitation Room ID</h4>
                <div className='inputGroup'>
                    <input 
                        type="text"
                        className='inputBox'
                        placeholder='Room ID'
                        onChange={(e) => setRoomId(e.target.value)}
                        value={roomId}
                        onKeyUp={handleInputEnter}
                    />
                    <input 
                        type="text"
                        className='inputBox'
                        placeholder='User Name'
                        onChange={(e) => setusername(e.target.value)}
                        value={username}
                        onKeyUp={handleInputEnter}
                    />
                    <button className='btn joinBtn' onClick={joinRoom}>Join</button>
                    <span className='createInfo'>
                        If you don't have an invite then create &nbsp;
                        <a onClick={createNewRoom} href="" className='createNewBtn'>new room</a>
                    </span>
                </div>
            </div>
            <footer>
                <h4>
                    Built with 💛 by {' '}
                    <a href="githublink">Bimal Sinha</a>
                </h4>
            </footer>
        </div>
    )
}

export default HomePage