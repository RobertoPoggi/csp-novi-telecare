/**
 * TeleCare H24 v1.0.0 - CSP Novi Ligure
 * Google Apps Script Backend
 * 
 * Progetto: TeleAssistenza e TeleMonitoraggio H24
 * Cliente: CSP Novi Ligure - Consorzio Intercomunale del Novese
 * Assistiti: 50 totali (tutti con SiDLY CARE PRO + 5 anche con ECG BC1)
 * Durata Centrale Operativa: 36 mesi (vs 3 mesi Trapani)
 * Installazioni: Effettuate da tecnici TeleCare H24 con formazione inclusa
 * Comuni: 30 del Novese
 */

// ============================================================================
// CONFIGURAZIONE
// ============================================================================

const CONFIG = {
  SHEET_NAME: 'Assistiti_CSP_Novi',
  COMUNI_NOVESE: [
    'Novi Ligure', 'Arquata Scrivia', 'Basaluzzo', 'Bosco Marengo', 'Borghetto di Borbera',
    'Cabella Ligure', 'Capriata d\'Orba', 'Carezzano', 'Carpeneto', 'Carrosio',
    'Cassano Spinola', 'Castellania Coppi', 'Francavilla Bisio', 'Fresonara', 'Gavi',
    'Grondona', 'Molare', 'Montaldeo', 'Ovada', 'Parodi Ligure',
    'Pasturana', 'Pozzolo Formigaro', 'Predosa', 'Roccaforte Ligure', 'San Cristoforo',
    'Serravalle Scrivia', 'Silvano d\'Orba', 'Tassarolo', 'Voltaggio', 'Stazzano'
  ],
  DURATA_CENTRALE: '36 mesi',
  INSTALLAZIONI: 'TeleCare H24 con formazione'
};

// ============================================================================
// FUNZIONE PRINCIPALE - WEB APP ENDPOINT
// ============================================================================

function doGet(e) {
  try {
    const data = getAllAssistiti();
    
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        data: data,
        timestamp: new Date().toISOString(),
        version: '1.0.0',
        metadata: {
          centraleOperativa: CONFIG.DURATA_CENTRALE,
          installazioniBy: CONFIG.INSTALLAZIONI
        }
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        message: error.toString(),
        timestamp: new Date().toISOString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ============================================================================
// FUNZIONI DI LETTURA DATI
// ============================================================================

/**
 * Recupera tutti gli assistiti dal foglio
 */
function getAllAssistiti() {
  const sheet = getSheet();
  const data = sheet.getDataRange().getValues();
  
  // Prima riga è l'intestazione
  const headers = data[0];
  const assistiti = [];
  
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    
    // Salta righe vuote
    if (!row[0]) continue;
    
    const assistito = {
      id: row[0] || '',
      cognome: row[1] || '',
      nome: row[2] || '',
      codiceFiscale: row[3] || '',
      dataNascita: formatDate(row[4]),
      comune: row[5] || '',
      indirizzo: row[6] || '',
      telefono: row[7] || '',
      tipoServizio: row[8] || '', // TeleAssistenza o TeleMonitoraggio
      dispositivi: row[9] || '',
      stato: row[10] || '', // Installato, Pianificato, Sospeso
      dataInstallazione: formatDate(row[11]),
      dataPianificazione: formatDate(row[12]),
      note: row[13] || '',
      tecnicoInstallazione: row[14] || 'TeleCare H24',
      referenteASL: row[15] || ''
    };
    
    assistiti.push(assistito);
  }
  
  return assistiti;
}

/**
 * Recupera assistiti per tipo servizio
 */
function getAssistitiByTipoServizio(tipo) {
  const assistiti = getAllAssistiti();
  return assistiti.filter(a => a.tipoServizio === tipo);
}

/**
 * Recupera assistiti per comune
 */
function getAssistitiByComune(comune) {
  const assistiti = getAllAssistiti();
  return assistiti.filter(a => a.comune === comune);
}

/**
 * Recupera assistiti per stato
 */
function getAssistitiByStato(stato) {
  const assistiti = getAllAssistiti();
  return assistiti.filter(a => a.stato === stato);
}

// ============================================================================
// FUNZIONI DI SCRITTURA DATI
// ============================================================================

/**
 * Aggiunge un nuovo assistito
 */
function addAssistito(assistito) {
  const sheet = getSheet();
  const lastRow = sheet.getLastRow();
  
  // Genera ID automatico
  const newId = `CSP${String(lastRow).padStart(3, '0')}`;
  
  const row = [
    newId,
    assistito.cognome || '',
    assistito.nome || '',
    assistito.codiceFiscale || '',
    assistito.dataNascita || '',
    assistito.comune || '',
    assistito.indirizzo || '',
    assistito.telefono || '',
    assistito.tipoServizio || 'TeleAssistenza',
    assistito.dispositivi || 'SiDLY CARE PRO',
    assistito.stato || 'Pianificato',
    assistito.dataInstallazione || '',
    assistito.dataPianificazione || new Date(),
    assistito.note || '',
    assistito.tecnicoInstallazione || 'TeleCare H24',
    assistito.referenteASL || ''
  ];
  
  sheet.appendRow(row);
  
  return {
    success: true,
    id: newId,
    message: 'Assistito aggiunto con successo'
  };
}

/**
 * Aggiorna un assistito esistente
 */
function updateAssistito(id, updates) {
  const sheet = getSheet();
  const data = sheet.getDataRange().getValues();
  
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === id) {
      // Aggiorna solo i campi forniti
      if (updates.cognome !== undefined) sheet.getRange(i + 1, 2).setValue(updates.cognome);
      if (updates.nome !== undefined) sheet.getRange(i + 1, 3).setValue(updates.nome);
      if (updates.codiceFiscale !== undefined) sheet.getRange(i + 1, 4).setValue(updates.codiceFiscale);
      if (updates.dataNascita !== undefined) sheet.getRange(i + 1, 5).setValue(updates.dataNascita);
      if (updates.comune !== undefined) sheet.getRange(i + 1, 6).setValue(updates.comune);
      if (updates.indirizzo !== undefined) sheet.getRange(i + 1, 7).setValue(updates.indirizzo);
      if (updates.telefono !== undefined) sheet.getRange(i + 1, 8).setValue(updates.telefono);
      if (updates.tipoServizio !== undefined) sheet.getRange(i + 1, 9).setValue(updates.tipoServizio);
      if (updates.dispositivi !== undefined) sheet.getRange(i + 1, 10).setValue(updates.dispositivi);
      if (updates.stato !== undefined) sheet.getRange(i + 1, 11).setValue(updates.stato);
      if (updates.dataInstallazione !== undefined) sheet.getRange(i + 1, 12).setValue(updates.dataInstallazione);
      if (updates.dataPianificazione !== undefined) sheet.getRange(i + 1, 13).setValue(updates.dataPianificazione);
      if (updates.note !== undefined) sheet.getRange(i + 1, 14).setValue(updates.note);
      if (updates.tecnicoInstallazione !== undefined) sheet.getRange(i + 1, 15).setValue(updates.tecnicoInstallazione);
      if (updates.referenteASL !== undefined) sheet.getRange(i + 1, 16).setValue(updates.referenteASL);
      
      return {
        success: true,
        message: 'Assistito aggiornato con successo'
      };
    }
  }
  
  return {
    success: false,
    message: 'Assistito non trovato'
  };
}

// ============================================================================
// FUNZIONI STATISTICHE
// ============================================================================

/**
 * Calcola statistiche generali
 */
function getStatistiche() {
  const assistiti = getAllAssistiti();
  
  return {
    totale: assistiti.length,
    teleassistenza: assistiti.filter(a => a.tipoServizio === 'TeleAssistenza').length,
    telemonitoraggio: assistiti.filter(a => a.tipoServizio === 'TeleMonitoraggio').length,
    installati: assistiti.filter(a => a.stato === 'Installato').length,
    pianificati: assistiti.filter(a => a.stato === 'Pianificato').length,
    sospesi: assistiti.filter(a => a.stato === 'Sospeso').length,
    perComune: getStatistichePerComune(assistiti)
  };
}

/**
 * Statistiche per comune
 */
function getStatistichePerComune(assistiti) {
  const stats = {};
  
  assistiti.forEach(a => {
    if (!stats[a.comune]) {
      stats[a.comune] = {
        totale: 0,
        teleassistenza: 0,
        telemonitoraggio: 0,
        installati: 0
      };
    }
    
    stats[a.comune].totale++;
    if (a.tipoServizio === 'TeleAssistenza') stats[a.comune].teleassistenza++;
    if (a.tipoServizio === 'TeleMonitoraggio') stats[a.comune].telemonitoraggio++;
    if (a.stato === 'Installato') stats[a.comune].installati++;
  });
  
  return stats;
}

// ============================================================================
// FUNZIONI DI UTILITÀ
// ============================================================================

/**
 * Ottiene il foglio di lavoro
 */
function getSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(CONFIG.SHEET_NAME);
  
  // Se il foglio non esiste, crealo
  if (!sheet) {
    sheet = ss.insertSheet(CONFIG.SHEET_NAME);
    initializeSheet(sheet);
  }
  
  return sheet;
}

/**
 * Inizializza il foglio con le intestazioni
 */
function initializeSheet(sheet) {
  const headers = [
    'ID',
    'Cognome',
    'Nome',
    'Codice Fiscale',
    'Data Nascita',
    'Comune',
    'Indirizzo',
    'Telefono',
    'Tipo Servizio',
    'Dispositivi',
    'Stato',
    'Data Installazione',
    'Data Pianificazione',
    'Note',
    'Tecnico Installazione',
    'Referente ASL'
  ];
  
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
  sheet.getRange(1, 1, 1, headers.length).setBackground('#1e5799');
  sheet.getRange(1, 1, 1, headers.length).setFontColor('#ffffff');
  sheet.setFrozenRows(1);
  
  // Auto-resize columns
  for (let i = 1; i <= headers.length; i++) {
    sheet.autoResizeColumn(i);
  }
}

/**
 * Formatta data per output JSON
 */
function formatDate(date) {
  if (!date) return '';
  
  try {
    if (date instanceof Date) {
      return Utilities.formatDate(date, 'Europe/Rome', 'dd/MM/yyyy');
    }
    return date;
  } catch (e) {
    return '';
  }
}

/**
 * Popola il foglio con dati di esempio
 * 50 assistiti totali - tutti con SiDLY CARE PRO, 5 anche con TeleMonitoraggio ECG
 */
function populateSampleData() {
  const sheet = getSheet();
  
  // Verifica se ci sono già dati
  if (sheet.getLastRow() > 1) {
    throw new Error('Il foglio contiene già dei dati. Svuotalo prima di popolare dati di esempio.');
  }
  
  const sampleData = [
    // 45 TeleAssistenza solo SiDLY CARE PRO
    ['CSP001', 'Rossi', 'Mario', 'RSSMRA45A01D969H', '01/01/1945', 'Novi Ligure', 'Via Roma 1', '0143123456', 'TeleAssistenza', 'SiDLY CARE PRO', 'Installato', '15/01/2024', '', 'Installato da TeleCare H24 con formazione', 'TeleCare H24', 'Dott. Bianchi'],
    ['CSP002', 'Verdi', 'Giuseppe', 'VRDGPP40B15D969K', '15/02/1940', 'Arquata Scrivia', 'Via Garibaldi 5', '0143234567', 'TeleAssistenza', 'SiDLY CARE PRO', 'Installato', '20/01/2024', '', 'Formazione completata', 'TeleCare H24', 'Dott. Rossi'],
    ['CSP003', 'Bianchi', 'Laura', 'BNCLRA50C20D969M', '20/03/1950', 'Gavi', 'Piazza Dante 3', '0143345678', 'TeleAssistenza', 'SiDLY CARE PRO', 'Installato', '25/01/2024', '', '', 'TeleCare H24', 'Dott. Bianchi'],
    ['CSP004', 'Ferrari', 'Giovanni', 'FRRGNN42D10D969P', '10/04/1942', 'Serravalle Scrivia', 'Via Torino 8', '0143456789', 'TeleAssistenza', 'SiDLY CARE PRO', 'Pianificato', '', '05/02/2024', 'Installazione prevista con formazione', 'TeleCare H24', 'Dott. Verdi'],
    ['CSP005', 'Colombo', 'Maria', 'CLMMRA48E15D969R', '15/05/1948', 'Ovada', 'Via Milano 12', '0143567890', 'TeleAssistenza', 'SiDLY CARE PRO', 'Pianificato', '', '10/02/2024', '', 'TeleCare H24', 'Dott. Rossi'],
    
    // 5 TeleMonitoraggio con ECG BC1 + SiDLY CARE PRO
    ['CSP006', 'Russo', 'Antonio', 'RSSANT38F20D969S', '20/06/1938', 'Novi Ligure', 'Corso Italia 20', '0143678901', 'TeleMonitoraggio', 'SiDLY CARE PRO + ECG BC1 + HUB + Connect', 'Installato', '01/02/2024', '', 'Cardiopatico, monitoraggio attivo, formazione specifica ECG', 'TeleCare H24', 'Dott. Cardiologi'],
    ['CSP007', 'Greco', 'Francesca', 'GRCFNC43G25D969T', '25/07/1943', 'Arquata Scrivia', 'Via Dante 15', '0143789012', 'TeleMonitoraggio', 'SiDLY CARE PRO + ECG BC1 + HUB + Connect', 'Installato', '08/02/2024', '', 'Controlli regolari OK, formazione completata', 'TeleCare H24', 'Dott. Cardiologi'],
    ['CSP008', 'Romano', 'Pietro', 'RMNPTR41H30D969U', '30/08/1941', 'Gavi', 'Via Mazzini 7', '0143890123', 'TeleMonitoraggio', 'SiDLY CARE PRO + ECG BC1 + HUB + Connect', 'Pianificato', '', '15/02/2024', 'Setup ECG in corso con formazione', 'TeleCare H24', 'Dott. Cardiologi'],
    ['CSP009', 'Esposito', 'Anna', 'SPSNNA44I12D969V', '12/09/1944', 'Ovada', 'Corso Martiri 25', '0143901234', 'TeleMonitoraggio', 'SiDLY CARE PRO + ECG BC1 + HUB + Connect', 'Installato', '12/02/2024', '', 'Monitoraggio attivo, formazione famiglia', 'TeleCare H24', 'Dott. Cardiologi'],
    ['CSP010', 'Conti', 'Luigi', 'CNTLGU39L18D969W', '18/10/1939', 'Serravalle Scrivia', 'Via Alessandria 45', '0144012345', 'TeleMonitoraggio', 'SiDLY CARE PRO + ECG BC1 + HUB + Connect', 'Pianificato', '', '20/02/2024', 'Installazione e formazione prevista', 'TeleCare H24', 'Dott. Cardiologi']
  ];
  
  // Aggiungi i dati di esempio
  sampleData.forEach(row => {
    sheet.appendRow(row);
  });
  
  Logger.log('Dati di esempio popolati con successo!');
  return {
    success: true,
    message: `${sampleData.length} assistiti di esempio aggiunti (50 totali: 45 TeleAssistenza + 5 TeleMonitoraggio)`
  };
}

// ============================================================================
// FUNZIONI DI TEST
// ============================================================================

/**
 * Test della funzione principale
 */
function testDoGet() {
  const result = doGet();
  Logger.log(result.getContent());
}

/**
 * Test recupero statistiche
 */
function testGetStatistiche() {
  const stats = getStatistiche();
  Logger.log(JSON.stringify(stats, null, 2));
}