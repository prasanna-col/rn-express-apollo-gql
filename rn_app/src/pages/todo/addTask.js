import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { useMutation } from '@apollo/client';

import AppHeader from '../../components/AppHeader'
import AppStatusBar from '../../components/AppStatusBar'
import AppButton from '../../components/AppButton'
import AppTextInput from '../../components/AppTextInput'
import AppContainer from '../../components/AppContainer'
import AppText from '../../components/AppText';
import { CREATE_TODO } from './queries'
import { Colors } from '../../assets/styles';
import { App_borderRadius } from '../../components/AppConstants';


const AddTaskScreen = ({ route, navigation }) => {

    const [addTodo] = useMutation(CREATE_TODO); //  Here createTodo is user defined

    const [name, setname] = useState("");
    const [phone, setPhone] = useState("");
    const [task, setTask] = useState("");

    const on_save = async () => {
        var createdata = {
            text: task,
            name: name,
            phone: phone
        }
        await addTodo({ variables: createdata });
        await navigation.navigate("taskList")

    }

    return (
        <>
            <AppStatusBar />
            <SafeAreaView style={{ flex: 1 }}>
                <AppHeader
                    headerTitle="Create Task"
                    onBackPress={() => {
                        navigation.goBack();
                    }} />
                <AppContainer >
                    <View style={[styles.boxShadow, styles.cardStyle]}>

                        <AppText h3m AppBlack >Assign to</AppText>
                        <AppTextInput onChangeText={val => setname(val)} placeholder={"Name"} defaultValue={name} />

                        <AppText h3m AppBlack >Mobile Number</AppText>
                        <AppTextInput onChangeText={val => setPhone(val)} placeholder={"Phone"} defaultValue={phone} />

                        <AppText h3m AppBlack >Task</AppText>
                        <AppTextInput onChangeText={val => setTask(val)} placeholder={"Task"} defaultValue={task} />
                    </View>
                    <AppButton onPress={() => { on_save() }} title={"Create task"} />
                </AppContainer>
            </SafeAreaView>
        </>

    );
}

export default AddTaskScreen;


const styles = StyleSheet.create({
    boxShadow: {
        marginBottom: 1,
        padding: 4,
        shadowColor: Colors.AppColor,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 3
    },
    cardStyle: {
        backgroundColor: Colors.card_bg,
        borderRadius: App_borderRadius,
        padding: 10,
        marginVertical: 15,
        marginHorizontal: 0
    },
    cardview1: {
        width: "100%",
        flexDirection: "row",
        marginTop: 10
    },
    iconView: {
        width: "10%",
        alignItems: "center"
    },
    iconStyle: {
        height: 25,
        width: 25,
        resizeMode: "contain"
    },
    assignNameView: {
        width: "80%"
    }
});