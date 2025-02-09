import * as React from "react"
import Svg, { Path } from "react-native-svg"
const ArrowIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={13}
    height={21}
    fill="none"
    {...props}
  >
    <Path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={4}
      d="M10.333 2 2 10.333l8.333 8.334"
    />
  </Svg>
)
export default ArrowIcon
