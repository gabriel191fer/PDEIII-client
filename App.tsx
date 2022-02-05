import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform, TouchableOpacity, Text, StyleSheet, Pressable } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const axios = require('axios').default;

export default function ImagePickerExample() {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);
    alert('Imagem selecionada com Sucesso!')

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const uploadImage = async () => {
    // Check if any file is selected or not
    if (image != null) {
      // If file selected then create FormData
      const fileToUpload = image;
      const data = new FormData();
      data.append('image', fileToUpload);

      const test = await axios.post('http://tomatoapi-env.eba-pnwe8e3p.us-east-1.elasticbeanstalk.com/leaf',{
        data: data,
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log('dados : ', test)

      // let adress = 'http://172.20.0.3:5000/'
      // let res = await fetch(
      //   adress,
      //   {
      //     method: 'post',
      //     body: data,
      //     headers: {
      //       'Content-Type': 'multipart/form-data; ',
      //     },
      //   }
      // );
      // let responseJson = await res.json();
      // if (responseJson.status == 1) {
      //   alert('Carregamento concluído');
      // }
    } else {
      alert('Por favor Selecione um arquivo');
    }
  };

  return (
    <View>

      
    <Text style={{
          marginTop:15,
          textAlign:'center',
          fontSize:25,
          backgroundColor: 'gray',
          paddingBottom: 10,
          paddingTop: 10
        }}>
          Analisador de Tomates
        </Text>
        <Image source={require('./images/tomato.png')} style={{ height: 300, width: 300, alignSelf: 'center', marginTop: 50}} />
    
      

      <Pressable style={{ width: 120, height:40, backgroundColor: 'gray', alignSelf:'center', borderRadius: 5, marginBottom: 10, marginTop: 50}} onPress={pickImage}>
          <Text style={{ textAlign: 'center' }}>
            Selecionar Imagem
          </Text>
      </Pressable>
      {/*{image && <Image source={{ uri: image }} style={{ width: 256, height: 256 }} />} */}

      <Pressable style={{ width: 120, height:35, backgroundColor: 'gray', alignSelf:'center', borderRadius: 5, padding:6}}
        onPress={uploadImage}>
        <Text style={{ textAlign: 'center' }}>Subir Imagem</Text>
      </Pressable>

      <Text style={{textAlign: 'center', marginTop: 110}}>
        Powered by m0b1us
      </Text>


    
    
  </View>
    
  );

  
}
