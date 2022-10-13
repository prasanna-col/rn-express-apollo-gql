import * as React from 'react';
import { View, Text, SafeAreaView, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Leftarrow from "../../assets/images/Leftarrow.png"
import { Colors } from '../../assets/styles';
import { Active_Opacity } from '../AppConstants';

const AppHeader = ({
    route,
    navigation,
    onBackPress,
    headerTitle
}) => {

    return (
        <SafeAreaView>
            <View style={styles.heaederView}>
                <TouchableOpacity activeOpacity={Active_Opacity} style={styles.leftIconView} onPress={onBackPress}>
                    <Image source={Leftarrow} style={styles.leftIcon} />
                </TouchableOpacity>
                <View style={styles.headerTextView}>
                    <Text style={styles.headerText}>{headerTitle}</Text>
                </View>
            </View>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    heaederView: {
        height: 50,
        width: "100%",
        paddingHorizontal: 5,
        flexDirection: "row",
        backgroundColor: Colors.statusbarColor
    },
    leftIconView: {
        width: "10%",
        alignItems: 'center',
        justifyContent: 'center'
    },
    leftIcon: {
        height: 20,
        width: 20,
        resizeMode: "contain"
    },
    headerTextView: {
        width: "80%",
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerText: {
        fontSize: 16,
        textAlign: 'center',
        fontWeight: "bold",
        color: "#fff"
    }
});
export default AppHeader;
