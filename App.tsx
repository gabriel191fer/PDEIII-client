import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Alert, ImageBackground, Image } from 'react-native'
import { Camera } from 'expo-camera'
import DocumentPicker from 'react-native-document-picker';

let camera: Camera
export default function App() {
  const [startCamera, setStartCamera] = React.useState(false)
  const [previewVisible, setPreviewVisible] = React.useState(false)
  const [capturedImage, setCapturedImage] = React.useState<any>(null)
  const [cameraType, setCameraType] = React.useState(Camera.Constants.Type.back)
  const [flashMode, setFlashMode] = React.useState('off')


  const axios = require('axios').default



  const __startCamera = async () => {
    const { status } = await Camera.requestPermissionsAsync()
    console.log(status)
    if (status === 'granted') {
      setStartCamera(true)
    } else {
      Alert.alert('Access denied')
    }
  }
  const __takePicture = async () => {
    const photo: any = await camera.takePictureAsync()
    console.log(photo)
    setPreviewVisible(true)
    //setStartCamera(false)
    setCapturedImage(photo)
  }
  const __savePhoto = () => { }
  const __retakePicture = () => {
    setCapturedImage(null)
    setPreviewVisible(false)
    __startCamera()
  }
  const __handleFlashMode = () => {
    if (flashMode === 'on') {
      setFlashMode('off')
    } else if (flashMode === 'off') {
      setFlashMode('on')
    } else {
      setFlashMode('auto')
    }
  }
  const __switchCamera = () => {
    if (cameraType === 'back') {
      setCameraType('front')
    } else {
      setCameraType('back')
    }
  }

  let uploadImage = async () => {
    //Check if any file is selected or not
    if (singleFile != null) {
      //If file selected then create FormData
      const fileToUpload = singleFile;
      const data = new FormData();
      data.append('name', 'Image Upload');
      data.append('file_attachment', fileToUpload);
      let res = await fetch(
        'http://localhost:5000/leaf',
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
        alert('Upload Successful');
      }
    } else {
      //if no file selected the show alert
      alert('Please Select File first');
    }
  };

  const selectFile = async () => {
    // Opening Document Picker to select one file
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      console.log('res : ' + JSON.stringify(res));
      setSingleFile(res);
    } catch (err) {
      setSingleFile(null);
      if (DocumentPicker.isCancel(err)) {
        alert('Canceled');
      } else {
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }

    return (
      <View style={styles.container}>
        {startCamera ? (
          <View
            style={{
              flex: 1,
              width: '100%'
            }}
          >
            {previewVisible && capturedImage ? (
              <CameraPreview photo={capturedImage} sendPhoto={uploadImage} retakePicture={__retakePicture} />
            ) : (
              <Camera
                type={cameraType}
                flashMode={flashMode}
                style={{ flex: 1 }}
                ref={(r) => {
                  camera = r
                }}
              >
                <View
                  style={{
                    flex: 1,
                    width: '100%',
                    backgroundColor: 'transparent',
                    flexDirection: 'row'
                  }}
                >
                  <View
                    style={{
                      position: 'absolute',
                      left: '5%',
                      top: '10%',
                      flexDirection: 'column',
                      justifyContent: 'space-between'
                    }}
                  >
                    <TouchableOpacity
                      onPress={__handleFlashMode}
                      style={{
                        backgroundColor: flashMode === 'off' ? '#000' : '#fff',
                        //borderRadius: '50%',
                        height: 25,
                        width: 25
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 20
                        }}
                      >
                        ⚡️
                      </Text>
                    </TouchableOpacity>



                  </View>
                  <View
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      flexDirection: 'row',
                      flex: 1,
                      width: '100%',
                      padding: 20,
                      justifyContent: 'space-between'
                    }}
                  >
                    <View
                      style={{
                        alignSelf: 'center',
                        flex: 1,
                        alignItems: 'center'
                      }}
                    >
                      <TouchableOpacity
                        onPress={__takePicture}
                        style={{
                          width: 70,
                          height: 70,
                          bottom: 0,
                          borderRadius: 50,
                          backgroundColor: '#fff'
                        }}
                      />
                    </View>
                  </View>
                </View>
              </Camera>
            )}
          </View>
        ) : (
          <View
            style={{
              flex: 1,
              backgroundColor: '#fff',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <View style={{
              backgroundColor: 'gray',
              width: 411,
              height: 60,
              top: -10
            }}>
              <Text style={{
                fontSize: 30,
                paddingTop: 7,
                paddingLeft: 10
              }}>
                Analisador de Tomates
              </Text>

            </View>
            <Text
              style={{
                padding: 15,
                fontSize: 18,
                textAlign: 'center'
              }}
            >
              Bem vindo ao nosso ambiente de avaliação de doenças em tomates, para prosseguir, bata uma foto, ou carregue uma foto da sua galeria.
            </Text>
            <Image source={require('./images/tomato.png')} style={{
              height: 300,
              width: 300,
              margin: 25
            }} />

            <TouchableOpacity
              onPress={__startCamera}
              style={{
                width: 130,
                //borderRadius: 4,
                backgroundColor: '#14274e',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                height: 40
              }}
            >
              <Text
                style={{
                  color: '#fff',
                  fontWeight: 'bold',
                  textAlign: 'center'
                }}
              >
                Tirar Foto
              </Text>



            </TouchableOpacity>
            <TouchableOpacity
              onPress={selectFile}
              style={{
                width: 130,
                //borderRadius: 4,
                backgroundColor: '#14274e',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                height: 40,
                margin: 10,
              }}
            >
              <Text
                style={{
                  color: '#fff',
                  fontWeight: 'bold',
                  textAlign: 'center'
                }}
              >
                Carregar Imagem
              </Text>



            </TouchableOpacity>
            <Text
              style={{
                bottom: 0,
                marginTop: 30
              }}
            >
              powered by m0b1us
            </Text>
          </View>
        )}

        <StatusBar style="auto" />
      </View>
    )
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center'
    }
  })
  
  const CameraPreview = ({ photo, retakePicture, savePhoto }: any) => {
    console.log('sdsfds', photo)
    return (
      <View
        style={{
          backgroundColor: 'transparent',
          flex: 1,
          width: '100%',
          height: '100%'
        }}
      >
        <ImageBackground
          source={{ uri: photo && photo.uri }}
          style={{
            flex: 1
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              padding: 15,
              justifyContent: 'flex-end'
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between'
              }}
            >
              <TouchableOpacity
                onPress={retakePicture}
                style={{
                  width: 130,
                  height: 40,

                  alignItems: 'center',
                  //borderRadius: 4
                }}
              >
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 20
                  }}
                >
                  Bater Outra
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={savePhoto}
                style={{
                  width: 130,
                  height: 40,

                  alignItems: 'center',
                  //borderRadius: 4
                }}
              >
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 20
                  }}
                >
                  Enviar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>
    )
  }
}