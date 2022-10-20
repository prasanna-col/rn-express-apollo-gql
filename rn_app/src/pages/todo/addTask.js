import React, { useState } from "react";
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Switch,
  TouchableOpacity,
  View,
} from "react-native";
import { useMutation } from "@apollo/client";

import AppHeader from "../../components/AppHeader";
import AppStatusBar from "../../components/AppStatusBar";
import AppButton from "../../components/AppButton";
import AppTextInput from "../../components/AppTextInput";
import AppContainer from "../../components/AppContainer";
import AppText from "../../components/AppText";
import { CREATE_TODO, READ_TODOS } from "./queries";
import { Colors } from "../../assets/styles";
import { App_borderRadius } from "../../components/AppConstants";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { DateFormet } from "../../utils/DateFormet";

const AddTaskScreen = ({ route, navigation }) => {
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
  //  Here createTodo is user defined
  const [addTodo] = useMutation(CREATE_TODO, {
    refetchQueries: [{ query: READ_TODOS }],
  });

  const [name, setname] = useState("");
  const [phone, setPhone] = useState("");
  const [task, setTask] = useState("");

  const on_save = async () => {
    var createdata = {
      text: task,
      name: name,
      phone: phone,
      date: date ==="" ? new Date() : date,
      priority: ispriority
    };
    await addTodo({ variables: createdata });
    await navigation.navigate("taskList");
  };

  return (
    <>
      <AppStatusBar />
      <SafeAreaView style={{ flex: 1 }}>
        <AppHeader
          headerTitle="Create Task"
          onBackPress={() => {
            navigation.goBack();
          }}
        />
        <AppContainer>
          <View style={[styles.boxShadow, styles.cardStyle]}>
            <AppText h3m AppBlack>
              Assign to
            </AppText>
            <AppTextInput
              onChangeText={(val) => setname(val)}
              placeholder={"Name"}
              defaultValue={name}
            />

            <AppText h3m AppBlack>
              Mobile Number
            </AppText>
            <AppTextInput
              onChangeText={(val) => setPhone(val)}
              placeholder={"Phone"}
              defaultValue={phone}
            />

            <AppText h3m AppBlack>
              Task
            </AppText>
            <AppTextInput
              onChangeText={(val) => setTask(val)}
              placeholder={"Task"}
              defaultValue={task}
            />

            <View style={{ flexDirection: "row", width: "100%" }}>
              <View style={{ width: "45%", marginRight: 25 }}>
                <AppText h3m AppBlack>
                  Date Time
                </AppText>
                <View>
                  <TouchableOpacity onPress={showDatePicker}>
                    <AppText h3m AppBlack2 mt1 bold>
                      {date === "" ? DateFormet(new Date()) : DateFormet(date)}
                    </AppText>
                  </TouchableOpacity>

                  <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="datetime"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                  />
                </View>
              </View>

              <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: "auto"
              }}
            >
              <AppText h3 AppBlack bold>
                Priority
              </AppText>
              <Switch
                style={{
                  marginLeft: 10,
                  transform: [{ scaleX: 0.9 }, { scaleY: 0.6 }],
                }}
                trackColor={{ false: "#767577", true: Colors.AppColorLight }}
                thumbColor={ispriority ? Colors.AppColor : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={ispriority}
              />
            </View>
            </View>
          </View>
          <AppButton
            onPress={() => {
              on_save();
            }}
            title={"Create task"}
          />
        </AppContainer>
      </SafeAreaView>
    </>
  );
};

export default AddTaskScreen;

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
