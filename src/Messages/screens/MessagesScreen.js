import React from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';

import profileDefault from '../../assets/profile_default.jpg';

import {Chat} from '../components/Chat';
import {Title} from '../../components/Title';

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;

export const MessagesScreen = () => {
  const {image} = useSelector(state => state.auth);
  const {chats} = useSelector(state => state.messages);
  const {colors} = useSelector(state => state.theme);

  const ChatsUser = () =>
    chats.map((e, i) => (
      <View key={e.uid} style={{width: '100%'}}>
        <Chat data={e} />
        {i < chats.length ? <View style={styles.line} /> : <></>}
      </View>
    ));

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Title text="Mensajes" />

        <Image
          source={image ? {uri: image} : profileDefault}
          style={{width: 42, height: 42, borderRadius: 50}}
        />
      </View>

      <View style={styles.boxChatListContainer}>
        <Title text="Hospedajes" fontSize={20} />
        <ScrollView contentContainerStyle={{alignItems: 'center'}}>
          {!chats || chats.length < 1 ? (
            <Text style={{fontSize: 18, color: colors.text2}}>
              No hay chats
            </Text>
          ) : (
            <ChatsUser />
          )}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 39,
  },
  titleContainer: {
    width: windowWidth * 0.9,
    paddingHorizontal: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  boxChatListContainer: {
    paddingVertical: 11,
    paddingHorizontal: 17,
    marginTop: 16,
    width: windowWidth * 0.9,
    borderRadius: 25,
    boxSizing: 'border-box',
    borderWidth: 1,
    borderColor: '#2782CA',
    height: windowHeight * 0.35,
    maxHeight: windowHeight * 0.35,
  },
  line: {
    width: '100%',
    borderBottomColor: 'rgba(180, 171, 171, 0.66)',
    borderBottomWidth: 1,
  },
});
