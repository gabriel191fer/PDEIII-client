import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform, TouchableOpacity, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

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
      data.append('image', 'Image Upload');
      data.append('image', fileToUpload);

      let adress = 'http://tomatoapi-env.eba-pnwe8e3p.us-east-1.elasticbeanstalk.com/leaf'
      let res = await fetch(
        adress,
        {
          method: 'post',
          body: data,
          headers: {
            'Content-Type': 'multipart/form-data; ',
          },
        }
      );
      let responseJson = await res.json();
      if (responseJson.status == 1) {
        alert('Carregamento concluído');
      }
    } else {
      alert('Por favor Selecione um arquivo');
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Selecionar Imagem" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 256, height: 256 }} />}

      <Button
        onPress={uploadImage}
        title='Subir Image'>
      </Button>


    </View>
  );
}
