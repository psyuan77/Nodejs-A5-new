const Contact = require('../models/Contact');

exports.Index = (req, res) => {
  res.render('index', { title: 'Welcome to My Node.js Portfolio' });
};

exports.About = (req, res) => {
  res.render('about', { title: 'About Me' });
};

exports.Contact = (req, res) => {
  res.render('contact', { title: 'Contact' });
};

// Handle POST request for contact form
exports.SubmitContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.render('contact', {
        title: 'Contact',
        error: 'All fields are required!',
        formData: req.body
      });
    }

    const newContact = new Contact({
      name,
      email,
      message,
      submittedBy: req.user._id
    });

    await newContact.save();
    res.redirect('/contact?success=true');
  } catch (error) {
    console.error('Contact submission error:', error);
    res.render('contact', {
      title: 'Contact',
      error: 'Error submitting contact form',
      formData: req.body
    });
  }
};
