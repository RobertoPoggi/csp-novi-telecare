# ⚡ Quick Start - TeleCare CSP Novi

Guida rapida in 5 minuti per mettere online il sistema.

---

## 🎯 Obiettivo

Pubblicare la dashboard TeleCare H24 accessibile via web per gestire 50 assistiti del CSP Novi Ligure.

---

## 📦 Cosa hai ricevuto

```
csp-novi-telecare/
├── index.html                          ← Frontend dashboard
├── google-apps-script.gs               ← Backend da copiare in Google Apps Script
├── README.md                           ← Documentazione completa
├── SETUP-GUIDE.md                      ← Guida setup dettagliata
├── DATABASE-STRUCTURE.md               ← Schema database
├── MESSAGGIO-CONDIVISIONE.txt          ← Template email/messaggi
├── CHANGELOG.md                        ← Storico modifiche
├── QUICK-START.md                      ← Questa guida
└── .gitignore                          ← File da ignorare in Git
```

---

## 🚀 Setup in 5 Step (10 minuti)

### ✅ STEP 1: Crea Google Sheet (2 min)

1. Vai su [sheets.google.com](https://sheets.google.com)
2. Nuovo foglio → rinomina in `TeleCare CSP Novi`
3. Rinomina il tab in basso in `Assistiti_CSP_Novi`

### ✅ STEP 2: Setup Backend (3 min)

1. Nel Google Sheet: **Estensioni** → **Apps Script**
2. Cancella tutto il codice predefinito
3. Copia-incolla tutto il contenuto di `google-apps-script.gs`
4. Salva (Ctrl+S) → rinomina progetto in `TeleCare CSP Novi Backend`
5. **Deploy** → **Nuova distribuzione**:
   - Tipo: **Applicazione web**
   - Esegui come: **Me**
   - Chi ha accesso: **Chiunque**
   - **Deploy**
6. **COPIA L'URL** generato (es: `https://script.google.com/.../exec`)

### ✅ STEP 3: Inizializza Database (1 min)

Nell'editor Apps Script:
1. Seleziona funzione `populateSampleData` dal menu a tendina
2. Clicca **Esegui** (▶️)
3. Autorizza lo script quando richiesto
4. Torna al Google Sheet → vedrai 8 assistiti di esempio

### ✅ STEP 4: Configura Frontend (1 min)

1. Apri `index.html` con un editor di testo
2. Cerca la riga 375:
   ```javascript
   const SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';
   ```
3. Sostituisci con il tuo URL (quello copiato allo Step 2):
   ```javascript
   const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx.../exec';
   ```
4. Salva il file

### ✅ STEP 5: Pubblica su GitHub Pages (3 min)

**Opzione A - Upload Web (più facile):**

1. Vai su [github.com](https://github.com) → login con account **Telecare**
2. **+** → **New repository**:
   - Nome: `csp-novi-telecare`
   - Public ✅
   - **Create repository**
3. **Add file** → **Upload files**
4. Trascina tutti i file (specialmente `index.html` modificato)
5. **Commit changes**
6. **Settings** → **Pages**:
   - Source: **main** branch
   - Save
7. Aspetta 2 minuti → il tuo link sarà:
   ```
   https://telecare.github.io/csp-novi-telecare/
   ```

**Opzione B - Git CLI (per esperti):**

```bash
git clone https://github.com/Telecare/csp-novi-telecare.git
cd csp-novi-telecare
# Copia i file nella cartella
git add .
git commit -m "Deploy TeleCare CSP Novi v1.0.0"
git push origin main
# Poi abilita Pages da Settings → Pages
```

---

## 🎉 Fatto! Sistema Online

Visita: **https://telecare.github.io/csp-novi-telecare/**

Dovresti vedere:
- ✅ Dashboard con 5 contatori
- ✅ Tabella con gli 8 assistiti di esempio
- ✅ Filtri funzionanti

---

## 🔧 Prossimi Passi

### 1. Sostituisci Dati di Esempio con Dati Reali

Nel Google Sheet:
- Cancella le righe 2-9 (assistiti di esempio)
- Inserisci i tuoi 50 assistiti reali
- Segui la struttura in [DATABASE-STRUCTURE.md](DATABASE-STRUCTURE.md)

### 2. Personalizza (Opzionale)

- Logo CSP: Aggiungi logo nell'header HTML
- Colori: Modifica gradient CSS se desiderato
- Footer: Aggiorna contatti nel footer

### 3. Condividi

Usa i template in [MESSAGGIO-CONDIVISIONE.txt](MESSAGGIO-CONDIVISIONE.txt) per:
- Email al team
- Condivisione operatori sanitari
- Comunicazione famiglie

---

## ❓ Problemi?

### "Errore nel caricamento dati"
→ Verifica che l'URL in `index.html` sia corretto e termini con `/exec`

### "Autorizzazioni negate"
→ Riesegui una funzione nell'Apps Script editor e riautorizza

### "GitHub Pages non funziona"
→ Aspetta 5 minuti, poi svuota cache browser (Ctrl+Shift+R)

### "Dati non aggiornati"
→ Clicca sul pulsante "🔄 Aggiorna" nella dashboard

---

## 📚 Guide Complete

- 📖 **Documentazione completa**: [README.md](README.md)
- 📘 **Setup dettagliato**: [SETUP-GUIDE.md](SETUP-GUIDE.md)
- 📊 **Schema database**: [DATABASE-STRUCTURE.md](DATABASE-STRUCTURE.md)

---

## 📞 Supporto

**CSP Novi Ligure**
- 📧 assistenza@csp-novi.it
- 📱 0143 XXX XXX

---

**Buon lavoro! 🚀**

Sistema pronto in 10 minuti per gestire 50 assistiti su 30 comuni!