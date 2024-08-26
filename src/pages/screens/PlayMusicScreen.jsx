import { View, Text, SafeAreaView, StatusBar, Image, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import HeaderMusic from '../../components/HeaderMusic';
import TextTicker from 'react-native-text-ticker';
import { Svg, Path, G, Rect } from 'react-native-svg';
import Slider from '@react-native-community/slider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TrackPlayer,{RepeatMode} from 'react-native-track-player';
import { BlurView } from '@react-native-community/blur';
import { ChangeSelectedOptions } from '../../utils/PlayMusicutils/changeSelectedQueque';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedQueQue} from '../../redux/slices/audioSlice';
import { useRoute, useNavigation } from '@react-navigation/native';

const PlayMusicScreen = () => {
    const [isPlaying, setIsPlaying] = useState();
    const selectedQueque = useSelector((state) => state.audio.selectedQueQue);
    const dispatch = useDispatch();

    // mendapatkan id music
    const route = useRoute();
    const receivedMusicId = route.params?.MusicId;

    useEffect(() => {
        const skipMusic = async () => {
            try {
                console.log(" data : ", receivedMusicId);
                
                if (receivedMusicId == 999999) {
                    const state = await TrackPlayer.getState();
                    if (state === State.Playing) {
                        // MusicControl.updatePlayback({
                        //     state: MusicControl.STATE_PLAYING,
                        // });
                        setIsPlaying(true);
                    }else if(state === State.Paused) {
                        // MusicControl.updatePlayback({
                        //     state: MusicControl.STATE_PAUSED,
                        // });
                        setIsPlaying(false);
                    }
                }else {
                    const musicId = parseInt(receivedMusicId, 10);
                    console.log("music id : ", musicId);
                    
                    await TrackPlayer.skip(musicId);
                    await TrackPlayer.play();
                    // MusicControl.updatePlayback({
                    //     state: MusicControl.STATE_PLAYING,
                    // });
                    setIsPlaying(true);
                }
            } catch (error) {
                console.log("error : ", error);
                
            }
        }

        GetQueQueMusic();
        skipMusic();
        // updateTrackInfo();
    }, []);

    const GetQueQueMusic = async () => {
        const getvalue = await AsyncStorage.getItem('QueQueSelected');
        if (!getvalue) {
            await AsyncStorage.setItem('QueQueSelected', '1');
        }
        const selectedvalue = parseInt(getvalue, 10);
        dispatch(setSelectedQueQue(selectedvalue));
    }

    

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#0d0d0d'}}>
            <StatusBar backgroundColor="transparent" translucent />
            <HeaderMusic />
            <ImageBackground style={[styles.containerStyle, styles.blur]} source={require('../../assets/images/test.jpg')}>
                <BlurView
                style={{position: 'absolute', height: '100%', width: '100%', top: 0}}
                blurType="dark"
                blurAmount={100}
                reducedTransparencyFallbackColor="white"
                />
                <View style={{height: '57%', width: '100%', justifyContent: 'center', alignItems: 'center', paddingTop: 80}}>
                    <Image source={require('../../assets/images/test.jpg')} style={{height: '80%', width: "75%", borderRadius: 20, resizeMode: 'cover'}}/>
                </View>
                <View style={{flex: 1, width: '100%'}}>
                    <View style={{width: '100%', justifyContent: 'flex-start', alignItems: 'center',paddingHorizontal: 5}}>
                        <TextTicker
                            style={{ fontFamily: 'Roboto-Bold', fontSize: 20, color: '#Fdfdfd'}}
                            duration={7000} // Durasi pergerakan teks
                            loop // Mengulangi animasi
                            bounce // Memberikan efek pantulan
                            repeatSpacer={150} // Jarak kembali ke awal
                            marqueeDelay={3000} // Jeda sebelum animasi dimulai
                            scroll
                        >
                            Zoe Wees Control Lyric Lyrics Video
                        </TextTicker>
                        <Text numberOfLines={1} style={{fontFamily: 'Roboto-SemiBold', fontSize: 16, color: '#cdcdcd', marginTop: 16}}>Ariana Grande</Text>
                    </View>
                    <View style={{height: 60, marginTop: 15}}>
                        <View style={{flex: 1}}>
                            <View style={{flex: 1, justifyContent: 'center'}}>
                                <Slider
                                    style={{ width: '100%'}}
                                    minimumValue={0}
                                    maximumValue={20}
                                    value={6}
                                    // onValueChange={(value) => onValueChange(Number(value))}
                                    // onSlidingStart={(value) => setHasSliding(true)}
                                    // onSlidingComplete={(value) => {
                                    //     setHasSliding(false);
                                    //     onSlidingComplete(Number(value));
                                    // }}
                                    thumbTintColor='#FFFFFF'
                                    minimumTrackTintColor='#F2F2F2'
                                    maximumTrackTintColor='#808080'
                                    // trackStyle={HasSliding ? {height: 2.5, borderRadius: 50, borderWidth: 6, borderColor: 'rgba(58,58,58,0.5)'} : {height: 2.5, borderRadius: 50}}
                                    // thumbStyle={HasSliding ? {height: 14, width: 14} : {height: 12, width: 12}}
                                />
                            </View>
                        </View>
                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', paddingHorizontal: 20}}>
                            <Text>0:29</Text>
                            <Text>3:54</Text>
                        </View>
                    </View>
                    <View style={{height: 40}}>
                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                            <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-start'}}>
                                <View style={{marginLeft: 20}}>
                                    <Svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="#FFFFFF"><Path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z"/></Svg>
                                </View>
                            </View>
                            <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-end'}}>
                                <View style={{marginRight: 20}}>
                                    <Svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="#FFFFFF"><Path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z"/></Svg>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 20, }}>
                        <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
                            <TouchableOpacity onPress={() => ChangeSelectedOptions(dispatch)}>
                                {/* tempat buat shuffle repeat or nexxt */}
                                {/* <Image source={selected} style={{height: selectedOption === 1 ? 24 : 26, width: selectedOption === 1 ? 24 : 26}} /> */}
                                {selectedQueque == 1 ? (
                                    <Svg fill="#fdfdfd" width="34px" height="34px" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
                                        <G fill-rule="evenodd">
                                            <Path d="M109.533 197.602a1.887 1.887 0 0 1-.034 2.76l-7.583 7.066a4.095 4.095 0 0 1-5.714-.152l-32.918-34.095c-1.537-1.592-1.54-4.162-.002-5.746l33.1-34.092c1.536-1.581 4.11-1.658 5.74-.18l7.655 6.94c.82.743.833 1.952.02 2.708l-21.11 19.659s53.036.129 71.708.064c18.672-.064 33.437-16.973 33.437-34.7 0-7.214-5.578-17.64-5.578-17.64-.498-.99-.273-2.444.483-3.229l8.61-8.94c.764-.794 1.772-.632 2.242.364 0 0 9.212 18.651 9.212 28.562 0 28.035-21.765 50.882-48.533 50.882-26.769 0-70.921.201-70.921.201l20.186 19.568z"/>
                                            <Path d="M144.398 58.435a1.887 1.887 0 0 1 .034-2.76l7.583-7.066a4.095 4.095 0 0 1 5.714.152l32.918 34.095c1.537 1.592 1.54 4.162.002 5.746l-33.1 34.092c-1.536 1.581-4.11 1.658-5.74.18l-7.656-6.94c-.819-.743-.832-1.952-.02-2.708l21.111-19.659s-53.036-.129-71.708-.064c-18.672.064-33.437 16.973-33.437 34.7 0 7.214 5.578 17.64 5.578 17.64.498.99.273 2.444-.483 3.229l-8.61 8.94c-.764.794-1.772.632-2.242-.364 0 0-9.212-18.65-9.212-28.562 0-28.035 21.765-50.882 48.533-50.882 26.769 0 70.921-.201 70.921-.201l-20.186-19.568z"/>
                                        </G>
                                    </Svg>
                                ) : selectedQueque == 3 ? (
                                    <Svg width="36px" height="36px" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" fill="#Fdfdfd">
                                        <G fill-rule="evenodd">
                                            <Path d="M109.533 197.602a1.887 1.887 0 0 1-.034 2.76l-7.583 7.066a4.095 4.095 0 0 1-5.714-.152l-32.918-34.095c-1.537-1.592-1.54-4.162-.002-5.746l33.1-34.092c1.536-1.581 4.11-1.658 5.74-.18l7.655 6.94c.82.743.833 1.952.02 2.708l-21.11 19.659s53.036.129 71.708.064c18.672-.064 33.437-16.973 33.437-34.7 0-7.214-5.578-17.64-5.578-17.64-.498-.99-.273-2.444.483-3.229l8.61-8.94c.764-.794 1.772-.632 2.242.364 0 0 9.212 18.651 9.212 28.562 0 28.035-21.765 50.882-48.533 50.882-26.769 0-70.921.201-70.921.201l20.186 19.568z"/>
                                            <Path d="M144.398 58.435a1.887 1.887 0 0 1 .034-2.76l7.583-7.066a4.095 4.095 0 0 1 5.714.152l32.918 34.095c1.537 1.592 1.54 4.162.002 5.746l-33.1 34.092c-1.536 1.581-4.11 1.658-5.74.18l-7.656-6.94c-.819-.743-.832-1.952-.02-2.708l21.111-19.659s-53.036-.129-71.708-.064c-18.672.064-33.437 16.973-33.437 34.7 0 7.214 5.578 17.64 5.578 17.64.498.99.273 2.444-.483 3.229l-8.61 8.94c-.764.794-1.772.632-2.242-.364 0 0-9.212-18.65-9.212-28.562 0-28.035 21.765-50.882 48.533-50.882 26.769 0 70.921-.201 70.921-.201l-20.186-19.568z"/>
                                            <Path d="M127.992 104.543l6.53.146c1.105.025 2.013.945 2.027 2.037l.398 30.313a1.97 1.97 0 0 0 2.032 1.94l4.104-.103a1.951 1.951 0 0 1 2.01 1.958l.01 4.838a2.015 2.015 0 0 1-1.99 2.024l-21.14.147a1.982 1.982 0 0 1-1.994-1.983l-.002-4.71c0-1.103.897-1.997 1.996-1.997h4.254a2.018 2.018 0 0 0 2.016-1.994l.169-16.966-6.047 5.912-6.118-7.501 11.745-14.061z" stroke="#000"/>
                                        </G>
                                    </Svg>
                                ) : (
                                    <Svg fill="#fdfdfd" width="30px" height="30px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <G data-name="Layer 2">
                                    <G data-name="shuffle">
                                    <Rect width="24" height="24" transform="rotate(180 12 12)" opacity="0"/>
                                    <Path d="M18 9.31a1 1 0 0 0 1 1 1 1 0 0 0 1-1V5a1 1 0 0 0-1-1h-4.3a1 1 0 0 0-1 1 1 1 0 0 0 1 1h1.89L12 10.59 6.16 4.76a1 1 0 0 0-1.41 1.41L10.58 12l-6.29 6.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0L18 7.42z"/>
                                    <Path d="M19 13.68a1 1 0 0 0-1 1v1.91l-2.78-2.79a1 1 0 0 0-1.42 1.42L16.57 18h-1.88a1 1 0 0 0 0 2H19a1 1 0 0 0 1-1.11v-4.21a1 1 0 0 0-1-1z"/>
                                    </G></G>
                                    </Svg>
                                )}
                            </TouchableOpacity>
                        </View>
                        <View style={{flex:1, borderColor: 'black', alignItems: 'center', justifyContent: 'center'}}>
                            <View>
                                {/* onPress={handlePrevPress} */}
                                <TouchableOpacity>
                                    <Svg height="22" width="22" viewBox="0 0 51.531 51.531" style={{transform: [{rotate: '180deg'}]}}>
                                        <Path fill="#F5F5F5" d="M44.9,1.963c-3.662,0-6.631,2.969-6.631,6.631V23.81c-0.285-0.324-0.617-0.609-1-0.831L6,4.926
                                        c-1.238-0.715-2.762-0.715-4,0C0.763,5.64,0,6.961,0,8.39v36.104c0,1.43,0.763,2.75,2,3.465c0.619,0.356,1.311,0.535,2,0.535
                                        c0.691,0,1.381-0.179,2-0.535l31.269-18.053c0.383-0.223,0.715-0.508,1-0.832v13.863c0,3.662,2.969,6.631,6.631,6.631
                                        s6.631-2.969,6.631-6.631V8.594C51.531,4.932,48.562,1.963,44.9,1.963z"/>
                                    </Svg>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{flex:1, borderColor: 'black', alignItems: 'center', justifyContent: 'center'}}>
                        {isPlaying ? (
                            <View>
                                {/* onPress={handlePause} */}
                                <TouchableOpacity>
                                    <Svg xmlns="http://www.w3.org/2000/svg" height="80" viewBox="0 -960 960 960" width="80" fill="#F5F5F5"><Path d="M360-320h80v-320h-80v320Zm160 0h80v-320h-80v320ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></Svg>
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <View>
                                {/* onPress={handlePlay} */}
                                <TouchableOpacity >
                                    <Svg xmlns="http://www.w3.org/2000/svg" height="80" viewBox="0 -960 960 960" width="80" fill="#F5F5F5"><Path d="m380-300 280-180-280-180v360ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></Svg>
                                </TouchableOpacity>
                            </View>
                        )}
                        </View>
                        <View style={{flex:1, borderColor: 'black', alignItems: 'center', justifyContent: 'center'}}>
                            <View>
                                {/* onPress={handleNextPress} */}
                                <TouchableOpacity>
                                    <Svg height="22" width="22" viewBox="0 0 51.531 51.531">
                                        <Path fill="#F5F5F5" d="M44.9,1.963c-3.662,0-6.631,2.969-6.631,6.631V23.81c-0.285-0.324-0.617-0.609-1-0.831L6,4.926
                                        c-1.238-0.715-2.762-0.715-4,0C0.763,5.64,0,6.961,0,8.39v36.104c0,1.43,0.763,2.75,2,3.465c0.619,0.356,1.311,0.535,2,0.535
                                        c0.691,0,1.381-0.179,2-0.535l31.269-18.053c0.383-0.223,0.715-0.508,1-0.832v13.863c0,3.662,2.969,6.631,6.631,6.631
                                        s6.631-2.969,6.631-6.631V8.594C51.531,4.932,48.562,1.963,44.9,1.963z"/>
                                    </Svg>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{flex:1, borderColor: 'black', alignItems: 'center', justifyContent: 'center'}}>
                            <View>
                                <Svg xmlns="http://www.w3.org/2000/svg" height="30" viewBox="0 -960 960 960" width="30" fill="#F5F5F5"><Path d="M120-320v-80h280v80H120Zm0-160v-80h440v80H120Zm0-160v-80h440v80H120Zm520 480v-160H480v-80h160v-160h80v160h160v80H720v160h-80Z"/></Svg>
                            </View>
                        </View>
                    </View>
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    containerStyle: {
      flex: 1,
      width : '100%',

    },
    imageStyle: {
      flex: 1,
      width : '100%',
      resizeMode: 'cover',
    },
    blur: {
      ...StyleSheet.absoluteFillObject,
    },
  });

export default PlayMusicScreen