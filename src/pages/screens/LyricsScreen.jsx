import React, { useEffect, useRef, useState } from 'react';
import { View, ScrollView, Alert, Text, TouchableHighlight } from 'react-native';
import AdvancedLyricDisplay from '../../components/AdvancedLyricDisplay';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import { useSelector } from 'react-redux';
import { selectTrackTitle } from '../../redux/slices/trackSlice';
import { useProgress } from 'react-native-track-player';
import LyricDisplay from '../../components/LyricDisplay';

const LyricsScreen = () => {
    const [lyricHas, setIsLyricHas] = useState(false);
    const [delay, setDelay] = useState(false);
    const scrollViewRef = useRef(null); // Buat referensi untuk ScrollView
    const title = useSelector(selectTrackTitle);
    const { position } = useProgress();
    const lyrics = useSelector((state) => state.lyric.lyric);

    useEffect(() => {
        checkIfFileExists(`${title}.lrc`);
    }, [title]);

    const importLrcFile = async (songTitle) => {
        try {
            const result = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles],
            });
            const { uri, name } = result[0];
            const fileExtension = name.split('.').pop();
            const newFileName = `${songTitle}.lrc`;
            const appFolderPath = `${RNFS.ExternalDirectoryPath}/Lyrics`;

            if (fileExtension.toLowerCase() !== 'lrc') {
                Alert.alert('Sorry', 'This is not a lyrics file. Please select a .lrc file.');
                return;
            }

            await RNFS.mkdir(appFolderPath);
            await RNFS.copyFile(uri, `${appFolderPath}/${newFileName}`);

            Alert.alert('Success', `File imported and saved as ${newFileName}`);
            setIsLyricHas(true);
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                Alert.alert('Cancelled', 'User cancelled file picker');
            } else {
                Alert.alert('Error', `Error occurred: ${err.message}`);
            }
        }
    };

    const checkIfFileExists = async (fileName) => {
        try {
            const folderPath = `${RNFS.ExternalDirectoryPath}/Lyrics`;
            const filePath = `${folderPath}/${fileName}`;

            const folderExists = await RNFS.exists(folderPath);
            if (!folderExists) {
                setIsLyricHas(false);
                return;
            }

            const fileExists = await RNFS.exists(filePath);
            setIsLyricHas(fileExists);
        } catch (error) {
            console.error('Error checking file existence:', error);
            setIsLyricHas(false);
        }
    };

    const handleScrollToLyric = (position) => {
        // Menggunakan scrollViewRef untuk memindahkan scroll
        scrollViewRef.current?.scrollTo({ y: position, animated: true });
    };

    const scrollToActiveLyric = (currentPosition) => {
        const currentLyricIndex = lyrics.findIndex(lyric => lyric.time > currentPosition) - 1;
        if (currentLyricIndex >= 0 && scrollViewRef.current) {
            const yOffset = currentLyricIndex * 36; // Asumsi tinggi setiap lirik adalah 40 (sesuaikan jika perlu)
            scrollViewRef.current.scrollTo({ y: yOffset, animated: true });

            // Memanggil fungsi dari props untuk scroll eksternal
            if (handleScrollToLyric) {
                handleScrollToLyric(yOffset);
            }
        }
    };

    useEffect(() => {
        if (delay) {
            setTimeout(() => {
                setDelay(false);
            }, 4000);
        }else if(lyricHas && !delay) {
            scrollToActiveLyric(position);
        }
    }, [position, lyrics]);

    const setDelayOnScroll = () => {
        setDelay(true);
    }

    return (
        <View style={{ flex: 1 }}>
            <ScrollView ref={scrollViewRef} style={{ flex: 1, position: 'relative' }} onScroll={setDelayOnScroll} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                {lyricHas ? (
                    <AdvancedLyricDisplay
                        lrcFilePath={`${RNFS.ExternalDirectoryPath}/Lyrics/${title}.lrc`}
                    />
                ) : (
                    <View style={{ height: 600, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontFamily: 'Roboto-Medium', fontSize: 22, color: '#fdfdfd', marginBottom: 40 }}>
                            Lyrics Not Found...
                        </Text>
                        <View style={{ flexDirection: 'row', gap: 20 }}>
                            <TouchableHighlight underlayColor="rgba(34,34,34,0.6)" onPress={() => importLrcFile(title)}>
                                <View style={{ backgroundColor: 'rgba(0,0,0,0.4)', borderRadius: 5, padding: 13 }}>
                                    <Text style={{ fontFamily: 'Roboto-Regular', fontSize: 12, color: '#fdfdfd' }}>
                                        Import Lrc
                                    </Text>
                                </View>
                            </TouchableHighlight>
                            <TouchableHighlight underlayColor="rgba(34,34,34,0.6)">
                                <View style={{ backgroundColor: 'rgba(0,0,0,0.4)', borderRadius: 5, padding: 13 }}>
                                    <Text style={{ fontFamily: 'Roboto-Regular', fontSize: 12, color: '#fdfdfd' }}>
                                        Search Online
                                    </Text>
                                </View>
                            </TouchableHighlight>
                        </View>
                    </View>
                )}
            </ScrollView>
        </View>
    );
};

export default LyricsScreen;
