import * as React from "react"
import Svg, { Path } from "react-native-svg"

export const Rectangule = (props) => (
  <Svg
    height={50}
    width={"100%"}
    data-name="Capa 2"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 360 118.15"
    {...props}
  >
    <Path
       width={"100%"}
      d="M360 71.81a513.472 513.472 0 0 1-179.25 46.35c-28.8-1.72-64.31-6.38-103.72-17.47A492.27 492.27 0 0 1 0 71.81V0h360v71.81Z"
      style={{
        fill: "#eaf0ef",
      }}
      data-name="Capa 1"
    />
  </Svg>
)
