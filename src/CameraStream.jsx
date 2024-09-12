import React, { useEffect, useRef, useState } from 'react';
import socket from './socket';

const CameraStream = () => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [isVideoReady, setVideoReady] = useState(false);

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => { if (videoRef.current) {
                videoRef.current.srcObject = stream;
                setVideoReady(true);
            }
        })
        .catch(err => console.error("Error accessing webcam:", err));

    // Cleanup function to stop video tracks
    return () => {
        if (videoRef.current && videoRef.current.srcObject) {
            videoRef.current.srcObject.getTracks().forEach(track => track.stop());
        }
        setVideoReady(false);
    };
}, []);

useEffect(() => {
    if (isVideoReady) {
        // Adjust the interval based on your processing capabilities
        const interval = setInterval(() => {
            captureAndSendFrame();
        }, 25); 

        return () => clearInterval(interval);
    }
}, [isVideoReady]);

const captureAndSendFrame = () => {
    if (canvasRef.current && videoRef.current && isVideoReady) {
        const context = canvasRef.current.getContext('2d');
        context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
        const frame = canvasRef.current.toDataURL('image/jpeg', 1.0);
        socket.emit('frame', frame);
    }
};

return (
    <div>
        
        <canvas ref={canvasRef} style={{ display: 'none' }} width="640" height="480"></canvas>
        <video ref={videoRef} autoPlay playsInline muted style={{ width: '1px', height: '1px', opacity: 0, visibility: 'hidden' }}></video>
    </div>
);
};

export default CameraStream;
               
