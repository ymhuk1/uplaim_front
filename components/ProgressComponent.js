import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Circle, G, Svg } from 'react-native-svg';

const ProgressComponent = ({ progress, color }) => {
    const svgSize = 64;
    const radius = svgSize / 2;
    const circumference = 2 * Math.PI * radius;
    const dashoffsetGray = ((100 - progress) / 100) * circumference; // Вычисляем dashoffset для серого круга
    const dashoffsetGreen = circumference - dashoffsetGray; // Вычисляем dashoffset для зеленого круга

    return (
        <View style={styles.container}>
            <Svg width={svgSize} height={svgSize} viewBox={`0 0 ${svgSize} ${svgSize}`}>
                <G>
                    <Circle
                        cx={radius}
                        cy={radius}
                        r={radius - 2}
                        fill="none"
                        stroke="#56da7b"
                        strokeWidth={4}


                    />
                    <Circle
                        cx={radius}
                        cy={radius}
                        r={radius - 2}
                        fill="none"
                        stroke={color}
                        strokeWidth={4}
                        strokeDasharray={circumference}
                        strokeDashoffset={dashoffsetGreen}
                        transform={`rotate(-90 ${radius} ${radius})`} // Поворачиваем круг на -90 градусов
                        strokeLinecap="round"

                    />
                </G>
            </Svg>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        margin: 5,
    },
});

export default ProgressComponent;
