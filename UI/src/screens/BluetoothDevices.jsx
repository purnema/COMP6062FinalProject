import React, { useState, useEffect } from "react";
import axios from "axios";

const BluetoothDevices = () => {
  const [devices, setDevices] = useState([]);
  const [connect, setConnect] = useState("");
  const connectTo = (deviceId) => {
    setConnect(deviceId);

    axios
      .put("/api/bluetooth", {
        connectedDevice: deviceId,
      })
      .then((response) => {
        console.log("Connected", response.data.connectedDevice);
      });
  };

  useEffect(() => {
    axios
      .get("/api/bluetooth")
      .then((response) => {
        console.log(response.data);
        setDevices(response.data.devices);
        setConnect(response.data.connectedDevice);
      })
      .catch((error) => {
        console.error("Error fetching bluetooth", error);
      });
  }, []);

  return (
    <>
      <div>Bluetooth Devices</div>
      <ul>
        {devices
          .filter((device) => device.type == "Audio")
          .map((device) => (
            <li key={device.id}>
              {device.name}
              <button
                onClick={() => connectTo(device.id)}
                style={{ backgroundColor: "royalblue" }}
              >
                {connect === device.id ? "Disconnect" : "Connect"}
              </button>
            </li>
          ))}
      </ul>
    </>
  );
};

export default BluetoothDevices;
