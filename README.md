# Nexos Sound 🎙️🔊⏰

Nexos Sound è un'applicazione mobile sviluppata per inviare scherzi sonori, impostare sveglie forzate e riprodurre audio (anche personalizzati da Voicemod) a distanza o in locale via Bluetooth.

## 🚀 Modalità di Funzionamento
1. **Modalità Remota (Firebase FCM)**: Invia comandi audio e sveglie forzate al telefono dell'amico tramite connessione internet, sfruttando notifiche push ad alta priorità.
2. **Modalità Bluetooth (Locale)**: Ricerca dispositivi audio e telefoni nelle vicinanze (fino a 10m) per trasmettere flussi audio in tempo reale.

## 💰 Modello Freemium integrato
- **Piano FREE**: Fino a 3 invii/sveglie al giorno con la libreria di suoni base.
- **Piano PRO (1,99 €/mese)**: Invii illimitati, caricamento di file audio custom da Voicemod e controllo forzato del volume al 100%.

## 📦 Struttura del Progetto
- `/backend`: Server Node.js + Express + Firebase Admin SDK per la gestione remota.
- `/mobile_app`: Codice dell'applicazione mobile (HTML5/Cordova/Webview con supporto Bluetooth e FCM).
-
