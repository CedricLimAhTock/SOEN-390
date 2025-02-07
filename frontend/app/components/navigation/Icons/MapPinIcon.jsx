import * as React from "react"
import Svg, { Path } from "react-native-svg"
const MapPinIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    fill="#e8843c"
    stroke="white"
    strokeWidth={1.5}
    aria-hidden="true"
    data-slot="icon"
    width={20}
    height={20}
    viewBox="0 0 24 24"
    {...props}
  >
    <Path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
    />
    <Path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
    />
  </Svg>
)
export default MapPinIcon
