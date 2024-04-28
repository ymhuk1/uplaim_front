import Constants from "expo-constants";
import React, {useEffect, useLayoutEffect, useState} from "react";
import {RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import HeaderComponent from "../../components/HeaderComponent";
import {Image, ImageBackground} from "expo-image";
import * as SecureStore from "expo-secure-store";
import {useGlobalSearchParams} from "expo-router";
import NewButtonComponent from "../../components/NewButtonComponent";
import NewTagComponent from "../../components/NewTagComponent";
import {getBallsText} from "../../components/utils/utils";
import {textColor3, textPrimaryColor} from "../../components/ColorsComponent";
import CreateExchangeModalComponent from "../../components/CreateExchangeModalComponent";
import { FONTS, SIZES } from "../../constants/theme";


const apiBaseUrl = Constants.expoConfig.extra.API_PROD;


export default function NewCreateExchangeScreen() {
    const { deal, existTypeDeal, existCompanyId, existCompanyTaker, existCategoryTaker, existCompanyOrCategory  } = useGlobalSearchParams()

    const [textValue, setTextValue] = useState('Создание сделки');
    const [refreshing, setRefreshing] = useState(false);
    const [token, setToken] = useState(null);
    const [ballsData, setBallsData] = useState([]);
    const [companiesData, setCompaniesData] = useState([]);
    const [categoriesData, setCategoriesData] = useState([])

    const [selectedItem, setSelectedItem] = useState((deal === 'edit' || deal === 'offer') ? existCompanyId : null);
    const [companyId, setCompanyId] = useState((deal === 'edit' || deal === 'offer') ? existCompanyId : null);
    const [selectedTakerItems, setSelectedTakerItems] = useState([]);
    const [hideOtherItems, setHideOtherItems] = useState(false);
    const [hideOtherItemsTaker, setHideOtherItemsTaker] = useState(false);

    const [typeDeal, setTypeDeal] = useState('exchange');
    const [modalVisible, setModalVisible] = useState(false);
    const [cityTags, setCityTags] = useState(null)


    const [categoryTags, setCategoryTags] = useState(null)
    const [selectBallsTag, setSelectBallsTag] = useState([{"name": "Баллы в компании"}, {"name": "Баллы в категории"}])
    const [companyOrCategory, setCompanyOrCategory] = useState(null)
    const [selectVariantTag, setSelectVariantTag] = useState('Несколько вариантов')
    const [filterExchanges, setFilterExchanges] = useState('city=Оренбург')
    const [myTagsCity, setMyTagsCity] = useState('Оренбург')
    const [myTagsCategory, setMyTagsCategory] = useState('Все')

    const [takerFilterExchanges, setTakerFilterExchanges] = useState('city=Оренбург')
    const [takerTagsCity, setTakerTagsCity] = useState('Оренбург')
    const [takerTagsCategory, setTakerTagsCategory] = useState('Все')


    const openFullScreen = () => setModalVisible(true);
    const closeFullScreen = () => setModalVisible(false);

    const onRefresh = () => {
        setRefreshing(true);
        fetchData();

    };

    useEffect(() => {
        setRefreshing(true);
        fetchData();
        if (deal === 'edit') {

            setTextValue('Редактирование сделки')
            openFullScreen()
            setTypeDeal(existTypeDeal)
            setCompanyOrCategory(existCompanyOrCategory)
            const parsedCompanyTaker = existCompanyTaker ? JSON.parse(existCompanyTaker) : JSON.parse(existCategoryTaker);
            const parsedCompanyTakerCategory = existCategoryTaker ? JSON.parse(existCategoryTaker) : JSON.parse(existCompanyTaker);

            if (parsedCompanyTakerCategory > parsedCompanyTaker) {
                setSelectedTakerItems(Array.isArray(parsedCompanyTakerCategory) ? parsedCompanyTakerCategory : parsedCompanyTaker);
            } else {
                setSelectedTakerItems(Array.isArray(parsedCompanyTaker) ? parsedCompanyTaker : parsedCompanyTakerCategory);
            }
        }

        if (deal === 'offer') {
            console.log('companiesData: ', companiesData)
            setTextValue('Встречая сделка')
            openFullScreen()
            setTypeDeal(existTypeDeal)
            setCompanyOrCategory(existCompanyOrCategory)
            const parsedCompanyTaker = existCompanyTaker ? JSON.parse(existCompanyTaker) : JSON.parse(existCategoryTaker);
            const parsedCompanyTakerCategory = existCategoryTaker ? JSON.parse(existCategoryTaker) : JSON.parse(existCompanyTaker);

            if (parsedCompanyTakerCategory > parsedCompanyTaker) {
                setSelectedTakerItems(Array.isArray(parsedCompanyTakerCategory) ? parsedCompanyTakerCategory : parsedCompanyTaker);
            } else {
                setSelectedTakerItems(Array.isArray(parsedCompanyTaker) ? parsedCompanyTaker : parsedCompanyTakerCategory);
            }
        }
    }, [fetchData]);

    const fetchData = async () => {
        try {
            const userDataStr = await SecureStore.getItemAsync('userData');
            if (userDataStr) {
                const userData = JSON.parse(userDataStr);
                setToken(userData.token);

                const headers = {
                    Authorization: userData.token,
                    'Content-Type': 'application/json',
                };
                // categories
                const categoriesResponse = await fetch(`${apiBaseUrl}/api/exchange/all_categories`, { headers });
                if (categoriesResponse.ok) {
                    const categoriesData = await categoriesResponse.json();
                    setCategoriesData(categoriesData.categories);
                    const allCategories = [
                        { id: null, name: 'Все', icon: '/static/img/category/2/photo/category2.png' },
                        ...categoriesData.categories,
                    ];
                    setCategoryTags(allCategories)
                    console.log('allCategories', allCategories)

                } else {
                    console.error('Ошибка при загрузке данных клиента');
                }

                // города
                const cityResponse = await fetch(`${apiBaseUrl}/api/exchange/all_cities`)
                if (!cityResponse.ok) {
                    throw new Error(`Failed to fetch city. Status: ${cityResponse.status}`);
                }

                const cityData = await cityResponse.json();
                setCityTags(cityData.cities)
            }
        } catch (error) {
            console.error('Ошибка при получении запроса:', error);
        } finally {
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchDataCompany()
    }, [takerFilterExchanges]);

    const fetchDataCompany = async () => {
        try {
            const companiesResponse = await fetch(`${apiBaseUrl}/api/exchange/all_companies?${takerFilterExchanges}`);
            if (companiesResponse.ok) {
                const companiesData = await companiesResponse.json();
                setCompaniesData(companiesData.companies);
            } else {
                console.error('Ошибка при загрузке данных клиента');
            }
        } catch (error) {
            console.error('Ошибка при получении запроса:', error);
        } finally {
            setRefreshing(false);
        }
    };


    useEffect(() => {
        fetchDataBalls()
    }, [filterExchanges]);

    const fetchDataBalls = async () => {
        try {
            const userDataStr = await SecureStore.getItemAsync('userData');
            if (userDataStr) {
                const userData = JSON.parse(userDataStr);
                setToken(userData.token);

                const headers = {
                    Authorization: userData.token,
                    'Content-Type': 'application/json',
                };
                // balls
                const ballsResponse = await fetch(`${apiBaseUrl}/api/exchange/my_balls?${filterExchanges}`, { headers });
                if (ballsResponse.ok) {
                    const ballsData = await ballsResponse.json();
                    setBallsData(ballsData.balls);
                    console.log('ballsResponse: ', ballsResponse)

                } else {
                    console.error('Ошибка при загрузке данных клиента', ballsResponse.status);
                }
            }
        } catch (error) {
            console.error('Ошибка при получении запроса:', error);
        } finally {
            setRefreshing(false);
        }
    };

    const resetState = () => {
        setSelectedItem(null);
        setCompanyId(null);
        setSelectedTakerItems([]);
        setHideOtherItemsTaker(false);
        setHideOtherItems(false)
    };

    const renderButtons = (buttonData) => (
        <View>
            {(deal === 'edit' || deal === 'offer')  ? (
                <View></View>
            ) : (
                <View style={styles.buttonTypeDeal}>
                    {buttonData.map((button) => (
                        <NewButtonComponent
                            key={button.title}
                            title={button.title}
                            filled={typeDeal === button.typeDeal}
                            empty={typeDeal !== button.typeDeal}
                            height={38}
                            width={button.width}
                            fontSize={12}
                            onPress={() => {
                                setTypeDeal(button.typeDeal);
                                resetState();}}/>
                    ))}
                </View>
            )}
        </View>
    );

    const renderHeader = (headerText) => (
        <View style={styles.headerContainer}>
            <Text style={styles.headerText}>{headerText}</Text>
        </View>
    );

    const renderItems = (items, isTaker = false) => (
        <View>
            {items.map((item, index) => {
                const shouldDisplay = (isTaker && (!hideOtherItemsTaker || selectedTakerItems.includes(item.id)))
                    || (!isTaker && (!hideOtherItems || selectedItem === item.company_id));

                const shouldDisplayEdit = (deal === 'edit' || deal === 'offer') && item.company_id === existCompanyId;

                if ((shouldDisplay && !shouldDisplayEdit) || shouldDisplayEdit) {
                    return (
                        <TouchableOpacity
                            key={index}
                            onPress={() => {
                                const id = isTaker ? item.id : item.company_id;
                                handlePress(id, isTaker);
                            }}
                            style={[
                                styles.itemGive,
                                (isTaker && selectedTakerItems.includes(item.id)) && styles.itemGiveSelected,
                                (!isTaker && selectedItem === item.company_id) && styles.itemGiveSelected,
                            ]}
                        >
                            <Image
                                style={styles.imageGive}
                                contentFit="contain"
                                contentPosition="center"
                                source={apiBaseUrl + (isTaker ? item.photo : item.company_logo)}
                                width={40}
                                height={40}
                            />
                            <View style={styles.containerText}>
                                <Text style={styles.companyGiveText}>{isTaker ? item.name : item.company_name}</Text>
                                {!isTaker && (
                                    <View style={styles.containerBalls}>
                                        <Image
                                            style={styles.ballsIcon}
                                            contentFit="contain"
                                            contentPosition="center"
                                            source={require('../../assets/ellipse.svg')}
                                            width={12}
                                            height={12}
                                        />
                                        <Text style={styles.ballsGiveText}>{item.balls} {getBallsText(item.balls)}</Text>
                                    </View>
                                )}
                            </View>
                        </TouchableOpacity>
                    );
                }

                return null;
            })}
        </View>
    );

    const handleValueChange = (selectedValue, tagName) => {
        if (tagName === 'selectBallsTag') {
            setCompanyOrCategory(selectedValue)
        }

        if (tagName === 'cityTags') {
            if (myTagsCategory === 'Все') {
                if (selectedValue !== 'Все') {
                    setFilterExchanges(`city=${selectedValue}`)
                } else {
                    setFilterExchanges(``)
                }
            } else {
                setFilterExchanges(`city=${selectedValue}&category=${myTagsCategory}`)
            }
            setMyTagsCity(selectedValue)
            console.log('selectedValue: ', selectedValue)
        }

        if (tagName === 'categoryTags') {
            if (myTagsCity === 'Все') {
                if (selectedValue !== 'Все') {
                    setFilterExchanges(`category=${selectedValue}`)
                } else {
                    setFilterExchanges(``)
                }
            } else {
                setFilterExchanges(`city=${myTagsCity}&category=${selectedValue}`)
            }
            setMyTagsCategory(selectedValue)
            console.log('selectedValue: ', selectedValue)
        }

        if (tagName === 'takerCityTags') {
            if (takerTagsCategory === 'Все') {
                if (selectedValue !== 'Все') {
                    setTakerFilterExchanges(`city=${selectedValue}`)
                } else {
                    setTakerFilterExchanges(``)
                }
            } else {
                setTakerFilterExchanges(`city=${selectedValue}&category=${takerTagsCategory}`)
            }
            setTakerTagsCity(selectedValue)
            console.log('selectedValue: ', selectedValue)
        }
        if (tagName === 'takerCategoryTags') {
            if (takerTagsCity === 'Все') {
                if (selectedValue !== 'Все') {
                    setTakerFilterExchanges(`category=${selectedValue}`)
                } else {
                    setTakerFilterExchanges(``)
                }
            } else {
                setTakerFilterExchanges(`city=${takerTagsCity}&category=${selectedValue}`)
            }
            setTakerTagsCategory(selectedValue)
            console.log('selectedValue: ', selectedValue)
        }

    };

    const handlePress = (id, isTaker) => {
        if (isTaker) {
            setSelectedTakerItems((prevItems) => {
                const updatedItems = prevItems.includes(id)
                    ? prevItems.filter((itemId) => itemId !== id)
                    : prevItems.length < 3
                        ? [...prevItems, id]
                        : prevItems;

                if (updatedItems.length === 3) {
                    setHideOtherItemsTaker(true);
                } else {
                    setHideOtherItemsTaker(false);
                }

                return updatedItems;
            });
        } else {
            setSelectedItem(id);
            setCompanyId(id);
            setHideOtherItems(true);
        }
    };

    return (
        <ScrollView
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            style={styles.container}
            showsVerticalScrollIndicator={false}>
            <ImageBackground source={require('../../assets/background.png')} contentFit={"cover"}>
                <View style={styles.containerView}>
                    <HeaderComponent text={textValue} secondary={true} />
                    <View style={styles.createExchangeContainer}>
                        {renderButtons([
                            { title: 'Обменять', typeDeal: 'exchange', width: 80 },
                            { title: 'Купить', typeDeal: 'buy', width: 80 },
                            { title: 'Обменять или продать', typeDeal: 'exchange_sell', width: 100 },
                            { title: 'Продать', typeDeal: 'sell', width: 80 },
                        ])}
                        {(typeDeal === 'exchange' || typeDeal === 'exchange_sell') && (
                            <View>
                                {renderHeader('Отдаете')}
                                <View style={styles.tagContainer}>
                                    <NewTagComponent tag={cityTags} valueOnChange={(selectedValue) => handleValueChange(selectedValue, 'cityTags')}/>
                                    <NewTagComponent tag={categoryTags} valueOnChange={(selectedValue) => handleValueChange(selectedValue, 'categoryTags')}/>
                                </View>
                                {ballsData && ballsData.length !== 0 ? (
                                    <View>
                                        {renderItems(ballsData, false)}
                                    </View>
                                    ) : (
                                    <View>
                                        <Text style={styles.dopText}>У вас нет доступных компаний</Text>
                                    </View>
                                )}
                                {renderHeader('Получаете')}
                                <View style={styles.tagContainer}>
                                    <NewTagComponent tag={cityTags} valueOnChange={(selectedValue) => handleValueChange(selectedValue, 'takerCityTags')}/>
                                    <NewTagComponent tag={selectBallsTag} valueOnChange={(selectedValue) => handleValueChange(selectedValue, 'selectBallsTag')}/>
                                    {/*<NewTagComponent tag={selectVariantTag} valueOnChange={(selectedValue) => handleValueChange(selectedValue, 'selectVariantTag')}/>*/}
                                    <NewTagComponent tag={categoryTags} valueOnChange={(selectedValue) => handleValueChange(selectedValue, 'takerCategoryTags')}/>
                                </View>
                                {(companyOrCategory === 'Баллы в компании' || companyOrCategory === null) && (
                                    <View>
                                        {renderItems(companiesData, true)}
                                        {selectedTakerItems.length >= 1 && selectedItem && (
                                            <NewButtonComponent title={'Следующий этап'} filled={true} height={48} fontSize={18} onPress={openFullScreen} />
                                        )}
                                    </View>
                                )}
                                {(companyOrCategory === 'Баллы в категории') && (
                                    <View>
                                        {renderItems(categoriesData, true)}
                                        {selectedTakerItems.length >= 1 && selectedItem && (
                                            <NewButtonComponent title={'Следующий этап'} filled={true} height={48} fontSize={18} onPress={openFullScreen} />
                                        )}
                                    </View>
                                )}
                            </View>
                        )}

                        {typeDeal === 'buy' && (
                            <View>
                                {renderHeader('Хотите купить')}
                                <View style={styles.tagContainer}>
                                    <NewTagComponent tag={cityTags} valueOnChange={(selectedValue) => handleValueChange(selectedValue, 'cityTags')}/>
                                    <NewTagComponent tag={selectBallsTag} valueOnChange={(selectedValue) => handleValueChange(selectedValue, 'selectBallsTag')}/>
                                    <NewTagComponent tag={selectVariantTag} valueOnChange={(selectedValue) => handleValueChange(selectedValue, 'selectVariantTag')}/>
                                    <NewTagComponent tag={categoryTags} valueOnChange={(selectedValue) => handleValueChange(selectedValue, 'categoryTags')}/>
                                </View>
                                {renderItems(companiesData, true)}
                                {selectedTakerItems.length >= 1 && (
                                    <NewButtonComponent title={'Следующий этап'} filled={true} height={48} fontSize={18} onPress={openFullScreen} />
                                )}
                            </View>
                        )}

                        {typeDeal === 'sell' && (
                            <View>
                                {renderHeader('Хотите продать')}
                                <View style={styles.tagContainer}>
                                    <NewTagComponent tag={cityTags} valueOnChange={(selectedValue) => handleValueChange(selectedValue, 'cityTags')}/>
                                    <NewTagComponent tag={categoryTags} valueOnChange={(selectedValue) => handleValueChange(selectedValue, 'categoryTags')}/>
                                </View>
                                {renderItems(ballsData, false)}
                                {selectedItem && (
                                    <NewButtonComponent title={'Следующий этап'} filled={true} height={48} fontSize={18} onPress={openFullScreen} />
                                )}
                            </View>
                        )}
                    </View>
                </View>
                <CreateExchangeModalComponent
                    apiBaseUrl={apiBaseUrl}
                    ballsData={ballsData}
                    companyOrCategory={companyOrCategory}
                    companiesData={companyOrCategory === 'Баллы в категории' ? categoriesData : companiesData}
                    selectedTakerItems={selectedTakerItems}
                    companyId={companyId}
                    visible={modalVisible}
                    typeDeal={typeDeal}
                    edit={deal === 'edit' || deal === 'offer'}
                    onRequestClose={closeFullScreen}
                />
            </ImageBackground>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {},
    containerView: {
        marginHorizontal: 15,
        marginBottom: 80,
        minHeight: 760,
    },
    createExchangeContainer: {
        marginTop: 10
    },
    buttonTypeDeal: {
        flexDirection: "row",
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    tagContainer: {
        flexDirection: "row",
        flexWrap: 'wrap',
        maxWidth: "100%",
    },
    headerText: {
        fontFamily: FONTS.medium,
        fontSize: 18,
        color: textPrimaryColor,
        marginBottom: 10,
    },
    dopText: {
        fontSize: SIZES.medium,
        color: textPrimaryColor,
        marginBottom: 10,
    },
    itemGive: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    itemGiveSelected: {
        backgroundColor: textColor3,
        padding: 10,
        borderRadius: 12,
    },
    imageGive: {
        marginRight: 10
    },
    companyGiveText: {
        fontFamily: FONTS.medium,
        fontSize: 16,
        color: textPrimaryColor
    },
    containerText: {
        justifyContent: "space-between",
        flexDirection: "row",
        width: "85%"
    },
    containerBalls: {
        flexDirection: "row",
        alignItems: "flex-end",
    },
    ballsGiveText: {
        fontSize: 18,
        fontWeight: "bold",
        color: textPrimaryColor
    },
    ballsIcon: {
        marginRight: 5,
        marginBottom: 4
    },
})