/* IEB IT Paper 2 (Theory) cram site: topic summaries.
 * Owner: backend D. Written in own words from the learner's notes, SAGS 2025 and past-paper analysis.
 * years = years a question on this topic appeared (Nov + May sessions, plus the 2016/2020 theory papers).
 * priority: 3 = examined in most years, 2 = sometimes, 1 = rarely / mostly PAT-SBA.
 */
window.P2_TOPICS = [

  /* =====================================================================
   * SECTION B: SYSTEM TECHNOLOGIES
   * ===================================================================== */
  {
    id: "sys-hardware",
    section: "B: System Technologies",
    title: "Hardware: motherboard, buses, ports & I/O devices",
    summary: "The physical parts of a computer and how they connect: motherboard, buses, expansion slots, ports, power, and input/output devices. Expect a spec sheet and questions on what a part does, what plugs in where, and what can be upgraded.",
    points: [
      "Motherboard — the main circuit board that links the CPU, RAM, storage and expansion cards and carries the buses between them. Its socket, RAM type and slots decide which upgrades are possible.",
      "Modular design — a computer built from separate, standard parts that can each be replaced or upgraded on their own (typical desktop). Tablets, phones and most thin laptops are NOT modular: RAM and storage are soldered on, so upgrading means replacing the device (2025).",
      "Bus — a set of parallel electrical pathways (tracks) that carries signals between components. Data bus: bidirectional, carries the actual data. Address bus: unidirectional (CPU to memory), carries the memory location. Control bus: carries commands and timing signals (read/write, interrupt, clock).",
      "Bus width — a wider data bus moves more bits per transfer. An address bus with n lines can address 2^n locations (32 lines ≈ 4 GB), so register/address size limits maximum RAM.",
      "FSB (Front-Side Bus) — the older main bus linking the CPU to the chipset and main memory. Modern CPUs use built-in memory controllers and point-to-point links instead, but the term is still examined.",
      "System clock — a quartz crystal that sends out a steady high-frequency pulse so all components stay synchronised. CPU speed = base (bus) clock × clock multiplier.",
      "Expansion slots — PCIe (PCI Express) slots take graphics cards, NVMe SSDs, network and capture cards. PCIe uses lanes (x1, x4, x16), and more lanes give more throughput.",
      "SATA — a serial bus interface for connecting mass-storage devices (HDDs, SATA SSDs, optical drives) to the motherboard. It supports hot swapping. NVMe SSDs use PCIe instead and are several times faster.",
      "Ports — external connectors. USB Type-A/Type-C: plug-and-play and hot-swappable, used for keyboards, mice, flash drives, external drives, printers and barcode scanners. HDMI/DisplayPort: digital video and audio to a monitor or projector. RJ-45: wired Ethernet.",
      "Plug and Play — the OS automatically detects a newly connected device and loads its driver. Hot swapping — connecting or removing a device while the computer is running, without restarting.",
      "Speed vs throughput — speed (bandwidth) is the maximum rate a bus or port is rated for. Throughput is the data actually moved per second, which is lower because of overheads and bottlenecks.",
      "I/O controller — a hardware circuit that manages communication between the CPU and a peripheral (keyboard, disk, printer), so the CPU doesn't handle every low-level detail (2025 definition).",
      "Input devices — keyboard, pointing devices (mouse, touchpad, touchscreen, stylus), barcode/QR scanners, document scanners with OCR, microphones, webcams, biometric readers (fingerprint, face, iris), sensors (accelerometer, GPS, temperature).",
      "Output devices — monitors (resolution in pixels, e.g. 2560 × 1600), printers (laser: fast and cheap per page for volume; inkjet: cheap to buy, good colour photos), speakers, headphones. A touchscreen is both input and output.",
      "Power — the PSU converts AC mains to the DC voltages the parts need. A UPS (battery backup) keeps the system running through a power cut long enough to shut down safely. A redundant PSU is a second internal PSU that takes over if the first fails."
    ],
    compare: [
      { a: "Data bus", b: "Address bus", rows: [
        ["Direction", "Bidirectional (to and from the CPU)", "Unidirectional (CPU to memory/devices)"],
        ["Carries", "The data or instruction itself", "The memory location to read from or write to"],
        ["Wider bus means", "More bits moved per transfer", "More memory can be addressed (2^n locations)"]
      ] },
      { a: "Desktop (modular)", b: "Tablet / ultrabook (integrated)", rows: [
        ["Upgrading", "Swap RAM, storage, GPU, PSU separately", "Usually impossible: parts are soldered"],
        ["Repair", "Cheap: replace one part", "Expensive: often replace the whole device"],
        ["Portability", "Fixed in one place", "Light, battery-powered, mobile"],
        ["Cooling & power", "Large fans, mains power, higher performance", "Passive or small cooling, so performance is limited to save battery"]
      ] },
      { a: "Onboard (integrated) component", b: "Expansion card", rows: [
        ["Cost", "Cheaper, already included", "Extra cost"],
        ["Performance", "Basic and shares system resources", "Higher: dedicated chips and memory"],
        ["Upgradability", "Fixed", "Can be swapped for a newer card"]
      ] }
    ],
    pitfalls: [
      "Calling a bus 'a cable': it is a set of parallel electrical pathways on the motherboard.",
      "Mixing up the address bus (one direction, carries the location) and the data bus (both directions, carries the data).",
      "Recommending a RAM or SSD upgrade for a tablet or phone, which is not modular. The 2025 paper wanted you to spot that the tablet can't be upgraded like a desktop.",
      "Naming a port without saying what connects to it in the scenario, e.g. 'USB, to connect the external barcode scanner at the packing station'.",
      "Writing 'it's faster' without saying what is faster (transfer rate, boot time, loading files)."
    ],
    years: [2016, 2020, 2021, 2022, 2023, 2024, 2025],
    priority: 3
  },

  {
    id: "sys-cpu-performance",
    section: "B: System Technologies",
    title: "CPU, machine cycle & performance",
    summary: "How the CPU works (ALU, CU, registers, machine cycle) and what makes a system faster: cores, clock speed, cache, hyper-threading, multiprocessing, co-processors such as the GPU, overclocking, and removing bottlenecks. This is the most-examined area of Section B.",
    points: [
      "CPU components — the ALU does arithmetic (integer calculations) and logical comparisons. The CU (Control Unit) directs and coordinates all activity: it decodes instructions and sends control signals. Registers are tiny, very fast storage locations inside the CPU that hold the current instruction, the data being processed and addresses (e.g. Program Counter, Instruction Register, Accumulator).",
      "Machine cycle — Fetch: get the next instruction from RAM, using the address in the Program Counter. Decode: the CU interprets it into CPU commands. Execute: the ALU/CU carries it out. Store: write the result to a register or memory. Fetch and Store interact with memory, and Execute uses the ALU.",
      "Register / word size — the number of bits the CPU processes in one operation (32-bit vs 64-bit). A 64-bit CPU handles larger numbers in one step, moves more data per cycle, and can address far more than 4 GB of RAM.",
      "Clock speed — cycles per second, measured in GHz. More cycles means more instructions per second, but only compare clock speeds within the same CPU family. Clock multiplier: the ratio of the CPU's internal speed to the external base clock, e.g. 100 MHz × 36 = 3.6 GHz.",
      "Multi-core — several complete processing units (cores) on one chip. A quad-core CPU has 4 cores that can each run a separate task or thread at the same time (true parallel processing).",
      "Multiprocessing — using two or more physical CPUs or cores so different tasks or threads run genuinely simultaneously. The OS must support it. A single-core CPU cannot multiprocess.",
      "Hyper-threading (Intel's name for simultaneous multithreading, SMT) — each physical core has a duplicated set of registers, so it appears to the OS as two logical cores and can run two threads, filling idle gaps (e.g. while one thread waits for memory). A 4-core hyper-threaded CPU shows 8 logical processors. The gain is real, but far less than double.",
      "Cache — small, very fast SRAM between the CPU and RAM that keeps recently used and likely-needed data and instructions, so the CPU waits less for slower RAM. L1: smallest and fastest, one per core. L2: larger and a little slower, often per core. L3: the largest and slowest cache level, usually shared by all cores. Cache is built into the CPU, so you can't upgrade it on its own.",
      "Cache hit and miss — a hit means the data was found in cache; a miss means it must be fetched from RAM, which is slow. Hit ratio = hits ÷ (hits + misses), and miss ratio = 1 − hit ratio. A lower miss ratio means better performance (2021).",
      "Pre-fetching / branch prediction — the CPU predicts which instructions or data will be needed next and loads them in advance (2025 matching question).",
      "Co-processor — a secondary processor that takes specialised work off the CPU: a GPU (graphics, 3D rendering, video encoding, AI) or a maths co-processor/FPU (floating-point maths, now built into CPUs). Adding a second identical CPU is multiprocessing, not a co-processor.",
      "Graphics — integrated (onboard) graphics share system RAM and CPU resources: cheap, low-power, and fine for office, POS or server work. A dedicated graphics card has its own GPU, its own VRAM (e.g. GDDR6) and its own cooling, and is needed for 3D modelling, video editing, CAD, gaming and AI.",
      "Overclocking — running a component (CPU, GPU, RAM) faster than the manufacturer's rated speed, by raising the multiplier or the base clock. Per-component overclocking changes one part (e.g. the CPU multiplier, or the GPU via its software). Whole-system overclocking raises the base/bus clock, which speeds up everything tied to it. Risks: more heat and power use, instability and crashes, shorter lifespan, and a voided warranty. Reduce them with better cooling and small step-by-step increases. Underclocking does the reverse: deliberately slowing a component to save power and battery, reduce heat and noise, and extend its lifespan (May 2024).",
      "Latency vs throughput — latency is the delay before a component responds or a transfer starts. Throughput is the amount of work or data completed per unit of time.",
      "Bottlenecks and upgrades — the slowest part limits the whole system, so match the upgrade to the task: more RAM for many open programs, an SSD for boot/load times and video editing, a dedicated GPU for 3D rendering, and more cores/threads for servers or parallel work."
    ],
    compare: [
      { a: "Hyper-threading", b: "Multiprocessing", rows: [
        ["What it is", "One physical core runs two threads (logical cores)", "Two or more physical CPUs/cores run tasks"],
        ["Hardware", "Duplicated registers in one core; execution units are shared", "Complete separate cores/CPUs"],
        ["Truly simultaneous?", "Partly: the threads share one core's resources", "Yes: each core works independently"],
        ["Performance gain", "Modest (fills idle time in the core)", "Large for work that can be split up"],
        ["Example", "4 cores show as 8 logical processors", "A server with 2 CPU sockets both filled"]
      ] },
      { a: "L1 cache", b: "L3 cache", rows: [
        ["Size", "Smallest (KBs per core)", "Largest (many MB)"],
        ["Speed", "Fastest, close to CPU speed", "Slowest cache level, but still faster than RAM"],
        ["Location / sharing", "Inside each core, not shared", "On the CPU, shared by all cores"],
        ["Why", "Must be tiny and next to the core so it can keep up", "Sharing lets cores reuse each other's data"]
      ] },
      { a: "Integrated graphics", b: "Dedicated graphics card", rows: [
        ["Memory", "Shares system RAM", "Own VRAM (e.g. GDDR6)"],
        ["Processor", "Part of the CPU/chipset", "Separate GPU chip"],
        ["Cost & power", "Cheap, low power, longer battery life", "Expensive, more power and heat"],
        ["Best for", "Office, POS, web, servers", "3D design, video editing, gaming, AI"]
      ] },
      { a: "Overclocking", b: "Underclocking", rows: [
        ["Speed", "Above rated speed", "Below rated speed"],
        ["Heat & power", "Increase", "Decrease"],
        ["Reason", "More performance without buying new hardware", "Save battery, reduce heat/noise, longer lifespan"],
        ["Risk", "Instability, damage, voided warranty", "Slower performance"]
      ] }
    ],
    pitfalls: [
      "Saying hyper-threading 'doubles the speed' or 'adds cores': it creates logical cores that share one physical core.",
      "Calling a second CPU a co-processor: a co-processor does a specialised job (graphics, maths).",
      "Suggesting you upgrade or 'increase' the L3 cache: it is part of the CPU (2023 wanted NO plus that reason).",
      "Comparing GHz across different CPU families as if clock speed were the only factor (cores, cache and architecture matter too).",
      "Recommending a dedicated graphics card for a POS, office or server scenario with no graphics-heavy work. Justify your choice against the scenario.",
      "Overclocking risks written as just 'it's dangerous'. Name the effect (heat, instability, shorter lifespan, voided warranty) and the fix (better cooling).",
      "Naming the machine-cycle stages out of order, or forgetting Store."
    ],
    years: [2016, 2020, 2021, 2022, 2023, 2024, 2025],
    priority: 3
  },

  {
    id: "sys-memory-storage",
    section: "B: System Technologies",
    title: "Memory & storage (RAM, ROM, virtual memory, SSD/HDD, cloud)",
    summary: "Primary memory (registers, cache, RAM, ROM) versus secondary storage (HDD, SSD, flash, optical, cloud), virtual memory, and capacity calculations. Spec-sheet questions ask whether the RAM is enough, SSD or HDD, and what is stored where.",
    points: [
      "Primary memory — accessed directly by the CPU. It holds the OS, running programs and the data in use right now. RAM is volatile: its contents are lost when the power goes off.",
      "Secondary storage — non-volatile, larger, cheaper per GB and slower. It keeps the OS, applications and files permanently (HDD, SSD, flash drive, SD card, optical disc, cloud).",
      "DRAM / SDRAM / DDR — DRAM is the main RAM: it must be refreshed constantly, and it is cheap and dense. SDRAM is DRAM synchronised to the system clock. DDR (Double Data Rate) SDRAM transfers data twice per clock cycle (on the rising and the falling edge); DDR4 and DDR5 are current. The memory controller, now inside the CPU, synchronises transfers to the RAM.",
      "SRAM — Static RAM, used for cache and registers. It is much faster than DRAM and needs no refreshing, but it is more expensive and uses more transistors per bit, so capacities are small.",
      "ROM — non-volatile memory that is read-only (or rarely rewritten) and holds firmware such as the BIOS/UEFI boot instructions. On phone adverts, 'ROM' usually means internal flash storage.",
      "CMOS — a small battery-powered memory chip that stores the BIOS/UEFI configuration settings (boot order, date and time). The CMOS battery keeps the clock running while the PC is off.",
      "Flash memory — electronic, non-volatile storage with no moving parts (SSDs, USB flash drives, SD/microSD cards, phone storage). Each cell survives only a limited number of writes, so heavy writing slowly wears it out.",
      "HDD — magnetic spinning platters with a moving read/write head. Cheap per GB and large, but slower (seek time), noisy, power-hungry and easily damaged by knocks. Fragmentation slows it down, so defragment it (never an SSD).",
      "SSD — flash-based with no moving parts: much faster boot, load and access times; silent; shock-resistant; lighter; lower power, so better battery life. Downsides: higher cost per GB and limited write cycles. NVMe SSDs on PCIe are several times faster than SATA SSDs. A hybrid drive (SSHD) is an HDD with a small SSD cache for frequently used files.",
      "Virtual memory — when RAM is full, the OS uses part of secondary storage (the page file or swap space) as if it were extra RAM. Paging splits memory into fixed-size pages; swapping moves pages between RAM and disk. This lets more programs run at once, but disk is far slower than RAM, so performance drops; constant swapping is called thrashing. On flash storage, heavy paging also adds wear. It does NOT give you more space for files (May 2025).",
      "Kernel — the smallest core part of the OS, which must stay loaded in RAM at all times (May 2024).",
      "Capacity maths — maximum RAM = number of slots × largest supported chip (e.g. 8 slots × 32 GB = 256 GB). Units: 1 KB = 1024 bytes, then MB, GB, TB. Storage need example: 20 photos × 2 MB × 365 days ≈ 14.6 GB per year.",
      "Is the RAM enough? — 4 GB is the bare minimum for Windows 11 and struggles with several apps or browser tabs. 8–16 GB is comfortable for business use. Servers need much more, e.g. about 8 GB per thin client plus the server's own needs (May 2024).",
      "Cloud storage — files stored on a provider's servers (OneDrive, Google Drive, iCloud, Dropbox) and reached over the Internet. Pros: access from anywhere, easy sharing, off-site backup, scalable. Cons: needs Internet and bandwidth, ongoing subscription, privacy and control concerns.",
      "External storage options — a USB flash drive or external HDD/SSD over USB; an SD card in a card reader; a NAS (network-attached storage) over Ethernet or Wi-Fi; or cloud storage over the Internet (May 2025 asked for two devices with different connections)."
    ],
    compare: [
      { a: "SSD", b: "HDD", rows: [
        ["Technology", "Flash memory chips, no moving parts", "Magnetic spinning platters + moving head"],
        ["Speed", "Much faster boot, load and access", "Slower (has to seek and spin)"],
        ["Durability", "Shock-resistant", "Damaged by knocks and drops"],
        ["Noise / heat / power", "Silent, cool, low power (better battery)", "Audible, warmer, more power"],
        ["Cost per GB", "Higher", "Lower: cheap bulk storage"],
        ["Wear issue", "Limited write cycles", "Mechanical wear; fragmentation"],
        ["Similarity", "Both are non-volatile secondary storage", "Both are non-volatile secondary storage"]
      ] },
      { a: "RAM", b: "ROM", rows: [
        ["Volatility", "Volatile: contents lost without power", "Non-volatile: keeps contents"],
        ["Read/write", "Read and write constantly", "Read-only (or rarely updated)"],
        ["Holds", "OS, running programs, current data", "Firmware / boot instructions (BIOS/UEFI)"],
        ["Size", "GBs", "Small (MBs)"]
      ] },
      { a: "SRAM", b: "DRAM", rows: [
        ["Speed", "Very fast", "Slower"],
        ["Refresh", "No refresh needed", "Must be refreshed constantly"],
        ["Cost & density", "Expensive, low capacity", "Cheap, high capacity"],
        ["Used for", "Cache and registers", "Main memory (RAM sticks)"]
      ] },
      { a: "Primary memory", b: "Secondary storage", rows: [
        ["Access", "Directly by the CPU", "Via controllers; data loaded into RAM first"],
        ["Speed", "Fast", "Slower"],
        ["Volatility", "RAM is volatile", "Non-volatile"],
        ["Capacity / cost", "Smaller, costs more per GB", "Larger, costs less per GB"]
      ] }
    ],
    pitfalls: [
      "Saying virtual memory 'adds storage' or 'speeds up the computer': it only stops you running out of RAM, and it is slower than real RAM.",
      "Vague SSD advantages like 'better'. Say: faster read/write, no moving parts so more durable, silent, lower power.",
      "Calling SD cards RAM or ROM: they are flash, non-volatile secondary storage.",
      "Mixing up memory and storage on a spec sheet (8 GB RAM vs 256 GB SSD).",
      "Giving a similarity and a difference (or an advantage and a disadvantage) that are just opposites of each other: the memo credits only one.",
      "Saying cache is DRAM: cache uses SRAM."
    ],
    years: [2016, 2020, 2021, 2022, 2023, 2024, 2025],
    priority: 3
  },

  {
    id: "sys-os",
    section: "B: System Technologies",
    title: "Operating systems, booting, interrupts & processing techniques",
    summary: "What the operating system does, how the computer boots (BIOS/UEFI, POST, CMOS), how hardware gets the CPU's attention (interrupts, IRQs, drivers), and the software processing techniques multitasking and multithreading.",
    points: [
      "OS functions — provides a user interface; manages resources (CPU scheduling, memory, files and storage, I/O devices); loads and runs programs; acts as the interface between hardware and applications; handles security (accounts, permissions). '3 basic functions' answers: manage resources, provide UI, run programs.",
      "Kernel — the core of the OS that stays in RAM all the time and controls the CPU, memory and devices, handling requests from programs.",
      "Process and thread — a process is a program that is currently running, with its own memory and resources. A thread is a smaller part of a process that can be scheduled on its own.",
      "Multitasking — the OS switches CPU time between several programs very quickly (time slicing), so they appear to run at the same time. Example: scanning barcodes while the stock database updates in the background.",
      "Multithreading — one program is split into threads that run concurrently. Examples: a browser downloads a file while you keep scrolling; a POS app prints a receipt while it updates stock. It benefits most from multi-core or hyper-threaded CPUs.",
      "Interrupt — a signal from hardware (key pressed, network data arrived, printer out of paper) or software (error, request for an OS service) telling the CPU to pause, run an interrupt handler, then resume. Without interrupts the CPU would waste time constantly checking (polling) devices.",
      "IRQ and I/O range — an IRQ (Interrupt Request) is a numbered line a device uses to signal the CPU; a lower number means higher priority (0 = system timer, 1 = keyboard). The I/O range is the set of memory addresses a device uses to exchange data with the CPU. In 2025, camera, network adapter and battery all use IRQs.",
      "Device driver — software that tells the OS how to communicate with one specific hardware device. Without the correct driver the device won't work properly.",
      "Firmware — software stored permanently on a hardware chip (ROM/flash) that controls that device, e.g. BIOS/UEFI or router firmware. It can be updated ('flashed') to fix bugs and security holes.",
      "BIOS — Basic Input/Output System: firmware that runs the POST, finds a boot device and loads the OS boot loader. POST (Power-On Self Test) checks essential hardware (RAM, keyboard, graphics) and signals faults with beep codes.",
      "UEFI — the modern replacement for BIOS: graphical, mouse-driven setup; supports drives larger than 2 TB (GPT); faster boot; Secure Boot (blocks unsigned or malicious boot loaders); network features. It links the firmware to the OS.",
      "Boot sequence — power on → firmware (BIOS/UEFI) runs POST → reads settings from CMOS → finds the boot device → loads the boot loader → kernel loads into RAM → the OS starts its services and the user interface.",
      "OS types — desktop (Windows, macOS, Linux); mobile (Android, iOS/iPadOS: touch-optimised, power-saving, app-store model); embedded (small, single-purpose, in appliances, cars, smart meters); server (Windows Server, Linux: many users, network services, stability).",
      "Android vs Windows/iPadOS — Android is open source (Linux-based), comes free with the device, runs on many brands, is highly customisable and has many free or cheap apps. iPadOS and Windows are proprietary; Windows needs a paid licence and more hardware resources.",
      "Choosing a server OS — e.g. Windows Server (proprietary, per-core/CAL licence, familiar tools, Active Directory) or a Linux server such as Ubuntu Server (open source, free, stable, low resource use). Give a reason and the licence model (2023)."
    ],
    compare: [
      { a: "Multitasking", b: "Multithreading", rows: [
        ["Level", "Several programs (processes)", "Several threads inside ONE program"],
        ["How", "OS time-slices the CPU between programs", "Threads of the program run concurrently, on different cores if available"],
        ["Example", "Music app + POS app + email open together", "Browser loads a page while a download runs"],
        ["Benefit", "User can work in many apps at once", "Program stays responsive; uses multi-core CPUs well"]
      ] },
      { a: "BIOS", b: "UEFI", rows: [
        ["Age", "Legacy (1980s design)", "Modern replacement"],
        ["Interface", "Text-only, keyboard", "Graphical, supports mouse"],
        ["Drive support", "Up to 2 TB boot drives (MBR)", "Very large drives (GPT)"],
        ["Boot speed", "Slower", "Faster"],
        ["Security", "No Secure Boot", "Secure Boot blocks malicious boot loaders"]
      ] },
      { a: "Hardware interrupt", b: "Software interrupt", rows: [
        ["Source", "A device (keyboard, NIC, printer, timer)", "A program or the OS (error, system call)"],
        ["Example", "Key pressed; data arrived on the network card", "Divide by zero; program asks the OS to save a file"]
      ] }
    ],
    pitfalls: [
      "Mixing up multitasking (many programs, OS time-slicing), multithreading (one program, many threads) and multiprocessing/hyper-threading (hardware techniques).",
      "Saying multitasking runs programs 'at the same time' on one core without explaining that the switching is so fast they only appear simultaneous.",
      "Saying the BIOS stores the settings: the settings live in CMOS; BIOS is the firmware program.",
      "Giving examples of apps instead of OS functions ('it runs Word'). Use function words: manages resources, provides a UI, loads and runs programs.",
      "Recommending an OS without judging whether the CPU/RAM can run it AND what it costs (2024 asked for both)."
    ],
    years: [2016, 2020, 2021, 2022, 2023, 2024, 2025],
    priority: 3
  },

  {
    id: "sys-software",
    section: "B: System Technologies",
    title: "Software types, utilities, compression & licensing",
    summary: "System vs application software, utilities, lossy vs lossless compression, updates and installation, and licence models: proprietary, open source, freeware, freemium, shareware, Creative Commons and subscription (cloud) licences.",
    points: [
      "System software — runs and manages the computer itself (OS, drivers, utilities, translators). Application software — does a user's task (word processor, POS app, browser, game). Stand-alone apps run on one machine; network apps use a server.",
      "Utilities — maintenance and security tools: antivirus/anti-malware, firewall, disk defragmenter (rearranges HDD files into contiguous blocks for faster access; not needed for SSDs), disk clean-up, backup, compression, encryption and system monitoring tools.",
      "Lossless compression — makes a file smaller in a way that can be reversed exactly: the restored file is identical to the original. It is needed for text, spreadsheets, programs and databases. Examples: ZIP, PNG, GIF, FLAC. Space savings are smaller.",
      "Lossy compression — permanently discards detail people are unlikely to notice, to get much smaller files. The restored file is not identical, and quality drops at high compression. Examples: JPEG, MP3/AAC, MP4 (H.264/H.265) video. Used for streaming, web images and music.",
      "Compression trade-off — smaller files need less storage, transfer faster and use less bandwidth and mobile data. The cost is processing time to compress/decompress and, for lossy, lost quality.",
      "Updates vs upgrades — updates (patches) fix bugs and close security holes, so install them promptly and schedule them automatically. Upgrades move to a newer version with new features. Unpatched software is a top way in for ransomware.",
      "Installing software — full vs custom installation; a product key or activation code proves the licence is valid; uninstall properly so all files are removed.",
      "Proprietary software — owned by a company, closed source code, usually a paid licence governed by a EULA (e.g. Windows, iPadOS, Microsoft Office).",
      "Open-source software (OSS) — source code is freely available to view, modify and share (e.g. Linux, Android, LibreOffice, Firefox). Usually free, transparent, customisable, with community support. Possible downsides: no guaranteed official support, and some compatibility problems with proprietary formats and apps.",
      "Freeware — free to use, but closed source and cannot be modified (e.g. a free PDF reader). Shareware — free trial, then you pay. Freemium — the basic version is free and you pay for premium features or to remove adverts (e.g. Spotify, Canva, Dropbox).",
      "Creative Commons — licences that let creators allow others to share and reuse their work under conditions such as attribution (BY), non-commercial (NC), share-alike (SA) or no derivatives (ND) (May 2025).",
      "Subscription (cloud/SaaS) licence vs perpetual licence — a subscription is paid monthly or yearly per user, always gives the latest version, and stops working when you stop paying. A perpetual licence is paid once for a specific version, with no ongoing cost but no new features.",
      "EULA — End User Licence Agreement: the legal contract stating what you may and may not do with the software (number of installs, no copying or reverse engineering).",
      "Computer management — schedule backups, updates and virus scans; manage files and folders, sharing and permissions; archive old files; uninstall unused software."
    ],
    compare: [
      { a: "Lossy compression", b: "Lossless compression", rows: [
        ["Data", "Some data permanently removed", "No data lost; exact original restored"],
        ["File size", "Much smaller", "Moderately smaller"],
        ["Quality", "Reduced (artefacts at high compression)", "Unchanged"],
        ["Use for", "Photos, music, video, streaming", "Documents, code, databases, archives"],
        ["Examples", "JPEG, MP3, MP4", "ZIP, PNG, GIF, FLAC"]
      ] },
      { a: "Open source", b: "Proprietary", rows: [
        ["Source code", "Public: anyone may view and modify", "Secret, owned by the company"],
        ["Cost", "Usually free", "Usually paid licence or subscription"],
        ["Support", "Community forums; paid support optional", "Official vendor support"],
        ["Customising", "Fully customisable", "Only what the vendor allows"],
        ["Examples", "Linux, Android, LibreOffice", "Windows, iOS, Microsoft Office"]
      ] },
      { a: "Freeware", b: "Freemium", rows: [
        ["Cost", "Completely free", "Basic tier free; pay for premium"],
        ["Features", "Full program, no upsell", "Key features locked or adverts shown"],
        ["Example", "Free PDF reader", "Spotify, Canva, Dropbox"]
      ] }
    ],
    pitfalls: [
      "Saying lossless means 'no compression': it does compress, just reversibly.",
      "Confusing freeware (free, closed source) with open source (code available to modify).",
      "One-sided answers like 'open source has no support' or 'is always more secure'. Give a balanced, scenario-linked reason.",
      "Saying defragmenting an SSD helps: it doesn't and only adds wear.",
      "Suggesting lossy compression for documents, programs or databases: losing any data would corrupt them."
    ],
    years: [2016, 2020, 2021, 2023, 2024, 2025],
    priority: 3
  },

  {
    id: "sys-translators",
    section: "B: System Technologies",
    title: "Programming languages & translators",
    summary: "High-level vs low-level languages, and the translators that turn source code into machine code: compilers (one- and two-stage), interpreters and assemblers, plus bytecode/JVM and IDE tools.",
    points: [
      "Machine code — binary instructions the CPU executes directly. It is specific to a CPU's instruction set.",
      "Low-level language — close to the hardware: machine code and assembly language (mnemonics such as MOV, ADD). One instruction ≈ one machine instruction. Fast and efficient, gives direct hardware control, but is hard to write and not portable.",
      "High-level language — uses English-like keywords and structures (Java, Delphi, Python, C#) and hides hardware details (abstraction). One statement becomes many machine instructions. Easier to write, read and debug; machine-independent (portable); must be translated (2025 definition).",
      "Source code — the program as the programmer writes it. Object/executable code — the translated machine code that runs.",
      "Compiler — translates the WHOLE source program into machine code (an executable file) before it runs. Errors are listed after compiling, the compiled program runs fast, and the source isn't needed to run it (which protects the code). You must recompile after every change and for each platform. Examples: Delphi, C++.",
      "Interpreter — translates and executes the source one statement (line) at a time, every time the program runs. It stops at the first error, which makes debugging easy, but execution is slower and the interpreter must be on every machine. Examples: Python, JavaScript in a browser (2023 definition: 'line by line').",
      "Assembler — converts assembly language (low-level mnemonics) into machine code (May 2024, May 2025).",
      "Two-stage compilation (bytecode) — Java is compiled into platform-independent bytecode (.class files); the Java Virtual Machine on each device then interprets or JIT-compiles it into that device's machine code. 'Write once, run anywhere.' A one-stage compiler goes straight to machine code for one platform.",
      "JIT (Just-In-Time) compilation — bytecode is compiled into machine code while the program runs, for speed (JVM, .NET, modern JavaScript engines).",
      "IDE — Integrated Development Environment: code editor + translator + debugger (breakpoints, watches, stepping) + GUI designer in one program (e.g. Delphi IDE, NetBeans, IntelliJ, VS Code).",
      "Why translate at all? The CPU can only execute machine code. Translators let programmers work at a human-friendly level and still produce runnable code."
    ],
    compare: [
      { a: "Compiler", b: "Interpreter", rows: [
        ["Translates", "Whole program at once, before running", "One statement at a time, while running"],
        ["Output", "Stand-alone executable (object code)", "No executable file; runs directly"],
        ["Errors", "Reported together after compiling", "Stops at the first error found"],
        ["Execution speed", "Fast (already translated)", "Slower (translates every run)"],
        ["Distribution", "Ship the executable; source stays private", "Source + interpreter needed on each machine"],
        ["Examples", "Delphi, C, C++", "Python, JavaScript"]
      ] },
      { a: "High-level language", b: "Low-level language", rows: [
        ["Readability", "English-like, easy to learn", "Mnemonics/binary, hard to read"],
        ["Portability", "Machine-independent", "Specific to one CPU type"],
        ["Translator", "Compiler or interpreter", "Assembler (assembly language)"],
        ["Control & speed", "Less direct hardware control", "Direct control, very efficient"],
        ["Example", "Java, Delphi, Python", "Assembly, machine code"]
      ] }
    ],
    pitfalls: [
      "Saying an interpreter 'creates an executable': only a compiler does.",
      "Saying a compiler translates 'line by line': that describes an interpreter.",
      "Mixing up an assembler (assembly to machine code) with a compiler (high-level to machine code).",
      "Giving only one reason for a 2-mark 'why is it high-level?' question. Say English-like/readable AND machine-independent/hides hardware detail.",
      "Calling the programmer's code 'machine code': it is source code."
    ],
    years: [2016, 2021, 2022, 2023, 2024, 2025],
    priority: 3
  },

  {
    id: "sys-virtualisation",
    section: "B: System Technologies",
    title: "Virtualisation, emulation & thin/fat/smart clients",
    summary: "Running several virtual machines on one physical computer, emulating other platforms, containers, and the three client types (thin, fat/thick, smart) that decide where the processing happens.",
    points: [
      "Virtualisation — software (a hypervisor) creates virtual versions of hardware, so one physical machine can run several separate virtual machines.",
      "Virtual machine (VM) — a software-based computer with its own OS and apps, running isolated on shared physical hardware, e.g. Linux inside Windows, or several servers on one host.",
      "Hypervisor — Type 1 (bare-metal) runs directly on the hardware (VMware ESXi, Hyper-V, KVM) and is used in data centres and the cloud. Type 2 (hosted) runs as an app on an OS (VirtualBox, VMware Workstation).",
      "Server virtualisation — pros: fewer physical servers, so lower hardware, power, cooling and space costs; better use of hardware; easy snapshots, backups and cloning; new servers set up quickly; one VM crashing doesn't affect the others. Cons: if the host fails, all its VMs go down; performance overhead; needs a powerful host.",
      "Emulation — software that imitates a different hardware/OS platform so its programs can run, e.g. an Android emulator on a PC, retro console emulators, or Mac programs on Windows (2016). It is slower because instructions are translated, and some features may not work.",
      "Containers — lightweight packages (e.g. Docker) holding an app and its libraries that share the host OS kernel. They start in seconds and use fewer resources than full VMs, and are widely used in cloud services.",
      "Cloud link — virtualisation underpins cloud computing: IaaS rents you virtual machines, and SaaS runs on virtualised servers.",
      "Thin client — a low-spec device with minimal processing and storage that relies on a server for processing, applications and storage. It mainly sends input and displays output (library or call-centre terminals, POS terminals, kiosks). Cheap, low-power, centrally managed and secure (no data stored locally), but completely dependent on the network and server.",
      "Fat (thick) client — a full PC with its own processor, storage and installed software that processes locally. It can work offline and uses the network mainly for file sharing and the Internet. Costs more, and each one needs its own updates and security.",
      "Smart client — a hybrid: the app runs and processes locally with a rich interface, but stores or syncs data on a server/cloud. It can work offline and sync later, and updates arrive automatically (e.g. a banking app, the Takealot app, the Teams desktop app).",
      "Sizing a thin-client server — the server needs enough RAM and CPU for every connected client plus its own OS and services (May 2024 used 8 GB per thin client).",
      "Where software lives — with thin clients, apps such as spreadsheets run on the server; the device may only hold a small OS, the remote-desktop client and perhaps a browser (May 2024).",
      "Desktop virtualisation (VDI) — each user's desktop runs as a VM in the data centre and is streamed to a thin client or browser."
    ],
    compare: [
      { a: "Thin client", b: "Fat (thick) client", rows: [
        ["Processing", "Done on the server", "Done locally"],
        ["Hardware", "Low-spec, little or no storage", "Full CPU, RAM, storage"],
        ["Cost", "Cheap per device; needs a strong server", "Expensive per device"],
        ["Network", "Needs a constant, reliable connection", "Can work offline"],
        ["Management & security", "Central: update once on the server; no local data", "Each PC must be updated and secured"],
        ["Typical use", "Call centre, library, POS", "Video editing, programming, design"]
      ] },
      { a: "Smart client", b: "Thin client", rows: [
        ["Processing", "Locally (rich interface)", "On the server"],
        ["Data", "Stored/synced on a server or cloud", "Stored on the server"],
        ["Offline", "Yes: syncs later", "No"],
        ["Example", "Mobile banking app", "Library catalogue terminal"]
      ] },
      { a: "Virtual machine", b: "Emulation", rows: [
        ["Purpose", "Run extra OS instances on the same type of hardware", "Pretend to be different hardware/platform"],
        ["Speed", "Near-native", "Slower (instruction translation)"],
        ["Example", "3 virtual servers on 1 host", "Android emulator on Windows"]
      ] },
      { a: "Virtual machine", b: "Container", rows: [
        ["Includes", "Full guest OS", "App + libraries only; shares host kernel"],
        ["Size / start-up", "GBs, minutes", "MBs, seconds"],
        ["Isolation", "Strong", "Lighter"]
      ] }
    ],
    pitfalls: [
      "Confusing server virtualisation with a VPN (2016 asked you to tell them apart) or with virtual memory.",
      "Saying a thin client 'has no CPU': it has a low-power CPU; it just does very little processing.",
      "Defining a smart client as 'a smartphone'.",
      "Leaving out the trade-off: thin clients need a reliable network and a powerful server.",
      "Giving a 'difference' between fat and thin clients that doesn't mention processing or resource use, which is what 2025 asked for."
    ],
    years: [2016, 2021, 2022, 2023, 2024, 2025],
    priority: 3
  },

  {
    id: "sys-mobile-iot",
    section: "B: System Technologies",
    title: "Mobile devices, IoT, embedded systems & wearables",
    summary: "Mobile computing constraints and specs, digital convergence, sensors, mobile app types, embedded systems, single-board computers, wearables and the Internet of Things, plus automation and its risks.",
    points: [
      "Mobile constraints — battery life, small screen, limited processing power, RAM and storage, heat (no fan), not modular, easy to lose or steal. Battery is drained by screen brightness, CPU load, GPS, Wi-Fi/cellular data and large downloads, but NOT by typing speed (2020, 2021).",
      "Digital (device) convergence — many technologies combined in one device (a phone is a camera, GPS, scanner, music player, payment device and hotspot). Benefits: cheaper than buying separate devices, less to carry, data in one place. Drawbacks: one point of failure, faster battery drain, sometimes weaker than a dedicated device (2025).",
      "Mobile specs — SoC (system on a chip: CPU + GPU + modem, e.g. Snapdragon), RAM, flash storage, microSD slot, screen resolution and PPI, cameras (MP), SIM/eSIM, Wi-Fi, Bluetooth, NFC, GPS, sensors.",
      "Pixels and resolution — a pixel is the smallest controllable dot of colour on a screen or in an image. Resolution = pixels across × pixels down (e.g. 2560 × 1600). PPI = √(w² + h²) ÷ diagonal in inches; higher PPI means a sharper display.",
      "Sensors — accelerometer (movement, orientation), gyroscope (rotation), GPS receiver, proximity, ambient light, fingerprint, camera. They enable screen rotation, step counting, navigation and location-based services.",
      "Mobile app types — native apps are built for one OS: fast, full hardware access, from an app store, but separate Android and iOS versions are needed (2020). Mobile web apps run in the browser from one codebase with limited hardware access. Hybrid apps are web code wrapped in a native shell.",
      "Mobile design factors — screen size (touch targets, readable text), processing and storage demands, bandwidth and data costs, battery use, offline use (2025 asked for design factors for staff tablets; also think ergonomics: weight, grip, durability).",
      "Embedded system — a computer built into a larger device to do one dedicated job, usually running firmware with real-time response (washing machine, car ABS, smart meter, card machine, pacemaker).",
      "Raspberry Pi vs Arduino — the Raspberry Pi is a full single-board computer running Linux (projects, media centres, small servers). The Arduino is a microcontroller that runs one program to read sensors and control motors or LEDs.",
      "Wearables (smart wear) — smartwatches and fitness bands: health tracking (heart rate, steps, sleep), notifications, contactless payment. Health data raises privacy concerns.",
      "IoT (Internet of Things) — everyday physical objects fitted with sensors, processing and network connections that collect and exchange data over the Internet without human input (smart thermostats, security cameras, livestock trackers, soil-moisture sensors). Benefits: automation, remote monitoring, efficiency, data for decisions.",
      "IoT risks — weak or default passwords, firmware that is rarely updated, hijacking into botnets (e.g. Mirai), privacy (constant data collection), and dependence on connectivity and power.",
      "Automation — sensors + a processor + actuators make decisions without people (irrigation that switches on when soil is dry, automatic stock reordering). Errors in computer-controlled equipment (self-driving cars, medical devices, drones) can be dangerous.",
      "Tablet as a work tool — portable, touchscreen, camera, long battery life. Add peripherals to fill gaps: an external Bluetooth/USB barcode scanner (faster, more accurate scanning), a stylus (signatures, precise input), a keyboard (faster data entry) (2025)."
    ],
    compare: [
      { a: "Native app", b: "Mobile web app", rows: [
        ["Built for", "One OS (Android or iOS)", "Any device with a browser"],
        ["Install", "From an app store", "No install; open a URL"],
        ["Hardware access", "Full (camera, GPS, NFC, offline)", "Limited"],
        ["Performance", "Fast, smooth", "Depends on browser and connection"],
        ["Development cost", "Higher: separate versions to maintain", "Lower: one codebase"]
      ] },
      { a: "Raspberry Pi", b: "Arduino", rows: [
        ["Type", "Single-board computer", "Microcontroller board"],
        ["Runs", "Full OS (Linux), many programs", "One program (sketch) at a time"],
        ["Good for", "Media centre, web server, coding", "Reading sensors, controlling motors/LEDs"]
      ] },
      { a: "Tablet", b: "Laptop", rows: [
        ["Portability", "Lighter, longer battery life", "Heavier"],
        ["Input", "Touch, stylus, camera", "Full keyboard and touchpad"],
        ["Processing / multitasking", "Lower", "Higher"],
        ["Ports / upgrades", "Few, not modular", "More ports; some upgradable"]
      ] }
    ],
    pitfalls: [
      "Saying battery life depends on typing speed: it doesn't.",
      "Defining IoT as just 'devices on Wi-Fi'. Stress everyday objects with sensors that exchange data automatically.",
      "Generic camera uses. Tie them to the scenario: scanning barcodes, photographing damaged stock, proof of delivery, capturing a hairstyle photo.",
      "Advantage of convergence given without saying how it applies to the device in the question."
    ],
    years: [2016, 2020, 2021, 2023, 2024, 2025],
    priority: 3
  },

  /* =====================================================================
   * SECTION C: INTERNET & COMMUNICATION TECHNOLOGIES
   * ===================================================================== */
  {
    id: "net-types",
    section: "C: Communication Technologies",
    title: "Network types & models (LAN, WAN, PAN, VPN, client-server, P2P)",
    summary: "Classifying networks by size and purpose (PAN, LAN, MAN, WAN, GAN, WLAN, VLAN, intranet, extranet, VPN) and by model (client-server vs peer-to-peer), plus why organisations network at all and how remote access differs from a VPN.",
    points: [
      "Network — two or more computing devices connected so they can communicate and share resources. Reasons to network: communication, sharing resources (printers, Internet, files), centralised data and backups, central security/user rights, productivity.",
      "PAN — Personal Area Network, around one person within about 10 m (phone + smartwatch + earbuds over Bluetooth). LAN — Local Area Network, a small area such as one building or site, owned by the organisation. MAN — covers a city. WAN — Wide Area Network, a large geographical area, linking LANs through telecom/ISP links; the Internet is the biggest WAN (GAN = global).",
      "WLAN — a LAN where devices connect wirelessly (Wi-Fi) through access points.",
      "VLAN — Virtual LAN: one physical network logically split into separate groups (e.g. staff, POS, guest Wi-Fi) using a VLAN tag added to Ethernet frames. Improves security and reduces broadcast traffic without extra cabling (2025 matching question).",
      "Intranet — a private, organisation-only network/website using Internet technologies (staff portal, policies, internal forms). Extranet — part of an intranet opened to selected outsiders such as suppliers or customers with log-ins (e.g. supplier stock-ordering portal).",
      "VPN — Virtual Private Network: creates an encrypted 'tunnel' across a public network (the Internet) so a remote user or branch can join the private network securely, as if they were on site. Also hides your IP address from websites and your traffic from the local network/ISP.",
      "Remote access (e.g. TeamViewer, AnyDesk, Remote Desktop) — software that lets you view and control a specific computer from elsewhere, e.g. a technician fixing a PC. A VPN adds your device to a network; remote access takes control of another device.",
      "Client-server — central server(s) provide services (files, email, authentication, databases, printing, web) to clients. Centralised security, backups, user rights and management; scales well; but a server failure affects everyone, and servers cost more and need an administrator.",
      "Peer-to-peer (P2P) — every computer is equal and shares its own resources directly with others; no dedicated server. Cheap and easy for a few devices, but security, backups and finding files are decentralised and it doesn't scale. BitTorrent is P2P file sharing: many peers each upload pieces of a file, which spreads the load and speeds up downloads.",
      "Server roles — any computer that provides a service: file server, print server, mail server, web server, database server, authentication (domain) server, DHCP/DNS server.",
      "User rights and profiles — accounts with permissions control who may read, change or delete which resources; principle of least privilege.",
      "Choosing a model — for sharing files with many users and keeping data safe, client-server is usually best; for a tiny office with few devices and low budget, P2P can work (2024)."
    ],
    compare: [
      { a: "Client-server", b: "Peer-to-peer (P2P)", rows: [
        ["Structure", "Dedicated server(s) serve many clients", "All nodes equal; share directly"],
        ["Security & backups", "Centralised, easier to control", "Each machine managed separately"],
        ["Cost", "Higher: server hardware, OS, admin", "Low: no server needed"],
        ["Scalability", "Scales to many users", "Gets messy beyond a few devices"],
        ["Failure", "Server down = service down for all", "No single point of failure"],
        ["Example", "School network with file + email servers", "BitTorrent; small home network"]
      ] },
      { a: "LAN", b: "WAN", rows: [
        ["Area", "One building/site", "Cities, countries, global"],
        ["Ownership", "Owned by the organisation", "Uses leased lines/ISPs/telecoms"],
        ["Speed & errors", "High speed, low error rate", "Slower, more latency"],
        ["Example", "Salon or school network", "Internet; bank branches linked nationally"]
      ] },
      { a: "Intranet", b: "Extranet", rows: [
        ["Who can access", "Only the organisation's members", "Members + authorised outsiders"],
        ["Example", "Staff portal with HR forms", "Supplier ordering portal"]
      ] },
      { a: "VPN", b: "Remote access software", rows: [
        ["Does", "Securely joins your device to a remote network", "Lets you control one specific remote computer"],
        ["Encryption", "Encrypted tunnel for all traffic", "Session encrypted, but controls a desktop"],
        ["Typical use", "Employee working from home uses office files", "Technician fixes a user's PC"]
      ] }
    ],
    pitfalls: [
      "Saying a VPN makes the Internet faster: it usually adds a little latency.",
      "Saying a VPN is only for anonymous browsing (2022 MCQ): its main purpose is secure remote access over a public network.",
      "Confusing a VPN with server virtualisation or with remote-control software.",
      "Choosing P2P or client-server without a scenario reason (number of users, security of client data, budget).",
      "Calling the Internet and the WWW the same thing (see net-internet-services)."
    ],
    years: [2016, 2021, 2022, 2023, 2024, 2025],
    priority: 3
  },

  {
    id: "net-hardware-media",
    section: "C: Communication Technologies",
    title: "Network devices, cabling & topology",
    summary: "The hardware that builds a network (NIC, switch, router, access point, bridge, gateway, modem) and the media that carry the signal (UTP, fibre, wireless), their weaknesses (attenuation, EMI, crosstalk, eavesdropping) and topologies (star, bus, ring, mesh, hybrid).",
    points: [
      "NIC — Network Interface Card: connects a device to a network (wired RJ-45 or wireless) and has a unique MAC address burnt in by the manufacturer. Speeds like 10/100/1000 are in Mbps (1000 Mbps = Gigabit Ethernet).",
      "Switch — connects devices within a LAN (the centre of a star). It learns each device's MAC address in a MAC address table and sends each frame only to the port of the destination device, so there are fewer collisions, less wasted bandwidth and better security than a hub. A switch does NOT store IP addresses (a basic Layer-2 switch works with MAC addresses) (May 2025).",
      "Hub (obsolete) — repeats every incoming signal to all ports, which wastes bandwidth and causes collisions. Similarity with a switch: both connect nodes in a star.",
      "Router — connects different networks (e.g. the LAN to the Internet), using IP addresses to choose the best path for packets between networks. Home 'routers' combine router + switch + wireless access point + firewall + DHCP server (+ modem).",
      "Wireless access point (WAP) — lets wireless devices join a wired LAN. It connects to the switch with a cable, usually UTP (often powered by PoE). More WAPs are needed to cover large areas.",
      "Bridge — joins two LAN segments and filters traffic between them, reducing traffic (2021 definition). Wireless bridge — links two networks/buildings wirelessly with a pair of directional antennas in line of sight (May 2024).",
      "Gateway — connects two dissimilar networks that use different protocols and translates between them (2020 definition). Modem — converts between the digital signals of the computer and the signal type of the line (ADSL, cable, fibre ONT, cellular).",
      "PoE (Power over Ethernet) — the switch sends electricity as well as data through the UTP cable to devices such as WAPs, IP cameras and VoIP phones. Advantage: no separate power cable/socket needed. Disadvantage: needs a more expensive PoE switch and is limited in power and to 100 m.",
      "UTP (Cat5e/Cat6) — copper twisted-pair cable with RJ-45 plugs, the most common Ethernet cable. Cheap, flexible, easy to install, but limited to about 100 m per run, suffers attenuation and EMI/crosstalk, and can be tapped (eavesdropping).",
      "Fibre-optic cable — sends data as pulses of light through glass/plastic strands. Very high bandwidth, long distances (km) with little attenuation, immune to EMI and lightning, hard to tap, so more secure. But more expensive, fragile (can't bend sharply) and needs specialist installation. Used for backbones and links between buildings over 100 m (May 2024: 250 m; May 2025: 1 km).",
      "Channel weaknesses — attenuation: signal strength fades with distance (2025 definition). EMI (electromagnetic interference): electrical noise from motors, power lines, fluorescent lights disrupts copper signals and can corrupt data; fibre isn't affected. Crosstalk: a signal leaks from one wire pair into a neighbouring one. Eavesdropping: intercepting the signal.",
      "Topology — the physical layout of nodes and connections. Star: every device to a central switch; easy to add devices, and one cable failing affects only that device, but the switch is a single point of failure and it needs more cable. Bus: all devices on one backbone cable (cheap but one break stops all, collisions). Ring: each device connected to two neighbours in a loop. Mesh: devices interconnected with many paths (very reliable, used in wireless mesh Wi-Fi and the Internet's core). Hybrid: a combination, e.g. several stars linked by a fibre backbone.",
      "Wireless mesh network — several mesh nodes/access points relay traffic to each other, so you get wide coverage with few cables and the network routes around a failed node.",
      "Broadcast vs point-to-point — a broadcast sends a packet to every node on the network (e.g. ARP requests, DHCP discover), while point-to-point (unicast) sends to one specific device (2023 definition).",
      "Extending a LAN — fibre backbone between buildings, extra switches, WAPs or mesh nodes, wireless bridges."
    ],
    compare: [
      { a: "Switch", b: "Router", rows: [
        ["Connects", "Devices within ONE network (LAN)", "Different networks (LAN to Internet/WAN)"],
        ["Uses", "MAC addresses (MAC address table)", "IP addresses (routing table)"],
        ["Job", "Forwards frames only to the destination port", "Chooses the best path for packets between networks"],
        ["Example", "Links PCs, printer and WAPs in the office", "Links the store LAN to the ISP"]
      ] },
      { a: "UTP (copper)", b: "Fibre optic", rows: [
        ["Signal", "Electrical", "Light pulses"],
        ["Distance", "About 100 m per segment", "Kilometres"],
        ["Bandwidth", "Up to 1–10 Gbps", "Much higher"],
        ["Interference", "Affected by EMI and crosstalk", "Immune to EMI"],
        ["Security", "Easier to tap", "Very hard to tap"],
        ["Cost & install", "Cheap, flexible, easy", "Expensive, fragile, specialist install"]
      ] },
      { a: "Wired (bounded)", b: "Wireless (unbounded)", rows: [
        ["Speed & reliability", "Faster, stable, low latency", "Slower and variable; walls and distance weaken it"],
        ["Mobility", "Fixed to a socket", "Move around freely"],
        ["Installation", "Cabling cost and effort", "Quick, few cables, easy to add devices"],
        ["Security", "Must physically connect", "Signal leaks beyond the walls; needs strong encryption"],
        ["Interference", "EMI on copper only", "Other Wi-Fi networks, microwaves, Bluetooth"]
      ] },
      { a: "Star topology", b: "Bus topology", rows: [
        ["Layout", "All nodes to a central switch", "All nodes on one backbone cable"],
        ["Failure", "One cable fails: only that node is down; switch fails: all down", "Backbone break: whole network down"],
        ["Cable", "More cable", "Less cable"],
        ["Adding nodes", "Easy: plug into the switch", "Disrupts the network"]
      ] }
    ],
    pitfalls: [
      "Saying a switch 'connects to the Internet' or uses IP addresses: that's a router's job.",
      "Recommending UTP for a link longer than 100 m without a switch/repeater in between: choose fibre and give the distance as the reason.",
      "Weakness questions answered with 'it's slow'. Name the weakness (attenuation, EMI, crosstalk, eavesdropping, 100 m limit) and describe it.",
      "Advantage and disadvantage given as opposites, e.g. 'wireless is mobile' and 'wired is not mobile'.",
      "Forgetting to say HOW a WAP connects to the network (cable to the switch, often PoE)."
    ],
    years: [2016, 2020, 2021, 2022, 2023, 2024, 2025],
    priority: 3
  },

  {
    id: "net-protocols",
    section: "C: Communication Technologies",
    title: "Protocols, packets & frames (TCP/IP, UDP, HTTP/S, FTP, email)",
    summary: "The rule-sets that let devices communicate: TCP/IP and the TCP vs UDP choice, packet switching, packet and frame structure, web protocols (HTTP/HTTPS), file-transfer options (FTP, WebDAV, BitTorrent) and email protocols (SMTP, POP3, IMAP).",
    points: [
      "Protocol — an agreed set of rules for how data is formatted, transmitted, received and error-checked, so different devices and systems can communicate (2016, 2022 definitions).",
      "TCP/IP — the Internet's protocol suite. IP handles addressing and routing packets to the right destination; TCP breaks data into numbered segments, guarantees delivery, puts them back in order and re-sends lost ones.",
      "TCP — connection-oriented (handshake first), reliable: acknowledgements, retransmission of lost packets, correct ordering, error checking. Slower due to overheads. Used for web pages, email, file transfers, banking, where every byte matters.",
      "UDP — connectionless: sends datagrams with no handshake, no acknowledgements, no guarantee of order or delivery (2020 definition). Low overhead and low latency. Used for online gaming, live streaming, VoIP/video calls, DNS lookups, where speed matters more than a lost packet. (HTTP/3 also runs over UDP via QUIC.)",
      "Packet switching — data is split into packets that travel independently over the best available routes and are reassembled at the destination. This uses the network efficiently and routes around failures. Packets may arrive out of order, and TCP fixes that.",
      "Packet structure — header: source and destination IP addresses, packet sequence number, protocol, time-to-live; payload: the actual chunk of data being carried (2023 definition); trailer/error check: a checksum to detect corruption.",
      "Ethernet frame vs IP packet — inside a LAN the IP packet is wrapped (encapsulated) in an Ethernet frame that adds source and destination MAC addresses, an optional VLAN tag and a frame check sequence (CRC). Frames are delivered hop-to-hop using MAC addresses; the IP addresses inside stay the same end-to-end. Routers strip and rebuild frames at each hop.",
      "Ethernet — the standard set of protocols for wired LANs (frames, MAC addressing, speeds such as 100 Mbps and 1 Gbps on the same network).",
      "HTTP — HyperText Transfer Protocol: transfers web pages and resources from a web server to the browser. HTTPS — HTTP secured with TLS (SSL) encryption: protects logins, bookings and payments from eavesdropping and confirms the site's identity with a digital certificate (padlock).",
      "FTP — File Transfer Protocol: uploading and downloading files between a client and server (e.g. uploading a website), efficient for big files. Plain FTP sends logins unencrypted; use SFTP/FTPS.",
      "WebDAV — an extension of HTTP that lets users create, edit, move, copy and share files directly on a web server as if it were a network drive; works through firewalls over HTTPS and supports file locking for collaboration (2022, 2024, 2025).",
      "Email protocols — SMTP sends (pushes) mail from the client to the mail server and between servers. POP3 downloads mail to one device and usually deletes it from the server (offline access, one device). IMAP keeps mail on the server and syncs it across all devices (folders, read status).",
      "Other protocols — DHCP (assigns IP addresses), DNS (names to IP), ARP (finds the MAC address for an IP on the LAN), TLS/SSL (encryption), WPA2/WPA3 (Wi-Fi security), Bluetooth.",
      "Data transmission checks — parity bit (an extra bit making the count of 1s odd or even), checksums and CRC detect corrupted data so it can be re-sent."
    ],
    compare: [
      { a: "TCP", b: "UDP", rows: [
        ["Connection", "Connection-oriented (handshake)", "Connectionless"],
        ["Reliability", "Guaranteed delivery; lost packets re-sent", "No guarantee; lost packets are lost"],
        ["Order", "Reassembled in the correct order", "May arrive out of order"],
        ["Speed / overhead", "Slower, more overhead", "Faster, low latency"],
        ["Use", "Web, email, file transfer, banking", "Gaming, live streaming, VoIP, DNS"]
      ] },
      { a: "POP3", b: "IMAP", rows: [
        ["Mail location", "Downloaded to the device, usually removed from server", "Stays on the server, synced"],
        ["Devices", "Best for one device", "Same mailbox on phone, laptop and web"],
        ["Offline", "Full offline access to downloaded mail", "Needs connection (caches recent mail)"],
        ["Server storage", "Low", "Higher"]
      ] },
      { a: "FTP", b: "WebDAV", rows: [
        ["Built on", "Its own protocol (ports 20/21)", "Extension of HTTP/HTTPS"],
        ["Best for", "Bulk upload/download of large files", "Editing and managing files on a web server like a network drive"],
        ["Collaboration", "No file locking", "Supports locking so two people don't overwrite each other"],
        ["Security", "Plain FTP unencrypted (use SFTP/FTPS)", "Encrypted when over HTTPS"]
      ] },
      { a: "IP packet", b: "Ethernet frame", rows: [
        ["Addresses", "Source and destination IP", "Source and destination MAC"],
        ["Scope", "End-to-end across networks", "One link/hop within a LAN"],
        ["Handled by", "Routers", "Switches and NICs"],
        ["Extra fields", "TTL, protocol, sequence", "VLAN tag, frame check sequence (CRC)"]
      ] }
    ],
    pitfalls: [
      "Saying UDP is 'unsafe' or 'insecure': it is unreliable (no delivery guarantee), which is not the same as insecure.",
      "Choosing TCP for gaming or video calls: low latency matters more, so UDP. Give a reason AND, if asked, a disadvantage (lost packets, glitches).",
      "Saying SMTP is used to receive email.",
      "Writing 'HTTPS is safer' without saying it encrypts the data in transit and authenticates the site.",
      "Mixing up the packet header (addresses, sequence number) with the payload (the data)."
    ],
    years: [2016, 2020, 2021, 2022, 2023, 2024, 2025],
    priority: 3
  },

  {
    id: "net-addressing",
    section: "C: Communication Technologies",
    title: "Addressing: IPv4/IPv6, MAC, DNS, DHCP, ARP, URL, NAT",
    summary: "How devices are identified and found: MAC addresses on the network card, IPv4 and IPv6 addresses (and the bit/hex maths), static vs dynamic addressing with DHCP, names to IP with DNS, ARP, URLs, ports and NAT.",
    points: [
      "IP address — a logical address that identifies a device on a network so data can be routed to it. It can change when the device joins a different network.",
      "MAC address — a 48-bit physical address burnt into each network interface (NIC) by the manufacturer, written as 12 hex digits (e.g. 00:1A:2B:3C:4D:5E). It uniquely identifies the network card and is used for delivery inside a LAN by switches (May 2025 definition).",
      "IPv4 — 32 bits, written as 4 decimal octets 0–255 (e.g. 192.168.1.1), about 4.3 billion (2^32) addresses, which have run out. Private ranges (10.x.x.x, 172.16–31.x.x, 192.168.x.x) are used inside LANs.",
      "IPv6 — 128 bits, written as 8 groups of 4 hexadecimal digits separated by colons (e.g. 2001:0db8:0000:0000:0000:ff00:0042:8329): about 3.4 × 10^38 addresses, enough for every IoT device. Also has a simpler header and built-in IPsec support.",
      "Shortening IPv6 — drop leading zeros in each group (0db8 → db8, 0042 → 42; 0000 → 0), and replace ONE run of consecutive all-zero groups with :: (only once per address). Trailing zeros cannot be dropped, because ff00 would become ff, a different value (2023).",
      "IPv6 bit maths — 8 groups × 16 bits = 128 bits; each hex digit = 4 bits.",
      "Static vs dynamic IP — static: fixed, set manually; needed for devices others must always find (server, network printer, router, IP camera, web server). Dynamic: assigned automatically and may change; fine for laptops and phones (May 2023, May 2025).",
      "DHCP — Dynamic Host Configuration Protocol: a DHCP server (often the router) automatically leases an IP address, subnet mask, default gateway and DNS server to each device that joins, preventing duplicate addresses and saving manual setup.",
      "DNS — Domain Name System: translates human-friendly domain names (www.takealot.com) into IP addresses. If a website moves to a new host, DNS records are updated so the same URL still works (May 2023).",
      "ARP — Address Resolution Protocol: on a LAN, finds the MAC address that belongs to a given IP address so the frame can be delivered.",
      "URL — Uniform Resource Locator: the full web address: protocol (https://), domain name (www.gov.za), path/file (/covid-19/evds). The domain's top-level part (.co.za, .com, .org) shows country/type.",
      "Who assigns what — the ISP assigns the router's public (external) IP address (2021); the router's DHCP assigns private addresses inside the LAN; the manufacturer assigns MAC addresses.",
      "NAT — Network Address Translation: the router lets many devices with private IPs share one public IP, keeping track of which reply goes to which device. Extends IPv4's life and hides internal addresses.",
      "Ports — numbers that identify a service on a device: 80 HTTP, 443 HTTPS, 25 SMTP, 21 FTP, 53 DNS. Firewalls filter by port; unnecessary open ports are a security risk."
    ],
    compare: [
      { a: "IPv4", b: "IPv6", rows: [
        ["Size", "32 bits", "128 bits"],
        ["Format", "4 decimal numbers 0–255, dots", "8 groups of 4 hex digits, colons"],
        ["Address count", "About 4.3 billion (2^32), exhausted", "About 3.4 × 10^38 (2^128)"],
        ["Example", "192.168.1.10", "2001:db8::ff00:42:8329"],
        ["Extras", "Relies on NAT to stretch addresses", "Enough for IoT; simpler header; IPsec built in"]
      ] },
      { a: "MAC address", b: "IP address", rows: [
        ["Type", "Physical, hardware address", "Logical, network address"],
        ["Assigned by", "Manufacturer (burnt into NIC)", "DHCP server/ISP or set manually"],
        ["Changes?", "Normally never", "Changes when moving to another network"],
        ["Size / format", "48 bits, 12 hex digits", "IPv4 32 bits / IPv6 128 bits"],
        ["Used by", "Switches inside a LAN", "Routers across networks"]
      ] },
      { a: "Static IP", b: "Dynamic IP", rows: [
        ["Set by", "Manually configured", "DHCP automatically"],
        ["Changes", "Never", "Can change each time it connects"],
        ["Use", "Server, printer, router, camera", "Laptops, phones, tablets"]
      ] },
      { a: "DNS", b: "DHCP", rows: [
        ["Does", "Translates domain names to IP addresses", "Hands out IP addresses to devices"],
        ["Example", "takealot.com → its server's IP", "Laptop joins Wi-Fi and gets 192.168.1.23"]
      ] }
    ],
    pitfalls: [
      "Saying IPv6 is 64 bits (2022 MCQ trap): it is 128 bits.",
      "Removing trailing zeros, or using :: twice, when shortening IPv6.",
      "Saying DNS 'gives' devices IP addresses: that's DHCP.",
      "Saying MAC addresses identify 'the computer': strictly they identify the network card/interface.",
      "Static IP example without a reason: say WHY it must be fixed (users' print drivers/clients point to that address)."
    ],
    years: [2020, 2021, 2022, 2023, 2024, 2025],
    priority: 3
  },

  {
    id: "net-wireless-mobile",
    section: "C: Communication Technologies",
    title: "Wireless & mobile communication (Wi-Fi, Bluetooth, NFC, 4G/5G, satellite)",
    summary: "Wireless and cellular connection technologies and how to compare them: Wi-Fi standards and hotspots, Bluetooth, NFC, RFID, GPS, cellular generations up to 5G, fibre/ADSL/satellite Internet, and the key measures: bandwidth, speed, throughput, latency and symmetric vs asymmetric links.",
    points: [
      "Wi-Fi (IEEE 802.11) — wireless LAN technology using radio waves in the 2.4 GHz (longer range, more interference), 5 GHz (faster, shorter range) and 6 GHz bands. Generations: Wi-Fi 4 = 802.11n, Wi-Fi 5 = 802.11ac, Wi-Fi 6/6E = 802.11ax (more devices at once via OFDMA; 6E adds 6 GHz), Wi-Fi 7 = 802.11be (certified from January 2024: multi-link operation uses several bands at once; optional 320 MHz channels and 4096-QAM for very high speeds and lower latency).",
      "Hotspot — a place or device that provides Internet access over Wi-Fi: public hotspots in cafés, or a personal hotspot where a phone shares its mobile data. Convenient, but open hotspots are risky (eavesdropping, fake 'evil twin' hotspots), so use passwords, WPA2/WPA3 and a VPN.",
      "Bluetooth — short-range wireless standard (typically about 10 m, up to around 100 m+ for newer versions in open space), low power, 2.4 GHz, used to pair peripherals: wireless mouse, keyboard, headphones, speakers, smartwatch, barcode scanner, car kit. Lower bandwidth than Wi-Fi, so it can't replace Wi-Fi for networking.",
      "NFC — Near Field Communication: very short range (about 4 cm), used for contactless payments (tap to pay), access cards and pairing. RFID — tags read by radio from a distance, used for stock tracking, toll gates, library books, animal tags; passive tags need no battery.",
      "GPS — Global Positioning System: satellite navigation that calculates a receiver's exact position from the signals of at least four satellites (2025 definition). It provides location data for LBS, delivery tracking and fleet management.",
      "Cellular generations — 3G (mobile Internet, being switched off in South Africa as networks move to 4G/5G), 4G/LTE (fast mobile broadband, video streaming), 5G (much higher bandwidth, very low latency, many more devices per area). GSM = the older digital mobile-phone standard; WiMAX = an older long-range wireless broadband standard.",
      "5G details — uses higher-frequency bands (including mmWave) and wider channels, so more data per second (bandwidth). Latency drops to a few milliseconds, which enables real-time control, IoT, AR and self-driving cars, and downloads are much faster. Challenges: shorter range and poor penetration through walls, so many more towers/small cells are needed; costly rollout; limited rural coverage; new compatible devices required; power for towers during load-shedding.",
      "Bandwidth vs speed — bandwidth is the maximum amount of data the connection can carry per second (the width of the pipe, in Mbps). Speed/throughput is the actual rate data arrives, affected by congestion, distance and latency (2024).",
      "Latency — the time delay for data to travel from source to destination and back (measured in ms). Low latency is vital for gaming, video calls, VoIP and remote control (2025).",
      "Symmetric vs asymmetric connection — symmetric: equal upload and download speeds (fibre business lines, good for cloud backups, video conferencing, hosting). Asymmetric: download much faster than upload (ADSL, many home packages, some satellite), which suits normal browsing and streaming (2021, May 2023, May 2025).",
      "Units — data rates are in bits per second: Kbps, Mbps, Gbps (e.g. 4 Mbps = 4 000 000 bps). File sizes are in bytes: 1 byte = 8 bits.",
      "Fibre vs ADSL vs wireless/satellite Internet — fibre: fastest and most reliable, often symmetric, needs fibre in the street. ADSL: uses copper telephone lines, asymmetric, slow, being phased out. Satellite (e.g. Starlink low-Earth-orbit): available almost anywhere (rural farms), now with decent speeds and latency, but weather can interrupt it and the equipment/subscription costs more. ISDN (2023): an older digital technology sending voice and data together over copper telephone lines.",
      "Microwave and radio links — point-to-point wireless links between towers/buildings, needing line of sight; used for WAN backhaul.",
      "Wireless advantages — mobility, no cabling cost, quick to add devices, good for temporary layouts. Disadvantages (other than security) — slower and less stable than cable, interference and walls reduce signal, limited range, shared bandwidth drops as more users connect, battery drain on devices (2025)."
    ],
    compare: [
      { a: "4G / LTE", b: "5G", rows: [
        ["Bandwidth / peak speed", "Tens to hundreds of Mbps", "Hundreds of Mbps to several Gbps"],
        ["Latency", "About 30–50 ms", "As low as a few ms"],
        ["Devices per area", "Fewer", "Many more (suits IoT)"],
        ["Range per tower", "Longer", "Shorter at high frequencies, so more towers"],
        ["Coverage in SA", "Widespread", "Mostly cities, growing"]
      ] },
      { a: "Bluetooth", b: "Wi-Fi", rows: [
        ["Range", "Short (about 10 m typical)", "Longer (tens of metres per access point)"],
        ["Bandwidth", "Low", "High"],
        ["Power use", "Very low", "Higher"],
        ["Purpose", "Pair peripherals to one device (PAN)", "Connect devices to a LAN and the Internet"]
      ] },
      { a: "Symmetric connection", b: "Asymmetric connection", rows: [
        ["Speeds", "Upload = download", "Download faster than upload"],
        ["Suits", "Cloud backups, video conferencing, hosting a website", "Browsing, streaming, normal home use"],
        ["Example", "Business fibre 100/100 Mbps", "ADSL, 50/10 Mbps home fibre, many satellite plans"]
      ] },
      { a: "NFC", b: "RFID", rows: [
        ["Range", "About 4 cm (must tap)", "Centimetres to many metres"],
        ["Communication", "Two-way (phone to terminal)", "Reader reads tag (mostly one-way)"],
        ["Use", "Contactless payments, access cards", "Stock tracking, toll tags, livestock"]
      ] }
    ],
    pitfalls: [
      "Writing 'bandwidth is speed'. Bandwidth is capacity per second; speed is what you actually get.",
      "Saying 5G 'increases range': higher frequencies actually have shorter range.",
      "Defining latency as 'lag' only. Say it is the time delay for data to travel between devices, measured in milliseconds.",
      "Mixing up bits and bytes (Mbps vs MB/s): 8 bits = 1 byte.",
      "Wireless disadvantages that are just security when the question says 'other than security'.",
      "Recommending a phone hotspot that the driver also needs for navigation/the app without considering battery and shared data (2022)."
    ],
    years: [2016, 2020, 2021, 2022, 2023, 2024, 2025],
    priority: 3
  },

  {
    id: "net-internet-services",
    section: "C: Communication Technologies",
    title: "Internet services: Web evolution, cloud, streaming, VoIP, LBS, search & SEO",
    summary: "What runs on the Internet: the Web and its evolution (Web 1.0 to 4.0), cloud services (SaaS/PaaS/IaaS, cloud computing vs cloud storage), streaming, video on demand, VoIP, podcasts, location-based services, search engines and SEO.",
    points: [
      "Internet vs WWW — the Internet is the global network of networks (the hardware and connections). The World Wide Web is one service on it: linked web pages accessed with a browser over HTTP/HTTPS. Email, VoIP and FTP are other Internet services.",
      "Web 1.0 — static, read-only pages; users only browse content created by the site owner. Web 2.0 — interactive and social; users create and share content (reviews, comments, ratings, posts, wikis, social media), with dynamic pages and rich web apps. Web 3.0 — the 'semantic'/intelligent and decentralised web: data understood by machines, AI personalisation, blockchain-based apps. Web 4.0 — a predicted 'symbiotic' web of AI agents, IoT and immersive (AR/VR) experiences.",
      "Social media — platforms where users create, share and interact with content and each other (Facebook, Instagram, TikTok, X, LinkedIn, YouTube). Microblog — short posts (X/Twitter). Businesses use them for marketing, customer feedback and reach (2023).",
      "Download vs streaming — downloading stores the whole file before use (watch offline, uses storage). Streaming plays the media while it arrives in a buffer, with no full copy kept; it needs a steady connection and uses bandwidth continuously.",
      "Video on demand (VoD) — users choose what to watch and when, instead of following a fixed broadcast schedule (Netflix, Showmax, YouTube). Needs an Internet connection and offers a wide range of content (2020, 2023, May 2024).",
      "VoIP — Voice over IP: voice (and video) calls sent as data packets over the Internet (WhatsApp calls, Teams, Zoom). Cheap or free, especially internationally, supports conferencing and screen-sharing, works on mobile devices, and can run on a LAN without Internet. Quality depends on bandwidth and latency. A normal SIM-card voice call on the cellular network is NOT VoIP (May 2025).",
      "Podcast / vodcast — downloadable or streamable series of audio (podcast) or video (vodcast) episodes that listeners can subscribe to.",
      "Cloud computing — using processing power, software and services hosted on a provider's servers over the Internet, on demand and pay-as-you-go (e.g. Google Workspace, Microsoft 365, AWS). Cloud storage is just one part: saving files online (OneDrive, Google Drive, Dropbox) (2024).",
      "Service models — SaaS (Software as a Service): use complete apps in the browser (Gmail, Microsoft 365, Canva). PaaS (Platform as a Service): a platform/tools to build and host your own apps (Google App Engine, Azure App Service). IaaS (Infrastructure as a Service): rent virtual servers, storage and networking and manage the OS yourself (AWS EC2, Azure VMs). Renting a server to run your own mail server is IaaS, not SaaS (2016).",
      "Cloud effect on local hardware — processing and storage move to the provider, so cheaper, lower-spec devices (thin clients, Chromebooks, tablets) are enough, but a fast, reliable connection becomes essential.",
      "Cloud pros — scalability (add users/storage instantly), lower upfront hardware cost, access anywhere (mobility), automatic updates and backups, real-time collaboration and sharing, provider-level security and redundancy. Cons — dependent on Internet and bandwidth, ongoing subscription costs, less control, data privacy and where the data is stored (sovereignty, POPIA), vendor lock-in, outages at the provider.",
      "LBS — Location-Based Services: software services that use a device's location (from GPS, Wi-Fi or cell towers) to give relevant information or functions: navigation (Waze), finding nearby stores, ride-hailing (Uber), delivery tracking, geotagging photos, location-targeted adverts. Components: mobile device, application, positioning, communication network, content provider (2021, 2024, May 2024).",
      "Search engines — tools that crawl and index web pages and rank results for a query (Google, Bing, DuckDuckGo). Better searches: quotation marks for exact phrases, minus to exclude, site:, filetype:, Boolean AND/OR/NOT. Reverse image search (Google Lens/TinEye) finds where an image appears or similar images (2021). Sound search (Shazam) identifies songs.",
      "SEO — Search Engine Optimisation: improving a website so it ranks higher in search results and attracts more visitors. Techniques: relevant keywords in titles, headings and content; meta descriptions; fast, mobile-friendly pages; quality, regularly updated content; descriptive URLs and image alt text; good links from other reputable sites; HTTPS (2016, 2021, 2024, 2025).",
      "Digital currencies — money that exists only electronically and can buy goods and services; cryptocurrencies (Bitcoin, Ethereum) are decentralised and not issued by a central bank (see net-distributed and net-deep-dark-web)."
    ],
    compare: [
      { a: "SaaS", b: "IaaS", rows: [
        ["You get", "Ready-made software used via browser/app", "Virtual servers, storage, networks"],
        ["You manage", "Only your data and settings", "OS, apps, data (provider manages hardware)"],
        ["Users", "End users and businesses", "IT departments and developers"],
        ["Examples", "Microsoft 365, Gmail, Canva", "AWS EC2, Azure Virtual Machines"],
        ["Middle option", "PaaS: platform to build/host your own apps (e.g. Azure App Service)", "PaaS sits between SaaS and IaaS"]
      ] },
      { a: "Cloud computing", b: "Cloud storage", rows: [
        ["Meaning", "Using remote processing, software and services over the Internet", "Saving and syncing files on remote servers"],
        ["Example", "Running bookings in Google Workspace; renting a virtual server", "OneDrive, Google Drive, Dropbox"],
        ["Relationship", "The broad concept", "One service within cloud computing"]
      ] },
      { a: "Web 1.0", b: "Web 2.0", rows: [
        ["Content", "Static, created by site owner", "Dynamic, user-generated"],
        ["User role", "Read only (browse)", "Read-write: comment, rate, share, upload"],
        ["Examples", "Early company brochure sites", "Social media, wikis, review sites"]
      ] },
      { a: "Download", b: "Streaming", rows: [
        ["Playback", "After the whole file arrives", "Starts almost immediately while data arrives"],
        ["Storage", "Full copy stored", "Only a temporary buffer"],
        ["Connection", "Needed only while downloading", "Needed throughout"],
        ["Offline use", "Yes", "No"]
      ] }
    ],
    pitfalls: [
      "Saying the Internet and the Web are the same thing.",
      "Calling a normal SIM call or SMS VoIP.",
      "Cloud answers with vague words like 'convenient'. Link to the scenario: 'the second salon can open the same bookings database through the cloud'.",
      "Defining SEO as 'paying Google to be first': that's paid search advertising, not SEO.",
      "Cloud computing vs cloud storage answered with the same idea twice: computing = processing/software, storage = files.",
      "Listing Web 2.0 features without saying why the site needs them (user interaction, reviews, ordering)."
    ],
    years: [2016, 2020, 2021, 2023, 2024, 2025],
    priority: 3
  },

  {
    id: "net-web-tech",
    section: "C: Communication Technologies",
    title: "Web technologies: scripting, cookies, caching, web & mobile apps",
    summary: "How websites and web apps work: static vs dynamic sites, HTML/CSS/JavaScript, client-side vs server-side scripting, cookies, browser/proxy caching, CDNs, plug-ins and extensions, and native vs web vs hybrid apps plus web UI design.",
    points: [
      "HTML — HyperText Markup Language: structures web page content (headings, paragraphs, links, images, forms). CSS — styles the page (colours, fonts, layout, responsive design for phones). JavaScript — adds interactivity and runs in the browser.",
      "Static website — fixed pages, the same for every visitor, changed only by editing files (cheap, fast). Dynamic website — pages generated on request from a database and user input (logins, bookings, shopping carts, personalised content). Businesses that take bookings/orders or update stock need dynamic sites (2016).",
      "Client-side scripting — code (JavaScript) downloaded and run in the user's browser: instant form validation, dropdown menus, calculating an order total, image sliders, maps. Fast, reduces server load, but code is visible and can be disabled, so it can't be trusted for security.",
      "Server-side scripting — code run on the web server (PHP, Python, Node.js, Java, ASP.NET) that accesses the database, processes logins and payments, and builds the page before sending HTML to the browser. Secure (code hidden) and works on any browser, but each request uses server resources.",
      "AJAX — technique where JavaScript fetches data from the server in the background and updates part of the page without reloading the whole page (fast, dynamic pages) (2016).",
      "Cookies — small text files a website stores in your browser to remember information: logins/sessions, shopping cart, preferences, and (third-party cookies) tracking behaviour for targeted adverts. Sent back to the server with each request to that site. Not encrypted by default, so they are a privacy concern (May 2024).",
      "Caching — keeping a copy of data closer to where it's needed so it loads faster. Browser cache: stores recently visited pages/images on your device. Proxy/web cache: a server in the organisation or ISP stores popular pages for all users, saving bandwidth. Disk cache: RAM used to speed up a slower disk. CDN (Content Delivery Network): copies of a site's content on servers around the world, so users download from the nearest one.",
      "Plug-ins and extensions — add-on software that extends a browser or app (ad blockers, password managers, PDF viewers). Useful, but malicious extensions can spy on browsing, so install only trusted ones.",
      "Web-based applications — full applications that run in a browser (Google Docs, online banking): no installation, cross-platform, always up to date, but need a connection.",
      "Native vs mobile web vs hybrid apps — native: built for one platform, fastest, full hardware access (camera, GPS, notifications), installed from an app store. Mobile web app: runs in the browser, one codebase for all platforms. Hybrid: web technologies inside a native wrapper. Businesses may need separate Android and iOS versions of a native app (2020).",
      "Web UI design — readability (font size, contrast), navigation (clear menus; the three-click rule), consistency (same layout and colours on all pages), layout and white space, theme and typography, responsive design for phones, accessibility (alt text, keyboard use). Desktop UI uses mouse and large screens; mobile UI needs large touch targets, simple layouts and less typing.",
      "Design factors for mobile technology — small screen size, processing and storage demands, bandwidth and data costs, battery use, touch input (2025).",
      "Evaluating a website as a source — check authority (author credentials), affiliation (who funds it), currency (date updated), accuracy/content (references, working links), objectivity (bias), audience, design (May 2024)."
    ],
    compare: [
      { a: "Client-side scripting", b: "Server-side scripting", rows: [
        ["Runs on", "User's browser", "Web server"],
        ["Languages", "JavaScript", "PHP, Python, Node.js, Java, C#"],
        ["Good for", "Instant validation, animations, live totals", "Database access, logins, payments, generating pages"],
        ["Security", "Code visible; can be bypassed", "Code hidden; trusted"],
        ["Load", "Uses the client's processor; less server load", "Uses server resources for every request"]
      ] },
      { a: "Static website", b: "Dynamic website", rows: [
        ["Content", "Same for everyone; fixed files", "Generated from a database/user input"],
        ["Updating", "Edit the HTML manually", "Update data through a CMS/admin page"],
        ["Features", "Information only", "Logins, bookings, carts, search"],
        ["Cost & speed", "Cheap, fast, simple hosting", "More complex, needs a server-side language and DB"]
      ] },
      { a: "Browser cache", b: "Proxy (web) cache", rows: [
        ["Location", "User's own device", "Server on the network/ISP"],
        ["Serves", "One user", "All users on the network"],
        ["Benefit", "Revisited pages load faster", "Saves Internet bandwidth for the whole organisation"]
      ] }
    ],
    pitfalls: [
      "Saying client-side scripting is used for passwords or payments: those must be checked server-side.",
      "Saying cookies are viruses or programs: they are small text data files.",
      "Saying cookies are always encrypted (May 2024 trap).",
      "Listing client-side features that need the database (e.g. 'saving the order'): that's server-side.",
      "Confusing a browser cache (local) with a proxy cache (shared server)."
    ],
    years: [2016, 2020, 2023, 2024, 2025],
    priority: 2
  },

  {
    id: "net-security",
    section: "C: Communication Technologies",
    title: "Network & Internet security (encryption, SSL/TLS, certificates, firewalls, Wi-Fi security)",
    summary: "Protecting data in transit and networks: symmetric vs asymmetric (public/private key) encryption, key length, SSL/TLS and HTTPS, digital certificates and signatures, firewalls and port filtering, Wi-Fi security (WPA2/3, TKIP), authentication (passwords, biometrics, 2FA/MFA), user rights, proxies and practical security measures.",
    points: [
      "Encryption — scrambling data with an algorithm and a key into unreadable ciphertext, so only someone with the correct key can decrypt and read it. If intercepted, the data is useless to the eavesdropper (2023).",
      "Symmetric encryption — the SAME secret key encrypts and decrypts. Fast and good for bulk data (Wi-Fi traffic, disk encryption, AES). Weakness: the key must be shared securely; if it's intercepted while being sent, all the data can be read (key distribution problem).",
      "Asymmetric (public-key) encryption — a mathematically linked key pair: the public key (shared with everyone) encrypts, and only the matching private key (kept secret by the owner) decrypts. Solves key distribution because the private key is never sent. Disadvantage: much slower and more processing-intensive, so it's mostly used to exchange a symmetric key safely (2016, 2023, 2025).",
      "Key length — longer keys mean exponentially more combinations to brute-force. A 256-bit key has 2^256 possible keys, which is practically impossible to guess (2023). The 48-bit TKIP key is short, but TKIP changes the key for every packet, so cracking one key doesn't reveal the others (May 2025).",
      "SSL/TLS — protocols that create an encrypted, authenticated connection between browser and server (TLS 1.2/1.3 has replaced the old SSL, but the name 'SSL' is still used). The server's certificate proves identity, asymmetric encryption swaps a session key, then fast symmetric encryption protects the data. Prevents eavesdropping and man-in-the-middle attacks. HTTPS = HTTP over TLS, shown by the padlock (2025 SSL questions).",
      "Digital certificate — an electronic document issued by a trusted Certificate Authority (CA) that binds an organisation's identity to its public key, proving the website is genuine (2016, 2024, 2025).",
      "Digital signature — a hash of a message encrypted with the sender's PRIVATE key. Anyone can check it with the sender's public key, which proves who sent it (authentication) and that it wasn't changed (integrity), and the sender can't deny it.",
      "Firewall — hardware or software that monitors incoming and outgoing traffic and blocks or allows it according to rules (IP addresses, ports, applications), preventing unauthorised access and blocking malware traffic. Port filtering closes ports that aren't needed. In a business with guest Wi-Fi it keeps customers off staff systems and can block unwanted sites (2023, 2024, May 2025).",
      "Wi-Fi security — WEP (broken, never use), WPA with TKIP (generates a new key for each packet; now outdated), WPA2 (AES encryption, current minimum) and WPA3 (stronger protection against password guessing, current best). Also: change default router passwords, use a strong passphrase, hide or rename the SSID, separate guest network/VLAN, MAC filtering, update router firmware, disable WPS.",
      "Wi-Fi vulnerabilities — eavesdropping on unencrypted traffic, unauthorised users stealing bandwidth, rogue/'evil twin' access points, weak default passwords, outdated firmware (2025: give two issues and a realistic solution for each).",
      "Authentication — proving who you are. Something you know (password/PIN), something you have (phone, token, smart card), something you are (biometrics: fingerprint, face, iris, voice). 2FA/MFA combines two or more factors, so a stolen password alone isn't enough. Strong passwords: long passphrases, unique per site, stored in a password manager. Passkeys (now common) replace passwords with a device-held private key unlocked by biometrics, which resists phishing.",
      "Biometric devices — fingerprint scanners, face recognition cameras (Windows Hello IR camera), iris scanners, voice recognition. Can't be forgotten or easily shared, but can't be changed if compromised, and raise privacy concerns (2022).",
      "User rights and access control — give each user only the permissions they need (least privilege); separate admin accounts; remove accounts of people who leave.",
      "Proxy server — an intermediary between users and the Internet: hides internal IP addresses, filters/blocks sites, caches pages and logs use.",
      "Other measures — anti-malware kept updated, OS and software updates, audit trails/logs, encrypted backups, encrypting devices' drives, physical security of servers, staff awareness training, disabling unused ports and services, VPN for remote staff."
    ],
    compare: [
      { a: "Symmetric encryption", b: "Asymmetric encryption", rows: [
        ["Keys", "One shared secret key", "Public key + private key pair"],
        ["Speed", "Fast, low processing", "Slow, processing-intensive"],
        ["Key sharing", "Key must be sent securely: the big weakness", "Public key can be shared openly; private key never sent"],
        ["Typical use", "Wi-Fi encryption, bulk data, disk encryption (AES)", "Exchanging session keys, digital signatures, HTTPS handshake"]
      ] },
      { a: "Digital certificate", b: "Digital signature", rows: [
        ["Purpose", "Proves a website/organisation's identity and links it to its public key", "Proves who sent a message and that it wasn't altered"],
        ["Created with", "Issued and signed by a Certificate Authority", "Sender's private key"],
        ["Checked with", "Browser's trusted CA list", "Sender's public key"]
      ] },
      { a: "Firewall", b: "Anti-malware", rows: [
        ["Protects against", "Unauthorised network access and traffic", "Malicious software on the device"],
        ["How", "Filters packets by rules (IP, port, app)", "Scans files and behaviour against signatures/heuristics"],
        ["Where", "Network edge (router/hardware) or on each PC", "On each device"]
      ] }
    ],
    pitfalls: [
      "Saying the public key decrypts in public-key encryption of messages: the public key encrypts, the private key decrypts (for signatures it's the reverse).",
      "Defining encryption as 'hiding data' or 'locking data' without mentioning the key and unreadable ciphertext.",
      "Writing 'a firewall stops viruses': it filters network traffic; anti-malware deals with viruses.",
      "Saying HTTPS makes a site trustworthy or safe from scams: it only proves the connection is encrypted to that domain.",
      "Repeating 'use a strong password' four times when asked for four different security measures. Give distinct measures (WPA3, firewall, separate guest network, MFA, updates, user rights)."
    ],
    years: [2016, 2020, 2021, 2022, 2023, 2024, 2025],
    priority: 3
  },

  {
    id: "net-distributed",
    section: "C: Communication Technologies",
    title: "Distributed processing, cloud, grid, blockchain & edge",
    summary: "Spreading processing across many computers: centralised vs distributed processing in a LAN, client types, cloud computing as an extension of the LAN, grid and volunteer computing, edge computing, and blockchain as a distributed ledger behind cryptocurrencies.",
    points: [
      "Centralised processing — one powerful central computer/server does all the processing and terminals just display it. Easy to manage and secure, but it's a single point of failure and can become a bottleneck.",
      "Distributed processing — the processing work is shared between several networked computers (each with its own CPU and RAM) that cooperate on a task. Benefits: faster (parallel work), more reliable (no single point of failure), scalable. Drawbacks: more complex to coordinate and secure, depends on the network.",
      "Client types in distributed systems — thin client (server does nearly all processing), fat client (client does most processing), smart client (local processing + server data sync). See sys-virtualisation for the full comparison (2025 asked for all three).",
      "Grid / volunteer computing — many separate computers (often idle home PCs or university machines) connected over the Internet to work on pieces of one huge problem, e.g. medical research, climate modelling, searching for signals (2016 asked about distributed computing for national problems).",
      "Cloud computing as an extension of a LAN — instead of buying more servers, a business rents processing, storage and software from a provider. Benefits: scalability (add capacity for busy periods or new branches), reduced hardware and maintenance, mobility (access anywhere), secure off-site storage, sharing and collaboration. Risks: Internet dependence, recurring costs, privacy and data location (2025).",
      "Cloud licensing — subscription per user/month instead of buying licences outright. Ownership of data: you own your content, but the provider's terms may allow them to process it; check where the data is stored (data sovereignty, POPIA).",
      "Cloud backup — automatic off-site copies. Pros: protects against fire/theft/hardware failure on site, automatic, accessible anywhere, scalable. Cons: needs Internet and upload bandwidth, slow to restore large amounts, ongoing cost, privacy (2024).",
      "Edge computing — processing data close to where it's generated (on the device, a local gateway or a nearby mini data centre) instead of sending everything to a distant cloud. Reduces latency and bandwidth use; vital for self-driving cars, factory sensors and 5G applications.",
      "Blockchain — a decentralised, distributed digital ledger: transactions are grouped into blocks, each containing a cryptographic hash of the previous block, forming a chain. Every node keeps a copy, and new blocks are added only when the network reaches consensus (2024, May 2025 definition).",
      "Why blockchain is secure and permanent — distributed (no single point of failure or single controller), consensus (all parties must agree to changes), cryptographically linked (changing one block breaks every later hash and is rejected), add-only/immutable (records can't be edited, only appended), transparent (everyone can verify) (May 2023, 2025).",
      "Blockchain uses — cryptocurrencies (Bitcoin, Ethereum), supply-chain tracking (proving where goods came from), smart contracts (code that executes automatically when conditions are met), secure medical or land records, digital identity. For a store: a permanent, tamper-proof record of orders, payments and deliveries shared with suppliers (2025).",
      "Cryptocurrency — a digital currency secured by cryptography and recorded on a blockchain: decentralised (no central bank), pseudonymous, global, irreversible transfers, volatile in value. Popular with cybercriminals because it is hard to trace and can't be reversed (May 2025)."
    ],
    compare: [
      { a: "Centralised processing", b: "Distributed processing", rows: [
        ["Where processing happens", "One central computer", "Shared across many computers"],
        ["Failure", "Single point of failure", "Others continue if one fails"],
        ["Management & security", "Simpler, central control", "More complex"],
        ["Scalability", "Limited by the central machine", "Add more nodes"]
      ] },
      { a: "Cloud computing", b: "Edge computing", rows: [
        ["Where processing happens", "Large remote data centres", "Near the data source (device/local gateway)"],
        ["Latency", "Higher (data travels far)", "Very low"],
        ["Bandwidth use", "All data sent to the cloud", "Only results/summaries sent"],
        ["Example", "Company database on Azure", "Smart camera detecting faces on the device"]
      ] },
      { a: "Blockchain ledger", b: "Traditional central database", rows: [
        ["Control", "Decentralised: no single owner", "One organisation controls it"],
        ["Copies", "Every node holds a copy", "One master copy (plus backups)"],
        ["Changing records", "Append-only; past blocks can't be changed", "Admin can edit or delete"],
        ["Trust", "Through consensus and cryptography", "Through trusting the owner"],
        ["Speed", "Slower, energy-intensive", "Fast"]
      ] }
    ],
    pitfalls: [
      "Saying blockchain is 'owned by individuals' or 'encrypted so nobody can see it'. Public blockchains are transparent; security comes from hashing, distribution and consensus.",
      "Explaining blockchain without the key words: distributed/decentralised, ledger, blocks linked by hashes, consensus, immutable.",
      "Cloud answers that ignore the given heading (e.g. 2025 asked for an example of scalability, mobility, secure storage, sharing): give a scenario-based example for EACH.",
      "Treating cryptocurrency as completely anonymous: it is pseudonymous, and transactions are public on the ledger."
    ],
    years: [2016, 2020, 2021, 2023, 2024, 2025],
    priority: 3
  },

  {
    id: "net-data-protection",
    section: "C: Communication Technologies",
    title: "Data integrity & protection: RAID, backups, UPS, audit trails",
    summary: "Threats to stored data (hardware failure, power failure/surges, malware) and the solutions the SAGS lists: RAID 1 and 5 (mirroring, striping, parity), local vs remote backups (full, incremental, differential), UPS and redundant power supplies, and audit trails.",
    points: [
      "Threats to data — hardware failure (a hard drive dying), power failure or surges, malware/ransomware, theft or fire, human error (accidental deletion), natural disasters.",
      "RAID — Redundant Array of Independent Disks: several drives work together as one unit, controlled by a RAID controller (hardware card or software), to improve reliability and/or speed. If one drive fails, the data survives and the failed drive can be replaced and rebuilt (2016, 2020, 2024, May 2024).",
      "RAID 1 (mirroring) — every piece of data is written identically to two drives. If one fails, the other has a full copy. Simple and reliable, but you only get half the total capacity (May 2025 definition: storage that mirrors data across disks).",
      "RAID 0 (striping) — data split across drives for speed, with NO redundancy: one drive failing loses everything (not a protection method).",
      "RAID 5 (striping with parity) — data and parity information are striped across at least 3 drives. If any ONE drive fails, its contents are rebuilt from the data plus parity on the others. Good balance of capacity, speed and protection, but if two drives fail at once the array is lost, so you need a backup (May 2024).",
      "RAID is not a backup — it protects against a drive failing, but deleted files, corruption, ransomware, theft or fire affect all mirrored/striped drives at once. You still need separate backups (2020).",
      "Backups — separate copies of data so it can be restored after loss. Reasons: hardware failure, ransomware, accidental deletion, theft, legal requirements (May 2024).",
      "Backup types — full: copies everything (simple restore, but slow and uses the most space). Incremental: only files changed since the last backup of any type (fast and small, but restoring needs the last full backup plus every incremental). Differential: everything changed since the last full backup (middle ground).",
      "Good backup practice — 3-2-1 rule: at least 3 copies, on 2 different types of media, with 1 off-site (cloud or another building). Back up regularly and automatically (the more often data changes, the more often you back up; a school admin database daily), encrypt backups, test restores, and keep an offline/immutable copy against ransomware.",
      "Why a permanently connected external drive is bad practice — it's in the same place as the server (fire/theft/flood destroy both), ransomware can encrypt it too, it can fail as well, and it relies on someone remembering (May 2024).",
      "Local vs remote (off-site/cloud) backup — local: fast backup and restore, no Internet needed, but vulnerable to the same disasters. Remote: survives local disasters and is accessible anywhere, but depends on bandwidth and is slower to restore large amounts.",
      "UPS — Uninterruptible Power Supply: a battery unit between the mains and the equipment that instantly supplies power during an outage or dip, giving time to save work and shut down safely (or bridge a generator start-up) and protecting against surges. Not meant for running for hours (2021).",
      "Redundant power supply — a server with two (or more) PSUs. If one PSU fails, the other keeps the server running with no downtime; it doesn't help in a power cut, which is why a UPS is also needed for 24/7 availability (2021).",
      "Audit trail — a time- and date-stamped log of who accessed or changed what data and when. Helps detect fraud and unauthorised changes, provides accountability, and supports investigations and POPIA compliance (May 2024 MCQ).",
      "Data transmission integrity — parity bits, checksums and CRC detect corruption in transit (see net-protocols); DBMS transactions and rollback protect database integrity (see db-management)."
    ],
    compare: [
      { a: "RAID 1 (mirroring)", b: "RAID 5 (striping with parity)", rows: [
        ["How", "Identical copy on two drives", "Data + parity striped across 3+ drives"],
        ["Minimum drives", "2", "3"],
        ["Usable capacity", "50% of total", "Total minus one drive"],
        ["Survives", "One drive failure", "One drive failure (rebuilt from parity)"],
        ["Speed", "Normal writes, faster reads", "Fast reads, writes slower (parity calculation)"]
      ] },
      { a: "Full backup", b: "Incremental backup", rows: [
        ["Copies", "All selected data every time", "Only data changed since the last backup"],
        ["Time & space", "Slow, large", "Quick, small"],
        ["Restore", "One backup set: simple and quick", "Last full + every incremental since: slower"],
        ["Typical schedule", "Weekly", "Daily or hourly"]
      ] },
      { a: "UPS", b: "Redundant power supply", rows: [
        ["Protects against", "Mains power failure, dips and surges", "Failure of the PSU inside the server"],
        ["How", "Battery takes over instantly", "Second PSU takes over instantly"],
        ["Duration", "Minutes (time to shut down or start a generator)", "Indefinitely, while mains is on"]
      ] },
      { a: "RAID", b: "Backup", rows: [
        ["Protects against", "A drive failing", "Deletion, corruption, ransomware, theft, disaster"],
        ["Location", "Same machine", "Separate media, ideally off-site"],
        ["Point-in-time copies", "No: changes are copied immediately", "Yes: can restore older versions"]
      ] }
    ],
    pitfalls: [
      "Calling RAID a backup (2020 asked why it isn't).",
      "Swapping RAID 1 and RAID 5: 1 = mirroring, 5 = striping with parity.",
      "Saying a UPS 'runs the computer during load-shedding' for hours: it gives short-term power to shut down safely or bridge to a generator.",
      "Saying incremental backups 'back up everything that changed since the full backup': that's differential.",
      "Backup frequency without a reason linked to how often the data changes."
    ],
    years: [2016, 2020, 2021, 2024, 2025],
    priority: 3
  },

  {
    id: "net-deep-dark-web",
    section: "C: Communication Technologies",
    title: "Surface, deep & dark web, Tor and anonymous browsing",
    summary: "The layers of the web (surface, deep, dark), how Tor and VPNs provide anonymity, the legitimate uses and dangers of the dark web, and why cryptocurrencies are linked to it. Examined every year from 2023 to 2025.",
    points: [
      "Surface web — the part of the web indexed by normal search engines and reachable with any browser (news sites, Wikipedia, public social media pages): a small fraction of all web content.",
      "Deep web — all web content NOT indexed by search engines, usually because it sits behind log-ins, paywalls or forms: online banking, email inboxes, school portals, medical records, private cloud files, company intranets. Most of it is legal and harmless and it is by far the largest part of the web (2024, 2025 matching).",
      "Dark web — a small part of the deep web that is intentionally hidden and only reachable with special software such as Tor, using .onion addresses. Hosts are anonymous and IP addresses are masked (2024 matching wording).",
      "Tor (The Onion Router) — free, open-source software that sends traffic through at least three volunteer relays, adding a layer of encryption for each (like onion layers). Each relay knows only the previous and next hop, so the website sees only the exit node's IP, not yours. Slower than normal browsing. Doesn't log activity (2023 definition, May 2024).",
      "VPN for privacy — encrypts all traffic to the VPN server, hiding your activity from the local network and ISP, and hides your real IP/location from websites (they see the VPN server's IP). You must trust the VPN provider. Can make sites think you're in another country, which can change prices/currency shown (May 2023).",
      "Bypassing restrictions — students can still reach a site banned on a campus network by using mobile data or a VPN/Tor (2023 TikTok question).",
      "Legitimate uses of the dark web/Tor — protecting journalists, whistle-blowers and activists; letting people in countries with censorship reach blocked news and social media; privacy from tracking.",
      "Dangers — illegal marketplaces (drugs, weapons, stolen data, counterfeit documents, malware-for-hire), scams with no comeback, malware infection, exposure to disturbing content, possible law-enforcement attention. Browsing it isn't automatically illegal, but much of what is traded there is (May 2024).",
      "Cryptocurrency and the dark web — dark-web markets and ransomware gangs demand crypto because it is decentralised, hard to trace to a real identity, global and irreversible.",
      "Digital currency — any money that exists only in electronic form; cryptocurrencies are one type, not issued by a central bank and not tied to any normal currency, but usable to buy goods and services (May 2024 MCQ)."
    ],
    compare: [
      { a: "Deep web", b: "Dark web", rows: [
        ["Indexed by search engines?", "No", "No: intentionally hidden"],
        ["Access", "Normal browser + log-in/password", "Special software (Tor), .onion addresses"],
        ["Size", "The vast majority of the web", "A tiny part of the deep web"],
        ["Content", "Mostly legal: banking, email, portals", "Anonymous sites: some legitimate, many illegal markets"],
        ["Example", "Your school marks portal", "Whistle-blower drop sites; illegal marketplaces"]
      ] },
      { a: "Tor", b: "VPN", rows: [
        ["Route", "Through 3+ random volunteer relays", "Through one VPN provider's server"],
        ["Encryption", "Layered (onion) encryption", "One encrypted tunnel"],
        ["Who sees your IP", "Only the entry relay; site sees the exit node", "The VPN provider"],
        ["Speed", "Slow", "Fairly fast"],
        ["Cost", "Free, open source", "Usually a paid subscription"]
      ] }
    ],
    pitfalls: [
      "Using 'deep web' and 'dark web' as the same thing: the dark web is a small, deliberately hidden part of the deep web.",
      "Saying the dark web is illegal to browse: browsing isn't automatically illegal, but it is risky.",
      "Saying Tor creates a direct connection to the site: it deliberately bounces traffic through relays.",
      "Claiming a VPN makes you completely anonymous: the VPN provider can still see your traffic."
    ],
    years: [2023, 2024, 2025],
    priority: 3
  },

  /* =====================================================================
   * SECTION D: SOCIAL IMPLICATIONS
   * ===================================================================== */
  {
    id: "soc-crime-malware",
    section: "D: Social Implications",
    title: "Computer crime & malware (ransomware, DDoS, botnets, identity theft)",
    summary: "Who commits computer crime, the main malware types and attacks (virus, worm, trojan, spyware, adware, ransomware, rootkit, keylogger, botnets, DoS/DDoS, backdoors, SQL injection), the types of theft, and practical, scenario-linked prevention.",
    points: [
      "Hackers, crackers and virus authors — a hacker gains unauthorised access to systems (ethical 'white-hat' hackers test security with permission); a cracker breaks into systems or software protection for malicious or criminal gain; virus authors write malware.",
      "Malware — any software designed to harm, disrupt, spy on or gain unauthorised access to a system.",
      "Virus — malicious code that attaches itself to a host file/program and spreads when that file is run or shared; it can corrupt or delete data. Worm — standalone malware that copies itself across networks automatically, without user action, eating bandwidth. Trojan horse — malware disguised as useful/legitimate software that, once installed, opens a backdoor, steals data or installs other malware; it does not replicate itself (2016).",
      "Spyware — secretly monitors activity and sends information (browsing, passwords) to a third party. Keylogger — records every keystroke to capture passwords and card numbers. Adware — shows unwanted adverts, often tracks you. Rootkit — hides deep in the OS to give an attacker hidden admin control.",
      "Ransomware — malware that encrypts the victim's files (or locks the system), and often also steals them, then demands a ransom, usually in cryptocurrency, for the decryption key and to not leak the data. Paying doesn't guarantee recovery. Costs beyond the ransom: downtime and lost sales, IT recovery and new hardware, investigators, legal fees and POPIA fines, reputational damage, notifying customers (May 2025).",
      "Preventing ransomware — regular offline/off-site/immutable backups (and test restores), keep OS and software patched, anti-malware, staff training against phishing attachments and links, MFA, least-privilege user rights, firewall and email filtering, disable macros and unused remote-access ports.",
      "Botnet / zombie army — a network of malware-infected, Internet-connected devices (PCs, routers, IoT cameras) secretly controlled by a criminal (the bot herder) to send spam, mine crypto or launch DDoS attacks (2020, 2022 definitions).",
      "DoS / DDoS — Denial of Service: flooding a website or network with so much traffic or so many requests that it slows down or crashes for legitimate users. Distributed DoS uses thousands of devices (a botnet) at once, so it's hard to block. Defences: DDoS protection services/CDNs, firewalls and rate limiting, extra bandwidth (May 2025 definition).",
      "Backdoor — a hidden way into a system that bypasses normal authentication, left by developers or installed by malware (2020 definition).",
      "Spoofing — faking an identity: a forged sender email address, caller ID, IP address, MAC address or website so a person or program trusts it (2024 table).",
      "Identity theft — stealing personal information (ID number, banking details, passwords) to pretend to be someone, e.g. to open accounts, take loans or commit fraud in their name.",
      "Other computer crimes — theft of hardware (laptops, phones), theft of software (piracy), theft of information/data breaches, bandwidth theft (using someone's Wi-Fi/data without permission), theft of time and services (using work computers for personal business), cyber-extortion and online fraud. In South Africa the Cybercrimes Act (2020) makes unlawful access, interception, cyber fraud, extortion and malicious data messages criminal offences.",
      "Open ports and Wi-Fi vulnerabilities — unnecessary open ports and weak Wi-Fi security let attackers in; close/filter ports with a firewall and use WPA2/WPA3.",
      "General safeguards — anti-malware, firewalls, updates/patches, strong unique passwords and MFA, encryption, backups, user rights, audit trails, staff awareness, physical security (locks, cable locks), not plugging in unknown USB drives (2024 scenario with customers' flash disks)."
    ],
    compare: [
      { a: "Virus", b: "Worm", rows: [
        ["Needs a host file?", "Yes: attaches to a program/document", "No: standalone"],
        ["Spreads by", "User running/sharing the infected file", "Copies itself over networks automatically"],
        ["Main damage", "Corrupts/deletes files", "Eats bandwidth, spreads fast, may carry payloads"]
      ] },
      { a: "Trojan horse", b: "Virus", rows: [
        ["Disguise", "Pretends to be useful software", "Hidden inside a real file"],
        ["Replicates?", "No", "Yes"],
        ["Typical purpose", "Opens a backdoor, steals data, installs more malware", "Infect and damage files"]
      ] },
      { a: "DoS", b: "DDoS", rows: [
        ["Source", "One machine", "Many machines (botnet)"],
        ["Blocking", "Easier: block one IP", "Hard: traffic from thousands of IPs"],
        ["Scale", "Smaller", "Massive"]
      ] },
      { a: "Spyware", b: "Ransomware", rows: [
        ["Goal", "Secretly steal information", "Extort money"],
        ["Visibility", "Hides from the user", "Announces itself with a ransom note"],
        ["Effect", "Data and passwords leaked", "Files encrypted/locked, business stops"]
      ] }
    ],
    pitfalls: [
      "Using 'virus' as a generic word for all malware. Name the specific type and its behaviour.",
      "Saying a trojan replicates itself.",
      "Ransomware defined with only one fact when 2 are needed: encrypts/locks files AND demands payment (often crypto) for the key.",
      "Prevention tips that are vague ('be careful online'). Give specific actions: offline backups, patching, MFA, staff phishing training.",
      "Mixing up DoS (one source) and DDoS (many sources/botnet)."
    ],
    years: [2016, 2020, 2022, 2023, 2024, 2025],
    priority: 3
  },

  {
    id: "soc-social-engineering",
    section: "D: Social Implications",
    title: "Social engineering: phishing, pharming, spoofing & scams",
    summary: "Manipulating people, rather than hacking machines, into giving away confidential information or access: phishing and its variants, pharming, spoofing, shoulder surfing, dumpster diving, pretexting, baiting, reverse social engineering, fake news and online scams, and how to prevent them.",
    points: [
      "Social engineering — using deception and psychological manipulation (trust, fear, urgency, curiosity, greed) to trick people into revealing confidential information, handing over money or giving access (2016, 2020).",
      "Phishing — fake emails/messages pretending to come from a trusted organisation (bank, SARS, courier) that trick victims into clicking a link, opening an attachment or entering passwords or card details on a fake site. Smishing = via SMS; vishing = via voice calls; spear phishing = targeted at a specific person using personal details; whaling = targeting executives (2020, 2024, May 2024).",
      "Signs of phishing — urgent or threatening tone, generic greeting, spelling/grammar errors, sender address or link URL that doesn't match the real domain, requests for passwords/OTPs, unexpected attachments, too-good-to-be-true offers.",
      "Pharming — malicious code or a poisoned DNS/hosts file redirects users to a fake website even when they type the correct URL, then harvests their details. More dangerous than phishing because no clicking is needed. Defences: check HTTPS and the certificate, keep anti-malware and router firmware updated, use trusted DNS (2020, 2024).",
      "Spoofing — forging an identity so a message or connection looks trustworthy: email spoofing (fake 'From'), caller-ID spoofing, website spoofing, IP/MAC spoofing.",
      "Shoulder surfing — watching someone enter a PIN or password, directly or with a camera. Prevent: privacy screen filters, shield the keypad, position screens away from public view, biometrics (May 2024).",
      "Dumpster diving — searching through rubbish for printed documents, old devices or sticky notes containing personal or company data. Prevent: shred documents, securely wipe or destroy old drives, clear-desk and disposal policies (May 2024).",
      "Pretexting and impersonation — inventing a scenario ('I'm from IT, I need your password to fix your account') to gain trust. Baiting — leaving infected USB drives or offering free downloads to lure victims. Tailgating — following an authorised person through a secure door.",
      "Reverse social engineering — the attacker creates a problem (e.g. sabotages a system), advertises themselves as the helper, and the victim comes to them and willingly hands over access.",
      "Social media for social engineering — attackers harvest personal details people post (birthdays, pets, schools, holidays) to guess passwords or answer security questions, and use fake profiles and messages.",
      "Scams and fake adverts — fake online shops and adverts with very low prices, wrong company names, spelling errors or no contact details; fake news designed to spread misinformation or lure clicks (May 2023).",
      "Prevention (people) — security awareness training and simulated phishing tests, a 'never share your password or OTP' policy, verify requests by phoning the person on a known number, report suspicious messages.",
      "Prevention (technical) — spam/phishing filters, MFA (a stolen password alone isn't enough), anti-malware, browser warnings for known bad sites, DMARC/SPF email authentication, least-privilege access."
    ],
    compare: [
      { a: "Phishing", b: "Pharming", rows: [
        ["How victims arrive", "Click a link in a fake email/SMS", "Redirected automatically, even typing the correct URL"],
        ["Mechanism", "Deceptive messages", "Malware or poisoned DNS changes where the address leads"],
        ["User action needed", "Yes: must fall for the message", "Little or none"],
        ["Defence", "Training, spam filters, check links", "Check certificate/HTTPS, anti-malware, secure DNS"]
      ] },
      { a: "Shoulder surfing", b: "Dumpster diving", rows: [
        ["Method", "Watching someone type or view sensitive information", "Searching discarded paper and devices"],
        ["Targets", "PINs, passwords on screen", "Printouts, invoices, old hard drives"],
        ["Prevention", "Privacy filters, shield keypads, biometrics", "Shredding, secure disposal/wiping"]
      ] },
      { a: "Phishing (general)", b: "Spear phishing", rows: [
        ["Target", "Mass emails to many people", "One specific person/organisation"],
        ["Content", "Generic", "Personalised using researched details"],
        ["Success rate", "Low per message", "Much higher"]
      ] }
    ],
    pitfalls: [
      "Confusing phishing (fake messages) with pharming (redirection to a fake site).",
      "'How it is used' and 'prevention' answers that repeat each other. Describe the attack, then a different, practical prevention for that scenario (staff at a school, salon customers).",
      "Saying social engineering is 'hacking a computer': it targets people.",
      "Prevention like 'don't use the Internet'. Answers must be realistic."
    ],
    years: [2016, 2020, 2023, 2024],
    priority: 3
  },

  {
    id: "soc-ethics-law",
    section: "D: Social Implications",
    title: "Ethics & the law: POPIA, copyright, AUP, netiquette",
    summary: "South African law and ethical rules for using ICT: POPIA (the eight conditions, consent, security safeguards, breach reporting), ECT Act, Cybercrimes Act, Protection from Harassment Act, Sexual Offences Act, copyright and plagiarism, licensing, acceptable use policies and netiquette.",
    points: [
      "POPIA — Protection of Personal Information Act 4 of 2013 (fully in force since 1 July 2021): South Africa's data-protection law regulating how organisations (responsible parties) collect, use, store, share and delete the personal information of people (data subjects). Enforced by the Information Regulator (2022, 2024).",
      "Eight conditions for lawful processing — accountability; processing limitation (lawful, minimal, with consent or another legal reason); purpose specification (collect for a specific, explicit purpose); further-processing limitation; information quality (accurate, up to date); openness (tell people you're collecting it); security safeguards; data-subject participation (people may access, correct or ask for deletion of their data).",
      "How POPIA protects citizens — data may only be collected with consent and for a stated purpose; only the necessary data may be kept, and only for as long as needed; it must be kept secure; people can see, correct and request deletion of their data; direct marketing needs opt-in consent; breaches must be reported; offenders can face fines up to R10 million and/or imprisonment (2024).",
      "Telling customers you are collecting data — privacy notice/policy on the website or app, consent checkbox (opt-in) on forms, notice at point of collection, terms and conditions, cookie banner (2022).",
      "Data breach under POPIA (section 22) — notify the Information Regulator and the affected data subjects as soon as reasonably possible after discovering the compromise. Since April 2025 this must be reported via the Regulator's online eServices portal. Also: contain the breach (change passwords, isolate systems), investigate, and tell people what steps to take (2022).",
      "Security measures that comply with POPIA — encryption of stored and transmitted data, access control and user rights, strong passwords/MFA, firewalls and anti-malware, audit trails, backups, staff confidentiality agreements, securely deleting data no longer needed (2022).",
      "ECT Act (Electronic Communications and Transactions Act, 2002) — gives electronic contracts and signatures legal recognition, requires online sellers to show their details and offer a cooling-off period, and regulates unsolicited commercial email (spam).",
      "Cybercrimes Act (19 of 2020) — criminalises unlawful access/hacking, interception of data, malware, cyber fraud, forgery and extortion, and malicious communications (messages inciting violence, threats, and sharing intimate images without consent).",
      "Protection from Harassment Act (2011) — lets victims of harassment, including online/cyberbullying, get a protection order, even against an unknown sender (courts can order service providers to identify them). Sexual Offences Act — criminalises child pornography and exposing children to sexual content.",
      "Copyright — the creator's legal right to control copying, distribution and adaptation of their original work (text, music, images, software); automatic, no registration needed. Breaking it = piracy/infringement. Fair use/fair dealing allows limited use for study, criticism or news with acknowledgement.",
      "Plagiarism — presenting someone else's work or ideas as your own without credit. Avoid it by referencing sources and using quotation marks. Copyleft/Creative Commons and open-source licences allow sharing under conditions.",
      "AUP (Acceptable Use Policy) — a set of rules created by an organisation or network provider stating permitted and prohibited use of its ICT (no illegal downloads, no offensive content, no sharing passwords, monitoring of use, consequences); users agree before getting access (May 2023, May 2025 definition).",
      "Netiquette — the code of good behaviour online: be respectful, no flaming (abusive messages), don't type in ALL CAPS (shouting), don't spam or forward hoaxes, respect privacy, check facts before sharing, keep attachments small (2016).",
      "Software licensing and ethics — use only licensed software, respect EULAs; installing pirated software is illegal and a malware risk.",
      "Ownership of data in the cloud — you usually own your content, but the provider's terms may let them process it; check where it's stored and their privacy policy."
    ],
    compare: [
      { a: "Copyright infringement", b: "Plagiarism", rows: [
        ["What", "Copying/distributing protected work without permission", "Passing off someone's work as your own"],
        ["Credit given?", "Can happen even if you credit the author", "No credit given"],
        ["Consequence", "Legal (civil/criminal)", "Academic/professional penalties; can also be legal"]
      ] },
      { a: "AUP", b: "EULA", rows: [
        ["Written by", "An organisation/network owner (school, employer, ISP)", "A software publisher"],
        ["Covers", "How users may use the organisation's ICT", "How you may use that software"],
        ["Example", "School network rules", "Windows licence terms"]
      ] },
      { a: "POPIA", b: "ECT Act", rows: [
        ["Main focus", "Protecting personal information", "Validity of electronic transactions; consumer protection online"],
        ["Example duty", "Get consent, secure data, report breaches", "Show company details, cooling-off period, opt-out of spam"]
      ] }
    ],
    pitfalls: [
      "Writing 'POPI Act' without the full name when the full name is asked (2022 Q6.1: Protection of Personal Information Act).",
      "Saying POPIA 'stops companies collecting data': it allows collection with consent for a lawful purpose and sets rules for it.",
      "Breach actions that leave out notifying the Information Regulator AND the affected customers.",
      "Answering 'AUP' when the question is about a software licence (EULA), or vice versa (May 2023 didn't accept EULA or T&Cs for AUP).",
      "Giving the same security measure as the example in the question: the memo disallows repeats."
    ],
    years: [2016, 2022, 2023, 2024, 2025],
    priority: 3
  },

  {
    id: "soc-privacy-data",
    section: "D: Social Implications",
    title: "Privacy, tracking, big data & data mining",
    summary: "How personal data is collected and used: digital footprints, tracking (cookies, location, apps), targeted advertising, big data and data mining, the right to privacy vs the right to access, risks of sharing data online, and ways to reduce what is collected.",
    points: [
      "Personal information — any data that identifies a person: name, ID number, contact details, address, date of birth, banking details, location, photos, biometric and health data (2024 asked what sites ask for when you register).",
      "Digital footprint — the trail of data you leave online. Active: what you deliberately post or share. Passive: data collected without you noticing (IP address, location, browsing history, cookies, device info).",
      "Tracking — websites and apps follow behaviour through cookies (especially third-party cookies), tracking pixels, device fingerprinting, location services, log-in tracking across sites, and app permissions (contacts, microphone, camera). Non-registered users are still tracked through device IDs, IP addresses, cookies and viewing behaviour (2023 TikTok).",
      "Big data — extremely large, fast-growing and varied data sets (volume, velocity, variety) too big for traditional tools, analysed to find trends and support decisions. Sources: social media posts and likes, online transactions and loyalty cards, IoT/sensor data, location/GPS data, web logs and audit trails, search queries, streaming habits (2025).",
      "Location-based services and big data — every LBS request (navigation, ride-hailing, check-ins, geotagged photos) adds time-stamped location data, which builds huge data sets on movement patterns, traffic and shopping habits (2025).",
      "Data mining — using software (statistics, AI/machine learning) to search large data sets for hidden patterns, relationships and predictions: market-basket analysis, fraud detection, customer segmentation, recommendation engines.",
      "Targeted (personalised) advertising — platforms combine cookies, browsing/search history, likes, location and profile data, then use data mining/AI algorithms to build an interest profile and show adverts matched to it (e.g. hairstyle adverts after posting a salon photo) (2020, 2024).",
      "Dynamic pricing — prices change based on demand, time and even your browsing history/cookies or location (VPN location may show a different currency) (May 2023).",
      "Risks of sharing data online — identity theft and fraud, phishing that uses your details, cyberstalking, reputational damage (posts are permanent), data breaches exposing your information, profiling and manipulation (e.g. Cambridge Analytica political targeting), discrimination (2024).",
      "Right to privacy vs right to access information — individuals have a right to control their personal data; society and organisations may argue a right to information (security, research, public health). Laws such as POPIA balance the two.",
      "Surveillance — governments and companies monitoring communication, CCTV with face recognition, workplace monitoring; it can improve safety but threatens privacy and freedom of expression. State access to data held by foreign app owners was the concern in the 2023 TikTok question.",
      "Reducing data collected — review and deny unnecessary app permissions, turn off location services and ad personalisation, clear/block third-party cookies, use private browsing or a privacy-focused browser, read privacy policies, share less on social media, use separate emails, don't create accounts unless needed (2021).",
      "Securing customer data in an app — encrypt data in storage and transit (HTTPS), strong authentication and MFA, collect only necessary data, regular security updates and testing, access control, secure servers and backups (2023).",
      "Medical data misuse — health records leaked after death could affect relatives (genetic conditions affecting insurance), be used for fraud, or embarrass the family (2021)."
    ],
    compare: [
      { a: "Data warehouse", b: "Data mining", rows: [
        ["What", "Central store of historical data from many sources", "Process of analysing data to find hidden patterns"],
        ["Role", "Storage", "Extraction of knowledge"],
        ["Example", "5 years of sales from all branches", "Finding that ice creams sell more in summer"]
      ] },
      { a: "Active digital footprint", b: "Passive digital footprint", rows: [
        ["Created by", "Things you deliberately post/share", "Data collected without your direct action"],
        ["Examples", "Posts, comments, uploaded photos", "IP address, cookies, location history"],
        ["Control", "You can choose what to share", "Harder to control"]
      ] }
    ],
    pitfalls: [
      "'Big data is a lot of data': add that it is varied and fast-growing, analysed for trends/decisions, and name sources.",
      "Explaining personalised adverts as 'Facebook knows'. Name the technology (cookies/tracking + data mining/AI algorithms) and explain how it profiles interests.",
      "Risks listed without a description of each (2024 asked to name AND describe).",
      "Privacy-protection techniques that are the same idea twice (e.g. 'turn off location' and 'disable GPS')."
    ],
    years: [2020, 2021, 2022, 2023, 2024, 2025],
    priority: 3
  },

  {
    id: "soc-ai-emerging",
    section: "D: Social Implications",
    title: "AI, automation & emerging technologies (4IR, robotics, drones, AR/VR, deepfakes)",
    summary: "Artificial intelligence and machine learning, generative AI and deepfakes, automation and robotics, drones (UAVs), AR/VR and the Fourth Industrial Revolution, with their benefits, risks and impact on jobs, society and different communities. AI was asked directly in 2025 and is a likely target.",
    points: [
      "Artificial intelligence (AI) — computer systems that perform tasks normally needing human intelligence: recognising speech and images, understanding language, making predictions and decisions, learning from data.",
      "Machine learning — a branch of AI where systems learn patterns from large amounts of training data and improve with experience instead of being explicitly programmed for every case (spam filters, recommendation engines, fraud detection). Its quality depends on the data: biased data gives biased results.",
      "Generative AI — AI that creates new text, images, audio, video or code from prompts (chatbots built on large language models, image generators, AI coding assistants). Useful for drafting, summarising, translation and customer support, but it can 'hallucinate' (state false information confidently), reproduce bias and raise copyright and academic-honesty questions.",
      "Deepfakes — AI-generated or manipulated video, audio or images that convincingly show a real person saying or doing things they never did. Used for fraud (cloned voices of CEOs or family members), political disinformation, fake celebrity investment adverts and harassment. Defences: verify through another channel, look for visual/audio glitches, content-authenticity labels.",
      "AI in the workplace — advantages: works 24/7 without fatigue, faster and more consistent processing, automates repetitive tasks (stock forecasting, chatbots, sorting parcels), finds patterns humans miss, reduces human error and some costs. Disadvantages: job losses/retraining needed, high setup cost and expertise, bias and unfair decisions, lack of transparency ('black box'), privacy of the data used, errors when facing new situations, over-reliance and lost skills (2025 asked for two of each, not opposites).",
      "AI for global problems — detecting patterns in data to predict earthquakes, tsunamis and extreme weather, spot terrorist activity or social-media propaganda, diagnose diseases from scans, discover medicines, manage crops and water (SAGS 12.3.1; 2022 article examples).",
      "Automation and robotics — machines and software doing tasks with little human input: warehouse robots and dark stores, self-checkout tills, industrial robot arms, robotic process automation in offices. Replaces repetitive and dangerous work but creates demand for technical skills.",
      "Drones (UAVs, unmanned aerial vehicles) — remotely piloted or autonomous aircraft. Uses: crop monitoring and spraying, counting livestock, inspecting fences, dams and power lines, mapping, search and rescue, security patrols, deliveries, filming. Concerns: privacy, airspace safety, regulation (SACAA licensing in South Africa), misuse (May 2025).",
      "Errors in computer-controlled equipment — software bugs or sensor faults in self-driving cars, medical devices, aircraft systems or drones can injure or kill, so thorough testing, fail-safes and human oversight matter.",
      "AR and VR — Augmented Reality overlays digital information on the real world through a phone or smart glasses (furniture preview apps, Pokémon GO, maintenance instructions). Virtual Reality immerses the user in a fully computer-generated world with a headset (training simulations, gaming, virtual tours). Mixed reality blends both.",
      "Fourth Industrial Revolution (4IR) — the fusion of digital, physical and biological technologies: AI, IoT, robotics, 3D printing, big data, cloud, biotechnology. It is reshaping work, education and economies.",
      "Impact on different communities — think about gender, race, culture, religion, ethnicity, the environment and the economy: biased AI can discriminate; job automation hits low-skilled workers hardest; unequal access widens the digital divide; data centres use much energy and water.",
      "Responsible AI — transparency, fairness/bias testing, human oversight, privacy protection, accountability. Laws are emerging (e.g. the EU AI Act; South Africa is developing a national AI policy framework)."
    ],
    compare: [
      { a: "AR (Augmented Reality)", b: "VR (Virtual Reality)", rows: [
        ["Environment", "Real world with digital overlay", "Fully computer-generated world"],
        ["Hardware", "Phone/tablet camera or smart glasses", "Headset that blocks the real world"],
        ["Example", "Seeing a virtual sofa in your lounge", "Flight-simulator training"]
      ] },
      { a: "Traditional programming", b: "Machine learning", rows: [
        ["How it works", "Programmer writes explicit rules", "System learns patterns from data"],
        ["Handles new cases", "Only those foreseen by the rules", "Can generalise, but may be wrong"],
        ["Example", "If total > R250 then free delivery", "Predicting which items will sell out"]
      ] },
      { a: "AI advantage", b: "AI disadvantage", rows: [
        ["Speed & availability", "Processes data 24/7 at high speed", "Expensive to develop, train and maintain"],
        ["Accuracy", "Consistent; fewer repetitive-task errors", "Can be biased or hallucinate; hard to explain decisions"],
        ["People", "Frees staff for higher-value work", "Job losses and need for reskilling"]
      ] }
    ],
    pitfalls: [
      "Advantages and disadvantages that are opposites of each other (explicitly disallowed in 2025).",
      "Saying AI 'thinks like a human' or 'is always right'.",
      "Drone tasks that only repeat 'saving time/labour' when the question excludes that (May 2025). Name specific tasks: crop health monitoring, security, counting livestock.",
      "Generic AI answers. Apply them to the scenario: AI predicting stock demand in a dark store, chatbots for customer queries."
    ],
    years: [2020, 2022, 2025],
    priority: 3
  },

  {
    id: "soc-health-environment",
    section: "D: Social Implications",
    title: "Health, environment & the digital divide (ergonomics, RSI, e-waste, green computing)",
    summary: "Physical and mental health effects of computer use, ergonomic design, the digital divide and its causes, and green computing: energy use, e-waste and responsible disposal. Green computing came up in 2025.",
    points: [
      "Ergonomics — designing equipment, furniture and workspaces to fit the user's body and the task, to improve comfort and productivity and prevent injury (adjustable chairs, screen at eye level, keyboard at elbow height, good lighting) (prelim definition).",
      "RSI (Repetitive Strain Injury) — pain and damage to muscles, tendons and nerves from repeating the same movements (typing, mouse use, swiping). Carpal tunnel syndrome — pressure on the wrist's median nerve causing numbness and tingling. Prevent with ergonomic keyboards/mice, wrist rests, correct posture and regular breaks (2016).",
      "Eye strain (computer vision syndrome) — tired, dry eyes and headaches from long screen use. Prevent with the 20-20-20 rule (every 20 minutes look 20 feet away for 20 seconds), correct brightness, anti-glare screens and good lighting.",
      "Other health issues — back and neck pain from poor posture, sedentary lifestyle, sleep disruption from blue light and late use, stress from always being online, technology/gaming/social-media addiction, FOMO, anxiety and depression linked to cyberbullying and comparison culture. Content moderators can suffer PTSD from viewing disturbing material (2020).",
      "Ergonomic design factors for mobile/work devices — weight, size and grip, screen size and brightness for warehouse lighting, durability (rugged cases), battery life for a full shift, hands-free options (2025 design factors for staff tablets).",
      "Digital divide — the gap between people who have access to ICT and the Internet (and the skills to use them) and those who don't. Causes: cost of devices and data, lack of infrastructure in rural areas, low digital literacy, language, age, disability, load-shedding. Effects: unequal education, job and service opportunities. Solutions: free public Wi-Fi and community centres, zero-rated educational sites, cheaper data, school device programmes, training.",
      "Green computing — using ICT in an environmentally responsible way across its whole life: design, manufacture, use and disposal (2025).",
      "Negative environmental impacts — high electricity use (much from coal in SA) → CO2 emissions; data centres' energy and water use for cooling (growing fast with AI); e-waste containing toxic lead, mercury and cadmium that leaches into soil and water; mining of rare metals; paper waste from printing; short device lifespans and planned obsolescence.",
      "Green solutions — green use: power-saving/sleep modes, switch off when not in use, energy-efficient (Energy Star) devices, laptops instead of desktops, virtualisation/cloud to cut the number of servers, renewable energy (solar), print less and double-sided. Green disposal: recycle e-waste at certified recyclers, return toner cartridges, donate or refurbish old devices (repurposing), buy modular/repairable devices.",
      "E-waste — discarded electronic devices. Responsible disposal: certified e-waste recyclers, manufacturer take-back schemes, securely wipe data first, never dump in landfill.",
      "Remote work (decentralisation of the workplace) — pros: no commute or travel cost, flexible hours, smaller offices for the company, less traffic and emissions. Cons: isolation and little direct contact with colleagues, home distractions, using your own Internet/electricity, harder to manage and secure data (May 2023)."
    ],
    compare: [
      { a: "Green use", b: "Green disposal", rows: [
        ["Stage", "While the device is in use", "At the end of the device's life"],
        ["Actions", "Power-saving modes, switch off, efficient hardware, virtualisation", "Recycle, refurbish/donate, return cartridges"],
        ["Reduces", "Electricity use and emissions", "Toxic e-waste and landfill"]
      ] }
    ],
    pitfalls: [
      "Environmental impacts without a matching solution, or a 'solution' that doesn't address that impact (2025 paired them).",
      "Defining the digital divide as just 'rich vs poor'. Include access to technology/Internet AND skills, and give causes.",
      "Saying ergonomics is 'about computers being comfortable'. It's about designing equipment/workspaces around the human body to prevent injury."
    ],
    years: [2016, 2020, 2023, 2025],
    priority: 2
  },

  {
    id: "soc-digital-society",
    section: "D: Social Implications",
    title: "Digital society: social media, cyberbullying, fake news, digital heritage, evaluating sources",
    summary: "How communication technologies shape human interaction: social media popularity and risks, cyberbullying and online abuse, content moderation, fake news and misinformation, evaluating online sources, digital heritage (what happens to your data and digital assets when you die), and the implications of IoT and cryptocurrencies for society.",
    points: [
      "Why platforms like TikTok are popular — short, engaging content; an AI recommendation algorithm that personalises the feed; easy video creation tools; viral trends and challenges; free to use; huge creator and influencer community (2023).",
      "Benefits of digital communication — instant, cheap global contact (messaging, video calls), communities and support groups, education and information access, business marketing and customer feedback, activism and emergency alerts.",
      "Risks of digital communication — cyberbullying, privacy loss, misinformation, addiction, scams, exposure to harmful content, less face-to-face interaction.",
      "Cyberbullying — using digital technology (social media, messaging, gaming, email) to deliberately and repeatedly harass, threaten, humiliate or exclude someone (May 2024 definition). Harder to detect than physical bullying because it happens privately on personal devices, can be anonymous, happens 24/7 outside school, and victims often don't report it.",
      "Handling cyberbullying or negative comments — don't respond or retaliate; screenshot/save evidence; block and report the user to the platform; adjust privacy settings or comment filters; tell a trusted adult, school or employer; in serious cases get a protection order (Protection from Harassment Act) or report to SAPS (2024, May 2024). School support: counselling, clear anti-bullying/AUP policy, awareness programmes, anonymous reporting.",
      "Content moderation — platforms remove harmful, illegal or offensive content (violence, hate speech, child abuse material, misinformation) to protect users, follow laws and keep advertisers. Moderators face trauma, so AI filters are increasingly used, but AI misses context and makes errors, so humans are still needed (2020). SafeSearch filters help but can't catch everything.",
      "Fake news and misinformation — false or misleading content presented as news, spread quickly by social media, bots and deepfakes, to influence elections, scam people or get clicks. Consequences: panic, damaged reputations, political manipulation, health risks (e.g. vaccine myths).",
      "Evaluating sources (website reliability criteria) — Authority (who wrote it, their credentials), Affiliation (who funds or supports it), Audience (who it's for), Currency (date published/updated), Content/accuracy (references, working links, matches other sources), Objectivity (bias or hidden agenda), Design (professional, easy to navigate). Cross-check with reputable sources (May 2024).",
      "Digital heritage — the digital assets and data people leave behind when they die: purchased e-books, music, films and games, photos, social media accounts, emails, cloud files, cryptocurrency, IoT/health-device data. Planning it means a 'digital will', legacy-contact settings (Facebook legacy contact, Google Inactive Account Manager, Apple Legacy Contact) and passing on access securely (2021; 2025 definition).",
      "Legal issues with digital heritage — many purchased digital media are only licensed to you, not owned, so heirs may not legally inherit them. Laws haven't kept up. Cryptocurrency is lost forever if nobody has the private keys or seed phrase (2021).",
      "IoT implications — privacy (smart speakers listening, cameras, location tracking), security of poorly protected devices, and the huge amount of personal data generated.",
      "Implications of cryptocurrencies — financial inclusion and fast cross-border payments, but price volatility, scams, use in ransomware and dark-web crime, high energy use for some (proof-of-work) currencies, and limited consumer protection.",
      "Political and social effects — social media propaganda, echo chambers and filter bubbles, influence on elections, surveillance; positive: activism, citizen journalism, connecting diaspora communities."
    ],
    compare: [
      { a: "Cyberbullying", b: "Physical bullying", rows: [
        ["When", "Any time, 24/7", "Usually at school/specific places"],
        ["Identity", "Can be anonymous", "Bully is known"],
        ["Audience", "Can spread to thousands and stay online permanently", "Limited to those present"],
        ["Detection", "Hidden on private devices", "More visible to teachers"]
      ] },
      { a: "Misinformation", b: "Disinformation", rows: [
        ["Intent", "False, but shared by mistake", "False and deliberately spread to deceive"],
        ["Example", "Sharing an old, wrong news story", "Deepfake video of a politician"]
      ] }
    ],
    pitfalls: [
      "Defining cyberbullying without 'using technology' and 'repeatedly/deliberately'.",
      "Saying heirs can automatically use all the e-books and music: they are often licences tied to the account.",
      "Source evaluation answered with 'check if it's on Google'. Name a criterion (authority, currency, objectivity) and explain how to apply it.",
      "Strategies for handling online abuse that include retaliating or arguing back."
    ],
    years: [2020, 2021, 2023, 2024, 2025],
    priority: 2
  },

  /* =====================================================================
   * SECTION E: DATA & INFORMATION MANAGEMENT AND SOLUTION DEVELOPMENT
   * ===================================================================== */
  {
    id: "db-concepts",
    section: "E: Data & Solution Development",
    title: "Database concepts (DBMS, keys, data types, integrity)",
    summary: "The building blocks of relational databases and what a DBMS does: tables, fields, records, primary/foreign/composite keys, schema vs data, data types and field properties, data integrity and quality, derived and redundant data, and relational (SQL) vs NoSQL databases.",
    points: [
      "Database — an organised collection of related data stored so it can be easily searched, updated and managed. DBMS (Database Management System) — software that creates, maintains and controls access to the database (MS Access, MySQL, SQL Server, PostgreSQL).",
      "DBMS functions — data integrity management (validation rules, referential integrity); security (user accounts, multi-user access control and permissions, encryption); concurrency control (record locking so two users don't overwrite each other); backup and recovery (transaction logs, rollback); data dictionary/metadata; a query language (SQL) and reports.",
      "Table, record, field — a table stores data about one entity (e.g. tblCustomers). A record (row) is all the data about one item/person. A field (column) is one attribute (e.g. Surname). Schema/structure = the design (tables, fields, types, relationships), not the data itself.",
      "Primary key — a field (or combination) whose value uniquely identifies each record; can't be empty or repeated (2020, May 2023). Foreign key — a field in one table that is the primary key of another table, creating a relationship. Composite key — a primary key made of two or more fields together, used when no single field is unique (2016).",
      "Data types and properties — choose a suitable type for each field: Text/String (names; also phone and ID numbers, because of leading zeros and no maths), Integer, Real/Currency, Boolean (Yes/No), Date/Time, Autonumber. Properties: field size, default value, required/not null, indexed, validation rule.",
      "Atomic field — holds a single indivisible value (FirstName and Surname separately, not 'Full name and address' in one field). Non-atomic fields make searching and sorting hard.",
      "Derived (calculated) data — values that can be worked out from other stored data (age from date of birth; total from price × quantity). Don't store them, because they go out of date: store the date of birth/purchase date and calculate age with a query (2016 vehicle age).",
      "Redundant / duplicate data — the same data stored more than once (e.g. an agent's phone number on every order). Wastes space and causes update anomalies and inconsistencies (2020).",
      "Referential integrity — a rule that every foreign-key value must match an existing primary-key value, so there are no orphan records (e.g. no order for a customer who doesn't exist).",
      "Characteristics of quality data / data integrity — accuracy (correct values), correctness, currency (up to date), completeness (nothing missing), relevance, consistency. Accessibility is NOT a quality-data characteristic (2016 MCQ).",
      "Relational (SQL) database — data in related tables with fixed schemas, queried with SQL, strong consistency (ACID). NoSQL — non-relational: flexible documents, key-value, graph or column stores (e.g. MongoDB), scales out across many servers, suits huge volumes of unstructured/semi-structured big data.",
      "Choosing storage for a scenario — a database for many related records searched and updated by several users (e.g. salon customer bookings and photos); text/JSON files for simple config, data exchange or small lists (2024)."
    ],
    compare: [
      { a: "Primary key", b: "Foreign key", rows: [
        ["Purpose", "Uniquely identifies each record in its table", "Links to a primary key in another table"],
        ["Unique?", "Yes, and never empty", "Can repeat (many orders for one customer)"],
        ["Example", "CustomerID in tblCustomers", "CustomerID in tblOrders"]
      ] },
      { a: "Relational (SQL) database", b: "NoSQL database", rows: [
        ["Structure", "Fixed tables, rows and columns", "Flexible documents, key-value pairs, graphs"],
        ["Schema", "Defined in advance", "Dynamic, can change per record"],
        ["Scaling", "Vertical (bigger server)", "Horizontal (more servers)"],
        ["Best for", "Structured data, transactions (banking, stock)", "Big, varied data (social media, IoT)"],
        ["Example", "MySQL, SQL Server, Access", "MongoDB, CouchDB"]
      ] },
      { a: "Stored data", b: "Derived data", rows: [
        ["Example", "Date of birth", "Age"],
        ["Changes over time?", "No", "Yes: would go out of date"],
        ["Approach", "Store it", "Calculate it in a query when needed"]
      ] }
    ],
    pitfalls: [
      "Saying a primary key is 'the first field' or 'the ID': it is any field/combination that uniquely identifies each record.",
      "Suggesting storing age instead of date of birth.",
      "Choosing a numeric type for phone or ID numbers (leading zeros lost, no maths needed).",
      "Listing DBMS functions as table names or SQL commands. Give the function: security, integrity, backup/recovery, concurrency."
    ],
    years: [2016, 2020, 2023, 2024],
    priority: 2
  },

  {
    id: "db-normalisation",
    section: "E: Data & Solution Development",
    title: "Normalisation, anomalies & relationships (1NF–3NF)",
    summary: "Why badly designed tables cause problems (redundancy, insert/update/delete anomalies) and how normalisation to 1NF, 2NF and 3NF fixes them, with partial and transitive dependencies and one-to-one, one-to-many and many-to-many relationships. SAGS 2025 says 12.4.10 is examined only in the SBA/PAT, so this is lower priority for Paper 2, but keys and anomalies still come up (May 2023).",
    points: [
      "Why normalise — to remove redundant (repeated) data and repeating groups, prevent anomalies, save storage, keep data consistent and make the database easier to maintain.",
      "Insert anomaly — you can't add data about one thing without data about another, e.g. you can't record a new order until a delivery agent is assigned, because AgentName is part of the key (2020).",
      "Update (modification) anomaly — the same fact is stored in many rows, so changing it means updating every copy; miss one and the data becomes inconsistent (e.g. a driver's phone number on every trip).",
      "Delete anomaly — deleting one record unintentionally removes other information, e.g. deleting a vehicle's only trip deletes the vehicle's details too.",
      "1NF — every field is atomic (single values), there are no repeating groups, and every record is unique (has a primary key). 1NF often still has redundancy because data repeats across rows (2016).",
      "2NF — in 1NF AND no partial dependencies: every non-key field depends on the WHOLE composite primary key, not just part of it. Fix: move partially dependent fields to a new table with the part of the key they depend on (2020: AgentPhone depends only on AgentName).",
      "3NF — in 2NF AND no transitive dependencies: non-key fields depend only on the primary key, not on another non-key field (e.g. RouteID → Distance inside a trips table). Fix: move them into their own table.",
      "Relational notation — write tables as tblName(PrimaryKey, Field2, Field3, ForeignKey*), underlining the primary key and marking foreign keys (e.g. with an asterisk or italics).",
      "Relationships — one-to-one (each person has one ID document record), one-to-many (one customer has many orders, the most common), many-to-many (many students take many subjects).",
      "Many-to-many — can't be implemented directly. Resolve it with a link (junction) table holding the primary keys of both tables as foreign keys, usually forming a composite key (e.g. tblEnrolment(StudentID, SubjectID)).",
      "ERD (Entity Relationship Diagram) — shows entities (tables), their attributes and the relationships between them, with crow's-foot notation for the 'many' side."
    ],
    compare: [
      { a: "Partial dependency (2NF problem)", b: "Transitive dependency (3NF problem)", rows: [
        ["Definition", "Non-key field depends on only PART of a composite key", "Non-key field depends on another non-key field"],
        ["Example", "AgentPhone depends on AgentName only (key = OrderID + AgentName)", "Distance depends on RouteID (not the key)"],
        ["Fix", "Move the field to a table keyed by that part", "Move the field to a table keyed by the non-key field"]
      ] },
      { a: "1NF", b: "3NF", rows: [
        ["Rule", "Atomic values, no repeating groups, has a key", "Also no partial or transitive dependencies"],
        ["Redundancy", "Still plenty", "Minimal"],
        ["Anomalies", "Likely", "Largely removed"]
      ] }
    ],
    pitfalls: [
      "Naming anomalies without a scenario example: 2016 asked for an example of each from the given table.",
      "Saying 3NF means 'three tables'.",
      "Forgetting to carry the foreign key into the new tables when normalising, which breaks the relationships.",
      "Spending tonight's revision time on full normalisation when SAGS 2025 limits it to SBA/PAT. Know keys, anomalies and relationships, then move on."
    ],
    years: [2016, 2020, 2023],
    priority: 1
  },

  {
    id: "db-management",
    section: "E: Data & Solution Development",
    title: "Managing stored data (data quality threats, warehousing, mining, transactions)",
    summary: "Strategies for storing, protecting and retrieving data (SAGS 12.4.9): threats to quality data (corrupted, outdated, invalidated data, SQL injection, malware), data warehousing, data mining and big data, NoSQL, transactions and rollback, multi-user access control, audit trails, backups and distributed databases.",
    points: [
      "Threats to quality data — corrupted data: errors introduced while writing, storing or transmitting make data unreadable or wrong (disk faults, power cuts, transmission errors). Outdated data: no longer current (an old address or phone number), leading to wrong decisions or failed deliveries. Invalidated data: data that was never checked against rules, so wrong types or impossible values get in (letters in a phone number, a birth date in the future) (2023).",
      "Vulnerabilities — malware infections that corrupt or steal data, and SQL injection: an attacker types SQL code into an input field (e.g. ' OR 1=1;) so the query returns or changes data it shouldn't. OR 1=1 is always true, so every record is returned. Prevention: parameterised queries/prepared statements, input validation and escaping, least-privilege database accounts (2023, prelim).",
      "Data warehouse — a large central store of integrated, cleaned historical data from many sources (sales, branches, website), optimised for analysis and reporting rather than day-to-day transactions. It supports management decisions and long-term trend analysis.",
      "Data mining — analysing large data sets (often from a warehouse) with statistics and AI to discover hidden patterns, correlations and predictions: fraud detection, market-basket analysis, customer segmentation, demand forecasting.",
      "Big data — very large, fast, varied data sets. Sources: social media, activity-generated data (clicks, purchases, streaming), logs and audit trails, IoT sensors, location-based data (2025).",
      "NoSQL — non-relational databases (e.g. MongoDB) that store flexible documents or key-value pairs, scale across many servers and handle big, unstructured data; relational SQL databases suit structured, transactional data.",
      "Transaction processing — a transaction is a group of database operations treated as one unit (e.g. move money from account A to B). Either all of it is committed or, if anything fails, it is rolled back so the data stays consistent (ACID: atomicity, consistency, isolation, durability).",
      "Recovering from a bad update — use rollback (undo uncommitted transactions), the transaction log, or restore from a backup; then fix the data with a corrected UPDATE query (2020).",
      "Multi-user access control — user accounts with different permissions (read-only, edit, admin), record locking so two people don't edit the same record at once, and audit trails recording who changed what and when.",
      "Distributed database — one logical database whose data is stored across several sites/servers, sometimes replicated. Pros: local speed, no single point of failure, scalability. Cons: keeping copies synchronised, more complex security. Blockchain is a decentralised kind of distributed database.",
      "Backup and recovery management — scheduled backups, off-site copies, tested restores (see net-data-protection).",
      "Data cleansing — finding and fixing duplicate, incomplete or incorrect records before analysis or loading into a warehouse."
    ],
    compare: [
      { a: "Operational database", b: "Data warehouse", rows: [
        ["Purpose", "Day-to-day transactions (orders, bookings)", "Analysis, reporting, decision-making"],
        ["Data", "Current, frequently updated", "Historical, integrated from many sources, read-mostly"],
        ["Users", "Clerks, apps, customers", "Managers, analysts"]
      ] },
      { a: "Outdated data", b: "Invalidated data", rows: [
        ["Meaning", "Was correct once but no longer current", "Never checked, so may break the rules"],
        ["Example", "Customer moved but old address still stored", "'abc' captured in the phone-number field"],
        ["Prevention", "Regular reviews, customers update their own profiles", "Validation checks at input"]
      ] }
    ],
    pitfalls: [
      "Explaining SQL injection as 'hacking the database' without saying SQL code is entered into an input field and executed.",
      "Saying OR 1=1 'deletes the table': it makes the WHERE condition always true, so all records are returned.",
      "Prevention answers like 'use a firewall' for SQL injection. Give parameterised queries/input validation.",
      "Confusing a data warehouse (storage) with data mining (analysis)."
    ],
    years: [2020, 2023, 2024, 2025],
    priority: 2
  },

  {
    id: "data-validation",
    section: "E: Data & Solution Development",
    title: "Sources of errors, validation & verification",
    summary: "Where errors come from (human/GIGO, arithmetic, transmission, programming) and how to stop them: validation checks, verification, input techniques that reduce typing errors, check digits, checksums and parity.",
    points: [
      "GIGO — Garbage In, Garbage Out: a computer processes whatever it's given, so incorrect input produces incorrect output, however good the program is.",
      "Sources of errors — human/input errors (typos, transposed digits, wrong field); arithmetic errors (rounding, truncation, overflow from a fixed number of bits); data-transmission errors (cable faults, interference corrupting bits); programming errors (logic errors that go undetected).",
      "Validation — the program automatically checks that input is sensible and follows rules BEFORE accepting it. It can't tell whether the data is actually true, only whether it is reasonable.",
      "Verification — checking that data has been entered or copied accurately and matches the source: double entry (type a password/email twice), visual proof-reading, comparing with the original document. Transmission checks verify data wasn't corrupted.",
      "Presence check — a required field isn't left empty (e.g. customer cell number must be entered for a booking) (2024).",
      "Type check — data is the correct data type (e.g. stock quantity must be an integer, not letters) (2024).",
      "Format (picture) check — data matches a pattern (e.g. a cell number of 10 digits starting with 0; a date dd/mm/yyyy; an email containing @ and a dot) (2024).",
      "Range check — a value lies between limits (e.g. hours worked 0–24; rating 1–5). Length check — the right number of characters (SA ID number exactly 13 digits; password at least 8). Uniqueness check — no duplicates (username, primary key). Logical (consistency) check — fields make sense together (delivery date not before order date; date of birth matches the ID number).",
      "Check digit — an extra digit calculated from the other digits by a formula and added to the end of a number (ISBN, barcode, SA ID number's last digit). Re-calculating it at input detects most typing and transposition errors.",
      "Checksum — a value calculated from a block of data and sent with it; the receiver recalculates it, and a mismatch shows corruption. Parity check — an extra bit makes the number of 1s even (or odd); a single flipped bit is detected.",
      "Input techniques that reduce errors — barcode scanners, QR codes, RFID tags, biometric input, OCR (converting scanned or handwritten text into editable machine text, 2022 definition), magnetic strips/chips; GUI components that limit choices: drop-down lists, radio buttons, check boxes, date pickers/calendars, spin edits.",
      "Validation in code — loops that re-prompt until valid, exception handling (try/catch) for type errors, and clear error messages that tell the user how to fix the input."
    ],
    compare: [
      { a: "Validation", b: "Verification", rows: [
        ["Question it answers", "Is the data reasonable and rule-following?", "Was the data entered/copied correctly?"],
        ["Done by", "The program, automatically", "Double entry, proof-reading, comparing with source"],
        ["Example", "Range check: age 0–120", "Typing a new password twice"],
        ["Limitation", "Valid data can still be wrong (a typo of 25 instead of 52 passes)", "Takes extra time and effort"]
      ] },
      { a: "Range check", b: "Format check", rows: [
        ["Checks", "Value lies between limits", "Data matches a pattern"],
        ["Example", "Discount 0–50%", "Cell number: 10 digits starting with 0"]
      ] },
      { a: "Check digit", b: "Parity bit", rows: [
        ["Purpose", "Detect input errors in a code number", "Detect transmission errors in bits"],
        ["Where", "End of ID/ISBN/barcode numbers", "Added to each byte/packet"],
        ["Catches", "Wrong digit, swapped digits", "A single flipped bit"]
      ] }
    ],
    pitfalls: [
      "Saying validation ensures data is 'correct': it only ensures it is reasonable; verification checks accuracy.",
      "Examples not taken from the scenario when asked. 2024 wanted the salon's data (booking date, cell number, hairstyle).",
      "Describing a format check with a range example, or the other way round.",
      "Confusing a check digit (input check) with a parity bit (transmission check)."
    ],
    years: [2016, 2022, 2023, 2024],
    priority: 3
  },

  {
    id: "data-representation",
    section: "E: Data & Solution Development",
    title: "Data representation: binary, hex, fixed bits, overflow, floating point",
    summary: "Representing data in a fixed number of bits: number systems and conversions, combinations (2^n), signed and unsigned integer ranges, overflow, mantissa and exponent for real numbers, rounding vs truncation, character sets (ASCII, Unicode), word size, and applications such as IP/MAC addresses and colour depth.",
    points: [
      "Why binary — digital circuits have two reliable states (on/off), so all data is stored as bits (0/1). A byte = 8 bits; a nibble = 4 bits.",
      "Fixed number of bits — each data type is given a set number of bits (e.g. an 8-bit byte, a 32-bit int), which limits the range and precision of values it can hold (2025).",
      "Combinations — n bits give 2^n different patterns: 1 bit → 2 colours, 4 bits → 16, 8 bits → 256, 24 bits → about 16.7 million colours (2025). More bits per pixel (colour depth) = more colours, smoother shading and more realistic images, but bigger files.",
      "Unsigned integer range — 0 to 2^n − 1 (8 bits: 0–255). Signed integer range (two's complement) — −2^(n−1) to 2^(n−1) − 1 (8 bits: −128 to 127; 32-bit int: about ±2.1 billion).",
      "Overflow error — a result needs more bits than are available, so it 'wraps around' or is stored wrongly (e.g. an 8-bit unsigned stock count of 255 + 1 becomes 0; a signed value jumps to a large negative number). Consequences: wrong totals, crashes, safety failures. Prevent: choose a larger data type (long/Int64), validate ranges before calculating, check for overflow in code (2025).",
      "Real (floating-point) numbers — stored as a sign bit, a mantissa (the significant digits) and an exponent (the power that positions the binary point). In 32 bits: 1 sign bit (bit 31), 8 exponent bits, 23 mantissa bits. More mantissa bits = more precision; more exponent bits = bigger range (2022).",
      "Exponent range — a signed n-bit exponent stores −2^(n−1) to 2^(n−1) − 1 (8 bits: −128 to 127). Largest unsigned value in m mantissa bits: 2^m − 1.",
      "Rounding vs truncation — rounding adjusts to the nearest value (102.90 → 103); truncation simply chops off the extra digits (102.90 → 102). Storing R102,90 in an integer variable truncates it to R102: fix it by using a real/double/currency type, or store the amount in cents as an integer (10290) (2024).",
      "Floating-point inaccuracy — many decimals (like 0.1) can't be stored exactly in binary, so tiny rounding errors appear. Use currency/decimal types for money.",
      "Hexadecimal — base 16 (0–9, A–F). Each hex digit = exactly 4 bits, so hex is a much shorter, more readable way to write binary, with fewer copying errors. Used for MAC addresses, IPv6, memory addresses, colour codes (#FF8800) and error codes (2024).",
      "Conversions — binary 1101 = 8+4+0+1 = 13; 13 = D in hex; hex 2F = 2×16 + 15 = 47 = 00101111 in binary. Group binary into 4-bit nibbles to convert to hex.",
      "Word size — the number of bits the CPU processes as one unit, matching the register size (32-bit or 64-bit). A larger word size handles bigger numbers in one operation, moves more data per cycle and addresses more memory, so performance improves (2024).",
      "Characters — ASCII: 7 bits (128 characters; extended ASCII 8 bits, 256) covering English letters, digits and symbols. Unicode: a universal character set with over a million possible code points for all world languages and emoji; UTF-8 encodes it in 1–4 bytes and is backward-compatible with ASCII; UTF-16 uses 2 or 4 bytes (Java chars are 16-bit).",
      "Addresses as fixed bits — IPv4 = 32 bits; IPv6 = 128 bits (8 × 16-bit groups, each 4 hex digits); MAC = 48 bits (12 hex digits). Removing leading zeros shortens how IPv6 is written but doesn't change the stored 128 bits (2023).",
      "Screen resolution and storage — image size in bits = width × height × bits per pixel (e.g. 1920 × 1080 × 24 bits ≈ 6.2 MB uncompressed)."
    ],
    compare: [
      { a: "Signed integer", b: "Unsigned integer", rows: [
        ["Stores", "Negative and positive values", "Only zero and positive values"],
        ["8-bit range", "−128 to 127", "0 to 255"],
        ["n-bit formula", "−2^(n−1) to 2^(n−1) − 1", "0 to 2^n − 1"]
      ] },
      { a: "Rounding", b: "Truncation", rows: [
        ["Method", "Go to the nearest value", "Cut off extra digits"],
        ["102.90 →", "103", "102"],
        ["Error", "Up to half a unit either way", "Always rounds down (toward zero), so errors build up"]
      ] },
      { a: "ASCII", b: "Unicode (UTF-8/16)", rows: [
        ["Bits", "7 (extended: 8)", "UTF-8: 8–32 bits; UTF-16: 16 or 32"],
        ["Characters", "128 (256)", "Over a million code points"],
        ["Languages", "English only", "All languages and emoji"]
      ] },
      { a: "Mantissa", b: "Exponent", rows: [
        ["Holds", "Significant digits of the number", "Power that positions the binary point"],
        ["More bits gives", "More precision (accuracy)", "Larger range (bigger/smaller numbers)"]
      ] }
    ],
    pitfalls: [
      "Using 2n instead of 2^n for combinations (2025 asked you to pick the formula).",
      "Saying hex is used because computers 'understand hex': computers still store binary; hex is for humans.",
      "Calling truncation 'rounding down' without the example, or confusing it with overflow.",
      "Overflow example that isn't tied to the scenario (2025 wanted stock quantities, e.g. 8-bit stock count of 255 + 10 wraps).",
      "Forgetting the sign bit when counting floating-point bits."
    ],
    years: [2020, 2021, 2022, 2023, 2024, 2025],
    priority: 3
  },

  {
    id: "sol-algorithms",
    section: "E: Data & Solution Development",
    title: "Algorithms, computational thinking & trace tables",
    summary: "Planning solutions: computational thinking (decomposition, pattern recognition, abstraction, algorithm design, evaluation), pseudocode, flowcharts and structure diagrams, control structures, and, above all, completing trace tables and finding the faulty line. A trace table on an algorithm is worth about 10 marks every year.",
    points: [
      "Algorithm — a finite, step-by-step set of unambiguous instructions in a logical order that solves a problem (2022 definition).",
      "Decomposition — breaking a large, complex problem into smaller, manageable sub-problems that can be solved (and tested) separately, e.g. stock management → track sales, check levels, reorder, report (2021, 2024, 2025).",
      "Pattern recognition — spotting similarities and trends in problems or data so you can reuse solutions, methods or classes, e.g. noticing ice cream sells better in summer, or that the same calculation happens for every item (loop/method) (2025).",
      "Abstraction — removing unnecessary detail and focusing on what's relevant, and hiding complexity behind simple interfaces (methods, classes, inheritance), e.g. grouping all frozen items into one 'frozen' category instead of tracking each product separately (2021, 2024, 2025).",
      "Algorithm design and evaluation — combine the abstract parts into a solution, represent it in pseudocode or a flowchart, then test and evaluate it for errors and efficiency (no duplicate code, no unnecessary processing, loops stop once the answer is found).",
      "Control structures — sequence (steps in order); selection (if, if-else, nested if, case/switch); iteration (for = counted loop when you know how many times; while = pre-test conditional loop that may run 0 times; repeat-until/do-while = post-test loop that runs at least once).",
      "Pseudocode — structured, language-independent English describing an algorithm (← for assignment, if/end if, for k ← 0 to size − 1). Flowcharts — standard symbols: oval start/end, parallelogram input/output, rectangle process, diamond decision, arrows for flow. Structure diagrams show modules in a hierarchy.",
      "Trace table — a table that records the value of each variable, condition and output, line by line, as you 'run' the algorithm by hand with test data. It shows how the logic works and exposes logic errors.",
      "How to complete a trace table — write the line number on every row; only fill a cell when that variable changes on that line (or as the memo shows); record each condition's True/False result; show every loop pass (watch the loop counter's final value and when the loop exits); write outputs exactly; keep track of integer vs real division.",
      "Finding the error — compare what the trace produced with what the specification requires. Classic faults: wrong comparison (<= 50 instead of < 50), assignment reversed (farmCost ← biggestCost instead of biggestCost ← farmCost), accumulating in the wrong place (total calculated inside vs after the loop), subtracting instead of skipping in an else, count++ missing, off-by-one loop bounds, wrong divisor, assigning instead of concatenating (skills ← newSkill instead of skills ← skills + newSkill).",
      "Making methods generic — replace hard-coded values (a fixed date or 'Jimmy') with parameters so the method works for any value (2022).",
      "Efficiency improvements — use a flag/conditional loop to stop searching once found, combine repeated lines into one method call, avoid recalculating values inside loops.",
      "Common algorithms — find minimum/maximum (initialise with the first element, not 0 if negatives are possible), sum and average (guard against division by zero), counting with a condition, swapping two values with a temp variable, isolating digits with div and mod."
    ],
    compare: [
      { a: "For loop (counted)", b: "While loop (conditional, pre-test)", rows: [
        ["Use when", "Number of repetitions is known", "Repeat until a condition changes"],
        ["Runs at least once?", "Only if the range isn't empty", "Not necessarily (checks first)"],
        ["Example", "Process all 3 orders", "Search until found or end of array"]
      ] },
      { a: "Decomposition", b: "Abstraction", rows: [
        ["Does", "Splits the problem into smaller parts", "Removes irrelevant detail and hides complexity"],
        ["Why important", "Parts are easier to solve, test and share among a team", "Reduces complexity; focus on what matters; enables reuse"],
        ["Example", "Ordering system → cart, payment, delivery", "Treat all frozen goods as one category"]
      ] },
      { a: "Pseudocode", b: "Flowchart", rows: [
        ["Form", "Structured text", "Diagram with standard symbols"],
        ["Strength", "Close to real code, quick to write", "Shows flow and decisions visually"]
      ] }
    ],
    pitfalls: [
      "Leaving out line numbers in trace tables (the memo requires them).",
      "Skipping the final loop check, or putting the return/output before the loop ends.",
      "Doing real division where the algorithm uses integer division (or the reverse).",
      "Explaining the error only as 'line 12 is wrong'. Say what it does now, what it should do, and write the corrected line.",
      "Confusing decomposition with abstraction in classification questions (2025 had three scenario items to classify).",
      "Using values from the wrong array element when tracing arrays of objects. Read sArr[i].getX() carefully for each i."
    ],
    years: [2016, 2020, 2021, 2022, 2023, 2024, 2025],
    priority: 3
  },

  {
    id: "sol-oop-theory",
    section: "E: Data & Solution Development",
    title: "OOP theory & UML class diagrams",
    summary: "Object-oriented concepts examined in theory: classes and objects, fields and methods, constructors, accessors, mutators, toString, access modifiers and UML notation, static/class fields and constants, encapsulation and information hiding, inheritance vs composition, overriding vs overloading, polymorphism, dynamic binding and type checking. A UML class diagram (8–11 marks) appears every year.",
    points: [
      "Class vs object — a class is a blueprint/template that defines fields (attributes) and methods (behaviour). An object is an instance of a class, created (instantiated) by calling its constructor, with its own field values (prelim definition).",
      "UML class diagram — three compartments: class name; fields as 'visibility name : type'; methods as 'visibility name(param : type, ...) : returnType'. Void methods have no return type; constructors have no return type.",
      "Access modifiers — '-' private (only inside the class), '+' public (any class), '#' protected (the class and its subclasses/children), '~' package (classes in the same package/project in Java) (2025). Fields are normally private; methods that others need are public.",
      "Static (class) fields and methods — belong to the class, shared by all objects, not to one object: underline them in UML (e.g. totalStock, a counter of objects). Constants — fixed values that can't change, named in CAPITALS and underlined (static final in Java, const in Delphi), e.g. - DELIVERY_FEE : real = 20.00 (2023, May 2024, 2025). Constants may be public because they can't be modified; but don't use a constant for a price that changes, because you'd have to edit and recompile the code.",
      "Constructor — special method with the same name as the class (Java) or Create (Delphi), called when an object is instantiated, that initialises the fields. Default constructor: no parameters, assigns default values. Parameterised constructor: receives values for the fields. A subclass constructor calls the parent's constructor (super(...) / inherited Create) (2021, May 2025).",
      "Accessor (getter) — returns the value of a private field, e.g. + getStockLevel() : integer; it is a typed method. Mutator (setter) — changes a field's value, usually validating it first, e.g. + setItemLabel(iL : string); it is a void method. toString() — returns all the fields combined into one string (2021, 2024, May 2025).",
      "Typed vs void method — a typed method (function) returns a value of a stated type and is used in an expression/output/condition; a void method (procedure) performs an action and returns nothing (May 2024).",
      "Encapsulation — combining the fields (data) and methods (behaviour) that act on them into one unit, the class (2025 definition, May 2025). Information hiding — making fields private so other classes can only reach them through public methods, which protects the data from invalid changes and hides complexity.",
      "Inheritance — a subclass (child) is created from a superclass (parent) and automatically gets its fields and methods, adding its own or changing some: an 'is-a' relationship (a PremiumDriver is a Driver). Advantages: code reuse (less duplication), easier maintenance, logical hierarchy, enables polymorphism. In UML: an arrow with a hollow triangle pointing to the parent (2024).",
      "Composition — a class has an object of another class (or an array of objects) as a field: a 'has-a' relationship (a Farm has two Crop objects; a Ticket has a Journey). Shown in UML with a diamond/line between classes. Use composition when one object is part of another, and inheritance when one is a specialised type of another (2024, May 2025, 2025 definition).",
      "Method overriding — a subclass method with the SAME name, return type and parameter list as a method in its parent class replaces the parent's version (e.g. TeacherOrder.calculateCost() overrides Order.calculateCost()). Requires inheritance (2025 definition).",
      "Method overloading — several methods in the same class with the same name but DIFFERENT parameter lists (number/type/order), e.g. a default constructor and a parameterised constructor (2024 definition, May 2025).",
      "Polymorphism and dynamic binding — the same method call behaves differently depending on the actual object type at runtime: calling toString() on each element of an Order array runs Order's or TeacherOrder's version automatically. An array declared as the parent type can hold parent and child objects.",
      "Type checking and casting — Java: if (oArr[i] instanceof TeacherOrder), then cast (TeacherOrder) oArr[i] to use child-only methods. Delphi: if oArr[i] is TTeacherOrder, then (oArr[i] as TTeacherOrder) (2022, May 2024). A null field or array element refers to no object yet, so calling a method on it causes a runtime error.",
      "Why use class diagrams in design — plan the structure before coding, communicate the design to the team, show relationships and reuse, document the system for maintenance (May 2024).",
    ],
    compare: [
      { a: "Method overriding", b: "Method overloading", rows: [
        ["Where", "Parent class and subclass", "Usually within the same class"],
        ["Signature", "Same name, same parameters and return type", "Same name, different parameter list"],
        ["Needs inheritance?", "Yes", "No"],
        ["Decided at", "Runtime (dynamic binding)", "Compile time"],
        ["Example", "TeacherOrder.calculateCost() replaces Order.calculateCost()", "Crop() and Crop(inN, inSc, inPb)"]
      ] },
      { a: "Inheritance", b: "Composition", rows: [
        ["Relationship", "'is-a' (PremiumDriver is a Driver)", "'has-a' (Farm has a Crop)"],
        ["How", "Subclass extends a parent class", "Object of another class stored as a field"],
        ["UML", "Arrow with hollow triangle to the parent", "Line with a diamond at the owning class"],
        ["Use when", "Child is a specialised version of the parent", "One object is made up of/contains others"]
      ] },
      { a: "Accessor (getter)", b: "Mutator (setter)", rows: [
        ["Purpose", "Return the value of a private field", "Change the value of a private field"],
        ["Method type", "Typed (returns one value)", "Void (usually)"],
        ["Parameters", "None", "The new value"],
        ["UML example", "+ getStockLevel() : integer", "+ setItemLabel(iL : string)"]
      ] },
      { a: "Encapsulation", b: "Information hiding", rows: [
        ["Meaning", "Bundling fields and methods into one class", "Restricting direct access to fields (private)"],
        ["Achieved by", "Defining a class", "Access modifiers + accessors/mutators"]
      ] },
      { a: "Private (-)", b: "Protected (#)", rows: [
        ["Accessible from", "Only its own class", "Its own class and any subclass"],
        ["Typical use", "Fields of a stand-alone class", "Parent fields that children must use directly"]
      ] }
    ],
    pitfalls: [
      "Giving mutators a return type, or accessors a parameter.",
      "Putting a return type on the constructor.",
      "Forgetting to underline static fields and constants, or writing constants in lowercase.",
      "Using + for fields the scenario says must be hidden. Read each access instruction ('accessible from any class that inherits' = protected #).",
      "Saying overriding happens between two unrelated classes that both have toString().",
      "Mixing up 'is-a' (inheritance) and 'has-a' (composition).",
      "Missing parameter types or names in UML method signatures, which loses marks per method."
    ],
    years: [2016, 2020, 2021, 2022, 2023, 2024, 2025],
    priority: 3
  },

  {
    id: "sol-programming",
    section: "E: Data & Solution Development",
    title: "Programming concepts: data types, scope, parameters, arrays, errors & testing",
    summary: "Theory about writing and testing code: choosing data types and conversions, constants vs variables, scope and lifetime, parameter passing, typed vs void methods, static vs dynamic arrays, parallel arrays vs arrays of objects, string handling, the three error types, exception handling, debugging tools and test data.",
    points: [
      "Data types — String (text), char (single character), integer types (int/Integer; long/Int64 for big values), real/floating point (double/Real; currency for money), Boolean (true/false), Date/Time. Choose the smallest suitable type that fits the range and operations.",
      "Choosing types — store phone and ID numbers as strings (leading zeros, no arithmetic); use char for a single-letter code such as gender ('M'/'F'), which uses less memory and is easy to validate (2020); real/currency for prices (2024 truncation).",
      "Conversions — string↔number (Integer.parseInt / StrToInt), char↔integer (ASCII/Unicode codes), real↔integer (rounding/truncation). Widening (int to double) is safe; narrowing (double to int) can lose data and needs an explicit cast.",
      "Arithmetic — +, −, *, / (real division), div (integer division), mod (remainder). 17 div 5 = 3, 17 mod 5 = 2. Order of precedence: brackets, then *, /, div, mod, then +, −.",
      "Constant vs variable — a constant's value is fixed while the program runs (named in CAPITALS, e.g. VAT = 0.15); it makes code readable and easy to change in one place. A variable's value can change.",
      "Scope and lifetime — local variables exist only inside the method/block where they're declared and disappear when it ends; fields (instance variables) last as long as the object; static fields last for the whole program. Use the narrowest scope possible.",
      "Parameters — data passed into a method; the arguments must match the parameters in number, type and order. By value: the method gets a copy. By reference (Delphi var; Java object references): changes affect the original. Parameters make methods generic and reusable (abstraction, code efficiency).",
      "Typed vs void methods — a typed method/function returns one value of a declared type (used in output, conditions, assignments); a void method/procedure performs an action. A method returning a value must be declared typed (May 2023, May 2024).",
      "Arrays — a static array has a fixed size set at declaration (keep a separate size/count variable for the number of used elements). Dynamic arrays/ArrayList can grow and shrink at runtime (more flexible but more overhead). Parallel arrays: several arrays where the same index refers to the same item. Array of objects: one array, each element holds an object with all its fields, which keeps related data together (better encapsulation, easier to sort without breaking links).",
      "Syntax error — breaks the rules of the language (missing semicolon, misspelt keyword); found by the compiler, and the program won't run.",
      "Runtime error — occurs while the program is running when something unexpected happens and it can't continue: division by zero, array index out of bounds, converting 'abc' to an integer, a file not found, a null object (May 2025 definition). Handle with exception handling (try/catch, try/except).",
      "Logic error — the program runs but gives wrong results because the algorithm is wrong (wrong operator, wrong condition, off-by-one loop). Found by testing and trace tables.",
      "Debugging tools — breakpoints (pause at a line), stepping through line by line, watches (monitor variable values), trace output (printing values), the IDE's call stack.",
      "Test data — normal/standard (typical valid values), extreme/boundary (the edges of valid ranges, e.g. 0 and 100 for a percentage), abnormal/erroneous (invalid values like −5 or 'abc'), to prove the program is robust. Defensive programming: validate input, handle exceptions, check array bounds and nulls, give clear error messages that tell the user how to fix the problem.",
      "Strings — length, concatenation, upper/lower case, comparing, isolating characters/substrings (charAt/substring vs Copy/Pos), counting and replacing characters.",
    ],
    compare: [
      { a: "Syntax error", b: "Logic error", rows: [
        ["Cause", "Breaking the language rules", "Wrong algorithm/reasoning"],
        ["Detected by", "Compiler/IDE before running", "Testing, trace tables, wrong output"],
        ["Program runs?", "No", "Yes, but gives wrong results"],
        ["Example", "Missing semicolon", "Using > instead of >="]
      ] },
      { a: "Runtime error", b: "Logic error", rows: [
        ["When", "While running; program crashes or stops", "Runs to the end with wrong output"],
        ["Example", "Division by zero, index out of bounds", "Average divides by the wrong count"],
        ["Fix", "Exception handling, validation, bounds checks", "Correct the algorithm"]
      ] },
      { a: "Parallel arrays", b: "Array of objects", rows: [
        ["Structure", "One array per field, linked by index", "One array, each element an object holding all fields"],
        ["Sorting", "Must swap in every array, which is easy to get wrong", "Swap whole objects"],
        ["Encapsulation", "None", "Fields and methods kept together"]
      ] },
      { a: "Static array", b: "Dynamic array (ArrayList)", rows: [
        ["Size", "Fixed when declared", "Grows/shrinks at runtime"],
        ["Memory", "May waste unused space", "Uses what's needed (some overhead)"],
        ["Tracking used elements", "Needs a separate counter", "Size method built in"]
      ] },
      { a: "Typed method (function)", b: "Void method (procedure)", rows: [
        ["Returns", "One value of a declared type", "Nothing"],
        ["Called", "Inside an expression, output or condition", "As a statement on its own"],
        ["Example", "calculateCost() : real", "setName(n : string)"]
      ] }
    ],
    pitfalls: [
      "Calling a runtime error a syntax error because 'the program crashed'.",
      "Test-data answers that give three normal values. Include boundary and invalid data.",
      "Saying a constant 'can't be used in other classes': constants can be public because they can't be changed.",
      "Using a numeric type for data with leading zeros."
    ],
    years: [2016, 2020, 2022, 2023, 2024, 2025],
    priority: 3
  },

  {
    id: "sol-search-sort",
    section: "E: Data & Solution Development",
    title: "Searching, sorting & array manipulation",
    summary: "Linear (sequential) and binary search, bubble sort (with a flag), selection sort (and improved selection), inserting, deleting and removing duplicates in arrays, and comparing efficiency. Usually appears as an algorithm to trace or an efficiency question.",
    points: [
      "Linear (sequential) search — check each element in turn from the start until the item is found or the end is reached. Works on unsorted data; simple; slow on large arrays (up to n comparisons).",
      "Efficient linear search — use a conditional loop with a found flag (while not found and i < size) so the loop stops as soon as the item is found, instead of a for loop that always checks every element (May 2023, 2020).",
      "Binary search — only on SORTED data. Compare the target with the middle element; if not equal, discard the half it can't be in and repeat on the remaining half until found or the range is empty. Very fast: at most about log2(n) comparisons (1000 items → about 10).",
      "Bubble sort — repeatedly passes through the array comparing adjacent pairs and swapping them if out of order; the largest values 'bubble' to the end each pass. Improved bubble sort uses a flag: if a pass makes no swaps, the array is sorted and it stops early.",
      "Selection sort — for each position, find the smallest (or largest) remaining element and swap it into that position. Improved selection sort finds the index of the minimum first and does only one swap per pass.",
      "Swapping two values — needs a temporary variable: temp ← a; a ← b; b ← temp. Sorting an array of objects swaps whole objects; parallel arrays must swap every array at the same index.",
      "Insert an element — shift elements from the insertion point one place to the right (working from the end backwards), place the new element, increase size. Requires a free slot in a static array.",
      "Delete an element — shift every element after it one place left (overwriting it), then decrease size.",
      "Remove duplicates — compare each element with the ones after it and delete repeats, or copy unique elements into a new array.",
      "Efficiency — execution efficiency means no unnecessary processing (stop when found, stop sorting when no swaps); code efficiency means no duplicated code (use methods and parameters).",
      "Finding max/min with position — keep both the best value and its index/name; update both together inside the if (prelim error: forgot to save the name)."
    ],
    compare: [
      { a: "Linear search", b: "Binary search", rows: [
        ["Data must be sorted?", "No", "Yes"],
        ["Method", "Check each element in order", "Halve the search range each step"],
        ["Worst-case comparisons (1000 items)", "1000", "About 10"],
        ["Best for", "Small or unsorted arrays", "Large sorted arrays"],
        ["Complexity", "Simple", "More complex to code"]
      ] },
      { a: "Bubble sort", b: "Selection sort", rows: [
        ["How", "Compare and swap adjacent pairs repeatedly", "Select the min/max and swap it into place"],
        ["Swaps", "Many", "At most one per pass (improved version)"],
        ["Early stop", "Yes, with a swap flag", "No: always does every pass"],
        ["Good when", "Data nearly sorted", "Swaps are expensive"]
      ] }
    ],
    pitfalls: [
      "Saying binary search works on any array: it needs sorted data.",
      "Forgetting the temp variable when describing a swap.",
      "Inserting by shifting left-to-right, which overwrites values. Shift from the end backwards.",
      "Search loops that keep going after the item is found, or that return position + 1 when the index is wanted (May 2023)."
    ],
    years: [2020, 2023],
    priority: 2
  },

  {
    id: "sol-sql-theory",
    section: "E: Data & Solution Development",
    title: "SQL in theory: reading, writing & fixing queries",
    summary: "SQL questions that can appear in Paper 2: reading a query and saying what it returns, completing or correcting a statement (AND vs OR, SUM vs COUNT, missing WHERE), GROUP BY and HAVING, aggregate functions, joins across tables, subqueries, and SQL injection.",
    points: [
      "SELECT basics — SELECT fields FROM table WHERE condition ORDER BY field ASC/DESC. DISTINCT removes duplicate rows; TOP/LIMIT restricts the number of rows; AS renames a column (alias) or calculated field.",
      "Conditions — relational operators (=, <>, <, >, <=, >=); logical AND (both true), OR (either true), NOT; BETWEEN x AND y (inclusive); IN ('Cape Town', 'Durban'); LIKE with wildcards (Access: * and ?; standard SQL: % and _); IS NULL. Use brackets when mixing AND and OR.",
      "AND vs OR mistakes — WHERE City = 'Durban' AND City = 'Cape Town' returns nothing, because one field can't hold both values at once; use OR or IN (May 2023).",
      "Aggregate functions — COUNT (number of records; works on any field type), SUM and AVG (numeric fields only), MIN, MAX. SUM on a text field like PassengerID is an error: use COUNT (May 2023, prelim).",
      "GROUP BY — groups rows with the same value so aggregates are calculated per group (e.g. total deliveries per agent). Every non-aggregate field in the SELECT must be in the GROUP BY. HAVING filters groups after aggregation (e.g. HAVING MAX(Distance) >= 2); WHERE filters individual rows before grouping (2016, 2020).",
      "Calculated fields — arithmetic (Price * Qty AS Total), ROUND, INT, MOD/DIV, string functions (LEFT, RIGHT, MID, LEN), date functions (NOW, YEAR, MONTH, DAY), concatenation.",
      "Modifying data — INSERT INTO table (fields) VALUES (...); UPDATE table SET field = value WHERE condition; DELETE FROM table WHERE condition. UPDATE or DELETE without a WHERE clause affects EVERY record (2020: swapping Yes/No values with two UPDATEs destroys the data unless a temporary value is used).",
      "Joins — INNER JOIN (or WHERE tblA.key = tblB.key) returns only rows with matching keys in both tables. LEFT/RIGHT JOIN keeps all rows from one table even if there is no match (unmatched fields are NULL), which is useful for finding records with no related records.",
      "Subqueries — a query nested inside another, e.g. WHERE Price > (SELECT AVG(Price) FROM tblStock), or WHERE ID NOT IN (SELECT CustomerID FROM tblOrders) to find customers who never ordered.",
      "INSERT with SELECT — copies the result of a query into another table.",
      "SQL injection — entering SQL code in an input field so it becomes part of the query (' OR 1=1). Prevent with parameterised queries/prepared statements and input validation (2023).",
      "Reading a query — say in plain English what it lists, for which records, grouped/ordered how, e.g. 'shows each agent's name and the number of late deliveries, highest first'."
    ],
    compare: [
      { a: "WHERE", b: "HAVING", rows: [
        ["Filters", "Individual rows", "Groups"],
        ["When", "Before GROUP BY", "After GROUP BY/aggregation"],
        ["Aggregates allowed?", "No", "Yes (e.g. HAVING COUNT(*) > 5)"]
      ] },
      { a: "INNER JOIN", b: "LEFT JOIN", rows: [
        ["Returns", "Only rows with matching keys in both tables", "All rows from the left table + matches (NULL if none)"],
        ["Use", "Orders with their customer details", "All customers, including those with no orders"]
      ] },
      { a: "COUNT", b: "SUM", rows: [
        ["Does", "Counts records/values", "Adds up numeric values"],
        ["Field types", "Any", "Numeric only"],
        ["Example", "COUNT(PassengerID) = number of bookings", "SUM(Price) = total income"]
      ] }
    ],
    pitfalls: [
      "UPDATE/DELETE with no WHERE clause.",
      "Using WHERE with an aggregate instead of HAVING.",
      "Selecting a non-grouped field with GROUP BY.",
      "Text values without quotes, or numeric values with quotes.",
      "AND where OR is needed for two values of the same field."
    ],
    years: [2016, 2020, 2023],
    priority: 2
  },

  {
    id: "sol-sdlc-ui",
    section: "E: Data & Solution Development",
    title: "Software development life cycle, testing & user-interface design",
    summary: "How software is developed (analysis, design, coding, testing, implementation, maintenance), testing levels and approaches, design tools, and good user-interface design for desktop and mobile apps (structure, simplicity, visibility, feedback, tolerance, reuse) plus help systems and documentation.",
    points: [
      "SDLC — Software Development Life Cycle: a structured process for building software. Analysis: understand the problem and requirements (inputs, outputs, processing, constraints, users; decomposition and abstraction). Design: plan the solution (UI design, class diagrams, data/storage design, algorithms in pseudocode/flowcharts). Coding/implementation: write the program. Testing: check it works and meets requirements. Deployment and maintenance: install, train users, fix bugs and add features. The stages are iterative.",
      "Development approaches — waterfall (each phase finished before the next, suits fixed requirements) vs agile/iterative (short cycles with working versions and constant user feedback, suits changing requirements).",
      "Testing levels — unit testing (each method/class on its own), integration testing (parts working together), system testing (whole program against the specification), user acceptance testing (real users confirm it meets their needs; alpha in-house, beta with outside users).",
      "Testing approaches — black-box (test inputs and outputs against the spec without looking at code) vs white-box (test internal logic paths, using trace tables). Use normal, boundary and erroneous test data.",
      "Design-phase tools — class diagrams/UML (plan classes, fields, methods and relationships before coding; communicate with the team; spot reuse), structure diagrams, flowcharts, pseudocode, wireframes/mock-ups of screens, data dictionaries.",
      "UI principles (SAGS) — Structure: organise the UI meaningfully, grouping related items. Simplicity: uncluttered, common tasks easy. Visibility: all needed options visible, nothing distracting. Feedback: keep users informed of actions, progress and errors. Tolerance: prevent and forgive mistakes (validation components, undo, confirmations). Reuse: consistent components and behaviour so users don't have to relearn.",
      "Good UI practice — clear prompts and labels; descriptive error messages that suggest the fix; metaphors and icons (a printer picture on the print button); consistent standards (F1 for help, Esc to cancel); effective colour and contrast; components that validate (drop-downs, date pickers, radio buttons); accessibility (font size, screen readers).",
      "Desktop vs mobile UI — desktop: large screen, mouse precision, keyboard shortcuts, multiple windows, menus. Mobile: small screen, touch targets big enough for fingers, gestures, minimal typing, one task per screen, portrait/landscape, works offline and on slow data.",
      "Website usability — readability, simple navigation (three-click rule), consistency across pages, layout, typography and colour, fast loading, responsive design.",
      "Help systems — context-sensitive help (help about the current screen/field), tooltips, FAQs, menus, search, tutorials; mobile apps rely on intuitive design instead of manuals.",
      "Documentation — specification, design, technical (for programmers: code comments, class descriptions, APIs) and user documentation."
    ],
    compare: [
      { a: "Desktop UI", b: "Mobile UI", rows: [
        ["Input", "Mouse and keyboard; precise", "Touch, gestures, voice; less precise"],
        ["Screen", "Large; many items, menus, windows", "Small; one task per screen"],
        ["Design focus", "Shortcuts, detailed menus", "Large touch targets, minimal typing, offline use"]
      ] },
      { a: "Black-box testing", b: "White-box testing", rows: [
        ["Looks at", "Inputs and outputs only", "Internal code and logic paths"],
        ["Done by", "Testers/users", "Programmers"],
        ["Example", "Enter a booking and check the confirmation", "Trace each branch of an if statement"]
      ] },
      { a: "Waterfall", b: "Agile", rows: [
        ["Flow", "Sequential phases", "Short iterative cycles"],
        ["Changes", "Hard once a phase is done", "Expected and welcomed"],
        ["User involvement", "Mostly at the start and end", "Throughout"]
      ] }
    ],
    pitfalls: [
      "UI answers like 'make it look nice'. Name the principle (feedback, tolerance, consistency) and give a concrete example from the app.",
      "Mixing up the analysis phase (what the problem is) with the design phase (how to solve it).",
      "Saying testing only happens at the end: it happens throughout (iterative)."
    ],
    years: [2016, 2024, 2025],
    priority: 2
  },

  {
    id: "sol-boolean-logic",
    section: "E: Data & Solution Development",
    title: "Boolean logic & truth tables",
    summary: "Evaluating and writing Boolean expressions with AND (.), OR (+) and NOT ('), completing truth tables for up to four variables, writing the sum-of-products function from a table, De Morgan's laws to find the opposite condition, and using Boolean logic in code, SQL and search engines. A truth table worth 6–10 marks has appeared every year from 2021 to 2025.",
    points: [
      "Notation — A.B means A AND B (true only when both are true); A + B means A OR B (true when at least one is true); A' (or NOT A, Ā) means NOT A (the opposite). 1 = TRUE, 0 = FALSE.",
      "Order of operations — brackets first, then NOT, then AND, then OR. Always add brackets to make the meaning clear: M.G + M'.G.W means (M.G) + (M'.G.W).",
      "Truth table rows — n variables give 2^n rows: 3 variables → 8 rows, 4 variables → 16 rows. List inputs in binary counting order (000, 001, 010 ... 111), the first column changing slowest.",
      "Completing a truth table — fill one intermediate column at a time (e.g. T', then T' + W, then O.(T' + W)), working from the given column headings, then write the RESULT column as TRUE/FALSE if the table asks for it.",
      "Sum of products (writing the function) — for every row where the result is 1, write an AND term using each variable (primed if it's 0 in that row), then OR the terms together. E.g. rows 101, 110, 111 → F = W.C'.H + W.C.H' + W.C.H (2022, 2024, May 2025).",
      "Translating words to logic — 'and' → AND; 'or' → OR; 'not/no/hasn't' → NOT. Read exactly what each variable means as defined in the question (e.g. T = has NO traffic fines), and when the paper gives the function, use it exactly as printed rather than rewriting it from the words.",
      "De Morgan's laws — (A.B)' = A' + B' and (A + B)' = A'.B'. To find the opposite (inverse) of a condition, negate each variable and swap AND↔OR. Example (2025): the opposite of O.(T' + W) is O' + (T.W'). Two functions are inverses if their result columns are opposite in every row (May 2023, 2025).",
      "Useful identities — A.1 = A, A + 0 = A, A.0 = 0, A + 1 = 1, A.A' = 0, A + A' = 1, A + A.B = A (absorption), A.B + A.C = A.(B + C) (factorising). These help spot that, for example, (T.A + T.R) + T.A.R simplifies to T.(A + R).",
      "Logic gates — physical circuits that implement Boolean operators: AND gate, OR gate, NOT gate (inverter), plus NAND (NOT AND), NOR (NOT OR) and XOR (exclusive OR: true when exactly one input is true). Used in CPUs, alarms and control systems (e.g. an alarm sounds if a door is open AND the system is armed).",
      "Boolean logic in programming — compound if conditions with && / || / ! (Java) or and / or / not (Delphi); short-circuit evaluation; Boolean flags in loops.",
      "Boolean logic in SQL and search engines — WHERE conditions with AND/OR/NOT and brackets; search operators (AND narrows a search, OR widens it, NOT/minus excludes)."
    ],
    compare: [
      { a: "AND (.)", b: "OR (+)", rows: [
        ["True when", "ALL inputs are true", "AT LEAST ONE input is true"],
        ["Rows true (2 inputs)", "1 of 4", "3 of 4"],
        ["In searches", "Narrows results", "Widens results"],
        ["De Morgan opposite", "(A.B)' = A' + B'", "(A + B)' = A'.B'"]
      ] },
      { a: "Original condition", b: "Inverse (opposite) condition", rows: [
        ["Example", "O.(T' + W)", "O' + (T.W')"],
        ["Rule", "-", "Negate every variable, swap . and +"],
        ["Check", "Result column", "Every row is the opposite"]
      ] }
    ],
    pitfalls: [
      "Getting the 2^n input rows out of order. Use binary counting.",
      "Ignoring brackets/precedence and evaluating left to right.",
      "Writing the final function using the variable names in words, or listing rows that give 0.",
      "Forgetting to negate a variable that is 0 in a row when writing a product term.",
      "Mixing up notation: + means OR here, not addition; . means AND.",
      "Only completing the final column. Intermediate columns carry marks too."
    ],
    years: [2021, 2022, 2023, 2024, 2025],
    priority: 3
  },

  {
    id: "data-files-json",
    section: "E: Data & Solution Development",
    title: "Persistence: JSON, text files & databases",
    summary: "Storing data permanently outside the program: text files (delimited lines), JSON files (key-value objects and arrays) and databases, how they compare, and reading/writing JSON structures. JSON was examined in 2021, May 2023, the prelim and 2025.",
    points: [
      "Persistence — keeping data after the program closes, by saving it to secondary storage (text file, JSON file, database). RAM data (variables, arrays, objects) is lost when the program ends.",
      "Text files — plain lines of characters, often one record per line with fields separated by a delimiter such as # (e.g. Marcel#Roux#0725631212). Simple, small, readable in any editor, but no structure rules, no types, slow to search and update, no security or multi-user control. Read line by line, split on the delimiter and create objects; check the file exists (exception handling).",
      "JSON (JavaScript Object Notation) — a lightweight, human-readable, text-based format for storing and exchanging structured data between systems (web APIs, apps, config files). Language-independent: Java, Delphi, Python and others all read it, despite the 'JavaScript' in the name (2025 true/false).",
      "JSON structure — an object is in curly braces { } and holds key-value pairs (\"name\" : \"Simo\"); keys are strings in double quotes. An array is in square brackets [ ] and holds an ordered list of values or objects separated by commas. Objects and arrays can be nested, giving a hierarchical structure (2021: the items are key-value pairs/name-value pairs).",
      "JSON data types — string, number, object, array, Boolean (true/false) and null (2025).",
      "JSON array of objects example — { \"Gardeners\" : [ { \"name\" : \"Simo\", \"skills\" : \"wep\" }, { \"name\" : \"Wilbert\", \"skills\" : \"lwe\" } ] } (2021 asked you to complete this structure). To mimic a class, use only the instance fields as keys.",
      "Advantages of JSON — flexible structure (one object or an array of nested objects), readable by humans and easy for programs to parse, compact compared with XML, language-independent, the standard for web APIs and mobile apps (prelim).",
      "Databases — structured tables with data types, keys, validation, relationships, SQL querying, security, multi-user access and backup/recovery; best for large amounts of related data that many users search and update. More complex to set up, and need a DBMS.",
      "Choosing — text file: small, simple lists or logs. JSON: hierarchical/complex objects, sending data between systems, settings. Database: many related records, searching/reporting, several users (2024 asked for two suitable data structures with justification)."
    ],
    compare: [
      { a: "Text file", b: "JSON file", rows: [
        ["Structure", "Lines with delimited fields; no built-in structure", "Key-value objects and arrays, nested"],
        ["Data types", "Everything is text", "String, number, Boolean, null, object, array"],
        ["Self-describing?", "No: you must know the field order", "Yes: keys name each value"],
        ["Best for", "Simple lists and logs", "Complex objects; exchanging data via APIs"]
      ] },
      { a: "JSON file", b: "Database", rows: [
        ["Querying", "Must load and search in code", "SQL queries, indexes, fast searches"],
        ["Multi-user / security", "None built in", "User rights, locking, encryption"],
        ["Integrity", "No enforced rules", "Data types, keys, validation, referential integrity"],
        ["Setup", "Very simple, portable", "Needs a DBMS and design"]
      ] }
    ],
    pitfalls: [
      "Saying JSON can only be used with JavaScript.",
      "Using single quotes or forgetting the double quotes around JSON keys and string values.",
      "Forgetting commas between objects in an array, or using { } where [ ] is needed for the array.",
      "Recommending a text file for data that many staff must search and update at once."
    ],
    years: [2021, 2023, 2024, 2025],
    priority: 3
  },

  /* =====================================================================
   * EXAM TECHNIQUE
   * ===================================================================== */
  {
    id: "exam-technique",
    section: "Exam technique",
    title: "Exam technique for IT Paper 2",
    summary: "How marks are actually awarded in the 150-mark, 3-hour theory paper: one mark per distinct, relevant point, answers tied to the scenario, and the instruction verb (name, describe, explain, compare, justify) deciding how much to write. About 1 minute per mark.",
    points: [
      "Time — 150 marks in 180 minutes is about 1 minute per mark. Do Section A definitions and Q2 matching quickly (about 15 minutes), and leave about 35–40 minutes for Section E (UML + trace table + truth table).",
      "Marks = points — a 2-mark 'explain' needs two distinct facts; a 4-mark compare needs two points for each side. Don't write a paragraph that makes one point in four ways.",
      "Section weights — roughly System Technologies 40, Internet & Communication 45, Social 15, Data & Solution Development 50 (Q7+Q8 in recent papers carry 45–50 marks).",
      "Name/State/List — one or two words or a short phrase per mark, no explanation needed. Describe — say what it is or what it does. Explain — give the reason/how/why ('because ...', 'so that ...'). Discuss — several points, both sides. Compare/Distinguish — say how BOTH differ on the same aspect. Justify — choose AND give a scenario-based reason; the tick-box mark is lost if the justification is missing.",
      "Relate to the scenario — when the question mentions the business (salon, dark store, farm, gym), every point should mention it: not 'cloud is scalable' but 'the second salon can be added to the same cloud bookings system without buying a server'.",
      "No opposites — when asked for an advantage and a disadvantage (or similarity and difference), they must not be mirror images of each other. The memo awards only one.",
      "Avoid vague words — 'faster', 'better', 'easier', 'cheaper' and 'more efficient' score nothing on their own. Say what is faster and why (e.g. 'SSD has no moving parts, so files load faster').",
      "Definitions (Q1) — give the exact technical term (e.g. 'virtual memory', 'attenuation', 'polymorphism/overriding'), not a description. Spelling must be recognisable. Acronyms are usually accepted, but give the full term when asked for the full name (POPIA).",
      "Matching and MCQ — read every option; eliminate absolute words ('always', 'only', 'never'), which are usually wrong. Distractors are often near-definitions (deep web vs dark web).",
      "Trace tables — line numbers on every row, one change per row, record conditions as True/False, include the final output/return. Then answer the 'which line is wrong and fix it' questions using the evidence from your trace.",
      "UML — follow every access instruction exactly (-, +, #), include types for every field and parameter, return types for typed methods, underline static fields and constants.",
      "Truth tables — fill every intermediate column, count rows 000 to 111, then write the function as a sum of products for rows that are 1.",
      "Calculations — show working (cache miss ratio, RAM totals, IPv6 bits, colour combinations); method marks are awarded even if the final answer is wrong.",
      "Don't repeat the example given in the question — the memo states it won't be credited. Each answer in a table must also be different.",
      "If unsure, still write something technical and relevant: there is no negative marking. Use the additional space page and label the question number clearly."
    ],
    compare: [
      { a: "Weak answer", b: "Full-mark answer", rows: [
        ["SSD advantage", "It's faster", "No moving parts, so data access and boot times are much faster than an HDD"],
        ["Cloud backup", "It's safe", "Copies are stored off-site, so salon bookings survive theft or fire at the shop"],
        ["Firewall", "Protects the network", "Filters incoming/outgoing traffic by rules, blocking unauthorised access from customers on the Wi-Fi"],
        ["5G latency", "Less lag", "Shorter delay (ms) for data to travel, so scanners update stock in real time"]
      ] },
      { a: "Describe", b: "Explain", rows: [
        ["Asks for", "What it is / what it does", "Why or how it works, with a reason"],
        ["Key words", "'It is ...', 'It does ...'", "'because ...', 'so that ...', 'which means ...'"]
      ] }
    ],
    pitfalls: [
      "Answering a different question from the one asked (e.g. describing a router when asked how it differs from a switch).",
      "Generic textbook answers in an Application question. Mention the scenario.",
      "Spending too long on Section B and rushing the Section E trace and truth tables, which are the most predictable marks.",
      "Writing the same point twice with different wording to fill space.",
      "Leaving blanks: an educated technical guess can still earn marks."
    ],
    years: [2016, 2020, 2021, 2022, 2023, 2024, 2025],
    priority: 3
  }
];
