import {RefreshControl, ScrollView, StyleSheet, Text, View} from "react-native";
import HeaderComponent from "../../components/HeaderComponent";
import React, {useEffect, useState} from "react";
import {ImageBackground, Image} from "expo-image";
import {elemBackgroundColor, textPrimaryColor} from "../../components/ColorsComponent";
import {useGlobalSearchParams} from "expo-router";
import Constants from "expo-constants";

const apiBaseUrl = Constants.expoConfig.extra.API_PROD;

export default function NewsCompany() {
    const [textValue, setTextValue] = useState('Новости');
    const [refreshing, setRefreshing] = useState(false);
    const [newsData, setNewsData] = useState(null)
    const [companyData, setCompanyData] = useState(null)
    const {id} = useGlobalSearchParams()
    const companyId = id

    const fetchData = () => {
        fetch(`${apiBaseUrl}/api/companies/${companyId}`)
            .then((response) => response.json())
            .then((data) => {
                const {company} = data;
                console.log('Данные успешно получены:', data.company.news);
                setCompanyData(data.company)
                setNewsData(data.company.news)
                setRefreshing(false);
            })
            .catch((error) => {
                console.error('Ошибка при загрузке данных: ', error);
                setRefreshing(false);
            });
    }
    const onRefresh = () => {
        setRefreshing(true);
        fetchData()
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
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
                    {newsData && newsData.map((item) => (
                        <View style={styles.containerNews}>
                            <View style={styles.containerNewsTop}>
                                <Image
                                    contentFit="contain"
                                    contentPosition="center"
                                    transition={1000}
                                    source={ apiBaseUrl + companyData.main_photo}
                                    width={74}
                                    height={74}
                                    style={styles.logoNews}/>
                                <View style={styles.nameNews}>
                                    <Text style={styles.nameTextNews}>{companyData.name}</Text>
                                    {/*tag*/}
                                </View>
                            </View>
                            <Image
                                contentFit="cover"
                                contentPosition="center"
                                transition={1000}
                                source={ apiBaseUrl + item.photo }
                                // width={40}
                                // height={40}
                                style={styles.imageNews}
                            />
                            <Text style={styles.headerNews}>{item.name}</Text>
                            <Text style={styles.descriptionNews}>{item.description}</Text>
                        </View>
                        ))}

                </View>
            </ImageBackground>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {},
    containerView: {
        height: 860,
        marginHorizontal: 15,
    },
    containerNews: {
        marginTop: 10,
        minHeight: 200,
        backgroundColor: elemBackgroundColor,
        borderRadius: 12,
        padding: 15,
        marginBottom: 20,
    },
    containerNewsTop: {
        flexDirection: "row",
        alignItems: "center",
    },
    logoNews: {
        marginRight: 15,
        borderRadius: 12,
    },
    nameNews: {

    },
    nameTextNews: {
        color: textPrimaryColor,
        fontSize: 24,
        fontWeight: "bold",
    },
    imageNews: {
        marginVertical: 15,
        height: 180,
        width: "100%",
        borderRadius: 12,
    },
    headerNews: {
        color: textPrimaryColor,
        fontSize: 18,
        fontWeight: "bold",
    },
    descriptionNews: {
        color: textPrimaryColor,
        fontSize: 14,
    },
})