import React from 'react'
import { Text } from 'react-native'

export const Title = ({ text, icon }) => {
  return (
    <Text style={{ 
        fontSize: 22, 
        fontWeight: '800', 
        lineHeight: 26, 
        color:'#000' 
    }}> 
        { text } { icon } 
    </Text>
  )
}
