# 📘 Guida Setup Completa - TeleCare CSP Novi Ligure

Guida passo-passo per configurare e pubblicare il sistema TeleCare H24.

---

## 📋 Prerequisiti

Prima di iniziare, assicurati di avere:

- ✅ Account Google (per Google Sheets e Apps Script)
- ✅ Account GitHub (per hosting su GitHub Pages)
- ✅ Browser moderno (Chrome, Firefox, Edge)
- ✅ Accesso internet stabile

---

## 🔧 PARTE 1: Setup Google Sheets e Apps Script

### Step 1: Crea il Google Sheet

1. Vai su [Google Sheets](https://sheets.google.com)
2. Clicca su **+ Nuovo** → **Foglio di lavoro vuoto**
3. Rinomina il documento in: `TeleCare CSP Novi Ligure`

### Step 2: Configura il Foglio

1. Rinomina il primo foglio (in basso) da "Foglio1" a: `Assistiti_CSP_Novi`
2. Il foglio è ora pronto per ricevere i dati

### Step 3: Apri l'Editor di Script

1. Nel Google Sheet, vai su: **Estensioni** → **Apps Script**
2. Si aprirà una nuova finestra con l'editor di codice
3. Elimina il codice di esempio presente

### Step 4: Incolla il Codice Backend

1. Apri il file `google-apps-script.gs`
2. Copia **tutto** il contenuto
3. Incollalo nell'editor di Apps Script
4. Clicca su **Salva** (icona dischetto) o `Ctrl+S`
5. Rinomina il progetto in: `TeleCare CSP Novi Backend`

### Step 5: Inizializza il Foglio

1. Nell'editor di script, seleziona la funzione `initializeSheet` dal menu a tendina
2. Clicca su **Esegui** (icona play ▶️)
3. **Prima esecuzione**: Ti verrà chiesto di autorizzare lo script
   - Clicca su **Verifica autorizzazioni**
   - Seleziona il tuo account Google
   - Clicca su **Avanzate** → **Vai a TeleCare CSP Novi Backend (non sicuro)**
   - Clicca su **Consenti**
4. Torna al Google Sheet: vedrai le intestazioni delle colonne

### Step 6: Popola Dati di Esempio (Opzionale)

1. Nell'editor di script, seleziona `populateSampleData`
2. Clicca su **Esegui**
3. Verifica nel Google Sheet: vedrai 8 assistiti di esempio

### Step 7: Deploy Web App

1. Nell'editor di script, clicca su **Deploy** → **Nuova distribuzione**
2. Configurazione:
   - **Tipo**: Seleziona ⚙️ → **Applicazione web**
   - **Descrizione**: `TeleCare CSP Novi API v1.0.0`
   - **Esegui come**: `Me (tuo@email.com)`
   - **Chi ha accesso**: `Chiunque`
3. Clicca su **Distribuisci**
4. **IMPORTANTE**: Copia l'**URL dell'app web** (inizia con `https://script.google.com/...`)
   ```
   Esempio:
   https://script.google.com/macros/s/AKfycbx.../exec
   ```
5. Salva questo URL in un file di testo temporaneo

### Step 8: Test Backend

1. Apri l'URL copiato in un nuovo tab del browser
2. Dovresti vedere un JSON simile a:
   ```json
   {
     "success": true,
     "data": [...],
     "timestamp": "2024-12-08T...",
     "version": "1.0.0"
   }
   ```
3. ✅ Se vedi questo, il backend funziona correttamente!

---

## 🌐 PARTE 2: Setup GitHub Pages

### Step 1: Crea Repository GitHub

1. Vai su [GitHub](https://github.com)
2. Login con account **Telecare** (come richiesto)
3. Clicca su **+** (in alto a destra) → **New repository**
4. Configurazione:
   - **Repository name**: `csp-novi-telecare`
   - **Description**: `Sistema TeleAssistenza e TeleMonitoraggio H24 - CSP Novi Ligure`
   - **Public** ✅ (per GitHub Pages)
   - **Add a README file** ❌ (lo caricheremo dopo)
5. Clicca su **Create repository**

### Step 2: Configura Frontend

1. Apri il file `index.html`
2. Cerca la riga (circa riga 375):
   ```javascript
   const SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';
   ```
3. Sostituiscila con l'URL del tuo Apps Script:
   ```javascript
   const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx.../exec';
   ```
4. Salva il file

### Step 3: Carica File su GitHub

#### Metodo A: Upload tramite Web Interface (Più Semplice)

1. Nel repository GitHub appena creato, clicca su **Add file** → **Upload files**
2. Trascina questi file:
   - `index.html` (modificato con l'URL)
   - `README.md`
   - `SETUP-GUIDE.md`
   - `google-apps-script.gs` (per backup)
3. Commit message: `Deploy TeleCare CSP Novi v1.0.0`
4. Clicca su **Commit changes**

#### Metodo B: Upload tramite Git CLI (Avanzato)

```bash
# Clona il repository vuoto
git clone https://github.com/Telecare/csp-novi-telecare.git
cd csp-novi-telecare

# Copia i file nella cartella
# (copia manualmente i file modificati)

# Aggiungi e committa
git add .
git commit -m "Deploy TeleCare CSP Novi v1.0.0"
git push origin main
```

### Step 4: Abilita GitHub Pages

1. Nel repository, vai su **Settings** (in alto)
2. Nel menu laterale, clicca su **Pages**
3. Configurazione:
   - **Source**: `Deploy from a branch`
   - **Branch**: `main` / `root`
4. Clicca su **Save**
5. Attendi 1-2 minuti per il deploy
6. L'URL sarà: `https://telecare.github.io/csp-novi-telecare/`

### Step 5: Verifica Pubblicazione

1. Apri l'URL di GitHub Pages
2. Dovresti vedere la dashboard con i contatori
3. Verifica che i dati vengano caricati dal Google Sheet
4. ✅ Sistema online e funzionante!

---

## 🎨 PARTE 3: Personalizzazioni (Opzionale)

### Cambia Colori

Nel file `index.html`, modifica le gradazioni:

```css
/* Header e sfondo */
background: linear-gradient(135deg, #1e5799 0%, #207cca 100%);

/* Blu CSP Novi */
color: #1e5799;
```

### Aggiungi Logo CSP Novi

1. Carica il logo su un servizio di hosting immagini
2. Nel file `index.html`, cerca:
   ```html
   <h1>🏥 TeleCare H24</h1>
   ```
3. Sostituisci con:
   ```html
   <img src="URL_LOGO_CSP" alt="CSP Novi" style="height: 60px;">
   <h1>TeleCare H24</h1>
   ```

### Modifica Footer

Nel file `index.html`, cerca la sezione `<div class="footer">` e personalizza i contatti.

---

## 📊 PARTE 4: Gestione Dati

### Aggiungere Assistiti Manualmente

1. Apri il Google Sheet `Assistiti_CSP_Novi`
2. Compila una nuova riga con i dati:
   - **ID**: `CSP009`, `CSP010`, etc. (progressivo)
   - **Cognome**, **Nome**, **Codice Fiscale**
   - **Data Nascita**: Formato `gg/mm/aaaa`
   - **Comune**: Uno dei 30 comuni del Novese
   - **Tipo Servizio**: `TeleAssistenza` o `TeleMonitoraggio`
   - **Dispositivi**: 
     - Per TeleAssistenza: `SiDLY CARE PRO`
     - Per TeleMonitoraggio: `ECG BC1 + HUB + Connect`
   - **Stato**: `Installato`, `Pianificato`, o `Sospeso`
3. I dati appariranno automaticamente nella dashboard (refresh ogni 30 sec)

### Importare Dati da Excel

1. Prepara un file Excel con le colonne come nel Google Sheet
2. Apri il Google Sheet
3. **File** → **Importa** → **Carica**
4. Seleziona il file Excel
5. Opzioni importazione:
   - Posizione importazione: **Aggiungi fogli al foglio di lavoro corrente**
   - Tipo separatore: **Tab** o **Virgola**
6. Clicca su **Importa dati**

### Backup Dati

**Consigliato: Backup Settimanale**

1. Apri il Google Sheet
2. **File** → **Scarica** → **Microsoft Excel (.xlsx)**
3. Salva con nome: `Backup_CSP_Novi_GGMMAAAA.xlsx`
4. Conserva in luogo sicuro

---

## 🔐 PARTE 5: Sicurezza e Privacy

### Protezione Foglio Google

1. Nel Google Sheet, click destro sul tab del foglio
2. **Proteggi foglio**
3. Imposta autorizzazioni:
   - Solo tu puoi modificare
   - Altri possono solo visualizzare

### Limitare Accesso GitHub Pages

GitHub Pages pubblico è gratuito ma accessibile a tutti. Per limitare l'accesso:

1. **Opzione A**: Usa GitHub Pro (pagamento) per repository privati
2. **Opzione B**: Aggiungi autenticazione nel frontend (username/password)
3. **Opzione C**: Ospita su server privato invece di GitHub Pages

### GDPR e Privacy

⚠️ **ATTENZIONE**: Il sistema gestisce dati personali sensibili.

Assicurati di:
- ✅ Ottenere consenso informato dagli assistiti
- ✅ Nominare DPO (Data Protection Officer)
- ✅ Implementare misure di sicurezza adeguate
- ✅ Conservare dati secondo normative vigenti
- ✅ Formare il personale sul trattamento dati

---

## 🐛 Troubleshooting

### Problema: "Errore nel caricamento dati"

**Causa**: URL dello script non configurato correttamente

**Soluzione**:
1. Verifica che l'URL in `index.html` sia corretto
2. Verifica che termini con `/exec`
3. Testa l'URL direttamente nel browser

### Problema: "Dati non aggiornati"

**Causa**: Cache del browser

**Soluzione**:
1. Premi `Ctrl+Shift+R` (Windows) o `Cmd+Shift+R` (Mac)
2. Oppure svuota la cache del browser

### Problema: "Autorizzazioni negate"

**Causa**: Apps Script non autorizzato

**Soluzione**:
1. Vai nell'editor di Apps Script
2. Esegui una funzione qualsiasi
3. Autorizza di nuovo lo script

### Problema: "GitHub Pages non si aggiorna"

**Causa**: Deploy in corso

**Soluzione**:
1. Attendi 2-5 minuti
2. Vai su Settings → Pages per verificare lo stato
3. Svuota cache browser e riprova

---

## 📞 Supporto

Per assistenza tecnica:

- 📧 **Email**: assistenza@csp-novi.it
- 📱 **Telefono**: 0143 XXX XXX
- 🕐 **Orario**: Lun-Ven 9:00-18:00

---

## ✅ Checklist Finale

Prima di andare in produzione, verifica:

- [ ] Google Sheet configurato con dati reali
- [ ] Apps Script deployato e testato
- [ ] Frontend pubblicato su GitHub Pages
- [ ] URL correttamente configurato in `index.html`
- [ ] Dashboard carica i dati correttamente
- [ ] Tutti i filtri funzionano
- [ ] Responsive design testato su mobile
- [ ] Backup dei dati effettuato
- [ ] Documentazione condivisa con il team
- [ ] Formazione utenti completata

---

**Buon lavoro! 🚀**

Sistema sviluppato con ❤️ per il benessere degli anziani del Novese.