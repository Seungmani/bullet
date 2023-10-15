// basic
import React, { useState, memo, useCallback, useContext, useEffect } from "react";
import {
    Text, Image, View, Pressable, StyleSheet
} from 'react-native';

// install
import { useNavigation } from "@react-navigation/native";

// from App.js

// data

const Register = memo(() => {
    const navigation = useNavigation();

    // 뉴스 선택
    onPressNews = useCallback(() => {
        navigation.navigate('NewsSite');
    }, [])

    // 공지사항 선택
    onPressNotice = useCallback(() => {
        navigation.navigate('UniSite');
    }, [])

    // 직업 선택
    onPressJob = useCallback(() => {
        navigation.navigate('WorkSite');
    }, [])

    return (
        <View style={{ ...styles.container }}>
            <View style={styles.moveCompo}>
                <Pressable style={{ ...styles.press }} onPress={onPressNews}>
                    <Image style={{ ...styles.image }} source={require('../../assets/icon.png')} />
                    <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>뉴스 사이트 선택</Text>
                </Pressable>
                <View style={{flex:0.3}}></View>
                <Pressable style={{ ...styles.press }} onPress={onPressNotice}>
                    <Image style={{ ...styles.image }} source={require('../../assets/icon.png')} />
                    <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>대학교 사이트 선택</Text>
                </Pressable>
                <View style={{flex:0.3}}></View>
                <Pressable style={{ ...styles.press }} onPress={onPressJob}>
                    <Image style={{ ...styles.image }} source={require('../../assets/icon.png')} />
                    <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>취업 사이트 선택</Text>
                </Pressable>
            </View>
        </View>
    )
})

export default Register;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',

        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',

        backgroundColor: "white",
    },
    moveCompo: {
        width: '75%',
        height: '50%',
    },
    press: {
        flex: 1,
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',

        backgroundColor: 'black',

        borderRadius: 20,
    },
    image: {
        width: 60,
        height: 60,
        marginRight: 15,
    }
});