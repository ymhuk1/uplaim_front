import {RefreshControl, ScrollView, StyleSheet, View} from "react-native";
import HeaderComponent from "../../components/HeaderComponent";
import React, {useState} from "react";
import {ImageBackground} from "expo-image";


export default function TariffPrivilege() {
    const [textValue, setTextValue] = useState('Тариф');
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = () => {
        setRefreshing(true);
    };

    return (
        <View>
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}/>}
                style={styles.container} showsVerticalScrollIndicator={false}>
                <ImageBackground
                    source={require('../../assets/background.png')}
                    contentFit={"cover"}>
                    <View style={styles.containerView}>
                        <HeaderComponent text={textValue} secondary={true}/>
                    </View>
                </ImageBackground>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {},
    containerView: {
        height: 840,
    },
})