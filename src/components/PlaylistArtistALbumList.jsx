import { View, Text, Image, TouchableHighlight } from 'react-native'
import React from 'react'

const PlaylistArtistALbumList = () => {
    return (
        <TouchableHighlight>
            <View style={{height: 120, width: '100%', flexDirection: 'row'}}>
                <View style={{width: 110, justifyContent: 'center', alignItems: 'center'}}>
                    <Image source={require('../assets/images/test.jpg')} style={{height: 80, width: 80}} />
                </View>
                <View style={{flex: 1, justifyContent: 'center'}}>
                    <Text numberOfLines={1} ellipsizeMode="tail" style={{fontFamily: 'Poppins-Medium', fontSize: 22, color: "#Fdfdfd"}}>Liked Songs</Text>
                    <Text numberOfLines={1} ellipsizeMode="tail" style={{fontFamily: 'Poppins-Regular', fontSize: 16, color: '#cdcdcd'}}>Playlist • 123 Music</Text>
                </View>
            </View>
        </TouchableHighlight>
    )
}

export default PlaylistArtistALbumList