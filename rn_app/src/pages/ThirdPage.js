// React Native Navigation Drawer
// https://aboutreact.com/react-native-navigation-drawer/

import * as React from 'react';
import { Button, View, Text, SafeAreaView, StyleSheet } from 'react-native';

const ThirdPage = ({ route, navigation }) => {

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1, padding: 16 }}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
                    <Text style={{ fontSize: 25, textAlign: 'center', marginBottom: 16 }}> This is Third Page under Second Page Option</Text>
                    <Button onPress={() => navigation.navigate('FirstPage')} title="Go to First Page" />
                    <Button onPress={() => navigation.navigate('SecondPage')} title="Go to Second Page" />
                </View>
                <Text style={{ fontSize: 18, textAlign: 'center', color: 'grey' }}> React Navigate Drawer</Text>
            </View>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    empty: {
        alignItems: "center",
        flexGrow: 1,
        justifyContent: "center",
    },
});

export default ThirdPage;
