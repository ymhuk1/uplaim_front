import {Text, TouchableOpacity, View} from "react-native";
import {Image} from "expo-image";


export default function NewCheckboxComponent({ isChecked, onToggle, title }) {

    const handleCheckboxToggle = () => {
        onToggle(!isChecked);
    };

    return (
        <View>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: 250,
                }}>
                <TouchableOpacity onPress={handleCheckboxToggle}>
                    <View
                        style={{
                            width: 24,
                            height: 24,
                            borderRadius: 3,
                            borderWidth: 2,
                            borderColor: 'rgba(18, 17, 35, 1)',
                            backgroundColor: isChecked ? 'rgba(18, 17, 35, 1)' : 'rgba(18, 17, 35, 1)',
                        }}>
                        {isChecked && (
                            <View
                                style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                <Image
                                    contentFit="contain"
                                    contentPosition="center"
                                    source={ require('../assets/check.svg') }
                                    width={13}
                                    height={9}
                                />
                            </View>
                        )}
                    </View>
                </TouchableOpacity>
                <Text style={{ marginLeft: 8, color: 'rgba(255, 255, 255, 0.2)' }}>{title}</Text>
            </View>
        </View>
    );
}