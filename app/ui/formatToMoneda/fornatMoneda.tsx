

export const FormatMoneda=({ format }:{format:Number})=> {
  const simbolMoneda= 'S/'
  const formatoMoneda = `${simbolMoneda} ${format.toFixed(2)}` 
 return formatoMoneda

}