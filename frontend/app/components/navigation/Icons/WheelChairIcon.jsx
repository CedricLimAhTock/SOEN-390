import * as React from "react"
import Svg, { Path } from "react-native-svg"
const WheelChairIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <Path
      fill="#E6863C"
      d="M10 5.417a1.667 1.667 0 1 0 0-3.334 1.667 1.667 0 0 0 0 3.334Zm6.25 11.666h-.833v-4.166a.834.834 0 0 0-.834-.834h-4.166v-1.666h4.166a.833.833 0 0 0 0-1.667h-4.166V7.083a.834.834 0 0 0-1.667 0v5.834a.833.833 0 0 0 .833.833h4.167v4.167a.833.833 0 0 0 .833.833h1.667a.833.833 0 0 0 0-1.667Zm-5.667-1.333a3.333 3.333 0 0 1-6-2 3.333 3.333 0 0 1 2-3.05.836.836 0 0 0-.666-1.533 5 5 0 1 0 6 7.583.833.833 0 1 0-1.334-1Z"
    />
  </Svg>
)
export default WheelChairIcon
