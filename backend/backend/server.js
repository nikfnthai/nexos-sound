require('dotenv').config();
const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');

const app = express();
app.use(cors());
app.use(express.json());

// Inizializzazione Firebase Admin (Assicurati di inserire serviceAccountKey.json nella cartella backend)
try {
  const serviceAccount = require('./serviceAccountKey.json');
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
  console.log('[Firebase] Admin SDK inizializzato con successo.');
} catch (e) {
  console.warn('[Firebase] Warning: serviceAccountKey.json non trovato. La modalità remota FCM richiederà configurazione.');
}

const registeredDevices = {};

// Register FCM Device
app.post('/api/register-device', (req, res) => {
  const { phone, fcmToken } = req.body;
  if (!phone || !fcmToken) return res.status(400).json({ error: "Numero e token FCM richiesti." });
  
  registeredDevices[phone] = fcmToken;
  console.log(`[Nexos Sound] Dispositivo registrato per: ${phone}`);
  res.json({ success: true, message: "Dispositivo registrato con successo." });
});

// Trigger Remote Sound / Alarm
app.post('/api/trigger-sound', async (req, res) => {
  const { targetPhone, soundUrl, volume, isAlarm } = req.body;
  const token = registeredDevices[targetPhone];

  if (!token) {
    return res.status(404).json({ error: "Dispositivo non trovato o app non ancora registrata sul telefono del destinatario." });
  }

  const message = {
    data: {
      action: 'PLAY_SOUND',
      soundUrl: soundUrl,
      volume: String(volume || 100),
      isAlarm: String(isAlarm || false)
    },
    token: token,
    android: { priority: 'high' }
  };

  try {
    await admin.messaging().send(message);
    res.json({ success: true, message: "Comando inviato al telefono dell'amico!" });
  } catch (err) {
    console.error("Errore FCM:", err);
    res.status(500).json({ error: "Errore nell'invio della notifica remota." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server Nexos Sound attivo sulla porta ${PORT}`));
