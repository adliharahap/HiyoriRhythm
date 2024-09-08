import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { fetchAudioFiles } from 'react-native-audio-files';
import TrackPlayer, { State } from 'react-native-track-player';
import AdvancedLyricDisplay from '../../components/AdvancedLyricDisplay';


const HomeScreen = () => {
  const lrcFilePath = 'file:///storage/emulated/0/Download/wea.lrc';

  return (
        <View style={{flex: 1, backgroundColor: 'black'}}>
            <ScrollView style={{flex: 1}}>
                <AdvancedLyricDisplay lrcFilePath={lrcFilePath} />
            </ScrollView>
        </View>
  );
};

export default HomeScreen