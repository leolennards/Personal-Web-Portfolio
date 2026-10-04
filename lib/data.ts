// site content - edit stuff here, not in the components
// placeholder: true = empty slot, shows as "awaiting upload"

export const profile = {
  name: "Leo Lennards",
  handle: "leo@lennards",
  location: "Cape Town, South Africa",
  email: "leo.lukelennards@gmail.com",
  linkedin: "https://www.linkedin.com/in/leolennards/",
  github: "https://github.com/leolennards",
  cv: "/docs/Leo-Lennards-CV.pdf",
  roles: [
    "IT Support Technician",
    "Microsoft 365 & Entra ID Admin",
    "Security Lab Builder",
    "Software Engineering Graduate",
  ],
  tagline:
    "I keep businesses online, secure and moving: L1/L2 service desk, identity, endpoints and the networks underneath them.",
  summary: [
    "I'm an IT Support Technician at Leftclick, a Cape Town managed service provider, delivering first and second line support to multiple business clients every day, by phone, remote session and on site.",
    "My day is Microsoft 365 and Entra ID administration, Active Directory, Windows and macOS troubleshooting, endpoint security with ESET, RMM with NinjaOne and email security with Mimecast.",
    "I hold a BSc in Information Technology (Software Engineering), I'm a NinjaOne Certified Technician, and I'm now doing postgraduate studies focused on networks and security, including research on Zero Trust Architecture.",
  ],
  facts: [
    { k: "role", v: "IT Support Technician @ Leftclick" },
    { k: "focus", v: "L1/L2 · M365 · AD · Endpoint security" },
    { k: "degree", v: "BSc IT, Software Engineering" },
    { k: "honours", v: "Golden Key · top 15%" },
    { k: "studying", v: "Postgrad IT (Zero Trust research)" },
    { k: "status", v: "Own vehicle · on-site ready" },
  ],
};

export type Skill = {
  id: string;
  title: string;
  detail: string;
  tags: string[];
};

export const skills: Skill[] = [
  {
    id: "m365",
    title: "Microsoft 365 & Entra ID",
    detail: "Users, licensing, mailboxes and MFA across multiple client tenants.",
    tags: ["M365 Admin Center", "Entra ID", "MFA", "Graph PowerShell"],
  },
  {
    id: "ad",
    title: "Active Directory",
    detail: "Accounts, password resets, group membership and Group Policy.",
    tags: ["AD DS", "Group Policy", "Users & Groups"],
  },
  {
    id: "desktop",
    title: "Desktop Support",
    detail: "Windows 10/11 and macOS end to end, printers and OS rebuilds.",
    tags: ["Windows 11", "macOS", "Printers", "OS rebuilds"],
  },
  {
    id: "desk",
    title: "Remote Service Desk",
    detail: "Ticket triage, phone support, remote sessions and clear notes.",
    tags: ["Triage", "Phone support", "Remote sessions"],
  },
  {
    id: "endpoint",
    title: "Endpoints & Security",
    detail: "ESET protection and full disk encryption, NinjaOne RMM deployment.",
    tags: ["ESET", "Full-disk encryption", "NinjaOne RMM"],
  },
  {
    id: "network",
    title: "Networking",
    detail: "The plumbing underneath everything, from Wi-Fi to VoIP.",
    tags: ["TCP/IP", "DNS", "DHCP", "LAN/WAN", "VoIP"],
  },
  {
    id: "email",
    title: "Firewall & Email Security",
    detail: "Windows Firewall, web application firewalls, Mimecast quarantine.",
    tags: ["Windows Firewall", "WAF", "Mimecast"],
  },
  {
    id: "server",
    title: "Server Support",
    detail: "Windows Server 2019 roles and PowerShell scripting.",
    tags: ["Server 2019", "AD DS", "DNS/DHCP", "PowerShell"],
  },
];

export const stack = [
  "Microsoft 365",
  "Entra ID",
  "Active Directory",
  "PowerShell",
  "NinjaOne",
  "ESET",
  "Mimecast",
  "Windows Server",
  "macOS",
  "Docker",
  "OpenSSL",
  "ModSecurity",
  "tcpdump",
  "HTML · CSS · JS",
  "Python",
  "C++",
  "MySQL",
  "MongoDB",
];

export type Role = {
  title: string;
  org: string;
  meta: string;
  period: string;
  status: "ACTIVE" | "RESOLVED";
  summary: string;
  groups: { label: string; points: string[] }[];
};

export const experience: Role[] = [
  {
    title: "IT Support Intern (Technical Resource)",
    org: "Leftclick (LC Networks)",
    meta: "Managed Service Provider · Green Point, Cape Town · On-site",
    period: "Feb 2026 – Present",
    status: "ACTIVE",
    summary:
      "First and second line support for a portfolio of MSP clients by phone, remote session and on-site visits. Internship extended beyond the initial three-month term.",
    groups: [
      {
        label: "Service desk & end-user support",
        points: [
          "Work a daily queue of client tickets, calling users directly to diagnose issues and keeping them updated until the problem is fixed.",
          "Troubleshoot Windows and macOS end to end: Mac Mail modern auth failures, Cloud PC and RDP sign-in errors, CaseWare printer driver faults, POST beep codes and Fanvil VoIP passthrough.",
          "Restored a failed MacBook Pro keyboard and trackpad by tracing the fault to an unsupported macOS version and performing a clean reinstall.",
        ],
      },
      {
        label: "Microsoft 365, identity & Active Directory",
        points: [
          "Administer Microsoft 365 across multiple client tenants: user setup, licence assignment, mailbox issues and Entra ID MFA registration errors.",
          "Audit and interpret licence assignments across tenants using PowerShell with Microsoft Graph.",
          "Manage user accounts, password resets and group membership in Active Directory.",
        ],
      },
      {
        label: "Endpoints, security & email",
        points: [
          "Deploy NinjaOne RMM agents and use NinjaOne for remote access, monitoring and maintenance.",
          "Deploy and manage ESET endpoint protection, including ESET Full Disk Encryption on client laptops.",
          "Review and release quarantined email in Mimecast, checking each item is safe before release.",
          "Diagnosed hardware failures across many Windows 7/10 machines and presented the findings to management as the case for a hardware refresh.",
          "Researched CIS Controls, ISO 27001 and NIST for a supervisor-assigned security task and wrote up a clear summary.",
        ],
      },
    ],
  },
  {
    title: "Web Development Intern",
    org: "Hex Softwares",
    meta: "Remote",
    period: "Aug 2025 – Sep 2025",
    status: "RESOLVED",
    summary:
      "Delivered three web projects to deadline in a remote team, published on GitHub.",
    groups: [
      {
        label: "Delivery",
        points: [
          "Built a portfolio site, a music player and a book library app with HTML, CSS and JavaScript.",
          "Awarded a Certificate of Completion and a Letter of Recommendation from the founder, highlighting communication, problem-solving and teamwork.",
        ],
      },
    ],
  },
  {
    title: "Promoter (Part-time)",
    org: "Isilumko",
    meta: "Cape Town",
    period: "Dec 2023 – Dec 2025",
    status: "RESOLVED",
    summary:
      "Engaged members of the public face to face for two years alongside full-time studies, building the confident, friendly communication I now use on support calls every day.",
    groups: [],
  },
];

export type Project = {
  id: string;
  title: string;
  year: string;
  kind: string;
  summary: string;
  points?: string[];
  tags: string[];
  link?: string;
  featured?: boolean;
  placeholder?: boolean;
};

export const projects: Project[] = [
  {
    id: "seclab",
    title: "Hardened Multi-Service Environment",
    year: "2026",
    kind: "Security lab · Docker",
    featured: true,
    summary:
      "Built and secured a containerised environment from the ground up, then broke and fixed it until it held.",
    points: [
      "TLS everywhere with my own PKI built on OpenSSL.",
      "ModSecurity web application firewall in front of every service.",
      "Encrypted data at rest (AES-256), hashed credentials and hardened containers.",
      "Diagnosed real faults: port conflicts, TLS mismatches and certificate errors, verified with tcpdump packet analysis.",
    ],
    tags: ["Docker", "OpenSSL", "ModSecurity", "AES-256", "tcpdump"],
  },
  {
    id: "zerotrust",
    title: "Zero Trust for Hybrid Work",
    year: "2026 – now",
    kind: "Postgraduate research",
    summary:
      "Research project on Zero Trust Architecture for remote and hybrid workforces, alongside modules in Network Design, Offensive & Defensive Technologies and Data Mining.",
    tags: ["Zero Trust", "Network design", "Research"],
  },
  {
    id: "winserver",
    title: "Windows Server 2019 Domain",
    year: "2025",
    kind: "Web Server Management",
    summary:
      "Installed and configured Windows Server 2019 with Active Directory, DNS, DHCP, Group Policy, Windows Firewall and PowerShell scripting.",
    tags: ["Server 2019", "AD DS", "GPO", "PowerShell"],
  },
  {
    id: "hex-portfolio",
    title: "Portfolio · Music Player · Book Library",
    year: "2025",
    kind: "Hex Softwares internship",
    summary:
      "Three front-end projects shipped to deadline with a remote team, including the first version of this portfolio.",
    tags: ["HTML", "CSS", "JavaScript", "GitHub"],
    link: "https://github.com/leolennards",
  },
  // TODO: add more projects
  {
    id: "slot-1",
    title: "Next project",
    year: "—",
    kind: "Reserved slot",
    summary: "More projects are on the way.",
    tags: [],
    placeholder: true,
  },
  {
    id: "slot-2",
    title: "Next project",
    year: "—",
    kind: "Reserved slot",
    summary: "More projects are on the way.",
    tags: [],
    placeholder: true,
  },
];

export type Credential = {
  title: string;
  issuer: string;
  date: string;
  detail?: string;
  id?: string;
  file?: string;
  accent: "green" | "amber" | "blue" | "violet";
  placeholder?: boolean;
};

export const credentials: Credential[] = [
  {
    title: "NinjaOne Certified Technician | MSP",
    issuer: "NinjaOne",
    date: "Feb 2026",
    id: "nILnSSSajA",
    detail: "RMM deployment, monitoring and remote management for MSP environments.",
    accent: "green",
  },
  {
    title: "Golden Key International Honour Society",
    issuer: "Eduvos",
    date: "Member",
    detail: "Invited for ranking in the top 15% of academic achievers at Eduvos.",
    file: "/docs/Golden-Key-Certificate.pdf",
    accent: "amber",
  },
  {
    title: "Letter of Recommendation",
    issuer: "Hex Softwares · Founder & CEO",
    date: "Sep 2025",
    detail: "For web development work during a remote internship.",
    file: "/docs/Hex-Softwares-Letter-of-Recommendation.pdf",
    accent: "violet",
  },
  {
    title: "LLMs & Responsible AI (3 courses)",
    issuer: "Google Cloud via Coursera",
    date: "Jan 2026",
    detail: "Introduction to Large Language Models · Introduction to Responsible AI · Responsible AI with Google Cloud.",
    accent: "blue",
  },
  {
    title: "Generative AI series (4 courses)",
    issuer: "University of Michigan via Coursera",
    date: "Jan 2026",
    detail: "Fundamentals · Governance & Regulation · Business & Society · Future of Work.",
    accent: "blue",
  },
  {
    title: "Microsoft Office 2019 Specialist",
    issuer: "Pearson MyLab IT",
    date: "Sep 2023",
    detail: "Word & Excel 2019 Advanced · PowerPoint & Access 2019 Introductory.",
    accent: "green",
  },
  // TODO: add more certs
  {
    title: "Next credential",
    issuer: "Reserved slot",
    date: "—",
    accent: "green",
    placeholder: true,
  },
];

export const education = [
  {
    title: "Postgraduate studies in Information Technology",
    org: "Eduvos Online · Part-time",
    period: "2026 – Present",
    points: [
      "Network Design, Offensive & Defensive Technologies, Data Mining.",
      "Research project on Zero Trust Architecture for remote and hybrid work.",
    ],
  },
  {
    title: "BSc Information Technology, Software Engineering",
    org: "Eduvos · Cape Town · NQF 7",
    period: "2023 – 2025",
    points: [
      "Golden Key International Honour Society member (top 15%).",
      "Web Server Management: Windows Server 2019, AD, DNS, DHCP, GPO, PowerShell.",
      "Networking, databases (MySQL, MongoDB), Python, C++ and mobile development.",
    ],
  },
];

export const sections = [
  { id: "about", label: "whoami", port: "01" },
  { id: "skills", label: "skills", port: "02" },
  { id: "experience", label: "log", port: "03" },
  { id: "projects", label: "projects", port: "04" },
  { id: "credentials", label: "vault", port: "05" },
  { id: "contact", label: "contact", port: "06" },
] as const;
