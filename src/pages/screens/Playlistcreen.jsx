import { View, Text, SafeAreaView, Image, ScrollView } from 'react-native';
import React, { useState } from 'react';
import {Svg, Path} from 'react-native-svg';
import PlaylistChip from '../../components/PlaylistChip';
import PlaylistArtistALbumList from '../../components/PlaylistArtistALbumList';

const Playlistcreen = () => {

  return (
    <SafeAreaView style={{backgroundColor: '#0d0d0d',flex: 1}}>
      <View style={{height: 170, width: '100%'}}>
        <View style={{flex: 1, width: '100%', flexDirection: 'row',alignItems: 'center'}}>
          <View style={{paddingHorizontal: 15}}>
            <Image source={require('../../assets/images/test.jpg')} style={{height: 45, width: 45, borderRadius: 50}} />
          </View>
          <View>
            <Text style={{fontFamily: 'Poppins-Bold', color: '#fdfdfd', fontSize: 18}}>Your Playlist</Text>
          </View>
          <View style={{flex: 1, justifyContent: 'flex-end', alignItems: 'center', flexDirection: 'row', paddingRight: 20, gap: 20}}>
            <View style={{ height: 40, width: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 50,}}>
                <Svg height="30" viewBox="0 -960 960 960" width="30" fill="#f2f2f2"><Path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/></Svg>
            </View>
            <View style={{ height: 40, width: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 50}}>
              <Svg xmlns="http://www.w3.org/2000/svg" height="30" viewBox="0 -960 960 960" width="30" fill="#fdfdfd"><Path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></Svg>
            </View>
          </View>
        </View>
        <View horizontal={true} style={{height: 40, width: '100%', flexDirection: 'row', paddingHorizontal: 10, marginBottom: 20}}>
          <ScrollView horizontal={true}>
            <PlaylistChip title="Playlist" />
            <PlaylistChip title="Artist" />
            <PlaylistChip title="Album" />
          </ScrollView>
        </View>
        <View style={{height: 5, width: '100%', backgroundColor: '#000'}}></View>
      </View>
      <ScrollView style={{flex: 1, paddingVertical: 10}}>
        <PlaylistArtistALbumList />
        <PlaylistArtistALbumList />
        <PlaylistArtistALbumList />
        <PlaylistArtistALbumList />
        <PlaylistArtistALbumList />
        <PlaylistArtistALbumList />
        <PlaylistArtistALbumList />
        <PlaylistArtistALbumList />
        <PlaylistArtistALbumList />
        <PlaylistArtistALbumList />
        <PlaylistArtistALbumList />
        <PlaylistArtistALbumList />
        <PlaylistArtistALbumList />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Playlistcreen;