const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const port = 3000;
// Middleware setup
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json()); // Parse JSON bodies
// MongoDB connection
mongoose.connect('mongodb://localhost:27017/studentDB', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB...', err));
// Mongoose Schema and Model
const studentSchema = new mongoose.Schema({
usn: { type: String, required: true },
name: { type: String, required: true },
department: { type: String, required: true },
subjectCode: { type: String, required: true } // An array of subject codes
});
const Student = mongoose.model('Student',
studentSchema);
// Root route handler
app.get('/', (req, res) => {
res.send('Welcome to the Student Registration API!');
});
// Endpoint to handle student registration
app.post('/register', async (req, res) => {
const { usn, name, department, subjectCode } = req.body;
if (!usn || !name || !department || !subjectCode) {
return res.status(400).json({ error: 'All fields are required'
});
}
try {
// Create a new student entry
const newStudent = new Student({
usn,
name,
department,
subjectCode
});
// Save the student to MongoDB
await newStudent.save();
res.status(200).json({ message: 'Student registered successfully' });
} catch (err) {
console.error('Error saving student:', err);
res.status(500).json({ error: 'An error occurred while registering the student' });
}
});
// Start the server
app.listen(port, () => {
console.log(`Server is running on http://localhost:${port}`);
});