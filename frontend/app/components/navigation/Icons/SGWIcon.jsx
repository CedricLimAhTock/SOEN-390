import * as React from "react"
import Svg, { Path } from "react-native-svg"
const SGWIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={50}
    height={50}
    fill="#862532"
    {...props}
  >
    <Path
      fill="#862532"
      fillRule="evenodd"
      d="M22.401 4.577a4.167 4.167 0 0 0-3.461.38l-8.584 5.15a4.167 4.167 0 0 0-2.023 3.573v27.987H6.25a2.083 2.083 0 0 0 0 4.166h37.5a2.083 2.083 0 1 0 0-4.166h-2.083V14.002a4.167 4.167 0 0 0-2.85-3.953L22.402 4.577ZM18.75 9.93l-6.25 3.75v27.987h6.25V9.93Z"
      clipRule="evenodd"
    />
  </Svg>
)
export default SGWIcon
