import React,{useState} from 'react'
import { Switch, Platform } from 'react-native'


export const CustomSwitch = ({ isOn,onChange, color }) => {

    const [isEnabled, setIsEnabled] = useState(isOn);
    const toggleSwitch = () => {
        setIsEnabled(!isEnabled)
        onChange(!isEnabled)
    };

  return (
    <Switch
        trackColor={{ false: "#d9d9db", true: color }}
        thumbColor={(Platform.OS === 'android') ? color : ''}
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
  )
}