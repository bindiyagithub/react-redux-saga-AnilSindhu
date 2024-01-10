import { Typography } from '@mui/material';
import React, { useState } from 'react'

const Description = (props) => {
     const[readInfo , setReadInfo]= useState(false);
     const HandleReadInfo = ()=>{
          setReadInfo(!readInfo)
     }
  return (
    <Typography variant="body2" color="text.secondary">
        {readInfo ? props.infoValue : `${props.infoValue.slice(0,80)}.....`}
    
    <a href='#' onClick={HandleReadInfo}
     className='text-primary text-decoration-none'>
     {readInfo ? "Read less" : "Read more"}
     </a>
    </Typography>
  )
}

export default Description