
import React from 'react'
import { Label, Box, DropZone, BasePropertyProps, DropZoneProps, DropZoneItem } from 'admin-bro'

const Edit = (props) => {
  const { property, onChange, record } = props

  const handleDropZoneChange = (files) => {
    onChange(property.name, files[0])
  }

  const uploadedPhoto = record.params.images
  const photoToUpload = record.params[property.name]

  return (
    <Box marginBottom="xxl">
      <Label>{property.label}</Label>
      <DropZone onChange={handleDropZoneChange}/>
      {uploadedPhoto && !photoToUpload && (
       
        <DropZoneItem src={uploadedPhoto[i]} />
        
      )}
    </Box>
  )
}

export default Edit