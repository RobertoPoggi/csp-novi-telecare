# 🏥 TeleCare H24 - CSP Novi Ligure

Sistema di gestione TeleAssistenza e TeleMonitoraggio H24 per il **Consorzio Intercomunale del Novese dei Servizi alla Persona**.

## 📊 Dettagli Progetto

- **Cliente**: CSP Novi Ligure
- **Territorio**: 30 Comuni del Novese (Provincia di Alessandria)
- **Assistiti Totali**: 50
- **Durata Centrale Operativa**: 36 mesi (2024-2027)
- **Installazioni**: Effettuate direttamente da tecnici TeleCare H24 con formazione inclusa
- **Finanziamento**: FNNA (Fondo Nazionale Non Autosufficienza)

## 🎯 Servizi Erogati

### 1️⃣ TeleAssistenza (50 assistiti)
- **Dispositivo**: SiDLY CARE PRO
- **Caratteristiche**: 
  - Centrale operativa H24/7 per 36 mesi
  - Gestione emergenze
  - Chiamate bidirezionali
  - GPS integrato
  - Installazione e formazione a cura di TeleCare H24

### 2️⃣ TeleMonitoraggio (5 assistiti)
- **Dispositivi**: 
  - SiDLY CARE PRO (base)
  - ECG BC1 (elettrocardiografo portatile)
  - Smartphone HUB
  - Telecare Connect (piattaforma cloud)
- **Caratteristiche**:
  - Monitoraggio cardiaco continuo
  - Trasmissione dati real-time
  - Alert automatici
  - Refertazione medica
  - Installazione e formazione specifica ECG a cura di TeleCare H24

## 🆚 Differenze Chiave vs Trapani DSS50

| Caratteristica | Trapani DSS50 | CSP Novi Ligure |
|---|---|---|
| **Assistiti totali** | 100 | **50** |
| **Durata Centrale Operativa** | 3 mesi | **36 mesi** |
| **Installazioni** | Non specificato | **TeleCare H24 con formazione** |
| **Ausili** | 20 (poltrone/sensori) | **NO ausili** |
| **Dashboard contatori** | 6 | 4 |
| **Color scheme** | Viola/Purple | Blu CSP (#1e5799) |

## 🌐 Comuni Coinvolti (30)

Novi Ligure, Arquata Scrivia, Basaluzzo, Bosco Marengo, Borghetto di Borbera, Cabella Ligure, Capriata d'Orba, Carezzano, Carpeneto, Carrosio, Cassano Spinola, Castellania Coppi, Francavilla Bisio, Fresonara, Gavi, Grondona, Molare, Montaldeo, Ovada, Parodi Ligure, Pasturana, Pozzolo Formigaro, Predosa, Roccaforte Ligure, San Cristoforo, Serravalle Scrivia, Silvano d'Orba, Tassarolo, Voltaggio, Stazzano.

## 🚀 Installazione

### 1. Setup Google Sheets

1. Crea un nuovo Google Sheet
2. Rinomina il foglio in `Assistiti_CSP_Novi`
3. Apri **Strumenti** → **Editor di script**
4. Incolla il contenuto di `google-apps-script.gs`
5. Salva il progetto come "TeleCare CSP Novi"

### 2. Popola Dati di Esempio (Opzionale)

Nell'editor di script, esegui la funzione:
```javascript
populateSampleData()
```

### 3. Deploy Web App

1. Nell'editor di script: **Deploy** → **Nuova distribuzione**
2. Tipo: **Applicazione Web**
3. Esegui come: **Me**
4. Chi ha accesso: **Chiunque**
5. Copia l'URL generato

### 4. Configura Frontend

1. Apri `index.html`
2. Sostituisci `YOUR_GOOGLE_APPS_SCRIPT_URL_HERE` con l'URL copiato
3. Salva il file

### 5. Pubblica su GitHub Pages

```bash
# Clona il repository
git clone https://github.com/Telecare/csp-novi-telecare.git
cd csp-novi-telecare

# Aggiungi i file
git add index.html
git commit -m "Deploy TeleCare CSP Novi v1.0.0"
git push origin main

# Abilita GitHub Pages
# Settings → Pages → Source: main branch
```

## 📱 Utilizzo Sistema

### Dashboard Principale

La dashboard mostra 4 contatori principali:
- 👥 **Assistiti Totali** (50)
- ✅ **Installati** (dispositivi attivi)
- 📅 **Pianificati** (installazioni future)
- ❤️ **TeleMonitoraggio ECG** (5 con monitoraggio cardiaco)

### Filtri Disponibili

1. **Ricerca testuale**: Nome, cognome, codice fiscale
2. **Filtro Comune**: Seleziona uno dei 30 comuni
3. **Filtro Stato**: Installato, Pianificato, Sospeso

### Funzionalità

- ✅ Visualizzazione dati in tempo reale
- ✅ Aggiornamento automatico ogni 30 secondi
- ✅ Export dati (implementabile)
- ✅ Responsive design (mobile-friendly)
- ✅ Filtri multipli combinabili

## 📞 Supporto Tecnico

**CSP Novi Ligure**
- 📧 Email: assistenza@csp-novi.it
- 📱 Telefono: 0143 XXX XXX
- ⏰ Disponibilità: H24/7 per 36 mesi
- 🌐 Web: www.csp-novi.it

## 📄 Licenza

© 2024 CSP Novi Ligure - Tutti i diritti riservati

Sistema sviluppato per progetto FNNA 2024-2027

---

**Versione**: 1.0.0  
**Ultimo aggiornamento**: Dicembre 2024  
**Installazioni e Formazione**: TeleCare H24  
**Developed with**: ❤️ per il benessere degli anziani del Novese
