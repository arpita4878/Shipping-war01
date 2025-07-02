import './Contact.css'

function Contact() {
  return (
    <>
     
<br />
 <div className="container mt-5">
     <div className="col-lg-6 mx-auto shadow p-2 bg-white rounded">
       <form action="#" class="p-5 bg-white">
             

              <div class="row form-group">
                <div class="col-md-12 mb-3 mb-md-0">
                  <label class="text-black" for="fname">First Name</label>
                  <input type="text" id="fname" class="form-control"/>
                </div>
                
                {/* <div class="col-md-6">
                  <label class="text-black" for="lname">Last Name</label>
                  <input type="text" id="lname" class="form-control"/>
                </div> */}
              </div>

              <div class="row form-group">
                
                <div class="col-md-12">
                  <label class="text-black" for="email">Email</label> 
                  <input type="email" id="email" class="form-control"/>
                </div>
              </div>

              {/* <div class="row form-group">
                
                <div class="col-md-12">
                  <label class="text-black" for="subject">Subject</label> 
                  <input type="subject" id="subject" class="form-control"/>
                </div>
              </div> */}

              <div class="row form-group">
                <div class="col-md-12">
                  <label class="text-black" for="message">Message</label> 
                  <textarea name="message" id="message" cols="10" rows="4" class="form-control"></textarea>
                </div>
              </div>

              <div class="row form-group">
                <div class="col-md-12">
                  <input type="submit" value="Send Message" class="btn btn-primary py-2 px-4 text-white"/>
                </div>
              </div>

  
            </form>
            </div>
    </div>

    

     

      
      
    {/* Contact End */}

    </>
  )
}

export default Contact;
