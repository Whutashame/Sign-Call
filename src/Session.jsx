import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import socket from './socket';
import CameraStream from './CameraStream';

function Session() {
  const { room } = useParams();
  const [processedFrame, setProcessedFrame] = useState('');

  useEffect(() => {
    // Handle socket connection and join the specified room
    socket.on('connect', () => {
      socket.emit('join_room', { room });
    });

    // Handle incoming messages (can be used for debugging or notifications)
    socket.on('message', (data) => {
      console.log(data);
    });

    // Update the processed frame with the latest received
    socket.on('processed_frame', (data) => {
      setProcessedFrame(data);
    });

    // Cleanup listeners on component unmount
    return () => {
      socket.off('connect');
      socket.off('message');
      socket.off('processed_frame');
    };
  }, [room]);

  return (
    <div className='bg-slate-700 h-screen flex flex-col justify-center items-center'>
      <h1 className='text-3xl font-bold'>Room: {room}</h1>
      <CameraStream />
      {processedFrame && (
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
          <div style={{ margin: 10 }}>
            <img className='rounded-lg'
              src={`data:image/jpeg;base64,${processedFrame}`}
              alt="Processed Frame"
              style={{ width: '600px', height: 'auto', border: '15px solid #fff' }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Session
