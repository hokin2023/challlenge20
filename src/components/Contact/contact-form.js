import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import { validateEmail } from '../../utils/helper';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


function ContactForm() {
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
  const [formMessage, setFormMessage] = useState('');

  // adds error messages to the form
  function handleChange(e) {
    if (e.target.name === 'email') {
      const isValid = validateEmail(e.target.value);
      if (!isValid) {
          setFormMessage('Your email is invalid.');
        } else {
          setFormMessage('');
        }
    } else {
      if (!e.target.value.length) {
        const name =  e.target.name;
        setFormMessage(`${name.charAt(0).toUpperCase() + name.slice(1)} is required.`);
      } else {
        setFormMessage('');
      }
    }

    if (!formMessage) {
      setFormState({ ...formState, [e.target.name]: e.target.value });
    }
  }

  // sends the email or surfaces an error on submission
  function sendEmail(e) {
      e.preventDefault();
      // https://medium.com/@shrivastavasucheta/sending-an-email-using-emailjs-gmail-service-to-be-used-in-javascript-d6eb92ed0c7c
      // emailjs.sendForm(serviceID, templateID, templateParams, userID);

      emailjs.sendForm('gmail', 'template_7pi3req', '#contactForm', 'user_2ClFT2CBVbPN3tPCiXsd0')
      .then(function(response) {
        console.log(response.text);
        setFormMessage("Message sent!");
      }, function(error) {
        console.log(error.text);
        setFormMessage("Please enter correct email!");
      });
  }

  return (
    <Form onSubmit={sendEmail} id="contactForm">
      <Form.Group controlId="name">
        <Form.Label>Your Name</Form.Label>
        <Form.Control required name="name" placeholder="Jane Doe" onBlur={handleChange} />
      </Form.Group>

      <Form.Group controlId="email">
        <Form.Label>Your Email</Form.Label>
        <Form.Control required name="email" type="email" placeholder="jdoe@gmail.com"  onBlur={handleChange} />
      </Form.Group>

      <Form.Group controlId="subject">
        <Form.Label>Subject</Form.Label>
        <Form.Control required name="subject" placeholder="Subject" onBlur={handleChange} />
      </Form.Group>

      <Form.Group controlId="message">
        <Form.Label>Message</Form.Label>
        <Form.Control required name="message" as="textarea" rows="5" placeholder="Message" onBlur={handleChange} />
      </Form.Group>

      {formMessage && <p className="form-message">{formMessage}</p>}

      <Button type="submit" className='btn'>Submit</Button>
    </Form>
  )
}

export default ContactForm;