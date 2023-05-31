import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';


function RunQuiz() {
    const quizname = useParams();
    
    console.log(quizname);
    
    useEffect(() => {
        const socket = io('http://localhost:8007');
        socket.emit('customEvent', { message: 'Hello from the frontend!' });
    

        socket.on('customEvent', (data) => {
          console.log('Received data from server:', data);
        
        });
    
        
        return () => {
          socket.disconnect();
        };
      }, []);

  return (
    <div>
      Run Quiz
    </div>
  )
}

export default RunQuiz
