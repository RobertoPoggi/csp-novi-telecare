# 📊 Struttura Database - Google Sheets

## Nome Foglio: `Assistiti_CSP_Novi`

### Colonne del Database (16 colonne totali)

| # | Nome Colonna | Tipo | Descrizione | Esempio |
|---|--------------|------|-------------|---------|
| A | **ID** | Testo | Identificativo univoco assistito | CSP001, CSP002, CSP003 |
| B | **Cognome** | Testo | Cognome assistito | Rossi, Verdi, Bianchi |
| C | **Nome** | Testo | Nome assistito | Mario, Giuseppe, Laura |
| D | **Codice Fiscale** | Testo | CF (16 caratteri) | RSSMRA45A01D969H |
| E | **Data Nascita** | Data | Formato: gg/mm/aaaa | 01/01/1945 |
| F | **Comune** | Testo | Uno dei 30 comuni del Novese | Novi Ligure, Gavi, Ovada |
| G | **Indirizzo** | Testo | Via completa | Via Roma 1 |
| H | **Telefono** | Testo | Numero di telefono | 0143123456 |
| I | **Tipo Servizio** | Enum | TeleAssistenza o TeleMonitoraggio | TeleAssistenza |
| J | **Dispositivi** | Testo | Dispositivi assegnati | SiDLY CARE PRO |
| K | **Stato** | Enum | Installato, Pianificato, Sospeso | Installato |
| L | **Data Installazione** | Data | Data effettiva installazione | 15/01/2024 |
| M | **Data Pianificazione** | Data | Data prevista installazione | 05/02/2024 |
| N | **Note** | Testo | Note operative | Dispositivo attivo H24 |
| O | **Tecnico Installazione** | Testo | Nome tecnico responsabile | Tecnico A |
| P | **Referente ASL** | Testo | Medico/operatore ASL referente | Dott. Bianchi |

---

## 📋 Valori Ammessi

### Tipo Servizio (Colonna I)
- `TeleAssistenza` → 45 assistiti con SiDLY CARE PRO
- `TeleMonitoraggio` → 5 assistiti con ECG BC1

### Dispositivi (Colonna J)

**Per TeleAssistenza:**
- `SiDLY CARE PRO`

**Per TeleMonitoraggio:**
- `ECG BC1 + HUB + Connect`
- `ECG BC1 + Smartphone HUB + Telecare Connect` (forma estesa)

### Stato (Colonna K)
- `Installato` → Dispositivo attivo e funzionante
- `Pianificato` → Installazione programmata, non ancora effettuata
- `Sospeso` → Servizio temporaneamente non attivo

### Comuni del Novese (Colonna F) - 30 totali

```
Arquata Scrivia
Basaluzzo
Bosco Marengo
Borghetto di Borbera
Cabella Ligure
Capriata d'Orba
Carezzano
Carpeneto
Carrosio
Cassano Spinola
Castellania Coppi
Francavilla Bisio
Fresonara
Gavi
Grondona
Molare
Montaldeo
Novi Ligure
Ovada
Parodi Ligure
Pasturana
Pozzolo Formigaro
Predosa
Roccaforte Ligure
San Cristoforo
Serravalle Scrivia
Silvano d'Orba
Tassarolo
Voltaggio
[+ 1 altro comune]
```

---

## 🔢 Distribuzione Prevista

### Per Tipo Servizio
- **TeleAssistenza**: 45 assistiti (90%)
- **TeleMonitoraggio**: 5 assistiti (10%)
- **TOTALE**: 50 assistiti (100%)

### Per Stato
- **Target finale**:
  - Installati: 50 (100%)
  - Pianificati: 0 (dopo completamento)

### Per Comune
Distribuzione basata su popolazione e fabbisogno territoriale (da definire con CSP)

---

## 📝 Esempi di Righe Complete

### Esempio 1: TeleAssistenza Installato
```
CSP001 | Rossi | Mario | RSSMRA45A01D969H | 01/01/1945 | Novi Ligure | Via Roma 1 | 0143123456 | TeleAssistenza | SiDLY CARE PRO | Installato | 15/01/2024 | | Dispositivo attivo H24 | Tecnico A | Dott. Bianchi
```

### Esempio 2: TeleAssistenza Pianificato
```
CSP004 | Ferrari | Giovanni | FRRGNN42D10D969P | 10/04/1942 | Serravalle Scrivia | Via Torino 8 | 0143456789 | TeleAssistenza | SiDLY CARE PRO | Pianificato | | 05/02/2024 | Installazione prevista | Tecnico C | Dott. Verdi
```

### Esempio 3: TeleMonitoraggio Installato
```
CSP006 | Russo | Antonio | RSSANT38F20D969S | 20/06/1938 | Novi Ligure | Corso Italia 20 | 0143678901 | TeleMonitoraggio | ECG BC1 + HUB + Connect | Installato | 01/02/2024 | | Cardiopatico, monitoraggio attivo | Tecnico A | Dott. Cardiologi
```

---

## 🎨 Formattazione Foglio

### Riga di Intestazione (Riga 1)
- **Sfondo**: Blu CSP (#1e5799)
- **Testo**: Bianco (#ffffff)
- **Font**: Grassetto
- **Congelata**: Sì (sempre visibile durante scroll)

### Formati Celle

**Date (Colonne E, L, M):**
- Formato: `gg/mm/aaaa`
- Esempio: `15/01/2024`

**Codice Fiscale (Colonna D):**
- Testo maiuscolo
- 16 caratteri esatti

**ID (Colonna A):**
- Pattern: `CSP` + numero a 3 cifre
- Esempi: `CSP001`, `CSP050`

**Telefono (Colonna H):**
- Formato libero (con o senza prefisso internazionale)
- Esempi: `0143123456`, `+39 0143 123456`

### Larghezza Colonne Consigliate
- ID: 70px
- Cognome/Nome: 120px
- Codice Fiscale: 140px
- Date: 100px
- Comune: 150px
- Indirizzo: 200px
- Tipo Servizio: 130px
- Dispositivi: 200px
- Stato: 100px
- Note: 250px
- Resto: Auto

---

## 🔒 Validazione Dati

### Regole di Validazione Consigliate

**Colonna I (Tipo Servizio):**
```
Elenco da intervallo: TeleAssistenza, TeleMonitoraggio
```

**Colonna K (Stato):**
```
Elenco da intervallo: Installato, Pianificato, Sospeso
```

**Colonna F (Comune):**
```
Elenco da intervallo: [30 comuni del Novese]
```

**Colonna D (Codice Fiscale):**
```
Testo con lunghezza: esattamente 16 caratteri
```

---

## 📊 Formule Utili

### Conteggio Automatico (in un foglio separato "Statistiche")

```excel
// Totale Assistiti
=COUNTA(Assistiti_CSP_Novi!A2:A51)

// TeleAssistenza
=COUNTIF(Assistiti_CSP_Novi!I:I,"TeleAssistenza")

// TeleMonitoraggio
=COUNTIF(Assistiti_CSP_Novi!I:I,"TeleMonitoraggio")

// Installati
=COUNTIF(Assistiti_CSP_Novi!K:K,"Installato")

// Pianificati
=COUNTIF(Assistiti_CSP_Novi!K:K,"Pianificato")

// Assistiti per Comune (esempio Novi Ligure)
=COUNTIF(Assistiti_CSP_Novi!F:F,"Novi Ligure")
```

---

## 🔄 Workflow Aggiornamento Stato

### Flusso Standard

1. **Nuovo Assistito**
   - Stato iniziale: `Pianificato`
   - Compilare: ID, dati anagrafici, tipo servizio, data pianificazione

2. **Pre-Installazione**
   - Verificare: disponibilità dispositivo, accessibilità domicilio
   - Aggiornare: note operative, tecnico assegnato

3. **Installazione Completata**
   - Cambiare stato: `Pianificato` → `Installato`
   - Compilare: Data Installazione
   - Aggiornare: Note con esito test

4. **Eventuale Sospensione**
   - Cambiare stato: `Installato` → `Sospeso`
   - Aggiungere note: motivo sospensione, data prevista riattivazione

---

## 🚀 Import Dati di Massa

### Formato CSV per Import

```csv
ID,Cognome,Nome,Codice Fiscale,Data Nascita,Comune,Indirizzo,Telefono,Tipo Servizio,Dispositivi,Stato,Data Installazione,Data Pianificazione,Note,Tecnico Installazione,Referente ASL
CSP001,Rossi,Mario,RSSMRA45A01D969H,01/01/1945,Novi Ligure,Via Roma 1,0143123456,TeleAssistenza,SiDLY CARE PRO,Installato,15/01/2024,,Dispositivo attivo H24,Tecnico A,Dott. Bianchi
```

### Procedura Import
1. Preparare file CSV con encoding UTF-8
2. Google Sheets → File → Importa
3. Selezionare file CSV
4. Opzioni: "Aggiungi fogli" o "Sostituisci dati"
5. Separatore: Virgola
6. Importa dati

---

## 📞 Supporto

Per domande sulla struttura del database:
- 📧 assistenza@csp-novi.it
- 📱 0143 XXX XXX

---

**Versione Database**: 1.0.0  
**Ultimo aggiornamento**: Dicembre 2024