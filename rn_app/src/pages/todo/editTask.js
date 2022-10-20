import React, { useState } from "react";
import { SafeAreaView, StyleSheet, View, Switch, TouchableOpacity } from "react-native";
import { useMutation } from "@apollo/client";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import AppHeader from "../../components/AppHeader";
import AppStatusBar from "../../components/AppStatusBar";
import AppButton from "../../components/AppButton";
import AppTextInput from "../../components/AppTextInput";
import AppContainer from "../../components/AppContainer";
import AppText from "../../components/AppText";
import { READ_TODOS, UPDATE_TODO } from "./queries";
import { Colors } from "../../assets/styles";
import { App_borderRadius } from "../../components/AppConstants";
import { DateFormet } from "../../utils/DateFormet";

const EditTaskScreen = ({ route, navigation }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const taskData = route.params;
  const [editTodo] = useMutation(UPDATE_TODO, {
    refetchQueries: [{ query: READ_TODOS }],
  });

  const [name, setname] = useState(taskData?.name || "");
  const [phone, setPhone] = useState(taskData?.phone || "");
  const [task, setTask] = useState(taskData?.text || "");
  const [date, setDate] = useState(taskData?.date || new Date());
  const [time, setTime] = useState(taskData?.time || "02:30 PM");
  const [ispriority, setIspriority] = useState(taskData?.priority);

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

  const on_update = async () => {
    var editdata = {
      id: taskData.id,
      text: task,
      name: name,
      phone: phone,
      date: date,
      // time: time,
      priority: ispriority,
    };
    console.log("testbtn..", editdata);
    await editTodo({ variables: editdata });
    await navigation.navigate("taskList");
  };

  return (
    <>
      <AppStatusBar />
      <SafeAreaView style={{ flex: 1 }}>
        <AppHeader
          headerTitle="Edit Task"
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
                <TouchableOpacity onPress={showDatePicker}>
                  <AppText h3m AppBlack2 mt1 bold>
                    {DateFormet(date)}
                  </AppText>
                </TouchableOpacity>
              </View>
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="datetime"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
              />
            </View>

            <View
              style={{
                flexDirection: "row",
                marginTop: 30,
                alignItems: "center",
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
          <AppButton
            onPress={() => {
              on_update();
            }}
            title={"Update & save"}
          />
        </AppContainer>
      </SafeAreaView>
    </>
  );
};

export default EditTaskScreen;

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
