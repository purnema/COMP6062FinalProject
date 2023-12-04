import React from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import React, { useState, useEffect } from 'react';

const BluetoothDevicesScreen = ({ devices, goBack }) => {
    const [bluetoothState, setBluetoothState] = useState({
      connectedDevice: null,
      devices: [],
    });
    const [showBluetoothDevices, setShowBluetoothDevices] = useState(false);
  
    const connectToDevice = (device) => {
      setBluetoothState((prev) => ({ ...prev, connectedDevice: device }));
      setShowBluetoothDevices(false);
    };
  
    const disconnectFromDevice = () => {
      setBluetoothState((prev) => ({ ...prev, connectedDevice: null }));
    };
  
    useEffect(() => {
      const fetchBluetoothDevices = async () => {
        try {
          const response = await fetch('/api/devices');
          if (!response.ok) {
            throw new Error('Failed to fetch Bluetooth devices');
          }
          
          setBluetoothState(response.data);
        } catch (error) {
          console.error('Error fetching Bluetooth devices:', error);
        }
      };
  
      fetchBluetoothDevices();
    }, []);
  
    return (
      <View>
        <Text>Bluetooth Devices Screen</Text>
        <FlatList
          data={devices}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <BluetoothDeviceListItem
              device={item}
              connectToDevice={connectToDevice}
              disconnectFromDevice={disconnectFromDevice}
            />
          )}
        />
        <Button title="Back" onPress={goBack} />
      </View>
    );
  };  

export default BluetoothDevicesScreen;
