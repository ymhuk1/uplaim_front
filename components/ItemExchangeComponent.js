import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Image} from "expo-image";
import {elemBackgroundColor, textPrimaryColor} from "./ColorsComponent";
import NewButtonComponent from "./NewButtonComponent";
import InfoModalComponent from "./InfoModalComponent";
import {router} from "expo-router";
import * as SecureStore from "expo-secure-store";
import ErrorModalComponent from "./ErrorModalComponent";
import { FONTS } from '../constants/theme';

function getBallsText(clientBalls) {
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
}


export default function ItemExchangeComponent({ exchanges, apiBaseUrl, clientId, myDeals, allDeals, proposedDeals, takerCompany }) {
    const [modalDeleteVisible, setModalDeleteVisible] = useState(false)
    const [deleteId, setDeleteId] = useState(null)
    const [modalAcceptVisible, setModalAcceptVisible] = useState(false)
    const [acceptId, setAcceptId] = useState(null)
    const [acceptCompanyId, setAcceptCompanyId] = useState(null)
    const [filteredExchanges, setFilteredExchanges] = useState([]);
    const [takerId, setTakerId] = useState('')
    const [itemDeal, setItemDeal] = useState({})

    const [error, setError] = useState(null);
    const [errorModal, setErrorModal] = useState(false)

    const closeFullScreen = () => setErrorModal(false);

    useEffect(() => {
        loadUserData()
        const filtered = exchanges.filter(item => {
            if (myDeals) {
                return clientId && item.holder_id && String(clientId) === String(item.holder_id);
            } else if (allDeals) {
                return clientId ? parseInt(clientId) !== parseInt(item.holder_id) : true;
            } else if (proposedDeals) {
                return clientId ? String(clientId) === String(item.last_holder_id) : true;
            }
            return false;
        });
        setFilteredExchanges(filtered);
    }, [exchanges, clientId, myDeals, allDeals]);
    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.substring(0, maxLength - 3) + '...';
        } else {
            return text;
        }
    };

    const loadUserData = async () => {
        try {
            const taker = await SecureStore.getItemAsync('clientData');
            if (taker) {
                setTakerId(JSON.parse(taker).id)
            }

        } catch (error) {
            console.error('Ошибка при загрузке данных пользователя:', error);
        }
    };


    function modalDelete(id)  {
        setModalDeleteVisible(!modalDeleteVisible)
        setDeleteId(id)
    }

    const deleteExchange = async (id) => {
        try {
            const apiUrl = `${apiBaseUrl}api/exchange/delete/`;
            const response = await fetch(`${apiUrl}${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Failed to delete exchange. Status: ${response.status}`);
            }
            const updatedExchanges = filteredExchanges.filter(item => item.id !== id);
            setFilteredExchanges(updatedExchanges);
            setModalDeleteVisible(!modalDeleteVisible);
            setDeleteId(null);
        } catch (error) {
            console.error('Error deleting exchange:', error);
        }
    };

    function modalAccept(id, companyOut) {
        setModalAcceptVisible(!modalAcceptVisible)
        setAcceptId(id)
    }
    function modalAcceptClose(id, companyOut) {
        setModalAcceptVisible(!modalAcceptVisible)
        setAcceptId(null)
        setAcceptCompanyId(null)
    }

    const acceptExchange = async (companyId) => {
        try {

            const apiUrl = `${apiBaseUrl}api/exchange/accept/`;
            const response = await fetch(`${apiUrl}/${acceptId}/${takerId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    taker_company_id: companyId ? companyId : null,
                }),
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                throw new Error(`${errorResponse.error}`);
            }
            const updatedExchanges = filteredExchanges.filter(item => item.id !== acceptId);
            setFilteredExchanges(updatedExchanges);
            setModalAcceptVisible(!modalAcceptVisible);
            setAcceptId(null);
            setAcceptCompanyId(null);

        } catch (error) {


            setError(error.message)
            setErrorModal(true)
        }
    };

    const handleChildValueChange = (newValue) => {
        setAcceptCompanyId(newValue);

        if (newValue !== null) {
            acceptExchange(newValue);
        }
    };

    // console.log('filteredExchanges: ', filteredExchanges)
    return (
        <View>
            {filteredExchanges.map((item) => (
                <View key={item.id} style={styles.containerExchange}>
                    {item.type_deal === 'exchange' || item.type_deal === 'sell' || item.type_deal === 'exchange_sell' ? (
                        <View style={styles.containerHolderExchange}>
                            <View style={styles.containerTextHolderExchange}>
                                <Text numberOfLines={1}
                                      ellipsizeMode="tail"
                                    style={styles.textHolderExchange}>{item.holder_company.name} </Text>
                            </View>
                            <View style={styles.containerImageHolderExchange}>
                                {item.holder_company.main_photo ? (
                                    <Image
                                        style={styles.imageHolderExchange}
                                        contentFit="contain"
                                        contentPosition="center"
                                        source={apiBaseUrl + item.holder_company.main_photo}
                                        width={40}
                                        height={40}
                                    />
                                ) : (
                                    <View style={styles.placeholderImage}></View>
                                )}
                            </View>
                            <View style={styles.containerBallsHolderExchange}>
                                <Image
                                    style={styles.containerBallsIconExchange}
                                    contentFit="contain"
                                    contentPosition="center"
                                    source={require('../assets/ellipse.svg')}
                                    width={9}
                                    height={9}
                                />
                                <Text style={styles.ballsTextExchange}>{item.give_balls} {getBallsText(item.give_balls)}</Text>
                            </View>
                        </View>
                    ) : (
                        <View style={styles.containerHolderExchange}>
                            {item.give_cash &&
                                <View style={styles.containerHolderExchangeOffer}>
                                    <Text style={styles.holderExchangeOffer}>{item.give_cash} ₽</Text>
                                </View>}
                            {item.give_saveup && (
                                <View style={styles.containerHolderExchangeOffer}>
                                    <Text style={styles.holderExchangeOffer}>{item.give_saveup}</Text>
                                    <Image
                                        contentFit="contain"
                                        contentPosition={"center"}
                                        transition={1000}
                                        source={require('../assets/up.svg')}
                                        width={21}
                                        height={16}
                                        style={{ marginBottom: 2, marginRight: 3 }}
                                    />
                                </View>
                            )}
                        </View>
                    )}

                    <View style={styles.containerMiddleExchange}>
                        {item.partial_deal && (
                            <Image
                                style={styles.containerPartialIconMiddleExchange}
                                contentFit="contain"
                                contentPosition="center"
                                source={require('../assets/chart-pie-simple.svg')}
                                width={16}
                                height={16}
                            />
                        )}
                        <Image
                            style={styles.containerIconMiddleExchange}
                            contentFit="contain"
                            contentPosition="center"
                            source={require('../assets/exchange.svg')}
                            width={16}
                            height={16}
                        />
                    </View>

                    {item.type_deal === 'buy' || item.type_deal === 'exchange' || item.type_deal === 'exchange_sell' ? (
                        <View style={styles.containerTakerExchange}>
                            {item.taker_companies ? (
                                <View>
                                    {item.taker_companies.length > 0 && (
                                        <React.Fragment>
                                            {item.taker_companies.length > 1 ? (
                                                <View style={styles.containerTextTakerExchange}>
                                                    <Text style={styles.textTakerExchange}>
                                                        {truncateText(item.taker_companies[0].name, 14)} и др.
                                                    </Text>
                                                </View>
                                            ):(
                                                <View style={styles.containerTextTakerExchange}>
                                                    <Text style={styles.textTakerExchange}>{item.taker_companies[0].name}</Text>
                                                </View>
                                            )}
                                            <View style={styles.containerImageTakerExchange}>
                                                {item.taker_companies.map((company, index) => (
                                                    <Image
                                                        key={index}
                                                        style={[styles.imageTakerExchange, { marginRight: index !== item.taker_companies.length - 1 ? -30 : 0 }, { zIndex: index !== 0 ? -10 : 0}]}
                                                        contentFit="contain"
                                                        contentPosition="center"
                                                        source={apiBaseUrl + company.main_photo}
                                                        width={40}
                                                        height={40}
                                                    />
                                                ))}
                                                {item.type_deal === 'exchange_sell' &&
                                                    <View>
                                                        {item.get_cash ? (
                                                            <Text style={styles.textOr}>или {item.get_cash} ₽</Text>
                                                        ):(
                                                            <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                                                                <Text style={styles.textOr}>или {item.get_saveup}</Text>
                                                                <Image
                                                                    contentFit="contain"
                                                                    contentPosition={"center"}
                                                                    transition={1000}
                                                                    source={require('../assets/up.svg')}
                                                                    width={17}
                                                                    height={12}
                                                                    style={{ marginBottom: 2, marginRight: 3 }}
                                                                />
                                                            </View>

                                                        )}
                                                    </View>
                                                }


                                            </View>
                                            <View style={styles.containerBallsTakerExchange}>
                                                <Image
                                                    style={styles.containerBallsIconExchange}
                                                    contentFit="contain"
                                                    contentPosition="center"
                                                    source={require('../assets/ellipse.svg')}
                                                    width={9}
                                                    height={9}
                                                />
                                                <Text style={styles.textBallsTakerExchange}>{item.get_balls} {getBallsText(item.get_balls)}</Text>
                                            </View>
                                        </React.Fragment>
                                    )}
                                </View>
                            ) : (
                                <View>
                                    {item.taker_categories && (
                                    <View>
                                        {item.taker_categories.length > 0 && (
                                            <React.Fragment>
                                                {item.taker_categories.length > 1 ? (
                                                    <View style={styles.containerTextTakerExchange}>
                                                        <Text style={styles.textTakerExchange}>{item.taker_categories[0].name} и др.</Text>
                                                    </View>
                                                ):(
                                                        <View style={styles.containerTextTakerExchange}>
                                                            <Text style={styles.textTakerExchange}>{item.taker_categories[0].name}</Text>
                                                        </View>
                                                    )}
                                                <View style={styles.containerImageTakerExchange}>
                                                    {item.taker_categories.map((category, index) => (
                                                        <Image
                                                            key={index}
                                                            style={[styles.imageTakerExchange, { marginRight: index !== item.taker_categories.length - 1 ? -30 : 0 }, { zIndex: index !== 0 ? -10 : 0}]}
                                                            contentFit="contain"
                                                            contentPosition="center"
                                                            source={apiBaseUrl + category.icon}
                                                            width={40}
                                                            height={40}
                                                        />
                                                    ))}
                                                    {item.type_deal === 'exchange_sell' &&
                                                        <View>
                                                            {item.get_cash ? (
                                                                <Text style={styles.textOr}>или {item.get_cash} ₽</Text>
                                                            ):(
                                                                <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                                                                    <Text style={styles.textOr}>или {item.get_saveup}</Text>
                                                                    <Image
                                                                        contentFit="contain"
                                                                        contentPosition={"center"}
                                                                        transition={1000}
                                                                        source={require('../assets/up.svg')}
                                                                        width={17}
                                                                        height={12}
                                                                        style={{ marginBottom: 2, marginRight: 3 }}
                                                                    />
                                                                </View>

                                                            )}
                                                        </View>
                                                    }

                                                </View>

                                                <View style={styles.containerBallsTakerExchange}>
                                                    <Image
                                                        style={styles.containerBallsIconExchange}
                                                        contentFit="contain"
                                                        contentPosition="center"
                                                        source={require('../assets/ellipse.svg')}
                                                        width={9}
                                                        height={9}
                                                    />
                                                    <Text style={styles.textBallsTakerExchange}>{item.get_balls} {getBallsText(item.get_balls)}</Text>
                                                </View>
                                            </React.Fragment>
                                        )}
                                    </View>
                                    )}
                                </View>
                            )}
                        </View>
                    ) : (
                        <View style={styles.containerTakerExchange}>
                            {item.get_cash && (
                                <View style={styles.containerHolderExchangeOffer}>
                                    <Text style={styles.holderExchangeOffer}>{item.get_cash} ₽</Text>
                                </View>
                                )}
                            {item.get_saveup && (
                                <View style={styles.containerHolderExchangeOffer}>
                                    <Text style={styles.holderExchangeOffer}>{item.get_saveup}</Text>
                                    <Image
                                        contentFit="contain"
                                        contentPosition={"center"}
                                        transition={1000}
                                        source={require('../assets/up.svg')}
                                        width={21}
                                        height={16}
                                        style={{ marginBottom: 2, marginRight: 3 }}
                                    />
                                </View>
                            )}
                        </View>
                    )}

                    {allDeals &&
                        <View style={styles.containerButtonExchange}>
                            {item.available && item.available === true ? (
                                <View>
                                    <NewButtonComponent title={'Сделка'} filled={true} height={34} fontSize={12} onPress={() => {modalAccept(item.id, (takerCompany ? takerCompany : null), item); setItemDeal(item)}}/>
                                    <NewButtonComponent title={'Предложение'} empty={true} height={34} fontSize={12} onPress={() => {

                                        const takerCompanyIds = item.taker_companies ? item.taker_companies.map(company => Number(company.id)) : []
                                        const takerCategoryIds = item.taker_categories ? item.taker_categories.map(category => Number(category.id)) : []
                                        const existTakerCompanyIds = JSON.stringify(takerCompanyIds) > JSON.stringify(takerCategoryIds) ? 'Баллы в категории' : 'Баллы в компании'
                                        router.push(
                                            {pathname: 'secondary/newExchange', params:
                                                    { deal: 'offer',
                                                        existItemEdit: item,
                                                        existHolderId: item.holder_id,
                                                        existExchangeId: item.id,
                                                        existTypeDeal: item.type_deal,
                                                        existCompanyId: item.holder_company_id,
                                                        existCompanyTaker: JSON.stringify(takerCompanyIds),
                                                        existCategoryTaker: JSON.stringify(takerCategoryIds),
                                                        existCompanyOrCategory: existTakerCompanyIds,
                                                        existGiveBalls: item.give_balls,
                                                        existGetBalls: item.get_balls,
                                                        existGiveSaveup: item.give_saveup,
                                                        existGetSaveup: item.get_saveup,
                                                        existGiveCash: item.give_cash,
                                                        existGetCash: item.get_cash,
                                                    }})}}/>
                                </View>
                            ) : (
                                <View>
                                    <NewButtonComponent title={'Сделка'} filled={true} disabled={true} height={34} fontSize={12} />
                                    <NewButtonComponent title={'Предложение'} empty={true} disabled={true} height={34} fontSize={12} />
                                </View>
                            )}


                        </View>
                    }
                    {myDeals &&
                        <View style={styles.containerButtonExchange}>
                            <NewButtonComponent title={'Изменить'} filled={true} height={34} fontSize={12} onPress={() => {

                                const takerCompanyIds = item.taker_companies ? item.taker_companies.map(company => Number(company.id)) : []
                                const takerCategoryIds = item.taker_categories ? item.taker_categories.map(category => Number(category.id)) : []
                                const existTakerCompanyIds = JSON.stringify(takerCompanyIds) > JSON.stringify(takerCategoryIds) ? 'Баллы в категории' : 'Баллы в компании'

                                router.push(
                                {pathname: 'secondary/newExchange', params:
                                        { deal: 'edit',
                                            existItemEdit: item,
                                            existExchangeId: item.id,
                                            existTypeDeal: item.type_deal,
                                            existCompanyId: item.holder_company_id,
                                            existCompanyTaker: JSON.stringify(takerCompanyIds),
                                            existCategoryTaker: JSON.stringify(takerCategoryIds),
                                            existCompanyOrCategory: existTakerCompanyIds,
                                            existGiveBalls: item.give_balls,
                                            existGetBalls: item.get_balls,
                                            existGiveSaveup: item.give_saveup,
                                            existGetSaveup: item.get_saveup,
                                            existGiveCash: item.give_cash,
                                            existGetCash: item.get_cash,
                                        }})}}/>
                            <NewButtonComponent title={'Удалить'} empty={true} height={34} fontSize={12} onPress={() => modalDelete(item.id)}/>
                        </View>
                    }
                    {proposedDeals &&
                        <View style={styles.containerButtonExchange}>
                            <NewButtonComponent title={'Сделка'} filled={true} height={34} fontSize={12} onPress={() => {modalAccept(item.id, (takerCompany ? takerCompany : null), item); setItemDeal(item)}}/>
                            <NewButtonComponent title={'Отклонить'} empty={true} height={34} fontSize={12} onPress={() => modalDelete(item.id)}/>
                        </View>
                    }
                    <View>
                        <InfoModalComponent visible={modalAcceptVisible} titleText={'Совершить сделку?'} titlePrimaryButton={'Обменять'} onPress={modalAcceptClose} exchange={true} apiBaseUrl={apiBaseUrl} item={itemDeal} onPressSecondary={modalAcceptClose} takerCompanyValue={handleChildValueChange}/>

                    </View>
                </View>

            ))}
            <View>
                <InfoModalComponent visible={modalDeleteVisible} titleText={'Удалить выбранную сделку?'} titlePrimaryButton={'Удалить'} titleSecondaryButton={'Отмена'} onPress={() => deleteExchange(deleteId)} onPressSecondary={modalDelete}/>
            </View>
            {error && (
                <View>
                    <ErrorModalComponent visible={errorModal} textError={error} onRequestClose={closeFullScreen}/>
                </View>
            )}
        </View>

    );
}

const styles = StyleSheet.create({
    containerExchange: {
        flexDirection: "row",
        // alignItems: "center",
        justifyContent: "space-between",
        borderBottomWidth: 1,
        borderTopWidth: 1,
        marginBottom: -1,
        borderColor: '#24224A',
        paddingVertical: 5,
    },
    containerHolderExchange: {
        marginRight: 5,
        width: '20%',
        justifyContent: "center",
    },
    containerHolderExchangeOffer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginLeft: -30,
    },
    holderExchangeOffer: {
        fontSize: 18,
        fontFamily: FONTS.medium,
        color: textPrimaryColor,
        marginRight: 5,
    },

    containerTextHolderExchange: {
        marginBottom: 5
    },
    textHolderExchange: {
        fontSize: 12,
        color: textPrimaryColor,
    },
    containerImageHolderExchange: {

    },
    imageHolderExchange: {

    },
    containerBallsHolderExchange: {
        marginTop: 5,
        flexDirection: "row",
        alignItems: "center"
    },
    containerBallsIconExchange: {
        marginRight: 5,
    },
    ballsTextExchange: {
        fontSize: 12,
        color: textPrimaryColor,
    },
    containerMiddleExchange: {
        width: '10%',
        justifyContent: "center"
    },
    containerIconMiddleExchange: {

    },
    containerPartialIconMiddleExchange: {

    },
    containerTakerExchange: {
        width: '30%',
        marginRight: 5,
        justifyContent: "center",
    },
    containerTextTakerExchange: {
        marginBottom: 5
    },
    textTakerExchange: {
        fontSize: 12,
        color: textPrimaryColor,
    },
    containerImageTakerExchange: {
        flexDirection: "row",
        alignItems: "center",
    },
    imageTakerExchange: {
        borderRadius: 10,
        backgroundColor: elemBackgroundColor,

    },
    textOr: {
        fontSize: 12,
        color: textPrimaryColor,
        marginHorizontal: 5,
    },
    containerBallsTakerExchange: {
        marginTop: 5,
        flexDirection: "row",
        alignItems: "center"
    },
    textBallsTakerExchange: {
        fontSize: 12,
        color: textPrimaryColor,
    },
    containerButtonExchange: {
        width: '30%',
        justifyContent: "space-between",
        marginVertical: 3,
    },
});

