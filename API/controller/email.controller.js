import nodemailer from 'nodemailer';


 async function emailVerification(email,password){

try{

    var transporter=nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'sethaku192@gmail.com',
        pass:'wiaukfpbwdtqgfbe'
    }
})
var mailOption = {
  from: 'sethaku192@gmail.com',
  to: email,
  subject: 'Verification Email Shipping War',
  html: `
    <h1>Welcome to Shipping War</h1>
    <p>You have successfully registered to our site. Your login credentials are below:</p>
    <h2>User Email: ${email}</h2>
    <h2>Password: ${password}</h2>
    <h1>Click the link below to verify your account:</h1>
    <a href='https://shipping-war01.vercel.app/verify/${email}'>Click here to verify...</a>
  `
};

const  info=await transporter.sendMail(mailOption)
    console.log('email sent'+info.response)
}  
  
catch(error)
{
    console.log("Error",error)
}
 //  console.log(useremail)
}

export default emailVerification

   







