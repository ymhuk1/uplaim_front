import {ActivityIndicator, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Image, ImageBackground} from "expo-image";
import HeaderComponent from "../../components/HeaderComponent";
import {useEffect, useState} from "react";
import Constants from 'expo-constants';
import {textPrimaryColor} from "../../components/ColorsComponent";
import {Link, useRouter} from "expo-router";
import { FONTS, HEIGHT } from "../../constants/theme";

const apiBaseUrl = Constants.expoConfig.extra.API_PROD;

export default function LoginScreen() {
    const [textValue, setTextValue] = useState('Все партнеры');
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const fetchData = async () => {
        try {
            const categoriesResponse = await fetch(`${apiBaseUrl}api/categories`);
            if (!categoriesResponse.ok) {
                throw new Error(`Failed to fetch categories. Status: ${categoriesResponse.status}`);
            }
            const categoriesData = await categoriesResponse.json();

            setCategories(categoriesData.categories);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <ScrollView
            style={styles.container} showsVerticalScrollIndicator={false}>
            <ImageBackground
                source={require('../../assets/background.png')}
                contentFit={"cover"}
                style={styles.containerImg}
                >
                <View style={styles.containerView}>
                    <HeaderComponent text={textValue} secondary={true}/>
                    {loading ? (
                        <ActivityIndicator size="large" color="#ffffff" />
                    ) : (
                        <View style={styles.categoriesContainer}>
                            {categories.map((item, index) => {
                                return (
                                    <TouchableOpacity key={item.id}
                                                      activeOpacity={0.7}
                                                      onPress={() => router.push({ pathname: "/home/companyList",  params: { id: item.id }  })}>
                                        <View style={styles.story}>
                                            <Image
                                                contentFit="contain"
                                                contentPosition="center"
                                                transition={1000}
                                                source={{ uri: apiBaseUrl + item.icon }}
                                                width={32}
                                                height={32}
                                                style={styles.iconStories}
                                            />
                                            <View style={styles.textContainer}>
                                                <Text style={styles.textStories}>{item.name}</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                        )}
                </View>

            </ImageBackground>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {},
    containerImg: {
     minHeight: HEIGHT.height,   
    },
    containerView: {
        marginHorizontal: 15,
        marginBottom: 80,
        minHeight: 760,
    },
    categoriesContainer: {
        marginTop: 20
    },
    story: {
        marginBottom: 10,
        flexDirection: "row",
        alignItems: "center",
    },
    iconStories: {

    },
    textContainer: {

    },
    textStories: {
        fontFamily: FONTS.medium,
        fontSize: 16,
        color: textPrimaryColor,
        marginLeft: 10,
    },


})