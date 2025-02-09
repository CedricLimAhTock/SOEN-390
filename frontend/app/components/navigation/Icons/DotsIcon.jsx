import * as React from "react"
import Svg, { Path } from "react-native-svg"
const DotsIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={30}
    height={30}
    fill="none"
    {...props}
  >
    <Path
      stroke="#000"
      strokeLinecap="round"
      strokeWidth={5.333}
      d="M14.988 7.5H15M14.988 15H15M14.988 22.5H15"
    />
  </Svg>
)
export default DotsIcon
