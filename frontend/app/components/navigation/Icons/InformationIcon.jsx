import * as React from "react"
import Svg, { Path } from "react-native-svg"
const InformationIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    fill="#e8843c"
    stroke="white"
    strokeWidth={1.5}
    width={20}
    height={20}
    className="size-6"
    viewBox="0 0 24 24"
    {...props}
  >
    <Path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
    />
  </Svg>
)
export default InformationIcon
