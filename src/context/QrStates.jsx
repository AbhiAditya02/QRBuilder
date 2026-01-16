import React, { useState } from 'react'
import QrContext from './QrContext'

const QrStates = (props) => {
  const [qrValue, setQrValue] = useState("")
  return (
    <QrContext.Provider value={{qrValue, setQrValue}}>
      {props.children}
    </QrContext.Provider>
  )
}

export default QrStates