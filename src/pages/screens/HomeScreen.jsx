import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { fetchAudioFiles } from 'react-native-audio-files';
import TrackPlayer, { State } from 'react-native-track-player';
import AdvancedLyricDisplay from '../../components/AdvancedLyricDisplay';


const HomeScreen = () => {
  const [audioFiles, setAudioFiles] = useState([]);

useEffect(() => {
  const getAudioFiles = async () => {
    return await fetchAudioFiles();
  };
  getAudioFiles().then((result) => {
    setAudioFiles(result);
  });
}, []);

return (
  <ScrollView style={{backgroundColor: 'black', paddingBottom: 500}}>
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