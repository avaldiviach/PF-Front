import toast, {Toaster } from 'react-hot-toast';

const NotifyVerifyEmail = ({show})=>{ 
    toast('¡Tu email no está verificado!',
        {
            icon: '✉️',
            style: {
            borderRadius: '10px',
            background: '#FB5014',
            color: '#fff',
            },
    });  
    
    if(show){        
     return(<Toaster position={'bottom-right'}/>); 
    }else{
        return null;
    }
    
   
}

export default NotifyVerifyEmail;