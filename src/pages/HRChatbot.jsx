import React, { useState, useEffect, useRef } from 'react';
import { FaceDetection } from '@mediapipe/face_detection';
import { Camera } from '@mediapipe/camera_utils';
import Webcam from 'react-webcam';
import styles from './HRChatbot.module.css';

const HRChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isUserInFrame, setIsUserInFrame] = useState(false);
  const [multipleFacesDetected, setMultipleFacesDetected] = useState(false);
  const [facesDetected, setFacesDetected] = useState(0);

  const width = 500;
  const height = 500;

  const webcamRef = useRef(null);

  useEffect(() => {
    const faceDetection = new FaceDetection({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection/${file}`,
    });

    faceDetection.setOptions({
      model: 'short',
      minDetectionConfidence: 0.5,
    });

    faceDetection.onResults((results) => {
      setFacesDetected(results.detections.length);
    });

    if (webcamRef.current) {
      const camera = new Camera(webcamRef.current.video, {
        onFrame: async () => {
          await faceDetection.send({ image: webcamRef.current.video });
        },
        width,
        height,
      });
      camera.start();
    }
  }, []);

  // Update face detection state
  useEffect(() => {
    setIsUserInFrame(facesDetected > 0);
    setMultipleFacesDetected(facesDetected > 1);
  }, [facesDetected]);

  const addSystemMessage = (text) => {
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), sender: 'system', text },
    ]);
  };

  const handleSendMessage = () => {
    if (input.trim()) {
      setMessages((prev) => [
        ...prev,
        { id: Date.now(), sender: 'user', text: input },
      ]);
      setInput('');
      // Simulate bot response
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { id: Date.now(), sender: 'bot', text: 'Thank you for your message!' },
        ]);
      }, 1000);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftPane}>
        <p>{`Faces Detected: ${facesDetected}`}</p>
        <div style={{ width, height, position: 'relative' }}>
          <Webcam
            ref={webcamRef}
            forceScreenshotSourceSize
            style={{
              height,
              width,
              position: 'absolute',
            }}
          />
        </div>
        <div className={styles.status}>
          {!isUserInFrame && (
            <span className={styles.warning}>No user detected in the frame!</span>
          )}
          {multipleFacesDetected && (
            <span className={styles.warning}>Multiple faces detected in the frame!</span>
          )}
          {isUserInFrame && !multipleFacesDetected && (
            <span className={styles.success}>User is in the frame.</span>
          )}
        </div>
      </div>
      <div className={styles.rightPane}>
        <div className={styles.chatHistory}>
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={
                msg.sender === 'user'
                  ? styles.userMessage
                  : msg.sender === 'bot'
                  ? styles.botMessage
                  : styles.systemMessage
              }
            >
              {msg.text}
            </div>
          ))}
        </div>
        <div className={styles.chatInput}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default HRChatbot;