import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { getSneakers } from "../../Redux/Actions";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import s from './modal.module.css'

const style = {
    bgcolor: 'background.paper',
    p: 4,
};

function ModalSearch({msg, active}){
    const dispatch = useDispatch()


    const [open, setOpen] = useState(active);
    const handleOpen = () => setOpen(true);
    const handleClose = () =>{
        dispatch(getSneakers())
        setOpen(false)
        
        document.querySelector('#input').value = ''
    };


    return(
        <div>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box className={s.box} sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                Search failed
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {msg}
            </Typography>
            </Box>
        </Modal>
        </div>
    )
}

export default ModalSearch;