import * as React from "react"
import Svg, { Path } from "react-native-svg"

export const SubTitle1 = (props) => (
  <Svg
    width={105}
    height={20}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M9.752 6.572v2.285H2.33V6.572h7.422ZM3.199.782V15H.27V.781H3.2Zm8.643 0V15h-2.92V.781h2.92Zm1.924 9.042V9.62c0-.775.11-1.487.332-2.139a4.947 4.947 0 0 1 .966-1.709 4.331 4.331 0 0 1 1.563-1.123c.618-.273 1.328-.41 2.129-.41.8 0 1.514.137 2.139.41.625.267 1.149.642 1.572 1.123.43.482.755 1.052.976 1.71.222.65.332 1.363.332 2.138v.205c0 .768-.11 1.481-.332 2.139a4.985 4.985 0 0 1-.976 1.709 4.333 4.333 0 0 1-1.563 1.123c-.618.267-1.328.4-2.129.4-.8 0-1.513-.133-2.138-.4a4.425 4.425 0 0 1-1.572-1.123 5.07 5.07 0 0 1-.967-1.71 6.663 6.663 0 0 1-.332-2.138Zm2.812-.205v.205c0 .443.04.856.117 1.24.078.385.202.723.371 1.016.176.287.404.511.684.674.28.163.622.244 1.025.244.391 0 .726-.081 1.006-.244.28-.163.505-.387.674-.674.17-.293.293-.631.371-1.015.085-.385.127-.798.127-1.24v-.206c0-.43-.042-.833-.127-1.21a3.198 3.198 0 0 0-.38-1.016c-.17-.3-.395-.534-.675-.704-.28-.169-.618-.253-1.015-.253-.397 0-.736.084-1.016.253-.273.17-.498.404-.674.704a3.35 3.35 0 0 0-.37 1.015 5.973 5.973 0 0 0-.118 1.211Zm14.639 2.461a.914.914 0 0 0-.176-.547c-.117-.163-.335-.312-.654-.449-.313-.143-.765-.274-1.358-.39a10.583 10.583 0 0 1-1.494-.44 5.18 5.18 0 0 1-1.191-.654 2.845 2.845 0 0 1-.782-.899A2.499 2.499 0 0 1 25.28 7.5c0-.443.095-.86.284-1.25.195-.39.472-.736.83-1.035a3.929 3.929 0 0 1 1.328-.713 5.602 5.602 0 0 1 1.777-.264c.918 0 1.706.147 2.363.44.664.293 1.172.696 1.524 1.21.358.508.537 1.088.537 1.739h-2.813c0-.273-.058-.518-.175-.732a1.16 1.16 0 0 0-.528-.518c-.234-.13-.54-.195-.918-.195-.312 0-.582.055-.81.166a1.243 1.243 0 0 0-.528.43 1.033 1.033 0 0 0-.175.585c0 .163.032.31.097.44.072.123.186.237.342.342.156.104.358.201.605.293.254.084.567.162.938.234.762.156 1.442.361 2.041.615.599.248 1.074.586 1.426 1.016.351.423.527.98.527 1.67 0 .468-.104.898-.312 1.289-.209.39-.508.732-.899 1.025-.39.287-.86.511-1.406.674-.54.156-1.15.234-1.826.234-.983 0-1.817-.175-2.5-.527-.677-.352-1.192-.798-1.543-1.338-.345-.547-.518-1.107-.518-1.68h2.666c.013.384.111.694.293.928a1.6 1.6 0 0 0 .713.508c.293.104.609.156.947.156.365 0 .668-.049.909-.146.24-.104.423-.241.546-.41a.99.99 0 0 0 .196-.606Zm7.373-5.615v12.598h-2.813V4.432h2.608l.205 2.032ZM45.28 9.6v.205c0 .768-.092 1.48-.274 2.138a5.337 5.337 0 0 1-.781 1.72c-.345.48-.775.858-1.29 1.132-.507.267-1.093.4-1.757.4-.645 0-1.205-.13-1.68-.39a3.499 3.499 0 0 1-1.201-1.094 6.33 6.33 0 0 1-.772-1.65 13.02 13.02 0 0 1-.449-2.012v-.537c.104-.769.254-1.472.45-2.11a6.087 6.087 0 0 1 .77-1.67 3.494 3.494 0 0 1 1.192-1.103c.476-.26 1.032-.39 1.67-.39.67 0 1.26.126 1.768.38.514.254.944.619 1.289 1.094.351.475.615 1.042.79 1.7.183.657.274 1.386.274 2.187Zm-2.823.205V9.6c0-.45-.039-.863-.117-1.24a3.217 3.217 0 0 0-.352-1.006 1.71 1.71 0 0 0-.625-.665c-.254-.162-.563-.244-.928-.244-.384 0-.712.062-.986.186a1.647 1.647 0 0 0-.654.537 2.49 2.49 0 0 0-.38.84 5.419 5.419 0 0 0-.157 1.103v1.358c.032.482.123.915.273 1.299.15.377.381.677.694.898.312.221.722.332 1.23.332.371 0 .684-.081.938-.244.254-.17.459-.4.615-.694.163-.292.276-.631.342-1.015a6.77 6.77 0 0 0 .107-1.24Zm9.434 5.39c-.82 0-1.556-.13-2.207-.39a4.848 4.848 0 0 1-1.66-1.104 4.905 4.905 0 0 1-1.036-1.63 5.491 5.491 0 0 1-.361-1.993v-.39c0-.801.114-1.534.342-2.198.228-.664.553-1.24.976-1.728a4.29 4.29 0 0 1 1.563-1.123c.612-.267 1.302-.4 2.07-.4.749 0 1.413.123 1.992.37.58.248 1.065.6 1.455 1.055.398.456.697 1.003.899 1.64.202.632.303 1.335.303 2.11v1.172h-8.399V8.71h5.635v-.215c0-.39-.072-.739-.215-1.045a1.658 1.658 0 0 0-.625-.742c-.28-.182-.638-.273-1.074-.273-.371 0-.69.08-.957.244-.267.162-.485.39-.654.683a3.718 3.718 0 0 0-.372 1.035c-.078.391-.117.82-.117 1.29v.39c0 .423.059.814.176 1.172.124.358.296.667.518.928.227.26.5.462.82.605.325.143.693.215 1.103.215.508 0 .98-.098 1.416-.293a3.066 3.066 0 0 0 1.143-.908l1.367 1.484a4.16 4.16 0 0 1-.908.918 4.849 4.849 0 0 1-1.367.723c-.534.182-1.143.273-1.826.273Zm12.177-2.5V0H66.9v15h-2.548l-.284-2.305Zm-6.68-2.851v-.205c0-.808.092-1.54.274-2.198.182-.664.45-1.233.8-1.709a3.649 3.649 0 0 1 1.3-1.103c.514-.26 1.1-.39 1.758-.39.618 0 1.158.13 1.62.39.47.26.867.631 1.192 1.113.332.475.599 1.039.8 1.69.203.644.35 1.35.44 2.119V10c-.09.736-.237 1.42-.44 2.05a6.14 6.14 0 0 1-.8 1.66 3.528 3.528 0 0 1-1.191 1.095c-.47.26-1.016.39-1.641.39-.658 0-1.243-.133-1.758-.4a3.732 3.732 0 0 1-1.289-1.123 5.384 5.384 0 0 1-.79-1.7 7.874 7.874 0 0 1-.274-2.128Zm2.813-.205v.205c0 .436.033.843.098 1.22.071.378.185.713.342 1.006.162.287.37.511.625.674.26.156.576.235.947.235.482 0 .879-.108 1.191-.323.313-.221.55-.524.713-.908.17-.384.267-.827.293-1.328V9.14a4.613 4.613 0 0 0-.176-1.103 2.403 2.403 0 0 0-.41-.85 1.81 1.81 0 0 0-.664-.546c-.26-.13-.57-.196-.928-.196-.364 0-.677.085-.937.254a1.86 1.86 0 0 0-.635.674 3.577 3.577 0 0 0-.351 1.016c-.072.384-.108.8-.108 1.25Zm14.6 2.978V7.91c0-.338-.056-.628-.166-.869a1.236 1.236 0 0 0-.518-.576c-.228-.137-.524-.205-.889-.205-.312 0-.582.055-.81.166a1.173 1.173 0 0 0-.527.459 1.268 1.268 0 0 0-.186.693h-2.812c0-.45.104-.876.312-1.28.208-.403.511-.758.908-1.064.397-.312.87-.556 1.416-.732a6.112 6.112 0 0 1 1.856-.264c.82 0 1.55.137 2.187.41.638.274 1.14.684 1.504 1.23.371.548.557 1.231.557 2.052v4.521c0 .58.036 1.055.107 1.426.072.364.176.683.313.957V15H75.21a4.067 4.067 0 0 1-.313-1.074 8.854 8.854 0 0 1-.097-1.309Zm.37-4.053.02 1.592H73.62c-.371 0-.693.043-.967.127a1.8 1.8 0 0 0-.674.362c-.175.15-.305.325-.39.527a1.825 1.825 0 0 0-.117.664c0 .24.055.459.166.654.11.189.27.339.478.45.209.104.453.156.733.156.423 0 .79-.085 1.103-.254.313-.17.554-.378.723-.625.176-.248.267-.482.273-.703l.742 1.191a4.828 4.828 0 0 1-.43.83c-.175.287-.4.557-.673.81a3.474 3.474 0 0 1-.986.616c-.384.156-.84.234-1.368.234-.67 0-1.279-.133-1.826-.4a3.33 3.33 0 0 1-1.289-1.123 2.949 2.949 0 0 1-.469-1.64c0-.554.105-1.046.313-1.475.208-.43.514-.791.918-1.084.41-.3.921-.524 1.533-.674.612-.156 1.322-.235 2.129-.235h1.63Zm4.786-4.13h2.822v11.2c0 .782-.143 1.443-.43 1.983-.286.54-.7.95-1.24 1.23s-1.194.42-1.962.42a6.175 6.175 0 0 1-1.426-.165l.01-2.159c.156.026.309.046.459.059.143.02.29.03.439.03.293 0 .537-.05.732-.147a.943.943 0 0 0 .44-.46c.104-.201.156-.465.156-.79V4.434Zm-.225-2.754c0-.41.144-.749.43-1.016.293-.267.677-.4 1.152-.4.482 0 .866.133 1.153.4.286.267.43.606.43 1.016 0 .41-.144.748-.43 1.015-.287.267-.67.4-1.153.4-.475 0-.859-.133-1.152-.4a1.328 1.328 0 0 1-.43-1.015ZM89.88 15.195c-.82 0-1.556-.13-2.207-.39a4.846 4.846 0 0 1-1.66-1.104 4.903 4.903 0 0 1-1.035-1.63 5.491 5.491 0 0 1-.362-1.993v-.39c0-.801.114-1.534.342-2.198.228-.664.553-1.24.977-1.728a4.29 4.29 0 0 1 1.562-1.123c.612-.267 1.302-.4 2.07-.4.75 0 1.413.123 1.993.37.579.248 1.064.6 1.455 1.055.397.456.696 1.003.898 1.64.202.632.303 1.335.303 2.11v1.172h-8.399V8.71h5.635v-.215c0-.39-.071-.739-.215-1.045a1.658 1.658 0 0 0-.625-.742c-.28-.182-.638-.273-1.074-.273-.371 0-.69.08-.957.244-.267.162-.485.39-.654.683a3.718 3.718 0 0 0-.371 1.035c-.078.391-.118.82-.118 1.29v.39c0 .423.06.814.176 1.172.124.358.296.667.518.928.228.26.501.462.82.605.326.143.694.215 1.104.215.507 0 .98-.098 1.416-.293a3.066 3.066 0 0 0 1.142-.908l1.368 1.484a4.16 4.16 0 0 1-.909.918 4.85 4.85 0 0 1-1.367.723c-.534.182-1.142.273-1.826.273Zm11.65-3.115a.914.914 0 0 0-.175-.547c-.118-.163-.336-.312-.655-.449-.312-.143-.765-.274-1.357-.39a10.583 10.583 0 0 1-1.494-.44 5.183 5.183 0 0 1-1.192-.654 2.845 2.845 0 0 1-.781-.899 2.499 2.499 0 0 1-.283-1.201c0-.443.094-.86.283-1.25.195-.39.472-.736.83-1.035a3.929 3.929 0 0 1 1.328-.713 5.602 5.602 0 0 1 1.778-.264c.918 0 1.705.147 2.363.44.664.293 1.172.696 1.523 1.21.358.508.537 1.088.537 1.739h-2.812c0-.273-.059-.518-.176-.732a1.16 1.16 0 0 0-.527-.518c-.235-.13-.541-.195-.918-.195-.313 0-.583.055-.81.166a1.243 1.243 0 0 0-.528.43 1.033 1.033 0 0 0-.176.585c0 .163.033.31.098.44.071.123.185.237.342.342.156.104.358.201.605.293.254.084.566.162.938.234.761.156 1.442.361 2.041.615.599.248 1.074.586 1.425 1.016.352.423.528.98.528 1.67 0 .468-.104.898-.313 1.289-.208.39-.508.732-.898 1.025-.391.287-.86.511-1.407.674a6.567 6.567 0 0 1-1.826.234c-.983 0-1.816-.175-2.5-.527-.677-.352-1.191-.798-1.543-1.338-.345-.547-.517-1.107-.517-1.68h2.666c.013.384.11.694.293.928a1.6 1.6 0 0 0 .713.508c.293.104.608.156.947.156.364 0 .667-.049.908-.146.241-.104.423-.241.547-.41a.991.991 0 0 0 .195-.606Z"
      fill="#000"
    />
  </Svg>
)

