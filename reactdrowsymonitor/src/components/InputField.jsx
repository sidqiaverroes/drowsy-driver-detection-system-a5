import React, { useState } from "react";
import useWebSocket from "react-use-websocket";

const InputField = () => {
  const [driverState, setDriverState] = useState("");
  const [alarmState, setAlarmState] = useState("");
  const [velocity, setVelocity] = useState(0);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  const [messages, setMessages] = useState([]);

  const socketUrl = `ws://127.0.0.1:8000/1`;

  const { sendJsonMessage } = useWebSocket(socketUrl, {
    onOpen: () => {
      console.log("Connected!");
    },
    onClose: () => {
      console.log("Closed!");
    },
    onError: () => {
      console.log("Error!");
    },
    onMessage: (msg) => {
      const data = JSON.parse(msg.data);
      setMessages((prevMessages) => [...prevMessages, data.new_message]);
    },
  });

  const handleSendMessage = () => {
    const messageData = {
      driver_state: driverState,
      alarm_state: alarmState,
      velocity: velocity,
      coordinate: {
        latitude: latitude,
        longitude: longitude,
      },
    };

    console.log("Sending message:", messageData);

    sendJsonMessage({ type: "message", messageData });

    setDriverState("");
    setAlarmState("");
    setVelocity(0);
    setLatitude(0);
    setLongitude(0);
  };

  return (
    <>
      <form>
        <label>Driver State:</label>
        <input
          type="radio"
          id="dstrue"
          name="driver_state"
          value="true"
          onChange={(e) => setDriverState(e.target.value)}
        />
        <label htmlFor="dstrue">True</label>
        <input
          type="radio"
          id="dsfalse"
          name="driver_state"
          value="false"
          onChange={(e) => setDriverState(e.target.value)}
        />
        <label htmlFor="dsfalse">False</label>
        <br />

        <label>Alarm State:</label>
        <input
          type="radio"
          id="astrue"
          name="alarm_state"
          value="true"
          onChange={(e) => setAlarmState(e.target.value)}
        />
        <label htmlFor="astrue">True</label>
        <input
          type="radio"
          id="asfalse"
          name="alarm_state"
          value="false"
          onChange={(e) => setAlarmState(e.target.value)}
        />
        <label htmlFor="asfalse">False</label>
        <br />

        <label>
          Velocity:
          <input
            type="number"
            value={velocity}
            onChange={(e) => setVelocity(e.target.value)}
          />
        </label>
        <br />

        <label>Coordinate:</label>
        <br />
        <label>
          Latitude:
          <input
            type="number"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
          />
        </label>
        <label>
          Longitude:
          <input
            type="number"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
          />
        </label>
      </form>
      <button onClick={handleSendMessage}>Send</button>

      <hr />

      <h3>Sent message:</h3>
      {messages.map((msg, index) => {
        console.log(msg);
        return (
          <div key={index}>
            <p>driver state: {msg.driver_state ? "true" : "false"}</p>
            <p>alarm state: {msg.alarm_state ? "true" : "false"}</p>
            <p>velocity: {msg.velocity}</p>
            <p>latitude: {msg.coordinate.latitude}</p>
            <p>longitude: {msg.coordinate.longitude}</p>
          </div>
        );
      })}
    </>
  );
};

export default InputField;
