// ─── Portfolio Content ────────────────────────────────────────────────────
// Edit this file to update your portfolio content.
// All personal information lives here.

export const personal = {
  name: "Bhavya",
  monogram: "B /",
  headline: "Computer Science Engineering Student",
  tagline: "AI/ML · Software Engineering · Product Thinking · Design",
  intro: `Hi, I'm Bhavya — a computer science student interested in building
thoughtful products, exploring artificial intelligence, and turning ideas
into things people can actually use.`,
  bio: `I'm a Computer Science Engineering student specializing in AI and Machine Learning at The NorthCap University. I build across AI/ML, healthcare technology, and full-stack software, and I'm currently exploring adversarial attacks and model robustness.`,
  bioParagraph2: `Beyond development, I serve as President of IEEE HAC and Vice-President of the Brainstorming Club. I enjoy collaborating with people, testing ideas, and learning by building.`,
  email: "tiwaribhavya45@gmail.com",
  github: "https://github.com/Bhavyacodespdf",
  linkedin: "https://www.linkedin.com/in/bhavya-tiwari-909b41212/",
  leetcode: "https://leetcode.com/u/enspyercodes/",
  location: "Delhi, India",
} as const;

export const focus = [
  "AI agents and multi-agent systems",
  "Adversarial machine learning and model robustness",
  "Full-stack product development",
  "Healthcare AI",
] as const;

// ─── Academics ────────────────────────────────────────────────────────────
export const academics = {
  cgpa:     "9.94",
  program:  "Computer Science Engineering, AI/ML",
  university: "The NorthCap University",
  highlights: [
    { stat: "9.94 CGPA",          detail: "Computer Science Engineering, AI/ML" },
    { stat: "Dean's List",        detail: "Academic recognition"                },
    { stat: "Hatch Scholarship",  detail: "Scholarship awardee"                 },
  ],
} as const;

// ─── Awards ───────────────────────────────────────────────────────────────
export interface Award {
  title:       string;
  event:       string;
  organizer?:  string;
  description: string;
  link?:       string;
  linkLabel?:  string;
}

export const awards: Award[] = [
  {
    title:      "3rd Place — Innovation Award",
    event:      "Israeli–Indian Hackathon 2025",
    organizer:  "Centre of Excellence in Data Science & AI, Thapar Institute · Tel Aviv University · University of Haifa",
    description: "Placed third in the Innovation Award category at the Israeli–Indian Hackathon 2025, an international event bringing together students from Israel and India to collaborate on real-world AI challenges.",
    link:       "https://indianexpress.com/article/world/india-israel-hackathon-restorative-healthcare-winners-10832336/",
    linkLabel:  "event coverage ↗",
  },
  {
    title:      "Hatch Scholarship Awardee",
    event:      "The NorthCap University",
    description: "Recognised as a Hatch Scholarship Awardee for academic merit.",
  },
  {
    title:      "Dean's List",
    event:      "The NorthCap University",
    description: "Recognised on the Dean's List for academic performance.",
  },
  {
    title:      "Selected — Round 3",
    event:      "Hans Innoverse 2.0",
    organizer:  "Hansraj College",
    description: "Selected for the third round of Hans Innoverse 2.0.",
  },
];

// ─── Projects ────────────────────────────────────────────────────────────
export interface Project {
  title: string;
  description: string;
  features?: string[];
  tech: string[];
  category: string;
  status: "In Progress" | "Completed" | "Concept" | "Prototype";
  repo?: string;
  demo?: string;
}

export const projects: Project[] = [
  {
    title: "Sovereign Industrial AI Workbench",
    description:
      "A self-contained, air-gapped, on-premise AI platform for industrial environments where operational telemetry and proprietary documentation must remain within the factory boundary.",
    features: [
      "Real-time telemetry monitoring — temperature, vibration, motor current, atmospheric gas",
      "Interactive 3D factory visualisation with Three.js and WebGL",
      "Deterministic safety interlocks operating independently of LLM outputs",
      "Local document retrieval via SentenceTransformers embeddings and Qdrant",
      "Causal GraphRAG and knowledge graph for grounded industrial diagnostics",
      "OCR-based document ingestion with prompt-injection sanitisation",
      "Two-person approval workflow for actuator-control actions",
      "Multi-agent orchestration using LangGraph",
    ],
    tech: ["Python", "LangGraph", "SentenceTransformers", "Qdrant", "Three.js", "WebSockets", "Tesseract OCR"],
    category: "Industrial AI · Agentic Systems · Safety-Critical AI",
    status: "In Progress",
  },
  {
    title: "CycleGlow",
    description:
      "An AI-powered PCOS detection and wellness application combining machine learning with personalised, retrieval-grounded lifestyle recommendations.",
    features: [
      "XGBoost-based prediction pipeline with symptom preprocessing",
      "LangGraph multi-agent orchestration",
      "RAG-based recommendations using LangChain and FAISS",
      "Bilingual Hindi/English interface",
      "Firebase authentication and Firestore integration",
    ],
    tech: ["Python", "XGBoost", "scikit-learn", "LangGraph", "LangChain", "FAISS", "Firebase"],
    category: "Healthcare AI · Machine Learning · Multi-Agent Systems",
    status: "Completed",
    repo: "https://github.com/Bhavyacodespdf/CycleGlow",
  },
  {
    title: "CampusCart",
    description:
      "A college canteen ordering and outlet-management platform connecting students, managers, cashiers, and administrators.",
    features: [
      "Google authentication and campus outlet discovery",
      "Digital wallet, counter payments, and loyalty points",
      "Budget-aware AI Surprise Meal recommendations",
      "Scheduled pickup orders with live order tracking",
      "QR-code and six-digit pickup verification",
      "Verified dish reviews, menu search, and one-tap reordering",
      "Outlet inventory, order queues, and daily specials management",
      "Role-based administration, staff assignments, and audit logging",
    ],
    tech: ["React", "Firebase", "Python"],
    category: "Full-Stack · Campus Technology · AI-Assisted Recommendations",
    status: "In Progress",
  },
  {
    title: "CareerConnect AI",
    description:
      "An AI-enhanced campus placement platform combining deterministic eligibility rules with locally hosted LLM assistance.",
    features: [
      "14 REST endpoints built with Spring Boot",
      "Strategy-pattern eligibility engine with explainable results",
      "Local Llama 3.2 integration via Ollama",
      "Context grounding and advisory guardrails",
      "Graceful degradation when the LLM is unavailable",
      "31 domain and HTTP test scenarios",
    ],
    tech: ["Java 17", "Spring Boot 3.3", "REST APIs", "Ollama", "Llama 3.2"],
    category: "Backend Engineering · Local LLMs · AI Applications",
    status: "Completed",
    repo: "https://github.com/Bhavyacodespdf/CareerConnect",
  },
  {
    title: "MediCare",
    description:
      "A desktop healthcare management system built in C with GTK+3 for managing patient, doctor, and appointment records.",
    features: [
      "Authentication and record management",
      "File-based data storage and retrieval",
      "Appointment scheduling",
      "Input validation and error handling",
      "Desktop graphical interface for hospital staff",
    ],
    tech: ["C", "GTK+3"],
    category: "Software Engineering · Healthcare Systems",
    status: "Completed",
    repo: "https://github.com/Bhavyacodespdf/medicare",
  },
];

// ─── Research ─────────────────────────────────────────────────────────────
export const research = {
  area: "Adversarial Machine Learning",
  description:
    "Exploring adversarial attacks against machine learning models — investigating model vulnerabilities, evaluating prediction robustness, and understanding the effects of adversarial perturbations.",
  focus: [
    "Adversarial attack methods and threat models",
    "Evaluating model behaviour under adversarial inputs",
    "Robustness evaluation and defensive approaches",
    "Trade-offs between predictive performance and robustness",
  ],
  status: "Ongoing",
} as const;

// ─── Experience ───────────────────────────────────────────────────────────
export interface Experience {
  org: string;
  role: string;
  period?: string;
  description: string;
  link?: string;
}

export const experience: Experience[] = [
  {
    org: "Google Developer Group on Campus",
    role: "Graphic & Content Lead",
    description:
      "Creating visual content and managing design deliverables for developer community events, workshops, and outreach campaigns on campus.",
  },
  {
    org: "OPTICA NCU",
    role: "Graphic Head",
    description:
      "Leading the design team for the university's OPTICA student chapter — producing event graphics, promotional material, and digital content for technical events.",
  },
  {
    org: "NSS NCU",
    role: "Volunteer",
    description:
      "Participating in community service initiatives and social outreach programmes organised by the National Service Scheme chapter at the university.",
  },
  {
    org: "PRAYAAS NCU",
    role: "Graphic Team",
    description:
      "Contributing design work to PRAYAAS, a student-led initiative focused on social causes, education, and community impact.",
  },
];

// ─── Skills ───────────────────────────────────────────────────────────────
export const skills = {
  "Programming": ["Java", "Python", "C", "C++"],
  "ML & Data Science": [
    "NumPy", "Pandas", "scikit-learn", "XGBoost", "LangChain", "LangGraph", "FAISS", "Model Evaluation",
  ],
  "Web Development": [
    "React", "JavaScript", "TypeScript", "HTML", "CSS", "Spring Boot", "FastAPI",
  ],
  "Tools & Platforms": ["Git", "GitHub", "Docker", "Firebase", "Ollama", "Streamlit"],
} as const;
