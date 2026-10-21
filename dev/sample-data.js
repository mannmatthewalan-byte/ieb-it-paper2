/* DEV ONLY: small sample in the P2 schema (CONTRACT.md) for checking layouts. Own-words placeholder content. */
(window.P2_PAPERS = window.P2_PAPERS || []).push({
  id: "2025-nov", year: 2025, session: "November",
  scenario: "Sample: a courier start-up moves its parcel tracking to the cloud and gives drivers tablets.",
  total: 150, hasMemo: true,
  sections: [
    { name: "A: Definitions", questions: [
      { num: "1.1", marks: 1, tags: ["sys-memory-storage"], asked: "Term for using part of secondary storage as if it were extra RAM.", answer: "- Virtual memory" },
      { num: "1.2", marks: 1, tags: ["net-security"], asked: "Term for a security system that filters traffic between a trusted network and the internet based on rules.", answer: "- Firewall", tip: "\"Antivirus\" was not accepted." },
      { num: "1.3", marks: 1, tags: ["db-normalisation"], asked: "Term for the problems (insert, update, delete) caused by redundant data in a table.", answer: "- Anomalies (data anomalies)" }
    ]},
    { name: "B: System Technologies", questions: [
      { num: "2.1", marks: 4, tags: ["sys-cpu-performance"], asked: "The drivers' tablets feel slow when running the tracking app and maps together. Give TWO hardware reasons and explain each.",
        answer: "- **Too little RAM**: the OS swaps pages to virtual memory on flash storage, which is much slower than RAM.\n- **Slow/low-core CPU**: fewer cores means the apps cannot run in parallel, so tasks queue.\n\nAny two reasons with a matching explanation (2 + 2).",
        tip: "Name the component AND say why it causes slowness. A bare list scores half." },
      { num: "2.2", marks: 3, tags: ["sys-os"], asked: "Explain what a device driver is and why the tablet needs one for the barcode scanner.",
        answer: "A device driver is software that lets the OS communicate with a specific hardware device.\n1. It translates generic OS commands into device-specific instructions.\n2. Without it, the OS cannot use the scanner's features.\n3. Updated drivers can fix bugs and add features." }
    ]},
    { name: "C: Communication Technologies", questions: [
      { num: "4.1", marks: 4, tags: ["net-distributed", "net-internet-services"], asked: "Discuss TWO advantages and ONE disadvantage of moving the tracking database to the cloud.",
        answer: "Advantages:\n- Scales up easily in busy seasons; pay only for what is used.\n- Accessible to drivers anywhere with internet.\n\nDisadvantage:\n- Depends on a stable internet connection; an outage stops tracking.\n  - Mitigate with offline caching on the tablet." }
    ]},
    { name: "D: Social Implications", questions: [
      { num: "6.1", marks: 3, tags: ["soc-privacy-data"], asked: "The company logs drivers' GPS location all day. Discuss ONE ethical concern and how POPIA applies.",
        answer: "- Tracking outside working hours invades privacy.\n- Under POPIA personal data must be collected for a specific, lawful purpose and with consent.\n- Data must be kept secure and not kept longer than needed." }
    ]},
    { name: "E: Data & Solution Development", questions: [
      { num: "7.1", marks: 2, tags: ["data-validation"], asked: "Differentiate between validation and verification, using the parcel weight field as an example.",
        answer: "- **Validation** checks data is reasonable/allowed, e.g. weight between 0.1 and 30 kg (range check).\n- **Verification** checks data was entered correctly, e.g. double entry of the weight." }
    ]}
  ]
}, {
  id: "2023-may", year: 2023, session: "May",
  scenario: "Sample memo-less paper: a school library goes digital.",
  total: 180, hasMemo: false,
  sections: [
    { name: "A: Definitions", questions: [
      { num: "1.1", marks: 1, tags: ["soc-social-engineering"], asked: "Term for a fake email that tricks a user into revealing login details.", answer: "- Phishing" }
    ]},
    { name: "B: System Technologies", questions: [
      { num: "2.1", marks: 2, tags: ["sys-memory-storage"], asked: "Give TWO reasons the library should use SSDs rather than HDDs in its kiosks.", answer: "- Faster access/boot times\n- No moving parts, so more durable and silent" }
    ]},
    { name: "E: Data & Solution Development", questions: [
      { num: "7.1", marks: 3, tags: ["db-normalisation", "unknown-tag"], asked: "The Loans table repeats the member's name and phone number on every loan. Explain the problem and how to fix it.",
        answer: "- Data redundancy wastes space and causes update anomalies.\n- Move member details into a separate Members table with MemberID as PK.\n- Store MemberID as a FK in Loans." }
    ]}
  ]
});

window.P2_TOPICS = [
  { id: "sys-cpu-performance", section: "B: System Technologies", title: "CPU & performance",
    summary: "What makes a computer fast, and how to explain a **bottleneck** in a scenario.",
    points: ["Cores — more independent processing units allow true parallel work", "Cache — small fast memory close to the CPU that stores frequently used data", "Clock speed — cycles per second (GHz)"],
    compare: [{ a: "Multicore", b: "Multithreading", rows: [["What", "Several physical cores", "Several threads per core/process"], ["Benefit", "True parallel processing", "Better use of idle time in a core"]] }],
    pitfalls: ["Saying 'more RAM makes the CPU faster'", "Not linking the component to the scenario"], years: [2021, 2023, 2025], priority: 3 },
  { id: "sys-memory-storage", section: "B: System Technologies", title: "Memory & storage",
    summary: "RAM vs ROM, virtual memory, SSD vs HDD vs flash.",
    points: ["RAM is volatile working memory", "Virtual memory uses storage as overflow for RAM"],
    compare: [{ a: "SSD", b: "HDD", c: "Flash drive", rows: [["Speed", "Very fast", "Slower (moving parts)", "Moderate"], ["Durability", "High", "Lower", "High"], ["Cost per GB", "Higher", "Lowest", "Varies"]] }],
    pitfalls: ["Confusing storage capacity with memory"], years: [2023, 2025], priority: 3 },
  { id: "net-security", section: "C: Communication Technologies", title: "Network security",
    summary: "Encryption, firewalls, certificates and multi-factor authentication.",
    points: ["Firewall — filters traffic by rules", "SSL/TLS — encrypts data in transit (HTTPS)"],
    pitfalls: ["Calling a firewall antivirus"], years: [2025], priority: 3 },
  { id: "soc-privacy-data", section: "D: Social Implications", title: "Privacy & data",
    summary: "Tracking, data mining and POPIA.", points: ["POPIA — protects personal information in SA"], pitfalls: ["Writing about ethics without the scenario"], years: [2025], priority: 2 },
  { id: "db-normalisation", section: "E: Data & Solution Development", title: "Normalisation & ERDs",
    summary: "Remove redundancy with 1NF–3NF; resolve many-to-many with a link table.",
    points: ["1NF — atomic values, no repeating groups", "2NF — no partial dependencies", "3NF — no transitive dependencies"],
    pitfalls: ["Forgetting the FK in the many table"], years: [2022, 2023], priority: 3 },
  { id: "exam-technique", section: "Exam technique", title: "Answering theory questions",
    summary: "Marks are points: one clear point per mark, tied to the scenario.",
    points: ["**Explain** — say what AND why", "**Discuss** — both sides, then a conclusion", "Use the company's name and context"], pitfalls: ["One-word answers for 'explain' questions"], years: [], priority: 2 }
];

window.P2_GLOSSARY = [
  { term: "Virtual memory", def: "Using part of secondary storage as an extension of RAM when RAM is full.", topic: "sys-memory-storage", years: [2025] },
  { term: "Cache", def: "Small, very fast memory close to the CPU that stores frequently used data and instructions.", topic: "sys-cpu-performance", years: [2021] },
  { term: "Firewall", def: "Hardware or software that filters network traffic between a trusted and an untrusted network using rules.", topic: "net-security", years: [] },
  { term: "Phishing", def: "A fraudulent message pretending to be from a trusted source to trick someone into revealing personal details.", topic: "soc-social-engineering", years: [] },
  { term: "Multithreading", def: "Splitting a process into threads that can be executed concurrently.", topic: "sys-cpu-performance", years: [2023] },
  { term: "Solid State Drive (SSD)", def: "Storage device with no moving parts that stores data in flash memory chips.", topic: "sys-memory-storage", years: [] },
  { term: "Encryption", def: "Scrambling data with a key so that only someone with the right key can read it.", topic: "net-security", years: [2022] },
  { term: "Two-factor authentication (2FA)", def: "Proving identity with two different types of evidence, e.g. a password plus a code sent to a phone.", topic: "net-security", years: [] },
  { term: "POPIA", def: "South African law that controls how personal information may be collected, stored and used.", topic: "soc-privacy-data", years: [2024] },
  { term: "Digital footprint", def: "The trail of data a person leaves behind when using the internet.", topic: "soc-privacy-data", years: [] },
  { term: "Anomalies", def: "Problems that occur when inserting, updating or deleting data in a badly designed (un-normalised) table.", topic: "db-normalisation", years: [] },
  { term: "Foreign key", def: "A field in one table that is the primary key of another table, used to link the tables.", topic: "db-normalisation", years: [2020] },
  { term: "Normalisation", def: "Organising tables to reduce data redundancy and remove anomalies.", topic: "db-normalisation", years: [] },
  { term: "Bottleneck", def: "A component that limits the overall performance of a system because it is slower than the others.", topic: "sys-cpu-performance", years: [] },
  { term: "Clock speed", def: "The number of cycles per second a CPU performs, measured in GHz.", topic: "sys-cpu-performance", years: [] }
];

window.P2_DRILLS = [
  { id: "d1", topic: "net-security", type: "short", prompt: "What does SSL/TLS do on a website?", answer: "- Encrypts data in transit between browser and server\n- Authenticates the server via a digital certificate", explain: "Shown by HTTPS and the padlock." },
  { id: "d2", topic: "sys-cpu-performance", type: "mcq", prompt: "Which component stores frequently used instructions closest to the CPU?", options: ["RAM", "Cache", "SSD", "Virtual memory"], answer: "Cache", explain: "Cache is smaller and faster than RAM." },
  { id: "d3", topic: "db-normalisation", type: "scenario", prompt: "A gym stores members and the classes they attend in ONE table. Each member attends many classes, and each class has many members.\n\nHow would you fix the design?", answer: "- Create Members and Classes tables\n- Add a link table (e.g. Bookings) with MemberID and ClassID as FKs\n- The link table resolves the many-to-many relationship" },
  { id: "d4", topic: "sys-memory-storage", type: "mcq", prompt: "Which is volatile?", options: ["ROM", "SSD", "RAM", "Flash drive"], answer: "C" },
  { id: "d5", topic: "soc-privacy-data", type: "short", prompt: "Name TWO conditions POPIA places on collecting personal data.", answer: "- Collected for a specific, lawful purpose\n- With the person's consent\n- Kept secure" },
  { id: "d6", topic: "net-security", type: "scenario", prompt: "Staff log in to the cloud system with just a password. Recommend a security improvement and justify it.", answer: "**Two-factor authentication**: even if a password is stolen, the attacker also needs the code from the staff member's phone." },
  { id: "d7", topic: "sys-cpu-performance", type: "short", prompt: "Define a bottleneck.", answer: "The slowest component that limits the overall performance of the system." },
  { id: "d8", topic: "db-normalisation", type: "mcq", prompt: "Which normal form removes partial dependencies?", options: ["1NF", "2NF", "3NF"], answer: "2NF" }
];

window.P2_PLAN = {
  examNote: "Read each scenario first and **use its names** in your answers. One point per mark.",
  tonight: [
    { time: "17:00", task: "Section A: drill 50 definitions (examined-before first)", mins: 45 },
    { time: "18:00", task: "System technologies: CPU, memory, OS", mins: 45 },
    { time: "19:00", task: "Supper break", mins: 30 },
    { time: "19:30", task: "Comms: networks, protocols, security", mins: 60 },
    { time: "20:30", task: "Social implications + data & solution dev", mins: 60 },
    { time: "21:30", task: "Re-drill missed definitions, then sleep", mins: 30 }
  ],
  checklist: ["Two black pens", "ID and exam number", "Water bottle", "Arrive 30 min early"],
  markStats: [
    { area: "A: Definitions", avg: 15 }, { area: "B: System Technologies", avg: 40 }, { area: "C: Communication Technologies", avg: 40 },
    { area: "D: Social Implications", avg: 20 }, { area: "E: Data & Solution Development", avg: 35 }
  ],
  answerTips: [
    { verb: "Explain", how: "Make the point, then say **why/how**. Usually 2 marks per explained point." },
    { verb: "Discuss", how: "- Give both sides (advantages and disadvantages)\n- Link each to the scenario\n- End with a short conclusion" },
    { verb: "Differentiate", how: "State what each one is, on the **same criterion**. 'A is X, whereas B is Y.'" },
    { verb: "Recommend", how: "Name a specific solution and justify it for this scenario." }
  ],
  acronyms: [
    { short: "DHCP", full: "Dynamic Host Configuration Protocol" }, { short: "DNS", full: "Domain Name System" },
    { short: "POPIA", full: "Protection of Personal Information Act" }, { short: "SSD", full: "Solid State Drive" },
    { short: "TLS", full: "Transport Layer Security" }, { short: "VPN", full: "Virtual Private Network" },
    { short: "IoT", full: "Internet of Things" }, { short: "UEFI", full: "Unified Extensible Firmware Interface" }
  ],
  resources: [{ title: "IEB past papers", url: "https://www.ieb.co.za/", why: "Official papers and memos" }]
};
