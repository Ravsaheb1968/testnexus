const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/adminRoutes');
; // <— add this
const suiteRoutes = require('./routes/suiteRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes); // <— add this
app.use('/api/admin', require('./routes/suiteRoutes'));
app.use('/api/suites', suiteRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => console.log(`🚀 Server on ${PORT}`));
  })
  .catch(err => console.error('❌ Mongo connect failed:', err));
