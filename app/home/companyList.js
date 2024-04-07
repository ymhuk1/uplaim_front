import {RefreshControl, ScrollView, StyleSheet, View, Text, TouchableOpacity} from "react-native";
import React, {useEffect, useState} from "react";
import {Image, ImageBackground} from "expo-image";
import {elemGradientColors, elemGradientColors2, textPrimaryColor} from "../../components/ColorsComponent";
import SearchComponent from "../../components/SearchComponent";
import Constants from 'expo-constants';
import {Link, useLocalSearchParams} from "expo-router";
import {LinearGradient} from "expo-linear-gradient";

const apiBaseUrl = Constants.expoConfig.extra.API_PROD;


export default function CompanyList() {
    const [refreshing, setRefreshing] = useState(false);
    const [categories, setCategories] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);

    const { id } = useLocalSearchParams();
    useEffect(() => {
        fetchData();
        if (id !== undefined && id !== '') {
            setSelectedCategoryId(Number(id));
        }
    }, [id]);

    const fetchData = async () => {


        try {
            // Fetch categories and companies data
            const [categoriesResponse, companiesResponse] = await Promise.all([
                fetch(`${apiBaseUrl}/api/categories`),
                fetch(`${apiBaseUrl}/api/companies`),
            ]);

            if (!categoriesResponse.ok) {
                throw new Error(`Failed to fetch categories. Status: ${categoriesResponse.status}`);
            }

            if (!companiesResponse.ok) {
                throw new Error(`Failed to fetch companies. Status: ${companiesResponse.status}`);
            }

            const [categoriesData, companiesData] = await Promise.all([
                categoriesResponse.json(),
                companiesResponse.json(),
            ]);

            const allCategories = [
                { id: null, name: 'Все', icon: '/static/img/category/2/photo/category2.png' },
                ...categoriesData.categories,
            ];

            setCategories(allCategories);
            setCompanies(companiesData.companies);

        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setRefreshing(false);
        }
    };


    const onRefresh = () => {
        setRefreshing(true);
        fetchData();
    };

    useEffect(() => {
        setRefreshing(true);
        fetchData();
    }, []);

    const handleCategoryClick = (id) => {
        setSelectedCategoryId(id);
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
                    <View style={styles.textContainer2}>
                        <Text style={styles.text2}>Партнеры</Text>
                    </View>
                    <SearchComponent company={true} style={styles.search}/>
                    <View style={styles.storyContainer}>
                        <ScrollView
                            style={styles.storiesContainer}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                        >
                            {categories.map((item, index) => {
                                return (
                                    <TouchableOpacity
                                        key={item.id}
                                        onPress={() => handleCategoryClick(item.id)}
                                        activeOpacity={0.7}
                                    >
                                        <View style={[
                                            styles.story,
                                            selectedCategoryId === item.id && styles.selectedCategory,
                                        ]}>
                                            <Image
                                                contentFit="contain"
                                                contentPosition="center"
                                                transition={0}
                                                source={{ uri: apiBaseUrl + item.icon }}
                                                width={46}
                                                height={46}
                                                style={styles.iconStories}
                                            />
                                            <View style={styles.textContainer}>
                                                <Text style={styles.textStories}>{item.name}</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                );
                            })}
                        </ScrollView>
                    </View>
                    <View style={styles.companiesContainer}>
                        {companies
                            .filter((item) => selectedCategoryId === null || (item.category_id && item.category_id === selectedCategoryId))
                            .map((item, index) => (
                            <View key={item.id} style={styles.view}>
                                <View style={styles.elemContainer}>
                                    <View style={styles.itemActivity}>
                                        <View style={[styles.backActivity, {backgroundColor: `${item.category.color}20`} ]}>
                                            <Text style={[styles.activity, {color: item.category.color}]}>{item.category.name}</Text>
                                        </View>
                                    </View>
                                    <Link href={{
                                        pathname: "/secondary/company",
                                        params: { id: item.id }
                                    }}
                                          style={styles.logoContainer}>
                                        <View >
                                            {item.main_photo ? (
                                                <Image
                                                    contentFit="contain"
                                                    contentPosition={"center"}
                                                    transition={0}
                                                    source={apiBaseUrl + item.main_photo}
                                                    width={80}
                                                    height={80}
                                                    style={styles.logoCompany}
                                                />
                                            ) : (
                                                <View style={styles.textNameContainer}>
                                                    <Text style={styles.nameCompany}>{item.name}</Text>
                                                </View>
                                            )}
                                        </View>
                                    </Link>
                                </View>
                                <View style={styles.dopInfoContainer}>
                                    <View style={styles.dopInfoBalls}>
                                        <Image
                                            contentFit="contain"
                                            contentPosition={"center"}
                                            transition={1000}
                                            source={ require('../../assets/gift-welcome.svg') }
                                            width={16}
                                            height={16}
                                            style={styles.taskMainStatusImage}/>
                                        <Text style={styles.dopInfoBallsText}>86 баллов</Text>
                                    </View>
                                    <Text style={styles.dopInfoWelcomeText}>Приветственных</Text>
                                    <LinearGradient
                                        style={styles.dopInfoCashbackContainer}
                                        colors={elemGradientColors2} >
                                    <Text style={styles.dopInfoCashbackText}>Кешбэк 10%</Text>
                                    </LinearGradient>
                                </View>

                            </View>
                            ))}
                    </View>
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
        marginTop: 60,
        minHeight: 650,
    },
    textContainer2: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    text2: {
        fontSize: 24,
        fontWeight: 'bold',
        color: textPrimaryColor,
        marginLeft: 7,
    },

    storiesContainer: {
        overflow: 'hidden',
        flexDirection: 'row',
        marginBottom: 30,
        marginRight: -15,
        marginTop: 20

    },
    story: {
        width: 120,
        height: 112,
        borderRadius: 12,
        backgroundColor: '#24224A',
        marginRight: 10,
    },
    iconStories: {
        width: 46,
        height: 46,
        marginHorizontal: 12,
        marginVertical: 10,
        borderRadius: 12,

    },
    textContainer: {
        marginHorizontal: 12,
        width: 80,
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 10,
    },
    textStories: {
        fontSize: 14,
        color: 'white',
        fontWeight: 'bold',
    },
    companiesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },

    view: {
        width: '48%',
        borderRadius: 12,
        backgroundColor: '#24224A',
        marginBottom: 15,
        height: 220,
    },
    elemContainer: {

    },
    itemActivity: {
        alignItems: "flex-start",
    },
    backActivity: {
        margin: 10,
        borderRadius: 8,
        flexDirection: "row",
        alignItems: "center",
    },
    activity: {
        fontSize: 12,
        lineHeight: 14,
        padding: 5,
        paddingHorizontal: 10,
    },
    logoContainer:{
        marginTop: 5,
        marginBottom: 15,
        textAlign: "center",
        borderRadius: 12,
    },
    logoCompany: {
        borderRadius: 12,

    },
    textNameContainer: {
        height: 80,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 10,
    },
    nameCompany: {
        color: textPrimaryColor,
        fontSize: 16,
        fontWeight: "bold",
    },
    selectedCategory: {
        borderWidth: 4,
        borderColor: '#9B51E0'
    },
    dopInfoContainer: {
        alignItems: "center",
    },
    dopInfoBalls: {
        flexDirection: "row",
        alignItems: "center",
    },
    dopInfoBallsText: {
        marginLeft: 5,
        color: textPrimaryColor,
        fontSize: 16,
        fontWeight: "bold",
    },
    dopInfoWelcomeText: {
        color: textPrimaryColor,
        fontSize: 12,
    },
    dopInfoCashbackContainer: {
        marginTop: 5,
        paddingHorizontal: 10,
        paddingVertical: 2,
        borderRadius: 8,
    },
    dopInfoCashbackText: {
        color: textPrimaryColor,
        fontSize: 12,
    },
})