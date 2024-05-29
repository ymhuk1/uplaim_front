import React from 'react';
import {View, TouchableOpacity, Linking, StyleSheet} from 'react-native';
import {Image} from "expo-image";

const SocialLinkComponent = ({ links }) => {

    if (!Array.isArray(links)) {
        console.error('Неверный формат данных для links:', links);
        return null;
    }

    const handleLinkPress = (url) => {
        Linking.canOpenURL(url).then((supported) => {
            if (supported) {
                Linking.openURL(url);
            } else {
                console.log(`Не удалось открыть URL: ${url}`);
            }
        });
    };

    const socialIcons = [
        { icon: <Image source={require('../assets/social/World.svg')}
                       width={48} height={48} style={styles.socialLogo} />, linkKey: 'link_1' },
        { icon: <Image source={require('../assets/social/VK.svg')}
                       width={48} height={48} style={styles.socialLogo} />, linkKey: 'link_2' },
        { icon: <Image source={require('../assets/social/Instagram.svg')}
                       width={48} height={48} style={styles.socialLogo} />, linkKey: 'link_3' },
        { icon: <Image source={require('../assets/social/OK.svg')}
                       width={48} height={48} style={styles.socialLogo} />, linkKey: 'link_4' },
        { icon: <Image source={require('../assets/social/Telegram.svg')}
                       width={48} height={48} style={styles.socialLogo} />, linkKey: 'link_5' },
    ];

    return (
        <View style={styles.socialLogoContainer}>
            {links.map((link, index) => (
                <View key={index} style={styles.socialIconWrapper}>
                    {socialIcons.map(({ icon, linkKey }) => (
                        link[linkKey] && (
                            <TouchableOpacity style={styles.socialItem}
                                              key={linkKey}
                                              onPress={() => handleLinkPress(link[linkKey])}>
                                {icon}
                            </TouchableOpacity>
                        )
                    ))}
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    socialLogoContainer: {
        marginBottom: 25,
    },
    socialIconWrapper: {
        flexDirection: "row",
    },
    socialItem: {
        marginRight: 15,
    },
})

export default SocialLinkComponent;
