import React, { useContext } from 'react'
import ContextH from '../Contexthook/ContextH'

export default function Alerts() {
    const context = useContext(ContextH);
    const {alerts , setalerts} = context;
  return (
    <div  className={`alert alert-${alerts.alert}  absolute left-0 right-0 z-10 m-0 `} style={{padding:2}} role="alert">
    {alerts.message}  
  </div>
  
  )
}
