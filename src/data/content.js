export const navLinks = [
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Certificates', href: '#certificates' },
  { label: 'Skills', href: '#skills' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#connect' },
];

export const heroData = {
  badge: "Bello! I'm Aura Marsha Azzila Best Dev!",
  titleLine1: 'Software',
  titleLine2: 'Engineer',
  description:
    'I build "App-ealing" solutions with pure industriousness and many bananas. Specializing in highly scalable, mischievously creative web experiences.',
  ctaPrimary: 'See My Work',
  ctaSecondary: 'Hire Me',
  heroImage: '/poto.jpeg',
};

export const aboutData = {
  title: 'About',
  titleHighlight: 'Me',
  role: 'Software Engineer',
  description:
    "A Software Engineering student at SMK Plus Pelita Nusantara with a keen interest in software and web development. Combines technical programming skills with strong soft skills, such as teamwork, discipline, and problem-solving abilities. Eager to continue learning, hone technical competencies, and make meaningful contributions in a professional work environment.",
  linkedin: 'linkedin.com/in/engineer',
  location: 'Jakarta, Indonesia',
  profileImage:
    '/poto2.jpeg',
};

export const projectsData = [
  {
    id: 1,
    title: 'NoteFlow',
    description:
      'A web-based application project with the NoteFlow concept, designed to create, store, and manage notes in a simple and organized way with a clean, responsive interface.',
    image: '/project-image/project-2.png',
    badge: 'Web App',
    tags: ['Laravel', 'Blade', 'Tailwind CSS', 'Breeze Auth'],
    githubUrl: 'https://github.com/cawleylac/NoteFlow',
    liveUrl: '#connect',
  },
  {
    id: 2,
    title: '2D Platformer Adventure',
    description:
      'An engaging 2D pixel platformer game featuring customized character levels, dynamic obstacle physics, collectible stars, and rewarding stage completion.',
    image: '/project-image/project-1.png',
    badge: 'Game Dev',
    tags: ['Game Dev', 'JavaScript', 'Canvas / WebGL', 'Pixel Art'],
    githubUrl: 'https://github.com/cawleylac',
    liveUrl: '#connect',
  },
  {
    id: 3,
    title: 'TrackHand',
    description:
      'A Python project using TrackHand to detect and track hand movements and biometrics in real time through computer vision technology for interactive experiences.',
    image: '/project-image/project3.jpg',
    badge: 'Computer Vision',
    tags: ['Python', 'OpenCV', 'MediaPipe', 'Computer Vision'],
    githubUrl: 'https://github.com/cawleylac',
    liveUrl: '#connect',
  },
];

export const experienceData = [
  {
    step: '01',
    title: 'Top 10 — Clash of Cyber Heist',
    organization: 'Telkom Corporate University & Indibiz',
    period: '21 & 25 November 2025',
    category: 'Cyber Security Competition',
    badge: 'Top 10 Awardee',
    description:
      'Berhasil meraih predikat Top 10 dalam ajang bergengsi program KID#2 Clash of Cyber Heist yang diselenggarakan oleh Telkom Indonesia & Telkom CorpU, mendemonstrasikan keahlian investigasi cyber security, CTF, dan pemecahan masalah.',
    tags: ['Cyber Security', 'CTF / Heist', 'Problem Solving', 'Telkom CorpU'],
    certificateFile: '/sertifikat/setifikat2.png',
    certificateType: 'image',
  },
  {
    step: '02',
    title: 'Koding & Kecerdasan Artificial (KKA)',
    organization: 'SMK Plus Pelita Nusantara',
    period: '14 - 15 November 2025',
    category: 'AI & Coding Certification',
    badge: 'Certified Participant',
    description:
      'Menyelesaikan pelatihan intensif bertema "AI for Students: Belajar Kreatif, Berpikir Kritis, dan Berkarya Inovatif", mendalami integrasi kecerdasan buatan dalam pengembangan perangkat lunak modern dan problem-solving kreatif.',
    tags: ['Artificial Intelligence', 'Creative Coding', 'Prompt Engineering', 'Innovation'],
    certificateFile: '/sertifikat/sertifikat1.jpeg',
    certificateType: 'image',
  },
  {
    step: '03',
    title: 'Cloud Computing di Sektor Pendidikan',
    organization: 'LPPM STT Terpadu Nurul Fikri',
    period: '22 Oktober 2025',
    category: 'Cloud Technology Workshop',
    badge: 'Certified Participant',
    description:
      'Partisipasi aktif dalam kegiatan Pengabdian kepada Masyarakat yang diselenggarakan oleh LPPM STTNF mengenai pemanfaatan Cloud Computing, pengelolaan infrastruktur cloud, dan implementasi teknologi komputasi awan.',
    tags: ['Cloud Computing', 'Cloud Infrastructure', 'STT-NF', 'Tech Workshop'],
    certificateFile: '/sertifikat/sertifikat3.png',
    certificateType: 'image',
  },
  {
    step: '04',
    title: 'Software Engineering (RPL)',
    organization: 'SMK Plus Pelita Nusantara',
    period: '2025 - Present',
    category: 'Formal Education & Practice',
    badge: 'Vocational Student',
    description:
      'Menempuh pendidikan vokasi konsentrasi Rekayasa Perangkat Lunak (RPL). Aktif mengembangkan proyek web modern (Laravel, React, Tailwind CSS), aplikasi computer vision Python, algoritma pemrograman, dan kolaborasi tim.',
    tags: ['Full-Stack Dev', 'Software Engineering', 'Teamwork', 'Continuous Learning'],
    certificateFile: null,
    certificateType: null,
  },
];

export const certificatesData = [
  {
    id: 1,
    title: 'Top 10 — Clash of Cyber Heist',
    issuer: 'Telkom Corporate University & Indibiz',
    date: 'Nov 2025',
    category: 'Cyber Security',
    badge: 'Competition Award',
    image: '/sertifikat/setifikat2.png',
    skills: ['Cyber Security', 'CTF', 'Problem Solving'],
    description: 'Penghargaan bergengsi predikat Top 10 ajang kompetisi nasional KID#2 Clash of Cyber Heist.',
  },
  {
    id: 2,
    title: 'Koding & Kecerdasan Artificial (KKA)',
    issuer: 'SMK Plus Pelita Nusantara',
    date: 'Nov 2025',
    category: 'Artificial Intelligence',
    badge: 'Mastery Certification',
    image: '/sertifikat/sertifikat1.jpeg',
    skills: ['AI for Students', 'Creative Coding', 'Prompting'],
    description: 'Sertifikasi pelatihan intensif penguasaan teknologi AI untuk software engineering.',
  },
  {
    id: 3,
    title: 'Cloud Computing di Sektor Pendidikan',
    issuer: 'LPPM STT Terpadu Nurul Fikri',
    date: 'Okt 2025',
    category: 'Cloud Computing',
    badge: 'Workshop',
    image: '/sertifikat/sertifikat3.png',
    skills: ['Cloud Infrastructure', 'Virtualization', 'Networking'],
    description: 'Sertifikat keikutsertaan penguasaan teknologi komputasi awan dan arsitektur server.',
  },
  {
    id: 4,
    title: 'The Champions Blueprint to Real-World Scenarios',
    issuer: 'Linuxhackingid',
    date: ' Aug 2026',
    category: 'Cyber Security',
    badge: 'Certificication',
    image: '/sertifikat/sertifikat4.png',
    skills: ['Cyber Security', 'CTF'],
    description: 'Strategi menguasai kompetisi Capture The Flag (CTF) berdasarkan skenario dunia nyata.',
  },
  {
    id: 5,
    title: 'AI Ethics in Game Development',
    issuer: 'CodeLamp',
    date: 'Sept 2025',
    category: 'Game Development',
    badge: 'Certification',
    image: '/sertifikat/sertifikat5.png',
    skills: ['Game Development', 'AI', 'Game'],
    description: 'AI & Ethics in Game Development" (Kecerdasan Buatan dan Etika dalam Pengembangan Game).',
  },
  {
    id: 6,
    title: 'Reconnaissance & Numeration for Bug Bounty',
    issuer: 'Merdeka Siber',
    date: 'Dec 2025',
    category: 'Cyber Security',
    badge: 'Certification',
    image: '/sertifikat/sertifikat6.png',
    skills: ['Bug Bounty', 'Cyber Security'],
    description: 'Teknik reconnaissance dan enumeration untuk program bug bounty.',
  },
  {
    id: 7,
    title: 'Introduction to Capture the Flag',
    issuer: 'ID-Networkers',
    date: 'Aug 2025',
    category: 'Cyber Security',
    badge: 'Certification',
    image: '/sertifikat/sertifikat7.png',
    skills: ['Cyber Security', 'CTF'],
    description: 'Pengenalan dasar mengenai kompetisi keamanan siber Capture the Flag (CTF) bagi pemula.',
  },
  {
    id: 8,
    title: 'Game Design : From Hobby to Hook',
    issuer: 'CodeLamp',
    date: 'Aug 2025',
    category: 'Game Development',
    badge: 'Certification',
    image: '/sertifikat/sertifikat8.png',
    skills: ['Game Development'],
    description: 'Strategi merancang retensi dan siklus permainan adiktif agar pemain betah bermain game mini dalam jangka panjang.',
  },
  {
    id: 9,
    title: 'Web Exploitation CTF : Think, Attack, Capture',
    issuer: 'Revolusiber',
    date: 'Dec 2025',
    category: 'Cyber Security',
    badge: 'Certification',
    image: '/sertifikat/sertifikat9.png',
    skills: ['Cyber Security', 'CTF', 'Web Exploitation'],
    description: 'Teknik eksploitasi keamanan situs web (Web Exploitation) dalam kompetisi keamanan siber Capture the Flag (CTF).',
  },
  {
    id: 10,
    title: 'Why Your Game Isn`t Selling : Market Validation for Indie Developers',
    issuer: 'CodeLamp',
    date: 'Aug 2025',
    category: 'Game Development',
    badge: 'Certification',
    image: '/sertifikat/sertifikat10.png',
    skills: ['Game Development'],
    description: 'Penyebab kegagalan penjualan game indie serta strategi melakukan validasi pasar dan riset audiens.',
  },
];

export const skillsData = [
  {
    category: 'FRONTEND',
    avatar: '/skill3.png',
    avatarBg: 'bg-[#1D4ED8]',
    skills: ['JavaScript', 'React', 'Vue.js', 'HTML', 'CSS', 'Tailwind'],
  },
  {
    category: 'BACKEND',
    avatar: '/skill2.png',
    avatarBg: 'bg-[#E11D48]',
    skills: ['Python', 'Node.js', 'Express', 'SQL', 'MongoDB'],
  },
  {
    category: 'TOOLS',
    avatar: '/skil1.png',
    avatarBg: 'bg-[#16A34A]',
    skills: ['Docker', 'Git', 'AWS', 'Figma', 'Agile'],
  },
];

export const footerLinks = {
  projects: [
    { label: 'NoteFlow', href: '#projects' },
    { label: '2D Platformer Adventure', href: '#projects' },
    { label: 'TrackHand', href: '#projects' },
  ],
  about: [
    { label: 'Certificates', href: '#certificates' },
    { label: 'Experience', href: '#experience' },
    { label: 'Skills', href: '#skills' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#connect' },
  ],
};