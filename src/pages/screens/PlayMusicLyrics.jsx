import { View, StatusBar, SafeAreaView, ImageBackground, StyleSheet, Dimensions, ScrollView } from 'react-native';
import React from 'react';
import HeaderMusic from '../../components/HeaderMusic';
import { BlurView } from '@react-native-community/blur';
import { useSelector } from 'react-redux';
import { selectTrackAlbum, selectTrackArtwork } from '../../redux/slices/trackSlice';
import PlayMusicScreen from './PlayMusicScreen';
import LyricsScreen from './LyricsScreen';

const PlayMusicLyrics = () => {
    const album = useSelector(selectTrackAlbum);
    const artwork = useSelector(selectTrackArtwork);

    const width = Dimensions.get('window').width;

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#0d0d0d'}}>
            <StatusBar backgroundColor="transparent" translucent />
            <HeaderMusic album={album} />
            <ImageBackground style={styles.containerStyle} source={artwork === "content://media/external/audio/albumart/1" ? require('../../assets/images/DefaultMusic.png') : {uri: artwork}}>
                <BlurView
                    style={StyleSheet.absoluteFill}
                    blurType="dark"
                    blurAmount={100}
                    reducedTransparencyFallbackColor="white"
                />
                <ScrollView
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    style={{flex: 1}}
                >
                    <View style={{width, flex: 1}}>
                        <PlayMusicScreen />
                    </View>
                    <View style={{width, flex: 1}}>
                        <LyricsScreen />
                    </View>
                </ScrollView>
            </ImageBackground>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        width : '100%',
    },
    blur: {
        ...StyleSheet.absoluteFillObject,
    },
});

export default PlayMusicLyrics;
