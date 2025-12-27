const express = require('express');
const router = express.Router();
const pool = require('../db.js'); // Import the database connection

// === 1. API ROUTES ===

// --- 🔹 Save User Route (from Clerk Signup/Login) ---
router.post('/saveUser', async (req, res) => {
  const { id, email } = req.body;
  if (!id || !email) {
    return res.status(400).json({ error: 'User ID and Email are required.' });
  }

  try {
    await pool.query(
      `INSERT INTO users (id, email)
       VALUES ($1, $2)
       ON CONFLICT (id) DO NOTHING`,
      [id, email]
    );

    console.log(`✅ User saved to DB: ${email}`);
    res.status(200).json({ message: 'User saved successfully' });
  } catch (err) {
    console.error('❌ Database insert error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;