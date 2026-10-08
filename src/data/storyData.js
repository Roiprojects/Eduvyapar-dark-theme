export const CHAPTERS = [
  { id: '00', title: 'Enter', label: '00 Enter', subtitle: 'A Global Education Ecosystem' },
  { id: '01', title: 'The Ecosystem', label: '01 Ecosystem', subtitle: 'Connecting students, institutions and opportunities' },
  { id: '02', title: 'The Flow', label: '02 Flow', subtitle: 'A seamless journey for every student' },
  { id: '03', title: 'People', label: '03 People', subtitle: 'Students are not data points. They are futures.' },
  { id: '04', title: 'The Institution', label: '04 Institution', subtitle: 'A complete ecosystem for modern education' },
  { id: '05', title: 'Intelligence', label: '05 Intelligence', subtitle: 'Turn data into decisions' },
  { id: '06', title: 'Every Application', label: '06 Application', subtitle: 'A closer look at what matters' },
  { id: '07', title: 'The Network', label: '07 Network', subtitle: 'From a student to a global impact' },
  { id: '08', title: 'The Future', label: '08 Future', subtitle: 'Shaping a brighter tomorrow' },
];

export const GLOBAL_METRICS = [
  { label: 'Students', value: '12,842', change: '+8.4%', trend: 'up' },
  { label: 'Applications', value: '1,284', change: '+12.8%', trend: 'up' },
  { label: 'Countries', value: '24+', change: '+8.2%', trend: 'up' },
  { label: 'Partner Institutions', value: '120+', change: '+14.2%', trend: 'up' }
];

export const COUNTRY_DATA = [
  { id: 'india', name: 'India', flag: '🇮🇳', applications: 8470, percentage: 66, active: true },
  { id: 'uae', name: 'UAE', flag: '🇦🇪', applications: 1284, percentage: 10, active: false },
  { id: 'usa', name: 'USA', flag: '🇺🇸', applications: 642, percentage: 5, active: false },
  { id: 'uk', name: 'UK', flag: '🇬🇧', applications: 526, percentage: 4, active: false },
  { id: 'singapore', name: 'Singapore', flag: '🇸🇬', applications: 420, percentage: 3, active: false }
];

export const FLOW_STEPS = [
  {
    step: 1,
    title: 'Application Submitted',
    description: 'Applicant submits digital portfolio, transcripts, and personal profile.',
    status: 'Completed',
    count: 1284,
    icon: 'Send'
  },
  {
    step: 2,
    title: 'Document Verification',
    description: 'Autonomous credential validation via decentralized trust verification.',
    status: 'In Progress',
    count: 1102,
    icon: 'FileCheck'
  },
  {
    step: 3,
    title: 'Review In Progress',
    description: 'Departmental faculty panel evaluates academic aptitude and statement.',
    status: 'Active',
    count: 732,
    icon: 'Search'
  },
  {
    step: 4,
    title: 'Payment Received',
    description: 'Smart escrow receipt confirmation and institutional seat reservation.',
    status: 'Confirmed',
    count: 512,
    icon: 'CreditCard'
  },
  {
    step: 5,
    title: 'Approved & Enrolled',
    description: 'Official matriculation record generated, digital student ID issued.',
    status: 'Finalized',
    count: 184,
    icon: 'CheckCircle2'
  }
];

export const FLOW_METRICS = [
  { label: 'Total Applications', value: '1,284', change: '+12.8%', color: 'var(--accent-cyan)' },
  { label: 'Pending', value: '326', change: '-4.2%', color: 'var(--accent-warning)' },
  { label: 'Approved', value: '184', change: '+8.1%', color: 'var(--accent-success)' },
  { label: 'Under Review', value: '732', change: '+5.7%', color: 'var(--accent-primary)' },
  { label: 'Rejected', value: '42', change: '-6.1%', color: 'var(--accent-danger)' }
];

export const STUDENTS = [
  {
    id: 'ADM-2026-001',
    name: 'Rahul Sharma',
    program: 'B.Tech Computer Science',
    status: 'Approved',
    attendance: '92%',
    feesPaid: '₹1,20,000',
    cgpa: '8.6',
    credits: '48 / 160',
    dob: '12 Aug 2004',
    gender: 'Male',
    nationality: 'Indian',
    email: 'rahul.sharma@email.com',
    phone: '+91 98765 43210',
    bloodGroup: 'B+',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80',
    statement: 'Passionate about distributed consensus and high-performance computing systems.'
  },
  {
    id: 'ADM-2026-002',
    name: 'Priya Mehta',
    program: 'BBA Global Business',
    status: 'Pending',
    attendance: '88%',
    feesPaid: '₹95,000',
    cgpa: '9.1',
    credits: '36 / 140',
    dob: '04 Mar 2005',
    gender: 'Female',
    nationality: 'Indian',
    email: 'priya.mehta@email.com',
    phone: '+91 98234 56789',
    bloodGroup: 'O+',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    statement: 'Aspiring venture leader specializing in cross-border fintech and sustainable investments.'
  },
  {
    id: 'ADM-2026-003',
    name: 'Arjun Rao',
    program: 'MBA Finance & Analytics',
    status: 'Under Review',
    attendance: '95%',
    feesPaid: '₹1,80,000',
    cgpa: '8.9',
    credits: '52 / 120',
    dob: '19 Nov 2002',
    gender: 'Male',
    nationality: 'Indian',
    email: 'arjun.rao@email.com',
    phone: '+91 97123 45678',
    bloodGroup: 'A+',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    statement: 'Quantitative analyst exploring algorithmic market micro-structure.'
  },
  {
    id: 'ADM-2026-004',
    name: 'Sneha Iyer',
    program: 'B.Tech AI & Data Science',
    status: 'Approved',
    attendance: '94%',
    feesPaid: '₹1,25,000',
    cgpa: '9.4',
    credits: '50 / 160',
    dob: '28 Jul 2004',
    gender: 'Female',
    nationality: 'Indian',
    email: 'sneha.iyer@email.com',
    phone: '+91 99887 76655',
    bloodGroup: 'AB+',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    statement: 'Researcher in foundation neural models and neuro-symbolic reasoning.'
  },
  {
    id: 'ADM-2026-005',
    name: 'Karan Singh',
    program: 'BCA Cloud Computing',
    status: 'Rejected',
    attendance: '74%',
    feesPaid: '₹60,000',
    cgpa: '6.8',
    credits: '24 / 120',
    dob: '15 Jan 2005',
    gender: 'Male',
    nationality: 'Indian',
    email: 'karan.singh@email.com',
    phone: '+91 91234 56789',
    bloodGroup: 'O-',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    statement: 'DevOps apprentice building container orchestration architectures.'
  },
  {
    id: 'ADM-2026-006',
    name: 'Aisha Khan',
    program: 'M.Tech Robotics',
    status: 'Approved',
    attendance: '96%',
    feesPaid: '₹1,40,000',
    cgpa: '9.2',
    credits: '44 / 120',
    dob: '09 Sep 2003',
    gender: 'Female',
    nationality: 'UAE',
    email: 'aisha.khan@email.com',
    phone: '+971 50 123 4567',
    bloodGroup: 'A-',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    statement: 'Autonomous drone swarms navigation and spatial perception systems.'
  }
];

export const INSTITUTION_METRICS = [
  { label: 'Students', value: '12,842', badge: 'Active Enrollment', icon: 'Users' },
  { label: 'Academics', value: '320 Courses', badge: 'Accredited', icon: 'BookOpen' },
  { label: 'Attendance', value: '92% Avg', badge: 'Campus Average', icon: 'Activity' },
  { label: 'Inventory', value: '1,248 Items', badge: 'Smart Tracked', icon: 'Box' },
  { label: 'Revenue', value: '₹48.6L', badge: 'Q1 Projected', icon: 'CreditCard' },
  { label: 'Faculty', value: '284 Members', badge: 'PhD / Masters', icon: 'Award' }
];

export const INTELLIGENCE_DATA = {
  monthlyAdmissions: [
    { month: 'Jan', applications: 420, approved: 120, rejected: 30 },
    { month: 'Feb', applications: 610, approved: 190, rejected: 45 },
    { month: 'Mar', applications: 790, approved: 260, rejected: 52 },
    { month: 'Apr', applications: 1040, approved: 340, rejected: 64 },
    { month: 'May', applications: 1180, approved: 420, rejected: 71 },
    { month: 'Jun', applications: 1284, approved: 490, rejected: 42 }
  ],
  revenueTrend: [
    { month: 'Jan', value: 28.4 },
    { month: 'Feb', value: 31.2 },
    { month: 'Mar', value: 34.8 },
    { month: 'Apr', value: 38.5 },
    { month: 'May', value: 40.2 },
    { month: 'Jun', value: 42.1 }
  ],
  studentDistribution: [
    { discipline: 'Engineering', percentage: 42, count: 5393, color: '#685CFF' },
    { discipline: 'Management', percentage: 24, count: 3082, color: '#4C8DFF' },
    { discipline: 'Science', percentage: 18, count: 2311, color: '#6CE7FF' },
    { discipline: 'Arts', percentage: 10, count: 1284, color: '#DDBB7A' },
    { discipline: 'Others', percentage: 6, count: 772, color: '#9BA3AF' }
  ],
  topCourses: [
    { title: 'B.Tech Computer Science', enrolled: 2842, growth: '+14%' },
    { title: 'BBA Global Business', enrolled: 1396, growth: '+9%' },
    { title: 'MBA Financial Engineering', enrolled: 842, growth: '+18%' },
    { title: 'B.Tech Electronics & Comm', enrolled: 620, growth: '+6%' }
  ]
};

export const APPLICATION_TIMELINE = [
  { title: 'Application Submitted', date: '08 Oct 2026, 10:24 AM', status: 'completed' },
  { title: 'Documents Verified', date: '09 Oct 2026, 02:15 PM', status: 'completed' },
  { title: 'Payment Received', date: '09 Oct 2026, 03:40 PM', status: 'completed' },
  { title: 'Approved', date: '10 Oct 2026, 11:20 AM', status: 'completed' }
];

export const NETWORK_HUBS = [
  { name: 'Stanford Innovation Node', city: 'Palo Alto', country: 'USA', students: 340, type: 'Research' },
  { name: 'Cambridge Education Nexus', city: 'Cambridge', country: 'UK', students: 280, type: 'Academic' },
  { name: 'IIT Delhi Connected Labs', city: 'New Delhi', country: 'India', students: 1250, type: 'Partner Hub' },
  { name: 'NUS Asia Gateway', city: 'Singapore', country: 'Singapore', students: 420, type: 'Global Exchange' },
  { name: 'Dubai Knowledge Park', city: 'Dubai', country: 'UAE', students: 580, type: 'Regional Hub' },
  { name: 'University of Toronto Hub', city: 'Toronto', country: 'Canada', students: 230, type: 'Collaborative' }
];
