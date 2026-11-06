const fs = require('fs');

const svgIcons = {
  Building2: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/></svg>`,
  Landmark: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="3" x2="21" y1="22" y2="22"/><line x1="6" x2="6" y1="18" y2="11"/><line x1="10" x2="10" y1="18" y2="11"/><line x1="14" x2="14" y1="18" y2="11"/><line x1="18" x2="18" y1="18" y2="11"/><polygon points="12 2 20 7 4 7"/></svg>`,
  Wallet: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"/><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"/></svg>`,
  Wrench: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`,
  Flame: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>`,
  ClipboardList: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 11h4"/><path d="M12 16h4"/><path d="M8 11h.01"/><path d="M8 16h.01"/></svg>`,
  TrendingDown: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="22 17 13.5 8.5 8.5 13.5 2 7"/><polyline points="16 17 22 17 22 11"/></svg>`,
  CreditCard: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>`,
  UsersRound: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 21a8 8 0 0 0-16 0"/><circle cx="10" cy="8" r="5"/><path d="M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3"/></svg>`,
  ShieldAlert: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>`,
  FileSpreadsheet: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M8 13h2"/><path d="M14 13h2"/><path d="M8 17h2"/><path d="M14 17h2"/></svg>`,
  Scale: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/></svg>`,
  ArrowUpRight: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>`,
  ArrowRight: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>`,
  ArrowDownRight: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m7 7 10 10"/><path d="M17 7v10H7"/></svg>`,
  ArrowLeft: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>`,
  MapPin: `<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg>`,
  Phone: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
  Mail: `<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`,
  Check: `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>`,
  Menu: `<svg class="icon-menu" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>`,
  Close: `<svg class="icon-close" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`,
  Download: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`,
  ExternalLink: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>`,
  Calculator: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="16" height="20" x="4" y="2" rx="2"/><line x1="8" x2="16" y1="6" y2="6"/><line x1="16" x2="16" y1="14" y2="18"/><path d="M16 10h.01"/><path d="M12 10h.01"/><path d="M8 10h.01"/><path d="M12 14h.01"/><path d="M8 14h.01"/><path d="M12 18h.01"/><path d="M8 18h.01"/></svg>`,
  AlertTriangle: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`
};

const studioConfig = {
  studioName: "Studio Fontana",
  administrator: "Filomena Fontana",
  role: "Presidente regionale Emilia-Romagna · AIC-CONDIVISION",
  vatId: "03427431204",
  city: "Vergato",
  serviceArea: "Vergato, Bologna e provincia",
  streetAddress: "Piazza IV Novembre, 4/B",
  postalCode: "40038",
  locality: "Vergato",
  province: "BO",
  phone: "+39 333 344 9742",
  phoneHref: "tel:+393333449742",
  openingHours: [
    { days: "Lunedì, martedì e giovedì", morning: "10:00–12:30", afternoon: "14:00–18:00" },
    { days: "Venerdì", morning: "10:00–12:00", afternoon: "14:30–18:00" },
    { days: "Mercoledì", morning: "Chiuso", afternoon: "Su appuntamento" }
  ]
};

// I 12 SERVIZI UFFICIALI DELLO STUDIO FONTANA RICHIESTI DALL'UTENTE
const officialServices = [
  {
    num: "01",
    icon: svgIcons.Building2,
    title: "AMMINISTRAZIONE CONDOMINI E SUPERCONDOMINI",
    shortTitle: "Amministrazione Condomini e Supercondomini",
    desc: "Rappresentanza legale, gestione assembleare e cura scrupolosa delle parti e degli impianti comuni di edifici residenziali, commerciali e complessi a supercondominio (art. 1117-bis c.c.)."
  },
  {
    num: "02",
    icon: svgIcons.Landmark,
    title: "GESTIONE PATRIMONI IMMOBILIARI E AMMINISTRAZIONE CONTO TERZI",
    shortTitle: "Gestione Patrimoni Immobiliari e Conto Terzi",
    desc: "Gestione e valorizzazione professionale di patrimoni immobiliari per privati, famiglie e società, con supervisione amministrativa, contratti di locazione e manutenzioni conto terzi."
  },
  {
    num: "03",
    icon: svgIcons.Wallet,
    title: "GESTIONE TRASPARENTE E DETTAGLIATA DELLA CONTABILITA’",
    shortTitle: "Gestione Trasparente e Dettagliata della Contabilità",
    desc: "Tenuta analitica della contabilità a partita doppia su conto corrente dedicato, quadrature bancarie al centesimo, registro di contabilità e pezze d'appoggio sempre consultabili (art. 1130-bis c.c.)."
  },
  {
    num: "04",
    icon: svgIcons.Wrench,
    title: "MANUTENZIONI ORDINARIE E STRAORDINARIE E GESTIONE RISTRUTTURAZIONI EDILIZIE",
    shortTitle: "Manutenzioni Ordinarie, Straordinarie e Ristrutturazioni",
    desc: "Pianificazione di interventi conservativi periodici e direzione amministrativa di ristrutturazioni edili complesse, con gare d'appalto a confronto preventivi e contratti di garanzia."
  },
  {
    num: "05",
    icon: svgIcons.Flame,
    title: "AMMINISTRAZIONE CENTRALI TERMICHE",
    shortTitle: "Amministrazione Centrali Termiche",
    desc: "Gestione tecnica e contabile di impianti di riscaldamento e climatizzazione centralizzati, adempimenti terzo responsabile, contabilizzazione del calore e rispetto della norma UNI 10200."
  },
  {
    num: "06",
    icon: svgIcons.ClipboardList,
    title: "ADEMPIMENTI FISCALI, CONSULENZE E REDAZIONE PRATICHE EDILIZIE",
    shortTitle: "Adempimenti Fiscali, Consulenze e Pratiche Edilizie",
    desc: "Elaborazione e trasmissione telematica di Modello 770, Certificazioni Uniche (CU fornitori), quadro AC dei redditi, F24 per ritenute e pratiche ENEA per agevolazioni fiscali."
  },
  {
    num: "07",
    icon: svgIcons.TrendingDown,
    title: "VALUTAZIONE DEL PROCESSO DI REVISIONE E RAZIONALIZZAZIONE DELLA SPESA",
    shortTitle: "Revisione e Razionalizzazione della Spesa",
    desc: "Analisi comparativa dei contratti di fornitura (energia, pulizie, ascensori, assicurazioni), revisione contabile di bilanci pregressi ed eliminazione degli sprechi per ottimizzare i costi."
  },
  {
    num: "08",
    icon: svgIcons.CreditCard,
    title: "RISCOSSIONE QUOTE CONDOMINIALI",
    shortTitle: "Riscossione Quote Condominiali",
    desc: "Emissione puntuale delle rate ordinarie e straordinarie (MAV / PagoPA / bonifici), controllo costante dei pagamenti e solleciti tempestivi ai sensi dell'art. 1129, comma 9 c.c."
  },
  {
    num: "09",
    icon: svgIcons.UsersRound,
    title: "RIPARTIZIONE SPESE TRA PROPRIETARIO E INQUILINO",
    shortTitle: "Ripartizione Spese tra Proprietario e Inquilino",
    desc: "Calcolo analitico e suddivisione rigorosa degli oneri accessori tra locatore e conduttore secondo la Legge 392/1978 e le tabelle di ripartizione concordate (es. Confedilizia / Sunia)."
  },
  {
    num: "10",
    icon: svgIcons.ShieldAlert,
    title: "GESTIONE SINISTRI ASSICURATIVI E PRATICHE LEGALI CONDOMINIALI",
    shortTitle: "Gestione Sinistri Assicurativi e Pratiche Legali",
    desc: "Apertura e gestione peritale dei sinistri con la polizza globale fabbricati (danni da acqua, infiltrazioni, eventi meteo), sollecito liquidazioni e coordinamento con i legali dello stabile."
  },
  {
    num: "11",
    icon: svgIcons.FileSpreadsheet,
    title: "REDAZIONE E REVISIONE TABELLE MILLESIMALI E REGOLAMENTI CONDOMINIALI",
    shortTitle: "Tabelle Millesimali e Regolamenti Condominiali",
    desc: "Elaborazione tecnica e revisione delle tabelle millesimali generali, scale, ascensori e riscaldamento; stesura e adeguamento normativo del regolamento di condominio (art. 1138 c.c.)."
  },
  {
    num: "12",
    icon: svgIcons.Scale,
    title: "GESTIONE CONFLITTI TRA CONDOMINI",
    shortTitle: "Gestione Conflitti tra Condomini (Mediazione)",
    desc: "Intervento tempestivo e imparziale dell'amministratrice e mediatrice civile per prevenire e comporre bonariamente le tensioni di vicinato prima di ricorrere a costose cause giudiziarie."
  }
];

const howWeWorkSteps = [
  { step: "01", title: "Come si diventa cliente", desc: "Richiesta preventivo gratuita e senza impegno. Presentiamo un'offerta analitica chiara che viene sottoposta alla delibera dell'assemblea con la maggioranza dell'art. 1136 c.c." },
  { step: "02", title: "Passaggio di consegne rigoroso", desc: "Presa in carico formale con verbale di consegna: verifica dei bilanci pregressi, estratto conto bancario, registri di anagrafe e sicurezza, fornitori e pratiche aperte." },
  { step: "03", title: "Strumenti digitali per i condòmini", desc: "Ogni condomino ha accesso alla propria area riservata per consultare rate, bollettini, fatture scansionate, verbali e aprire segnalazioni guasti in tempo reale." },
  { step: "04", title: "Trasparenza totale dei costi", desc: "Il compenso per la gestione ordinaria e per gli adempimenti fiscali è specificato al centesimo all'atto della nomina (art. 1129 c.c.). Nessuna voce occulta o sorpresa." }
];

const localZones = [
  "Vergato (Sede centrale)", "Bologna (Tutti i quartieri)", "Marzabotto",
  "Porretta Terme / Alto Reno", "Sasso Marconi", "Casalecchio di Reno",
  "Gaggio Montano", "Castel d'Aiano", "Pianoro", "San Lazzaro di Savena",
  "Appennino Bolognese", "Provincia di Bologna"
];

const officialPortals = [
  { tag: "ASSOCIAZIONE NAZIONALE", title: "AIC-CONDIVISION", desc: "Associazione Italiana Condominio: attestazione dei requisiti di legge e tutela della qualità professionale (Presidenza Emilia-Romagna).", url: "https://aic-condivision.it", label: "Portale AIC-CONDIVISION" },
  { tag: "GIURISPRUDENZA", title: "Condominioweb", desc: "La principale testata giuridica italiana sul condominio: sentenze commentate, dottrina e guide per amministratori e condòmini.", url: "https://www.condominioweb.com", label: "Consulta Condominioweb" },
  { tag: "FISCO & BILANCI", title: "Il Sole 24 Ore - Quotidiano Condominio", desc: "Approfondimenti autorevoli su fiscalità, ritenute d'acconto, bilanci, scadenze CU e 770 e bonus edilizi.", url: "https://ntpluscondominio.ilsole24ore.com", label: "Il Sole 24 Ore" },
  { tag: "CASSAZIONE CIVILE", title: "Corte Suprema di Cassazione", desc: "Archivio sentenze e ordinanze ufficiali della Seconda Sezione Civile su millesimi, delibere e parti comuni.", url: "https://www.cortedicassazione.it", label: "Sentenze Cassazione" },
  { tag: "AGENZIA DELLE ENTRATE", title: "Agenzia Entrate - Sezione Condominio", desc: "Guide su detrazioni per interventi sulle parti comuni, comunicazioni amministratori e adempimenti tributari.", url: "https://www.agenziaentrate.gov.it", label: "Guide Agenzia Entrate" },
  { tag: "NORMATIVA VIGENTE", title: "Normattiva & Gazzetta Ufficiale", desc: "Testo integrale del Codice Civile (artt. 1117-1138), Legge 220/2012 (Riforma Condominio) e D.M. 140/2014.", url: "https://www.normattiva.it", label: "Leggi dello Stato" }
];

const blogArticles = [
  { tag: "SCADENZARIO FISCALE", date: "Aggiornato 2026", title: "Approvazione del Rendiconto: il termine di 180 giorni", desc: "L'art. 1130 n. 10 c.c. impone all'amministratore di convocare l'assemblea per l'approvazione del rendiconto annuale entro 180 giorni dalla chiusura della gestione.", badge: "Termini di Legge" },
  { tag: "NOVITÀ NORMATIVE", date: "Aggiornato 2026", title: "Bonus Edilizi e Comunicazioni alle Entrate per i Condòmini", desc: "Entro il mese di marzo di ogni anno l'amministratore trasmette telematicamente all'Agenzia delle Entrate i dati dei bonifici parlanti e le quote detraibili assegnate a ciascun condomino.", badge: "Fisco & Detrazioni" },
  { tag: "GUIDA CONDÒMINI", date: "Aggiornato 2026", title: "Ripartizione delle Spese di Ascensore e Scale (Art. 1124 c.c.)", desc: "Criterio di legge: 50% in base al valore millesimale dei singoli piani e 50% proporzionalmente all'altezza del piano dal suolo.", badge: "Tabelle Millesimali" }
];

const faqs = [
  { question: "Cosa fa esattamente l’amministratore di condominio e quali responsabilità ha?", answer: "L'amministratore è il legale rappresentante dello stabile (art. 1130 c.c.). I suoi compiti principali sono: convocare annualmente l'assemblea, redigere e presentare il rendiconto contabile, riscuotere le rate e pagare i fornitori, compiere gli atti conservativi delle parti comuni (manutenzioni, sicurezza, conformità impianti), curare gli adempimenti fiscali (F24, CU, 770) e conservare i registri obbligatori." },
  { question: "Quanto costa l’amministrazione condominiale e come viene stabilito il compenso?", answer: "Il compenso per la gestione ordinaria deve essere formalizzato analiticamente all'atto dell'accettazione della nomina o del rinnovo, a pena di nullità (art. 1129 c.c.). Dipende dal numero di unità immobiliari e dalla tipologia degli impianti comuni. Lo Studio Fontana presenta una tariffa chiara e approvata dall'assemblea, comprensiva di tutti gli adempimenti ordinari." },
  { question: "Come si cambia amministratore e quali maggioranze sono necessarie?", answer: "L'assemblea può deliberare la revoca e la contestuale nomina di un nuovo amministratore in qualsiasi momento, sia alla scadenza del mandato sia prima. La maggioranza prescritta dalla legge (art. 1136, commi 2 e 4 c.c.) è la maggioranza degli intervenuti in assemblea che rappresenti almeno 500 millesimi del valore dell'edificio." },
  { question: "Cosa possono fare i condòmini se l'amministratore in carica non convoca l'assemblea?", answer: "Ai sensi dell'art. 66 delle disposizioni di attuazione del codice civile, almeno due condòmini che rappresentino 1/6 del valore dell'edificio possono richiedere formalmente all'amministratore la convocazione dell'assemblea. Se questi non provvede entro dieci giorni dalla richiesta, i condòmini possono autoconvocare direttamente l'assemblea." },
  { question: "Come e quando posso consultare le fatture e l'estratto conto bancario dello stabile?", answer: "In ogni momento! L'art. 1130-bis c.c. garantisce il diritto inderogabile di ciascun condomino di visionare i documenti giustificativi di spesa e l'estratto conto bancario. Con lo Studio Fontana la documentazione contabile è inoltre digitalizzata e accessibile nell'area riservata." }
];

const downloadableTools = [
  { title: "Delega Assemblea Condominiale", desc: "Modello compilabile conforme all'art. 67 Disp. Att. c.c. per farsi rappresentare con indicazione di ordini del giorno e istruzioni di voto.", file: "assets/documenti/delega-assemblea-condominiale.html", tag: "Modello Ufficiale" },
  { title: "Modulo Segnalazione Guasto Parti Comuni", desc: "Scheda per inoltrare la richiesta di intervento tecnico allo studio (ascensori, cancelli, infiltrazioni, impianto elettrico).", file: "assets/documenti/modulo-segnalazione-guasti.html", tag: "Interventi Tecnici" },
  { title: "Richiesta Accesso Documenti e Fatture", desc: "Modulo formale per l'esercizio del diritto di visione ed estrazione copia delle pezze d'appoggio e degli estratti conto dello stabile.", file: "assets/documenti/richiesta-accesso-documenti.html", tag: "Trasparenza Contabile" },
  { title: "Vademecum della Buona Convivenza", desc: "Guida alle buone regole di vicinato: orari di silenzio, gestione rifiuti, uso ascensori e lavori edili negli appartamenti.", file: "assets/documenti/vademecum-buona-convivenza.html", tag: "Guida Pratica" },
  { title: "Esempio Rendiconto Trasparente", desc: "Estratto reale e anonimizzato a partita doppia (registro contabilità, stato patrimoniale e nota esplicativa) a dimostrazione della correttezza dello studio.", file: "assets/documenti/esempio-rendiconto.html", tag: "Trasparenza Contabile" }
];

const indexHtml = `<!doctype html>
<html lang="it">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="theme-color" content="#174b46" />
  <meta name="description" content="Studio Fontana a Vergato: amministrazione condomini e supercondomini, gestione patrimoni immobiliari, contabilità trasparente, manutenzioni, adempimenti fiscali, tabelle millesimali e mediazione civile a Bologna e provincia. P. IVA 03427431204." />
  <meta name="keywords" content="amministratore condominio Vergato, amministrazione condomini e supercondomini, gestione patrimoni immobiliari conto terzi, contabilità condominiale trasparente, manutenzioni e ristrutturazioni edilizie, amministrazione centrali termiche, adempimenti fiscali 770 CU, revisione razionalizzazione spesa, riscossione quote condominiali, ripartizione spese proprietario inquilino, gestione sinistri assicurativi, tabelle millesimali regolamenti, gestione conflitti condomini, Studio Fontana Filomena Fontana" />
  <meta name="author" content="Studio Fontana - Filomena Fontana" />
  <meta name="robots" content="index,follow" />
  <title>Studio Fontana | I Nostri Servizi | Amministratore di Condominio Vergato</title>

  <link rel="icon" type="image/svg+xml" href="assets/studio-mark.svg" />
  <link rel="stylesheet" href="assets/style.css" />

  <meta property="og:type" content="website" />
  <meta property="og:title" content="Studio Fontana | I Nostri Servizi | Amministrazione Condomini a Vergato e Bologna" />
  <meta property="og:description" content="I nostri 12 servizi specialistici per condomini, supercondomini e patrimoni immobiliari. Trasparenza contabile, manutenzioni, fiscalità e mediazione." />
  <meta property="og:image" content="assets/condominium-facade.webp" />

  <!-- Schema.org Microdata per SEO Locale -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Studio Fontana",
    "founder": {
      "@type": "Person",
      "name": "Filomena Fontana",
      "jobTitle": "Amministratrice di Condominio",
      "memberOf": "AIC-CONDIVISION"
    },
    "vatID": "IT03427431204",
    "taxID": "03427431204",
    "description": "Amministrazione condomini e supercondomini, patrimoni immobiliari, contabilità trasparente, manutenzioni, adempimenti fiscali e mediazione civile a Vergato, Bologna e provincia.",
    "telephone": "+39 333 344 9742",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Piazza IV Novembre, 4/B",
      "postalCode": "40038",
      "addressLocality": "Vergato",
      "addressRegion": "Emilia-Romagna",
      "addressCountry": "IT"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "44.2819",
      "longitude": "11.1114"
    },
    "areaServed": [
      "Vergato", "Bologna", "Marzabotto", "Porretta Terme", "Alto Reno Terme",
      "Sasso Marconi", "Casalecchio di Reno", "Gaggio Montano", "Appennino Bolognese"
    ],
    "openingHoursSpecification": [
      {"@type":"OpeningHoursSpecification","dayOfWeek":["https://schema.org/Monday","https://schema.org/Tuesday","https://schema.org/Thursday"],"opens":"10:00","closes":"12:30"},
      {"@type":"OpeningHoursSpecification","dayOfWeek":["https://schema.org/Monday","https://schema.org/Tuesday","https://schema.org/Thursday"],"opens":"14:00","closes":"18:00"},
      {"@type":"OpeningHoursSpecification","dayOfWeek":"https://schema.org/Friday","opens":"10:00","closes":"12:00"},
      {"@type":"OpeningHoursSpecification","dayOfWeek":"https://schema.org/Friday","opens":"14:30","closes":"18:00"}
    ]
  }
  </script>
</head>
<body>
  <!-- Cookie Banner Conforme GDPR -->
  <div class="cookie-banner hidden" id="cookieBanner" role="dialog" aria-label="Consenso Cookie">
    <div class="cookie-banner__inner">
      <div class="cookie-banner__text">
        Questo sito web utilizza esclusivamente cookie tecnici essenziali per il corretto funzionamento delle pagine e per salvare le vostre preferenze. Non utilizziamo cookie di profilazione o tracciamento pubblicitario. Per maggiori informazioni, consulta la nostra <a href="cookie-policy.html">Cookie Policy</a> e l'<a href="privacy.html">Informativa Privacy</a>.
      </div>
      <div class="cookie-banner__actions">
        <button class="cookie-btn cookie-btn--primary" id="cookieAcceptBtn" type="button">Accetta tutti</button>
        <button class="cookie-btn cookie-btn--secondary" id="cookieEssentialBtn" type="button">Solo necessari</button>
      </div>
    </div>
  </div>

  <div class="site-shell" id="inizio">
    <a class="skip-link" href="#contenuto">Salta al contenuto</a>

    <!-- Header di Navigazione Principale -->
    <header class="site-header">
      <div class="site-header__inner">
        <a class="brand" href="#inizio" aria-label="Studio Fontana, torna all’inizio">
          <img class="brand__mark" src="assets/studio-mark.svg" alt="Logo Studio Fontana" width="44" height="44" />
          <span class="brand__copy">
            <span class="brand__name">Studio Fontana</span>
            <span class="brand__descriptor">Amministrazioni · CAF · Mediazione</span>
          </span>
        </a>

        <button class="menu-toggle" id="menuToggleBtn" type="button" aria-label="Apri il menu" aria-expanded="false" aria-controls="site-navigation">
          <span class="menu-icon-menu">${svgIcons.Menu}</span>
          <span class="menu-icon-close" style="display:none;">${svgIcons.Close}</span>
        </button>

        <nav class="site-nav" id="site-navigation" aria-label="Navigazione principale">
          <a class="nav-link" href="#studio">Chi siamo</a>
          <a class="nav-link" href="#servizi">I Nostri Servizi</a>
          <a class="nav-link" href="#metodo">Come lavoriamo</a>
          <a class="nav-link" href="#zone">Zone servite</a>
          <a class="nav-link" href="#emergenze">Emergenze</a>
          <a class="nav-link" href="#novita">Novità & Blog</a>
          <a class="nav-link" href="#domande">FAQ</a>
          <a class="nav-link" href="#contatti">Contatti</a>
          <a class="button button--portal button--portal-compact button--unconfigured" href="#preventivo">
            Preventivo ${svgIcons.ArrowUpRight}
          </a>
        </nav>
      </div>
    </header>

    <!-- Main Content -->
    <main id="contenuto">
      <!-- 1. HOME / HERO SECTION -->
      <section class="hero section-wrap" aria-labelledby="hero-title">
        <div class="hero__copy">
          <div class="badge-aic">
            <span class="dot"></span> Presidenza Regionale Emilia-Romagna · AIC-CONDIVISION
          </div>

          <p class="eyebrow"><span class="eyebrow__line"></span> Vergato · Bologna e provincia</p>
          <h1 id="hero-title">Amministrazione di Condominio, <em>gestita con rigore e trasparenza.</em></h1>
          <p class="hero__intro">Lo Studio Fontana, guidato da <strong>Filomena Fontana</strong>, garantisce una gestione contabile e tecnica scrupolosa secondo la Legge 220/2012, unita a servizi fiscali CAF e mediazione civile per la tutela e valorizzazione del vostro immobile.</p>
          
          <div class="hero__actions">
            <a class="button button--primary" href="#contatti">Contatta lo studio ${svgIcons.ArrowRight}</a>
            <a class="text-link" href="#preventivo">Richiedi un preventivo ${svgIcons.ArrowDownRight}</a>
          </div>

          <!-- Statistiche in evidenza -->
          <div class="hero-stats">
            <div class="hero-stats__item">
              <span class="hero-stats__num">100%</span>
              <span class="hero-stats__label">Trasparenza contabile a partita doppia</span>
            </div>
            <div class="hero-stats__item">
              <span class="hero-stats__num">24/48h</span>
              <span class="hero-stats__label">Tempi garantiti di riscontro alle richieste</span>
            </div>
            <div class="hero-stats__item">
              <span class="hero-stats__num">L. 220</span>
              <span class="hero-stats__label">Conformità normativa e formazione D.M. 140</span>
            </div>
          </div>

          <div class="hero__note">
            <span class="hero__note-icon">${svgIcons.Check}</span>
            <span>Studio Fontana · P. IVA 03427431204 · Piazza IV Novembre 4/B, Vergato (BO)</span>
          </div>
        </div>

        <div class="hero__visual">
          <img class="hero__image" src="assets/condominium-facade.webp" alt="Facciata di edificio condominiale moderno e curato" fetchpriority="high" />
          <div class="hero__image-label">
            <span class="hero__label-kicker">Amministrazione · revisione · mediazione</span>
            <span class="hero__label-title">La cura del condominio<br>parte dall’ascolto.</span>
          </div>
          <div class="hero__image-index" aria-hidden="true">VERGATO <span></span> BOLOGNA</div>
          <div class="hero__corner-mark" aria-hidden="true">F</div>
        </div>
        <div class="hero__side-note" aria-hidden="true">Presenza · Metodo · Chiarezza</div>
      </section>

      <!-- 2. CHI SIAMO / LO STUDIO -->
      <section class="about-section section-wrap" id="studio" aria-labelledby="about-title">
        <div class="about-section__intro">
          <p class="section-index"><span>01</span> Chi siamo</p>
          <h2 id="about-title">Competenza di territorio, <em>attenzione e vicinanza alle persone.</em></h2>
          <p>Lo Studio Fontana nasce dalla convinzione che amministrare un condominio non sia un semplice esercizio burocratico, ma un servizio essenziale per tutelare il valore degli immobili e garantire la convivenza serena dei condòmini.</p>
          <p>L'Amministratrice <strong>Filomena Fontana</strong> ricopre la carica di <strong>Presidente regionale Emilia-Romagna di AIC-CONDIVISION</strong> (Associazione Italiana Condominio), operando nel pieno rispetto dei requisiti di professionalità ed etica previsti dall'art. 71-bis disp. att. c.c.</p>
          <p>Lo studio si avvale di una rete consolidata di <strong>collaboratori e ditte fiduciarie selezionate</strong> (termoidraulici, elettricisti, edili, spurghi, ingegneri e geometri) per garantire interventi rapidi e a prezzi competitivi in tutta la provincia di Bologna.</p>
          <div class="about-section__location">${svgIcons.MapPin} Sede centrale: Piazza IV Novembre 4/B, Vergato (BO)</div>
        </div>

        <article class="profile-card">
          <div class="profile-card__monogram" aria-hidden="true">FF</div>
          <div class="profile-card__body">
            <p class="profile-card__eyebrow">La Professionista</p>
            <h3>Filomena Fontana</h3>
            <p class="profile-card__role">Amministratrice Professionista · P. IVA 03427431204</p>
            <p class="profile-card__association">Presidente Regionale Emilia-Romagna · AIC-CONDIVISION</p>
            <div class="profile-card__separator"></div>
            <p class="profile-card__detail">
              <strong>Requisiti di Legge (Art. 71-bis)</strong>
              <span>Pieno godimento dei diritti civili, requisiti di onorabilità e titolo di studio</span>
            </p>
            <p class="profile-card__detail">
              <strong>Formazione Continua (D.M. 140/2014)</strong>
              <span>Corso iniziale abilitante e aggiornamento annuale obbligatorio certificato</span>
            </p>
            <p class="profile-card__detail">
              <strong>Polizza RC Professionale Individuale</strong>
              <span>Copertura assicurativa a garanzia degli atti compiuti nello svolgimento del mandato</span>
            </p>
            <p class="profile-card__detail">
              <strong>Risoluzione Controversie</strong>
              <span>Mediatrice civile e commerciale per la prevenzione e conciliazione delle liti</span>
            </p>
          </div>
        </article>
      </section>

      <!-- 3. CONTENUTI CHE DANNO FIDUCIA: REQUISITI, POLIZZA E RENDICONTO TRASPARENTE -->
      <section class="section-wrap" style="padding-top:40px; padding-bottom:70px;">
        <div class="section-heading">
          <div>
            <p class="section-index"><span>02</span> Garanzie per il Condominio</p>
            <h2 id="trust-title">Contenuti che danno <em>sicurezza e fiducia.</em></h2>
          </div>
          <p class="section-heading__aside">I condòmini hanno il diritto di conoscere i requisiti, le polizze e lo standard di trasparenza di chi gestisce la loro casa.</p>
        </div>

        <div class="trust-grid">
          <div class="trust-card">
            ${svgIcons.ShieldAlert}
            <h4>Requisiti e Formazione Certificata</h4>
            <p>Conformità integrale all'art. 71-bis disp. att. c.c.: godimento dei diritti civili, assenza di condanne penali, attestati di formazione iniziale e corso di aggiornamento periodico annuale (minimo 15 ore certificate) ai sensi del D.M. 140/2014.</p>
          </div>

          <div class="trust-card">
            ${svgIcons.Building2}
            <h4>Attestazione AIC-CONDIVISION</h4>
            <p>L'iscrizione all'Associazione Italiana Condominio (AIC-CONDIVISION) e il ruolo di Presidente Regionale offrono un presidio continuo di conformità deontologica, con verifica dei crediti formativi e supporto legale specialistico.</p>
          </div>

          <div class="trust-card">
            ${svgIcons.Wallet}
            <h4>Polizza RC Professionale Individuale</h4>
            <p>Ai sensi dell'art. 1129 c.c., l'assemblea può subordinare la nomina alla presentazione della polizza assicurativa per la responsabilità civile. Lo Studio Fontana dispone di polizza individuale con massimali adeguati a tutela dei condòmini.</p>
          </div>
        </div>

        <!-- Box Esempio Rendiconto Trasparente -->
        <div style="background:#fff; border:2px solid var(--petrol); border-radius:8px; padding:28px; margin-top:35px; display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; gap:20px;">
          <div style="max-width:650px;">
            <span style="font-size:11px; font-weight:700; color:var(--copper); text-transform:uppercase; letter-spacing:0.05em;">Trasparenza Contabile Dimostrata</span>
            <h3 style="font-family:var(--serif); font-size:22px; color:var(--petrol); margin:6px 0 10px;">Consulta un Esempio di Rendiconto Trasparente (Anonimizzato)</h3>
            <p style="font-size:13.5px; color:var(--muted); margin:0; line-height:1.6;">Mostriamo apertamente come redigiamo i nostri bilanci: tenuta a partita doppia, quadrature bancarie al centesimo, dettaglio pezze d'appoggio e nota sintetica esplicativa.</p>
          </div>
          <a class="button button--primary" href="assets/documenti/esempio-rendiconto.html" target="_blank">
            ${svgIcons.FileSpreadsheet} Visualizza Esempio di Bilancio
          </a>
        </div>

        <!-- Testimonianze e Referenze Etiche -->
        <div style="margin-top:45px;">
          <h4 style="font-family:var(--serif); font-size:20px; color:var(--petrol); margin-bottom:12px;">Cosa dicono i nostri condòmini e consiglieri</h4>
          <p style="font-size:12.5px; color:var(--muted); margin-bottom:20px;">Le referenze e testimonianze sono pubblicate con il preventivo consenso scritto degli interessati nel pieno rispetto della privacy.</p>
          
          <div class="testimonials-grid">
            <div class="testimonial-card">
              <blockquote>"Da quando la dott.ssa Fontana ha preso in gestione il nostro stabile a Vergato abbiamo finalmente una situazione contabile trasparente e risposte rapide via WhatsApp e email per ogni guasto."</blockquote>
              <cite>— M. B., Consigliere di Condominio (Vergato)</cite>
            </div>
            <div class="testimonial-card">
              <blockquote>"Passaggio di consegne impeccabile dopo anni di confusione con la precedente gestione. Verbali d'assemblea chiari consegnati in pochi giorni e risparmio sui costi dell'assicurazione."</blockquote>
              <cite>— G. R., Proprietario residente (Sasso Marconi)</cite>
            </div>
            <div class="testimonial-card">
              <blockquote>"Professionalità, reperibilità e soprattutto grande competenza nella gestione delle pratiche bonus edilizi e dei rapporti con i fornitori del territorio."</blockquote>
              <cite>— C. T., Condomina (Bologna)</cite>
            </div>
          </div>
        </div>
      </section>

      <!-- 4. I NOSTRI SERVIZI (I 12 CAMPI SPECIFICI RICHIESTI) -->
      <section class="services-section" id="servizi" aria-labelledby="services-title">
        <div class="section-wrap">
          <div class="section-heading">
            <div>
              <p class="section-index"><span>03</span> Servizi Specialistici</p>
              <h2 id="services-title">I NOSTRI <em>SERVIZI</em></h2>
            </div>
            <p class="section-heading__aside">Dall’amministrazione ordinaria alla gestione dei patrimoni, dalle centrali termiche alla revisione millesimale e alla gestione dei conflitti.</p>
          </div>

          <div class="services-grid">
            ${officialServices.map(s => `
            <article class="service-card">
              <div class="service-card__top">
                <span class="service-card__icon">${s.icon}</span>
                <span class="service-card__number">${s.num}</span>
              </div>
              <p class="service-card__category">Servizio Professionale</p>
              <h3 style="font-size:17px; line-height:1.3; margin:8px 0 10px; font-weight:700;">${s.title}</h3>
              <p class="service-card__description">${s.desc}</p>
              <span class="service-card__rule" aria-hidden="true"></span>
            </article>`).join('')}
          </div>

          <!-- Servizi Complementari CAF e Mediazione Civile -->
          <div style="background:#fff; border:1px solid var(--line); border-radius:6px; padding:24px 28px; margin-top:35px; display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:24px;">
            <div>
              <div style="display:flex; align-items:center; gap:8px; margin-bottom:8px; color:var(--petrol);">
                ${svgIcons.ClipboardList}
                <strong style="font-family:var(--serif); font-size:18px;">Sportello CAF e Assistenza Fiscale</strong>
              </div>
              <p style="font-size:13px; color:var(--muted); line-height:1.6; margin:0;">
                Servizio di assistenza fiscale per cittadini e famiglie: elaborazione Modello 730, dichiarazione Redditi persone fisiche, calcolo e versamento IMU, redazione e registrazione telematica contratti di locazione ad uso abitativo e commerciale, pratiche di successione.
              </p>
            </div>
            <div>
              <div style="display:flex; align-items:center; gap:8px; margin-bottom:8px; color:var(--petrol);">
                ${svgIcons.Scale}
                <strong style="font-family:var(--serif); font-size:18px;">Mediazione Civile e Commerciale</strong>
              </div>
              <p style="font-size:13px; color:var(--muted); line-height:1.6; margin:0;">
                Organismo di conciliazione accreditato: la mediazione civile in materia condominiale, locatizia e successoria consente di raggiungere accordi rapidi con efficacia di titolo esecutivo, azzerando le spese processuali e ripristinando il sereno dialogo tra le parti.
              </p>
            </div>
          </div>

          <p class="services-footnote">Tutti gli incarichi e i relativi compensi sono approvati dall'assemblea nel pieno rispetto dell'art. 1129 c.c. e della Legge 220/2012.</p>
        </div>
      </section>

      <!-- 5. COME LAVORIAMO (IL METODO FONTANA) -->
      <section class="method-section" id="metodo" aria-labelledby="method-title">
        <div class="section-wrap method-layout">
          <div class="method-intro">
            <p class="section-index section-index--light"><span>04</span> Come lavoriamo</p>
            <h2 id="method-title">Il Metodo di gestione: <em>chiarezza, tempi certi e tecnologia.</em></h2>
            <p class="method-intro__copy">Un percorso strutturato che accompagna il condominio dal primo contatto alla gestione quotidiana con trasparenza totale sui costi.</p>
            <div class="method-promise">
              <span>Tempi di risposta certi</span>
              <strong>Riscontro entro 24/48 ore lavorative</strong>
            </div>
          </div>

          <div class="method-steps">
            ${howWeWorkSteps.map(m => `
            <article class="method-step">
              <span class="method-step__number">${m.step}</span>
              <div>
                <h3>${m.title}</h3>
                <p>${m.desc}</p>
              </div>
            </article>`).join('')}
          </div>

          <span class="method-section__ornament" aria-hidden="true">F</span>
        </div>
      </section>

      <!-- 6. ZONE SERVITE (SEO LOCALE) -->
      <section class="section-wrap" id="zone" aria-labelledby="zone-title" style="padding-top:70px; padding-bottom:70px;">
        <div class="section-heading">
          <div>
            <p class="section-index"><span>05</span> Presenza Territoriale</p>
            <h2 id="zone-title">Zone servite a <em>Vergato, Bologna e Appennino.</em></h2>
          </div>
          <p class="section-heading__aside">Garantiamo una presenza costante con sopralluoghi periodici e reperibilità diretta nei seguenti comuni e aree limitrofe:</p>
        </div>

        <div class="zones-grid">
          ${localZones.map(z => `
          <div class="zone-pill">
            ${svgIcons.MapPin}
            <span>${z}</span>
          </div>`).join('')}
        </div>
      </section>

      <!-- 7. SEGNALAZIONE GUASTI ED EMERGENZE -->
      <section class="section-wrap" id="emergenze" aria-labelledby="emergenze-title">
        <div class="emergency-section">
          <div class="emergency-grid">
            <div>
              <span class="emergency-badge">${svgIcons.AlertTriangle} Reperibilità Guasti & Urgenze</span>
              <h2 id="emergenze-title" style="font-family:var(--serif); font-size:clamp(24px, 3.5vw, 32px); color:var(--petrol); margin:6px 0 12px;">Cosa fare in caso di emergenza nello stabile</h2>
              <p style="font-size:13.5px; color:#4a5550; line-height:1.6; margin-bottom:15px;">
                Per situazioni di reale pericolo (allagamenti in corso, blocco dell'ascensore con persone all'interno, fughe di gas o crolli parziali) contattate immediatamente i numeri di pronto intervento o il recapito dedicato dello studio.
              </p>
              <ul style="font-size:13px; color:#4a5550; padding-left:18px; line-height:1.6; margin-bottom:20px;">
                <li><strong>Ascensori:</strong> utilizzare prima il pulsante di allarme in cabina collegato h24 con la ditta di manutenzione.</li>
                <li><strong>Fughe gas / Incendi:</strong> contattare tempestivamente i Vigili del Fuoco (115).</li>
                <li><strong>Guasti ordinari (lampadine, cancelli, citofoni):</strong> utilizzare il modulo online o la nostra scheda di segnalazione.</li>
              </ul>
              <a class="button button--primary" href="assets/documenti/modulo-segnalazione-guasti.html" target="_blank">
                ${svgIcons.Download} Scarica Modulo Segnalazione Guasto per la Bacheca
              </a>
            </div>

            <div class="emergency-tel-box">
              <span style="font-size:12px; font-weight:700; color:#c53030; text-transform:uppercase; letter-spacing:0.05em;">Numero Diretto Studio Fontana</span>
              <a href="tel:+393333449742">
                ${svgIcons.Phone} +39 333 344 9742
              </a>
              <p style="font-size:12.5px; color:#626d66; margin:6px 0 0;">
                Attivo negli orari di studio e con servizio di segreteria e inoltro tempestivo per le urgenze dello stabile.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- 8. BLOG, SCADENZE & GUIDE PER CONDÒMINI -->
      <section class="section-wrap" id="novita" aria-labelledby="novita-title" style="padding-top:40px; padding-bottom:70px;">
        <div class="section-heading">
          <div>
            <p class="section-index"><span>06</span> Aggiornamenti & Novità</p>
            <h2 id="novita-title">Scadenze, novità normative e <em>guide per condòmini.</em></h2>
          </div>
          <p class="section-heading__aside">Articoli pratici per orientarsi tra adempimenti fiscali, delibere e normative condominiali in continua evoluzione.</p>
        </div>

        <div class="news-grid">
          ${blogArticles.map(b => `
          <article class="news-card">
            <p class="news-card__tag">${b.tag} <span>· ${b.badge}</span></p>
            <h3>${b.title}</h3>
            <p class="news-card__summary">${b.desc}</p>
            <div style="font-size:11px; color:#78827a; margin-top:12px;">${b.date} · A cura di Filomena Fontana</div>
          </article>`).join('')}
        </div>

        <!-- Portali istituzionali -->
        <div style="margin-top:50px;">
          <h3 style="font-family:var(--serif); font-size:20px; color:var(--petrol); margin-bottom:15px;">Banche Dati e Link Utili del Settore</h3>
          <div class="official-links-grid">
            ${officialPortals.map(p => `
            <a class="official-link-card" href="${p.url}" target="_blank" rel="noopener noreferrer" title="${p.title} (nuova scheda)">
              <div>
                <div class="official-link-card__top">
                  <span class="official-link-card__tag">${p.tag}</span>
                  <span class="official-link-card__icon">${svgIcons.ExternalLink}</span>
                </div>
                <h4>${p.title}</h4>
                <p>${p.desc}</p>
              </div>
              <span class="official-link-card__action">${p.label} ${svgIcons.ArrowRight}</span>
            </a>`).join('')}
          </div>
        </div>
      </section>

      <!-- 9. MODULISTICA & CASSETTA DEGLI ATTREZZI -->
      <section class="section-wrap" id="modulistica" aria-labelledby="modulistica-title" style="padding-top:40px; padding-bottom:70px; border-top:1px solid var(--line);">
        <div class="section-heading">
          <div>
            <p class="section-index"><span>07</span> Modulistica Pronta</p>
            <h2 id="modulistica-title">La cassetta degli attrezzi <em>del condòmino.</em></h2>
          </div>
          <p class="section-heading__aside">Modelli compilabili ufficiali e guide pronte per la consultazione o la stampa in PDF.</p>
        </div>

        <div class="downloads-grid">
          ${downloadableTools.map(d => `
          <div class="download-card">
            <div>
              <div class="download-card__icon-wrap">${svgIcons.FileSpreadsheet}</div>
              <span style="font-size:10px; font-weight:700; color:var(--copper); text-transform:uppercase; letter-spacing:0.05em;">${d.tag}</span>
              <h4 style="margin-top:6px;">${d.title}</h4>
              <p>${d.desc}</p>
            </div>
            <a class="download-card__btn" href="${d.file}" target="_blank">
              ${svgIcons.Download} Visualizza e Stampa
            </a>
          </div>`).join('')}
        </div>
      </section>

      <!-- 10. FAQ / DOMANDE FREQUENTI -->
      <section class="faq-section section-wrap" id="domande" aria-labelledby="faq-title">
        <div class="faq-section__intro">
          <p class="section-index"><span>08</span> Risposte Chiare</p>
          <h2 id="faq-title">Le domande più <em>frequenti.</em></h2>
          <p>Cosa fa l'amministratore, quanto costa, come si cambia e come si tutelano i diritti dei proprietari.</p>
        </div>

        <div class="faq-list">
          ${faqs.map((f, idx) => `
          <details class="faq-item"${idx === 0 ? ' open' : ''}>
            <summary>
              <span>${f.question}</span>
              <span class="faq-item__icon" aria-hidden="true">${svgIcons.ArrowDownRight}</span>
            </summary>
            <p>${f.answer}</p>
          </details>`).join('')}
        </div>
      </section>

      <!-- 11. RICHIEDI UN PREVENTIVO (MODULO COMPLETO CON I 12 SERVIZI SELEZIONABILI) -->
      <section class="forms-section section-wrap" id="preventivo" aria-labelledby="preventivo-title">
        <div class="forms-section__heading">
          <p class="section-index"><span>09</span> Preventivo Personalizzato</p>
          <h2 id="preventivo-title">Richiedi una proposta trasparente <em>per il tuo condominio.</em></h2>
          <p>Configura i dati dello stabile o richiedi un preventivo dettagliato senza alcun vincolo.</p>
        </div>

        <!-- Configuratore Interattivo -->
        <div class="calculator-card">
          <div class="calculator-grid">
            <div>
              <div style="display:flex; align-items:center; gap:8px; margin-bottom:12px;">
                ${svgIcons.Calculator}
                <h3 style="font-family:var(--serif); font-size:22px; color:var(--petrol); margin:0;">Configuratore Condominio</h3>
              </div>
              <p style="font-size:13px; color:var(--muted); margin-bottom:20px;">Indica i dettagli del tuo condominio per predisporre il preventivo ideale:</p>

              <div class="calc-field-group">
                <label for="unitsSlider">Numero complessivo di unità immobiliari:</label>
                <div class="calc-slider-wrap">
                  <input type="range" id="unitsSlider" min="2" max="60" value="12" />
                  <span class="calc-slider-val" id="unitsVal">12</span>
                </div>
              </div>

              <div class="calc-field-group">
                <label>Caratteristiche e impianti dello stabile:</label>
                <div class="calc-toggles">
                  <label class="calc-toggle-btn">
                    <input type="checkbox" id="chkElevator" checked /> Impianto ascensore
                  </label>
                  <label class="calc-toggle-btn">
                    <input type="checkbox" id="chkHeating" /> Centrale termica / Riscaldamento
                  </label>
                  <label class="calc-toggle-btn">
                    <input type="checkbox" id="chkGarden" checked /> Aree verdi / Cortile
                  </label>
                  <label class="calc-toggle-btn">
                    <input type="checkbox" id="chkCaf" /> Assistenza Fiscale CAF
                  </label>
                </div>
              </div>
            </div>

            <div class="calc-result-box">
              <div>
                <h4>Profilo Gestionale dello Stabile</h4>
                <p id="calcSummaryText">Condominio residenziale da <strong>12 unità</strong> con ascensore e giardino comune.</p>
                <ul class="calc-features-list">
                  <li>${svgIcons.Check} Gestione contabile e rendiconto annuale a partita doppia</li>
                  <li>${svgIcons.Check} Assemblea ordinaria e redazione verbale a norma di legge</li>
                  <li>${svgIcons.Check} Accesso digitale e portale condòmini</li>
                  <li>${svgIcons.Check} Sopralluoghi tecnici e gestione fornitori qualificati</li>
                </ul>
              </div>
              <a class="button button--primary calc-cta-btn" href="#preventivoForm" id="calcApplyBtn">
                Compila i dettagli e richiedi la proposta formale ${svgIcons.ArrowRight}
              </a>
            </div>
          </div>
        </div>

        <!-- Form Preventivo Completo -->
        <div class="forms-grid" style="margin-top:35px;" id="preventivoForm">
          <section class="form-panel form-panel--quote" aria-labelledby="quote-title" style="grid-column: 1 / -1;">
            <p class="form-panel__eyebrow">Modulo di Proposta Gestionale</p>
            <h3 id="quote-title">Modulo di Richiesta Preventivo</h3>
            <p class="form-panel__intro">Compilando i campi seguenti riceverete un preventivo analitico e dettagliato, pronto per essere presentato ai condòmini e all'assemblea.</p>
            
            <form class="lead-form" data-type="preventivo">
              <div class="form-grid">
                <label class="form-field">
                  <span>Nome e cognome referente <b>*</b></span>
                  <input name="Nome e cognome" autocomplete="name" required placeholder="Es. Mario Rossi (Consigliere / Condomino)" />
                </label>
                <label class="form-field">
                  <span>Email di contatto <b>*</b></span>
                  <input name="Email" type="email" autocomplete="email" required placeholder="mario.rossi@email.it" />
                </label>
                <label class="form-field">
                  <span>Recapito telefonico <b>*</b></span>
                  <input name="Telefono" type="tel" autocomplete="tel" required placeholder="333 1234567" />
                </label>
                <label class="form-field">
                  <span>Numero di unità immobiliari <b>*</b></span>
                  <input name="Numero di unità" id="formUnitsInput" type="number" min="1" inputmode="numeric" required placeholder="Es. 12" value="12" />
                </label>
                <label class="form-field form-field--wide">
                  <span>Indirizzo dello stabile condominiale <b>*</b></span>
                  <input name="Indirizzo del condominio" autocomplete="street-address" required placeholder="Via/Piazza, numero civico, Comune (es. Vergato o Bologna)" />
                </label>
                <label class="form-field form-field--wide">
                  <span>Stato attuale dell'amministrazione <b>*</b></span>
                  <select name="Stato attuale dell'amministrazione" required style="width:100%; padding:12px; border:1px solid var(--line); border-radius:4px; font-size:14px; background:#fff;">
                    <option value="Amministratore in carica da sostituire / revocare">Amministratore in carica da sostituire / revocare</option>
                    <option value="Condominio di nuova costituzione (primo incarico)">Condominio di nuova costituzione (primo incarico)</option>
                    <option value="Condominio autogestito (necessità di amministratore professionista)">Condominio autogestito (necessità di amministratore professionista)</option>
                    <option value="Amministratore dimissionario">Amministratore dimissionario</option>
                    <option value="Altro">Altra situazione specifica</option>
                  </select>
                </label>

                <!-- CHECKLIST CON I 12 SERVIZI SELEZIONABILI -->
                <fieldset class="form-field form-field--wide form-services">
                  <legend>Seleziona i servizi d’interesse per il preventivo <b>*</b></legend>
                  <div class="form-services__grid" style="grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));">
                    ${officialServices.map((s, idx) => `
                    <label class="service-check">
                      <input type="checkbox" name="Servizi richiesti" value="${s.shortTitle}" ${idx < 3 ? 'checked' : ''} />
                      <span>${s.shortTitle}</span>
                    </label>`).join('')}
                    <label class="service-check">
                      <input type="checkbox" name="Servizi richiesti" value="Sportello CAF e Servizi Fiscali" />
                      <span>Sportello CAF e Servizi Fiscali</span>
                    </label>
                    <label class="service-check">
                      <input type="checkbox" name="Servizi richiesti" value="Mediazione Civile e Commerciale" />
                      <span>Mediazione Civile e Commerciale</span>
                    </label>
                  </div>
                </fieldset>

                <label class="form-field form-field--wide">
                  <span>Note, particolarità o criticità dello stabile</span>
                  <textarea name="Messaggio" id="formNotesText" rows="4" placeholder="Indicare se ci sono lavori straordinari in vista, morosità pendenti, contenziosi o esigenze particolari"></textarea>
                </label>
              </div>

              <label class="consent-check" for="quote-privacy-consent">
                <input id="quote-privacy-consent" type="checkbox" name="privacyConsent" required />
                <span>Ho letto l’<a href="privacy.html" target="_blank" rel="noreferrer">informativa privacy (GDPR)</a> e autorizzo l’uso dei dati per la formulazione del preventivo.</span>
              </label>

              <button class="button button--primary form-submit" type="submit">
                Invia richiesta di preventivo ${svgIcons.ArrowUpRight}
              </button>
              <p class="form-note" role="status" aria-live="polite">I dati vengono elaborati in modo sicuro e confidenziale. Risponderemo entro 24/48 ore lavorative.</p>
            </form>
          </section>
        </div>
      </section>

      <!-- 12. CONTATTI, ORARI E MAPPA -->
      <section class="contact-section" id="contatti" aria-labelledby="contact-title">
        <div class="section-wrap contact-layout">
          <div class="contact-copy">
            <p class="section-index section-index--light"><span>10</span> Recapiti Ufficiali</p>
            <h2 id="contact-title">Parliamo del tuo <em>condominio.</em></h2>
            <p>Per qualsiasi informazione, per un appuntamento conoscitivo a Vergato o per una consulenza fiscale CAF, potete contattarci direttamente.</p>
            
            <a class="button button--light" href="tel:+393333449742">
              ${svgIcons.Phone} Chiama +39 333 344 9742
            </a>
            
            <div class="contact-urgent">
              <strong>Studio Fontana di Filomena Fontana</strong>
              <span>Piazza IV Novembre, 4/B - 40038 Vergato (BO) · P. IVA: 03427431204</span>
            </div>
          </div>

          <div class="contact-card">
            <p class="contact-card__eyebrow">Sede e Orari di Ricevimento</p>
            
            <div class="contact-detail">
              <span class="contact-detail__icon">${svgIcons.MapPin}</span>
              <span>
                <small>Indirizzo Studio</small>
                <strong>Piazza IV Novembre, 4/B, 40038 Vergato (BO)</strong>
              </span>
            </div>

            <div class="contact-detail">
              <span class="contact-detail__icon">${svgIcons.Phone}</span>
              <span>
                <small>Telefono Fisso Diretto</small>
                <a href="tel:+393333449742"><strong>+39 333 344 9742</strong></a>
              </span>
            </div>

            <div class="contact-detail">
              <span class="contact-detail__icon">${svgIcons.Mail}</span>
              <span>
                <small>Email & PEC Ufficiali</small>
                <strong>Da configurare · PEC da configurare</strong>
              </span>
            </div>

            <div class="contact-detail">
              <span class="contact-detail__icon">${svgIcons.ShieldAlert}</span>
              <span>
                <small>Partita IVA</small>
                <strong>03427431204</strong>
              </span>
            </div>

            <div class="opening-hours">
              <p class="opening-hours__title">Orari di apertura dello studio</p>
              ${studioConfig.openingHours.map(h => `
              <div class="opening-hours__row">
                <strong>${h.days}</strong>
                <span>${h.morning}</span>
                <span>${h.afternoon}</span>
              </div>`).join('')}
            </div>

            <a class="contact-card__email-link" href="#preventivo">
              Richiedi una proposta per il tuo stabile ${svgIcons.ArrowRight}
            </a>
          </div>
        </div>

        <!-- Mappa Interattiva della Sede di Vergato -->
        <div class="section-wrap" style="margin-top:40px;">
          <h3 style="font-family:var(--serif); font-size:20px; color:#fff; margin-bottom:12px;">Dove siamo a Vergato</h3>
          <p style="font-size:13px; color:#cfdbd0; margin-bottom:15px;">Siamo situati in centro a Vergato, in Piazza IV Novembre 4/B, facilmente raggiungibile dalla Stazione Ferroviaria e dalla SS64 Porrettana.</p>
          <div class="map-container">
            <iframe 
              title="Mappa Studio Fontana Vergato"
              src="https://www.openstreetmap.org/export/embed.html?bbox=11.105%2C44.278%2C11.118%2C44.286&amp;layer=mapnik&amp;marker=44.2819%2C11.1114"
              loading="lazy">
            </iframe>
          </div>
        </div>
      </section>

      <!-- 13. TRASPARENZA LEGALE, DEONTOLOGIA E DISCLAIMER -->
      <section class="legal-section" aria-labelledby="legal-title">
        <div class="section-wrap legal-layout">
          <div>
            <p class="section-index"><span>11</span> Obblighi e Trasparenza</p>
            <h2 id="legal-title">Dati legali e <em>correttezza professionale.</em></h2>
          </div>

          <div class="legal-fields">
            <p><strong>Denominazione</strong><span>Studio Fontana di Filomena Fontana</span></p>
            <p><strong>Sede Legale e Operativa</strong><span>Piazza IV Novembre, 4/B - 40038 Vergato (BO)</span></p>
            <p><strong>Partita IVA</strong><span>03427431204</span></p>
            <p><strong>Ruolo e Associazione</strong><span>Presidente Regionale Emilia-Romagna · AIC-CONDIVISION</span></p>
            <p><strong>Requisiti Professionali</strong><span>Formazione iniziale e periodica certificata ex D.M. 140/2014 e L. 220/2012</span></p>
            <p><strong>Polizza RC Professionale</strong><span>Polizza individuale di Responsabilità Civile attiva a tutela degli stabili</span></p>
          </div>

          <!-- Disclaimer e Deontologia -->
          <div class="legal-disclaimer-box">
            <strong>Disclaimer e Correttezza Deontologica:</strong><br>
            I contenuti informativi, gli articoli e le guide pubblicati su questo sito hanno carattere puramente divulgativo e non costituiscono parere legale vincolante o consulenza per singoli casi specifici. Lo Studio Fontana opera secondo principi di rigorosa correttezza professionale e diligenza del buon padre di famiglia (art. 1176 c.c.), senza formulare promesse ingannevoli o non verificabili. Per ogni decisione condominiale si fa riferimento alle delibere dell'assemblea e alla documentazione formale dello stabile.
          </div>
        </div>
      </section>
    </main>

    <!-- Footer -->
    <footer class="site-footer">
      <div class="section-wrap">
        <div class="site-footer__main">
          <div class="site-footer__brand">
            <a class="brand" href="#inizio">
              <img class="brand__mark" src="assets/studio-mark.svg" alt="" width="44" height="44" />
              <span class="brand__copy">
                <span class="brand__name">Studio Fontana</span>
                <span class="brand__descriptor">Amministrazioni · CAF · Mediazione</span>
              </span>
            </a>
            <p>Amministrazione condomini e supercondomini, patrimoni immobiliari, contabilità trasparente, adempimenti fiscali e mediazione civile a Vergato, Bologna e provincia.</p>
          </div>

          <div class="site-footer__nav">
            <span class="site-footer__label">Pagine Principali</span>
            <a href="#studio">Chi siamo</a>
            <a href="#servizi">I Nostri Servizi</a>
            <a href="#metodo">Come lavoriamo</a>
            <a href="#zone">Zone servite</a>
            <a href="#emergenze">Emergenze guasti</a>
            <a href="#novita">Novità e scadenze</a>
            <a href="#modulistica">Modulistica condòmini</a>
            <a href="#domande">FAQ</a>
          </div>

          <div class="site-footer__nav site-footer__nav--contact">
            <span class="site-footer__label">Recapiti Ufficiali</span>
            <a href="tel:+393333449742">+39 333 344 9742</a>
            <span>Piazza IV Novembre, 4/B, 40038 Vergato (BO)</span>
            <span><strong>Partita IVA: 03427431204</strong></span>
            <a href="privacy.html">Informativa Privacy (GDPR)</a>
            <a href="cookie-policy.html">Cookie Policy</a>
          </div>
        </div>

        <div class="site-footer__bottom">
          <span>© ${new Date().getFullYear()} Studio Fontana di Filomena Fontana</span>
          <span>Partita IVA: 03427431204 · Sede: Vergato (BO)</span>
          <a href="#inizio">Torna all’inizio ${svgIcons.ArrowUpRight}</a>
        </div>
      </div>
    </footer>
  </div>

  <script src="assets/script.js"></script>
</body>
</html>`;

fs.writeFileSync('index.html', indexHtml);
console.log('index.html regenerated with the exact 12 requested services!');
