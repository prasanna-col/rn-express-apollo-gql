import React, { useState } from "react";
import { SafeAreaView, StyleSheet, View, } from "react-native";
import AppHeader from "../../../components/AppHeader";
import AppStatusBar from "../../../components/AppStatusBar";
import AppButton from "../../../components/AppButton";
import AppTextInput from "../../../components/AppTextInput";
import AppContainer from "../../../components/AppContainer";
import AppText from "../../../components/AppText";
import { CREATE_STUDENT, READ_STUDENT } from "../queries";
import { Colors } from "../../../assets/styles";
import { App_borderRadius } from "../../../components/AppConstants";
import { useQuery, useMutation } from "@apollo/client";


const AddStudentScreen = ({ route, navigation }) => {

  //  Here createStudent is user defined
  const [addStud] = useMutation(CREATE_STUDENT, {
    refetchQueries: [{ query: READ_STUDENT }],
  });

  const [name, setname] = useState("");
  const [contact, setContact] = useState("");
  const [qualification, setQualification] = useState("");

  const on_save = async () => {

    var createdata = {
      name: name,
      contact: contact,
      qualification: qualification,
      books: []
    };

    await addStud({ variables: createdata }).then((res) => {
      console.log("res", res)
      navigation.navigate("StudentListScreen");
    }).catch((err) => {
      console.log("err", err)
    });

  };

  return (
    <>
      <AppStatusBar />
      <SafeAreaView style={{ flex: 1 }}>
        <AppHeader
          headerTitle="Register Student"
          onBackPress={() => {
            navigation.goBack();
          }}
        />
        <AppContainer>
          <View style={[styles.boxShadow, styles.cardStyle]}>
            <AppText h3m AppBlack>
              Student name
            </AppText>
            <AppTextInput
              onChangeText={(val) => setname(val)}
              placeholder={"Full name"}
              defaultValue={name}
            />

            <AppText h3m AppBlack>
              contact Number
            </AppText>
            <AppTextInput
              onChangeText={(val) => setContact(val)}
              placeholder={"Phone"}
              defaultValue={contact}
            />

            <AppText h3m AppBlack>
              Highest Qualification
            </AppText>
            <AppTextInput
              onChangeText={(val) => setQualification(val)}
              placeholder={"Eg: B.E/ B.Tech/ HSC/ SSLC"}
              defaultValue={qualification}
            />

          </View>
          <AppButton
            onPress={() => {
              on_save();
            }}
            title={"Sign Up"}
          />
        </AppContainer>
      </SafeAreaView>
    </>
  );
};

export default AddStudentScreen;

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
