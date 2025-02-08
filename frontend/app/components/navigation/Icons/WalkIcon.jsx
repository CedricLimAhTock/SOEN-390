import * as React from "react"
import Svg, { Path } from "react-native-svg"
const WalkIcon = ({isSelected}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={26}
    fill={`${isSelected? '#FFD4D4': '#000'}`}
    >
    <Path
      fill={`${isSelected? '#FFD4D4': '#000'}`}
      fillRule="evenodd"
      d="M9.25 5.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Zm-2.434.757a1.25 1.25 0 0 1 1.286.1l1.25.894c.397.284.593.773.5 1.253l-1.31 6.805 5.498 8.248a1.25 1.25 0 0 1-2.08 1.386L6.177 16.27l-1.02-1.53a1.25 1.25 0 0 1-.19-.91l.745-4.225-2.231 1.116-.715 3.572a1.25 1.25 0 0 1-2.451-.49l.834-4.172c.076-.378.322-.7.667-.873l5-2.5Zm7.039 7.929-3.593-1.198.477-2.476 3.906 1.302a1.25 1.25 0 0 1-.79 2.372ZM.66 23.637l4.084-7.262.392.587L6.3 18.71 2.84 24.863a1.25 1.25 0 0 1-2.178-1.226Z"
      clipRule="evenodd"
    />
  </Svg>
)
export default WalkIcon
