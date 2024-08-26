import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { fetchAudioFiles } from 'react-native-audio-files';
import TrackPlayer, { State } from 'react-native-track-player';


const HomeScreen = () => {
  const [audioFiles, setAudioFiles] = useState([]);

  useEffect(() => {
    const getAudioFiles = async () => {
      return await fetchAudioFiles();
    };
    getAudioFiles().then((result) => {
      setAudioFiles(result);
    });
    const coba = async() => {
      const getQueue = await TrackPlayer.getQueue();
      console.log(getQueue);
    }
    coba();
  }, []);

  return (
    <ScrollView style={{backgroundColor: '#000', flex: 1}}>
      {audioFiles?.map((element, index) => {
      return (
        <View key={index}>
          <Text>{element?.imageUrl}</Text>
        </View>
      );
      })}
    </ScrollView>
  );
};

export default HomeScreen