/* IEB IT Paper 2 glossary. Own-words, exam-length definitions.
   years = years the term was examined as a definition / matching / MCQ item
   (Q1 definitions, Q2 matching, Q4 theory MCQ) in Nov 2016, 2020-2025 and May 2023-2025 papers.
   years: [] = key SAGS term not yet asked as a definition. */
(function () {
  var G = [];
  function g(term, topic, years, def) { G.push({ term: term, def: def, topic: topic, years: years }); }

  /* ---------- B: System Technologies — CPU & performance ---------- */
  g("Overclocking", "sys-cpu-performance", [2022, 2024, 2025],
    "Running a component (usually the CPU or GPU) at a higher clock speed than the manufacturer's rated speed to gain performance; it creates extra heat and can cause instability or a shorter lifespan.");
  g("Clock multiplication (clock multiplier)", "sys-cpu-performance", [2025],
    "The CPU's internal speed is a multiple of the external base/bus clock; raising the multiplier makes the CPU run faster than the bus that feeds it.");
  g("System clock", "sys-hardware", [2021, 2024],
    "A quartz-crystal component on the motherboard that sends out a steady high-frequency pulse so that all components work in step (synchronises events).");
  g("Cache", "sys-cpu-performance", [2024],
    "Small, very fast memory (SRAM) on or very close to the CPU that holds recently or frequently used data and instructions so the CPU does not have to wait for slower RAM.");
  g("Register", "sys-cpu-performance", [2023, 2024, 2025],
    "A tiny, extremely fast storage location inside the CPU that holds the instruction, data or address currently being processed.");
  g("Arithmetic Logic Unit (ALU)", "sys-cpu-performance", [2024],
    "The part of the CPU that performs arithmetic (integer) calculations and logical comparisons such as AND, OR and greater-than.");
  g("Control Unit (CU)", "sys-cpu-performance", [2016, 2022],
    "The part of the CPU that directs and coordinates all activity: it fetches and decodes instructions and sends control signals to the other components.");
  g("Machine cycle", "sys-cpu-performance", [2022],
    "The repeated sequence the CPU follows for every instruction: fetch, decode, execute and store (write back the result).");
  g("Fetch", "sys-cpu-performance", [2024, 2025],
    "The first stage of the machine cycle, in which the next instruction is retrieved from main memory (RAM) into the CPU.");
  g("Decode", "sys-cpu-performance", [2023],
    "The stage of the machine cycle in which the control unit interprets the instruction and translates it into signals/commands the CPU can carry out.");
  g("Execute", "sys-cpu-performance", [2022],
    "The stage of the machine cycle in which the decoded instruction is carried out, e.g. the ALU performs a calculation.");
  g("Multitasking", "sys-os", [2024, 2025],
    "The operating system switches the CPU rapidly between several programs so that they appear to run at the same time.");
  g("Multithreading", "sys-cpu-performance", [],
    "Splitting one program into smaller independent threads that can be scheduled and run concurrently, so one part of the program keeps working while another waits.");
  g("Hyper-threading", "sys-cpu-performance", [2021, 2024],
    "Intel hardware technology in which one physical core duplicates some parts (e.g. registers) so it appears as two logical cores and can run two threads at once.");
  g("Multiprocessing", "sys-cpu-performance", [2025],
    "Using two or more CPUs or cores to process different tasks (or parts of a task) in parallel, increasing processing speed.");
  g("Multi-core processor", "sys-cpu-performance", [],
    "A single CPU chip containing two or more independent processing cores, each able to execute instructions at the same time.");
  g("Graphics Processing Unit (GPU)", "sys-cpu-performance", [2024],
    "A specialised processor with many simple cores designed for parallel processing of graphics and images, which takes this work off the CPU.");
  g("Word size", "sys-cpu-performance", [],
    "The number of bits the CPU can process in one operation (e.g. 64-bit); a larger word size means more data handled per cycle and more addressable memory.");
  g("Latency", "sys-cpu-performance", [2022, 2024, 2025],
    "The delay between an instruction or request being given and the response (or data transfer) actually starting.");
  g("Throughput", "net-wireless-mobile", [2024],
    "The amount of data actually transferred successfully per unit of time (always less than or equal to the bandwidth).");

  /* ---------- Hardware ---------- */
  g("Bus", "sys-hardware", [2022, 2023, 2024, 2025],
    "A set of parallel electrical pathways on the motherboard along which data, addresses or control signals travel between components.");
  g("Data bus", "sys-hardware", [],
    "The bidirectional bus that carries the actual data between the CPU, memory and other components.");
  g("Address bus", "sys-hardware", [2021],
    "The unidirectional bus that carries memory addresses from the CPU to memory; its width determines how much memory can be addressed.");
  g("Front-side bus (FSB)", "sys-hardware", [2016, 2023],
    "The main bus on the motherboard that connects the CPU to main memory (RAM) via the chipset.");
  g("SATA", "sys-hardware", [2020, 2021, 2023, 2024],
    "Serial ATA: a bus interface used to connect mass storage devices such as hard drives, SSDs and optical drives to the motherboard.");
  g("PCI Express (PCIe)", "sys-hardware", [],
    "A very fast serial expansion bus/slot on the motherboard used for graphics cards, NVMe SSDs and other expansion cards.");
  g("USB", "sys-hardware", [2020],
    "Universal Serial Bus: a standard connection for peripherals that carries data and power, supports hot-swapping and plug-and-play.");
  g("Port", "sys-hardware", [2025],
    "An external connection point on a computer (e.g. USB, HDMI) into which a device or cable is plugged.");
  g("I/O controller", "sys-hardware", [2025],
    "A hardware device (controller) that manages communication between the CPU and an external device such as a keyboard, printer or drive.");
  g("Interrupt (IRQ)", "sys-os", [2024, 2025],
    "A signal from hardware or software to the CPU indicating that an event needs immediate attention, so the CPU pauses its current task to handle it. IRQ = the line/number a device uses to send it.");
  g("I/O range (I/O address)", "sys-os", [2023],
    "A block of memory addresses reserved for a particular device, through which the CPU sends and receives data to and from that device.");
  g("Plug and play", "sys-os", [2020],
    "The operating system automatically detects a newly connected device and loads/configures its driver without the user having to set it up.");
  g("Hot swapping", "sys-hardware", [],
    "Connecting or removing a device while the computer is switched on and running, without needing to restart it.");
  g("Modular design", "sys-hardware", [2020, 2021, 2024],
    "Building a computer from separate, standard components (modules) that can each be individually replaced, repaired or upgraded.");
  g("Uninterruptible Power Supply (UPS)", "sys-hardware", [],
    "A battery backup device that keeps a computer running for a short time during a power failure so work can be saved and the system shut down safely; it also protects against surges.");

  /* ---------- Memory & storage ---------- */
  g("Virtual memory", "sys-memory-storage", [2021, 2023, 2024, 2025],
    "A memory management technique in which part of secondary storage (disk) is used as if it were extra RAM when physical RAM is full.");
  g("Paging / swapping", "sys-memory-storage", [],
    "Moving fixed-size blocks (pages) of memory between RAM and the page file on disk; too much swapping (thrashing) slows the computer down.");
  g("RAM", "sys-memory-storage", [],
    "Random Access Memory: volatile primary memory that temporarily holds the programs and data currently in use; its contents are lost when the power is off.");
  g("ROM", "sys-memory-storage", [],
    "Read Only Memory: non-volatile memory whose contents are not lost when power is off, used to store firmware such as the BIOS/UEFI.");
  g("SRAM (Static RAM)", "sys-memory-storage", [2021, 2024],
    "Fast, expensive RAM that does not need to be refreshed while powered; used for cache memory and registers.");
  g("DRAM (Dynamic RAM)", "sys-memory-storage", [],
    "Cheaper, denser RAM that must be refreshed thousands of times per second; used as main memory.");
  g("Flash memory", "sys-memory-storage", [2024],
    "Electronic, non-volatile storage with no moving parts that can be electrically erased and rewritten, used in SSDs, USB drives and SD cards.");
  g("Solid State Drive (SSD)", "sys-memory-storage", [2023],
    "A secondary storage device that uses flash memory and has no mechanical parts, making it faster, quieter and more shock-resistant than an HDD.");
  g("Hard Disk Drive (HDD)", "sys-memory-storage", [],
    "Mechanical secondary storage that stores data magnetically on spinning platters read by a moving head; cheap per GB but slower and fragile.");
  g("CMOS", "sys-memory-storage", [2016, 2023],
    "A small battery-powered memory chip that stores the BIOS/UEFI configuration settings such as date, time and boot order.");
  g("RAID", "sys-memory-storage", [2016, 2024],
    "Redundant Array of Independent Disks: several hard drives used together as one unit to protect data (redundancy) and/or improve speed.");
  g("RAID 1 (mirroring)", "sys-memory-storage", [2025],
    "A RAID level that writes identical copies of the data to two (or more) disks, so if one disk fails the data is still available on the other.");
  g("RAID 5 (striping with parity)", "sys-memory-storage", [],
    "A RAID level that spreads data and parity information across at least three disks so that the data can be rebuilt if any one disk fails.");
  g("Cloud storage", "sys-memory-storage", [2024],
    "Storing files on remote servers run by a provider and accessed over the Internet (e.g. Google Drive, OneDrive).");

  /* ---------- Operating system & firmware ---------- */
  g("Operating system (OS)", "sys-os", [],
    "System software that provides a user interface, loads and runs programs and manages the computer's resources (CPU, memory, storage and devices).");
  g("Kernel", "sys-os", [2024],
    "The core of the operating system that stays in memory and controls access to the CPU, memory and devices.");
  g("BIOS", "sys-os", [2023, 2024, 2025],
    "Basic Input/Output System: firmware in ROM that runs the POST and starts the boot process by loading the operating system.");
  g("UEFI", "sys-os", [2023, 2024],
    "Unified Extensible Firmware Interface: the modern replacement for BIOS that links firmware to the OS and supports drives larger than 2 TB, faster booting, Secure Boot and a graphical interface.");
  g("POST", "sys-os", [],
    "Power-On Self-Test: checks done by the BIOS/UEFI at start-up to confirm that essential hardware (RAM, keyboard, drives) is present and working.");
  g("Firmware", "sys-os", [2020],
    "Permanent software programmed into a ROM/flash chip on a device that controls the hardware at a basic level (e.g. BIOS/UEFI).");
  g("Device driver", "sys-os", [],
    "Software that allows the operating system to communicate with and control a specific hardware device.");

  /* ---------- Software, utilities, licensing, compression ---------- */
  g("Utility software", "sys-software", [],
    "System software that maintains, protects or optimises the computer, e.g. anti-virus, backup, compression and disk defragmenter.");
  g("Defragmentation", "sys-software", [2023],
    "Rearranging the fragmented pieces of files on an HDD so that each file is stored in contiguous blocks, which speeds up reading; not needed on SSDs.");
  g("Anti-malware (anti-virus)", "sys-software", [2023],
    "Software that scans for, detects, quarantines and removes malicious programs, usually using signatures and behaviour analysis that must be kept updated.");
  g("Open-source software", "sys-software", [],
    "Software whose source code is freely available so anyone can use, modify and redistribute it (e.g. Linux, Android).");
  g("Proprietary software", "sys-software", [],
    "Software owned by a company that keeps its source code secret; users buy a licence to use it but may not modify or copy it (e.g. Windows).");
  g("Freeware", "sys-software", [],
    "Copyrighted software that may be used free of charge, but whose source code is not available and may not be changed.");
  g("Freemium", "sys-software", [2023],
    "A licensing model where the basic version is free but the user must pay to unlock premium (restricted) features.");
  g("Creative Commons", "soc-ethics-law", [2025],
    "A set of licences that let creators allow others to share, use and adapt their work under conditions they choose, usually that the original creator is credited.");
  g("Lossless compression", "sys-software", [2021, 2023, 2024],
    "Compression that reduces file size without losing any data, so the restored file is identical to the original (e.g. ZIP, PNG).");
  g("Lossy compression", "sys-software", [2023, 2025],
    "Compression that makes files much smaller by permanently discarding data the user is unlikely to notice (e.g. JPEG, MP3), lowering quality.");
  g("Backup", "sys-software", [],
    "A copy of data kept separately (locally or off-site/in the cloud) so it can be restored if the original is lost, damaged or encrypted.");

  /* ---------- Translators & languages ---------- */
  g("Interpreter", "sys-translators", [2023],
    "A translator that converts and executes source code one line (statement) at a time, without producing a separate executable file.");
  g("Compiler", "sys-translators", [2023],
    "A translator that converts the whole high-level source program into machine/object code before it runs, producing an executable file.");
  g("Assembler", "sys-translators", [2024],
    "A translator that converts assembly (low-level) language into machine code.");
  g("High-level language", "sys-translators", [2021, 2022, 2025],
    "A programming language with English-like instructions that hides hardware details and is machine-independent, so it must be translated (e.g. Java, Delphi, Python).");
  g("Low-level language", "sys-translators", [],
    "A language close to the hardware (machine code or assembly) that is specific to one type of processor.");
  g("Source code", "sys-translators", [2022],
    "The program instructions as written by the programmer in a programming language, before translation.");
  g("Bytecode", "sys-translators", [],
    "Intermediate, platform-independent code produced by a first-stage compiler (e.g. Java) that a virtual machine then interprets or compiles for the specific processor.");
  g("Integrated Development Environment (IDE)", "sys-translators", [],
    "Software that combines a code editor, translator, debugger and other tools in one program for writing and testing code (e.g. NetBeans, Delphi).");

  /* ---------- Virtualisation & clients ---------- */
  g("Thin client", "sys-virtualisation", [2021, 2023, 2025],
    "A low-cost computer with minimal processing power and storage that relies on a central server for processing and storing data.");
  g("Virtual machine", "sys-virtualisation", [],
    "Software that imitates a complete computer, allowing another operating system to run inside a window on the host computer.");

  /* ---------- Mobile & IoT ---------- */
  g("Internet of Things (IoT)", "sys-mobile-iot", [2023, 2024],
    "Everyday physical devices fitted with sensors, processors and connectivity so they can collect data and communicate over the Internet without human input (e.g. smart meters).");
  g("Embedded system", "sys-mobile-iot", [],
    "A computer built into a larger device to perform one dedicated function (e.g. the controller in a washing machine or car).");
  g("Tablet / phablet", "sys-mobile-iot", [2020],
    "A portable touch-screen device with a rechargeable battery, larger than a smartphone but smaller than a laptop (a phablet sits between phone and tablet).");
  g("Digital device convergence", "sys-mobile-iot", [],
    "The combining of many technologies and functions (phone, camera, GPS, music player, computer) into one device such as a smartphone.");

  /* ---------- C: Network types ---------- */
  g("PAN", "net-types", [2016],
    "Personal Area Network: a network of devices around one person, typically within about 10 m, usually connected by Bluetooth.");
  g("LAN", "net-types", [2025],
    "Local Area Network: a network covering a small area such as a building or school, usually owned by one organisation.");
  g("WAN", "net-types", [],
    "Wide Area Network: a network spread over a large geographical area that connects LANs, often using leased lines (the Internet is the largest WAN).");
  g("VPN", "net-types", [2021, 2022, 2025],
    "Virtual Private Network: an encrypted 'tunnel' over a public network (the Internet) that extends a private network so remote users can connect securely and privately.");
  g("Intranet", "net-types", [],
    "A private network inside an organisation that uses Internet technologies (web pages, email) but is only accessible to its own staff.");
  g("Client-server network", "net-types", [],
    "A network where central servers provide services (files, email, authentication) to client computers that request them.");
  g("Peer-to-peer (P2P)", "net-types", [2025],
    "A network or file-sharing model where all computers are equal and share resources directly with each other without a central server.");

  /* ---------- Network hardware, media, topology ---------- */
  g("Network Interface Card (NIC)", "net-hardware-media", [],
    "The hardware that connects a device to a network; it has a unique MAC address.");
  g("Switch", "net-hardware-media", [],
    "A device that connects devices on a LAN and sends each frame only to the port of the destination device (using MAC addresses).");
  g("Router", "net-hardware-media", [],
    "A device that connects different networks (e.g. a LAN to the Internet) and directs packets along the best path using IP addresses.");
  g("Bridge", "net-hardware-media", [2021],
    "A device that connects two LAN segments and filters traffic between them, reducing unnecessary traffic.");
  g("Wireless bridge", "net-hardware-media", [2024],
    "A device that wirelessly connects two separate LANs (e.g. in two buildings) so they work as one network.");
  g("Gateway", "net-hardware-media", [2020],
    "A device that connects two dissimilar networks that use different protocols, translating between them.");
  g("Wireless Access Point (WAP)", "net-hardware-media", [],
    "A device connected to a wired network that lets wireless devices join that network using Wi-Fi.");
  g("Network topology", "net-hardware-media", [2024],
    "The physical layout or arrangement of the nodes and connections in a network (e.g. star, bus, mesh).");
  g("Star topology", "net-hardware-media", [2021],
    "A layout in which every node is connected to a central switch; one cable failing affects only that node, but the switch is a single point of failure.");
  g("Mesh topology", "net-hardware-media", [2024],
    "A layout in which nodes are interconnected with multiple paths and cooperate to pass data, so the network still works if one link fails.");
  g("Wireless mesh network", "net-hardware-media", [2020],
    "A wireless network of many nodes/access points, each acting as a router, so devices can connect to any point and data finds alternative routes.");
  g("Hybrid topology", "net-hardware-media", [2021],
    "A network layout that combines two or more different topologies (e.g. several stars joined by a bus).");
  g("UTP cable", "net-hardware-media", [2020],
    "Unshielded Twisted Pair: common, cheap copper network cable made of pairs of wires twisted together to reduce interference.");
  g("Fibre-optic cable", "net-hardware-media", [2021, 2022],
    "Cable that transmits data as pulses of light through glass/plastic strands, giving very high bandwidth over long distances with no EMI.");
  g("Attenuation", "net-hardware-media", [2025],
    "The loss of signal strength as a signal travels over distance through a medium.");
  g("Crosstalk", "net-hardware-media", [],
    "Interference when a signal in one wire leaks into a neighbouring wire, corrupting data.");
  g("EMI (electromagnetic interference)", "net-hardware-media", [2022],
    "Disruption of signals in copper cables caused by nearby electrical sources such as motors or power cables; fibre-optic cable is not affected.");

  /* ---------- Protocols ---------- */
  g("Protocol", "net-protocols", [2022],
    "A set of rules that govern how data is formatted and exchanged between devices or systems so they can communicate.");
  g("TCP/IP", "net-protocols", [],
    "The main suite of Internet protocols: IP addresses and routes packets, while TCP splits data into packets and makes sure they all arrive correctly and in order.");
  g("TCP", "net-protocols", [2024],
    "Transmission Control Protocol: connection-oriented protocol that guarantees delivery by numbering packets, checking for errors and re-sending lost ones.");
  g("UDP", "net-protocols", [2020, 2024],
    "User Datagram Protocol: a fast, connectionless protocol with no guarantee of delivery or order, used for streaming, gaming and VoIP.");
  g("HTTP", "net-protocols", [2016, 2022, 2025],
    "HyperText Transfer Protocol: the protocol a browser uses to request web pages from a web server and transfer them to the client.");
  g("HTTPS", "net-protocols", [2023, 2025],
    "HTTP Secure: HTTP combined with SSL/TLS encryption so that web pages and data are transferred securely between browser and server.");
  g("FTP", "net-protocols", [2022, 2025],
    "File Transfer Protocol: used to upload and download files between a client and a server.");
  g("WebDAV", "net-protocols", [2022, 2024, 2025],
    "Web Distributed Authoring and Versioning: an extension of HTTP that lets users create, edit, copy and move files directly on a web server and work on them collaboratively.");
  g("SMTP", "net-protocols", [2022, 2025],
    "Simple Mail Transfer Protocol: used to send email from a client to a mail server and between mail servers.");
  g("POP3", "net-protocols", [2024],
    "Post Office Protocol 3: downloads email from the mail server to one device and usually deletes it from the server.");
  g("IMAP", "net-protocols", [],
    "Internet Message Access Protocol: keeps email on the server and synchronises it, so the same mailbox can be viewed on several devices.");
  g("Ethernet", "net-protocols", [2023],
    "The most common set of standards/protocol for wired LANs, defining frames, cabling and transmission speeds.");
  g("Packet", "net-protocols", [],
    "A small unit of data sent over a network, made up of a header (source and destination addresses, sequence number), the payload and error-checking data.");
  g("Payload", "net-protocols", [2023],
    "The part of a packet or frame that carries the actual data being transmitted (not the header or trailer).");
  g("VLAN tag", "net-protocols", [2025],
    "A label added to an Ethernet frame identifying which virtual LAN it belongs to, so groups of devices on the same physical network are kept logically separate.");
  g("Broadcast", "net-protocols", [2023],
    "A transmission in which a packet is sent to all nodes on the network rather than to one specific device.");
  g("ARP", "net-protocols", [],
    "Address Resolution Protocol: finds the MAC address of a device on the LAN when its IP address is known.");
  g("BitTorrent", "net-protocols", [2020, 2021],
    "A peer-to-peer file-sharing protocol in which small pieces of a file are downloaded from, and uploaded to, many different users at the same time.");

  /* ---------- Addressing ---------- */
  g("IP address", "net-addressing", [],
    "A logical address that identifies a device on a network so data can be routed to it; it can change when the device joins a different network.");
  g("IPv4", "net-addressing", [2024],
    "32-bit IP address written as four decimal numbers from 0 to 255 (e.g. 192.168.1.1); about 4.3 billion addresses, which are running out.");
  g("IPv6", "net-addressing", [2022, 2025],
    "128-bit IP address written as eight groups of four hexadecimal digits separated by colons, giving a practically unlimited number of addresses.");
  g("MAC address", "net-addressing", [2023, 2024, 2025],
    "A unique 48-bit physical address assigned to a network card by the manufacturer, written in hexadecimal pairs (e.g. 00:1A:2B:3C:4D:5E); it does not change between networks.");
  g("DNS", "net-addressing", [2021, 2025],
    "Domain Name System: a system of servers that translates domain names (e.g. www.ieb.co.za) into IP addresses.");
  g("DHCP", "net-addressing", [2023],
    "Dynamic Host Configuration Protocol: automatically assigns an IP address (and other settings) to a device when it joins a network.");
  g("NAT", "net-addressing", [],
    "Network Address Translation: a router lets many devices with private IP addresses share one public IP address on the Internet.");

  /* ---------- Wireless & mobile ---------- */
  g("Bluetooth", "net-wireless-mobile", [2021, 2022, 2025],
    "A short-range wireless standard (about 10 m) for connecting devices such as headphones, mice and phones, typically forming a PAN.");
  g("Wi-Fi", "net-wireless-mobile", [],
    "Wireless LAN technology (IEEE 802.11) that connects devices to a network using radio waves.");
  g("Hotspot", "net-wireless-mobile", [2021],
    "A location or device that provides wireless Internet access to nearby devices (e.g. a coffee shop Wi-Fi or a phone sharing its data).");
  g("WiMAX", "net-wireless-mobile", [2020],
    "A wireless broadband standard similar to Wi-Fi but covering a much greater range (kilometres).");
  g("NFC", "net-wireless-mobile", [],
    "Near Field Communication: very short-range (a few cm) wireless communication used for contactless payments and tap-to-share.");
  g("RFID", "net-wireless-mobile", [],
    "Radio Frequency Identification: tags that store data and are read wirelessly by a reader, used for stock tracking, access cards and toll tags.");
  g("5G", "net-wireless-mobile", [2021],
    "Fifth-generation cellular technology offering much higher bandwidth, lower latency and support for many more connected devices than 4G, but with shorter range per tower.");
  g("ADSL", "net-wireless-mobile", [2021, 2023],
    "Asymmetric Digital Subscriber Line: older broadband over copper telephone lines that carries voice and data at the same time, with faster download than upload speeds.");
  g("Bandwidth", "net-wireless-mobile", [],
    "The maximum amount of data that can be transmitted over a connection per second (e.g. Mbps).");
  g("GPS", "net-wireless-mobile", [2021, 2025],
    "Global Positioning System: a satellite-based navigation system that lets a receiver calculate its exact location.");
  g("Location-Based Services (LBS)", "net-wireless-mobile", [2021, 2024],
    "Services/apps that use the location of a mobile device (from GPS, cell towers or Wi-Fi) to give relevant information, e.g. nearby shops or ride-hailing.");

  /* ---------- Internet services ---------- */
  g("Search Engine Optimisation (SEO)", "net-internet-services", [2021, 2024, 2025],
    "Techniques (keywords, metadata, quality links, fast pages) used to make a website rank higher in search results so it gets more visitors.");
  g("Reverse image search", "net-internet-services", [2021],
    "A search in which an image is used as the query to find where it appears online or similar images.");
  g("Video on demand (VoD)", "net-internet-services", [2020, 2023, 2024],
    "A service that lets users choose video content from a library and watch it whenever they want, instead of following a fixed broadcast schedule (e.g. Netflix).");
  g("Streaming", "net-internet-services", [],
    "Playing audio or video while it is being received, without first downloading the whole file; it needs a constant connection and enough bandwidth.");
  g("VoIP", "net-internet-services", [2021, 2025],
    "Voice over Internet Protocol: making voice (and video) calls over the Internet instead of the normal telephone network (e.g. WhatsApp calls, Teams).");
  g("Web 1.0", "net-internet-services", [2021, 2024, 2025],
    "The early 'read-only' web of static pages created by a few publishers, with little user interaction.");
  g("Web 2.0", "net-internet-services", [],
    "The interactive, social web where users create and share content, comment and collaborate (e.g. social media, wikis, blogs).");
  g("Web 3.0", "net-internet-services", [],
    "The 'semantic' or intelligent web, where data is linked and understood by machines (AI) to give personalised results; often linked to decentralisation/blockchain.");
  g("Social media", "net-internet-services", [2020],
    "Online platforms where users create profiles, share content and interact with others by liking, commenting and re-sharing (e.g. Instagram, TikTok).");
  g("Microblog", "net-internet-services", [2016],
    "A site where users post short, frequent updates (e.g. X/Twitter).");
  g("Deep web", "net-internet-services", [2024, 2025],
    "The part of the web not indexed by search engines (e.g. online banking pages, email inboxes, password-protected content).");
  g("Dark web", "net-internet-services", [2024],
    "A small part of the deep web that is deliberately hidden and can only be reached with special software such as Tor; it hides users' identities and is often used for illegal activity.");
  g("Cloud computing", "net-distributed", [],
    "Using processing power, software and storage that run on a provider's remote servers over the Internet, usually paid for by subscription and scalable on demand.");
  g("SaaS", "net-internet-services", [],
    "Software as a Service: complete applications run in the cloud and are used through a browser on a subscription basis (e.g. Office 365, Google Workspace).");
  g("IaaS", "net-internet-services", [],
    "Infrastructure as a Service: renting virtual hardware (servers, storage, networking) in the cloud and managing your own software on it.");

  /* ---------- Web technology ---------- */
  g("Cookie", "net-web-tech", [2024],
    "A small text file a website stores on the user's device to remember information such as login status, preferences or browsing habits.");
  g("Client-side scripting", "net-web-tech", [],
    "Code (e.g. JavaScript) that runs in the user's browser to make pages interactive and validate input without contacting the server.");
  g("Server-side scripting", "net-web-tech", [],
    "Code (e.g. PHP) that runs on the web server to build pages dynamically, often using a database, before sending them to the browser.");
  g("Native app", "net-web-tech", [],
    "An app written for one specific mobile OS and installed on the device, giving full access to hardware features and offline use.");
  g("JSON", "net-web-tech", [2023],
    "JavaScript Object Notation: a lightweight, language-independent text format that stores structured data as key-value pairs and arrays, widely used to transfer data between systems.");

  /* ---------- Security ---------- */
  g("Encryption", "net-security", [],
    "Scrambling data with an algorithm and key into unreadable ciphertext so that only someone with the correct key can decrypt and read it.");
  g("Public key (asymmetric) encryption", "net-security", [2025],
    "Encryption that uses a pair of keys: a public key that anyone can use to encrypt, and a private key that only the receiver has to decrypt.");
  g("Private key (symmetric) encryption", "net-security", [],
    "Encryption in which the same secret key is used to encrypt and decrypt, so the key must be shared securely beforehand.");
  g("Digital certificate", "net-security", [2024, 2025],
    "An electronic document issued by a trusted Certificate Authority that proves a website or organisation's identity and contains its public key (used for SSL/TLS).");
  g("Certificate Authority (CA)", "net-security", [],
    "A trusted organisation that verifies identities and issues digital certificates.");
  g("SSL / TLS", "net-security", [2025],
    "Secure Sockets Layer / Transport Layer Security: protocols that encrypt data and authenticate the server between a browser and web server (shown by HTTPS and a padlock).");
  g("Digital signature", "net-security", [],
    "An electronic code created with the sender's private key that proves who sent a message or document and that it was not changed.");
  g("Firewall", "net-security", [2025],
    "Hardware or software that monitors incoming and outgoing network traffic and blocks unauthorised access according to set rules (e.g. by filtering ports).");
  g("TKIP", "net-security", [2022],
    "Temporal Key Integrity Protocol: a WPA wireless encryption protocol that generates a new key for each data packet (now replaced by AES in WPA2/WPA3).");
  g("Two-factor authentication (2FA)", "net-security", [],
    "Logging in with two different types of proof, e.g. a password plus a one-time code sent to a phone, so a stolen password alone is not enough.");
  g("Biometrics", "net-security", [2022],
    "Using unique physical characteristics such as fingerprints, face or iris for identification, e.g. with a fingerprint reader or face-recognition camera.");
  g("Proxy server", "net-security", [],
    "A server that sits between users and the Internet, forwarding requests; it can filter content, cache pages and hide users' IP addresses.");
  g("Tor (The Onion Router)", "net-security", [2023, 2024],
    "Free open-source software that hides a user's identity by sending traffic through several volunteer servers, each adding a layer of encryption, so it cannot easily be traced.");
  g("Audit trail", "net-security", [2024],
    "A time- and date-stamped record of who accessed or changed data/systems and what they did, used to detect and investigate problems.");
  g("Back door", "net-security", [2020],
    "A hidden way of accessing a system or network that bypasses the normal security/authentication.");

  /* ---------- Distributed processing ---------- */
  g("Distributed processing", "net-distributed", [],
    "Spreading processing tasks across several computers on a network that work together, instead of one central computer doing everything.");
  g("Fat (thick) client", "net-distributed", [],
    "A fully featured computer that does most processing and stores software and data locally, needing the server only for some services.");
  g("Smart client", "net-distributed", [2022, 2024],
    "An application that runs and processes data locally but stores/synchronises its data on a remote server, so it can also work offline.");
  g("Blockchain", "net-distributed", [2024, 2025],
    "A decentralised, distributed digital ledger in which transactions are grouped in linked, encrypted blocks copied across many computers, so records are transparent and cannot easily be changed.");
  g("Cryptocurrency / digital currency", "net-distributed", [2024],
    "A digital-only currency (e.g. Bitcoin) that is not issued by a central bank and uses blockchain and cryptography to record and secure transactions.");

  /* ---------- D: Social implications — crime & malware ---------- */
  g("Malware", "soc-crime-malware", [],
    "Malicious software designed to damage, disrupt or gain unauthorised access to a system, e.g. viruses, worms, trojans, ransomware and spyware.");
  g("Virus", "soc-crime-malware", [],
    "Malware that attaches itself to a file or program and spreads when that file is run or shared, often damaging data.");
  g("Worm", "soc-crime-malware", [],
    "Malware that copies itself and spreads across networks automatically, without needing a host file or user action.");
  g("Trojan horse", "soc-crime-malware", [],
    "Malware disguised as useful or legitimate software that performs harmful actions (e.g. opening a back door) once installed.");
  g("Ransomware", "soc-crime-malware", [],
    "Malware that encrypts a victim's files or locks the system and demands payment for the key.");
  g("Spyware", "soc-crime-malware", [],
    "Malware that secretly monitors a user's activity and sends information such as passwords or browsing habits to a third party.");
  g("Botnet (zombie army)", "soc-crime-malware", [2020, 2022],
    "A network of malware-infected computers (bots/zombies) controlled remotely by a criminal, often used for DDoS attacks or sending spam.");
  g("DoS / DDoS attack", "soc-crime-malware", [2025],
    "(Distributed) Denial of Service: flooding a website or server with so much traffic, often from a botnet, that it becomes slow or unavailable to real users.");
  g("Cyberbullying", "soc-crime-malware", [2023],
    "Using digital technology (social media, messages) to repeatedly harass, threaten or humiliate someone.");

  /* ---------- Social engineering ---------- */
  g("Social engineering", "soc-social-engineering", [2020],
    "Manipulating or tricking people into giving away confidential information or access, rather than hacking the technology.");
  g("Phishing", "soc-social-engineering", [2020],
    "Fake emails or messages that pretend to come from a trusted organisation to trick users into revealing passwords or banking details.");
  g("Pharming", "soc-social-engineering", [2020],
    "Redirecting users from a genuine website to a fake one (e.g. by corrupting DNS or the hosts file) to steal their details, even when they type the correct address.");
  g("Spoofing", "soc-social-engineering", [],
    "Faking an identity, such as an email address, caller ID, IP address or website, to look like a trusted source.");

  /* ---------- Ethics & law ---------- */
  g("POPIA", "soc-ethics-law", [],
    "Protection of Personal Information Act: South African law that controls how organisations collect, use, store and share personal information; it requires consent, a lawful purpose, security safeguards and gives people the right to access and correct their data.");
  g("ECT Act", "soc-ethics-law", [],
    "Electronic Communications and Transactions Act: South African law that gives electronic transactions and signatures legal status and makes unauthorised access and cybercrime offences.");
  g("Copyright", "soc-ethics-law", [],
    "The legal right of a creator to control how their original work is copied, distributed and used.");
  g("Plagiarism", "soc-ethics-law", [],
    "Presenting someone else's work or ideas as your own without acknowledging the source.");
  g("Netiquette", "soc-ethics-law", [2016],
    "The accepted rules of polite and responsible behaviour when communicating online (e.g. no spam, no typing in capitals, no huge attachments).");
  g("Acceptable Use Policy (AUP)", "soc-ethics-law", [2025],
    "A set of rules written by an organisation or network provider stating what users may and may not do with its computers, network and Internet.");
  g("Digital heritage", "soc-ethics-law", [2025],
    "A person's digital data, accounts and assets, and the legal rights to manage them after the person's death.");

  /* ---------- Privacy & data ---------- */
  g("Big data", "soc-privacy-data", [],
    "Extremely large, fast-growing and varied data sets (from social media, sensors, transactions, LBS) that need special tools to analyse for patterns and decision-making.");
  g("Data mining", "soc-privacy-data", [],
    "Analysing large data sets with software to discover hidden patterns, trends and relationships, e.g. buying habits.");
  g("Digital footprint", "soc-privacy-data", [],
    "The trail of data a person leaves online through posts, searches, location data and accounts, which is hard to remove.");
  g("Information overload", "soc-privacy-data", [2020],
    "Having so much information available that a person becomes confused and is unable to make decisions.");

  /* ---------- AI & emerging tech ---------- */
  g("Artificial Intelligence (AI)", "soc-ai-emerging", [],
    "Computer systems that perform tasks normally needing human intelligence, such as recognising speech, making decisions and learning from data.");
  g("Machine learning", "soc-ai-emerging", [],
    "A branch of AI in which systems learn from large amounts of data to improve their predictions without being explicitly programmed for each case.");
  g("Deepfake", "soc-ai-emerging", [],
    "Fake but realistic video, image or audio created with AI to make it look as if a person said or did something they did not.");

  /* ---------- Health & environment ---------- */
  g("Digital divide", "soc-health-environment", [],
    "The gap between people who have access to computers, the Internet and digital skills and those who do not (due to cost, location, age, education).");
  g("Green computing", "soc-health-environment", [],
    "Using and disposing of computers in an environmentally responsible way, e.g. energy-efficient devices, sleep modes, recycling and reducing e-waste.");
  g("E-waste", "soc-health-environment", [],
    "Discarded electronic devices, which contain toxic materials (lead, mercury) that harm the environment if not recycled properly.");
  g("Repetitive Strain Injury (RSI)", "soc-health-environment", [],
    "Pain and damage to muscles, tendons and nerves (e.g. carpal tunnel syndrome) caused by repeating the same movements, such as typing, over long periods.");

  /* ---------- E: Databases ---------- */
  g("Primary key", "db-concepts", [],
    "A field (or fields) whose value uniquely identifies each record in a table; it cannot be empty or duplicated.");
  g("Foreign key", "db-concepts", [],
    "A field in one table that is the primary key of another table, used to link the tables in a relationship.");
  g("Normalisation", "db-normalisation", [],
    "Organising a database into well-structured related tables to remove data redundancy and prevent update, insert and delete anomalies.");
  g("Data redundancy", "db-normalisation", [],
    "The same data stored unnecessarily in more than one place, which wastes space and can lead to inconsistencies.");

  /* ---------- Validation & errors ---------- */
  g("Validation", "data-validation", [],
    "Automatic checks by the program that input data is sensible and follows set rules (e.g. within a range), before it is accepted; it cannot prove data is correct.");
  g("Verification", "data-validation", [],
    "Checking that data has been entered or copied accurately from the source, e.g. double entry or visual proofreading.");
  g("GIGO", "data-validation", [],
    "Garbage In, Garbage Out: if incorrect data is entered, the output will also be incorrect, however good the program is.");
  g("Range check", "data-validation", [],
    "A validation check that a value falls between set lower and upper limits (e.g. age 13–19).");
  g("Check digit", "data-validation", [],
    "An extra digit calculated from the other digits of a code (e.g. ISBN, barcode, ID number) and used to detect input errors.");
  g("Parity check", "data-validation", [],
    "An extra bit added to each byte so the number of 1s is even (or odd); the receiver checks this to detect transmission errors.");
  g("Optical Character Recognition (OCR)", "data-validation", [2022],
    "Software that converts scanned or photographed printed/handwritten text into editable, machine-encoded text.");

  /* ---------- Data representation ---------- */
  g("Overflow error", "data-representation", [],
    "An error that occurs when the result of a calculation is too large to be stored in the fixed number of bits available for it.");
  g("Hexadecimal", "data-representation", [],
    "Base-16 number system (0–9, A–F); each hex digit represents 4 bits, so it is a shorter, more readable way of writing binary (used for MAC/IPv6 addresses, colours).");
  g("ASCII", "data-representation", [],
    "A character-encoding standard using 7 bits (extended to 8 bits) to represent English letters, digits and symbols, giving 128 (or 256) characters.");
  g("Unicode", "data-representation", [],
    "A character-encoding standard using up to 32 bits per character (e.g. UTF-8, UTF-16) so it can represent characters from virtually all languages and emojis.");

  /* ---------- Algorithms & problem solving ---------- */
  g("Algorithm", "sol-algorithms", [2022],
    "A finite, step-by-step set of unambiguous instructions in a logical order for solving a problem.");
  g("Trace table", "sol-algorithms", [],
    "A table used to test an algorithm by manually recording the value of each variable after every step, to find logic errors.");
  g("Decomposition", "sol-algorithms", [],
    "Breaking a large, complex problem down into smaller, more manageable sub-problems.");
  g("Pattern recognition", "sol-algorithms", [],
    "Identifying similarities or repeated parts in problems or data so that existing solutions, loops, methods or classes can be reused.");
  g("Abstraction", "sol-algorithms", [],
    "Removing or hiding unnecessary detail to focus only on the information relevant to solving the problem.");

  /* ---------- OOP ---------- */
  g("Class", "sol-oop-theory", [],
    "A blueprint/template that defines the attributes (fields) and methods that objects of that type will have.");
  g("Object", "sol-oop-theory", [],
    "An instance of a class with its own values for the attributes defined in the class.");
  g("Constructor", "sol-oop-theory", [],
    "A special method with the same name as the class that is called when an object is created, to initialise its fields.");
  g("Encapsulation", "sol-oop-theory", [2025],
    "Combining the attributes and the methods that work on them into a single unit (class), and hiding the data by making fields private (information hiding).");
  g("Inheritance", "sol-oop-theory", [2025],
    "Creating a new child (sub) class from an existing parent (super) class so that it reuses the parent's fields and methods and can add its own ('is-a' relationship).");
  g("Polymorphism", "sol-oop-theory", [2025],
    "The ability of methods with the same name to behave differently depending on the object or parameters, through overriding or overloading.");
  g("Composition", "sol-oop-theory", [2025],
    "When an object contains other objects as one or more of its fields ('has-a' relationship), e.g. a Car has an Engine.");
  g("Method overriding", "sol-oop-theory", [2025],
    "A child class redefines a method inherited from its parent using the same name, return type and parameters, to change its behaviour.");
  g("Method overloading", "sol-oop-theory", [2024],
    "Having several methods with the same name in a class that differ in their parameter lists (number or types of parameters).");
  g("Accessor (getter)", "sol-oop-theory", [],
    "A method that returns the value of a private field without changing it.");
  g("Mutator (setter)", "sol-oop-theory", [2024],
    "A method that changes (sets) the value of a private field, often after validating the new value.");
  g("Private access modifier", "sol-oop-theory", [2016],
    "Makes a field or method accessible only inside its own class (shown by '-' in a UML class diagram).");

  /* ---------- Programming & errors ---------- */
  g("Syntax error", "sol-programming", [],
    "An error from breaking the grammar rules of the programming language (e.g. a missing semicolon); the program will not compile.");
  g("Runtime error", "sol-programming", [2025],
    "An error that occurs while the program is running, when something unexpected (e.g. division by zero, array index out of bounds) stops it from continuing.");
  g("Logic error", "sol-programming", [],
    "An error in the program's reasoning that makes it run but produce wrong results (e.g. using > instead of >=).");

  /* ---------- Search & sort ---------- */
  g("Binary search", "sol-search-sort", [],
    "Searching a SORTED list by repeatedly comparing the target with the middle item and discarding the half where it cannot be; much faster on large lists.");

  /* ---------- SQL ---------- */

  /* ---------- SDLC & UI ---------- */
  g("SDLC", "sol-sdlc-ui", [],
    "Systems Development Life Cycle: the stages for developing a system, namely analysis, design, coding/implementation, testing and maintenance.");

  window.P2_GLOSSARY = G;
})();
