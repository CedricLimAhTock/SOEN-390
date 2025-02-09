import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"
const CircleIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={10}
    height={10}
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.333}
        d="M5 9.48A4.48 4.48 0 1 0 5 .52a4.48 4.48 0 0 0 0 8.96Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h10v10H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default CircleIcon
