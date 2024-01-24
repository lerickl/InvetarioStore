'use client'
import { useState, useRef, useEffect } from 'react'
import { BarcodeDetector } from 'barcode-detector'
export default function CameraScanner(): JSX.Element {
  const videoRef = useRef<HTMLVideoElement>(null);
  const[barcodeValue, setBarcodeValue] = useState<string>('')
  const accessCamera = async () => {
    try{
      
      const stream = await navigator.mediaDevices.getUserMedia( { video: { facingMode: 'environment' } })
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    }catch(err){
      console.log(err)
    }

  }
  const scanBarcode = async () => {
    if(videoRef.current){
      const barcodeDetector = new BarcodeDetector()
      try{
        const barcodes= await barcodeDetector.detect(videoRef.current)
        if(barcodes.length > 0){
          setBarcodeValue(barcodes[0].rawValue)
        }
      }catch(err){
        console.log(err)
      }
    }
  }
  useEffect(() => {
    
    accessCamera()
    return () => {
      if(videoRef.current && videoRef.current.srcObject){
        const stream = videoRef.current.srcObject as MediaStream
        const tracks = stream.getTracks()
        tracks.forEach(track => track.stop())

      }
    }
  }
  , [])

  
  return (
    <div>
      <video ref={videoRef} autoPlay playsInline></video>
      <button onClick={scanBarcode}>Escanea Código de Barras</button>
      {barcodeValue && <p>Código de barras leído: {barcodeValue}</p>}
    </div>
  );
}