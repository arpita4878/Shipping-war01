import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useEffect } from 'react';

function Logout()
{

    const navigate=useNavigate()
   
 
useEffect(()=>{

    Swal.fire({
          
        text:'Do you really want to log out?',
        icon:'warning',
        showCancelButton:true,
        confirmButtonText:'Yes',
        cancelButtonText:'No',
       
    }).then((result)=>{
        if(result.isConfirmed){
            localStorage.removeItem('token');
            localStorage.removeItem('email')
            localStorage.removeItem('name');
            localStorage.removeItem('mobile');
            localStorage.removeItem('address');
            localStorage.removeItem('city');
            localStorage.removeItem('gender');
            localStorage.removeItem('role');
            localStorage.removeItem('info');

           navigate('/login')
        }
        else    
        {
         if(localStorage.getItem("role")=="admin")
            navigate('/admin')
         
         else if (localStorage.getItem("role")=="user")
            navigate('/user')

         else
            navigate('/')

        }
    })

},[])

       

  
    return(
        <>
      
        </>
    )

}

export default Logout;