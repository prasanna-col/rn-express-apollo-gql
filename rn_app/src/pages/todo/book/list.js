import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, StyleSheet, FlatList, Image, TouchableOpacity } from "react-native";
import AppHeader from "../../../components/AppHeader"
import AppStatusBar from "../../../components/AppStatusBar";
import AppContainer from "../../../components/AppContainer";
import { useQuery, useMutation } from "@apollo/client";
import AppText from "../../../components/AppText";
import { READ_STUDENT, REMOVE_STUD } from "../queries";
import { Colors } from "../../../assets/styles";
import { App_borderRadius } from "../../../components/AppConstants";
import AppCardIcons from "../../../components/AppCardIcons";
import AppButton from "../../../components/AppButton";

const StudentListScreen = ({ route, navigation }) => {
    // useQuery -- to get the data from server
    // useMutation -- to push data or update on server.

    const { loading, error, data } = useQuery(READ_STUDENT);
    console.log("READ_STUDENT data-->", data);

    const [studentData, setStudentData] = useState([]);
    const [Loader, setLoader] = useState(true);

    const getTask = async () => {
        setStudentData([...[], ...data?.studentQuery]);
        setLoader(false);
    };

    console.log("student data-->", data);

    useEffect(() => {
        getTask();
    }, [data]);

    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", async () => {
            console.log("list refresh");
            if (error) {
                console.log("error", error)
                setLoader(false)
            }
            // useQuery(READ_STUDENT)
            //     .then((data) => {
            //         console.log("then", data);
            //     })
            //     .catch((e) => {
            //         console.log("e", e);
            //     });
            // const usequery_data = useQuery(READ_STUDENT);
            // console.log("usequery_data", usequery_data);

            setStudentData([...[], ...data?.studentQuery]);
            setLoader(false);
        });

        return unsubscribe;
    }, [navigation]);

    const [delete_stud] = useMutation(REMOVE_STUD, {
        refetchQueries: [{ query: READ_STUDENT }],
    });

    const onDeleteTask = (taskid, index) => {
        console.log("taskid", taskid)
        delete_stud({ variables: { id: taskid } });
    };

    const SortbyOldestFirst = (array) => {
        return array
            .reverse()
            .sort(function (a, b) {
                return new Date(b.date) - new Date(a.date);
            })
            .reverse();
    };

    const renderTasks = ({ item, key }) => {
        return (
            <View
                style={[
                    styles.cardStyle,
                    styles.boxShadow,
                    {
                        backgroundColor: Colors.card_bg,
                        borderWidth: 0,
                        borderColor: Colors.AppColor
                    },
                ]}
            >
                <View style={styles.cardview1}>
                    <View style={styles.assignNameView}>
                        <AppText h2m semibold>
                            ❝{item?.name}❞
                        </AppText>

                    </View>

                    <View style={styles.iconView}>
                        <AppCardIcons
                            edittask2_icon
                            onPress={() => {
                                navigation.navigate("edit student", item);
                            }}
                        />
                    </View>

                    <View style={styles.iconView}>
                        <AppCardIcons
                            deleteTask_icon
                            onPress={() => {
                                onDeleteTask(item.id, key);
                            }}
                        />
                    </View>
                </View>

                <AppText h3 mt2 italic >
                    🎓: {item?.qualification}
                </AppText>
                <AppText h3 mt2 italic underline>
                    Books
                </AppText>
                {(item?.books).length ?
                    (item?.books).map((val, key) => {
                        return (
                            <AppText h3m mt2 ml2 grey italic>
                                {key + 1}. {val?.text}
                            </AppText>
                        )
                    })
                    :
                    <AppText h3m mt2 ml2 gray >
                        no book
                    </AppText>
                }

            </View>
        );
    };

    return (
        <>
            <AppStatusBar />
            <SafeAreaView style={{ flex: 1 }}>
                <AppHeader
                    headerTitle="Student Details"
                    onBackPress={() => {
                        navigation.goBack();
                    }}
                />

                {Loader ? (
                    <AppContainer>
                        <AppText h3 AppBlack>
                            Loading...
                        </AppText>
                    </AppContainer>
                ) : (
                    <AppContainer>
                        <AppText h2m AppBlack bold>
                            Student status 👇
                        </AppText>
                        <View style={{ alignItems: "flex-end", justifyContent: "center" }}>
                            <TouchableOpacity onPress={() => {
                                navigation.navigate("Register student")
                            }}>
                                <Text style={{ color: "blue", textDecorationLine: "underline" }}>Add student</Text>
                            </TouchableOpacity>
                        </View>
                        <FlatList
                            style={{ marginBottom: 160 }}
                            data={SortbyOldestFirst(studentData)}
                            keyExtractor={(item, index) => index.toString()}
                            enableEmptySections={true}
                            renderItem={renderTasks}
                        />
                    </AppContainer>
                )}
            </SafeAreaView>
        </>
    );
};

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
    completedShadow: {
        marginBottom: 1,
        padding: 4,
        shadowColor: Colors.completed,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 3,
    },
    cardStyle: {
        backgroundColor: Colors.card_bg,
        borderRadius: App_borderRadius,
        paddingHorizontal: 5,
        marginVertical: 15,
        marginHorizontal: 8,
    },

    cardview1: { width: "100%", flexDirection: "row", marginTop: 10 },
    iconView: { width: "10%", alignItems: "center" },
    iconStyle: { height: 25, width: 25, resizeMode: "contain" },
    assignNameView: { width: "80%" },
});
export default StudentListScreen;
