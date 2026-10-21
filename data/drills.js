/* IEB IT Paper 2 drills — own-words questions modelled on the IEB style (2021–2025).
   type: short (explain/compare), mcq (one correct option; answer = exact option text), scenario (applied, marks = points). */
(function () {
  var D = [], n = 0;
  function d(topic, type, prompt, answer, explain, options) {
    n++;
    var o = { id: "d" + n, topic: topic, type: type, prompt: prompt };
    if (options) o.options = options;
    o.answer = answer; o.explain = explain;
    D.push(o);
  }

  /* ================= B: SYSTEM TECHNOLOGIES ================= */
  d("sys-cpu-performance", "mcq",
    "Which stage of the machine cycle retrieves the next instruction from main memory into the CPU?",
    "Fetch",
    "The cycle is Fetch, Decode, Execute, Store. Fetch and Store are the two stages that interact with memory; Execute is where the ALU does the work.",
    ["Fetch", "Decode", "Execute", "Store"]);
  d("sys-cpu-performance", "short",
    "Explain the difference between multitasking and multithreading. Give an example of each. (4)",
    "- Multitasking: the OS switches between DIFFERENT programs so they appear to run at the same time (1)\n- e.g. playing music in Spotify while typing in Word (1)\n- Multithreading: ONE program is split into threads that run concurrently (1)\n- e.g. a browser downloading a file in one tab while you scroll in another, or a game handling sound and graphics at once (1)",
    "Memos insist the multitasking example names different programs and the multithreading example stays inside one program. Mixing these up loses the example marks.");
  d("sys-cpu-performance", "mcq",
    "Hyper-threading is a technology that…",
    "lets one physical core appear as two logical cores so it can run two threads at once.",
    "Hyper-threading duplicates some parts of a core (e.g. the registers) so it can run two threads. It does not add a real core, which is multiprocessing / multi-core.",
    ["adds a second physical CPU to the motherboard.", "lets one physical core appear as two logical cores so it can run two threads at once.", "runs the CPU faster than its rated clock speed.", "is only available on supercomputers."]);
  d("sys-cpu-performance", "short",
    "Compare hyper-threading and multiprocessing. (2)",
    "- Hyper-threading: a single physical core handles two threads at once by duplicating its registers, so the OS sees two logical cores (1)\n- Multiprocessing: two or more physical CPUs/cores process different tasks truly in parallel (1)",
    "A comparison needs both sides. The key distinction is that hyper-threading is logical (simulated) while multiprocessing uses real extra cores/CPUs.");
  d("sys-cpu-performance", "short",
    "The scenario's server has 20 MB of Level 3 cache. Explain how a larger cache improves performance. (2)",
    "- Cache is very fast SRAM close to the CPU that stores recently or frequently used data and instructions (1)\n- More cache means the CPU finds what it needs in the cache more often, so it waits less for slower RAM, and processing is faster (1)",
    "Link the cause (more data held close to the CPU) to the effect (fewer slow trips to RAM).");
  d("sys-cpu-performance", "short",
    "Give ONE advantage and ONE disadvantage of overclocking a CPU. (2)",
    "- Advantage: better performance (more instructions per second) without buying new hardware (1)\n- Disadvantage: more heat, needing better cooling, and it can cause instability/crashes, a shorter component life, or a voided warranty (1)",
    "Overclocking = running beyond the manufacturer's rated clock speed. 'Clock multiplication' (raising the multiplier) is one way of doing it.");
  d("sys-cpu-performance", "mcq",
    "What is the main function of the ALU?",
    "To perform arithmetic calculations and logical comparisons",
    "The Control Unit directs and coordinates everything; the ALU does the maths and logic (it is used in the Execute stage); registers hold the data being worked on.",
    ["To direct and coordinate all CPU activity", "To perform arithmetic calculations and logical comparisons", "To store the instruction currently being executed", "To synchronise components with a regular pulse"]);
  d("sys-cpu-performance", "scenario",
    "A dark-store manager wants to use the tablets' built-in graphics (part of the processor) instead of tablets with a dedicated GPU, to save money. The tablets will scan barcodes and run the stock app. Is this a good decision? Justify. (2)",
    "- Yes, it is suitable (1)\n- Barcode scanning and a stock app are not graphics-intensive (no 3D rendering or video editing), so integrated graphics are enough, and the saving matters when buying many tablets (1)",
    "Yes/No earns a mark only with a scenario-based justification. If the scenario were video editing or gaming, the answer would flip: a dedicated GPU has its own memory and parallel cores.");
  d("sys-cpu-performance", "scenario",
    "The pHab! hair studio's laptop becomes very slow when the stylists have the booking system, a browser with many tabs and a music app open together. Recommend TWO hardware upgrades and explain how each helps. (4)",
    "- Add more RAM (e.g. 4 GB to 8/16 GB) (1), so more programs fit in primary memory and the system relies less on slow virtual memory/paging (1)\n- Replace the HDD with an SSD (1), which has much faster access times, so programs load and swap faster (1)\n- (Alternative: a CPU with more cores/threads (1), so the open programs can be processed in parallel (1))",
    "Each recommendation earns a mark and the explanation that ties it to the symptom ('many programs open') earns the second. Saying only 'buy a faster computer' earns nothing.");

  d("sys-memory-storage", "short",
    "Explain what virtual memory is and give ONE disadvantage of relying on it. (3)",
    "- Part of secondary storage (HDD/SSD) is used as if it were extra RAM (1)\n- when physical RAM is full, inactive pages are swapped out to disk (1)\n- Disadvantage: the disk is much slower than RAM, so heavy use (thrashing) slows the computer down (1)",
    "Virtual memory has appeared in Section A in 2021, 2023, 2024 and 2025. A 2025 MCQ also asked for its benefit (more/larger programs can run) and its downside (slower performance).");
  d("sys-memory-storage", "mcq",
    "Which statement about SRAM is correct?",
    "It does not need to be refreshed and is used for cache memory.",
    "SRAM is static: it holds data while powered without refreshing, and it is fast but expensive, which is why it is used for cache. DRAM must be refreshed and is used for main memory.",
    ["It is slower than DRAM.", "It is cheaper than DRAM.", "It does not need to be refreshed and is used for cache memory.", "It keeps its contents when the power is switched off."]);
  d("sys-memory-storage", "scenario",
    "A server motherboard has 8 RAM slots. Calculate the total RAM if every slot holds (a) a 2 GB module and (b) a 32 GB module. (2)",
    "(a) 8 × 2 GB = 16 GB\n(b) 8 × 32 GB = 256 GB",
    "Based on the 2023 paper: one mark for using 8 slots and one for both totals. Always show the multiplication.");
  d("sys-memory-storage", "short",
    "Give TWO advantages of an SSD over an HDD for tablets used by delivery staff. (2)",
    "- No moving parts, so it is more durable and shock-resistant if dropped (1)\n- Faster data access and boot times (1)\n- (Also: uses less power, so longer battery life; lighter, smaller and silent)",
    "Tie the advantage to the mobile scenario where you can: durability and battery life matter for staff on the move.");
  d("sys-memory-storage", "short",
    "State ONE difference between primary memory and secondary storage. (2)",
    "- Primary memory (RAM) is volatile and temporarily holds the data and programs currently in use (1)\n- whereas secondary storage (SSD/HDD) is non-volatile and stores data permanently (1)\n(Also accepted: primary is faster but smaller and more expensive per GB.)",
    "Use 'whereas' to state both sides on the same criterion. That is how a compare question earns full marks.");
  d("sys-memory-storage", "scenario",
    "pHab! stores all bookings and client details on one laptop. Recommend a backup strategy and explain why it protects the business. (4)",
    "- Back up regularly (e.g. daily) and automatically, using scheduled backup software (1)\n- Keep at least one copy off-site / in the cloud (e.g. OneDrive or Google Drive) (1), so data survives theft, fire or ransomware at the salon (1)\n- Optionally use RAID 1 mirroring or an external drive for a quick local restore, and test that the backups can actually be restored (1)",
    "Memos reward frequency, location (local vs remote) and the reason. Note that RAID is NOT a backup on its own, because it mirrors deletions and ransomware damage.");
  d("sys-memory-storage", "mcq",
    "Which RAID level writes an identical copy of the data to a second disk?",
    "RAID 1 (mirroring)",
    "RAID 0 = striping (speed, no redundancy); RAID 1 = mirroring; RAID 5 = striping with parity across 3+ disks, so any one disk can fail.",
    ["RAID 0 (striping)", "RAID 1 (mirroring)", "RAID 5 (striping with parity)", "JBOD"]);

  d("sys-os", "short",
    "State the THREE basic functions of any operating system. (3)",
    "- Provide a user interface (1)\n- Load and execute/run programs (1)\n- Manage the computer's resources: CPU, memory, storage and devices (1)",
    "This exact list was the 2023 memo. 'Interface between hardware and application programs' is also accepted.");
  d("sys-os", "mcq",
    "What is a key difference between UEFI and BIOS?",
    "UEFI supports drives larger than 2 TB, faster booting and Secure Boot.",
    "UEFI is the modern replacement for BIOS. Both are firmware, but UEFI adds large-drive (GPT) support, faster boot, Secure Boot and a graphical interface with mouse support.",
    ["BIOS is software but UEFI is hardware.", "UEFI supports drives larger than 2 TB, faster booting and Secure Boot.", "UEFI is stored on the hard drive, not on a chip.", "BIOS stores the date and time but UEFI cannot."]);
  d("sys-os", "mcq",
    "What is the main role of CMOS?",
    "To store the firmware configuration settings, such as date/time and boot order, using a small battery",
    "BIOS/UEFI is the firmware program, while CMOS is the small battery-powered memory holding its settings. A flat CMOS battery is why a PC 'forgets' the time.",
    ["To run the power-on self-test", "To store the firmware configuration settings, such as date/time and boot order, using a small battery", "To translate source code into machine code", "To cache frequently used data for the CPU"]);
  d("sys-os", "short",
    "What is an interrupt, and why does a computer need interrupts? (2)",
    "- A signal from hardware (e.g. a key press or a printer that has finished) or from software, sent to the CPU over an IRQ line, saying an event needs attention (1)\n- It lets the CPU pause its current task, deal with the device immediately and then carry on, instead of constantly checking (polling) every device (1)",
    "IRQ = Interrupt Request. Interrupts appeared in Section A in Nov 2024 and May 2025, and a 2025 MCQ asked which device uses an IRQ.");
  d("sys-os", "scenario",
    "The dark stores must choose an OS for staff tablets. Give TWO advantages of Android (open source) over Windows for this use. (2)",
    "- No licence fees, so it is cheaper to roll out to many tablets (1)\n- More customisation and a huge range of apps, available on many brands of device (1)",
    "From the 2025 memo. Any two of: cost/licensing, customisation, app availability, open-source flexibility, device variety. Name the scenario (many tablets) to make it applied.");

  d("sys-translators", "short",
    "Compare a compiler and an interpreter. (2)",
    "- A compiler translates the whole source program into machine code BEFORE it runs, producing an executable file that runs fast (1)\n- whereas an interpreter translates and executes the code line by line each time it runs, with no executable produced, so it is slower but easier to debug (1)",
    "Section A 2023 asked: 'converts source code into machine code line by line' = Interpreter.");
  d("sys-translators", "short",
    "Give TWO reasons why Java and Delphi are called high-level languages. (2)",
    "- They use English-like keywords that are easy for humans to read and write (1)\n- They hide the hardware details (abstraction) and are machine-independent, so one instruction represents many machine-code instructions (1)",
    "2022 memo. Related recall: code written by the programmer = source code; an example of a low-level language = assembly or machine code.");
  d("sys-software", "mcq",
    "Which licence model gives the basic version of software for free but charges to unlock extra features?",
    "Freemium",
    "Freeware = totally free but closed source; open source = source code available to change; Creative Commons = licences for sharing creative works with attribution.",
    ["Freeware", "Freemium", "Open source", "Creative Commons"]);
  d("sys-software", "short",
    "State whether lossy or lossless compression should be used for (a) photos of hairstyles on a website and (b) a compressed backup of the booking spreadsheet. Justify each. (4)",
    "(a) Lossy (1): it makes images much smaller so pages load faster, and the slight drop in quality is barely noticeable (1)\n(b) Lossless (1): every value in the spreadsheet must be restored exactly. Losing any data would corrupt the bookings (1)",
    "Lossy permanently discards data (JPEG, MP3) and gives big savings; lossless keeps all data (ZIP, PNG) and gives smaller savings.");
  d("sys-software", "mcq",
    "Which characteristic applies to LOSSY compression?",
    "Data quality, especially for images and video, is reduced.",
    "From 2023 Q4: lossy removes as much data as possible and lowers quality; lossless does not allow significant storage savings but keeps the original exactly.",
    ["The restored file is identical to the original.", "It does not allow for significant storage savings.", "Data quality, especially for images and video, is reduced.", "It is used for ZIP files of documents."]);
  d("sys-hardware", "mcq",
    "Which bus interface is used to connect mass storage devices such as hard drives and SSDs to the motherboard?",
    "SATA",
    "SATA appeared in 2020, 2021, 2023 and May 2024. PCIe is for expansion cards/NVMe; the FSB connects the CPU to main memory.",
    ["SATA", "FSB", "HDMI", "Address bus"]);
  d("sys-mobile-iot", "short",
    "Dark-store tablets combine a camera, scanner, GPS, phone and computer in one device (digital device convergence). Give ONE benefit for the staff and TWO uses of the tablet's camera. (3)",
    "- Benefit: staff carry and pay for one device instead of several, so it is cheaper, lighter and quicker to use (1)\n- Camera uses: scanning barcodes/QR codes on stock (1); photographing damaged stock or proof of delivery (1)",
    "From the 2025 paper. Make the uses specific to the scenario (stock, orders, deliveries).");
  d("sys-virtualisation", "short",
    "Define a thin client and a fat (thick) client and state ONE key difference. (3)",
    "- Thin client: a low-cost device with minimal processing and storage that depends on a central server for processing and data (1)\n- Fat client: a full computer that does most of its processing and stores software/data locally (1)\n- Difference: a thin client cannot work without the server/network, whereas a fat client can work independently (1)",
    "A 2025 question also asked for smart clients: apps that process locally but store/sync data on a server, so they can work offline.");

  /* ================= C: COMMUNICATION TECHNOLOGIES ================= */
  d("net-hardware-media", "short",
    "The dark store's network has a router and a switch. State the function of each. (2)",
    "- Router: connects the store's LAN to other networks (the Internet) and directs packets to their destination using IP addresses (1)\n- Switch: connects devices within the LAN and sends data only to the intended device using MAC addresses (1)",
    "Keep the two clearly separate. A router works between networks; a switch works inside one LAN.");
  d("net-hardware-media", "short",
    "What is the function of a wireless access point (WAP)? (1)",
    "It connects to the wired network and allows wireless devices (laptops, phones, tablets) to join that network using Wi-Fi.",
    "Don't confuse it with a wireless bridge, which joins two separate LANs wirelessly (May 2024 Section A).");
  d("net-security", "scenario",
    "Fairly Fit's network has a firewall. Explain the purpose of a firewall, and why the gym still needs one even though every PC has anti-malware installed. (3)",
    "- A firewall monitors incoming and outgoing traffic and blocks unauthorised access according to rules, e.g. closing unused ports (1)\n- Anti-malware only detects and removes malicious software already on a device (1)\n- The firewall stops attackers or malware traffic from reaching the network in the first place, so the two protect against different threats (1)",
    "The 2023 and 2024 papers both asked the purpose of a firewall. The second mark comes from contrasting it with anti-malware.");
  d("net-protocols", "mcq",
    "The stylists want to play an online game during down time. Which protocol is most suitable?",
    "UDP, because it is faster with no delay waiting for lost packets to be re-sent",
    "From the 2024 paper. Reason: speed and low latency matter more than perfect delivery. Disadvantage: packets can be lost or arrive out of order (glitches).",
    ["TCP, because it guarantees every packet arrives", "UDP, because it is faster with no delay waiting for lost packets to be re-sent", "FTP, because it transfers files", "SMTP, because it is connectionless"]);
  d("net-protocols", "short",
    "Differentiate between TCP and UDP. (2)",
    "- TCP is connection-oriented and reliable: it numbers packets, checks for errors and re-sends lost ones so data arrives complete and in order (1)\n- whereas UDP is connectionless and gives no guarantee of delivery or order, but it is faster, so it suits streaming, VoIP and gaming (1)",
    "UDP itself was a 2020 Section A term: 'a connectionless protocol with no guarantee of ordering or delivery'.");
  d("net-addressing", "mcq",
    "Which address is assigned by the manufacturer to a network card and does NOT change when the device joins a different network?",
    "MAC address",
    "2024 Q4.7: a MAC address is permanent and burnt into the NIC; an IP address is logical and changes with the network. 2023 MCQ: MAC addresses uniquely identify network cards.",
    ["IP address", "MAC address", "URL", "DNS address"]);
  d("net-addressing", "mcq",
    "DHCP is a protocol used to…",
    "automatically allocate IP addresses to devices that join a network.",
    "2023 Q4.1. DNS links domain names/URLs to IP addresses; ARP finds the MAC address that belongs to an IP address.",
    ["set up transmission security.", "automatically allocate IP addresses to devices that join a network.", "allow data transfer on mobile networks.", "link URLs to IP addresses."]);
  d("net-addressing", "mcq",
    "Which service translates a domain name such as www.example.co.za into an IP address?",
    "DNS",
    "May 2025 Q4.6 and 2021 Q4.1. DNS = Domain Name System.",
    ["DNS", "UDP", "ARP", "DHCP"]);
  d("net-addressing", "short",
    "Give TWO differences between IPv4 and IPv6 addresses. (2)",
    "- IPv4 is 32 bits, whereas IPv6 is 128 bits (1)\n- IPv4 is written as four decimal numbers 0–255 separated by dots, whereas IPv6 is written as eight groups of four hexadecimal digits separated by colons (1)\n- (Also: IPv6 gives a vastly larger number of addresses, solving IPv4 exhaustion)",
    "Recognise them on sight: 192.168.1.1 is IPv4; 2001:0000:130F:0000:0000:09C0:876A:130B is IPv6; 00:1A:2B:3C:4D:5E is a MAC address (May 2025).");
  d("data-representation", "short",
    "An IPv6 address consists of 8 groups of 4 hexadecimal digits. How many bits are needed to store one IPv6 address? Show working. (2)",
    "Each hex digit = 4 bits, so each group = 4 × 4 = 16 bits (1); 8 groups × 16 bits = 128 bits (1)",
    "2023 Q7.2. Shortening rules: leading zeros in a group can be dropped, and one run of all-zero groups can be replaced by '::'.");
  d("net-distributed", "scenario",
    "Explain the difference between cloud computing and cloud storage, and give an example of each that pHab! could use. (4)",
    "- Cloud computing: using software/processing power that runs on a provider's servers over the Internet (1), e.g. a cloud booking system or Microsoft 365/Google Docs in the browser (1)\n- Cloud storage: only keeping files on remote servers to access and share from anywhere (1), e.g. storing hairstyle photos on Google Drive/OneDrive/Dropbox (1)",
    "From the 2024 paper. Storage is one service within cloud computing, which also covers applications and processing.");
  d("net-distributed", "scenario",
    "The dark stores want to move to cloud computing. Explain how it helps with (a) scalability and (b) reduced hardware requirements. (2)",
    "(a) Resources (storage, processing, users) can be increased or decreased on demand as the business grows, paying only for what is used (1)\n(b) Processing happens on the provider's servers, so cheaper, low-spec devices (thin clients/tablets) are enough and fewer local servers need buying and maintaining (1)",
    "2025 Q5.4 also asked about mobility (access anywhere), secure storage (provider-managed backups/encryption) and collaboration (shared real-time documents).");
  d("net-wireless-mobile", "scenario",
    "The dark stores use 4G and want to upgrade to 5G. Give TWO benefits of 5G for the store and ONE challenge. (3)",
    "- Much higher bandwidth, so faster downloads/uploads of orders and stock data (1)\n- Lower latency and support for many more connected devices (scanners, IoT sensors) at once (1)\n- Challenge: limited coverage because 5G has a shorter range and needs more towers, plus the cost of new 5G-capable devices (1)",
    "Benefit plus a scenario link is what the memo wants. 'Faster' alone is weak; say faster at what.");
  d("net-protocols", "short",
    "Briefly describe FTP, WebDAV and peer-to-peer (P2P) file sharing, and recommend one for sharing stock files between dark-store devices. (4)",
    "- FTP: a protocol to upload/download files between a client and a server (1)\n- WebDAV: an HTTP extension that lets users edit, move and manage files directly on a web server collaboratively (1)\n- P2P: devices share files directly with each other with no central server (e.g. BitTorrent) (1)\n- Recommend WebDAV: staff can edit the same files on a central server over HTTPS, keeping one up-to-date, secure copy (1)",
    "Any choice can earn the mark if the reason is valid (e.g. FTP: simple and widely supported). P2P is usually the weakest choice for a business because of security and lack of control.");
  d("net-security", "short",
    "What is meant by encrypted network traffic, and why is 256-bit encryption more secure than 128-bit? (3)",
    "- Data is scrambled with an algorithm and a key into unreadable ciphertext, so anyone intercepting it cannot read it without the key (1)\n- A 256-bit key has 2^256 possible keys versus 2^128 (1)\n- so a brute-force attack would take vastly longer, making it practically impossible to crack (1)",
    "2023 Q5.2. Each extra bit doubles the number of possible keys.");
  d("net-security", "short",
    "Explain how a digital certificate and SSL/TLS help a customer trust the gym's booking website. (3)",
    "- The certificate is issued by a trusted Certificate Authority and proves the website really belongs to the gym (authenticity) (1)\n- It contains the site's public key, which SSL/TLS uses to set up an encrypted connection (HTTPS) (1)\n- so card and login details cannot be read if intercepted, and the browser shows the padlock (1)",
    "Public-key (asymmetric) encryption = two keys: public to encrypt, private to decrypt (2025 Section A).");
  d("net-types", "mcq",
    "A VPN…",
    "extends a private network over a public network using an encrypted tunnel.",
    "2022 Q4.5. A VPN can be used as a remote-access tool and also hides your IP address, but anonymous browsing is not its only use.",
    ["can only be used to ensure anonymous browsing.", "extends a private network over a public network using an encrypted tunnel.", "cannot be used as a remote access tool.", "stores encrypted copies of all traffic transmitted."]);
  d("net-security", "short",
    "Explain how Tor (The Onion Router) keeps a user anonymous, and give ONE risk of using it. (3)",
    "- Traffic is sent through several volunteer relay servers chosen at random (1)\n- each adds a layer of encryption and only knows the previous and next hop, so no single server knows both the user and the destination (1)\n- Risk: it gives access to the dark web, with illegal content, scams and malware; it is also slow (1)",
    "Tor was a Section A answer in 2023 (VPN was also accepted). May 2024 MCQ: Tor is open-source software.");
  d("net-internet-services", "mcq",
    "Which statement about the dark web is correct?",
    "It is a subset of the deep web that needs special software such as Tor to access.",
    "May 2024 Q4.9. Deep web = anything not indexed (e.g. your bank account pages). Dark web = deliberately hidden and reached via Tor. Browsing it is not illegal in itself.",
    ["It is illegal to browse.", "It is a subset of the deep web that needs special software such as Tor to access.", "Its content is indexed by normal search engines.", "It is the same as the deep web."]);
  d("net-distributed", "short",
    "Explain how blockchain technology could help the dark stores manage transactions and keep permanent records. (3)",
    "- Each transaction is recorded in a block that is cryptographically linked to the previous block (1)\n- copies of the ledger are distributed across many computers (decentralised), so there is no single point of failure (1)\n- records cannot be changed without the change being detected, so the history is permanent, transparent and trustworthy for auditing orders and payments (1)",
    "2025 Q4.2, also a May 2025 Section A item and a 2024 MCQ ('a decentralised, distributed public ledger to create trust').");
  d("net-hardware-media", "scenario",
    "pHab! chose a wireless network instead of copper cabling. Name TWO problems of copper cables that a wireless network avoids, and give ONE advantage of wireless for the salon. (3)",
    "- Copper suffers EMI from nearby electrical equipment such as hairdryers and motors (1)\n- and attenuation/crosstalk over longer runs (1) (also: cables are messy, a trip hazard, and costly to install)\n- Advantage: clients and stylists can move around freely with tablets/phones and new devices join easily with no extra cabling (1)",
    "2024 Q5.1. Wireless has its own disadvantages: lower speed, interference and security risks (it needs WPA2/WPA3).");
  d("net-hardware-media", "mcq",
    "Which is an advantage of fibre-optic cable over UTP?",
    "It is not affected by electromagnetic interference.",
    "Fibre sends light, so EMI does not affect it (2022 MCQ), and it has high bandwidth over long distances. It is more expensive and fragile to install.",
    ["It is cheaper and easier to install.", "It is not affected by electromagnetic interference.", "It transmits data using electrical pulses.", "It is only suitable for short distances."]);
  d("net-hardware-media", "short",
    "The gym's network has every device connected to one central switch. Name the topology and give ONE advantage and ONE disadvantage. (3)",
    "- Star topology (1)\n- Advantage: if one cable or device fails, only that device is affected, and it is easy to add devices (1)\n- Disadvantage: if the central switch fails, the whole network goes down, and it uses more cable (1)",
    "2023 Q5.1.3 asked for the topology with a justification. Point to the central device in the diagram.");
  d("net-internet-services", "short",
    "Explain why the gym's new interactive website, where customers post reviews and photos, is an example of Web 2.0. (2)",
    "- Web 2.0 is the interactive/social web where users create and share content rather than just reading it (1)\n- Customers posting reviews, comments and photos is user-generated content and two-way interaction, unlike static Web 1.0 pages (1)",
    "Web 1.0 = static, read-only (May 2025 MCQ). Web 3.0 = semantic/AI-driven, personalised, decentralised.");
  d("net-internet-services", "mcq",
    "Search Engine Optimisation (SEO) is…",
    "a set of techniques to make a website rank higher in search engine results.",
    "SEO was a Section A answer in 2021 and 2025 and a 2024 MCQ. Techniques include keywords, metadata, quality backlinks, mobile-friendliness and speed.",
    ["a way to block search engines from a website.", "a set of techniques to make a website rank higher in search engine results.", "a protocol for sending web pages.", "the process of encrypting a website."]);
  d("net-internet-services", "short",
    "What is VoIP? Give ONE example and ONE disadvantage. (3)",
    "- Voice over Internet Protocol: making voice/video calls over the Internet instead of the telephone network (1)\n- e.g. WhatsApp calls, Zoom or Teams meetings (1)\n- Disadvantage: call quality depends on the Internet connection (latency and jitter cause drops and echo), and it fails during outages or load-shedding (1)",
    "May 2025 MCQ trap: calling customer care on a normal mobile network using your SIM is NOT VoIP.");
  d("net-web-tech", "mcq",
    "Which of the following is NOT a characteristic of a cookie?",
    "Cookies are always encrypted.",
    "May 2024 Q4.7. Cookies are small text files sent back to the server with each request and used to remember logins and habits. They are usually not encrypted.",
    ["Cookies are usually stored in small files.", "Cookies are always encrypted.", "Cookies are sent to a server each time a browser requests the page.", "Cookies are used to remember your online habits."]);
  d("net-web-tech", "short",
    "Differentiate between client-side and server-side scripting, with an example of each on the gym's website. (2)",
    "- Client-side scripts (e.g. JavaScript) run in the user's browser, e.g. checking that the booking form's email field is filled in before it is sent (1)\n- whereas server-side scripts (e.g. PHP) run on the web server, e.g. saving the booking to the database and generating the confirmation page (1)",
    "2023 Q5.4.4 linked scripting to website add-on features.");
  d("net-wireless-mobile", "mcq",
    "Location-Based Services (LBS)…",
    "are software services that need to know where a mobile device is located.",
    "2024 Q4.4. GPS is the satellite navigation system; LBS uses the location (from GPS, cell towers or Wi-Fi) to give relevant info. Data loss is not a component of LBS (May 2024).",
    ["are a satellite-based radio navigation system.", "use ARP to identify devices.", "are software services that need to know where a mobile device is located.", "only work on desktop computers."]);
  d("net-protocols", "mcq",
    "Which protocol downloads email from the mail server to one device and usually removes it from the server?",
    "POP3",
    "SMTP sends mail; IMAP keeps mail on the server and syncs it across devices; POP3 downloads it (May 2024 Section A).",
    ["SMTP", "IMAP", "POP3", "HTTP"]);
  d("net-internet-services", "mcq",
    "Video on demand…",
    "eliminates the constraint of fixed broadcast schedules.",
    "2023 Q4.5. VoD lets you choose what to watch and when (May 2024: it needs the Internet and offers a wide range of content).",
    ["can only be offered on a cabled network.", "eliminates the constraint of fixed broadcast schedules.", "always uses the UDP protocol for transmission.", "is usually offered as a free service."]);

  /* ================= D: SOCIAL IMPLICATIONS ================= */
  d("soc-ethics-law", "short",
    "pHab! collects clients' names, cell numbers and hair-treatment history. State THREE things POPIA requires the business to do with this information. (3)",
    "- Get the client's consent and collect only what is needed for a specific, lawful purpose (1)\n- Keep the data secure (passwords, encryption, backups) and report any breach (1)\n- Let clients access, correct or delete their data, and not share or sell it without permission; keep it only as long as needed (1)",
    "POPIA = Protection of Personal Information Act. A 2024 Q6.3 question. Make each point a different condition.");
  d("soc-privacy-data", "scenario",
    "Name and explain TWO risks of sharing personal details (e.g. birthday, location, photos) online when booking with businesses like pHab!. (4)",
    "- Identity theft (1): criminals combine details such as name, ID and birthday to open accounts or take loans in your name (1)\n- Phishing/social engineering (1): personal details make scam messages look believable, tricking you into giving passwords or banking details (1)\n- (Also: stalking/physical safety from location data; data sold for spam/marketing)",
    "Name it and then explain it: each risk earns 1 for the name and 1 for the explanation.");
  d("soc-social-engineering", "short",
    "Differentiate between phishing and pharming. (2)",
    "- Phishing: fake emails or messages pretending to be a trusted organisation trick the user into clicking a link and giving details (1)\n- whereas pharming redirects the user to a fake website even when they type the correct address, e.g. through a poisoned DNS or hosts file (1)",
    "Both are 2020 terms. With phishing the victim is lured; with pharming the traffic is hijacked.");
  d("soc-crime-malware", "mcq",
    "Malware that encrypts a victim's files and demands payment for the key is called…",
    "ransomware.",
    "Spyware secretly monitors; a worm self-replicates across networks; a trojan is disguised as legitimate software.",
    ["spyware.", "a worm.", "ransomware.", "a trojan horse."]);
  d("soc-crime-malware", "short",
    "Explain what a DDoS attack is and how a botnet is used in one. (3)",
    "- A DDoS attack floods a website or server with so much traffic that it slows down or becomes unavailable to legitimate users (1)\n- A botnet is a network of malware-infected 'zombie' computers controlled remotely by an attacker (1)\n- The attacker commands all the bots to send requests at the same time, so the traffic comes from thousands of sources and is hard to block (1)",
    "Botnet = Section A 2020 and 2022 (not just 'bot'); DDoS = May 2025.");
  d("soc-health-environment", "scenario",
    "Suggest THREE ways the dark stores can practise green computing. (3)",
    "- Buy energy-efficient devices and use power-saving settings: sleep mode, switching off devices after hours (1)\n- Recycle or donate old tablets and printers through certified e-waste recyclers instead of dumping them (1)\n- Go paperless with digital invoices and order picking on tablets, and use the cloud instead of running their own servers (1)",
    "2025 Q6.1. Each point must be a different action and should fit the business.");
  d("soc-privacy-data", "short",
    "Name THREE sources of big data, and explain how location-based services add to big data. (4)",
    "- Sources: social media posts, online purchase/transaction records, IoT sensors and smart devices (also search history, GPS data) (3)\n- LBS constantly record users' locations and movements from millions of phones, creating huge volumes of time-stamped location data that businesses analyse for patterns (e.g. busy delivery areas) (1)",
    "2025 Q6.2. Big data = very large, fast and varied data needing special tools to analyse.");
  d("soc-ai-emerging", "scenario",
    "The dark stores plan to use AI to predict stock levels and plan delivery routes. Give ONE benefit and ONE concern. (2)",
    "- Benefit: AI analyses past sales and traffic patterns to forecast demand and choose the fastest routes, cutting waste and delivery times (1)\n- Concern: job losses for stock planners and dispatchers; or decisions based on biased/incorrect data, with privacy issues over customer data (1)",
    "2025 Q6.3. Always link AI to the job sector in the scenario.");
  d("soc-health-environment", "short",
    "What is the digital divide? Give TWO causes of it in South Africa. (3)",
    "- The gap between people who have access to technology, the Internet and digital skills and those who do not (1)\n- Causes: cost of devices and data (1); poor network coverage/infrastructure in rural areas, lack of electricity, or lack of education/skills (1)",
    "Causes must be different (economic, geographic, educational, age).");
  d("soc-ethics-law", "mcq",
    "'Digital heritage' refers to…",
    "a person's digital data and accounts, and the legal rights to them after death.",
    "2025 Q2 matching: 'managing your digital data after death'. The SAGS lists it under Grade 12 social implications.",
    ["software that is older than ten years.", "a person's digital data and accounts, and the legal rights to them after death.", "the history of the Internet.", "copyright on digital music."]);
  d("soc-privacy-data", "scenario",
    "A customer finds that a photo of them was posted on the pHab! Instagram page without their permission. Name TWO steps they could take. (2)",
    "- Ask pHab! directly to remove the photo, since they did not give consent (1)\n- Report the post to Instagram/Facebook for removal; if it is not resolved, complain to the Information Regulator under POPIA (1)",
    "2024 Q6.4. Practical, escalating actions score. Do not just say 'delete social media'.");
  d("soc-ethics-law", "short",
    "What is an Acceptable Use Policy (AUP)? Give TWO rules that the dark stores' AUP might contain. (3)",
    "- A document of rules from an organisation stating what users may and may not do with its devices, network and Internet (1)\n- e.g. no installing unauthorised software on store tablets (1)\n- e.g. no visiting illegal/inappropriate sites or sharing passwords; personal use limited to breaks (1)",
    "AUP was a May 2025 Section A answer. Breaking the AUP can lead to disciplinary action.");
  d("soc-social-engineering", "mcq",
    "An attacker disables a staff member's email, then phones pretending to be 'IT support' offering to fix it, and asks for their password. This is…",
    "reverse social engineering.",
    "The attacker creates the problem and then poses as the helper, so the victim trusts them. Shoulder surfing = watching someone type; dumpster diving = searching rubbish.",
    ["shoulder surfing.", "dumpster diving.", "reverse social engineering.", "pharming."]);

  /* ================= E: DATA & SOLUTION DEVELOPMENT ================= */
  d("data-representation", "short",
    "What is an overflow error, and give an example of how it could happen in the dark store's stock system. (3)",
    "- An overflow error occurs when a value is too large to be stored in the fixed number of bits allocated to it (1)\n- e.g. stock quantity is stored in 8 bits (maximum 255) (1)\n- a delivery takes the stock to 300, which cannot be represented, so the value wraps around or shows wrongly (1)",
    "2025 Q7.2–7.3. Fixed number of bits = a set number of bits per value, which limits the range (8 unsigned bits = 0 to 255).");
  d("data-representation", "short",
    "How can a programmer prevent overflow errors? (2)",
    "- Use a data type with more bits, e.g. int/long instead of byte, or real for very large values (1)\n- Use a range check (validation) so values that exceed the maximum are rejected or handled before they are stored (1)",
    "2025 Q7.4 / 2024 Q7.3.2.");
  d("data-representation", "mcq",
    "If 1 bit per pixel gives 2 colours, how many colours can 4 bits per pixel represent?",
    "16",
    "Number of colours = 2^n where n = bits per pixel, so 2^4 = 16. More bits give better colour accuracy and quality but bigger files.",
    ["4", "8", "16", "32"]);
  d("data-representation", "short",
    "Why is hexadecimal often used in computing instead of binary? (2)",
    "- Each hex digit represents exactly 4 bits, so long binary values become much shorter (1)\n- which makes them easier for humans to read, write and remember with fewer errors (e.g. MAC addresses, colour codes, IPv6) (1)",
    "2024 Q7.4.1. The computer still stores binary; hex is only for human convenience.");
  d("data-representation", "short",
    "What is the word size of a CPU and how does it affect performance? (2)",
    "- The number of bits the CPU can process in one operation/register (e.g. 32-bit or 64-bit) (1)\n- A bigger word size processes more data per cycle and can address more memory, so performance improves (1)",
    "2024 Q7.4.2.");
  d("data-validation", "short",
    "Differentiate between validation and verification. (2)",
    "- Validation: the program automatically checks that input is reasonable and follows set rules (e.g. a range check) before accepting it (1)\n- whereas verification checks that the data was entered or copied correctly from the source, e.g. double entry of a password or proofreading (1)",
    "Validation cannot guarantee data is correct, only that it is sensible. GIGO: garbage in, garbage out.");
  d("data-validation", "scenario",
    "Fairly Fit's online booking form asks for: member number (6 digits), email address, class date and age. Suggest a suitable validation check for THREE of these fields. (3)",
    "- Member number: length check (exactly 6 characters) and type check (digits only) (1)\n- Email: format check (contains '@' and a '.') and presence check (1)\n- Age: range check, e.g. 16–99; class date: range/logical check that the date is not in the past (1)",
    "Name the check AND attach it to the field. A list of check names without fields earns little.");
  d("db-concepts", "mcq",
    "Which statement about JSON files is FALSE?",
    "JSON is a language-specific format that can only be used with JavaScript.",
    "2025 Q7.6: JSON is language-independent, stores structured data as key-value pairs organised hierarchically, and supports strings, numbers, Booleans, arrays and objects.",
    ["JSON is mainly used for storing and transferring structured data.", "JSON is a language-specific format that can only be used with JavaScript.", "JSON data is made up of key-value pairs.", "JSON can represent strings, numbers, Booleans and arrays."]);
  d("sol-oop-theory", "short",
    "Explain encapsulation and why fields in a class are usually declared private. (3)",
    "- Encapsulation combines the fields (attributes) and the methods that work on them into a single unit, the class (1)\n- Fields are private so other classes cannot change them directly (information hiding) (1)\n- they can only be accessed through public accessor/mutator methods, which can validate changes and protect the object's data (1)",
    "Encapsulation was a 2025 Section A answer.");
  d("sol-oop-theory", "short",
    "Differentiate between inheritance and composition, with an example of each from the dark-store scenario. (4)",
    "- Inheritance is an 'is-a' relationship: a child class extends a parent class and reuses its fields and methods (1), e.g. FrozenItem is a StockItem (1)\n- Composition is a 'has-a' relationship: a class has objects of another class as fields (1), e.g. an Order has a Customer object and an array of StockItem objects (1)",
    "2024 Q8.2.2. Composition was a 2025 Section A answer: 'an object can have another object as one of its fields'.");
  d("sol-oop-theory", "short",
    "Differentiate between method overloading and method overriding. (2)",
    "- Overloading: several methods in the same class share a name but have different parameter lists (1)\n- whereas overriding: a child class redefines an inherited method with the same name, return type and parameters to change its behaviour (1)",
    "Overloading = Section A 2024; overriding = Section A 2025. Both are forms of polymorphism.");
  d("sol-oop-theory", "mcq",
    "In a UML class diagram, which symbol shows that a field is accessible only within its own class?",
    "-",
    "From 2025 Q8.3: '+' = public (any class), '-' = private (own class only), '#' = protected (class and subclasses). Constants are shown in UPPERCASE (declared final).",
    ["+", "-", "#", "~"]);
  d("sol-oop-theory", "short",
    "What is the difference between an accessor and a mutator method? (2)",
    "- An accessor (getter) returns the value of a private field without changing it (1)\n- whereas a mutator (setter) changes the value of a private field, often after validating it (1)",
    "Mutator was a 2024 Q2 matching term: 'a method which modifies the value of an instance variable'.");
  d("sol-oop-theory", "mcq",
    "What is a constructor?",
    "A method with the same name as the class that runs when an object is created, to initialise its fields",
    "Instantiation = creating an object from a class (e.g. with new), which calls the constructor.",
    ["A method that returns a field's value", "A method with the same name as the class that runs when an object is created, to initialise its fields", "A method that converts the object to a string", "A class that inherits from another class"]);
  d("sol-algorithms", "short",
    "Define decomposition, pattern recognition and abstraction, each with an example from a dark store. (3)",
    "- Decomposition: breaking a big problem into smaller parts, e.g. splitting stock management into receiving, storing, picking and delivering (1)\n- Pattern recognition: spotting similarities or trends, e.g. noticing ice cream sells more in summer (1)\n- Abstraction: keeping only the relevant details, e.g. grouping all frozen goods into one 'needs freezing' category instead of tracking each product's details (1)",
    "2025 Q8.1–8.2.");
  d("sol-algorithms", "scenario",
    "Trace this algorithm and give the final output.\n1 total ← 0\n2 count ← 0\n3 FOR i ← 1 TO 4\n4   IF i MOD 2 = 0 THEN\n5     total ← total + i * 10\n6     count ← count + 1\n7 NEXT i\n8 OUTPUT total / count",
    "i=1: odd, no change (total 0, count 0)\ni=2: total 20, count 1\ni=3: odd, no change\ni=4: total 60, count 2\nOutput: 60 / 2 = 30",
    "Write one trace-table row per variable change and evaluate the condition (True/False) in its own column. Check the loop bounds (1 TO 4 includes 4).");
  d("sol-algorithms", "short",
    "A staff member qualifies for a bonus if they are NOT late (L) AND (they made more than 100 deliveries (D) OR have a 5-star rating (R)). Write the Boolean expression and state the result when L = False, D = False, R = True. (2)",
    "- Expression: NOT L AND (D OR R), i.e. L' · (D + R) (1)\n- L' = True; D OR R = True, so the result = True (qualifies) (1)",
    "2024 and 2025 Q8 asked for a Boolean function and truth table for a scenario rule. Brackets matter: AND is evaluated before OR unless you bracket.");
  d("sol-programming", "mcq",
    "A program crashes while running because it tries to divide by a variable that is zero. What type of error is this?",
    "Runtime error",
    "A runtime error happens during execution (May 2025 Section A). A syntax error stops compilation; a logic error runs but gives wrong results.",
    ["Syntax error", "Runtime error", "Logic error", "Compilation error"]);
  d("sol-programming", "short",
    "Differentiate between a syntax error and a logic error, with an example of each. (2)",
    "- Syntax error: breaks the language's rules so the code will not compile, e.g. a missing semicolon or misspelt keyword (1)\n- whereas a logic error: the program runs but gives the wrong result, e.g. using > instead of >= so a value of exactly 250 is wrongly treated (1)",
    "Logic errors are found by testing with trace tables and boundary values.");
  d("sol-search-sort", "mcq",
    "What must be true of a list before a binary search can be used on it?",
    "It must be sorted.",
    "A binary search halves the search area each time by comparing with the middle element, which only works if the data is in order. A linear search works on unsorted data.",
    ["It must contain fewer than 100 items.", "It must be sorted.", "It must contain only integers.", "It must have no duplicate values."]);
  d("db-normalisation", "short",
    "What is data redundancy and why do we normalise a database? (3)",
    "- Data redundancy: the same data stored unnecessarily in more than one place (1)\n- It wastes space and leads to inconsistent data when one copy is updated and another is not (1)\n- Normalisation splits data into related tables linked by keys to remove redundancy and avoid update/insert/delete anomalies (1)",
    "Primary key = unique identifier; foreign key = a field linking to another table's primary key.");
  d("db-concepts", "scenario",
    "pHab! wants to store client and booking data permanently. Recommend TWO suitable ways (data structures/storage) to store it and justify ONE. (3)",
    "- A relational database (e.g. MS Access/MySQL) (1)\n- A text file or JSON file (1)\n- Justification: a database lets them link clients to bookings with keys, search/sort quickly with SQL and enforce validation and security (1)",
    "2024 Q7.1. Arrays are NOT permanent storage, because they are lost when the program closes.");

  window.P2_DRILLS = D;
})();
