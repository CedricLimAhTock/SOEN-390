import * as React from "react"
import { View } from "react-native";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"
const SGWIcon = ({campus}) => (

  <View>
    {
      campus === 'sgw' &&
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={64}
        height={64}
        fill="none"
      >
        <G clipPath="url(#a)">
          <Path
            fill="#862532"
            fillRule="evenodd"
            d="M28.674 5.858a5.334 5.334 0 0 0-4.431.487l-10.987 6.592a5.334 5.334 0 0 0-2.59 4.573v35.824H8a2.667 2.667 0 0 0 0 5.333h48a2.667 2.667 0 1 0 0-5.333h-2.667V17.922a5.333 5.333 0 0 0-3.646-5.06L28.674 5.859ZM24 12.71l-8 4.8v35.824h8V12.71Z"
            clipRule="evenodd"
          />
        </G>
        <Defs>
          <ClipPath id="a">
            <Path fill="#862532" d="M0 0h64v64H0z" />
          </ClipPath>
        </Defs>
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
        <G clipPath="url(#a)">
          <Path
            fill="#862532"
            fillRule="evenodd"
            d="M28.674 5.858a5.334 5.334 0 0 0-4.431.487l-10.987 6.592a5.334 5.334 0 0 0-2.59 4.573v35.824H8a2.667 2.667 0 0 0 0 5.333h48a2.667 2.667 0 1 0 0-5.333h-2.667V17.922a5.333 5.333 0 0 0-3.646-5.06L28.674 5.859ZM48 53.334V17.922L29.333 11.7v41.634H48ZM24 12.71l-8 4.8v35.824h8V12.71Z"
            clipRule="evenodd"
          />
        </G>
        <Defs>
          <ClipPath id="a">
            <Path fill="#862532" d="M0 0h64v64H0z" />
          </ClipPath>
        </Defs>
      </Svg>
    }
  </View>
  
)
export default SGWIcon;
