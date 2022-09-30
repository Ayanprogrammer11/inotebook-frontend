import React from 'react'
import { toast } from 'react-hot-toast'
import toastContext from "./toastContext"
const ToastState = (props) => {

const displayToast = (message) => {
    let alert = toast.success(message);
    
    return alert;
}

  return (
    <toastContext.Provider value={{displayToast}}>
       {props.children}
    </toastContext.Provider>
  )
}

export default ToastState
