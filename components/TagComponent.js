import React from 'react';
import {View, StyleSheet, Text, ScrollView} from 'react-native';

const TagComponent = ({ tags }) => {
    return (
        <ScrollView style={styles.tagScroll}>
            <View style={styles.tagContainer}>
                {tags && tags.map((tag, index) => (
                    <View key={index} style={[styles.tagBackground, { backgroundColor: `${tag.text_color}20` }]}>
                        <Text style={[styles.tagText, { color: tag.text_color }]}>{tag.name}</Text>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    tagScroll: {
        overflow: 'hidden',
        flexDirection: 'row',

    },
    tagContainer: {
        flexDirection: "row",
    },
    tagBackground: {
        alignItems: "flex-start",
        marginRight: 10,
        borderRadius: 6,
    },
    tagText: {
        fontSize: 14,
        paddingHorizontal: 10,
        paddingVertical: 3,
    },
})

export default TagComponent;
