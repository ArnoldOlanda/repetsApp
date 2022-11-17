import React from 'react'
import { Text } from 'react-native'
import { useSelector } from 'react-redux'

export const Title = ({ text, icon, fontSize = 22 }) => {

  const { colors } = useSelector( state => state.theme )

  return (
    <Text style={{ 
        fontSize, 
        fontWeight: '800', 
        lineHeight: 26, 
        color:colors.text 
    }}> 
        { text } { icon } 
    </Text>
  )
}
