import {TextInput, View, StyleSheet} from "react-native";
import {textColor3, textPrimaryColor} from "./ColorsComponent";


export default function NewInputComponent({value, onChangeText, maxLength, placeholder}) {
    return (
        <View>
            <TextInput
                style={styles.input}
                onChangeText={onChangeText}
                value={value}
                maxLength={maxLength}
                placeholder={placeholder}
                keyboardType="numeric"
                cursorColor={textColor3}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        height: 50,
        width: 250,
        backgroundColor: 'rgba(18,17,35,0.5)',
        borderRadius: 50,
        textAlign: "center",
        fontSize: 30,
        fontWeight: "bold",
        color: textPrimaryColor,
        marginVertical: 10,
    }
})