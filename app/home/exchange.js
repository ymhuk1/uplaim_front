import {RefreshControl, ScrollView, StyleSheet, Text, View} from "react-native";
import React, {useEffect, useState} from "react";
import {ImageBackground} from "expo-image";
import {textPrimaryColor} from "../../components/ColorsComponent";
import Constants from "expo-constants";
import ItemExchangeComponent from "../../components/ItemExchangeComponent";
import * as SecureStore from "expo-secure-store";
import NewButtonComponent from "../../components/NewButtonComponent";
import {router, useLocalSearchParams} from "expo-router";
import InfoModalComponent from "../../components/InfoModalComponent";
import NewTagComponent from "../../components/NewTagComponent";
import { FONTS, SIZES } from "../../constants/theme";

const apiBaseUrl = Constants.expoConfig.extra.API_PROD;


export default function ExchangeScreen() {
    const [refreshing, setRefreshing] = useState(false);
    const [exchanges, setExchanges] = useState([])
    const [activeExchanges, setActiveExchanges] = useState([])
    const [clientId, setClientId] = useState(null)
    const [modalVisible, setModalVisible] = useState(false);
    const [myExchanges, setMyExchanges] = useState(null)
    const [allExchanges, setAllExchanges] = useState(null)
    const [proposedExchanges, setProposedExchanges] = useState(null)
    const [availableTags, setAvailableTags] = useState('Доступные мне')
    const [cityTags, setCityTags] = useState(null)
    const [availableExchanges, setAvailableExchanges] = useState(null)
    const [tagAvailable, setTagAvailable] = useState(true)
    const [tagCity, setTagCity] = useState('Оренбург')
    const [filterExchanges, setFilterExchanges] = useState('available=true&city=Оренбург')

    const { statusExchange, deal } = useLocalSearchParams();

    const clearStatus = () => {
        router.push({ pathname: "/home/exchange", params: { statusExchange: null } });
    };



    useEffect(() => {

        const loadData = async () => {
            try {
                const client = await SecureStore.getItemAsync('clientData');
                if (client) {
                    setClientId(JSON.parse(client).id);
                    await fetchDataFilter(JSON.parse(client).id);

                }
            } catch (error) {
                console.error('Error loading user data:', error);
            } finally {
                setRefreshing(false);
            }
        };

        loadData();
    }, []);

    useEffect(() => {

        if (statusExchange === 'create') {
            setModalVisible(true);
            clearStatus()
        } else if ( statusExchange === 'update') {
            setModalVisible(true);
            clearStatus()
        }
    }, [statusExchange]);





    useEffect(() => {
        setMyExchanges(activeExchanges.filter(item => String(item.holder_id) === String(clientId)));
        setProposedExchanges(exchanges.filter(item => String(item.last_holder_id) === clientId));
        console.log('myExchanges: ', myExchanges && myExchanges.length)
        console.log('activeExchanges: ', activeExchanges && activeExchanges.length)
        console.log('clientId: ', clientId)

        }, [exchanges, clientId, activeExchanges]);


    const fetchData = async () => {
        try {
            // активные сделки
            const exchangesResponse = await fetch(`${apiBaseUrl}/api/exchange/active_exchange`);
            if (!exchangesResponse.ok) {
                throw new Error(`Failed to fetch exchanges. Status: ${exchangesResponse.status}`);
            }
            const exchangesData = await exchangesResponse.json();
            setActiveExchanges(exchangesData.exchange)
            setMyExchanges(exchangesData.exchange.filter(item => String(item.holder_id) === clientId));


            // города
            const cityResponse = await fetch(`${apiBaseUrl}/api/exchange/all_cities`)
            if (!cityResponse.ok) {
                throw new Error(`Failed to fetch city. Status: ${cityResponse.status}`);
            }

            const cityData = await cityResponse.json();
            setCityTags(cityData.cities)

        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setRefreshing(false);
        }
    };

    const fetchDataFilter = async (id) => {
        try {
            const exchangesResponse = await fetch(`${apiBaseUrl}/api/exchange/active_exchange?client_id=${id ? id : clientId}&${filterExchanges}`);
            if (!exchangesResponse.ok) {
                throw new Error(`Failed to fetch available exchanges. Status: ${exchangesResponse.status}`);
            }
            const exchangesData = await exchangesResponse.json();
            setExchanges(exchangesData.exchange)


            const availableExchangesResponse = await fetch(`${apiBaseUrl}/api/exchange/active_exchange?client_id=${id ? id : clientId}&available=true&${tagCity === `Все` ? '' : 'city=' + tagCity}`);
            if (!availableExchangesResponse.ok) {
                throw new Error(`Failed to fetch available exchanges. Status: ${availableExchangesResponse.status}`);
            }
            const availableExchangesData = await availableExchangesResponse.json();
            setAvailableExchanges(availableExchangesData.exchange)

        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setRefreshing(false);
        }
    }

    const onRefresh = () => {
        fetchData();
        setRefreshing(true);
    };

    // @ts-ignore
    useEffect(() => {
        fetchData();
        setRefreshing(true);
    }, [statusExchange, clientId]);

    useEffect(() => {
        fetchDataFilter();
    }, [filterExchanges]);

    useEffect(() => {

        if (exchanges && availableExchanges) {
            const availableIds = new Set(availableExchanges.map(exchange => exchange.id));

            const updatedExchanges = exchanges.map(exchange => ({
                ...exchange,
                available: availableIds.has(exchange.id),
            }));

            setExchanges(updatedExchanges);
        }
    }, [availableExchanges]);

    const handleValueChange = (selectedValue, tagName) => {
        if (tagName === 'availableTags') {
            if (tagCity !== 'Все') {
                setFilterExchanges(`available=${!selectedValue}&city=${tagCity}`)
            } else {
                setFilterExchanges(`available=${!selectedValue}`)
            }
            setTagAvailable(!selectedValue);
        }
        if (tagName === 'cityTags') {
            setTagCity(selectedValue);
            if (tagAvailable) {
                setFilterExchanges(`available=true&city=${selectedValue}`)
            } else {
                setFilterExchanges(`available=false&city=${selectedValue}`)
                // setExchanges()
            }
        }
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
                        <View style={styles.textContainer2}>
                            <Text style={styles.text2}>Биржа скидок</Text>
                        </View>
                        <View>
                            <InfoModalComponent visible={modalVisible} titleText={ statusExchange === 'update' ? 'Сделка изменена' : 'Сделка успешно создана'} titlePrimaryButton={'Хорошо'} onPress={() => setModalVisible(false)} onPressSecondary={() => setModalVisible(false)} />
                        </View>
                        <View style={styles.tagContainer}>
                            <NewTagComponent tag={availableTags} valueOnChange={(selectedValue) => handleValueChange(selectedValue, 'availableTags')}/>
                            <NewTagComponent tag={cityTags} valueOnChange={(selectedValue) => handleValueChange(selectedValue, 'cityTags')}/>

                        </View>
                        {exchanges && exchanges.length === 0 ? (
                            <View>
                                <Text style={styles.text2}>У вас нет доступных сделок</Text>
                            </View>
                        ) : (
                            <View>
                                {/*{myExchanges && myExchanges.length !==0 && (*/}
                                {/*    <View>*/}
                                {/*        <View style={styles.containerExchanges}>*/}
                                {/*            <Text style={styles.text2}>Мои сделки</Text>*/}
                                {/*        </View>*/}
                                {/*        <ItemExchangeComponent exchanges={activeExchanges} apiBaseUrl={apiBaseUrl}  clientId={clientId} myDeals={true} />*/}
                                {/*    </View>*/}
                                {/*)}*/}
                                {proposedExchanges.length !== 0 && (
                                    <View>
                                        <View style={styles.containerExchanges}>
                                            <Text style={styles.text2}>Встречные сделки</Text>
                                        </View>
                                        <ItemExchangeComponent exchanges={exchanges} apiBaseUrl={apiBaseUrl}  clientId={clientId} proposedDeals={true} />
                                    </View>
                                )}
                                {exchanges && exchanges.length !== 0 &&  (
                                    <View>
                                        <View style={styles.containerExchanges}>
                                            <Text style={styles.text2}>Все сделки</Text>
                                        </View>
                                        <ItemExchangeComponent exchanges={exchanges} apiBaseUrl={apiBaseUrl} clientId={clientId} allDeals={true} />
                                    </View>
                                )}
                            </View>
                        )}
                    </View>
                </ImageBackground>
            </ScrollView>
            <View style={styles.button}>
                <NewButtonComponent title={'Создать новую сделку'} filled={true} height={48} fontSize={18} onPress={() => router.push('/secondary/newExchange')}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {

    },
    containerView: {
        marginHorizontal: 15,
        marginBottom: 160,
        marginTop: 60,
        minHeight: 680,
    },
    textContainer2: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    text2: {
        fontFamily: FONTS.medium,
        fontSize: SIZES.xLarge,
        color: textPrimaryColor,
    },

    containerExchanges: {
        marginVertical: 10,
    },
//     tags
    tagContainer: {
        flexDirection: "row",
        marginVertical: 15,
    },
    tagContainerText: {
    },
    tagText: {
        borderRadius: 4,
        paddingVertical: 3,
        paddingHorizontal: 10,
        backgroundColor: "#9A95B2",
        marginRight: 10,
    },
//      end tags
    button: {
        position: "absolute",
        bottom: 80,
        width: '93%' ,
        marginHorizontal: 15,
    },
})