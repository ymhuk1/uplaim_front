import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FONTS } from '../constants/theme';


const CheckboxComponent = ({ isChecked, onToggle,  error, title }) => {

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
                                    <Text style={{ color: 'white', fontSize: 16 }}>✓</Text>
                            </View>
                        )}
                    </View>
                </TouchableOpacity>
                <Text style={{ marginLeft: 8, color: 'rgba(255, 255, 255, 0.2)', fontFamily: FONTS.regular }}>
                    {title}
                </Text>
            </View>
            <Text style={{ color: 'red', width: 230, }}>{error}</Text>
        </View>
    );
};

export default CheckboxComponent;
