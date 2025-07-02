import passwordGenerator from 'generate-password'
 //using npm password generator -------------
    //install---        npm install generate-password 
    //after import
        //lowercase,and uppercase by default true
    const password=
    passwordGenerator.generate({
    length:8,
    numbers:true,
    symbols:true,
    strict:true
   })
   
   export default password;