import React, {useContext} from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

import {Button} from '../../components/Button';
import {Reviews} from '../components/Reviews';
import {setCurrentRecipient} from '../../store/slices/messages/messagesSlice';
import {ChatContext} from '../../Messages/context/ChatContext';
import {repetsAPI} from '../../api';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const DetailPehouseScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {socket} = useContext(ChatContext);

  const {selectedPethouse} = useSelector(state => state.pethouses);
  const {uid} = useSelector(state => state.auth);

  const {nombre, apellido} = selectedPethouse.propietario;

  const onPressJoinChat = () => {
    try {
      const {data} = repetsAPI.get(
        `/mensajes/${uid}/${selectedPethouse.propietario._id}`,
      );
      console.log(data);
      dispatch(
        setCurrentRecipient({
          uid: selectedPethouse.propietario._id,
          pethouse: selectedPethouse,
          user: selectedPethouse.propietario,
          avatar: selectedPethouse.galeria[0],
        }),
      );

      navigation.navigate('ChatScreen');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Image
          style={styles.imageStyle}
          source={{uri: selectedPethouse.galeria[0]}}
        />
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.backButton}
          onPress={() => navigation.pop()}>
          <Icon name="arrow-back-outline" size={25} color="black" />
        </TouchableOpacity>
      </View>
      <ScrollView style={{paddingHorizontal: 10, marginTop: 15}}>
        <Text style={styles.textBold}>{selectedPethouse.nombre}</Text>

        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{flexDirection: 'row'}}>
            <Icon
              name="star"
              size={15}
              color="black"
              style={{marginRight: 5}}
            />
            <Text>4.7</Text>
          </View>

          <Text style={styles.textRegular}>
            {selectedPethouse.provincia} {selectedPethouse.distrito}
          </Text>
        </View>

        <View style={styles.line} />

        {/* Descripcion */}
        {/* <Text style={{ ...styles.textRegular,fontSize:14 }}>Lodge para mascotas</Text> */}
        <Text style={{...styles.textRegular, fontSize: 14}}>
          {selectedPethouse.descripcion}
        </Text>

        <View style={styles.line} />

        {/* <View style={{flexDirection:'row'}}>
                    <View style={{flex:1}}>
                        <Text style={styles.textBold}>Reglas</Text>
                        <Text>Ver reglas</Text>
                    </View>
                    <Icon name='chevron-forward' size={20} />
                </View> */}

        {/* <View style={styles.line} /> */}
        <Text style={styles.textBold}>Comentarios</Text>
        <Reviews />

        <View style={styles.line} />

        <Text style={styles.textBold}>
          Hosted by {nombre} {apellido}
        </Text>

        {/* <Text style={{...styles.textRegular, fontSize:14}}>
                    <Icon name='star' size={15} color='black' /> 22 reviews
                </Text> */}

        <View style={{alignItems: 'center', marginVertical: 10}}>
          <Button
            onPress={onPressJoinChat}
            text="Contactar al host"
            stylesProps={styles.button}
            colorText="#2782CA"
          />
        </View>
        <View style={styles.reserveContainer}>
          <View style={{flex: 1}}>
            <Text>
              <Text style={styles.textBold}>
                S/.{selectedPethouse.tarifa_hora} /
              </Text>{' '}
              hora
            </Text>
            <Text>
              <Text style={styles.textBold}>
                S/.{selectedPethouse.tarifa_dia} /
              </Text>{' '}
              dia
            </Text>
            {/* <Text style={{ ...styles.textBold, fontSize: 15 }}>Nov 8 - 15</Text> */}
          </View>
          <Button
            text="Reservar"
            onPress={() => navigation.navigate('ReservationStepsScreen')}
            stylesProps={{
              ...styles.button,
              backgroundColor: '#2782CA',
              width: windowWidth * 0.3,
              borderRadius: 10,
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageStyle: {
    width: windowWidth,
    height: 190,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 15,
    width: 40,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  line: {
    marginVertical: 10, //70
    borderBottomColor: '#b7b7b7',
    borderBottomWidth: StyleSheet.hairlineWidth,
    alignSelf: 'stretch',
  },
  textBold: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 20,
    color: 'black',
  },
  textRegular: {
    fontWeight: '300',
    lineHeight: 17,
    fontSize: 16,
  },
  button: {
    width: windowWidth * 0.8,
    backgroundColor: 'white',
    height: 45,
    borderWidth: 1,
    borderColor: '#2782CA',
  },
  reserveContainer: {
    // width:windowWidth,
    height: 65,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
