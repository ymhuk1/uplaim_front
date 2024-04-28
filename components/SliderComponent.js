import React, { memo } from 'react';
import {View, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';
import GridComponent from './GridComponent';

const SliderComponent = ({ data, itemsPerSlide, itemHeight, slideHeight, myCompany, partners, coupon, companySlider, addCompany, qrcode, hide }) => {
    return (
        <Swiper
            style={[styles.wrapper, { height: slideHeight }]}
            dot={<View style={styles.dot}/>}
            activeDot={<View style={styles.activeDot}/>}
            loop={false}
        >
            {data.map((items, index) => (

                <View style={styles.slide1} key={index}>
                    <GridComponent data={items} itemsPerSlide={itemsPerSlide} itemHeight={itemHeight} myCompany={myCompany} partners={partners} coupon={coupon} companySlider={companySlider} addCompany={addCompany} qrcode={qrcode} hide={hide}/>
                </View>

            ))}
        </Swiper>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        height: 600,
        marginBottom: 30,
    },
    slide1: {
    },
    text: {},
    dot: {
        backgroundColor: 'rgba(255,255,255,.05)',
        width: 8,
        height: 8,
        borderRadius: 4,
        marginLeft: 3,
        marginRight: 3,
        marginTop: 3,
        marginBottom: 3,
    },
    activeDot: {
        backgroundColor: 'rgba(255,255,255,.2)',
        width: 16,
        height: 8,
        borderRadius: 4,
        marginLeft: 3,
        marginRight: 3,
        marginTop: 3,
        marginBottom: 3,
    },
});

export default memo(SliderComponent);
