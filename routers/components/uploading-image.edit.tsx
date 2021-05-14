import React from 'react'
import Label from 'admin-bro';
import Box from 'admin-bro';
import DropZone from 'admin-bro';

const Edit = () => {

 return(
   <Box>
     <Label>Images</Label>
     <DropZone onChange={(files)=>console.log(files)}/>
     </Box>
 )
  }



export default Edit