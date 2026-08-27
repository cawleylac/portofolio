export const navLinks = [
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
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
    { label: 'Experience', href: '#experience' },
    { label: 'Skills', href: '#skills' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#connect' },
  ],
};


