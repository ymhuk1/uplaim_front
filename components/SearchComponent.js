import React, {useEffect, useState} from 'react';
import {View, StyleSheet, TextInput, Pressable, Modal, Text} from 'react-native';
import {Image} from "expo-image";
import {elemBackgroundColor, textColor3, textPrimaryColor} from "./ColorsComponent";
import Constants from 'expo-constants';
import {Link, useRouter} from "expo-router";
import { FONTS, SIZES } from '../constants/theme';

const apiBaseUrl = Constants.expoConfig.extra.API_PROD;

const SearchComponent = ({main, modal, company}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [stories, setStories] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showStories, setShowStories] = useState(true);
    const router = useRouter();

    const fetchData = async () => {
        fetch(`${apiBaseUrl}/api/stories/search`)
            .then((response) => response.json())
            .then((data) => {
                const { stories } = data;
                console.log('Данные успешно получены:', data);
                setStories(stories);
            })
            .catch((error) => {
                console.error('Ошибка при загрузке данных: ', error);
            });
    };

    useEffect(() => {
        fetchData();
    }, []);

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
            setShowStories(false);
            fetchDataCompany(searchTerm);
        } else {
            setShowStories(true);
            setSearchResults([]);
        }
    }, [searchTerm]);

    return (
        <View style={styles.inputContainer}>

            {main && (
                <Pressable onPress={() => setModalVisible(true)} style={ styles.customInput}>
                    <Text style={ styles.customInputText}>Поиск..</Text>
                    <Image
                        contentFit="contain"
                        contentPosition={"center"}
                        transition={1000}
                        source={ require('../assets/bottom-menu/search.svg') }
                        width={24}
                        height={24}
                        style={ styles.customSearch}/>
                </Pressable>
            )}
            {modal && (
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
                        source={ require('../assets/bottom-menu/search.svg') }
                        width={24}
                        height={24}
                        style={ styles.customSearch}/>
                    {showStories && (
                        <View>
                            <Text style={styles.storyTitle}>Часто ищут</Text>
                            {stories.map((story, index) => (
                                <View key={index} style={styles.storyContainer}>
                                    <Image
                                        contentFit="contain"
                                        contentPosition="center"
                                        transition={1000}
                                        source={{ uri: apiBaseUrl + story.icon }}
                                        width={20}
                                        height={20}
                                    />
                                    <Text style={styles.storyName}>{story.name}</Text>
                                </View>
                            ))}
                        </View>
                    )}
                    {searchResults.length > 0 && (
                        <View>
                            {searchResults.map((company, index) => (
                                    <Pressable key={index}
                                               onPress={() => {router.push({ pathname: "/secondary/company", params: {  id: company.id } }); setModalVisible(false)}}
                                               style={styles.companyContainer}>
                                        {company.main_photo && (
                                            <Image
                                                contentFit="contain"
                                                contentPosition="center"
                                                transition={1000}
                                                source={ apiBaseUrl + company.main_photo }
                                                width={33}
                                                height={33}
                                            />
                                            )}
                                        <Text style={styles.companyName}>{company.name}</Text>
                                    </Pressable>
                            ))}
                        </View>
                    )}
                </View>
            )}
            {company && (
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
                        source={ require('../assets/bottom-menu/search.svg') }
                        width={24}
                        height={24}
                        style={ styles.customSearch}/>
                </View>
            )}


            <View style={styles.centeredView}>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <View style={styles.containerButtonClose}>
                                <Pressable
                                    style={styles.buttonClose}
                                    onPress={() => setModalVisible(false)}>
                                    <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: 'bold', color: elemBackgroundColor}}>X</Text>
                                </Pressable>
                            </View>
                            <SearchComponent modal={true}/>
                        </View>
                    </View>
                </Modal>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        paddingLeft: 4,
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
        fontFamily: FONTS.regular,
        color: textPrimaryColor,
    },
    centeredView: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        height: 400,
        width: "94%",
        backgroundColor: elemBackgroundColor,
        borderRadius: 20,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    buttonClose: {
        width: 40,
        borderRadius: 50,
        paddingHorizontal: 10,
        paddingVertical: 8,
        elevation: 2,
        backgroundColor: textColor3,
    },
    containerButtonClose: {
        alignItems: "flex-end",
        marginBottom: 15,
    },
    storyTitle: {
        fontFamily: FONTS.medium,
        color: textPrimaryColor,
        fontSize: SIZES.medium,
        padding: 15,
    },
    storyContainer: {
        flexDirection: "row",
        paddingHorizontal: 15,
        marginBottom: 10,
    },
    storyName: {
        fontFamily: FONTS.regular,
        fontSize: 14,
        color: textPrimaryColor,
        paddingLeft: 10,
    },
    companyContainer: {
        flexDirection: "row",
        marginTop: 20,
        marginLeft: 15,
        alignItems: "center",
    },
    companyName: {
        fontFamily: FONTS.regular,
        marginLeft: 10,
        color: textPrimaryColor,
        fontSize: 18,
    },
})

export default SearchComponent;
