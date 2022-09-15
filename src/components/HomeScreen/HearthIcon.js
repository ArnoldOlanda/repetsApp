import React from "react"
import Svg, { Path } from "react-native-svg"

export const HearthIcon = (props) => {

  const { color } = props

  return(
  <Svg
    width={13}
    height={12}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M12.003 1.266a3.3 3.3 0 0 0-4.668 0l-.636.636-.636-.636a3.3 3.3 0 1 0-4.668 4.668l.636.636L6.7 11.238l4.668-4.668.636-.636a3.3 3.3 0 0 0 0-4.668Z"
      fill={ color }
    />
  </Svg>
)}

