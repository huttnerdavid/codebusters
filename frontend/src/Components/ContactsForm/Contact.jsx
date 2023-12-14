import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';

const ContractForm = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_wcrwr6s', 'template_rfl8dro', form.current, 'UVQrOPr-xEZskSJps')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  };

  return (
    <div className="container">
      <form ref={form} onSubmit={sendEmail} style={{marginTop: "5vw", marginLeft: "15vw", marginRight: "15vw"}}>
        <div className="mb-3">
          <label className="form-label">Our name</label>
          <div placeholder="John Doe" type="name" id="name" className="form-control" name="user_name">Codebusters</div>
        </div>
        <div className="mb-3">
          <label className="form-label">Our e-mail</label>
          <div placeholder="John Doe" type="name" id="name" className="form-control" name="user_name">codebusters@gmail.com</div>
        </div>
        <div className="mb-3">
          <label className="form-label">Telephone</label>
          <div placeholder="John Doe" type="name" id="name" className="form-control" name="user_name">01-23-456-7890</div>
        </div>
        <div className="mb-3">
          <label className="form-label">Or just send us an e-mail!</label>
        </div>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input placeholder="John Doe" type="name" id="name" className="form-control" name="user_name" />
        </div>
        <div className="mb-3">
        <label className="form-label">E-mail</label>
          <input placeholder="example@example.com" type="email" id="email" className="form-control" name="user_email" />
        </div>
        <div className="mb-3">
          <label className="form-label">Message</label>
          <textarea type="message" id="message" className="form-control" name="message" />
          <input type="submit" value="Send" className="btn btn-primary" style={{marginTop: "20px"}}/>
        </div>
      </form>
    </div>
  );
};

export default ContractForm;
