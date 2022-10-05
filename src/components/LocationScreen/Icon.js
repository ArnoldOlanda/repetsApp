import * as React from "react"
import { useState } from "react"
import Svg, { Path } from "react-native-svg"

export const Heart = (props) => {
    const [color, setColor] = useState(false)
  return(<Svg
    onPress={() =>(setColor(!color))}
    width={21}
    height={22}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2.471 2.684c1.962-2.245 5.142-2.245 7.104 0l.925 1.058.925-1.058c1.962-2.245 5.142-2.245 7.104 0 1.961 2.244 1.961 5.884 0 8.128L10.5 20l-8.029-9.188C.51 8.568.51 4.928 2.471 2.684Z"
      fill={color? "red": "white"}
      stroke={color? "red": "#6B6A6F"}
      strokeWidth={1.5}
    />
  </Svg>)

}