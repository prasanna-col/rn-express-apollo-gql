// React Native Navigation Drawer
// https://aboutreact.com/react-native-navigation-drawer/
import React, { useEffect, useState, useCallback } from 'react';
import { Button, View, Text, SafeAreaView, Image } from 'react-native';
import { BASE_URL } from '../app.config';
import { ApolloClient, InMemoryCache, gql, useQuery, useMutation } from '@apollo/client';
import AppButton from '../components/AppButton';
import AppText from '../components/AppText';
import { READ_DATA, ADD_DATA_MUTATION, UPLOAD_IMAGE, UploadFileMutation } from "../pages/todo/queries"
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';

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

  const [selectedImage, setSelectedImage] = useState(null);
  const [base64Img, setBase64Img] = useState(null);
  const [ImageStoredData, setImageStoredData] = useState({});
  const [uploadImage] = useMutation(UPLOAD_IMAGE);
  const [uploadImagebase64] = useMutation(UploadFileMutation);

  // Create a FormData instance to hold the selected image data
  const formData = new FormData();
  formData.append('file', {
    uri: selectedImage,
    type: 'image/jpeg',
    name: 'image.jpg',
  });

  const uploadFile = async () => {
    // Method: 1
    // console.log("formData", formData)
    // const response = await uploadImage({
    //   variables: { file: formData },
    // });
    // console.log(response.data.uploadImage.url);

    // Method: 2

    const file = `data:image/jpeg;base64,${base64Img}`;
    const response = await uploadImagebase64({
      variables: { file }
    })
    // const response = await client.mutate({
    //   mutation: uploadFileMutation,
    //   variables: {
    //     file,
    //   },
    // });
    console.log("response", response)
    setImageStoredData(response?.data?.uploadFile)
  };

  const pickFile = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      setSelectedImage(result[0]?.uri)
      RNFS.readFile(result[0]?.uri, 'base64')
        .then(res => {
          setBase64Img(res)
          console.log("base64 data", res);
          setImageStoredData({})
        });
      console.log("image data", result)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ alignItems: "center", marginTop: "10%" }}>
        {
          selectedImage ?
            <Image
              style={{ width: 66, height: 66 }}
              source={{ uri: selectedImage }}
            />
            : null
        }
        <AppButton
          style={{ width: "50%" }}
          onPress={() => { (selectedImage && !ImageStoredData?.url) ? uploadFile() : pickFile() }}
          title={(selectedImage && !ImageStoredData?.url) ? "Upload image" : "Select image"}
        />
        {
          ImageStoredData?.url ?
            <AppText>Dowload Link: {ImageStoredData?.url}</AppText>
            : null
        }
        <AppButton
          style={{ width: "50%" }}
          onPress={() => {
            on_save();
          }}
          title={"Add Obj & Arr data"}
        />
      </View>

      <View style={{ flex: 1, padding: 16 }}>

        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 25, textAlign: 'center', marginBottom: 16 }}> This is the First Page under First Page Option</Text>
          <Button onPress={() => navigation.navigate('SecondPage')} title="Go to Second Page" />
          <Button onPress={() => navigation.navigate('ThirdPage')} title="Go to Third Page" />
        </View>

        <Text style={{ fontSize: 18, textAlign: 'center', color: 'grey' }}>
          React Navigate Drawer
        </Text>

      </View>
    </SafeAreaView>
  );
}

export default FirstPage;
