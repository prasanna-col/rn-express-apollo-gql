import * as React from 'react';
import { View, Text, SafeAreaView, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Menubar from '../../assets/images/Menubar.png'
import addtask2 from '../../assets/images/addtask2.png'
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../../assets/styles';
import { Active_Opacity } from '../AppConstants';

const DrawerHeader = ({
    route,
    headerTitle,
    rytIcon,
    createTask
}) => {
    const navigation = useNavigation();

    const toggleDrawer = () => {
        navigation.toggleDrawer()
    };

    const onRytPress = () => {
        createTask && navigation.navigate('addTask')
    }

    return (
        <SafeAreaView>
            <View style={styles.heaederView}>
                <TouchableOpacity activeOpacity={Active_Opacity} style={styles.leftIconView} onPress={() => toggleDrawer()}>
                    <Image source={Menubar} style={styles.leftIcon} />
                </TouchableOpacity>
                <View style={styles.headerTextView}>
                    <Text style={styles.headerText}>{headerTitle}</Text>
                </View>
                {rytIcon &&
                    <TouchableOpacity activeOpacity={Active_Opacity} style={styles.leftIconView} onPress={() => onRytPress()}>
                        <Image source={addtask2} style={styles.rytIcon} />
                    </TouchableOpacity>
                }

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
        height: 26,
        width: "100%",
        resizeMode: "contain"
    },
    rytIcon: {
        height: 33,
        width: "100%",
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



export default DrawerHeader;
