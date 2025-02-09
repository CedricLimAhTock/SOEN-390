import * as React from "react"
import Svg, { Path } from "react-native-svg"
const MetroIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="#e8843c"
    stroke="white"
    {...props}
  >
    <Path
      fill="#E6863C"
      fillRule="evenodd"
      d="M2.833 3.333h14.334a2 2 0 0 1 2 2v9.334a2 2 0 0 1-2 2H2.833a2 2 0 0 1-2-2V5.333a2 2 0 0 1 2-2Zm15.5 3.334H1.667v2.5h16.666v-2.5Zm-5 5a.833.833 0 0 1 .834-.834h2.5a.833.833 0 1 1 0 1.667h-2.5a.833.833 0 0 1-.834-.833Z"
      clipRule="evenodd"
    />
  </Svg>
)
export default MetroIcon
