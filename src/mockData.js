/** Mock data for development and portfolio demonstrations */

export const mockCompanies = [
  {
    handle: "acme-corp",
    name: "Acme Corporation",
    description: "Leading provider of innovative solutions in tech and software development.",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png",
    website: "https://acme-corp.com",
    employees: "500-1000"
  },
  {
    handle: "tech-innovations",
    name: "Tech Innovations Inc",
    description: "Cutting-edge tech company specializing in AI and machine learning.",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Open_AI_logo.svg/1024px-Open_AI_logo.svg.png",
    website: "https://techinnovations.com",
    employees: "200-500"
  },
  {
    handle: "digital-solutions",
    name: "Digital Solutions Ltd",
    description: "Full-service digital agency delivering web and mobile applications.",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Adobe_Systems_logo_and_wordmark.svg/1024px-Adobe_Systems_logo_and_wordmark.svg.png",
    website: "https://digitalsolutions.io",
    employees: "100-200"
  },
  {
    handle: "cloud-systems",
    name: "Cloud Systems Global",
    description: "Enterprise cloud infrastructure and DevOps solutions provider.",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Google_%22G%22_Logo.svg/1024px-Google_%22G%22_Logo.svg.png",
    website: "https://cloudsystems.global",
    employees: "1000+"
  },
  {
    handle: "startup-hub",
    name: "StartUp Hub",
    description: "Fast-growing startup providing SaaS solutions for businesses.",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Microsoft_logo_%281989%29.svg/1024px-Microsoft_logo_%281989%29.svg.png",
    website: "https://startuphub.dev",
    employees: "50-100"
  }
];

export const mockJobs = [
  {
    id: 1,
    title: "Senior React Developer",
    companyHandle: "tech-innovations",
    salary: 120000,
    equity: 0.05,
    description: "We're looking for an experienced React developer to lead our frontend team. You'll work on cutting-edge AI products.",
    salary_min: 100000,
    salary_max: 140000
  },
  {
    id: 2,
    title: "Full Stack Engineer",
    companyHandle: "acme-corp",
    salary: 110000,
    equity: 0.03,
    description: "Join our team and build scalable web applications using Node.js and React.",
    salary_min: 95000,
    salary_max: 125000
  },
  {
    id: 3,
    title: "DevOps Engineer",
    companyHandle: "cloud-systems",
    salary: 130000,
    equity: 0.02,
    description: "Help us manage and optimize our cloud infrastructure. Experience with Kubernetes and AWS required.",
    salary_min: 115000,
    salary_max: 145000
  },
  {
    id: 4,
    title: "Frontend Engineer",
    companyHandle: "digital-solutions",
    salary: 95000,
    equity: 0.04,
    description: "Create beautiful and responsive user interfaces for our web applications.",
    salary_min: 85000,
    salary_max: 105000
  },
  {
    id: 5,
    title: "Product Manager",
    companyHandle: "startup-hub",
    salary: 105000,
    equity: 0.08,
    description: "Lead product strategy and vision for our growing SaaS platform.",
    salary_min: 95000,
    salary_max: 115000
  },
  {
    id: 6,
    title: "Backend Engineer",
    companyHandle: "tech-innovations",
    salary: 125000,
    equity: 0.04,
    description: "Build robust backend services for our AI platform. Python and Django experience preferred.",
    salary_min: 110000,
    salary_max: 140000
  },
  {
    id: 7,
    title: "QA Engineer",
    companyHandle: "acme-corp",
    salary: 85000,
    equity: 0.02,
    description: "Ensure quality across our product suite. Automation testing experience required.",
    salary_min: 75000,
    salary_max: 95000
  },
  {
    id: 8,
    title: "UI/UX Designer",
    companyHandle: "digital-solutions",
    salary: 90000,
    equity: 0.03,
    description: "Design intuitive user experiences for our web and mobile applications.",
    salary_min: 80000,
    salary_max: 100000
  },
  {
    id: 9,
    title: "Cloud Architect",
    companyHandle: "cloud-systems",
    salary: 145000,
    equity: 0.03,
    description: "Design and implement scalable cloud solutions for enterprise clients.",
    salary_min: 130000,
    salary_max: 160000
  },
  {
    id: 10,
    title: "Data Scientist",
    companyHandle: "tech-innovations",
    salary: 135000,
    equity: 0.05,
    description: "Build machine learning models and analyze big data. Python and TensorFlow experience required.",
    salary_min: 120000,
    salary_max: 150000
  }
];

export const mockUsers = {
  testuser: {
    username: "testuser",
    firstName: "Test",
    lastName: "User",
    email: "test@example.com",
    applications: []
  }
};

export const mockUser = {
  username: "testuser",
  firstName: "Test",
  lastName: "User",
  email: "test@example.com",
  applications: []
};
