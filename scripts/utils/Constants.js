// Skill configuration
const SKILL_CONFIG = {
  HTML: {
    unlockedByDefault: true,
    prereq: [],
    question: "Which HTML tag is used to create a hyperlink? (answer with the tag name only)",
    answer: ["a"],
    description: "Learn the fundamentals of HTML markup"
  },
  CSS: {
    prereq: ["HTML"],
    question: "Which CSS property changes the text color?",
    answer: ["color"],
    description: "Style your HTML with CSS"
  },
  JavaScript: {
    prereq: ["CSS"],
    question: "Which keyword declares a constant in JavaScript?",
    answer: ["const"],
    description: "Add interactivity with JavaScript"
  },
  React: {
    prereq: ["JavaScript"],
    question: "Name the React hook used to manage state in function components.",
    answer: ["usestate", "use state"],
    description: "Build modern UIs with React"
  },
  "Node.js": {
    prereq: ["JavaScript"],
    question: "What command is used to initialize a new Node.js project?",
    answer: ["npm init"],
    description: "Server-side JavaScript development"
  },
  MongoDB: {
    prereq: ["Node.js"],
    question: "What does NoSQL stand for?",
    answer: ["not only sql", "not only structured query language"],
    description: "Document-based database system"
  }
};

// Storage keys
const STORAGE_KEYS = {
  SKILLS: "lu_skills_unlocked_v2",
  USER: "lu_user_data"
};

// API endpoints
const API_ENDPOINTS = {
  LOGIN: "/api/auth/login",
  REGISTER: "/api/auth/register",
  SKILLS: "/api/skills",
  USER_SKILLS: "/api/skills/my-skills",
  UNLOCK_SKILL: "/api/skills/:skillId/unlock"
};
