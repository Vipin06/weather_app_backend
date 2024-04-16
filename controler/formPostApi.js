const getFormSchema = require("../modal/formSchema");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
require('dotenv').config();
 const ACCESS_TOKEN_SECRET ="21f0d6365d8c20f5d9936d59b94ef46af0e6f17c098678dac0d184b98209ebd7"

exports.submitForm = async (req, res) => {
  console.log("req.body", req.body);
  console.log("req.file", req.file);
  
  try {
    const {  name, email, password} = req.body;
    
    const existingForm = await getFormSchema.findOne({ email });
    if (existingForm) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new getFormSchema({name, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: "Account created successfully" });
  } catch (error) {
    console.error("Error submitting form:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find user by email
    const user = await getFormSchema.findOne({ email: email.trim() });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const passwordsMatch = await bcrypt.compare(password.trim(), user.password);
    if (!passwordsMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user._id }, ACCESS_TOKEN_SECRET, {
      expiresIn: '1d',
    });

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
