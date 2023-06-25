import { keyframes } from 'styled-components'

const animaOn = keyframes`
  from  { bottom:-115px };
  to    { bottom:20px };
`

const animaOff = keyframes`
  from  { bottom:20px};
  to    { bottom:-115px};
`

const bounceIn = keyframes`      
    from, 20%, 40%, 60%, 80%, to { animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000) };
    0%  { opacity: 0; transform: perspective(1px) scale3d(.3, .3, .3) };
    20% { transform: perspective(1px) scale3d(1.1, 1.1, 1.1) };
    40% { transform: perspective(1px) scale3d(.9, .9, .9) };  
    60% { opacity: 1; transform: perspective(1px) scale3d(1.03, 1.03, 1.03) };
    80% { transform: perspective(1px) scale3d(.97, .97, .97) };
    to  { opacity: 1; transform: perspective(1px) scale3d(1, 1, 1) };    
`

const bounceOut = keyframes`
     20%      { transform: scale3d(.9, .9, .9) };
     50%, 55% { opacity: 1; transform: scale3d(1.1, 1.1, 1.1) };
     to       { opacity: 0; transform: scale3d(.3, .3, .3) };
`

const fadeIn = keyframes`
    from { opacity: 0 };
    to   { opacity: 1 };
`

const fadeOut = keyframes`
    from { opacity: 1 };
    to   { opacity: 0 };
`

const bounceInDown = keyframes`
    from, 60%, 75%, 90%, to { animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000) };
    0%   { opacity: 0; transform: translate3d(0, -3000px, 0) };
    60%  { opacity: 1; transform: translate3d(0, 25px, 0) };
    75%  { transform: translate3d(0, -10px, 0) };
    90%  { transform: translate3d(0, 5px, 0) };
    to   { transform: none };
`

const bounceOutUp = keyframes`
    20%      { transform: translate3d(0, -10px, 0) };
    40%, 45% { opacity: 1; transform: translate3d(0, 20px, 0) };
    to       { opacity: 0; transform: translate3d(0, -2000px, 0) };
`

const bounceInModalDefault = keyframes`
    from, 20%, 40%, 60%, 80%, to { animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000) };
    0%  { opacity: 0; transform: perspective(1px) scale3d(.3, .3, .3) };
    20% { opacity: 0.1; transform: perspective(1px) scale3d(1.1, 1.1, 1.1) };
    40% { opacity: 0.2; transform: perspective(1px) scale3d(.9, .9, .9) };  
    60% { opacity: 0.3; transform: perspective(1px) scale3d(1.03, 1.03, 1.03) };
    80% { opacity: 0.4; transform: perspective(1px) scale3d(.97, .97, .97) };
    to  { opacity: 0.5; transform: perspective(1px) scale3d(1, 1, 1) };    
`

const bounceInModalDefaultContent = keyframes`
    from, 20%, 40%, 60%, 80%, to { animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000) };
    0%  { opacity: 0; transform: perspective(1px) scale3d(.3, .3, .3) };
    20% { transform: perspective(1px) scale3d(1.1, 1.1, 1.1) };
    40% { transform: perspective(1px) scale3d(.9, .9, .9) };  
    60% { transform: perspective(1px) scale3d(1.03, 1.03, 1.03) };
    80% { transform: perspective(1px) scale3d(.97, .97, .97) };
    to  { transform: perspective(1px) scale3d(1, 1, 1) };    
`

export { animaOn, animaOff, bounceIn, bounceOut, fadeIn, fadeOut, bounceInDown, bounceOutUp, bounceInModalDefault, bounceInModalDefaultContent }