import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import s from './modal.module.css'
import { Link } from 'react-router-dom';

const style = {
    bgcolor: 'background.paper',
    p: 4,
};

function ModalCart({msg, active, title, reset, goCart}){
    const dispatch = useDispatch()


    const [open, setOpen] = useState(active);
    const handleOpen = () => setOpen(true);
    const handleClose = () =>{
        setOpen(false)
        reset('')
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
                {title}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {msg} 
            </Typography>
            <div className={s.go}>
                { goCart && <Link to='/cart'>
                <Button className={s.btn} color="warning" variant="outlined">GO CART</Button>
            </Link>}
            </div>
            
            </Box>
        </Modal>
        </div>
    )
}

export default ModalCart;