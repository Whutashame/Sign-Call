import React, { useState } from "react";
import socket from "./socket";



function Room(){

    const [room, setRoom] = useState('');

  const handleJoin = () => {
    socket.emit('join_room', { room });
    navigation.navigate(`/session/${room}`);
  };
    return(
        <>
            <div className="flex justify-center  items-center font-['Poppins'] text-black bg-blue-950 h-screen">
                <div className="rounded-xl border-2 bg-blue-700">
                    <div className="grid grid-cols-2 rounded-t-xl p-3 text-center text-lg font-medium bg-blue-300">
                        <button>Create Room</button>
                        <button>Join Room</button>
                    </div>
                    <div className="flex flex-col items-center px-36 py-5">
                        <img className="max-w-24" src="\src\assets\logo_favicon.png" alt="" />
                        <div className="p-5 flex flex-col items-center">
                            <input className="text-black text-center rounded-md h-28 w-64 text-3xl" placeholder="Room ID" type="number" value={room} onChange={(e) => setRoom(e.target.value)} />
                            <button onClick={handleJoin} className="mt-8 border-black border-2 font-medium bg-indigo-700 text-white rounded-xl w-36 p-3">Join Room</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Room