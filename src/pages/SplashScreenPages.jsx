import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  Easing
} from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { check, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAudioFiles } from 'react-native-audio-files';
import { setAudioFiles } from '../redux/slices/audioSlice';
import { createTables } from '../utils/database_handler/connect_db';

const SplashScreenPages = () => {
    const navigation = useNavigation();
    let mappingFinished = false;

    const dispatch = useDispatch();

    const fetchData = async () => {
        try {
            setTimeout(() => {
                checkPermissionsAndNavigate();
            }, 1500);
        } catch (error) {

        }
    };

    useEffect(() => {
        fetchData();
    }, [])

    const checkPermissionsAndNavigate = async () => {
        // Periksa status Onboarding dari penyimpanan lokal
        const onboardingStatus = await AsyncStorage.getItem('onboardingStatus');

        if (onboardingStatus === 'done') {
            // Onboarding sudah dilakukan, periksa izin dan arahkan ke HomeScreen
            const readPermission = await check(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
            const writePermission = await check(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);

            if (readPermission === RESULTS.GRANTED && writePermission === RESULTS.GRANTED) {

                try {
                    const getAudioFiles = async () => {
                        try {
                            const result = await fetchAudioFiles();
                            dispatch(setAudioFiles(result));
                            
                        } catch (error) {
                            console.log('Error fetching audio files:', error);
                            // Tangani kesalahan jika perlu
                        }
                    };
                    await getAudioFiles();
                    createTables();
                    mappingFinished = true;

                    if (mappingFinished) {
                        setTimeout(() => {
                            navigation.replace('MainScreen');
                        }, 2000);
                    }
                } catch (error) {
                    console.log(error);
                }
            } else {
                if(readPermission === RESULTS.DENIED && writePermission === RESULTS.DENIED) {
                    navigation.replace('AksesDenied');
                }else if(readPermission === RESULTS.BLOCKED && writePermission === RESULTS.BLOCKED) {
                    navigation.replace('AksesDenied');
                }
            }
        } else {
            // Onboarding belum dilakukan, arahkan ke OnboardingScreen
            navigation.replace('Onboarding');
        }
    };

    return (
        <View style={styles.container}>
            <AnimatedImage />
            <BouncingText />
        </View>
    );
};

const BouncingText = () => {
    const translateX = useSharedValue(-400); // Mulai dari kanan layar
    const opacity = useSharedValue(0);

    useEffect(() => {
      // Jalankan animasi setelah komponen dipasang
        translateX.value = withSpring(0, {
            damping: 8,
            stiffness: 80,
            mass: 1,
        });
        opacity.value = withTiming(1, { duration: 500 });
    }, []);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: translateX.value }],
            opacity: opacity.value,
            fontFamily: 'Montserrat-Bold',
            fontSize: 28,
            color: '#fff'
        };
    });

    return (
        <Animated.Text style={[styles.text, animatedStyle,]}>
            Hiyori Rhythm
        </Animated.Text>
    );
};

const AnimatedImage = () => {
    const translateY = useSharedValue(600);
    const opacity = useSharedValue(0);
    const rotate = useSharedValue(0);
    const scale = useSharedValue(0);

    useEffect(() => {
        // Jalankan animasi setelah komponen dipasang
        translateY.value = withSpring(0, {
            damping: 8,
            stiffness: 80,
            mass: 1,
        });
        opacity.value = withTiming(1, { duration: 500, easing: Easing.inOut });
        rotate.value = withTiming(360, { duration: 4000, easing: Easing.bounce }, () => {
            rotate.value = 0; // Reset rotasi setelah animasi selesai
        });
    }, []);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateY: translateY.value },
                { rotate: `${rotate.value}deg` },
            ],
            opacity: opacity.value,
        };
    });

    return (
        <Animated.View style={[animatedStyle]}>
            <Image style={{height: 100, width: 100, borderRadius: 30}} source={require('../assets/images/Picsart_24-08-17_22-50-23-244.jpg')} />
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000112',
        gap: 50
    },
});

export default SplashScreenPages;