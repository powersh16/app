import React from 'react'
import Label from '@admin-bro/design-system';
import Box from '@admin-bro/design-system';
import DropZone from '@admin-bro/design-system';
import BasePropertyProps from '@admin-bro/design-system'

const Edit=()=>{
  

 return(
 
 <Box>
   <Label>Images</Label>
   <DropZone onChange={console}/>
 </Box>
  
 )
  }


export default Edit