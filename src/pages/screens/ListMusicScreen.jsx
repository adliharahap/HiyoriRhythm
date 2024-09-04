import { View, ScrollView, FlatList, TouchableHighlight, StyleSheet, Animated, TouchableOpacity, Button} from 'react-native';
import React, {useEffect, useState, useRef} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Svg, Path} from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient';
import RecentlyPlayedMusic from '../../components/RecentlyPlayedMusic';
import MusicCountAndSort from '../../components/MusicCountAndSort';
import { useDispatch, useSelector } from 'react-redux';
import MusicList from '../../components/MusicList';
import BackgroundImageMusicRecently from '../../components/BackgroundImageMusicRecently';
import TrackPlayer from 'react-native-track-player';
import { useNavigation } from '@react-navigation/native';
import { setSortingEnd } from '../../redux/slices/modalSlice';
import { setShuffledArray } from '../../redux/slices/audioSlice';

const ListMusicScreen = () => {
    const [isFloatBtnHidden, setBtnHidden] = useState(false);
    const [autotophide, setautotophide] = useState(0);
    const navigation = useNavigation();

    const slideAnim = useRef(new Animated.Value(0)).current;
    const scrollViewRef = useRef();

    const audioFiles = useSelector((state) => state.audio.files);
    const sortBy = useSelector((state) => state.audio.sortBy);
    const sortOrder = useSelector((state) => state.audio.sortOrder);
    const runSortingOrNot = useSelector((state) => state.modal.runSorting);
    const isMusicControllerShow = useSelector((state) => state.audio.playFirst);
    const dispatch = useDispatch();

    const sortedFiles = [...audioFiles].sort((a, b) => {
        let valueA, valueB;
    
        switch (sortBy) {
            case 'title':
                valueA = a.title?.toString().toLowerCase() || '';
                valueB = b.title?.toString().toLowerCase() || '';
                break;
            case 'artist':
                valueA = a.artist?.toString().toLowerCase() || '';
                valueB = b.artist?.toString().toLowerCase() || '';
                break;
            case 'album':
                valueA = a.album?.toString().toLowerCase() || '';
                valueB = b.album?.toString().toLowerCase() || '';
                break;
            case 'duration':
                valueA = a.duration || 0;
                valueB = b.duration || 0;
                break;
            case 'size':
                valueA = parseFloat(a[sortBy]) || 0;
                valueB = parseFloat(b[sortBy]) || 0;
                // valueA = a.size || 0;
                // valueB = b.size || 0;
                break;
            case 'addedDate':
                valueA = new Date(a.addedDate * 1000).getTime();
                valueB = new Date(b.addedDate * 1000).getTime();
                break;
            default:
                valueA = '';
                valueB = '';
                break;
        }
    
        if (valueA < valueB) {
            return sortOrder === 'asc' ? -1 : 1;
        }
        if (valueA > valueB) {
            return sortOrder === 'asc' ? 1 : -1;
        }
        return 0; // mereka sama
    });

    const updateTrackPlayer = async () => {
        try {
            const newTrackQueue = sortedFiles.map((file, index) => ({
                id: index,
                url: file.audioUrl,
                title: file.title,
                artist: file.artist,
                album: file.album,
                date: new Date(file.addedDate * 1000).toISOString().slice(0, 19).replace('T', ' '),
                artwork: file.imageUrl,
                duration: file.duration / 1000,
                // Add other track details here
            }));

            await TrackPlayer.reset();
            
            await TrackPlayer.add(newTrackQueue);

            const shuffleArray = (length) => {
                const array = Array.from({ length }, (_, index) => index);
                return array.sort(() => Math.random() - 0.5);
            };

            const shuffledArray = shuffleArray(newTrackQueue.length);

            dispatch(setShuffledArray(shuffledArray));
            dispatch(setSortingEnd());

        } catch (error) {
            console.log('Error updating TrackPlayer:', error);
        }
    };

    useEffect(() => {
        if (runSortingOrNot) {
            updateTrackPlayer();
        }
    }, [runSortingOrNot]);

    const handleAutoTop = () => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({ y: 0, animated: true });
        }
    };

    const handleScrollFltBTN = (event) => {
        const { y } = event.nativeEvent.contentOffset;
        setautotophide(1);
        // Jika posisi scroll mencapai y = 0, sembunyikan komponen
        if (y <= 150) {
            hideButton();
        } else {
            showButton();
        }
    };

    const showButton = () => {
        if (isFloatBtnHidden) {
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }).start();
        
            setBtnHidden(false);
        }
    };
    
    const hideButton = () => {
        if (!isFloatBtnHidden) {
            Animated.timing(slideAnim, {  
                toValue: 100,
                duration: 500,
                useNativeDriver: true,
            }).start();
    
            setBtnHidden(true);
        }
    };
    
    const slideStyle = {
        transform: [
            {
                translateX: slideAnim.interpolate({
                    inputRange: [0, 500],
                    outputRange: [0, 500],
                }),
            },
        ],
    };

    const style = StyleSheet.create({
        floatingButton: {
            position: 'absolute',
            height: 35,
            width: 35,
            backgroundColor: 'rgba(60, 19, 97,0.8)',
            borderRadius: 50,
            bottom: isMusicControllerShow ? 150 : 110,
            right: 35,
            zIndex: 999,
            opacity: autotophide,
        },
    });

    const renderItem = ({ item, index }) => {

        return (
            <TouchableHighlight underlayColor="rgba(34,34,34,0.6)"  onPress={() => {
                
                navigation.navigate('MusicPlay', { MusicId: index})
                }}>
                <MusicList
                    id={index}
                    img={item.imageUrl} 
                    title={item.title} 
                    artist={item.artist} 
                    album={item.album} 
                    duration={item.duration} 
                    path={item.audioUrl} 
                    filedate={item.addedDate} 
                    filesize={item.size}
                />
            </TouchableHighlight>
        );
    };

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#0d0d0d'}}>
            <Animated.View style={[style.floatingButton, slideStyle]}>
                <TouchableOpacity onPress={handleAutoTop} style={{flex: 1}}>
                    <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                        <Svg xmlns="http://www.w3.org/2000/svg" style={{transform: [{rotate: '-90deg'}]}} height="24" viewBox="0 -960 960 960" width="24" fill={"white"}><Path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"/></Svg>
                    </View>
                </TouchableOpacity>
            </Animated.View>
            <ScrollView style={{flex: 1}} scrollEventThrottle={16} ref={scrollViewRef} onScroll={handleScrollFltBTN}>
                <View style={{minHeight: '100%', justifyContent: 'flex-end', alignItems: 'center', position: 'relative'}}>
                    <BackgroundImageMusicRecently />
                    <View style={{minHeight: 500, marginTop: 300, width: '100%', width: '100%', position: 'relative'}}>
                        <SVGBackground />
                        <RecentlyPlayedMusic />
                        <LinearGradient colors={['#2c1a4d', '#0d0d0d']} style={{width: '100%', height: 150}} start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} locations={[0, 0.9]}>
                            <View style={{flex: 1, width: '100%', justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 5}}>
                                <MusicCountAndSort allmusic={audioFiles.length} />
                            </View>
                        </LinearGradient>
                        {/* Tempat List Music */}
                        <View style={{flex: 1, width: '100%', paddingBottom: 150}}>
                            {/* <NoMusic /> */}
                            <FlatList
                                scrollEnabled={false}
                                data={sortedFiles}
                                renderItem={renderItem}
                                keyExtractor={(item, index) => index.toString()}
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const SVGBackground = () => {
    return (
        <View style={{width: '100%', position: 'absolute', top: -120}}>
            <Svg width="100%" height="150px" viewBox="0 0 1440 590">
                <Path
                    d="M 0,600 L 0,300 C 144.71428571428572,338.6607142857143 289.42857142857144,377.32142857142856 422,382 C 554.5714285714286,386.67857142857144 675.0000000000001,357.375 773,309 C 870.9999999999999,260.625 946.5714285714287,193.17857142857144 1054,151 C 1161.4285714285713,108.82142857142857 1300.7142857142858,91.91071428571428 1440,75 L 1440,600 L 0,600 Z"
                    fill="#2c1a4d"
                />
            </Svg>
        </View>
    );
};

export default ListMusicScreen;