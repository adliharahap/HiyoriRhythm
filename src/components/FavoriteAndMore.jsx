import { Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Svg, Path } from 'react-native-svg';
import { useSelector } from 'react-redux';
import { selectTrackArtist, selectTrackTitle, selectTrackUrl } from '../redux/slices/trackSlice';
import { isSongFavorite, toggleFavoriteSong } from '../utils/PlaylistDatahandler/toggleFavoriteSong';

const FavoriteAndMore = () => {
    const title = useSelector(selectTrackTitle);
    const artist = useSelector(selectTrackArtist);
    const url = useSelector(selectTrackUrl);
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        checkIfFavorite();
    }, [url]);

    const checkIfFavorite = async () => {
        const result = await isSongFavorite(url);
        setIsFavorite(result);
    };
    

    const toggleFavoriteMusic = async() => {
        const generateUniqueId = () => {
            return Date.now();
        };

        const songData = {
            id: generateUniqueId(), // ID unik
            title: title,
            artist: artist,
            path: url,
        };

        try {
            await toggleFavoriteSong(songData);
            await checkIfFavorite();
        } catch (error) {
            console.log('Gagal Menyimpan ke Music : ', error);
        }
    }
    
    return (
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-start'}}>
                <View style={{marginLeft: 20}}>
                    <Svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="#FFFFFF"><Path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z"/></Svg>
                </View>
            </View>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-end'}}>
                <TouchableOpacity onPress={toggleFavoriteMusic}>
                    <View style={{marginRight: 20}}>
                        {isFavorite ? (
                            <Svg width="24" height="24" viewBox="0 0 48 48" version="1" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 48 48">
                                <Path fill="#F44336" d="M34,9c-4.2,0-7.9,2.1-10,5.4C21.9,11.1,18.2,9,14,9C7.4,9,2,14.4,2,21c0,11.9,22,24,22,24s22-12,22-24 C46,14.4,40.6,9,34,9z"/>
                            </Svg>
                        ) : (
                            <Svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="#FFFFFF"><Path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z" fill="#fff"/></Svg>
                        )}
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default FavoriteAndMore;