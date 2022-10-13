import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, FlatList } from 'react-native';


import DrawerHeader from '../../components/AppHeader/drawerHeader'
import AppStatusBar from '../../components/AppStatusBar'
import AppButton from '../../components/AppButton'
import AppContainer from '../../components/AppContainer'
import { useQuery, useMutation } from '@apollo/client';
import AppText from '../../components/AppText';
import { READ_TODOS, REMOVE_TODO, UPDATE_TODOSTATUS } from './queries'
import { Colors } from '../../assets/styles';

import { App_borderRadius } from '../../components/AppConstants';
import AppCardIcons from '../../components/AppCardIcons';
const TaskListScreen = ({ route, navigation }) => {

  // useQuery -- to get the data from server
  // useMutation -- to push data or update on server.

  const { data, loading, error } = useQuery(READ_TODOS);
  const [deleteTodo] = useMutation(REMOVE_TODO); // deleteTodo is user defined, not to be same as in REMOVE_TODO.
  const [updateTodoStaus] = useMutation(UPDATE_TODOSTATUS);

  const [todoData, setTodoData] = useState([]);
  const [Loader, setLoader] = useState(true);


  const getTask = async () => {
    setTodoData([...[], ...data?.todos])
    setLoader(false)
  }

  console.log("data-->", data)

  const status_view = () => {
    if (loading) return <Text>loading...</Text>;
    if (error) return <Text>ERROR</Text>;
    if (!data) return <Text>Not found</Text>;
    // if (data) return <Text>Connected</Text>;
  }

  useEffect(() => {
    getTask()
  }, [data]);


  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      console.log("refresh")
      useQuery(READ_TODOS).then((data) => {
        console.log("then")
      })
        .catch((e) => {
          console.log("e", e)
        })
      const usequery_data = useQuery(READ_TODOS);
      console.log("usequery_data", usequery_data)
      setTodoData([...[], ...data?.todos])
      setLoader(false)

    });

    return unsubscribe;
  }, [navigation]);


  const onDeleteTask = (taskid) => {
    deleteTodo({ variables: { id: taskid } });
  }

  const comp_notComp = (taskid) => {
    updateTodoStaus({ variables: { id: taskid } })
  }

  const renderTasks = ({ item, key }) => {
    return (
      <View style={[styles.cardStyle, !(item.completed) ? styles.boxShadow : styles.completedShadow, { backgroundColor: !(item.completed) ? Colors.card_bg : Colors.completed2 }]}>
        <View style={styles.cardview1}>

          <View style={styles.assignNameView}>
            {
              !(item.completed) ? // not completed
                <AppText h2m semibold >Assigned to: {item?.name}</AppText>
                :
                <AppText h2m semibold strike gray italic >Assigned to: {item?.name}</AppText>
            }
          </View>

          <View style={styles.iconView}>
            {
              !(item.completed) ?
                <AppCardIcons edittask2_icon onPress={() => { navigation.navigate("editTask", item) }} />
                :
                <AppCardIcons retry_icon onPress={() => { comp_notComp(item.id) }} />
            }
          </View>

          <View style={styles.iconView}>
            <AppCardIcons deleteTask_icon onPress={() => { onDeleteTask(item.id) }} />
          </View>

        </View>
        {
          !(item.completed) ?
            <AppText h3 mt2 italic underline>Task: {item?.text}</AppText>
            :
            <AppText h3 mt2 italic strike gray>Task: {item?.text}</AppText>
        }

        {
          !(item.completed) &&
          <AppButton done onPress={() => { comp_notComp(item.id) }} title={"Done"} />
        }

      </View>
    )
  }

  return (
    <>
      <AppStatusBar />
      <SafeAreaView style={{ flex: 1 }}>
        <DrawerHeader headerTitle={"Tasks"} rytIcon createTask />
        {
          Loader ?
            <AppText h3 AppBlack >Loading...</AppText> :
            <AppContainer >
              <AppText h2m AppBlack bold>Tasks Status</AppText>

              <FlatList
                style={{ marginBottom: 160 }}
                data={todoData}
                keyExtractor={(item, index) => index.toString()}
                enableEmptySections={true}
                renderItem={renderTasks}
              />
            </AppContainer>
        }
      </SafeAreaView>
    </>
  );
}



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
  completedShadow: {
    marginBottom: 1,
    padding: 4,
    shadowColor: Colors.completed,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3
  },
  cardStyle: {
    backgroundColor: Colors.card_bg,
    borderRadius: App_borderRadius,
    paddingHorizontal: 5,
    marginVertical: 15,
    marginHorizontal: 8
  },

  cardview1: { width: "100%", flexDirection: "row", marginTop: 10 },
  iconView: { width: "10%", alignItems: "center" },
  iconStyle: { height: 25, width: 25, resizeMode: "contain" },
  assignNameView: { width: "80%" }
});
export default TaskListScreen;
