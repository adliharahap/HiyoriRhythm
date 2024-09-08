import React from 'react';
import { View, Dimensions, StyleSheet, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { selectTrackArtist, selectTrackArtwork, selectTrackTitle } from '../redux/slices/trackSlice';

const LyricDisplay = () => {
    const { width } = Dimensions.get('window');
    const boxWidth = width * 0.9; // 90% of the screen width

    return (
        <View style={[styles.lyricBox, { width: boxWidth, left: (width - boxWidth) / 2 }]}>
            
        </View>
    );
};

const styles = StyleSheet.create({
    lyricBox: {
        height: 100,
        backgroundColor: 'rgb(0,0,0)',
        position: 'absolute',
        bottom: 20,
        borderRadius: 15,
    },
});

export default LyricDisplay;
