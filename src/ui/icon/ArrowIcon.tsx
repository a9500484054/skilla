export const ArrowIcon = ({
    width = 24,
    height = 24,
    fill = "#002CFB",
    rotate
} : {
    height?: number
    width?: number
    fill?: string
    rotate?: number
}) => {
  return(
      <svg 
        width={width} 
        height={height} 
        style={{transform:`rotate(${rotate}deg)`}} 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg">
          <path d="M18.5217 7.17704L17.3447 6L7.66957 15.6751V10.1739H6V18.5217H14.3478V16.8522H8.84661L18.5217 7.17704Z" fill={fill}/>
      </svg>
  )

} 

