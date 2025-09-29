import React, { useEffect, useRef, useState } from 'react'
import Client from '../components/Client'
import Editor from '../components/Editor'
import { initSocket } from '../socket.js';
import ACTIONS from '../../Actions';
import toast from 'react-hot-toast';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import epLogo from '../assets/code_collaboration_LOGO.png'

function EditorPage() {

    const [clients, setClients] = useState([]);

    const socketRef = useRef(null);
    const codeRef = useRef(null);
    const location = useLocation();
    const {roomId} = useParams();
    const reactNavigator = useNavigate();

    useEffect(() => {
        const init = async () =>{
            socketRef.current = await initSocket();
            socketRef.current.on('connect_error', (err) => handleErrors(err));
            socketRef.current.on('connect_failed', (err) => handleErrors(err));

            function handleErrors(e){
                console.log('socket error', e);
                toast.error('Socket connectio failed, try again later. ')
                reactNavigator('/');
            }
            socketRef.current.emit(ACTIONS.JOIN, {
                roomId,
                username: location.state?.username,
            });
            
            //Listening for joined event

            socketRef.current.on(
                ACTIONS.JOINED,
                ({clients, username, socketId}) => {
                    if(username !== location.state?.username){
                        toast.success(`${username} joined the room.`);
                        //console.log(`${username} joined`)
                    }

                    setClients(clients);
                    socketRef.current.emit(ACTIONS.SYNC_CODE, {
                        code: codeRef.current,
                        socketId,
                    })
                }
            )

            //Listening for disconnected

            socketRef.current.on(
                ACTIONS.DISCONNECTED,
                ({socketId, username}) => {
                    toast.success(`${username} left the room. `);
                    setClients((prev) => {
                        return prev.filter(
                            (client) => client.socketId !== socketId
                        )
                    })
                }
            )
        };

        init();
        

        //clear the listeners and disconnect the socket -> it prevents memory leackage
        return () => {
            socketRef.current.off(ACTIONS.JOIN);
            socketRef.current.off(ACTIONS.DISCONNECTED);
            socketRef.current.disconnect();
        }
    }, []);

    async function copyRoomId() {
        try{
            await navigator.clipboard.writeText(roomId);
            toast.success('Room Id has been copied to your clipboard');
        }
        catch(err){
            toast.error('Could not copy the Room Id');
            console.error(err);
        }
    }

    function leaveRoom(){
        reactNavigator('/');
    }

    if(!location.state){
        return <Navigate to="/"/>
    }

    return (
        <div className='mainWrap'>

            <div className="aside">

                <div className="asideInner">

                    <div className="logo">
                        <img 
                            className='logoImage'
                            src={epLogo} alt="Editorpagelogo"
                        />
                    </div>

                    <h3>Connected</h3>

                    <div className="clientList">
                        {clients.map((client) => (
                            <Client 
                                key={client.socketId}
                                username={client.username}
                            />
                        ))}
                    </div>
                </div>

                <button className='btn copyBtn' onClick={copyRoomId}>Copy Room Id</button>

                <button className='btn leaveBtn' onClick={leaveRoom}>Leave</button>
            </div>


            <div className="editorWrap">
                <Editor socketRef = {socketRef} roomId = {roomId} onCodeChange = {(code) => {codeRef.current = code}}/>
            </div>

        </div>
    )
}

export default EditorPage