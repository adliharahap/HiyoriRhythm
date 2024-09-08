import { useNavigation } from "@react-navigation/native";
import React  from "react";
import { View, TouchableWithoutFeedback, Text, StyleSheet } from "react-native";
import { Svg, Path } from "react-native-svg";


const HeaderMusic = ({album}) => {
    const navigation = useNavigation();

    return (
        <View style={{height: 130, width: '100%', position: 'absolute', zIndex: 10, top: 0, overflow: 'hidden'}}>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: "center"}}>
                <View style={{flex: 1, alignItems: 'flex-start', justifyContent: 'flex-end'}}>
                    <View style={{justifyContent: 'center', alignItems: 'center', height: '100%', width:70}}>
                        <TouchableWithoutFeedback onPress={() => {navigation.goBack()}}>
                            <Svg xmlns="http://www.w3.org/2000/svg" height="32" viewBox="0 -960 960 960" width="32" fill="white" style={{transform: [{rotate: '90deg'}]}}><Path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"/></Svg>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'flex-end'}}>
                    <View style={{ flexDirection: 'row', gap: 10, justifyContent: "center", alignItems: "center"}}>
                        <Text numberOfLines={1} ellipsizeMode="tail" style={{fontFamily: 'Montserrat-SemiBold', fontSize: 18, color: '#ffffff'}}>{album}</Text>
                    </View>
                </View>
                <View style={{flex: 1, alignItems: 'flex-end', justifyContent: 'flex-end'}}>
                    <View style={{justifyContent: 'center', alignItems: 'center', height: '100%', width:70}}>
                        <Svg xmlns="http://www.w3.org/2000/svg" height="22" viewBox="0 -960 960 960" width="22" fill="white"><Path d="M720-80q-50 0-85-35t-35-85q0-7 1-14.5t3-13.5L322-392q-17 15-38 23.5t-44 8.5q-50 0-85-35t-35-85q0-50 35-85t85-35q23 0 44 8.5t38 23.5l282-164q-2-6-3-13.5t-1-14.5q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35q-23 0-44-8.5T638-672L356-508q2 6 3 13.5t1 14.5q0 7-1 14.5t-3 13.5l282 164q17-15 38-23.5t44-8.5q50 0 85 35t35 85q0 50-35 85t-85 35Zm0-640q17 0 28.5-11.5T760-760q0-17-11.5-28.5T720-800q-17 0-28.5 11.5T680-760q0 17 11.5 28.5T720-720ZM240-440q17 0 28.5-11.5T280-480q0-17-11.5-28.5T240-520q-17 0-28.5 11.5T200-480q0 17 11.5 28.5T240-440Zm480 280q17 0 28.5-11.5T760-200q0-17-11.5-28.5T720-240q-17 0-28.5 11.5T680-200q0 17 11.5 28.5T720-160Zm0-600ZM240-480Zm480 280Z"/></Svg>
                    </View>
                </View>
            </View>
        </View>
    );
};
export default HeaderMusic;