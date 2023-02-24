import React, { useState } from "react";
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Switch,
  TouchableOpacity,
  View,
} from "react-native";
import AppHeader from "../../../components/AppHeader";
import AppStatusBar from "../../../components/AppStatusBar";
import AppButton from "../../../components/AppButton";
import AppTextInput from "../../../components/AppTextInput";
import AppContainer from "../../../components/AppContainer";
import AppText from "../../../components/AppText";
import { CREATE_STUDENT, READ_STUDENT, READ_TODOS } from "../queries";
import { Colors } from "../../../assets/styles";
import { App_borderRadius } from "../../../components/AppConstants";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { DateFormet } from "../../../utils/DateFormet";
import { useQuery, useMutation } from "@apollo/client";
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { BASE_URL } from "../../../app.config";

const client = new ApolloClient({
  uri: BASE_URL,
  cache: new InMemoryCache(),
});

const AddStudentScreen = ({ route, navigation }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState("");
  const [ispriority, setIspriority] = useState(false);

  const toggleSwitch = () => {
    setIspriority((previousState) => !previousState);
  };


  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    console.log("A date has been picked: ", date);
    setDate(date);
    hideDatePicker();
  };
  //  Here createStudent is user defined
  const [addStud] = useMutation(CREATE_STUDENT, {
    refetchQueries: [{ query: READ_STUDENT }],
  });

  const [name, setname] = useState("");
  const [contact, setContact] = useState("");
  const [qualification, setQualification] = useState("");

  const on_save = async () => {
    var createdata = {
      qualification: qualification,
      name: name,
      contact: contact,
      books: [
        {
          "id": "BOOK_1",
          "text": "Thirukural",
          "author": "Thiruvalluvar"
        }
      ]
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
