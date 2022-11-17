import React from "react";
import { Dimensions, StyleSheet, Text, View, Image } from "react-native";
import ReacNativeModal from "react-native-modal";
import { Button } from "../Button";
import { Heart } from "./Icon";

const windowWidth = Dimensions.get('screen').width
const windowHeight = Dimensions.get('screen').height


export const Modal = ({ visible, onCloseModal, modalHeight, data, buttonCloseText='Hecho' }) => {

    const { nombre, distrito, provincia, tarifa_dia, galeria } = data

    // const [image] = galeria

    return (
        <View style={{ flex: 1 }}>

            <ReacNativeModal
                style={{ margin: 0, justifyContent: 'flex-end', alignItems: 'center' }}
                isVisible={visible}
                onBackButtonPress={onCloseModal}
                animationOutTiming={400}
                backdropTransitionOutTiming={500}
                onSwipeComplete={onCloseModal}
                swipeDirection="down"
                backdropOpacity={0.2}
            >
                <View style={{ ...styles.modalContainer, height: modalHeight }}>
                    <View style={{ width: 35, height: 0, borderWidth: 4, borderColor: '#2782CA', borderRadius: 10, marginVertical: 5 }} />

                    <View style={styles.optionsContainer}>
                        <Image source={{ uri:galeria[0] }} style={{ height:72,width:72, borderRadius:6 }}/>
                        <View style={{flex:1, paddingHorizontal:5}}>
                            <Text style={{color:"black", fontWeight:"bold"}}>{ nombre }</Text>
                            <Text>{ distrito } { provincia }</Text>
                            <Text><Text style={{color:"#2782CA", fontWeight:"bold"}}> 4.5</Text> (reviews)</Text>
                        </View>
                        
                        <View>
                            <Text style={{color:"#2782CA", fontWeight:"bold"}}> S/.{ tarifa_dia }</Text>
                            <Text>/noche</Text>
                            <Heart/>
                        </View>
                    </View>

                    <Button
                        text={ buttonCloseText }
                        stylesProps={{ width: windowWidth * 0.8, }}
                        onPress={onCloseModal}
                    />
                </View>

                
            </ReacNativeModal>
        </View>
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: '#fff',
        width: windowWidth * 0.95,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        borderWidth: 1,
        borderColor: '#2782CA',
        paddingTop: 10,
        paddingHorizontal: 10,
        alignItems: 'center',
        
    },
    optionsContainer: {
        width: windowWidth * 0.8,
        flexDirection: 'row',
        marginBottom: 30,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    button: {
        width: 122,
        height: 40,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#2782CA',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 23,
    },
 
})