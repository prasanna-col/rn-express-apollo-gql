import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, View, Text, Button, Switch, TouchableOpacity } from "react-native";
import { useMutation } from "@apollo/client";
import AppHeader from "../../../components/AppHeader";
import AppStatusBar from "../../../components/AppStatusBar";
import AppButton from "../../../components/AppButton";
import AppTextInput from "../../../components/AppTextInput";
import AppContainer from "../../../components/AppContainer";
import AppText from "../../../components/AppText";
import { READ_STUDENT, UPDATE_STUD } from "../queries";
import { Colors } from "../../../assets/styles";
import { App_borderRadius } from "../../../components/AppConstants";
import { bookstore } from "./bookList";
import Modal from 'react-native-modal';

const EditStudentScreen = ({ route, navigation }) => {
    const studentdata = route.params;
    console.log("studentdata", studentdata)
    const [editStud] = useMutation(UPDATE_STUD, {
        refetchQueries: [{ query: READ_STUDENT }],
    });

    const [isVisible, setIsVisible] = useState(false);

    const [name, setname] = useState(studentdata?.name || "");
    const [contact, setContact] = useState(studentdata?.contact || "");
    const [qualification, setQualification] = useState(studentdata?.qualification || "");
    const [books, setBooks] = useState(studentdata?.books || []);
    const actual_books = studentdata?.books || [];

    const [bookcartIds, setbookcartIds] = useState([]);

    const on_update = async () => {

        var filtered_books = books.map((object) => {
            const { ["__typename"]: removedKey, ...rest } = object;
            return rest;
        }).filter((object) => Object.keys(object).length !== 0);

        var editdata = {
            stud_id: studentdata.id,
            qualification: qualification,
            books: filtered_books
        };
        console.log("editdata", editdata)

        editStud({ variables: editdata }).then((res) => {
            console.log("res", res)
            navigation.navigate("StudentListScreen");
        }).catch((e) => {
            console.log(e)
        })
    };

    const toggleModal = () => {
        setIsVisible(!isVisible);
    };

    useEffect(() => {
        console.log("books", books)
    }, [books])

    useEffect(() => {
        console.log("bookcartIds", bookcartIds)
    }, [bookcartIds])

    return (
        <>
            <AppStatusBar />
            <SafeAreaView style={{ flex: 1 }}>
                <AppHeader
                    headerTitle="Edit Student Details"
                    onBackPress={() => { navigation.goBack() }}
                />
                <AppContainer>
                    <View style={[styles.boxShadow, styles.cardStyle]}>
                        <AppText bold h3m AppBlack>Student name</AppText>
                        <AppTextInput
                            onChangeText={(val) => setname(val)}
                            placeholder={"Name"}
                            defaultValue={name}
                        />

                        <AppText bold h3m AppBlack>Contact</AppText>
                        <AppTextInput
                            onChangeText={(val) => setContact(val)}
                            placeholder={"Phone"}
                            defaultValue={contact}
                        />

                        <AppText bold h3m AppBlack>Qualification</AppText>
                        <AppTextInput
                            onChangeText={(val) => setQualification(val)}
                            placeholder={"Higher qualification"}
                            defaultValue={qualification}
                        />

                        <AppText bold h3m AppBlack>Purchased books</AppText>
                        {
                            studentdata?.books.length ? studentdata?.books?.map((val, key) => {
                                return (
                                    <AppText ml3>{key + 1}. {val?.text}</AppText>
                                )
                            }) :
                                <AppText ml3 gray>No books</AppText>
                        }
                        {
                            studentdata?.books.length != bookstore.length ?
                                <TouchableOpacity onPress={() => { toggleModal() }}>
                                    <AppText textAlignRight bold style={{ color: Colors.AppColor }}>Mₒᵣₑ ᵦₒₒₖₛ?</AppText>
                                </TouchableOpacity>
                                : null
                        }
                    </View>

                    <AppButton
                        onPress={() => { on_update() }}
                        title={"Update & save"}
                    />

                    <Modal isVisible={isVisible}>
                        <View style={{ backgroundColor: "#fff", height: "50%", borderRadius: 10, alignItems: "center" }}>
                            <View style={{ width: "100%", height: "10%", alignItems: "center", justifyContent: "center" }}>
                                <AppText h2m bold>Book List</AppText>
                            </View>
                            {
                                bookstore.map((val, key) => {
                                    return (
                                        <View style={{ width: "100%", marginBottom: 10, paddingHorizontal: 10, borderBottomWidth: 1, marginHorizontal: 10, flexDirection: "row" }}>
                                            <View style={{ width: "70%" }}>
                                                <Text>Book name: {val.name}</Text>
                                                <Text>Author: {val.author}</Text>
                                            </View>
                                            <View style={{ width: "30%" }}>
                                                <TouchableOpacity style={{ width: "80%", backgroundColor: (books.length && books.some((obj) => obj.id === val.id)) ? Colors.gray : bookcartIds.includes(val.id) ? Colors.AppColorLight : Colors.AppColor, alignItems: "center", justifyContent: "center", borderRadius: 10, height: 30 }}
                                                    onPress={() => {
                                                        if (bookcartIds.includes(val.id)) {
                                                            //remove book id
                                                            const filteredArray = bookcartIds.filter((value) => value !== val.id);
                                                            setbookcartIds([...filteredArray])
                                                            //remove book obj
                                                            const filteredArray2 = books.filter(obj => obj.id !== val.id);
                                                            setBooks(filteredArray2)
                                                        }
                                                        else {
                                                            // insert book id
                                                            setbookcartIds(pre => [...pre, val.id])
                                                            setBooks(pre => [...pre, val])
                                                        }
                                                    }}
                                                >
                                                    {
                                                        (actual_books.length && actual_books.some((obj) => obj.id === val.id)) ?
                                                            <Text style={{ color: "#fff" }}>purchased</Text>

                                                            : bookcartIds.includes(val.id) ?
                                                                <Text style={{ color: "#fff" }}>added</Text> :
                                                                <Text style={{ color: "#fff" }}>purchase</Text>
                                                    }

                                                </TouchableOpacity>
                                            </View>


                                        </View>

                                    )
                                })
                            }
                            <View style={{ width: "50%" }}>
                                <AppButton
                                    style={{ width: 200 }}
                                    title={"Close"}
                                    onPress={() => setIsVisible(false)}
                                />
                            </View>

                        </View>
                    </Modal>

                </AppContainer>
            </SafeAreaView>
        </>
    );
};

export default EditStudentScreen;

const styles = StyleSheet.create({
    boxShadow: {
        marginBottom: 1,
        padding: 4,
        shadowColor: Colors.AppColor,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 3,
    },
    cardStyle: {
        backgroundColor: Colors.card_bg,
        borderRadius: App_borderRadius,
        padding: 10,
        marginVertical: 15,
        marginHorizontal: 0,
    },
    cardview1: {
        width: "100%",
        flexDirection: "row",
        marginTop: 10,
    },
    iconView: {
        width: "10%",
        alignItems: "center",
    },
    iconStyle: {
        height: 25,
        width: 25,
        resizeMode: "contain",
    },
    assignNameView: {
        width: "80%",
    },
});
