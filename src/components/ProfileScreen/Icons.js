import * as React from "react"
import Svg, { Mask, Rect, Path, Ellipse,G, Defs, ClipPath } from "react-native-svg"


export const Pet = (props) => (
  <Svg
    width={18}
    height={16}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M17.803 10.982c-.437-1.187-1.771-2.965-3.45-4.312a11.03 11.03 0 0 0-.477-.35 1.21 1.21 0 0 1 .984-.165c.395.097.8.117 1.2.061.188-.037.38-.17.41-.337.02-.107-.062-.17-.125-.183-.422-.091-.607-.262-.666-.547.39.166.813.149 1.193-.05.287-.224.498-.575.591-.983.162-.801-.031-.794-.785-1-.26-.07-.63-.145-.83-.206-.52-.16-.594-1.037-1.726-1.367a1.436 1.436 0 0 0-.859-.015 4.474 4.474 0 0 0-.626-.547C12.15.608 11.76.35 11.44.097a.385.385 0 0 0-.154-.085.337.337 0 0 0-.168-.003.378.378 0 0 0-.155.08.49.49 0 0 0-.118.15c-.045.11-.083.223-.115.34.309.138.778.357 1.148.564.116.053.224.128.322.223a7.392 7.392 0 0 0-.652-.18c-.55-.128-1.209-.33-1.567-.389a.358.358 0 0 0-.289.074.532.532 0 0 0-.182.291c-.023.23-.018.464.015.693.065.838.326 1.336.715 1.501a2.19 2.19 0 0 0 1.652-.223c-1.536 1.973-3.505 2.313-5.673 2.15-2.23-.17-3.77-1.555-4.898-3.529-.055-.098-.127-.03-.15.095-.224 1.224 0 2.88.954 3.721.576.52 1.269.796 1.978.789-.694.424-1.36.913-1.995 1.464C1.35 8.43.705 9.235.218 10.182c-.624 1.246.235 1.468.767 1.166 1.414-.859 2.958-1.327 4.53-1.374 2.256-.066 4.463.827 6.26 2.534.97.884 1.48 1.738 2.364 3.088.088.127.203.22.332.268.128.048.265.05.394.004.25-.079.474-.452.375-1.215-.256-1.783-.864-3.458-1.768-4.873.676.313 1.328.702 1.949 1.16.512.405 1.005.848 1.474 1.327a.643.643 0 0 0 .387.158.623.623 0 0 0 .395-.122c.215-.176.385-.622.127-1.321"
      fill="#6B6A6F"
    />
  </Svg>
)

export const History = (props) => (
    <Svg
      width={18}
      height={18}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.402.222a.917.917 0 0 1 1.196 0l8.1 7.024a.863.863 0 0 1 .075 1.24.916.916 0 0 1-1.27.072l-.303-.261v7.508c0 .97-.806 1.756-1.8 1.756H3.6c-.994 0-1.8-.787-1.8-1.756V8.297l-.302.261a.916.916 0 0 1-1.27-.072.863.863 0 0 1 .074-1.24l8.1-7.024ZM3.6 6.736v9.069h10.8v-9.07L9 2.054 3.6 6.736Z"
        fill="#6B6A6F"
      />
    </Svg>
  )


export const Edit = (props) => (
    <Svg
      width={18}
      height={15}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M.667 1.161A.772.772 0 0 1 .91.607a.856.856 0 0 1 .583-.232h15.014c.456 0 .826.352.826.786V13.84a.773.773 0 0 1-.243.554.856.856 0 0 1-.583.232H1.493a.85.85 0 0 1-.584-.23.767.767 0 0 1-.242-.556V1.16Zm1.666.797v11.084h13.334V1.958H2.333ZM4 3.542h5v4.75H4v-4.75Zm1.667 1.583v1.583h1.666V5.125H5.667ZM4 9.875h10v1.583H4V9.875Zm6.667-6.333H14v1.583h-3.333V3.542Zm0 3.166H14v1.584h-3.333V6.708Z"
        fill="#6B6A6F"
      />
    </Svg>
  )

  export const Notification = (props) => (
    <Svg
      width={18}
      height={18}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M15.667 12.563h1.666v1.583H.667v-1.583h1.666V7.02c0-1.68.703-3.29 1.953-4.478C5.536 1.355 7.232.688 9 .688c1.768 0 3.464.667 4.714 1.855 1.25 1.187 1.953 2.798 1.953 4.478v5.542Zm-1.667 0V7.02c0-1.26-.527-2.468-1.464-3.359A5.136 5.136 0 0 0 9 2.271c-1.326 0-2.598.5-3.536 1.391A4.633 4.633 0 0 0 4 7.021v5.542h10Zm-7.5 3.166h5v1.584h-5v-1.584Z"
        fill="#6B6A6F"
      />
    </Svg>
  )
  export const Language = (props) => (
    <Svg
      width={19}
      height={16}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="m14.417 6.569 3.666 8.708h-1.795l-1.001-2.375h-3.409l-.999 2.375H9.084L12.75 6.57h1.667ZM7.333.235V1.82h5v1.583h-1.64A14.266 14.266 0 0 1 7.677 8.39c.6.51 1.253.963 1.946 1.352l-.625 1.487A14.185 14.185 0 0 1 6.5 9.518a14.094 14.094 0 0 1-5.168 2.809L.886 10.8A12.427 12.427 0 0 0 5.325 8.39a14.267 14.267 0 0 1-2.353-3.406H4.84A12.698 12.698 0 0 0 6.5 7.263a12.683 12.683 0 0 0 2.425-3.86H.667V1.818h5V.235h1.666Zm6.25 8.618-1.039 2.466h2.077l-1.038-2.466Z"
        fill="#6B6A6F"
      />
    </Svg>
  )
  
  export const Pay = (props) => (
    <Svg
      width={19}
      height={19}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Mask id="a" fill="#fff">
        <Rect x={2.098} y={3.452} width={16.785} height={15.026} rx={1} />
      </Mask>
      <Rect
        x={2.098}
        y={3.452}
        width={16.785}
        height={15.026}
        rx={1}
        fill="#fff"
        stroke="#6B6A6F"
        strokeWidth={3}
        mask="url(#a)"
      />
      <Mask id="b" fill="#fff">
        <Rect y={0.948} width={16.785} height={15.026} rx={1} />
      </Mask>
      <Rect
        y={0.948}
        width={16.785}
        height={15.026}
        rx={1}
        fill="#fff"
        stroke="#6B6A6F"
        strokeWidth={3}
        mask="url(#b)"
      />
      <Path
        d="M9.99 8.46c0 1.194-.794 2.005-1.598 2.005-.803 0-1.598-.81-1.598-2.004s.795-2.005 1.598-2.005c.804 0 1.599.811 1.599 2.005Z"
        fill="#fff"
        stroke="#6B6A6F"
      />
      <Mask id="c" fill="#fff">
        <Ellipse cx={2.623} cy={5.33} rx={0.525} ry={0.626} />
      </Mask>
      <Ellipse cx={2.623} cy={5.33} rx={0.525} ry={0.626} fill="#6B6A6F" />
      <Ellipse cx={2.623} cy={5.33} rx={0.525} ry={0.626} fill="#6B6A6F" />
      <Ellipse cx={2.623} cy={5.33} rx={0.525} ry={0.626} fill="#6B6A6F" />
      <Ellipse cx={2.623} cy={5.33} rx={0.525} ry={0.626} fill="#6B6A6F" />
      <Ellipse cx={2.623} cy={5.33} rx={0.525} ry={0.626} fill="#6B6A6F" />
      <Ellipse cx={2.623} cy={5.33} rx={0.525} ry={0.626} fill="#6B6A6F" />
      <Ellipse cx={2.623} cy={5.33} rx={0.525} ry={0.626} fill="#6B6A6F" />
      <Path
        d="M2.147 5.33c0-.05.017-.124.08-.2a.518.518 0 0 1 .396-.173v2c1 0 1.524-.902 1.524-1.627h-2Zm.476-.373c.195 0 .33.096.395.174.064.075.08.15.08.2h-2c0 .724.524 1.625 1.525 1.625v-2Zm.475.373c0 .05-.016.124-.08.2a.518.518 0 0 1-.395.174v-2c-1 0-1.525.901-1.525 1.626h2Zm-.475.374a.518.518 0 0 1-.396-.174.313.313 0 0 1-.08-.2h2c0-.725-.524-1.626-1.524-1.626v2Z"
        fill="#6B6A6F"
        mask="url(#c)"
      />
      <Mask id="d" fill="#fff">
        <Ellipse cx={14.162} cy={12.843} rx={0.525} ry={0.626} />
      </Mask>
      <Ellipse cx={14.162} cy={12.843} rx={0.525} ry={0.626} fill="#6B6A6F" />
      <Ellipse cx={14.162} cy={12.843} rx={0.525} ry={0.626} fill="#6B6A6F" />
      <Ellipse cx={14.162} cy={12.843} rx={0.525} ry={0.626} fill="#6B6A6F" />
      <Ellipse cx={14.162} cy={12.843} rx={0.525} ry={0.626} fill="#6B6A6F" />
      <Ellipse cx={14.162} cy={12.843} rx={0.525} ry={0.626} fill="#6B6A6F" />
      <Ellipse cx={14.162} cy={12.843} rx={0.525} ry={0.626} fill="#6B6A6F" />
      <Ellipse cx={14.162} cy={12.843} rx={0.525} ry={0.626} fill="#6B6A6F" />
      <Path
        d="M13.687 12.843c0-.05.016-.124.08-.2a.518.518 0 0 1 .395-.174v2c1 0 1.525-.9 1.525-1.626h-2Zm.475-.373c.195 0 .33.096.396.174.063.075.08.15.08.2h-2c0 .724.524 1.626 1.524 1.626v-2Zm.476.373c0 .05-.017.124-.08.2a.518.518 0 0 1-.396.174v-2c-1 0-1.524.901-1.524 1.626h2Zm-.476.374a.518.518 0 0 1-.395-.174.313.313 0 0 1-.08-.2h2c0-.725-.524-1.626-1.525-1.626v2Z"
        fill="#6B6A6F"
        mask="url(#d)"
      />
    </Svg>
  )
  
  export const Hosp = (props) => (
    <Svg
      width={19}
      height={19}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.525.228a.921.921 0 0 1 1.214 0l8.218 7.222c.377.332.411.902.076 1.275a.92.92 0 0 1-1.29.075l-.306-.27v7.72c0 .998-.817 1.806-1.826 1.806H3.653a1.816 1.816 0 0 1-1.827-1.806V8.53l-.306.27a.92.92 0 0 1-1.29-.075.896.896 0 0 1 .077-1.275L8.525.228ZM3.653 6.926v9.324H14.61V6.926L9.131 2.11 3.654 6.926Z"
        fill="#6B6A6F"
      />
      <Path stroke="#6B6A6F" d="M9.125 6.771v6.771M6.088 10.156h6.088" />
    </Svg>
  )

  export const Learn = (props) => (
    <Svg
      width={19}
      height={19}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.525 1.103a.921.921 0 0 1 1.214 0l8.218 7.222c.377.331.411.902.076 1.275a.92.92 0 0 1-1.29.075l-.306-.27v7.72c0 .997-.817 1.806-1.826 1.806H3.653a1.816 1.816 0 0 1-1.827-1.806v-7.72l-.306.27A.92.92 0 0 1 .23 9.6a.896.896 0 0 1 .077-1.275l8.218-7.222ZM3.653 7.8v9.325H14.61V7.8l-5.48-4.815L3.654 7.8Z"
        fill="#6B6A6F"
      />
      <Path
        clipRule="evenodd"
        d="M6.56 9.274a1.545 1.545 0 0 1 2.275 0l.297.314.296-.314a1.545 1.545 0 0 1 2.276 0 1.781 1.781 0 0 1 0 2.414l-2.572 2.729-2.573-2.729a1.781 1.781 0 0 1 0-2.414Z"
        stroke="#6B6A6F"
      />
    </Svg>
  )

  export const Arrow = (props) => (
    <Svg
      width={9}
      height={10}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="m1.114 1 6.218 3.566a.5.5 0 0 1 0 .868L1.114 9"
        stroke="#6B6A6F"
        strokeWidth={1.5}
      />
    </Svg>
  )

  export const EditPhoto = (props) => (
    <Svg
      width={26}
      height={27}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M25 13.5C25 20.44 19.592 26 13 26S1 20.44 1 13.5 6.408 1 13 1s12 5.56 12 12.5Z"
        fill="#F5F5F5"
        stroke="#fff"
        strokeWidth={2}
      />
      <G clipPath="url(#a)">
        <Path
          d="m9.843 15.848 5.732-5.953-.8-.83-5.732 5.953v.83h.8Zm.468 1.174H7.913v-2.49l6.463-6.713a.555.555 0 0 1 .4-.171c.15 0 .293.061.4.171l1.598 1.66c.107.111.166.26.166.416 0 .156-.06.305-.166.415l-6.463 6.712Zm-2.398 1.174h10.174v1.174H7.913v-1.174Z"
          fill="#000"
        />
      </G>
      <Defs>
        <ClipPath id="a">
          <Path
            fill="#fff"
            transform="translate(6.217 6.457)"
            d="M0 0h13.565v14.087H0z"
          />
        </ClipPath>
      </Defs>
    </Svg>
  )
  