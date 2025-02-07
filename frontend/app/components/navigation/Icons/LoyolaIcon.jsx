import * as React from "react"
import Svg, { Path } from "react-native-svg"
const LoyolaIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={50}
    height={44}
    fill="white"
    {...props}
  >
    <Path
      stroke="#862532"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={4.096}
      d="M2.083 41.833h45.834M41.208 41.854v-9.291M41.25 18.688a4.57 4.57 0 0 0-4.583 4.583v4.73a4.57 4.57 0 0 0 4.583 4.583A4.57 4.57 0 0 0 45.834 28v-4.729a4.57 4.57 0 0 0-4.584-4.583ZM4.375 41.833V8.563c0-4.188 2.084-6.292 6.23-6.292h12.979c4.145 0 6.208 2.104 6.208 6.292v33.27M12.084 13.188h10.312M12.084 21h10.312M17.188 41.833v-7.812"
    />
  </Svg>
)
export default LoyolaIcon