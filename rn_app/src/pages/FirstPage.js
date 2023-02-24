// React Native Navigation Drawer
// https://aboutreact.com/react-native-navigation-drawer/
import React, { useEffect, useCallback } from 'react';
import { Button, View, Text, SafeAreaView } from 'react-native';
import { BASE_URL } from '../app.config';
import { ApolloClient, InMemoryCache, gql, useQuery, useMutation } from '@apollo/client';
import AppButton from '../components/AppButton';
import { READ_DATA, ADD_DATA_MUTATION } from "../pages/todo/queries"

const FirstPage = ({ navigation }) => {
  const { loading, error, data } = useQuery(READ_DATA);
  if (data) console.log("retrive data", data)
  if (error) console.log("retrive error", error)

  const stringData = 'Hello world';
  const intData = 123;
  const objectData = {
    field1: 'value1',
    field2: 'value2',
  };
  const arrayData = [
    {
      field1: 'value3',
      field2: 'value4',
    },
    {
      field1: 'value5',
      field2: 'value6',
    },
  ];


  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      console.log("FS refresh");
      var { loading, error, data } = useQuery(READ_DATA);
      if (error) console.log("retrive error", error)
      if (data) console.log("retrive data", data)
    });

    return unsubscribe;
  }, [navigation]);


  const [addDATA] = useMutation(ADD_DATA_MUTATION, {
    refetchQueries: [{ query: READ_DATA }],
  });

  const on_save = async () => {
    addDATA({ variables: { stringData, intData, objectData, arrayData } })
      .then(result => {
        console.log('Mutation result:', result);
      })
      .catch(error => {
        console.error('Mutation error:', error);
      });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>

      <AppButton
        onPress={() => {
          on_save();
        }}
        title={"Save"}
      />
      <View style={{ flex: 1, padding: 16 }}>

        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 25, textAlign: 'center', marginBottom: 16 }}> This is the First Page under First Page Option</Text>
          <Button onPress={() => navigation.navigate('SecondPage')} title="Go to Second Page" />
          <Button onPress={() => navigation.navigate('ThirdPage')} title="Go to Third Page" />
        </View>

        <Text style={{ fontSize: 18, textAlign: 'center', color: 'grey' }}>
          React Navigate Drawer
        </Text>
        <Text style={{ fontSize: 16, textAlign: 'center', color: 'grey' }}>
          www.aboutreact.com
        </Text>
      </View>
    </SafeAreaView>
  );
}

export default FirstPage;
