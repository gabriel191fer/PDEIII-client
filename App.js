import * as React from 'react';
import { Button, View, ScrollView, Text, Image, StyleSheet, Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as ImagePicker from 'expo-image-picker';
import Accordion from 'react-native-collapsible/Accordion';
import { Collapse, CollapseHeader, CollapseBody, AccordionList } from 'accordion-collapse-react-native';

var counter = 0;


const pickImage = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 4],
    quality: 1,
  });

  console.log(result);

  if (!result.cancelled) {
    //setImage(result.uri);
    alert('Imagem Selecionada com sucesso!')
  }
};

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

      <Image source={require('./images/tomato.png')} style={{ height: 300, width: 300, alignSelf: 'center' }} />
      <Pressable style={{ width: 120, height: 40, backgroundColor: 'gray', alignSelf: 'center', borderRadius: 5, marginBottom: 10, marginTop: 50 }} onPress={pickImage}>
        <Text style={{ textAlign: 'center' }}>
          Selecionar Imagem
        </Text>
      </Pressable>

      <Pressable style={{ width: 120, height: 35, backgroundColor: 'gray', alignSelf: 'center', borderRadius: 5, padding: 6 }}
        onPress={() => navigation.navigate('Possível Diagnóstico')}
      >
        <Text style={{ textAlign: 'center' }}>Subir Imagem</Text>
      </Pressable>

      <Text style={{ marginTop: 100 }}>Powered by m0b1us</Text>
    </View>
  );
}

function Healthy({ navigation }) {
  return (
    <View >
      <Image source={require('./images/happy_tomato.png')} style={{ height: 300, width: 300, alignSelf: 'center' }} />
      <Text style={{
        fontSize: 25,
        textAlign: 'center'
      }}>Seu tomate está saudável!!</Text>
    </View>
  );
}

function Inconclusive({ navigation }) {
  return (
    <View >
      <Image source={require('./images/sad_tomato.png')} style={{ height: 300, width: 300, alignSelf: 'center' }} />
      <Text style={{
        fontSize: 25,
        textAlign: 'center'
      }}>Infelizmente seu resultado foi inconclusivo. Tente novamente.</Text>
    </View>
  );
}


function DetailsScreen({ navigation }) {
  return (
    <ScrollView style={{ textAlign: 'center' }}>
      <Image source={require('./images/bacterial.png')} style={{ height: 250, width: 250, alignSelf: 'center' }} />
      <Text style={{ fontSize: 25, textAlign: 'center' }}>Mancha Bacteriana</Text>

      <Collapse>
        <CollapseHeader>
          <View>
            <Text style={{ fontSize: 20, padding: 10, borderBottomColor: 'black', borderBottomWidth: 1 }}>Sintomas</Text>
          </View>
        </CollapseHeader>
        <CollapseBody>
          <Text style={{ fontSize: 14, padding: 12, borderBottomColor: 'black', borderBottomWidth: 1 }}>Estas bactérias atacam a folhagem, caules e frutos do tomateiro. Os primeiros sintomas são pequenas lesões amarelo-esverdeadas nas folhas jovens, que geralmente parecem deformadas e torcidas. Na folhagem mais velha, as lesões são limitadas pelas nervuras adquirindo um aspecto angular ao longo do tempo. Elas são primeiro verde-escuras, gordurosas na aparência e muitas vezes rodeadas por uma ar ́eola amarela. Geralmente, elas surgem mais quantidade nas margens ou nas pontas das folhas. Se as condições forem favoráveis, elas aumentam rapidamente de tamanho de 0.25 a 0.5 cm de largura e ficam castanho-avermelhadas. Eventualmente as manchas se parecem com buracos de tiro porque o centro seca e se desintegra.</Text>
        </CollapseBody>
      </Collapse>

      <Collapse>
        <CollapseHeader>
          <View>
            <Text style={{ fontSize: 20, padding: 8, borderBottomColor: 'black', borderBottomWidth: 1 }}>Causador</Text>
          </View>
        </CollapseHeader>
        <CollapseBody>
          <Text style={{ fontSize: 14, padding: 12, borderBottomColor: 'black', borderBottomWidth: 1 }}>A mancha-bacteriana é causada por várias espécies de bactérias. Ela ocorre em todo mundo e é uma das doenças mais devastadoras em tomates cultivados em ambientes quentes e úmidos. O patógeno pode sobreviver dentro ou sobre sementes, restos culturais e ervas daninhas. Ela tem um período de sobrevivência muito limitado, de dias a semanas no solo. Quando as condições são favoráveis, se espalha através da chuva ou irrigação por aspersão (borrifar) em plantas saudáveis. Ela entre nos tecidos da planta através de poros e feridas. As temperaturas ideais variam de 25 a 30 graus. Assim que a cultura é contaminada, a doença fica muito difícil de ser controlada e pode levar a perdas totais da cultura.</Text>
        </CollapseBody>
      </Collapse>

      <Collapse>
        <CollapseHeader>
          <View>
            <Text style={{ fontSize: 20, padding: 8, borderBottomColor: 'black', borderBottomWidth: 1 }}>Controle Químico</Text>
          </View>
        </CollapseHeader>
        <CollapseBody>
          <Text style={{ fontSize: 14, padding: 12, borderBottomColor: 'black', borderBottomWidth: 1 }}>Sempre considere uma abordagem integrada de medidas preventivas junto com tratamentos biológicos, se disponível. Bactericidas contendo cobre podem ser usados como protetores e conferem um controle parcial da doença. Aplique no primeiro sinal da doença e depois em intervalos de 10 a 14 dias, quando condições quentes e úmidas prevalecem. Como desenvolvimento de resistência ao cobre é frequente, uma combinação de bactericida à base de cobre com mancozebe também é recomendada.</Text>
        </CollapseBody>
      </Collapse>

      <Collapse>
        <CollapseHeader>
          <View>
            <Text style={{ fontSize: 20, padding: 8, borderBottomColor: 'black', borderBottomWidth: 1 }}>Controle Orgânico
            </Text>
          </View>
        </CollapseHeader>
        <CollapseBody>
          <Text style={{ fontSize: 14, padding: 12, borderBottomColor: 'black', borderBottomWidth: 1 }}>A mancha bacteriana é muito difícil e cara para ser tratada. Se a doença ocorrer no início da temporada, considere destruir toda a cultura. Vírus Bacterianos (os chamados bacteriófagos) 10 que matam especificamente essas bactérias estão disponíveis. Mergulhar as sementes por um minuto em 1,3 % de hipoclorito de sódio ou em água quente (50 graus) por 25 minutos pode reduzir a incidência da doença.</Text>
        </CollapseBody>
      </Collapse>

      <Collapse>
        <CollapseHeader>
          <View>
            <Text style={{ fontSize: 20, padding: 8, borderBottomColor: 'black', borderBottomWidth: 1 }}>Medidas Preventivas</Text>
          </View>
        </CollapseHeader>
        <CollapseBody>
          <Text style={{ fontSize: 14, padding: 12, paddingTop: 5 }}>Procure variedade resistentes à doença.</Text>
          <Text style={{ fontSize: 14, padding: 12, paddingTop: 5 }}>Plante sementes certificadas e livre de doenças.</Text>
          <Text style={{ fontSize: 14, padding: 12, paddingTop: 5 }}>Are ou remova os restos culturais após a colheita.</Text>
          <Text style={{ fontSize: 14, padding: 12, paddingTop: 5 }}>Planeje uma solarização do solo após a colheita.</Text>
          <Text style={{ fontSize: 14, padding: 12, paddingTop: 5 }}>Limpe ferramentas e equipamentos."</Text>
          <Text style={{ fontSize: 14, padding: 12, paddingTop: 5 }}>Cubra o solo com folhas para evitar a contaminação dele para as plantas.</Text>
        </CollapseBody>
      </Collapse>
    </ScrollView>
  );
}

const selector = async () => {
  console.log(counter)
  if (counter == 0) {
    () => navigation.navigate('Possível Diagnóstico')
  } else if (counter == 1) {
    navigation.navigate('Healthy')
  } else if (counter == 2) {
    navigation.navigate('Inconclusive')
  }
  counter++;
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Analisador de Tomates">
        <Stack.Screen name="Analisador de Tomates" component={HomeScreen} cardStyle={{ backgroundColor: 'gray' }} />
        <Stack.Screen name="Saudável" component={Healthy} />
        <Stack.Screen name="Inconclusivo" component={Inconclusive} />
        <Stack.Screen name="Possível Diagnóstico" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;


