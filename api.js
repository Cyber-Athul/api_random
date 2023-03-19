const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const iSubmitService = require('./iSubmitService');

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

app.use(bodyParser.json());

app.post('/submit', upload.single('file'), async (req, res) => {
  try {
    const { id, assignment } = req.body;
    const subNr = await iSubmitService.submit(id, assignment, req.file);
    res.status(200).json({ subNr });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/feedback/:subNr', async (req, res) => {
  try {
    const feedback = await iSubmitService.getFeedback(req.params.subNr);
    res.status(200).json({ feedback });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`iSubmit service listening on port ${port}`);
});