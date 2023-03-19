const axios = require('axios');
const db = require('./db');

const fileServiceUrl = 'https://fileservice.example.com';

async function submit(id, assignment, file) {
  // Upload the file to the File Service
  const uploadUrl = `${fileServiceUrl}/file/?filename=${file.originalname}`;
  const uploadResponse = await axios.post(uploadUrl, file.buffer, {
    headers: {
      'Content-Type': 'application/octet-stream',
    },
  });
  const fileUrl = uploadResponse.data;

  // Insert the assignment into the database
  const [result] = await db.execute(
    'INSERT INTO Assignment (studentId, assignmentName, url) VALUES (?, ?, ?)',
    [id, assignment, fileUrl]
  );

  return String(result.insertId);
}

async function getFeedback(subNr) {
  const [rows] = await db.execute(
    'SELECT content FROM Feedback WHERE assignmentId = ?',
    [subNr]
  );

  if (rows.length === 0) {
    throw new Error('Feedback not found');
  }

  return rows[0].content;
}

module.exports = {
  submit,
  getFeedback,
};