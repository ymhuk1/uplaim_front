import * as SecureStore from "expo-secure-store";
import {router} from "expo-router";


export const getBallsText = (clientBalls) => {
    const lastTwoDigits = clientBalls % 100;
    if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
        return 'баллов';
    }
    const lastDigit = clientBalls % 10;
    if (lastDigit === 1) {
        return 'балл';
    } else if (lastDigit >= 2 && lastDigit <= 4) {
        return 'балла';
    } else {
        return 'баллов';
    }
};

export const handleLogout = async () => {
    try {
        await SecureStore.deleteItemAsync('userData');
        await SecureStore.deleteItemAsync('token');
        await SecureStore.deleteItemAsync('clientData');

        router.replace('login');
    } catch (error) {
        console.error('Ошибка при выходе:', error.message);
    }
};
