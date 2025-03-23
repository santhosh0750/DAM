import useThemeColor from '@/hooks/useThemeColor';
import { Menu, MenuItem } from '@mui/material'
import React, { useState } from 'react'
import DeleteDialog from './DeleteDialog';

export default function Menucomponents({open,anchorEl,setAnchorEl}) {
    const { primary, secondary, text, textsecondary, optional } = useThemeColor();
    const [DeleteOpen, setDeleteOpen] = useState(false);
    
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
    <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
            sx={{'hover':{
              background:secondary
            }}}
          >
            <MenuItem onClick={()=> setDeleteOpen(true)}>Delete</MenuItem>
            <MenuItem onClick={handleClose}>Rename</MenuItem>
            <MenuItem onClick={handleClose}>Archive</MenuItem>
            <MenuItem onClick={handleClose}>Share</MenuItem>
            <MenuItem onClick={handleClose}>Move</MenuItem>

          </Menu>
          {DeleteOpen && (
                  <DeleteDialog
                    DeleteOpen={DeleteOpen}
                    setDeleteOpen={setDeleteOpen}
                    detail={{
                      type: "File",
                      key: 'Folder' ,
                      function: "",
                    }}
                  />
                )}
          </>
  )
}
