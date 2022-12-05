import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, TouchableOpacity, View, Text, Dimensions } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import Icon from 'react-native-vector-icons/Ionicons'
import { GiftedChat, Send } from 'react-native-gifted-chat'
import { Dialogflow_V2 } from 'react-native-dialogflow'

import chatbotAvatar from '../../assets/chatbot-avatar.png'
import { dialogflowConfig } from '../../../env';


const windowWidth = Dimensions.get('screen').width
const windowHeight = Dimensions.get('window').height

const BOT = {
    _id: 2,
    name: 'Repets Bot',
    avatar: chatbotAvatar
}

export const ChatBot = () => {
    const [chatState, setChatState] = useState({
        messages: [
            { _id: 2, text: 'Soy rex tu bot de ayuda', createdAt: new Date(), user: BOT },
            { _id: 1, text: 'Hola', createdAt: new Date(), user: BOT },
        ],
        id: 1,
        name: ''
    })

    const heightView = useSharedValue(0)
    const widthView = useSharedValue(0)
    const opacity = useSharedValue(0)

    const style = useAnimatedStyle(() => (
        {
            width: withTiming(widthView.value, { duration: 300 }),
            height: withTiming(heightView.value, { duration: 300 }),
            opacity: withTiming(opacity.value, { duration: 250 })
        }
    ))

    const handleGoogleResponse = (result) => {
        try {
            let text = result.queryResult.fulfillmentMessages[0].text.text[0];

            sendBotResponse(text)
        } catch (error) {
            console.log(error);
        }
    }

    const sendBotResponse = (text) => {
        let msg = {
            _id: chatState.messages.length + 1,
            text,
            createdAt: new Date(),
            user: BOT
        }

        setChatState((prev) => ({
            ...prev,
            messages: GiftedChat.append(prev.messages, [msg])
        }))
    }

    const onOpenView = () => {
        widthView.value = windowWidth * 0.95
        heightView.value = windowHeight < 530 ? windowHeight * 0.80 : windowHeight * 0.90
        opacity.value = 1
    }

    const onSend = (messages) => {

        setChatState((prev) => ({
            ...prev,
            messages: GiftedChat.append(prev.messages, messages)
        }))

        let message = messages[0].text;
        Dialogflow_V2.requestQuery(
            message,
            (result) => handleGoogleResponse(result),
            (error) => console.log(error)
        )
    }

    const onQuickReply = (quickReply) => {
        setChatState((prev) => ({
            ...prev,
            messages: GiftedChat.append(prev.messages, quickReply)
        }))

        let message = quickReply[0].value;
        Dialogflow_V2.requestQuery(
            message,
            (result) => handleGoogleResponse(result),
            (error) => console.log(error)
        )
    }

    useEffect(() => {

        Dialogflow_V2.setConfiguration(
            dialogflowConfig.client_email,
            dialogflowConfig.private_key,
            Dialogflow_V2.LANG_SPANISH,
            dialogflowConfig.project_id
        )

    }, [])


    const customSendButton = (props) => (
        <Send {...props}>
            <View style={{ height: '100%', justifyContent: 'center' }}>
                <Icon name='send' size={25} color='#2782CA' />
            </View>
        </Send>
    )

    return (
        <>
            <TouchableOpacity
                style={styles.chatBotButton}
                activeOpacity={0.8}
                onPress={onOpenView}
            >
                <Image source={chatbotAvatar} style={styles.chatbotAvatar} />
            </TouchableOpacity>
            <View style={{ position: 'absolute', bottom: 10, right: 10 }} >
                <Animated.View style={[{ backgroundColor: '#fff', elevation: 3, overflow: 'hidden', borderRadius: 10, padding: 10 }, style]}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flex: 1 }} />
                        <TouchableOpacity
                            onPress={() => {
                                widthView.value = 0
                                heightView.value = 0
                                opacity.value = 0
                            }}>
                            <Icon name='close' size={20} color='#111' />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1 }}>
                        <GiftedChat
                            messages={chatState.messages}
                            onSend={(message) => onSend(message)}
                            onQuickReply={(quickReply) => onQuickReply(quickReply)}
                            user={{ _id: 1 }}
                            placeholder="Escribe un mensaje"
                            alwaysShowSend
                            renderSend={customSendButton}
                        />
                    </View>
                </Animated.View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    chatBotButton: {
        width: 60,
        height: 60,
        borderRadius: 50,
        position: 'absolute',
        right: 10,
        bottom: 10,
        overflow: 'hidden',
        elevation: 2,
        borderWidth: 1,
        borderColor: '#2782CA',
    },
    chatbotAvatar: {
        width: '100%',
        height: '100%'
    }
})