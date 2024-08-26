import { View, Text, Button, Alert } from 'react-native'
import React, { useEffect } from 'react'
import TrackPlayer, { State } from 'react-native-track-player'

const Playlistcreen = () => {

  useEffect(() => {
    // Initialize TrackPlayer (optional, if you need to set up anything)
    const setupPlayer = async () => {
      try {
        console.log('TrackPlayer setup complete');
      } catch (error) {
        console.error('Error setting up TrackPlayer:', error);
      }
    };

    setupPlayer();
  }, []);
// Setup TrackPlayer and add track
const playMusic = async () => {
  try {
    // Add a track to the queue if it's not already added
    const track = {
      id: 1,
      url: '/storage/emulated/0/Music/Secukupnya - 256.mp3',
      artist: 'afds',
      album: 'sdfds',
      title: 'Zoe Wees Control Lyric Lyrics Video',
      duration: 229,

    };
    await TrackPlayer.reset();
    await TrackPlayer.add(track);
    console.log('Track added to TrackPlayer');

    // Play the track
    await TrackPlayer.play();
    console.log('Play command sent to TrackPlayer');

    // Check current state
    const state = await TrackPlayer.getState();
    if (state === TrackPlayer.STATE_PLAYING) {
      console.log('TrackPlayer is playing');
    } else {
      console.log('TrackPlayer is not playing');
      // Additional info
      const position = await TrackPlayer.getPosition();
      const duration = await TrackPlayer.getDuration();
      const getQueue = await TrackPlayer.getQueue();
      console.log(`Track position: ${position} / ${duration}`);
      Alert.alert('TrackPlayer is not playing');
      console.log('queque : ', getQueue);
      
    }
  } catch (error) {
    console.error('Error playing track:', error);
    Alert.alert('Error playing track', error.message);
  }
};

return (
  <View>
    <Button title="Play/Pause Music" onPress={playMusic} />
  </View>
);
}

export default Playlistcreen