import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { FONTS } from '../constants/theme';


const QRCodeGenerator = ({ data, size, logoSize, style }) => {
    let logoFromFile = require("../assets/logoqrcode.png");
    const textComponent = data ? (
        <Text style={styles.codeText}>{data}</Text>
    ) : null;
    return (
        <View style={styles.container}>
            <QRCode
                value={data}
                size={size}
                color="#9B51E0"
                backgroundColor="transparent"
                style={style}
                logo={logoFromFile}
                logoSize={logoSize}
            />
            {textComponent}
        </View>
    );
};

const styles = StyleSheet.create({
    codeText:{
        marginVertical: 20,
        fontSize: 30,
        fontFamily: FONTS.medium,
        color: "white",
        justifyContent: "center",
        textAlign: "center",
    },
    }
)

export default QRCodeGenerator;
