import React from "react";
import { Snackbar } from "@mui/material";

interface Props{
    isOpenToast: boolean
    toastMessage: string
    closeToast:  () => void
}


const Toast = ({ isOpenToast, toastMessage, closeToast }: Props) => {

  return (
    <Snackbar
        open={isOpenToast}
        autoHideDuration={1500}
        message={toastMessage}
        onClose={closeToast}
    />
  );
};


export default Toast;
