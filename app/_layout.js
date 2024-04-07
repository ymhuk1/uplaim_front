import {router, Stack} from "expo-router";
import * as SecureStore from "expo-secure-store";
import {useEffect} from "react";
import {Text} from "react-native";

export default () => {

    useEffect(() => {
        checkSecureStoreData();
    }, []);

    const checkSecureStoreData = async () => {
        try {
            const savedUserData = await SecureStore.getItemAsync('userData');
            if (savedUserData) {
                const userData = JSON.parse(savedUserData);
                // router.push('login');

                router.push('enterPass', { userData });
            } else {
                router.push('login');
            }
        } catch (error) {
            handleErrors(error, console.error);
        }
    };

    return <Stack
        screenOptions={{
            headerShown: false
        }}/>;
};