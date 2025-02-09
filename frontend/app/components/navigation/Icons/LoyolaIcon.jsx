import * as React from "react"
import { View } from "react-native";
import Svg, { Path } from "react-native-svg"
const LoyolaIcon = ({campus}) => (
  <View>
    {
      campus === 'sgw' &&
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={64}
        height={64}
        fill="none"
      >
        <Path
          stroke="#862532"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit={10}
          strokeWidth={4.096}
          d="M2.667 58.667h58.666M52.747 58.694V46.8M52.8 29.04a5.85 5.85 0 0 0-5.866 5.867v6.053a5.85 5.85 0 0 0 5.866 5.867 5.85 5.85 0 0 0 5.867-5.867v-6.053A5.85 5.85 0 0 0 52.8 29.04ZM5.6 58.667V16.08c0-5.36 2.667-8.053 7.974-8.053h16.613c5.307 0 7.947 2.693 7.947 8.053v42.587M15.467 22h13.2M15.467 32h13.2M22 58.667v-10"
        />
      </Svg>
    }
    {
      campus === 'loyola' &&
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={64}
        height={64}
        fill="none"
      >
        <Path
          fill="#862532"
          stroke="#862532"
          strokeWidth={0.001}
          d="M30.186 8H13.572C8.266 8 5.6 10.693 5.6 16.053v42.614h14.4v-10c0-1.094.907-2 2-2s2 .88 2 2v10h14.133V16.053c0-5.36-2.64-8.053-7.946-8.053Zm-1.52 26h-13.2c-1.094 0-2-.907-2-2s.906-2 2-2h13.2c1.093 0 2 .907 2 2s-.907 2-2 2Zm0-10h-13.2c-1.094 0-2-.907-2-2s.906-2 2-2h13.2c1.093 0 2 .907 2 2s-.907 2-2 2Z"
        />
        <Path
          fill="#862532"
          stroke="#862532"
          strokeWidth={0.001}
          d="M61.333 56.67H55.28v-8c2.533-.827 4.373-3.2 4.373-6v-5.334c0-3.493-2.853-6.346-6.346-6.346-3.494 0-6.347 2.853-6.347 6.346v5.334c0 2.773 1.813 5.12 4.293 5.973v8.027H2.667c-1.094 0-2 .906-2 2 0 1.093.906 2 2 2h50.48c.053 0 .08.026.133.026.053 0 .08-.026.133-.026h7.92c1.094 0 2-.907 2-2 0-1.094-.906-2-2-2Z"
        />
      </Svg>
    }
  </View>
)
export default LoyolaIcon