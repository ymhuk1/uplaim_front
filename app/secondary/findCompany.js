import {Pressable, RefreshControl, ScrollView, StyleSheet, Text, TextInput, View} from "react-native";
import React, {useEffect, useState} from "react";
import HeaderComponent from "../../components/HeaderComponent";
import {Image, ImageBackground} from "expo-image";
import {elemBackgroundColor, textPrimaryColor} from "../../components/ColorsComponent";
import Constants from "expo-constants";
import {useRouter} from "expo-router";

const apiBaseUrl = Constants.expoConfig.extra.API_PROD;


export default function FindCompany() {
    const [textValue, setTextValue] = useState('Рекомендация компаний');
    const [refreshing, setRefreshing] = useState(false);
    const [searchTerm, setSearchTerm] = useState('c');
    const [searchResults, setSearchResults] = useState([]);

    const router = useRouter();

    const fetchDataCompany = (term) => {
        fetch(`${apiBaseUrl}/api/company/search?term=${term}`)
            .then((response) => response.json())
            .then((data) => {
                const { companies } = data;
                console.log('CompanyList results:', companies);
                setSearchResults(companies);
            })
            .catch((error) => {
                console.error('Error fetching search results: ', error);
            });
    };

    useEffect(() => {
        if (searchTerm.length > 0) {
            // Fetch data when searchTerm is not empty
            fetchDataCompany(searchTerm);
        } else {
            // Clear search results when searchTerm is empty
            setSearchResults([]);
        }
    }, [searchTerm]);

    const onRefresh = () => {
        setRefreshing(true);
    };
    return (
        <ScrollView
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            }
            style={styles.container} showsVerticalScrollIndicator={false}>
            <ImageBackground
                source={require('../../assets/background.png')}
                contentFit={"cover"}>
                <View style={styles.containerView}>
                    <HeaderComponent text={textValue} secondary={true}/>
                    <View>
                        <TextInput
                            style={ styles.customInput}
                            placeholder="Поиск..."
                            placeholderTextColor="white"
                            onChangeText={(text) => setSearchTerm(text)}/>
                        <Image
                            contentFit="contain"
                            contentPosition={"center"}
                            transition={1000}
                            source={ require('../../assets/bottom-menu/search.svg') }
                            width={24}
                            height={24}
                            style={ styles.customSearch}/>
                    </View>
                    <View style={styles.mainContainer}>
                        <Text style={styles.textContainer}>Выбери компанию, которую хочешь рекомендовать</Text>
                    </View>
                    {searchResults.length > 0 && (
                        <View>
                            {searchResults.map((company, index) => (
                                <Pressable key={index}
                                           onPress={() => {router.push({ pathname: "/secondary/company", params: {  id: company.id } })}}>
                                    <View style={styles.companyContainer}>
                                        <View style={styles.innerContainer}>
                                            <Image
                                                contentFit="contain"
                                                contentPosition="center"
                                                transition={1000}
                                                source={ apiBaseUrl + company.main_photo }
                                                width={80}
                                                height={80}
                                                style={styles.logoContainer}
                                            />
                                        </View>
                                        <View style={styles.innerContainer}>
                                            <Text style={styles.headerContainer}>{company.name}</Text>
                                            <View style={styles.dopContainer}>
                                                <Image
                                                    contentFit="contain"
                                                    contentPosition={"center"}
                                                    transition={1000}
                                                    source={require('../../assets/user.svg')}
                                                    width={16}
                                                    height={16}/>
                                                <Text style={styles.dopTextContainer}>тебе</Text>
                                            </View>
                                            <View style={styles.dopContainer}>
                                                <Image
                                                    contentFit="contain"
                                                    contentPosition={"center"}
                                                    transition={1000}
                                                    source={require('../../assets/users.svg')}
                                                    width={16}
                                                    height={16}/>
                                                <Text style={styles.dopTextContainer}>другу</Text>
                                            </View>
                                        </View>
                                        <View style={styles.innerContainer}>
                                            <View style={styles.allBallsContainer}>
                                                <View style={styles.ballsContainer}>
                                                    <Image
                                                        contentFit="contain"
                                                        contentPosition={"center"}
                                                        transition={1000}
                                                        source={require('../../assets/ellipse.svg')}
                                                        width={12}
                                                        height={12}/>
                                                    <Text style={styles.ballsTextContainer}>300 баллов</Text>
                                                </View>
                                                <View style={styles.ballsContainer}>
                                                    <Image
                                                        contentFit="contain"
                                                        contentPosition={"center"}
                                                        transition={1000}
                                                        source={require('../../assets/ellipse.svg')}
                                                        width={12}
                                                        height={12}/>
                                                    <Text style={styles.ballsTextContainer}>150 баллов</Text>
                                                </View>
                                            </View>

                                        </View>

                                    </View>
                                </Pressable>
                            ))}
                        </View>
                    )}

                </View>
            </ImageBackground>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    container: {},
    containerView: {
        marginHorizontal: 15,
        marginBottom: 80,
        height: 850,
    },
    mainContainer: {
        marginTop: 20,
        marginBottom: 20,
    },
    textContainer: {
        color: textPrimaryColor,
        fontWeight: "bold",
        fontSize: 24,
    },
    companyContainer: {
        height: 100,
        backgroundColor: elemBackgroundColor,
        borderRadius: 12,
        padding: 10,
        flexDirection: "row",
        marginBottom: 15,
    },
    innerContainer: {
        width: "33%"
    },
    logoContainer: {
        borderRadius: 12,
    },
    headerContainer: {
        color: textPrimaryColor,
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 10,
    },
    dopContainer: {
        marginBottom: 9,
        flexDirection: "row"
    },
    dopTextContainer: {
        marginLeft: 5,
        color: textPrimaryColor,
        fontSize: 12,
    },
    allBallsContainer: {
        marginTop: 30,
    },
    ballsContainer: {
        marginBottom: 5,
        flexDirection: "row",
        alignItems: "center",
    },
    ballsTextContainer: {
        marginLeft: 5,
        color: textPrimaryColor,
        fontSize: 14,
        fontWeight: "bold",

    },
    customInput: {
        padding: 10,
        paddingHorizontal: 15,
        minWidth: 260,
        width: "100%",
        height: 36,
        borderRadius: 50,
        backgroundColor: 'rgba(18, 17, 35, 1)',
        color: 'white',
    },
    customSearch: {
        position: "absolute",
        top: 6,
        right: 10,
    },
    customInputText: {
        color: textPrimaryColor,
    },

})