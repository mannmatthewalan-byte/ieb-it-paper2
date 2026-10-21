# IEB IT Paper 2 (Theory) Cram Site — build contract

Static site, no build step, deployed on Vercel. Audience: one IEB Grade 12 learner writing
**IT Paper 2 (theory) tomorrow, 22 Oct 2026**. Several agents build this in parallel, so stick to
the file you own and to the schemas and topic ids below exactly.

## Paper format (2021 onwards, 150 marks, written answers)
- Section A Short questions — Q1 Definitions (give the term for a description)
- Section B System Technologies — Q2 Theory, Q3 Application (scenario)
- Section C Internet & Communication Technologies — Q4 Theory, Q5 Application (scenario)
- Section D Social Implications — Q6
- Section E Data & Information Management and Solution Development — Q7 (+ Q8 in 2023–2025)
2016 and 2020 papers (labelled "Paper I" then) are the same theory paper, with similar sections.

## Copyright rule (important)
Papers and memos are **IEB copyright**. Never copy PDFs into this repo, and never paste question text
or memo answers verbatim. Write everything in your own words. Summarise what each question asked,
and write your **own** model answer that hits the memo's marking points. Scenario names
(e.g. a company name) are fine to keep.

## Files and owners
```
index.html, styles.css, app.js     frontend agent
data/papers-a.js                    backend A  (Nov 2025, Nov 2024, May 2025, May 2024)
data/papers-b.js                    backend B  (Nov 2023, May 2023 memo-only, Nov 2022, Nov 2021)
data/papers-c.js                    backend C  (2020, 2016, Sept 2021 prelim memo, Gr12 Sept prelim)
data/topics.js                      backend D
data/glossary.js, drills.js, plan.js  backend E
```
Paper files APPEND: `(window.P2_PAPERS = window.P2_PAPERS || []).push({...}, {...});`
Other files assign: `window.P2_TOPICS = [...]`, `window.P2_GLOSSARY = [...]`, `window.P2_DRILLS = [...]`,
`window.P2_PLAN = {...}`. Validate each file with
`node -e "global.window={};require('./data/<file>.js');console.log(...)"` before you finish.

### Paper object
```js
{
  id: "2025-nov", year: 2025, session: "November",   // "May", "Prelim"
  scenario: "Own-words line on the paper's theme(s)",
  total: 150, hasMemo: true,                          // false if there's no memo; answers are then your own best answers
  sections: [{
    name: "A: Definitions",   // exactly one of: "A: Definitions", "B: System Technologies",
                              // "C: Communication Technologies", "D: Social Implications", "E: Data & Solution Development"
    questions: [{
      num: "2.3", marks: 4,
      tags: ["sys-cpu-performance"],          // ONLY ids from the topic list below
      asked: "Own-words summary of what was asked (include the scenario context needed)",
      answer: "Model answer in own words. Use \n for new lines and '- ' bullets. One marking point per bullet, enough points for the marks.",
      tip: "Optional: how the memo awards marks / what to avoid"
    }]
  }]
}
```
For Q1 definitions, one entry per item, with `asked` = the description and `answer` = the term.

### Topic object (data/topics.js)
```js
{ id: "sys-cpu-performance", section: "B: System Technologies", title: "CPU & performance",
  summary: "1–2 sentences",
  points: ["exam-ready fact (term — meaning / why it matters)", "..."],
  compare: [{ a: "SSD", b: "HDD", rows: [["Speed", "faster", "slower"]] }],   // optional comparison tables
  pitfalls: ["common mark-loss"],
  years: [2021, 2024],              // years it was examined (filled from the papers when known)
  priority: 3 }                     // 1–3
```

### Topic ids (FIXED — use exactly these)
B: System Technologies
`sys-hardware` (motherboard, buses, ports, expansion, input/output devices) ·
`sys-cpu-performance` (cores, clock, cache, multithreading, GPU, bottlenecks, upgrades) ·
`sys-memory-storage` (RAM/ROM/virtual memory, SSD/HDD/flash, storage capacity, cloud storage) ·
`sys-os` (OS functions, kernel, drivers, multitasking/processing/threading, boot, BIOS/UEFI, firmware) ·
`sys-software` (application vs system, utilities, compression, backups, licensing, open source, updates) ·
`sys-translators` (compiler, interpreter, assembler, bytecode, IDE) ·
`sys-virtualisation` (VMs, emulation, containers, thin clients) ·
`sys-mobile-iot` (mobile devices, IoT, embedded systems, wearables, sensors, automation)

C: Communication Technologies
`net-types` (LAN, WAN, PAN, VPN, intranet/extranet, client-server vs P2P) ·
`net-hardware-media` (NIC, switch, router, AP, modem, cabling, fibre, topology) ·
`net-protocols` (TCP/IP, UDP, HTTP/S, FTP, SMTP/POP3/IMAP, packet switching) ·
`net-addressing` (IPv4/IPv6, MAC, DNS, DHCP, URL, ports, NAT) ·
`net-wireless-mobile` (Wi-Fi, Bluetooth, NFC, RFID, 4G/5G/LTE, satellite, bandwidth/latency) ·
`net-internet-services` (web vs internet, cloud SaaS/PaaS/IaaS, streaming, VoIP, Web 2.0/3.0, search engines, SEO) ·
`net-web-tech` (HTML/CSS, client vs server-side scripting, cookies, caching, CDNs, web apps vs native) ·
`net-security` (encryption, SSL/TLS, certificates, firewall, 2FA/MFA, biometrics, proxy) ·
`net-distributed` (distributed processing, cloud computing, grid, blockchain, edge)

D: Social Implications
`soc-crime-malware` (hacking, malware types, ransomware, DDoS, botnets, identity theft) ·
`soc-social-engineering` (phishing, pharming, spoofing, scams) ·
`soc-ethics-law` (copyright, plagiarism, POPIA, licensing, netiquette, acceptable use) ·
`soc-privacy-data` (privacy, tracking, data mining, big data, surveillance, digital footprint) ·
`soc-ai-emerging` (AI, machine learning, automation, 4IR, AR/VR, robotics, drones, deepfakes) ·
`soc-health-environment` (digital divide, ergonomics, RSI, e-waste, green computing, addiction)

E: Data & Solution Development
`db-concepts` (DBMS, tables/fields/records, PK/FK, data dictionary, data types, integrity) ·
`db-normalisation` (anomalies, 1NF–3NF, ERD, relationships, many-to-many link table) ·
`db-management` (data warehouse, data mining, transaction processing, distributed DBs, backups, redundancy) ·
`data-validation` (validation vs verification, range/type/presence/format checks, GIGO) ·
`data-representation` (binary, hex, ASCII/Unicode, data types/sizes, overflow) ·
`sol-algorithms` (pseudocode, flowcharts, trace tables, decomposition, structures) ·
`sol-oop-theory` (class, object, encapsulation, inheritance, polymorphism, UML, constructors, accessors) ·
`sol-programming` (data types, scope, parameters, arrays, errors: syntax/runtime/logic, debugging, testing) ·
`sol-search-sort` (linear/binary search, bubble/selection sort, efficiency) ·
`sol-sql-theory` (SQL concepts asked in theory: SELECT/joins/GROUP BY reading and writing) ·
`sol-sdlc-ui` (SDLC, testing types, user interface design, usability)

Exam technique: `exam-technique` (verbs explain/discuss/compare, marks = points, scenario-specific answers)

Backend D may add up to 6 extra topics, with new ids, if the papers need them, but must never rename these.

### Glossary (data/glossary.js) — feeds Section A drills and the definitions sheet
```js
window.P2_GLOSSARY = [{ term: "Cache", def: "Small, fast memory ... (own words, exam-length)", topic: "sys-cpu-performance", years: [2023] }]
```
Aim for 150–250 terms. Prioritise every term that appeared in a Q1 definitions question, then SAGS terms.

### Drills (data/drills.js)
```js
window.P2_DRILLS = [{ id: "d1", topic: "net-security", type: "short",   // short | mcq | scenario
  prompt: "...", options: ["..."], answer: "...", explain: "..." }]
```

### Plan (data/plan.js)
```js
window.P2_PLAN = { examNote, tonight: [{time, task, mins}], checklist: [], markStats: [{area, avg}],
  answerTips: [{ verb: "Explain", how: "..." }], acronyms: [{ short: "DHCP", full: "Dynamic Host Configuration Protocol" }],
  resources: [{ title, url, why }] }
```
