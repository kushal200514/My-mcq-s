import { Question, WeekMeta } from '../types';

export const WEEKS_METADATA: WeekMeta[] = [
  {
    week: 1,
    title: 'Introduction to Interactive Systems',
    module: 'Unit 4: Introduction',
    description: 'Foundations of HCI, history & evaluation phases of computers, user categories, WIMP interface paradigm, development models (Waterfall vs Spiral), and usability components.',
    topics: ['Computer Evaluation Phases', 'User Categories', 'WIMP Interfaces', 'Spiral Model Usability', 'Nielsen Usability Components', 'System vs User-Centered Design']
  },
  {
    week: 2,
    title: 'Usability Requirements & Contextual Inquiry',
    module: 'Unit 5: Usability Requirements',
    description: 'User requirement gathering, Contextual Inquiry methodology (stages, modes, duration), Affinity Diagramming, and SRS specifications (functional vs non-functional).',
    topics: ['Contextual Inquiry Stages', 'Active & Passive Inquiry', 'Affinity Diagram Method', 'SRS Functional Attributes', 'Non-functional Usability Requirements']
  },
  {
    week: 3,
    title: 'Usable Interface Design & Shneiderman Rules',
    module: 'Unit 6: Requirements & Interface Design',
    description: 'Interface design principles, Ben Shneiderman’s Eight Golden Rules, Miller’s short-term memory law (1956), DFDs in semi-formal design, and Apple HIG guidelines.',
    topics: ['Shneiderman’s 8 Golden Rules', 'Miller’s Law (1956)', 'Interface vs Code Design', 'DFD Semi-formal Modeling', 'Apple HIG Guidelines']
  },
  {
    week: 4,
    title: 'Interaction Models & Prototyping',
    module: 'Unit 7: Usable Interface Design',
    description: 'Norman’s 7-stage Model of Interaction (Gulf of Execution & Gulf of Evaluation), Slips vs Mistakes, prototyping fidelities (Low vs High, Paper mockups), Wizard of Oz technique, and Cognitive Walkthrough.',
    topics: ['Norman’s Interaction Model', 'Gulf of Execution & Evaluation', 'Slips and Mistakes', 'Prototyping Techniques', 'Wizard of Oz Method', 'Cognitive Walkthrough']
  },
  {
    week: 5,
    title: 'Rapid Usability Evaluation',
    module: 'Unit 8: Rapid Usability Evaluation',
    description: 'Jakob Nielsen’s 10 Usability Heuristics, heuristic evaluation checklists, expert review teams, System Usability Scale (SUS), and After-Scenario Questionnaire (ASQ).',
    topics: ['Nielsen’s 10 Heuristics', 'Heuristic Evaluation Checklist', 'SUS (System Usability Scale)', 'ASQ Questionnaire', 'Self-Report Methods']
  },
  {
    week: 6,
    title: 'Converting Design to System: DFD & ERD',
    module: 'Unit 9: Converting Design to System',
    description: 'Structural modeling with Data Flow Diagrams (DFDs), Entity Relationship Diagrams (ERDs - Peter Chen 1976), modular cohesion (logical, temporal) and coupling (content, data).',
    topics: ['Good Design Attributes', 'Peter Chen ERD (1976)', 'DFD Level 0 & Level 1 Stores', 'Cohesion Types', 'Coupling Types', 'Function vs Object Orientation']
  },
  {
    week: 7,
    title: 'Object-Oriented Design & UML',
    module: 'Unit 10: Converting Design to System',
    description: 'Object-Oriented Design (OOD) foundations, Unified Modeling Language (UML) 5 views, Component diagrams, Entity objects, class attributes and operations.',
    topics: ['Object-Oriented Design Principles', 'UML 5 System Views', 'Component Diagram Implementation', 'Entity Objects', 'Class Attributes & Operations']
  },
  {
    week: 8,
    title: 'System Implementation & Code Review',
    module: 'Unit 11: System Implementation',
    description: 'Standard coding guidelines, function sizing limits (<=10 LOC), code inspection vs code walkthrough (hand simulation, 3-5 members), uninitialized variables, and test suites.',
    topics: ['Coding Standards & Guidelines', 'Function Length Rules', 'Static Code Inspection', 'Code Walkthrough Teams', 'White-box Testing Basics']
  },
  {
    week: 9,
    title: 'System Implementation: Black-Box Testing',
    module: 'Unit 12: System Implementation',
    description: 'Black-box functional testing principles, Equivalence Class Partitioning, Boundary Value Analysis (BVA), single representative testing, and off-by-one errors.',
    topics: ['Black-Box / Functional Testing', 'Equivalence Class Partitioning', 'Boundary Value Analysis (BVA)', 'Single-Value Testing Rule', 'Test Suite Significance']
  },
  {
    week: 10,
    title: 'White-Box Testing & Program Flow Graphs',
    module: 'Unit 13: System Implementation',
    description: 'Control Flow Graphs (CFG), statement vs branch coverage, linearly independent paths, McCabe’s Cyclomatic Complexity (E - N + 2), and system testing stages (Alpha, Beta, Acceptance).',
    topics: ['Control Flow Graphs (CFG)', 'Branch & Path Coverage', 'Cyclomatic Complexity (E-N+2)', 'Alpha, Beta & Acceptance Testing', 'Integration Stubs & Bottom-Up']
  },
  {
    week: 11,
    title: 'Empirical Usability Evaluation & Experiment Design',
    module: 'Unit 14: Empirical Usability Evaluation',
    description: 'Controlled experiments in HCI, 4 stages of empirical research, testable vs non-testable research questions, null hypothesis, data scales (nominal, interval), confounding variables, and participant sizing.',
    topics: ['Empirical Research 4 Stages', 'Testable Research Questions', 'Null vs Alternative Hypothesis', 'Nominal & Interval Scales', 'Confounding Variables', 'Between-Subject Study Design']
  },
  {
    week: 12,
    title: 'Empirical Data Analysis & Project Management',
    module: 'Unit 15: Conclusion',
    description: 'Statistical significance testing, refuting null hypothesis, Type I errors (false positives), parametric vs non-parametric tests, Boehm’s COCOMO cost estimation (3 stages), Agile/Scrum, and Gantt charts.',
    topics: ['Significance Testing & Refuting H0', 'Type I Error (False Positive)', 'Parametric vs Non-parametric Tests', 'COCOMO Cost Model (3 Stages)', 'Agile & Scrum', 'Gantt Chart Planning']
  }
];

export const INITIAL_QUESTIONS: Question[] = [
  // ==================== WEEK 1 ====================
  {
    id: 'w1-q1',
    originalQuestionNumber: 1,
    week: 1,
    module: 'Unit 4: Introduction',
    topic: 'Computer Evaluation Phases',
    questionText: 'While we talk about the evaluation phases of the computer, ___________ is called the modern age of computer.',
    questionType: 'single',
    options: [
      { id: 'a', text: '1985 onwards' },
      { id: 'b', text: '1998 onwards' },
      { id: 'c', text: '2007 onwards' },
      { id: 'd', text: '2011 onwards' }
    ],
    correctAnswer: 'd',
    explanation: 'In the timeline of computer interaction evolution covered in NPTEL, the period from 2011 onwards is classified as the "modern age of computers", characterized by ubiquitous mobile interfaces, cloud-connected multi-touch devices, and pervasive AI.',
    difficulty: 'easy',
    sourcePdf: '2024 Design & Implementation of Human-Computer Interfaces - Complete Assignments PDF',
    sourcePage: 2,
    verificationStatus: 'verified'
  },
  {
    id: 'w1-q2',
    originalQuestionNumber: 2,
    week: 1,
    module: 'Unit 4: Introduction',
    topic: 'User Categories',
    questionText: 'Which among the following is NOT a generic category of users?',
    questionType: 'single',
    options: [
      { id: 'a', text: 'Novice' },
      { id: 'b', text: 'Super knowledgeable' },
      { id: 'c', text: 'Intermittent' },
      { id: 'd', text: 'Expert' }
    ],
    correctAnswer: 'b',
    explanation: 'The standard three user classifications recognized in HCI literature are: Novice (first-time), Knowledgeable Intermittent (periodic users requiring recognition over recall), and Expert Frequent users. "Super knowledgeable" is not a standard HCI user category.',
    difficulty: 'easy',
    sourcePdf: '2024 Design & Implementation of Human-Computer Interfaces - Complete Assignments PDF',
    sourcePage: 2,
    verificationStatus: 'verified'
  },
  {
    id: 'w1-q3',
    originalQuestionNumber: 3,
    week: 1,
    module: 'Unit 4: Introduction',
    topic: 'WIMP Interfaces',
    questionText: 'What is the full form of the acronym WIMP?',
    questionType: 'single',
    options: [
      { id: 'a', text: 'Windows Interfaces Menus Pointers' },
      { id: 'b', text: 'Window Icons Menus Pointers' },
      { id: 'c', text: 'Wizards Interfaces Mouse Pointers' },
      { id: 'd', text: 'None of the above' }
    ],
    correctAnswer: 'b',
    explanation: 'WIMP stands for Window, Icons, Menus, Pointers (or Pointer). It denotes the standard graphical user interface style that succeeded command-line interfaces.',
    difficulty: 'easy',
    sourcePdf: '2024 Design & Implementation of Human-Computer Interfaces - Complete Assignments PDF',
    sourcePage: 3,
    verificationStatus: 'verified'
  },
  {
    id: 'w1-q3-alt',
    originalQuestionNumber: 3,
    week: 1,
    module: 'Unit 4: Introduction',
    topic: 'Spiral Model Usability',
    questionText: 'In the Spiral Model, why is the second quadrant crucial for interactive software development?',
    questionType: 'single',
    options: [
      { id: 'a', text: 'It defines the UI layout' },
      { id: 'b', text: 'It finalizes the system architecture' },
      { id: 'c', text: 'It identifies and mitigates usability risks via prototyping' },
      { id: 'd', text: 'It handles testing and deployment' }
    ],
    correctAnswer: 'c',
    explanation: 'Quadrant 2 of Boehm’s Spiral Model is dedicated to risk analysis and risk resolution. For interactive software, prototypes are built in this quadrant to uncover and resolve usability risks before large-scale coding.',
    difficulty: 'medium',
    sourcePdf: 'NPTEL Assignment 1 Detailed Solution - IIT Guwahati',
    sourcePage: 1,
    verificationStatus: 'verified'
  },
  {
    id: 'w1-q4',
    originalQuestionNumber: 4,
    week: 1,
    module: 'Unit 4: Introduction',
    topic: 'Interaction Modes',
    questionText: 'Feeds of social networking sites such as Facebook and Twitter are an example of:',
    questionType: 'single',
    options: [
      { id: 'a', text: 'Synchronous remote interactive system' },
      { id: 'b', text: 'Asynchronous remote interaction' }
    ],
    correctAnswer: 'b',
    explanation: 'Social networking feeds allow users to post and read messages at different times across different locations, classifying them as asynchronous remote interaction.',
    difficulty: 'easy',
    sourcePdf: '2024 Design & Implementation of Human-Computer Interfaces - Complete Assignments PDF',
    sourcePage: 3,
    verificationStatus: 'verified'
  },
  {
    id: 'w1-q4-alt',
    originalQuestionNumber: 4,
    week: 1,
    module: 'Unit 4: Introduction',
    topic: 'Usability Concepts',
    questionText: "What does the term 'utility' refer to in the context of usability?",
    questionType: 'single',
    options: [
      { id: 'a', text: 'Speed of task completion' },
      { id: 'b', text: 'Visual appeal of the design' },
      { id: 'c', text: 'Functional support for user needs' },
      { id: 'd', text: 'Frequency of feature updates' }
    ],
    correctAnswer: 'c',
    explanation: "Utility answers the question: 'Does it do what the user needs it to do?'. It measures whether the system's functionality meets the user's practical task requirements.",
    difficulty: 'medium',
    sourcePdf: 'NPTEL Assignment 1 Detailed Solution - IIT Guwahati',
    sourcePage: 1,
    verificationStatus: 'verified'
  },
  {
    id: 'w1-q5',
    originalQuestionNumber: 5,
    week: 1,
    module: 'Unit 4: Introduction',
    topic: 'Computing Devices',
    questionText: 'Which one of the following is NOT a computer?',
    questionType: 'single',
    options: [
      { id: 'a', text: 'Desktop' },
      { id: 'b', text: 'Digital Pedometer' },
      { id: 'c', text: 'Smartphone' },
      { id: 'd', text: 'None of the above' }
    ],
    correctAnswer: 'd',
    explanation: 'Desktops, digital pedometers (containing embedded microcontrollers), and smartphones are all computers. Therefore, "None of the above" is the correct answer.',
    difficulty: 'easy',
    sourcePdf: '2024 Design & Implementation of Human-Computer Interfaces - Complete Assignments PDF',
    sourcePage: 3,
    verificationStatus: 'verified'
  },
  {
    id: 'w1-q6',
    originalQuestionNumber: 6,
    week: 1,
    module: 'Unit 4: Introduction',
    topic: 'Interactive Software Lifecycle',
    questionText: 'Interactive software development is _________ in nature.',
    questionType: 'single',
    options: [
      { id: 'a', text: 'sporadic' },
      { id: 'b', text: 'iterative' },
      { id: 'c', text: 'variable' },
      { id: 'd', text: 'discrete' }
    ],
    correctAnswer: 'b',
    explanation: 'User interfaces and interactive systems cannot be fully perfected in a single pass; they require continuous prototyping, user evaluation, and iterative refinement.',
    difficulty: 'easy',
    sourcePdf: '2024 Design & Implementation of Human-Computer Interfaces - Complete Assignments PDF',
    sourcePage: 3,
    verificationStatus: 'verified'
  },
  {
    id: 'w1-q7',
    originalQuestionNumber: 7,
    week: 1,
    module: 'Unit 4: Introduction',
    topic: 'Nielsen Usability Components',
    questionText: 'Which of the following is NOT one of the five quality components of usability proposed by Jakob Nielsen?',
    questionType: 'single',
    options: [
      { id: 'a', text: 'Learnability' },
      { id: 'b', text: 'Efficiency' },
      { id: 'c', text: 'Satisfaction' },
      { id: 'd', text: 'Memorization' }
    ],
    correctAnswer: 'd',
    explanation: "Jakob Nielsen's five quality components of usability are: Learnability, Efficiency, Memorability (not 'Memorization'), Errors, and Satisfaction.",
    difficulty: 'easy',
    sourcePdf: '2024 Design & Implementation of Human-Computer Interfaces - Complete Assignments PDF',
    sourcePage: 3,
    verificationStatus: 'verified'
  },
  {
    id: 'w1-q8',
    originalQuestionNumber: 8,
    week: 1,
    module: 'Unit 4: Introduction',
    topic: 'Waterfall Model',
    questionText: 'Which of the following is NOT a characteristic of the Waterfall model?',
    questionType: 'single',
    options: [
      { id: 'a', text: 'Feasibility study' },
      { id: 'b', text: 'Learnability study' },
      { id: 'c', text: 'System integration and testing' },
      { id: 'd', text: 'Maintenance' }
    ],
    correctAnswer: 'b',
    explanation: 'The classic Waterfall lifecycle phases include feasibility study, requirements, design, coding, integration/testing, and maintenance. "Learnability study" is an HCI usability evaluation technique, not a Waterfall phase.',
    difficulty: 'easy',
    sourcePdf: '2024 Design & Implementation of Human-Computer Interfaces - Complete Assignments PDF',
    sourcePage: 4,
    verificationStatus: 'verified'
  },
  {
    id: 'w1-q9',
    originalQuestionNumber: 9,
    week: 1,
    module: 'Unit 4: Introduction',
    topic: 'Spiral Model Quadrants',
    questionText: "‘Identify objectives’ and 'customer evaluation and planning' are in the _______ and ________ quadrant of the spiral model respectively.",
    questionType: 'single',
    options: [
      { id: 'a', text: 'First, Fourth' },
      { id: 'b', text: 'Second, Third' },
      { id: 'c', text: 'Third, Fourth' },
      { id: 'd', text: 'Fourth, Second' }
    ],
    correctAnswer: 'a',
    explanation: 'In the 4 quadrants of Barry Boehm’s Spiral Model: Q1 = Determine objectives, alternatives, and constraints; Q2 = Identify and resolve risks; Q3 = Develop and verify next-level product; Q4 = Plan next phases and customer evaluation.',
    difficulty: 'medium',
    sourcePdf: '2024 Design & Implementation of Human-Computer Interfaces - Complete Assignments PDF',
    sourcePage: 4,
    verificationStatus: 'verified'
  },
  {
    id: 'w1-q10',
    originalQuestionNumber: 10,
    week: 1,
    module: 'Unit 4: Introduction',
    topic: 'System Centered Design',
    questionText: 'Which of the following statements best describes System Centered Design (SCD)?',
    questionType: 'single',
    options: [
      { id: 'a', text: 'Design based on user abilities, context, and goals/needs' },
      { id: 'b', text: 'Design focused on what can be easily built using available tools' },
      { id: 'c', text: "Design considering programmer's convenience and interests" },
      { id: 'd', text: 'Design focused on system reliability and performance' }
    ],
    correctAnswer: 'b',
    explanation: 'In NPTEL HCI course lectures, System Centered Design (SCD) is defined as designing around the capabilities of the hardware/tools and programmer convenience rather than user needs. Official NPTEL assessment accepted both (b) and (c).',
    difficulty: 'medium',
    sourcePdf: '2024 Design & Implementation of Human-Computer Interfaces - Complete Assignments PDF',
    sourcePage: 4,
    verificationStatus: 'dual_accepted',
    verificationNotes: 'NPTEL official evaluation accepted both (b) and (c) as correct answers.'
  },
  {
    id: 'w1-q10-alt',
    originalQuestionNumber: 10,
    week: 1,
    module: 'Unit 4: Introduction',
    topic: 'System Centered Design',
    questionText: 'Which design approach focuses on what a programmer finds interesting to build?',
    questionType: 'single',
    options: [
      { id: 'a', text: 'System-Centered Design' },
      { id: 'b', text: 'User-Centered Design' },
      { id: 'c', text: 'Utility-Based Design' },
      { id: 'd', text: 'Participatory Design' }
    ],
    correctAnswer: 'a',
    explanation: 'System-Centered Design prioritizes the developer’s technology stack and what the programmer finds convenient or interesting to build, as opposed to User-Centered Design.',
    difficulty: 'easy',
    sourcePdf: 'NPTEL Assignment 1 Detailed Solution - IIT Guwahati',
    sourcePage: 3,
    verificationStatus: 'verified'
  },

  // ==================== WEEK 2 ====================
  {
    id: 'w2-q1',
    originalQuestionNumber: 1,
    week: 2,
    module: 'Unit 5: Usability Requirements',
    topic: 'Contextual Inquiry',
    questionText: 'Contextual inquiry is also known as ________.',
    questionType: 'single',
    options: [
      { id: 'a', text: 'Interview' },
      { id: 'b', text: 'Observation' },
      { id: 'c', text: 'Semi-structured interview' }
    ],
    correctAnswer: 'c',
    explanation: 'Contextual inquiry combines observation with open-ended and guided questions in the user’s real environment, functioning as a semi-structured interview.',
    difficulty: 'easy',
    sourcePdf: '2024 Design & Implementation of Human-Computer Interfaces - Complete Assignments PDF',
    sourcePage: 6,
    verificationStatus: 'verified'
  },
  {
    id: 'w2-q2',
    originalQuestionNumber: 2,
    week: 2,
    module: 'Unit 5: Usability Requirements',
    topic: 'SRS Representation',
    questionText: 'In SRS, functions are represented as: (Select all that apply)',
    questionType: 'multiple',
    options: [
      { id: 'a', text: 'Function name' },
      { id: 'b', text: 'Input' },
      { id: 'c', text: 'Output' },
      { id: 'd', text: 'Description' },
      { id: 'e', text: 'Motivation' }
    ],
    correctAnswer: ['a', 'b', 'c', 'd'],
    explanation: 'In standard Software Requirements Specifications (SRS), each functional requirement is documented with Function Name, Input, Output, and Description. "Motivation" is not a formal SRS function descriptor.',
    difficulty: 'medium',
    sourcePdf: '2024 Design & Implementation of Human-Computer Interfaces - Complete Assignments PDF',
    sourcePage: 6,
    verificationStatus: 'verified'
  },
  {
    id: 'w2-q2-alt',
    originalQuestionNumber: 2,
    week: 2,
    module: 'Unit 5: Usability Requirements',
    topic: 'SRS Representation',
    questionText: 'In SRS, functions are NOT represented as:',
    questionType: 'single',
    options: [
      { id: 'a', text: 'Function name' },
      { id: 'b', text: 'Input' },
      { id: 'c', text: 'Output' },
      { id: 'd', text: 'Description' },
      { id: 'e', text: 'Motivation' }
    ],
    correctAnswer: 'e',
    explanation: 'Functions in an SRS document specify Function Name, Input data, Output data, and Description. They do NOT contain Motivation.',
    difficulty: 'easy',
    sourcePdf: 'NPTEL Assignment 2 Detailed Solution - IIT Guwahati',
    sourcePage: 4,
    verificationStatus: 'verified'
  },
  {
    id: 'w2-q3',
    originalQuestionNumber: 3,
    week: 2,
    module: 'Unit 5: Usability Requirements',
    topic: 'Contextual Inquiry Modes',
    questionText: 'Contextual inquiry can be done in _______ and passive mode.',
    questionType: 'single',
    options: [
      { id: 'a', text: 'active' },
      { id: 'b', text: 'semi-active' },
      { id: 'c', text: 'neutral' }
    ],
    correctAnswer: 'a',
    explanation: 'Contextual inquiry operates in two distinct modes: Active mode (researcher interacts and probes the user while they work) and Passive mode (silent, uninterrupted observation).',
    difficulty: 'easy',
    sourcePdf: '2024 Design & Implementation of Human-Computer Interfaces - Complete Assignments PDF',
    sourcePage: 7,
    verificationStatus: 'verified'
  },
  {
    id: 'w2-q4',
    originalQuestionNumber: 4,
    week: 2,
    module: 'Unit 5: Usability Requirements',
    topic: 'Contextual Inquiry Stages',
    questionText: 'There are _______ stages in contextual inquiry.',
    questionType: 'single',
    options: [
      { id: 'a', text: 'two' },
      { id: 'b', text: 'five' },
      { id: 'c', text: 'six' },
      { id: 'd', text: 'eight' }
    ],
    correctAnswer: 'b',
    explanation: 'There are 5 stages in contextual inquiry: Plan, Initiate, Execute, Synthesize/Reflect, and Wrap-up.',
    difficulty: 'easy',
    sourcePdf: '2024 Design & Implementation of Human-Computer Interfaces - Complete Assignments PDF',
    sourcePage: 7,
    verificationStatus: 'verified'
  },
  {
    id: 'w2-q5',
    originalQuestionNumber: 5,
    week: 2,
    module: 'Unit 5: Usability Requirements',
    topic: 'Contextual Inquiry Process',
    questionText: 'Which stage in the Contextual Inquiry process involves arranging for recording observations and scripting the procedure?',
    questionType: 'single',
    options: [
      { id: 'a', text: 'Plan Stage' },
      { id: 'b', text: 'Initiate Stage' },
      { id: 'c', text: 'Execute Stage' },
      { id: 'd', text: 'Reflect Stage' }
    ],
    correctAnswer: 'a',
    explanation: 'The Plan Stage is where researchers outline the observation objectives, script the procedure, obtain necessary consent, and arrange recording equipment.',
    difficulty: 'easy',
    sourcePdf: '2024 Design & Implementation of Human-Computer Interfaces - Complete Assignments PDF',
    sourcePage: 7,
    verificationStatus: 'verified'
  },
  {
    id: 'w2-q6',
    originalQuestionNumber: 6,
    week: 2,
    module: 'Unit 5: Usability Requirements',
    topic: 'Affinity Diagram Method',
    questionText: 'Affinity diagram method consists of _______ steps.',
    questionType: 'single',
    options: [
      { id: 'a', text: 'Three' },
      { id: 'b', text: 'Two' },
      { id: 'c', text: 'Six' },
      { id: 'd', text: 'Five' }
    ],
    correctAnswer: 'd',
    explanation: 'The Affinity Diagramming technique involves 5 distinct steps: Generate/record ideas, Display ideas, Group related notes, Create group headers/labels, and Draw hierarchical insights.',
    difficulty: 'easy',
    sourcePdf: '2024 Design & Implementation of Human-Computer Interfaces - Complete Assignments PDF',
    sourcePage: 7,
    verificationStatus: 'verified'
  },
  {
    id: 'w2-q7',
    originalQuestionNumber: 7,
    week: 2,
    module: 'Unit 5: Usability Requirements',
    topic: 'Requirements Engineering',
    questionText: 'Usability requirements is one type of ______.',
    questionType: 'single',
    options: [
      { id: 'a', text: 'Functional Requirement' },
      { id: 'b', text: 'Non-functional requirement' }
    ],
    correctAnswer: 'b',
    explanation: 'Functional requirements define specific behaviors and capabilities of the system. Usability defines the quality of user interaction and overall user experience, making it a Non-functional requirement.',
    difficulty: 'easy',
    sourcePdf: '2024 Design & Implementation of Human-Computer Interfaces - Complete Assignments PDF',
    sourcePage: 7,
    verificationStatus: 'verified'
  },
  {
    id: 'w2-q8',
    originalQuestionNumber: 8,
    week: 2,
    module: 'Unit 5: Usability Requirements',
    topic: 'Contextual Inquiry Objectives',
    questionText: 'What is the primary objective of Contextual Inquiry?',
    questionType: 'single',
    options: [
      { id: 'a', text: 'To watch and observe users perform tasks in their natural work setting' },
      { id: 'b', text: 'To conduct semi-structured interviews with users' },
      { id: 'c', text: 'To develop design recommendations' },
      { id: 'd', text: 'To study user behavior using physical note-taking' }
    ],
    correctAnswer: 'a',
    explanation: 'The core tenet of contextual inquiry is "context" — observing users doing real work in their actual everyday environment rather than in an artificial lab.',
    difficulty: 'easy',
    sourcePdf: '2024 Design & Implementation of Human-Computer Interfaces - Complete Assignments PDF',
    sourcePage: 8,
    verificationStatus: 'verified'
  },
  {
    id: 'w2-q9',
    originalQuestionNumber: 9,
    week: 2,
    module: 'Unit 5: Usability Requirements',
    topic: 'Reflect Stage',
    questionText: 'What is the purpose of the "Reflect" stage in the Contextual Inquiry process?',
    questionType: 'single',
    options: [
      { id: 'a', text: 'To contact the authorities for permission' },
      { id: 'b', text: 'To analyze the data collected and identify design goals' },
      { id: 'c', text: 'To script the procedure and rehearse for observations' }
    ],
    correctAnswer: 'b',
    explanation: 'In the Reflect stage, designers synthesize and analyze the collected observational notes, identify patterns and pain points, and define actionable design goals.',
    difficulty: 'easy',
    sourcePdf: '2024 Design & Implementation of Human-Computer Interfaces - Complete Assignments PDF',
    sourcePage: 8,
    verificationStatus: 'verified'
  },
  {
    id: 'w2-q10',
    originalQuestionNumber: 10,
    week: 2,
    module: 'Unit 5: Usability Requirements',
    topic: 'Contextual Inquiry Duration',
    questionText: 'How long does the Contextual Inquiry process typically continue?',
    questionType: 'single',
    options: [
      { id: 'a', text: 'One to two weeks' },
      { id: 'b', text: 'One to two hours' },
      { id: 'c', text: 'One to two months' }
    ],
    correctAnswer: 'b',
    explanation: 'A single contextual inquiry session with a user typically lasts 1 to 2 hours to avoid participant fatigue while gathering rich, qualitative workflow data.',
    difficulty: 'easy',
    sourcePdf: '2024 Design & Implementation of Human-Computer Interfaces - Complete Assignments PDF',
    sourcePage: 8,
    verificationStatus: 'verified'
  },

  // ==================== WEEK 3 ====================
  {
    id: 'w3-q1',
    originalQuestionNumber: 1,
    week: 3,
    module: 'Unit 6: Interface Design',
    topic: 'Functional Requirements Discovery',
    questionText: 'We can also add new functional requirements based on the observations made in contextual inquiry.',
    questionType: 'true_false',
    options: [
      { id: 'a', text: 'True' },
      { id: 'b', text: 'False' }
    ],
    correctAnswer: 'a',
    explanation: 'True. Observing users in their actual workspace often uncovers unstated needs, workarounds, and gaps that lead to brand new functional requirements.',
    difficulty: 'easy',
    sourcePdf: '2024 Design & Implementation of Human-Computer Interfaces - Complete Assignments PDF',
    sourcePage: 9,
    verificationStatus: 'verified'
  },
  {
    id: 'w3-q1-alt',
    originalQuestionNumber: 1,
    week: 3,
    module: 'Unit 6: Interface Design',
    topic: 'SRS Documentation',
    questionText: 'In SRS document the functions should describe HOW to get the output from the given input.',
    questionType: 'true_false',
    options: [
      { id: 'a', text: 'True' },
      { id: 'b', text: 'False' }
    ],
    correctAnswer: 'b',
    explanation: 'False. An SRS describes WHAT the system must accomplish (external behavior), not HOW it is computed internally (which is determined during architecture and design).',
    difficulty: 'easy',
    sourcePdf: 'NPTEL Assignment 3 Detailed Solution - IIT Guwahati',
    sourcePage: 6,
    verificationStatus: 'verified'
  },
  {
    id: 'w3-q2',
    originalQuestionNumber: 2,
    week: 3,
    module: 'Unit 6: Interface Design',
    topic: 'User-Centered Design Concerns',
    questionText: 'In user-centered design, we have two concerns: Interface design and __________',
    questionType: 'single',
    options: [
      { id: 'a', text: 'Machine design' },
      { id: 'b', text: 'Hardware design' },
      { id: 'c', text: 'Code design' },
      { id: 'd', text: 'System design' }
    ],
    correctAnswer: 'c',
    explanation: 'User-Centered Design divides development into two major concerns: Interface design (the external perceptual and interactive layer) and Code design (the software architecture and logic).',
    difficulty: 'easy',
    sourcePdf: '2024 Design & Implementation of Human-Computer Interfaces - Complete Assignments PDF',
    sourcePage: 9,
    verificationStatus: 'verified'
  },
  {
    id: 'w3-q3',
    originalQuestionNumber: 3,
    week: 3,
    module: 'Unit 6: Interface Design',
    topic: 'Design Lifecycle Scope',
    questionText: 'The design-prototype-evaluate cycle primarily caters to ______ design.',
    questionType: 'single',
    options: [
      { id: 'a', text: 'Interface' },
      { id: 'b', text: 'Code' },
      { id: 'c', text: 'System' }
    ],
    correctAnswer: 'a',
    explanation: 'The iterative design-prototype-evaluate cycle is specifically created to iteratively test, validate, and refine the Interface design with users before committing to full software code implementation.',
    difficulty: 'medium',
    sourcePdf: 'NPTEL Assignment 3 Detailed Solution - IIT Guwahati',
    sourcePage: 6,
    verificationStatus: 'verified'
  },
  {
    id: 'w3-q4',
    originalQuestionNumber: 4,
    week: 3,
    module: 'Unit 6: Interface Design',
    topic: 'Code Design Languages',
    questionText: 'Code design can be expressed in natural languages, semi-formal languages and _________.',
    questionType: 'single',
    options: [
      { id: 'a', text: 'Informal languages' },
      { id: 'b', text: 'Formal languages' },
      { id: 'c', text: 'Context sensitive languages' }
    ],
    correctAnswer: 'b',
    explanation: 'Software design representations are categorized as Natural language descriptions, Semi-formal languages (diagrams with notations like UML and DFD), and Formal languages (mathematical specifications like Z notation).',
    difficulty: 'easy',
    sourcePdf: '2024 Design & Implementation of Human-Computer Interfaces - Complete Assignments PDF',
    sourcePage: 9,
    verificationStatus: 'verified'
  },
  {
    id: 'w3-q5',
    originalQuestionNumber: 5,
    week: 3,
    module: 'Unit 6: Interface Design',
    topic: 'DFD Classification',
    questionText: 'DFD is a _______ code design language.',
    questionType: 'single',
    options: [
      { id: 'a', text: 'Natural' },
      { id: 'b', text: 'Semi-formal' },
      { id: 'c', text: 'Informal' },
      { id: 'd', text: 'Context sensitive.' }
    ],
    correctAnswer: 'b',
    explanation: 'Data Flow Diagrams (DFDs) use structured graphical symbols combined with text descriptions, making them a semi-formal design language.',
    difficulty: 'easy',
    sourcePdf: '2024 Design & Implementation of Human-Computer Interfaces - Complete Assignments PDF',
    sourcePage: 10,
    verificationStatus: 'verified'
  },
  {
    id: 'w3-q6',
    originalQuestionNumber: 6,
    week: 3,
    module: 'Unit 6: Interface Design',
    topic: 'Shneiderman Golden Rules',
    questionText: 'Shneiderman proposed _____ rules that covers broad aspects of interactive systems.',
    questionType: 'single',
    options: [
      { id: 'a', text: 'Five' },
      { id: 'b', text: 'Seven' },
      { id: 'c', text: 'Eight' },
      { id: 'd', text: 'Nine' }
    ],
    correctAnswer: 'c',
    explanation: 'Ben Shneiderman formulated the famous "Eight Golden Rules of Interface Design".',
    difficulty: 'easy',
    sourcePdf: '2024 Design & Implementation of Human-Computer Interfaces - Complete Assignments PDF',
    sourcePage: 10,
    verificationStatus: 'verified'
  },
  {
    id: 'w3-q7',
    originalQuestionNumber: 7,
    week: 3,
    module: 'Unit 6: Interface Design',
    topic: 'Miller Short-Term Memory Law',
    questionText: 'Reduce short-term memory load was proposed by George A Miller in the year:',
    questionType: 'single',
    options: [
      { id: 'a', text: '1956' },
      { id: 'b', text: '1986' },
      { id: 'c', text: '1988' }
    ],
    correctAnswer: 'a',
    explanation: 'George A. Miller published his influential paper on human working memory capacity ("The Magical Number Seven, Plus or Minus Two") in 1956.',
    difficulty: 'easy',
    sourcePdf: '2024 Design & Implementation of Human-Computer Interfaces - Complete Assignments PDF',
    sourcePage: 10,
    verificationStatus: 'verified'
  },
  {
    id: 'w3-q8',
    originalQuestionNumber: 8,
    week: 3,
    module: 'Unit 6: Interface Design',
    topic: 'Shneiderman Golden Rules',
    questionText: '“The interface should not force users to remember too many things” – this statement falls under “_______”, one of the golden rules proposed by Shneiderman.',
    questionType: 'single',
    options: [
      { id: 'a', text: 'Strive for consistency' },
      { id: 'b', text: 'Permit easy reversal of actions' },
      { id: 'c', text: 'Reduce short-term memory load' },
      { id: 'd', text: 'Keep users in control' }
    ],
    correctAnswer: 'c',
    explanation: 'Minimizing the need to retain information across screens directly implements Shneiderman’s rule: "Reduce short-term memory load".',
    difficulty: 'easy',
    sourcePdf: 'NPTEL Assignment 3 Detailed Solution - IIT Guwahati',
    sourcePage: 7,
    verificationStatus: 'verified'
  },
  {
    id: 'w3-q9',
    originalQuestionNumber: 9,
    week: 3,
    module: 'Unit 6: Interface Design',
    topic: 'UCD Full Form',
    questionText: 'What is the full form of UCD?',
    questionType: 'single',
    options: [
      { id: 'a', text: 'user-centered design' },
      { id: 'b', text: 'user-centered decision' },
      { id: 'c', text: 'user-centered development' },
      { id: 'd', text: 'user-centric development' }
    ],
    correctAnswer: 'a',
    explanation: 'UCD stands for User-Centered Design, a framework where user needs, wants, and limitations guide every stage of the design process.',
    difficulty: 'easy',
    sourcePdf: '2024 Design & Implementation of Human-Computer Interfaces - Complete Assignments PDF',
    sourcePage: 10,
    verificationStatus: 'verified'
  },
  {
    id: 'w3-q10',
    originalQuestionNumber: 10,
    week: 3,
    module: 'Unit 6: Interface Design',
    topic: 'Affinity Diagram Steps',
    questionText: 'Which one is NOT related with the affinity diagram method?',
    questionType: 'single',
    options: [
      { id: 'a', text: 'display ideas' },
      { id: 'b', text: 'initiate ideas' },
      { id: 'c', text: 'create group header' }
    ],
    correctAnswer: 'b',
    explanation: 'Affinity diagramming clusters and synthesizes ideas that have already been gathered. Generating or "initiating" ideas occurs during brainstorming or user observation prior to affinity sorting.',
    difficulty: 'medium',
    sourcePdf: '2024 Design & Implementation of Human-Computer Interfaces - Complete Assignments PDF',
    sourcePage: 11,
    verificationStatus: 'verified'
  },
  {
    id: 'w3-q11',
    originalQuestionNumber: 11,
    week: 3,
    module: 'Unit 6: Interface Design',
    topic: 'Code Design Phases',
    questionText: 'Identification of data structures and algorithms for different modules is done on the ____________ phase of code design.',
    questionType: 'single',
    options: [
      { id: 'a', text: 'Preliminary (high-level design)' },
      { id: 'b', text: 'Detailed design' }
    ],
    correctAnswer: 'b',
    explanation: 'Preliminary or high-level design defines module boundaries and interfaces; Detailed Design specifies the internal data structures and concrete algorithms for each module.',
    difficulty: 'easy',
    sourcePdf: '2024 Design & Implementation of Human-Computer Interfaces - Complete Assignments PDF',
    sourcePage: 11,
    verificationStatus: 'verified'
  },
  {
    id: 'w3-q12',
    originalQuestionNumber: 12,
    week: 3,
    module: 'Unit 6: Interface Design',
    topic: 'Design Guidelines Classification',
    questionText: 'Human interface guidelines for Apple systems are ________ design guidelines.',
    questionType: 'single',
    options: [
      { id: 'a', text: 'Generic' },
      { id: 'b', text: 'Specific' }
    ],
    correctAnswer: 'b',
    explanation: 'Apple HIG provides platform-specific standards, constraints, and UI widgets for macOS/iOS, making them "Specific" design guidelines compared to general HCI heuristics.',
    difficulty: 'easy',
    sourcePdf: '2024 Design & Implementation of Human-Computer Interfaces - Complete Assignments PDF',
    sourcePage: 11,
    verificationStatus: 'verified'
  },

  // ==================== WEEK 4 ====================
  {
    id: 'w4-q1',
    originalQuestionNumber: 1,
    week: 4,
    module: 'Unit 7: Usable Interface Design',
    topic: 'Norman Model of Interaction',
    questionText: 'Norman’s Model of Interaction represents behavior of a user of interactive systems in terms of a series of _________.',
    questionType: 'single',
    options: [
      { id: 'a', text: 'actions' },
      { id: 'b', text: 'selection' },
      { id: 'c', text: 'manipulation' }
    ],
    correctAnswer: 'a',
    explanation: 'Donald Norman’s 7-stage interaction model represents human-computer activity as an execution-evaluation cycle made up of a series of actions.',
    difficulty: 'easy',
    sourcePdf: '2024 Design & Implementation of Human-Computer Interfaces - Complete Assignments PDF',
    sourcePage: 12,
    verificationStatus: 'verified'
  },
  {
    id: 'w4-q2',
    originalQuestionNumber: 2,
    week: 4,
    module: 'Unit 7: Usable Interface Design',
    topic: 'Empirical Study Purpose',
    questionText: 'In the Interactive system development life cycle, what is the purpose of the Empirical Study stage?',
    questionType: 'single',
    options: [
      { id: 'a', text: 'To gather initial user requirements' },
      { id: 'b', text: 'To create and refine prototypes' },
      { id: 'c', text: "To test the system's usability with respect to the end users" },
      { id: 'd', text: 'None of the above' }
    ],
    correctAnswer: 'c',
    explanation: 'Empirical study conducts experiments with target end users to quantitatively and qualitatively assess usability metrics such as error rates, task time, and user satisfaction.',
    difficulty: 'easy',
    sourcePdf: '2024 Design & Implementation of Human-Computer Interfaces - Complete Assignments PDF',
    sourcePage: 12,
    verificationStatus: 'verified'
  },
  {
    id: 'w4-q2-alt',
    originalQuestionNumber: 2,
    week: 4,
    module: 'Unit 7: Usable Interface Design',
    topic: 'Norman Interaction Stages',
    questionText: 'There are broadly two stages of interaction: execution stage and ________ stage.',
    questionType: 'single',
    options: [
      { id: 'a', text: 'design' },
      { id: 'b', text: 'evaluation' },
      { id: 'c', text: 'interaction' }
    ],
    correctAnswer: 'b',
    explanation: 'Norman’s model divides interaction into two primary phases: the Execution stage (doing) and the Evaluation stage (interpreting and assessing the result).',
    difficulty: 'easy',
    sourcePdf: 'NPTEL Assignment 4 Detailed Solution - IIT Guwahati',
    sourcePage: 8,
    verificationStatus: 'verified'
  },
  {
    id: 'w4-q3',
    originalQuestionNumber: 3,
    week: 4,
    module: 'Unit 7: Usable Interface Design',
    topic: 'Short-Term Memory in HCI',
    questionText: 'According to Shneiderman, why is it important to reduce short-term memory load in interface design?',
    questionType: 'single',
    options: [
      { id: 'a', text: 'To make the interface visually appealing' },
      { id: 'b', text: 'To make the system easier to learn and use' },
      { id: 'c', text: 'To increase the complexity of the tasks' },
      { id: 'd', text: 'All of the above' }
    ],
    correctAnswer: 'b',
    explanation: 'Human short-term memory has limited capacity (7 ± 2 chunks). Reducing memory strain prevents errors and makes systems faster and easier to learn.',
    difficulty: 'easy',
    sourcePdf: '2024 Design & Implementation of Human-Computer Interfaces - Complete Assignments PDF',
    sourcePage: 13,
    verificationStatus: 'verified'
  },
  {
    id: 'w4-q3-alt',
    originalQuestionNumber: 3,
    week: 4,
    module: 'Unit 7: Usable Interface Design',
    topic: 'Shneiderman Golden Rules Year',
    questionText: 'The eight golden rules for interface design were proposed by Ben Shneiderman in the year:',
    questionType: 'single',
    options: [
      { id: 'a', text: '1986' },
      { id: 'b', text: '1956' },
      { id: 'c', text: '1994' },
      { id: 'd', text: '2001' }
    ],
    correctAnswer: 'a',
    explanation: 'Ben Shneiderman published his Eight Golden Rules of Interface Design in 1986 in his landmark book "Designing the User Interface".',
    difficulty: 'medium',
    sourcePdf: 'Design and Implementation of HCI All Assignments 2025',
    sourcePage: 9,
    verificationStatus: 'verified'
  },
  {
    id: 'w4-q4',
    originalQuestionNumber: 4,
    week: 4,
    module: 'Unit 7: Usable Interface Design',
    topic: 'Gulf of Execution',
    questionText: "Which concept refers to the gap between the user's intentions and the actions supported by the interface?",
    questionType: 'single',
    options: [
      { id: 'a', text: 'Gulf of execution' },
      { id: 'b', text: 'Gulf of evaluation' },
      { id: 'c', text: 'Evaluation cycle' },
      { id: 'd', text: 'Execution cycle' }
    ],
    correctAnswer: 'a',
    explanation: 'The Gulf of Execution is the difference between a user’s internal goals and whether the interface provides easy, intuitive actions to execute them directly.',
    difficulty: 'easy',
    sourcePdf: '2024 Design & Implementation of Human-Computer Interfaces - Complete Assignments PDF',
    sourcePage: 13,
    verificationStatus: 'verified'
  },
  {
    id: 'w4-q4-alt',
    originalQuestionNumber: 4,
    week: 4,
    module: 'Unit 7: Usable Interface Design',
    topic: 'Consistency Rule',
    questionText: 'One of the eight golden rules of Shneiderman is “strive for consistency”. It actually refers to:',
    questionType: 'single',
    options: [
      { id: 'a', text: 'Both the “internal” and “external” consistency' },
      { id: 'b', text: 'Only external consistency' },
      { id: 'c', text: 'Only internal consistency' },
      { id: 'd', text: 'None of the above' }
    ],
    correctAnswer: 'a',
    explanation: 'Consistency in HCI spans internal consistency (uniform terms, colors, fonts, and behaviors across screens) and external consistency (adhering to platform standards).',
    difficulty: 'easy',
    sourcePdf: 'Design and Implementation of HCI All Assignments 2025',
    sourcePage: 9,
    verificationStatus: 'verified'
  },
  {
    id: 'w4-q5',
    originalQuestionNumber: 5,
    week: 4,
    module: 'Unit 7: Usable Interface Design',
    topic: 'Slips vs Mistakes',
    questionText: 'Particularly in the context of errors during interaction is explained in terms of slips and ______.',
    questionType: 'single',
    options: [
      { id: 'a', text: 'error' },
      { id: 'b', text: 'mistakes' },
      { id: 'c', text: 'human error' }
    ],
    correctAnswer: 'b',
    explanation: 'Norman categorizes errors into Slips (correct plan, faulty motor/automatic execution) and Mistakes (incorrect conscious intention or mental model).',
    difficulty: 'easy',
    sourcePdf: '2024 Design & Implementation of Human-Computer Interfaces - Complete Assignments PDF',
    sourcePage: 13,
    verificationStatus: 'verified'
  },
  {
    id: 'w4-q6',
    originalQuestionNumber: 6,
    week: 4,
    module: 'Unit 7: Usable Interface Design',
    topic: 'Evaluation Stage',
    questionText: 'Perceive system state comes under the _______ stage of interaction.',
    questionType: 'single',
    options: [
      { id: 'a', text: 'execution' },
      { id: 'b', text: 'design' },
      { id: 'c', text: 'evaluation' },
      { id: 'd', text: 'interaction' }
    ],
    correctAnswer: 'c',
    explanation: 'Perceiving system state is the first phase of the Evaluation stage (followed by interpreting and evaluating the outcome against user goals).',
    difficulty: 'easy',
    sourcePdf: '2024 Design & Implementation of Human-Computer Interfaces - Complete Assignments PDF',
    sourcePage: 13,
    verificationStatus: 'verified'
  },
  {
    id: 'w4-q7',
    originalQuestionNumber: 7,
    week: 4,
    module: 'Unit 7: Usable Interface Design',
    topic: 'Norman Design Principles',
    questionText: 'Simplifying the structure of tasks is one of the principles in Norman\'s model of interaction.',
    questionType: 'true_false',
    options: [
      { id: 'a', text: 'True' },
      { id: 'b', text: 'False' }
    ],
    correctAnswer: 'a',
    explanation: 'True. Donald Norman explicitly emphasizes simplifying task structures to minimize reliance on short-term memory and reduce error opportunities.',
    difficulty: 'easy',
    sourcePdf: '2024 Design & Implementation of Human-Computer Interfaces - Complete Assignments PDF',
    sourcePage: 13,
    verificationStatus: 'verified'
  },
  {
    id: 'w4-q7-alt',
    originalQuestionNumber: 7,
    week: 4,
    module: 'Unit 7: Usable Interface Design',
    topic: 'Prototype Dimensions',
    questionText: 'In a vertical prototype, the entire interface is depicted at the surface level without any functionality.',
    questionType: 'true_false',
    options: [
      { id: 'a', text: 'True' },
      { id: 'b', text: 'False' }
    ],
    correctAnswer: 'b',
    explanation: 'False. That is the definition of a Horizontal prototype (broad surface UI with shallow depth). A Vertical prototype provides deep, working functionality for a narrow set of features.',
    difficulty: 'medium',
    sourcePdf: 'NPTEL Assignment 4 Detailed Solution - IIT Guwahati',
    sourcePage: 9,
    verificationStatus: 'verified'
  },
  {
    id: 'w4-q8',
    originalQuestionNumber: 8,
    week: 4,
    module: 'Unit 7: Usable Interface Design',
    topic: 'High Fidelity Prototypes',
    questionText: 'High fidelity prototypes often involve complex programming and sophisticated interactions.',
    questionType: 'true_false',
    options: [
      { id: 'a', text: 'True' },
      { id: 'b', text: 'False' }
    ],
    correctAnswer: 'a',
    explanation: 'True. High-fidelity prototypes look and behave nearly like the finished application, requiring interactive scripting and sophisticated UI behavior.',
    difficulty: 'easy',
    sourcePdf: '2024 Design & Implementation of Human-Computer Interfaces - Complete Assignments PDF',
    sourcePage: 14,
    verificationStatus: 'verified'
  },
  {
    id: 'w4-q8-alt',
    originalQuestionNumber: 8,
    week: 4,
    module: 'Unit 7: Usable Interface Design',
    topic: 'Cognitive Walkthrough Team',
    questionText: 'There is a requirement of 3-5 member team for the cognitive walkthrough.',
    questionType: 'true_false',
    options: [
      { id: 'a', text: 'True' },
      { id: 'b', text: 'False' }
    ],
    correctAnswer: 'a',
    explanation: 'True. A cognitive walkthrough is typically performed by a small expert review group of 3 to 5 members walking step-by-step through user tasks.',
    difficulty: 'easy',
    sourcePdf: 'NPTEL Assignment 4 Detailed Solution - IIT Guwahati',
    sourcePage: 9,
    verificationStatus: 'verified'
  },
  {
    id: 'w4-q9',
    originalQuestionNumber: 9,
    week: 4,
    module: 'Unit 7: Usable Interface Design',
    topic: 'Low Fidelity Prototyping',
    questionText: 'Paper mock-ups are an example of __________ prototype.',
    questionType: 'single',
    options: [
      { id: 'a', text: 'Low fidelity' },
      { id: 'b', text: 'High fidelity' },
      { id: 'c', text: 'Medium fidelity' }
    ],
    correctAnswer: 'a',
    explanation: 'Paper sketches and mockups require no software implementation and have low visual/interaction fidelity, making them classic Low Fidelity prototypes.',
    difficulty: 'easy',
    sourcePdf: '2024 Design & Implementation of Human-Computer Interfaces - Complete Assignments PDF',
    sourcePage: 14,
    verificationStatus: 'verified'
  },
  {
    id: 'w4-q9-alt',
    originalQuestionNumber: 9,
    week: 4,
    module: 'Unit 7: Usable Interface Design',
    topic: 'Cognitive Walkthrough Responses',
    questionText: 'In a cognitive walkthrough evaluation, evaluators are expected to answer the questions only in “yes” or “no”.',
    questionType: 'true_false',
    options: [
      { id: 'a', text: 'True' },
      { id: 'b', text: 'False' }
    ],
    correctAnswer: 'b',
    explanation: 'False. Evaluators must supply narrative justifications and evidence for why a user would or would not succeed at each step.',
    difficulty: 'easy',
    sourcePdf: 'NPTEL Assignment 4 Detailed Solution - IIT Guwahati',
    sourcePage: 9,
    verificationStatus: 'verified'
  },
  {
    id: 'w4-q10',
    originalQuestionNumber: 10,
    week: 4,
    module: 'Unit 7: Usable Interface Design',
    topic: 'Wizard of Oz Technique',
    questionText: 'In this technique, a human subject believes they are interacting with an autonomous computer, but in reality the computer is operated by an “unseen” human being. This technique is called the ________ approach.',
    questionType: 'single',
    options: [
      { id: 'a', text: 'Medium fidelity' },
      { id: 'b', text: 'Vertical' },
      { id: 'c', text: 'Wizard of Oz' },
      { id: 'd', text: 'Incremental' }
    ],
    correctAnswer: 'c',
    explanation: 'The Wizard of Oz technique simulates future AI, NLP, or backend intelligence by having a hidden human operator generate system responses.',
    difficulty: 'easy',
    sourcePdf: '2024 Design & Implementation of Human-Computer Interfaces - Complete Assignments PDF',
    sourcePage: 14,
    verificationStatus: 'verified'
  },
  {
    id: 'w4-q10-alt',
    originalQuestionNumber: 10,
    week: 4,
    module: 'Unit 7: Usable Interface Design',
    topic: 'Prototype Classification',
    questionText: 'Which from the following is NOT a valid category of software prototypes?',
    questionType: 'single',
    options: [
      { id: 'a', text: 'Horizontal' },
      { id: 'b', text: 'Vertical' },
      { id: 'c', text: 'Storyboard' }
    ],
    correctAnswer: 'c',
    explanation: 'Horizontal and Vertical prototypes are formal software prototype dimensions. Storyboarding is an illustration/sketching technique for narrative scenarios.',
    difficulty: 'easy',
    sourcePdf: 'Design and Implementation of HCI All Assignments 2025',
    sourcePage: 10,
    verificationStatus: 'verified'
  },

  // ==================== WEEK 5 ====================
  {
    id: 'w5-q1',
    originalQuestionNumber: 1,
    week: 5,
    module: 'Unit 8: Rapid Usability Evaluation',
    topic: 'Nielsen Usability Heuristics',
    questionText: 'Which one from the following is NOT one of Jakob Nielsen’s 10 heuristics?',
    questionType: 'single',
    options: [
      { id: 'a', text: 'User control and error correction' },
      { id: 'b', text: 'Help and documentation' },
      { id: 'c', text: 'Consistency and standards' }
    ],
    correctAnswer: 'a',
    explanation: "Nielsen's actual heuristics are 'User control and freedom' and 'Help users recognize, diagnose, and recover from errors'. 'User control and error correction' is not an exact heuristic name.",
    difficulty: 'easy',
    sourcePdf: '2024 Design & Implementation of Human-Computer Interfaces - Complete Assignments PDF',
    sourcePage: 15,
    verificationStatus: 'verified'
  },
  {
    id: 'w5-q1-alt',
    originalQuestionNumber: 1,
    week: 5,
    module: 'Unit 8: Rapid Usability Evaluation',
    topic: 'Interface Evaluation Goals',
    questionText: 'How do we evaluate an interface?',
    questionType: 'single',
    options: [
      { id: 'a', text: 'by evaluating satisfaction' },
      { id: 'b', text: 'by evaluating memorability' },
      { id: 'c', text: 'by evaluating usability' }
    ],
    correctAnswer: 'c',
    explanation: 'Usability is the comprehensive umbrella quality attribute (encompassing efficiency, satisfaction, learnability, memorability, and error handling) evaluated in interface design.',
    difficulty: 'easy',
    sourcePdf: 'NPTEL Assignment 5 Detailed Solution - IIT Guwahati',
    sourcePage: 10,
    verificationStatus: 'verified'
  },
  {
    id: 'w5-q2',
    originalQuestionNumber: 2,
    week: 5,
    module: 'Unit 8: Rapid Usability Evaluation',
    topic: 'Prototyping Tools',
    questionText: 'Figma is a prototype design tool.',
    questionType: 'true_false',
    options: [
      { id: 'a', text: 'True' },
      { id: 'b', text: 'False' }
    ],
    correctAnswer: 'a',
    explanation: 'True. Figma is a widely used modern vector graphics and interface prototyping web application.',
    difficulty: 'easy',
    sourcePdf: '2024 Design & Implementation of Human-Computer Interfaces - Complete Assignments PDF',
    sourcePage: 15,
    verificationStatus: 'verified'
  },
  {
    id: 'w5-q3',
    originalQuestionNumber: 3,
    week: 5,
    module: 'Unit 8: Rapid Usability Evaluation',
    topic: 'Prototype Evaluation Methods',
    questionText: 'Which of the following are valid prototype evaluation methods? (Choose all that apply)',
    questionType: 'multiple',
    options: [
      { id: 'a', text: 'Cognitive walkthrough' },
      { id: 'b', text: 'Affinity diagram' },
      { id: 'c', text: 'Heuristic evaluation' }
    ],
    correctAnswer: ['a', 'c'],
    explanation: 'Cognitive walkthrough and heuristic evaluation are evaluation techniques for testing interfaces; affinity diagramming is used during requirements analysis.',
    difficulty: 'medium',
    sourcePdf: '2024 Design & Implementation of Human-Computer Interfaces - Complete Assignments PDF',
    sourcePage: 15,
    verificationStatus: 'verified'
  },
  {
    id: 'w5-q4',
    originalQuestionNumber: 4,
    week: 5,
    module: 'Unit 8: Rapid Usability Evaluation',
    topic: 'SUS Questionnaire Structure',
    questionText: 'Post session questionnaire SUS consists of _____ statements.',
    questionType: 'single',
    options: [
      { id: 'a', text: '3' },
      { id: 'b', text: '5' },
      { id: 'c', text: '7' },
      { id: 'd', text: '10' }
    ],
    correctAnswer: 'd',
    explanation: 'The System Usability Scale (SUS) created by John Brooke consists of exactly 10 alternating positive and negative statements evaluated on a 5-point Likert scale.',
    difficulty: 'easy',
    sourcePdf: '2024 Design & Implementation of Human-Computer Interfaces - Complete Assignments PDF',
    sourcePage: 16,
    verificationStatus: 'verified'
  },
  {
    id: 'w5-q4-alt',
    originalQuestionNumber: 4,
    week: 5,
    module: 'Unit 8: Rapid Usability Evaluation',
    topic: 'Desirable SUS Score',
    questionText: 'It is generally assumed that an SUS score around _______ percent or higher is desirable.',
    questionType: 'single',
    options: [
      { id: 'a', text: '10' },
      { id: 'b', text: '20' },
      { id: 'c', text: '50' },
      { id: 'd', text: '70' }
    ],
    correctAnswer: 'd',
    explanation: 'In usability research, a score of 68 is average (Grade C); therefore an SUS score of 70% or above is considered above average and desirable.',
    difficulty: 'easy',
    sourcePdf: 'NPTEL Assignment 5 Detailed Solution - IIT Guwahati',
    sourcePage: 11,
    verificationStatus: 'verified'
  },
  {
    id: 'w5-q5',
    originalQuestionNumber: 5,
    week: 5,
    module: 'Unit 8: Rapid Usability Evaluation',
    topic: 'ASQ Questionnaire Structure',
    questionText: 'Post task questionnaire ASQ consists of _____ statements.',
    questionType: 'single',
    options: [
      { id: 'a', text: '3' },
      { id: 'b', text: '5' },
      { id: 'c', text: '7' },
      { id: 'd', text: '10' }
    ],
    correctAnswer: 'a',
    explanation: 'The After-Scenario Questionnaire (ASQ) consists of 3 questions measuring ease of completion, time spent, and help information satisfaction.',
    difficulty: 'easy',
    sourcePdf: '2024 Design & Implementation of Human-Computer Interfaces - Complete Assignments PDF',
    sourcePage: 16,
    verificationStatus: 'verified'
  },
  {
    id: 'w5-q6',
    originalQuestionNumber: 6,
    week: 5,
    module: 'Unit 8: Rapid Usability Evaluation',
    topic: 'SUS Acronym',
    questionText: 'What is the full form of SUS?',
    questionType: 'single',
    options: [
      { id: 'a', text: 'Software usability score' },
      { id: 'b', text: 'Software usability scale' },
      { id: 'c', text: 'System usability score' },
      { id: 'd', text: 'System usability scale' }
    ],
    correctAnswer: 'd',
    explanation: 'SUS stands for System Usability Scale.',
    difficulty: 'easy',
    sourcePdf: '2024 Design & Implementation of Human-Computer Interfaces - Complete Assignments PDF',
    sourcePage: 16,
    verificationStatus: 'verified'
  },
  {
    id: 'w5-q7',
    originalQuestionNumber: 7,
    week: 5,
    module: 'Unit 8: Rapid Usability Evaluation',
    topic: 'ASQ Acronym',
    questionText: 'Full form of ASQ is ___________________.',
    questionType: 'single',
    options: [
      { id: 'a', text: 'After-Scenario Questionnaire' },
      { id: 'b', text: 'After-Sequence Questionnaire' },
      { id: 'c', text: 'Another Session Questionnaire' }
    ],
    correctAnswer: 'a',
    explanation: 'ASQ stands for After-Scenario Questionnaire.',
    difficulty: 'easy',
    sourcePdf: '2024 Design & Implementation of Human-Computer Interfaces - Complete Assignments PDF',
    sourcePage: 16,
    verificationStatus: 'verified'
  },
  {
    id: 'w5-q8',
    originalQuestionNumber: 8,
    week: 5,
    module: 'Unit 8: Rapid Usability Evaluation',
    topic: 'Open-ended User Feedback',
    questionText: 'Feedbacks taken from open-ended questions are always reliable.',
    questionType: 'true_false',
    options: [
      { id: 'a', text: 'True' },
      { id: 'b', text: 'False' }
    ],
    correctAnswer: 'b',
    explanation: 'False. Open-ended questions suffer from subjectivity, cognitive biases, and low consistency across users, making them qualitative rather than consistently reliable.',
    difficulty: 'easy',
    sourcePdf: '2024 Design & Implementation of Human-Computer Interfaces - Complete Assignments PDF',
    sourcePage: 17,
    verificationStatus: 'verified'
  },
  {
    id: 'w5-q9',
    originalQuestionNumber: 9,
    week: 5,
    module: 'Unit 8: Rapid Usability Evaluation',
    topic: 'Expert Evaluation Team Size',
    questionText: 'For expert evaluation, an evaluation team of 3-5 members is necessary.',
    questionType: 'true_false',
    options: [
      { id: 'a', text: 'True' },
      { id: 'b', text: 'False' }
    ],
    correctAnswer: 'a',
    explanation: 'True. Jakob Nielsen showed that 3 to 5 expert evaluators identify approximately 75% to 80% of usability problems with the best return on investment.',
    difficulty: 'easy',
    sourcePdf: '2024 Design & Implementation of Human-Computer Interfaces - Complete Assignments PDF',
    sourcePage: 17,
    verificationStatus: 'verified'
  },
  {
    id: 'w5-q10',
    originalQuestionNumber: 10,
    week: 5,
    module: 'Unit 8: Rapid Usability Evaluation',
    topic: 'Heuristic Checklist Items',
    questionText: 'In a heuristic evaluation, the items in the checklist are called __________.',
    questionType: 'single',
    options: [
      { id: 'a', text: 'checkbox' },
      { id: 'b', text: 'heuristics' },
      { id: 'c', text: 'usability issues' },
      { id: 'd', text: 'problems' }
    ],
    correctAnswer: 'b',
    explanation: 'The recognized design principles and guidelines on the evaluator’s checklist are termed "heuristics".',
    difficulty: 'easy',
    sourcePdf: '2024 Design & Implementation of Human-Computer Interfaces - Complete Assignments PDF',
    sourcePage: 17,
    verificationStatus: 'verified'
  },
  {
    id: 'w5-q11',
    originalQuestionNumber: 11,
    week: 5,
    module: 'Unit 8: Rapid Usability Evaluation',
    topic: 'Nielsen 1994 Heuristics Count',
    questionText: 'Nielsen, 1994 proposed _______ heuristics for expert evaluation.',
    questionType: 'single',
    options: [
      { id: 'a', text: '5' },
      { id: 'b', text: '7' },
      { id: 'c', text: '9' },
      { id: 'd', text: '10' }
    ],
    correctAnswer: 'd',
    explanation: 'Jakob Nielsen finalized his revised list of 10 Usability Heuristics in 1994.',
    difficulty: 'easy',
    sourcePdf: 'Design and Implementation of HCI All Assignments 2025',
    sourcePage: 12,
    verificationStatus: 'verified'
  },

  // ==================== WEEK 6 ====================
  {
    id: 'w6-q1',
    originalQuestionNumber: 1,
    week: 6,
    module: 'Unit 9: Converting Design to System',
    topic: 'Good Design Characteristics',
    questionText: 'Which of the following is NOT a characteristic of Good design?',
    questionType: 'single',
    options: [
      { id: 'a', text: 'Coverage' },
      { id: 'b', text: 'Correctness' },
      { id: 'c', text: 'Understandability' },
      { id: 'd', text: 'Colorful' }
    ],
    correctAnswer: 'd',
    explanation: 'Good software and interface design requires completeness/coverage, functional correctness, and understandability. Being "colorful" is purely superficial and not a technical metric.',
    difficulty: 'easy',
    sourcePdf: '2024 Design & Implementation of Human-Computer Interfaces - Complete Assignments PDF',
    sourcePage: 18,
    verificationStatus: 'verified'
  },
  {
    id: 'w6-q2',
    originalQuestionNumber: 2,
    week: 6,
    module: 'Unit 9: Converting Design to System',
    topic: 'ERD Inception Year',
    questionText: 'ERD was proposed by Peter Chen in the year:',
    questionType: 'single',
    options: [
      { id: 'a', text: '1967' },
      { id: 'b', text: '1986' },
      { id: 'c', text: '1976' }
    ],
    correctAnswer: 'c',
    explanation: 'Peter Pin-Shan Chen introduced the Entity-Relationship Diagram (ERD) in his famous 1976 paper.',
    difficulty: 'easy',
    sourcePdf: '2024 Design & Implementation of Human-Computer Interfaces - Complete Assignments PDF',
    sourcePage: 18,
    verificationStatus: 'verified'
  },
  {
    id: 'w6-q3',
    originalQuestionNumber: 3,
    week: 6,
    module: 'Unit 9: Converting Design to System',
    topic: 'DFD Data Stores',
    questionText: 'In DFD, the data stores are first shown at:',
    questionType: 'single',
    options: [
      { id: 'a', text: 'Level 0 (context diagram)' },
      { id: 'b', text: 'Level 1 (overview diagram)' },
      { id: 'c', text: 'Level 1 (detailed diagram)' }
    ],
    correctAnswer: 'b',
    explanation: 'Level 0 (Context Diagram) only displays the system as a single process bubble and external entities. Data stores appear starting from Level 1 (Overview DFD).',
    difficulty: 'medium',
    sourcePdf: '2024 Design & Implementation of Human-Computer Interfaces - Complete Assignments PDF',
    sourcePage: 18,
    verificationStatus: 'verified'
  },
  {
    id: 'w6-q4',
    originalQuestionNumber: 4,
    week: 6,
    module: 'Unit 9: Converting Design to System',
    topic: 'DFD Data Flow Rules',
    questionText: 'In a DFD data can flow directly from an external entity to a data store (or store to external entity).',
    questionType: 'true_false',
    options: [
      { id: 'a', text: 'True' },
      { id: 'b', text: 'False' }
    ],
    correctAnswer: 'b',
    explanation: 'False. In DFD grammar rules, data must always flow through a process before entering or leaving a data store; direct links between stores and entities are illegal.',
    difficulty: 'easy',
    sourcePdf: '2024 Design & Implementation of Human-Computer Interfaces - Complete Assignments PDF',
    sourcePage: 19,
    verificationStatus: 'verified'
  },
  {
    id: 'w6-q5',
    originalQuestionNumber: 5,
    week: 6,
    module: 'Unit 9: Converting Design to System',
    topic: 'DFD Acronym',
    questionText: 'What is the full form of DFD?',
    questionType: 'single',
    options: [
      { id: 'a', text: 'Data flow design' },
      { id: 'b', text: 'Data flow decision' },
      { id: 'c', text: 'Data flow development' },
      { id: 'd', text: 'Data flow diagram' }
    ],
    correctAnswer: 'd',
    explanation: 'DFD stands for Data Flow Diagram.',
    difficulty: 'easy',
    sourcePdf: '2024 Design & Implementation of Human-Computer Interfaces - Complete Assignments PDF',
    sourcePage: 19,
    verificationStatus: 'verified'
  },
  {
    id: 'w6-q6',
    originalQuestionNumber: 6,
    week: 6,
    module: 'Unit 9: Converting Design to System',
    topic: 'Module Cohesion',
    questionText: 'If all functions in a module perform similar operations, it falls under ________ cohesion.',
    questionType: 'single',
    options: [
      { id: 'a', text: 'Logical' },
      { id: 'b', text: 'Temporal' },
      { id: 'c', text: 'Procedural' },
      { id: 'd', text: 'Sequential' }
    ],
    correctAnswer: 'a',
    explanation: 'Logical cohesion occurs when elements are grouped together because they execute logically similar operations (e.g., grouping all input routines or output formatting).',
    difficulty: 'medium',
    sourcePdf: '2024 Design & Implementation of Human-Computer Interfaces - Complete Assignments PDF',
    sourcePage: 19,
    verificationStatus: 'verified'
  },
  {
    id: 'w6-q7',
    originalQuestionNumber: 7,
    week: 6,
    module: 'Unit 9: Converting Design to System',
    topic: 'Module Coupling',
    questionText: 'If two modules share code or one modifies the internal code of another, it falls under __________ coupling.',
    questionType: 'single',
    options: [
      { id: 'a', text: 'Data' },
      { id: 'b', text: 'Control' },
      { id: 'c', text: 'Content' }
    ],
    correctAnswer: 'c',
    explanation: 'Content coupling is the highest (worst) level of coupling, where one module reaches into the internals of another to share or alter code/data.',
    difficulty: 'medium',
    sourcePdf: '2024 Design & Implementation of Human-Computer Interfaces - Complete Assignments PDF',
    sourcePage: 19,
    verificationStatus: 'verified'
  },
  {
    id: 'w6-q8',
    originalQuestionNumber: 8,
    week: 6,
    module: 'Unit 9: Converting Design to System',
    topic: 'Design Approaches',
    questionText: 'There are two basic design approaches: function oriented and _______ oriented.',
    questionType: 'single',
    options: [
      { id: 'a', text: 'Logic' },
      { id: 'b', text: 'Folder' },
      { id: 'c', text: 'Object' },
      { id: 'd', text: 'Class' }
    ],
    correctAnswer: 'c',
    explanation: 'The primary software design paradigms are Function-Oriented Design (FOD) and Object-Oriented Design (OOD).',
    difficulty: 'easy',
    sourcePdf: '2024 Design & Implementation of Human-Computer Interfaces - Complete Assignments PDF',
    sourcePage: 20,
    verificationStatus: 'verified'
  },
  {
    id: 'w6-q9',
    originalQuestionNumber: 9,
    week: 6,
    module: 'Unit 9: Converting Design to System',
    topic: 'ER Diagram Components',
    questionText: 'Basic components of an ER diagram are: Entity, _____ and Relationship.',
    questionType: 'single',
    options: [
      { id: 'a', text: 'Object' },
      { id: 'b', text: 'User' },
      { id: 'c', text: 'Attribute' },
      { id: 'd', text: 'Class' }
    ],
    correctAnswer: 'c',
    explanation: 'The three fundamental building blocks of an Entity-Relationship (ER) model are Entities, Attributes, and Relationships.',
    difficulty: 'easy',
    sourcePdf: '2024 Design & Implementation of Human-Computer Interfaces - Complete Assignments PDF',
    sourcePage: 20,
    verificationStatus: 'verified'
  },
  {
    id: 'w6-q10',
    originalQuestionNumber: 10,
    week: 6,
    module: 'Unit 9: Converting Design to System',
    topic: 'ER Cardinality',
    questionText: 'There are four types of relationships in an ER diagram: one-to-one, one-to-many, many-to-one and _______.',
    questionType: 'single',
    options: [
      { id: 'a', text: 'Many-to-binary' },
      { id: 'b', text: 'Many-to-many' },
      { id: 'c', text: 'Binary-to-many' },
      { id: 'd', text: 'Binary-to-one' }
    ],
    correctAnswer: 'b',
    explanation: 'The four cardinalities are: 1:1 (one-to-one), 1:N (one-to-many), N:1 (many-to-one), and M:N (many-to-many).',
    difficulty: 'easy',
    sourcePdf: '2024 Design & Implementation of Human-Computer Interfaces - Complete Assignments PDF',
    sourcePage: 20,
    verificationStatus: 'verified'
  },
  {
    id: 'w6-q11',
    originalQuestionNumber: 11,
    week: 6,
    module: 'Unit 9: Converting Design to System',
    topic: 'ER Attributes',
    questionText: 'Null attributes are used when:',
    questionType: 'single',
    options: [
      { id: 'a', text: 'An entity does not have a value for an attribute' },
      { id: 'b', text: 'A value needs to be derived from other attributes or entities' }
    ],
    correctAnswer: 'a',
    explanation: 'A null value indicates that an attribute is not applicable or that the value is missing/unknown for a specific entity instance.',
    difficulty: 'easy',
    sourcePdf: 'NPTEL Assignment 6 Detailed Solution - IIT Guwahati',
    sourcePage: 12,
    verificationStatus: 'verified'
  },
  {
    id: 'w6-q12',
    originalQuestionNumber: 12,
    week: 6,
    module: 'Unit 9: Converting Design to System',
    topic: 'Cohesion Types',
    questionText: 'Which of the following is/are valid types of cohesion? (Choose all that apply)',
    questionType: 'multiple',
    options: [
      { id: 'a', text: 'Temporal' },
      { id: 'b', text: 'Functional' },
      { id: 'c', text: 'Content' },
      { id: 'd', text: 'All of the above' }
    ],
    correctAnswer: ['a', 'b'],
    explanation: 'Temporal cohesion and Functional cohesion are cohesion types. Content is a type of module coupling.',
    difficulty: 'medium',
    sourcePdf: 'NPTEL Assignment 6 Detailed Solution - IIT Guwahati',
    sourcePage: 13,
    verificationStatus: 'verified'
  },
  {
    id: 'w6-q13',
    originalQuestionNumber: 13,
    week: 6,
    module: 'Unit 9: Converting Design to System',
    topic: 'Coupling vs Cohesion',
    questionText: 'Which one from the following is related with interaction BETWEEN modules?',
    questionType: 'single',
    options: [
      { id: 'a', text: 'Cohesion' },
      { id: 'b', text: 'Coupling' },
      { id: 'c', text: 'Both' }
    ],
    correctAnswer: 'b',
    explanation: 'Coupling measures the degree of interdependence BETWEEN separate modules, whereas Cohesion measures intra-module binding within a single module.',
    difficulty: 'easy',
    sourcePdf: 'NPTEL Assignment 6 Detailed Solution - IIT Guwahati',
    sourcePage: 13,
    verificationStatus: 'verified'
  },

  // ==================== WEEK 7 ====================
  {
    id: 'w7-q1',
    originalQuestionNumber: 1,
    week: 7,
    module: 'Unit 10: Object Oriented Design & UML',
    topic: 'UML Associations',
    questionText: 'A class can have an association relationship with itself.',
    questionType: 'true_false',
    options: [
      { id: 'a', text: 'True' },
      { id: 'b', text: 'False' }
    ],
    correctAnswer: 'a',
    explanation: 'True. This is known as a reflexive or recursive association (for example, a Manager is an Employee who manages other Employees).',
    difficulty: 'easy',
    sourcePdf: '2024 Design & Implementation of Human-Computer Interfaces - Complete Assignments PDF',
    sourcePage: 21,
    verificationStatus: 'verified'
  },
  {
    id: 'w7-q1-alt',
    originalQuestionNumber: 1,
    week: 7,
    module: 'Unit 10: Object Oriented Design & UML',
    topic: 'Functional Design Services',
    questionText: 'In functional design approach we think of the system as provider of a set of “services” represented as ________.',
    questionType: 'single',
    options: [
      { id: 'a', text: 'Data' },
      { id: 'b', text: 'Functions' },
      { id: 'c', text: 'Objects' }
    ],
    correctAnswer: 'b',
    explanation: 'In the functional approach, system services are realized through a hierarchy of functions or subroutines.',
    difficulty: 'easy',
    sourcePdf: 'NPTEL Assignment 7 Detailed Solution - IIT Guwahati',
    sourcePage: 14,
    verificationStatus: 'verified'
  },
  {
    id: 'w7-q2',
    originalQuestionNumber: 2,
    week: 7,
    module: 'Unit 10: Object Oriented Design & UML',
    topic: 'UML System Views',
    questionText: 'UML supports ______________ views of a system.',
    questionType: 'single',
    options: [
      { id: 'a', text: '3' },
      { id: 'b', text: '5' },
      { id: 'c', text: '7' },
      { id: 'd', text: '9' }
    ],
    correctAnswer: 'b',
    explanation: 'UML models systems using the 5 views of the 4+1 architecture: Use Case view, Design view, Process view, Implementation view, and Deployment view.',
    difficulty: 'easy',
    sourcePdf: '2024 Design & Implementation of Human-Computer Interfaces - Complete Assignments PDF',
    sourcePage: 21,
    verificationStatus: 'verified'
  },
  {
    id: 'w7-q3',
    originalQuestionNumber: 3,
    week: 7,
    module: 'Unit 10: Object Oriented Design & UML',
    topic: 'OOP Acronym',
    questionText: 'What is the full form of OOP?',
    questionType: 'single',
    options: [
      { id: 'a', text: 'Object oriented planning' },
      { id: 'b', text: 'Object oriented processing' },
      { id: 'c', text: 'Object oriented programming' }
    ],
    correctAnswer: 'c',
    explanation: 'OOP stands for Object-Oriented Programming.',
    difficulty: 'easy',
    sourcePdf: '2024 Design & Implementation of Human-Computer Interfaces - Complete Assignments PDF',
    sourcePage: 21,
    verificationStatus: 'verified'
  },
  {
    id: 'w7-q4',
    originalQuestionNumber: 4,
    week: 7,
    module: 'Unit 10: Object Oriented Design & UML',
    topic: 'Operations Terminology',
    questionText: 'In object-oriented design, operations are also called: (Choose all that apply)',
    questionType: 'multiple',
    options: [
      { id: 'a', text: 'method' },
      { id: 'b', text: 'member function' },
      { id: 'c', text: 'member process' },
      { id: 'd', text: 'member procedure' }
    ],
    correctAnswer: ['a', 'b'],
    explanation: 'In OOD terminology, the operations defined in a class are known as methods or member functions.',
    difficulty: 'medium',
    sourcePdf: '2024 Design & Implementation of Human-Computer Interfaces - Complete Assignments PDF',
    sourcePage: 22,
    verificationStatus: 'verified'
  },
  {
    id: 'w7-q5',
    originalQuestionNumber: 5,
    week: 7,
    module: 'Unit 10: Object Oriented Design & UML',
    topic: 'UML Acronym',
    questionText: 'What is the full form of UML?',
    questionType: 'single',
    options: [
      { id: 'a', text: 'Universal Modeling Language' },
      { id: 'b', text: 'Object oriented processing' },
      { id: 'c', text: 'Unified Modelling Language' }
    ],
    correctAnswer: 'c',
    explanation: 'UML stands for Unified Modeling Language.',
    difficulty: 'easy',
    sourcePdf: '2024 Design & Implementation of Human-Computer Interfaces - Complete Assignments PDF',
    sourcePage: 22,
    verificationStatus: 'verified'
  },
  {
    id: 'w7-q6',
    originalQuestionNumber: 6,
    week: 7,
    module: 'Unit 10: Object Oriented Design & UML',
    topic: 'Entity Objects',
    questionText: '________ objects normally hold information (e.g. book, book registers etc).',
    questionType: 'single',
    options: [
      { id: 'a', text: 'Boundary' },
      { id: 'b', text: 'Controller' },
      { id: 'c', text: 'Entity' }
    ],
    correctAnswer: 'c',
    explanation: 'In Jacobson’s BCE (Boundary-Control-Entity) pattern, Entity objects represent enduring business and domain information.',
    difficulty: 'easy',
    sourcePdf: '2024 Design & Implementation of Human-Computer Interfaces - Complete Assignments PDF',
    sourcePage: 22,
    verificationStatus: 'verified'
  },
  {
    id: 'w7-q7',
    originalQuestionNumber: 7,
    week: 7,
    module: 'Unit 10: Object Oriented Design & UML',
    topic: 'UML Implementation View',
    questionText: 'Implementation view can be captured using ________.',
    questionType: 'single',
    options: [
      { id: 'a', text: 'Deployment diagram' },
      { id: 'b', text: 'Component diagram' },
      { id: 'c', text: 'Class diagram' },
      { id: 'd', text: 'Use case diagram' }
    ],
    correctAnswer: 'b',
    explanation: 'The implementation view models the physical software organization (modules, source code files, libraries) using Component Diagrams.',
    difficulty: 'easy',
    sourcePdf: '2024 Design & Implementation of Human-Computer Interfaces - Complete Assignments PDF',
    sourcePage: 22,
    verificationStatus: 'verified'
  },
  {
    id: 'w7-q8',
    originalQuestionNumber: 8,
    week: 7,
    module: 'Unit 10: Object Oriented Design & UML',
    topic: 'UML Nature',
    questionText: 'UML is a design methodology.',
    questionType: 'true_false',
    options: [
      { id: 'a', text: 'True' },
      { id: 'b', text: 'False' }
    ],
    correctAnswer: 'b',
    explanation: 'False. UML is a standardized visual notation and modeling language, NOT a software development process or methodology.',
    difficulty: 'easy',
    sourcePdf: '2024 Design & Implementation of Human-Computer Interfaces - Complete Assignments PDF',
    sourcePage: 23,
    verificationStatus: 'verified'
  },
  {
    id: 'w7-q9',
    originalQuestionNumber: 9,
    week: 7,
    module: 'Unit 10: Object Oriented Design & UML',
    topic: 'Class Behavior',
    questionText: '________ effectively denotes the behavior of a class.',
    questionType: 'single',
    options: [
      { id: 'a', text: 'Data' },
      { id: 'b', text: 'Operations' },
      { id: 'c', text: 'Objects' },
      { id: 'd', text: 'Attributes' }
    ],
    correctAnswer: 'b',
    explanation: 'Operations (methods) govern how an object behaves, responds to messages, and modifies its state.',
    difficulty: 'easy',
    sourcePdf: '2024 Design & Implementation of Human-Computer Interfaces - Complete Assignments PDF',
    sourcePage: 23,
    verificationStatus: 'verified'
  },
  {
    id: 'w7-q10',
    originalQuestionNumber: 10,
    week: 7,
    module: 'Unit 10: Object Oriented Design & UML',
    topic: 'Class Anatomy',
    questionText: 'A class contains attributes and ___________.',
    questionType: 'single',
    options: [
      { id: 'a', text: 'Data' },
      { id: 'b', text: 'Operations' },
      { id: 'c', text: 'Object' }
    ],
    correctAnswer: 'b',
    explanation: 'A class encapsulates state (Attributes) and behavior (Operations).',
    difficulty: 'easy',
    sourcePdf: '2024 Design & Implementation of Human-Computer Interfaces - Complete Assignments PDF',
    sourcePage: 23,
    verificationStatus: 'verified'
  },
  {
    id: 'w7-q11',
    originalQuestionNumber: 11,
    week: 7,
    module: 'Unit 10: Object Oriented Design & UML',
    topic: 'OOA Acronym',
    questionText: 'Full form of OOA is:',
    questionType: 'single',
    options: [
      { id: 'a', text: 'object oriented assignment' },
      { id: 'b', text: 'object oriented assistance' },
      { id: 'c', text: 'object oriented analysis' },
      { id: 'd', text: 'object oriented attributes' }
    ],
    correctAnswer: 'c',
    explanation: 'OOA stands for Object-Oriented Analysis.',
    difficulty: 'easy',
    sourcePdf: 'NPTEL Assignment 7 Detailed Solution - IIT Guwahati',
    sourcePage: 14,
    verificationStatus: 'verified'
  },
  {
    id: 'w7-q12',
    originalQuestionNumber: 12,
    week: 7,
    module: 'Unit 10: Object Oriented Design & UML',
    topic: 'UML Representation Focus',
    questionText: 'UML is a language to represent:',
    questionType: 'single',
    options: [
      { id: 'a', text: 'OOP' },
      { id: 'b', text: 'OOA' },
      { id: 'c', text: 'OOD' }
    ],
    correctAnswer: 'c',
    explanation: 'UML is primarily standardized to represent Object-Oriented Design (OOD).',
    difficulty: 'easy',
    sourcePdf: 'NPTEL Assignment 7 Detailed Solution - IIT Guwahati',
    sourcePage: 15,
    verificationStatus: 'verified'
  },
  {
    id: 'w7-q13',
    originalQuestionNumber: 13,
    week: 7,
    module: 'Unit 10: Object Oriented Design & UML',
    topic: 'UML Structural View Diagrams',
    questionText: 'In a UML diagram, the structural view consists of: (Choose all that apply)',
    questionType: 'multiple',
    options: [
      { id: 'a', text: 'sequence diagram' },
      { id: 'b', text: 'class diagram' },
      { id: 'c', text: 'object diagram' }
    ],
    correctAnswer: ['b', 'c'],
    explanation: 'Class diagrams and Object diagrams depict the static, structural view of a system. Sequence diagrams represent the behavioral/interaction view.',
    difficulty: 'medium',
    sourcePdf: 'Design and Implementation of HCI All Assignments 2025',
    sourcePage: 17,
    verificationStatus: 'verified'
  },

  // ==================== WEEK 8 ====================
  {
    id: 'w8-q1',
    originalQuestionNumber: 1,
    week: 8,
    module: 'Unit 11: System Implementation',
    topic: 'Coding Guidelines Benefits',
    questionText: 'Following standard coding guidelines helps to improve _______.',
    questionType: 'single',
    options: [
      { id: 'a', text: 'Readability only' },
      { id: 'b', text: 'Understandability only' },
      { id: 'c', text: 'Teamwork only' },
      { id: 'd', text: 'Readability, understandability, and teamwork' }
    ],
    correctAnswer: 'd',
    explanation: 'Standardized coding conventions elevate code readability, make system logic easier to comprehend, and smooth multi-developer teamwork.',
    difficulty: 'easy',
    sourcePdf: '2024 Design & Implementation of Human-Computer Interfaces - Complete Assignments PDF',
    sourcePage: 24,
    verificationStatus: 'verified'
  },
  {
    id: 'w8-q2',
    originalQuestionNumber: 2,
    week: 8,
    module: 'Unit 11: System Implementation',
    topic: 'Function Length Rules',
    questionText: 'According to good coding guidelines in the course, a function should have no longer than _____ lines of code.',
    questionType: 'single',
    options: [
      { id: 'a', text: '5' },
      { id: 'b', text: '16' },
      { id: 'c', text: '10' },
      { id: 'd', text: '8' }
    ],
    correctAnswer: 'c',
    explanation: 'In the course guidelines, clean and maintainable functions should ideally be concise, keeping within approximately 10 lines of code.',
    difficulty: 'easy',
    sourcePdf: '2024 Design & Implementation of Human-Computer Interfaces - Complete Assignments PDF',
    sourcePage: 24,
    verificationStatus: 'verified'
  },
  {
    id: 'w8-q3',
    originalQuestionNumber: 3,
    week: 8,
    module: 'Unit 11: System Implementation',
    topic: 'Code Smells & Bad Practices',
    questionText: 'What are some things to avoid when writing code? (Choose all that apply)',
    questionType: 'multiple',
    options: [
      { id: 'a', text: 'Using lengthy functions' },
      { id: 'b', text: 'Using the same identifier for multiple purposes' },
      { id: 'c', text: 'Using ‘goto’ (branching) statements indiscriminately' },
      { id: 'd', text: 'Using proper indentation' }
    ],
    correctAnswer: ['a', 'b', 'c'],
    explanation: 'Lengthy functions, variable identifier reuse, and indiscriminate gotos degrade code quality and readability. Proper indentation is encouraged and should NOT be avoided.',
    difficulty: 'medium',
    sourcePdf: '2024 Design & Implementation of Human-Computer Interfaces - Complete Assignments PDF',
    sourcePage: 24,
    verificationStatus: 'verified'
  },
  {
    id: 'w8-q4',
    originalQuestionNumber: 4,
    week: 8,
    module: 'Unit 11: System Implementation',
    topic: 'Testing Categories',
    questionText: 'Two broad categories of code testing methods are the review-based method and __________ method.',
    questionType: 'single',
    options: [
      { id: 'a', text: 'Manual testing' },
      { id: 'b', text: 'Execution-based' }
    ],
    correctAnswer: 'b',
    explanation: 'Code testing is divided into Review-based (static review, inspection, walkthrough) and Execution-based (dynamic execution of test cases).',
    difficulty: 'easy',
    sourcePdf: '2024 Design & Implementation of Human-Computer Interfaces - Complete Assignments PDF',
    sourcePage: 25,
    verificationStatus: 'verified'
  },
  {
    id: 'w8-q5',
    originalQuestionNumber: 5,
    week: 8,
    module: 'Unit 11: System Implementation',
    topic: 'White-Box Testing Scope',
    questionText: 'White-box testing refers to designing test cases using knowledge of internal structure of the software.',
    questionType: 'true_false',
    options: [
      { id: 'a', text: 'True' },
      { id: 'b', text: 'False' }
    ],
    correctAnswer: 'a',
    explanation: 'True. White-box (structural) testing relies on knowledge of program flow, branches, loops, and statements.',
    difficulty: 'easy',
    sourcePdf: '2024 Design & Implementation of Human-Computer Interfaces - Complete Assignments PDF',
    sourcePage: 25,
    verificationStatus: 'verified'
  },
  {
    id: 'w8-q6',
    originalQuestionNumber: 6,
    week: 8,
    module: 'Unit 11: System Implementation',
    topic: 'Review-Based Testing Methods',
    questionText: 'What are the two common methods for review-based testing? (Choose all that apply)',
    questionType: 'multiple',
    options: [
      { id: 'a', text: 'Code inspection' },
      { id: 'b', text: 'Code walkthrough' },
      { id: 'c', text: 'Unit testing' }
    ],
    correctAnswer: ['a', 'b'],
    explanation: 'Code inspection (formal checklist review) and Code walkthrough (peer simulation) are review-based static methods. Unit testing is dynamic execution-based.',
    difficulty: 'medium',
    sourcePdf: '2024 Design & Implementation of Human-Computer Interfaces - Complete Assignments PDF',
    sourcePage: 25,
    verificationStatus: 'verified'
  },
  {
    id: 'w8-q7',
    originalQuestionNumber: 7,
    week: 8,
    module: 'Unit 11: System Implementation',
    topic: 'Code Walkthrough Simulation',
    questionText: 'Which of the following code testing method requires simulation of code execution by hand?',
    questionType: 'single',
    options: [
      { id: 'a', text: 'Code walkthrough' },
      { id: 'b', text: 'Code inspection' },
      { id: 'c', text: 'Black box testing' },
      { id: 'd', text: 'White box testing' }
    ],
    correctAnswer: 'a',
    explanation: 'In a code walkthrough, the author or peers step through the code simulating test cases manually on paper or whiteboard.',
    difficulty: 'easy',
    sourcePdf: 'NPTEL Assignment 8 Detailed Solution - IIT Guwahati',
    sourcePage: 17,
    verificationStatus: 'verified'
  },
  {
    id: 'w8-q8',
    originalQuestionNumber: 8,
    week: 8,
    module: 'Unit 11: System Implementation',
    topic: 'Inspection Error Detection',
    questionText: 'Uninitialized variable is one of the common errors in programming that can be identified through code inspection.',
    questionType: 'true_false',
    options: [
      { id: 'a', text: 'True' },
      { id: 'b', text: 'False' }
    ],
    correctAnswer: 'a',
    explanation: 'True. Code inspection checklists explicitly search for variables used prior to initialization.',
    difficulty: 'easy',
    sourcePdf: '2024 Design & Implementation of Human-Computer Interfaces - Complete Assignments PDF',
    sourcePage: 26,
    verificationStatus: 'verified'
  },
  {
    id: 'w8-q9',
    originalQuestionNumber: 9,
    week: 8,
    module: 'Unit 11: System Implementation',
    topic: 'Walkthrough Team Size',
    questionText: 'How many members should be present in a code walkthrough team?',
    questionType: 'single',
    options: [
      { id: 'a', text: '2-3 members' },
      { id: 'b', text: '3-5 members' },
      { id: 'c', text: '5-7 members' },
      { id: 'd', text: '7-10 members' }
    ],
    correctAnswer: 'b',
    explanation: 'A code walkthrough is most effective with a small team of 3 to 5 members to keep reviews focused, participatory, and efficient.',
    difficulty: 'easy',
    sourcePdf: '2024 Design & Implementation of Human-Computer Interfaces - Complete Assignments PDF',
    sourcePage: 26,
    verificationStatus: 'verified'
  },
  {
    id: 'w8-q10',
    originalQuestionNumber: 10,
    week: 8,
    module: 'Unit 11: System Implementation',
    topic: 'Test Suite Definition',
    questionText: 'Test suite is a set of all test cases with which a given software is to be tested.',
    questionType: 'true_false',
    options: [
      { id: 'a', text: 'True' },
      { id: 'b', text: 'False' }
    ],
    correctAnswer: 'a',
    explanation: 'True. A test suite is the aggregate collection of test cases prepared to evaluate a system.',
    difficulty: 'easy',
    sourcePdf: '2024 Design & Implementation of Human-Computer Interfaces - Complete Assignments PDF',
    sourcePage: 26,
    verificationStatus: 'verified'
  },
  {
    id: 'w8-q11',
    originalQuestionNumber: 11,
    week: 8,
    module: 'Unit 11: System Implementation',
    topic: 'Black Box Testing Requirements',
    questionText: 'Which of the following is NOT required to perform black box testing?',
    questionType: 'single',
    options: [
      { id: 'a', text: 'Equivalence class partitioning' },
      { id: 'b', text: 'Boundary value analysis' },
      { id: 'c', text: 'Test suite creation' },
      { id: 'd', text: 'Knowledge of the internal structure of the code' }
    ],
    correctAnswer: 'd',
    explanation: 'Black box testing treats code as an opaque box based purely on external functional requirements; internal code structure knowledge is neither required nor used.',
    difficulty: 'easy',
    sourcePdf: 'NPTEL Assignment 8 Detailed Solution - IIT Guwahati',
    sourcePage: 17,
    verificationStatus: 'verified'
  },

  // ==================== WEEK 9 ====================
  {
    id: 'w9-q1',
    originalQuestionNumber: 1,
    week: 9,
    module: 'Unit 12: System Implementation',
    topic: 'Functional Testing',
    questionText: 'Functional testing is related to:',
    questionType: 'single',
    options: [
      { id: 'a', text: 'Black-box testing' },
      { id: 'b', text: 'White-box testing' }
    ],
    correctAnswer: 'a',
    explanation: 'Black-box testing focuses on validating functionality against requirements without inspecting internal source code; it is synonymously known as functional testing.',
    difficulty: 'easy',
    sourcePdf: '2024 Design & Implementation of Human-Computer Interfaces - Complete Assignments PDF',
    sourcePage: 27,
    verificationStatus: 'verified'
  },
  {
    id: 'w9-q2',
    originalQuestionNumber: 2,
    week: 9,
    module: 'Unit 12: System Implementation',
    topic: 'Test Case Design Approaches',
    questionText: 'Main approaches to design test cases in black box testing are: (Choose all that apply)',
    questionType: 'multiple',
    options: [
      { id: 'a', text: 'Equivalence class partitioning' },
      { id: 'b', text: 'Equivalence value partitioning' },
      { id: 'c', text: 'Boundary object analysis' },
      { id: 'd', text: 'Boundary value analysis' }
    ],
    correctAnswer: ['a', 'd'],
    explanation: 'The two foundational black-box test design methodologies are Equivalence Class Partitioning and Boundary Value Analysis (BVA).',
    difficulty: 'medium',
    sourcePdf: '2024 Design & Implementation of Human-Computer Interfaces - Complete Assignments PDF',
    sourcePage: 27,
    verificationStatus: 'verified'
  },
  {
    id: 'w9-q3',
    originalQuestionNumber: 3,
    week: 9,
    module: 'Unit 12: System Implementation',
    topic: 'Black Box Basis',
    questionText: 'In Black-box testing, the test cases are based on: (Choose all that apply)',
    questionType: 'multiple',
    options: [
      { id: 'a', text: 'input' },
      { id: 'b', text: 'knowledge of design' },
      { id: 'c', text: 'output' },
      { id: 'd', text: 'knowledge of code' }
    ],
    correctAnswer: ['a', 'c'],
    explanation: 'Black-box test design only considers input domain data and expected output specifications, ignoring internal design and code details.',
    difficulty: 'medium',
    sourcePdf: '2024 Design & Implementation of Human-Computer Interfaces - Complete Assignments PDF',
    sourcePage: 27,
    verificationStatus: 'verified'
  },
  {
    id: 'w9-q4',
    originalQuestionNumber: 4,
    week: 9,
    module: 'Unit 12: System Implementation',
    topic: 'Internal Structure Testing',
    questionText: 'Test cases designed using knowledge of internal structure of software are for:',
    questionType: 'single',
    options: [
      { id: 'a', text: 'Black-box testing' },
      { id: 'b', text: 'White-box testing' }
    ],
    correctAnswer: 'b',
    explanation: 'White-box testing explicitly utilizes knowledge of control logic, branching, statements, and code data structures.',
    difficulty: 'easy',
    sourcePdf: '2024 Design & Implementation of Human-Computer Interfaces - Complete Assignments PDF',
    sourcePage: 28,
    verificationStatus: 'verified'
  },
  {
    id: 'w9-q5',
    originalQuestionNumber: 5,
    week: 9,
    module: 'Unit 12: System Implementation',
    topic: 'Review-Based Testing Value',
    questionText: 'Review based testing is good for early evaluation to ‘clean up’ the code before more rigorous and formal testing is done.',
    questionType: 'true_false',
    options: [
      { id: 'a', text: 'True' },
      { id: 'b', text: 'False' }
    ],
    correctAnswer: 'a',
    explanation: 'True. Static reviews filter out syntactic inconsistencies, uninitialized variables, and logic defects early before automated test suites execute.',
    difficulty: 'easy',
    sourcePdf: '2024 Design & Implementation of Human-Computer Interfaces - Complete Assignments PDF',
    sourcePage: 28,
    verificationStatus: 'verified'
  },
  {
    id: 'w9-q6',
    originalQuestionNumber: 6,
    week: 9,
    module: 'Unit 12: System Implementation',
    topic: 'Boundary Value Defects',
    questionText: 'Programmers may improperly use < instead of <= or conversely <= for < in code. This is an example of _______.',
    questionType: 'single',
    options: [
      { id: 'a', text: 'Equivalence problem' },
      { id: 'b', text: 'Boundary value problem' }
    ],
    correctAnswer: 'b',
    explanation: 'Off-by-one errors and strict vs non-strict inequalities occur right at the edges of equivalence classes, making them classic Boundary Value problems.',
    difficulty: 'easy',
    sourcePdf: '2024 Design & Implementation of Human-Computer Interfaces - Complete Assignments PDF',
    sourcePage: 28,
    verificationStatus: 'verified'
  },
  {
    id: 'w9-q7',
    originalQuestionNumber: 7,
    week: 9,
    module: 'Unit 12: System Implementation',
    topic: 'Equivalence Class Representation',
    questionText: 'Testing code with any _____ value(s) of an equivalence class is as good as testing with ALL input values belonging to that class.',
    questionType: 'single',
    options: [
      { id: 'a', text: 'One' },
      { id: 'b', text: 'Two' },
      { id: 'c', text: 'Five' },
      { id: 'd', text: 'Four' }
    ],
    correctAnswer: 'a',
    explanation: 'The fundamental hypothesis of equivalence partitioning is that if one value in an equivalence partition behaves correctly, all other values in that partition will behave similarly.',
    difficulty: 'easy',
    sourcePdf: '2024 Design & Implementation of Human-Computer Interfaces - Complete Assignments PDF',
    sourcePage: 29,
    verificationStatus: 'verified'
  },
  {
    id: 'w9-q8',
    originalQuestionNumber: 8,
    week: 9,
    module: 'Unit 12: System Implementation',
    topic: 'Input Domain Partitioning',
    questionText: 'In black box testing, domain of input values is partitioned into sets; each set is called an _________.',
    questionType: 'single',
    options: [
      { id: 'a', text: 'Partition class' },
      { id: 'b', text: 'Equivalence class' },
      { id: 'c', text: 'Program class' }
    ],
    correctAnswer: 'b',
    explanation: 'Disjoint subsets of input values that the program is assumed to treat equivalently are called Equivalence Classes.',
    difficulty: 'easy',
    sourcePdf: '2024 Design & Implementation of Human-Computer Interfaces - Complete Assignments PDF',
    sourcePage: 29,
    verificationStatus: 'verified'
  },
  {
    id: 'w9-q9',
    originalQuestionNumber: 9,
    week: 9,
    module: 'Unit 12: System Implementation',
    topic: 'Random Test Cases',
    questionText: 'Randomly selected test cases do not necessarily contribute to significance of a test suite.',
    questionType: 'true_false',
    options: [
      { id: 'a', text: 'True' },
      { id: 'b', text: 'False' }
    ],
    correctAnswer: 'a',
    explanation: 'True. Random inputs often hit the same equivalence class repeatedly while missing critical boundary edge conditions.',
    difficulty: 'easy',
    sourcePdf: 'NPTEL Assignment 9 Detailed Solution - IIT Guwahati',
    sourcePage: 18,
    verificationStatus: 'verified'
  },
  {
    id: 'w9-q10',
    originalQuestionNumber: 10,
    week: 9,
    module: 'Unit 12: System Implementation',
    topic: 'Testing Categories',
    questionText: 'Which of the following is/are code testing method categories? (Choose all that apply)',
    questionType: 'multiple',
    options: [
      { id: 'a', text: 'Review-based' },
      { id: 'b', text: 'Execution-based' },
      { id: 'c', text: 'Analysis-based' }
    ],
    correctAnswer: ['a', 'b'],
    explanation: 'Software testing methods fall into Review-based (static examination) and Execution-based (dynamic execution of test cases).',
    difficulty: 'medium',
    sourcePdf: 'Design and Implementation of HCI All Assignments 2025',
    sourcePage: 21,
    verificationStatus: 'verified'
  },

  // ==================== WEEK 10 ====================
  {
    id: 'w10-q1',
    originalQuestionNumber: 1,
    week: 10,
    module: 'Unit 13: System Implementation',
    topic: 'Beta Testing',
    questionText: 'Friendly customers are recruited for:',
    questionType: 'single',
    options: [
      { id: 'a', text: 'Alpha testing' },
      { id: 'b', text: 'Beta testing' },
      { id: 'c', text: 'Acceptance testing' }
    ],
    correctAnswer: 'b',
    explanation: 'Beta testing involves releasing pre-production software to friendly, external real-world users in their actual working environment.',
    difficulty: 'easy',
    sourcePdf: '2024 Design & Implementation of Human-Computer Interfaces - Complete Assignments PDF',
    sourcePage: 30,
    verificationStatus: 'verified'
  },
  {
    id: 'w10-q2',
    originalQuestionNumber: 2,
    week: 10,
    module: 'Unit 13: System Implementation',
    topic: 'White-Box Testing Requirements',
    questionText: 'To do a white-box testing, knowledge of internal structure is required.',
    questionType: 'true_false',
    options: [
      { id: 'a', text: 'True' },
      { id: 'b', text: 'False' }
    ],
    correctAnswer: 'a',
    explanation: 'True. White-box testing requires visibility into source code architecture, branch logic, and statement control flow.',
    difficulty: 'easy',
    sourcePdf: '2024 Design & Implementation of Human-Computer Interfaces - Complete Assignments PDF',
    sourcePage: 30,
    verificationStatus: 'verified'
  },
  {
    id: 'w10-q3',
    originalQuestionNumber: 3,
    week: 10,
    module: 'Unit 13: System Implementation',
    topic: 'Program Flow Visualization',
    questionText: 'To understand white-box testing strategies, program (flow) visualization helps. To visualize the program we can take help of ________.',
    questionType: 'single',
    options: [
      { id: 'a', text: 'CFG' },
      { id: 'b', text: 'DFG' },
      { id: 'c', text: 'ERG' },
      { id: 'd', text: 'Class diagram' }
    ],
    correctAnswer: 'a',
    explanation: 'A Control Flow Graph (CFG) graphically represents all paths that might be traversed through a program during execution.',
    difficulty: 'easy',
    sourcePdf: '2024 Design & Implementation of Human-Computer Interfaces - Complete Assignments PDF',
    sourcePage: 30,
    verificationStatus: 'verified'
  },
  {
    id: 'w10-q4',
    originalQuestionNumber: 4,
    week: 10,
    module: 'Unit 13: System Implementation',
    topic: 'CFG Construction',
    questionText: 'To construct a CFG we assign numbers to all statements of the program, create a node in the CFG for each numbered statement and _____________.',
    questionType: 'single',
    options: [
      { id: 'a', text: 'Complement the CFG' },
      { id: 'b', text: 'Add edges' },
      { id: 'c', text: 'Sort the nodes' }
    ],
    correctAnswer: 'b',
    explanation: 'Constructing a CFG: Statement numbers become nodes, and directed edges are added from node A to node B if execution can transfer control from A to B.',
    difficulty: 'easy',
    sourcePdf: '2024 Design & Implementation of Human-Computer Interfaces - Complete Assignments PDF',
    sourcePage: 31,
    verificationStatus: 'verified'
  },
  {
    id: 'w10-q5',
    originalQuestionNumber: 5,
    week: 10,
    module: 'Unit 13: System Implementation',
    topic: 'Branch vs Statement Coverage',
    questionText: 'Branch coverage guarantees statement coverage.',
    questionType: 'true_false',
    options: [
      { id: 'a', text: 'True' },
      { id: 'b', text: 'False' }
    ],
    correctAnswer: 'a',
    explanation: 'True. Exercising both true and false outcomes of every decision branch guarantees that every statement on those paths is executed at least once.',
    difficulty: 'medium',
    sourcePdf: '2024 Design & Implementation of Human-Computer Interfaces - Complete Assignments PDF',
    sourcePage: 31,
    verificationStatus: 'verified'
  },
  {
    id: 'w10-q6',
    originalQuestionNumber: 6,
    week: 10,
    module: 'Unit 13: System Implementation',
    topic: 'Path Coverage',
    questionText: 'In path coverage, test cases should ensure all __________ in the code executed at least once.',
    questionType: 'single',
    options: [
      { id: 'a', text: 'Linearly independent paths' },
      { id: 'b', text: 'Linearly dependent paths' }
    ],
    correctAnswer: 'a',
    explanation: 'Basis path testing requires that every linearly independent path through the program’s control flow graph is traversed at least once.',
    difficulty: 'easy',
    sourcePdf: '2024 Design & Implementation of Human-Computer Interfaces - Complete Assignments PDF',
    sourcePage: 31,
    verificationStatus: 'verified'
  },
  {
    id: 'w10-q7',
    originalQuestionNumber: 7,
    week: 10,
    module: 'Unit 13: System Implementation',
    topic: 'Cyclomatic Complexity Formula',
    questionText: 'To compute cyclomatic complexity, we can use ___________, where E=number of edges, N=number of nodes.',
    questionType: 'single',
    options: [
      { id: 'a', text: 'E-N+2' },
      { id: 'b', text: 'E-N+1' },
      { id: 'c', text: 'E+N-2' },
      { id: 'd', text: 'E+N-1' }
    ],
    correctAnswer: 'a',
    explanation: 'McCabe’s cyclomatic complexity formula for a connected control flow graph is V(G) = E - N + 2.',
    difficulty: 'easy',
    sourcePdf: '2024 Design & Implementation of Human-Computer Interfaces - Complete Assignments PDF',
    sourcePage: 31,
    verificationStatus: 'verified'
  },
  {
    id: 'w10-q8',
    originalQuestionNumber: 8,
    week: 10,
    module: 'Unit 13: System Implementation',
    topic: 'Empirical Research Stages Count',
    questionText: 'There are _____ stages of empirical research.',
    questionType: 'single',
    options: [
      { id: 'a', text: 'Three' },
      { id: 'b', text: 'Four' },
      { id: 'c', text: 'Five' },
      { id: 'd', text: 'Six' }
    ],
    correctAnswer: 'b',
    explanation: 'The 4 stages of empirical research are: (1) Research question formulation, (2) Variable determination, (3) Experiment design, and (4) Data analysis.',
    difficulty: 'easy',
    sourcePdf: '2024 Design & Implementation of Human-Computer Interfaces - Complete Assignments PDF',
    sourcePage: 31,
    verificationStatus: 'verified'
  },
  {
    id: 'w10-q9',
    originalQuestionNumber: 9,
    week: 10,
    module: 'Unit 13: System Implementation',
    topic: 'Empirical Data Definition',
    questionText: 'Data we get from observation is ________ data.',
    questionType: 'single',
    options: [
      { id: 'a', text: 'Reflective' },
      { id: 'b', text: 'Empirical' },
      { id: 'c', text: 'Authoritative' },
      { id: 'd', text: 'Experiential' }
    ],
    correctAnswer: 'b',
    explanation: 'Empirical data denotes verifiable data gathered through direct observation, experiment, or sensory experience.',
    difficulty: 'easy',
    sourcePdf: '2024 Design & Implementation of Human-Computer Interfaces - Complete Assignments PDF',
    sourcePage: 32,
    verificationStatus: 'verified'
  },
  {
    id: 'w10-q10',
    originalQuestionNumber: 10,
    week: 10,
    module: 'Unit 13: System Implementation',
    topic: 'CFG Acronym',
    questionText: 'What is the full form of CFG?',
    questionType: 'single',
    options: [
      { id: 'a', text: 'Code Free Graph' },
      { id: 'b', text: 'Code Flow Graph' },
      { id: 'c', text: 'Control Flow Graph' },
      { id: 'd', text: 'Control Free Graph' }
    ],
    correctAnswer: 'c',
    explanation: 'CFG stands for Control Flow Graph.',
    difficulty: 'easy',
    sourcePdf: '2024 Design & Implementation of Human-Computer Interfaces - Complete Assignments PDF',
    sourcePage: 32,
    verificationStatus: 'verified'
  },
  {
    id: 'w10-q11',
    originalQuestionNumber: 11,
    week: 10,
    module: 'Unit 13: System Implementation',
    topic: 'System Testing Stages',
    questionText: 'Three main stages of system testing are alpha testing, beta testing and _________.',
    questionType: 'single',
    options: [
      { id: 'a', text: 'Gama testing' },
      { id: 'b', text: 'Sigma testing' },
      { id: 'c', text: 'Acceptance testing' },
      { id: 'd', text: 'Omega testing' }
    ],
    correctAnswer: 'c',
    explanation: 'The three primary system testing stages are Alpha testing (internal), Beta testing (external friendly users), and final Acceptance testing (client sign-off).',
    difficulty: 'easy',
    sourcePdf: 'NPTEL Assignment 10 Detailed Solution - IIT Guwahati',
    sourcePage: 22,
    verificationStatus: 'verified'
  },
  {
    id: 'w10-q12',
    originalQuestionNumber: 12,
    week: 10,
    module: 'Unit 13: System Implementation',
    topic: 'Integration Testing Direction',
    questionText: 'Each subsystem tested separately and then full system tested. This type of testing is known as:',
    questionType: 'single',
    options: [
      { id: 'a', text: 'Bottom-up testing' },
      { id: 'b', text: 'Top-down' }
    ],
    correctAnswer: 'a',
    explanation: 'Bottom-up testing starts by integrating and verifying lower-level building blocks and subsystems before progressing to the entire system.',
    difficulty: 'easy',
    sourcePdf: 'NPTEL Assignment 10 Detailed Solution - IIT Guwahati',
    sourcePage: 23,
    verificationStatus: 'verified'
  },
  {
    id: 'w10-q13',
    originalQuestionNumber: 13,
    week: 10,
    module: 'Unit 13: System Implementation',
    topic: 'Testing Stubs',
    questionText: 'Stubs are used to simulate the effect of ___________ routines called by the routines under test.',
    questionType: 'single',
    options: [
      { id: 'a', text: 'lower-level' },
      { id: 'b', text: 'upper-level' }
    ],
    correctAnswer: 'a',
    explanation: 'In top-down testing, stubs simulate the missing lower-level callee subroutines; in bottom-up testing, drivers simulate upper-level callers.',
    difficulty: 'easy',
    sourcePdf: 'NPTEL Assignment 10 Detailed Solution - IIT Guwahati',
    sourcePage: 23,
    verificationStatus: 'verified'
  },

  // ==================== WEEK 11 ====================
  {
    id: 'w11-q1',
    originalQuestionNumber: 1,
    week: 11,
    module: 'Unit 14: Empirical Usability Evaluation',
    topic: 'Empirical Research Definition',
    questionText: 'When we perform a controlled experiment to collect and analyze data on user behavior, the entire process is known as __________.',
    questionType: 'single',
    options: [
      { id: 'a', text: 'programmable research' },
      { id: 'b', text: 'hypothetical research' },
      { id: 'c', text: 'empirical research' },
      { id: 'd', text: 'theoretical research' }
    ],
    correctAnswer: 'c',
    explanation: 'Controlled experiments measuring observed quantitative/qualitative user performance constitute empirical research.',
    difficulty: 'easy',
    sourcePdf: '2024 Design & Implementation of Human-Computer Interfaces - Complete Assignments PDF',
    sourcePage: 33,
    verificationStatus: 'verified'
  },
  {
    id: 'w11-q2',
    originalQuestionNumber: 2,
    week: 11,
    module: 'Unit 14: Empirical Usability Evaluation',
    topic: 'Empirical Stages',
    questionText: 'There are broadly _____ stages of empirical research.',
    questionType: 'single',
    options: [
      { id: 'a', text: 'two' },
      { id: 'b', text: 'three' },
      { id: 'c', text: 'four' },
      { id: 'd', text: 'five' }
    ],
    correctAnswer: 'c',
    explanation: 'The 4 stages of empirical research in HCI are: (1) Formulating research question, (2) Determining variables, (3) Designing the experiment, and (4) Analyzing empirical data.',
    difficulty: 'easy',
    sourcePdf: '2024 Design & Implementation of Human-Computer Interfaces - Complete Assignments PDF',
    sourcePage: 33,
    verificationStatus: 'verified'
  },
  {
    id: 'w11-q3',
    originalQuestionNumber: 3,
    week: 11,
    module: 'Unit 14: Empirical Usability Evaluation',
    topic: 'Testable vs Non-testable Questions',
    questionText: 'Suppose we formed two research questions: RQ1: "Is the new technique good?" and RQ2: "Does the new interface let me enter text faster than MS Word?". We call RQ2 ________ and RQ1 as _______.',
    questionType: 'single',
    options: [
      { id: 'a', text: 'testable, non-testable' },
      { id: 'b', text: 'alternative hypothesis, null hypothesis' }
    ],
    correctAnswer: 'a',
    explanation: 'RQ2 specifies an objective, measurable metric (speed of text entry), making it testable. RQ1 ("Is it good?") is subjective and undefined, making it non-testable.',
    difficulty: 'easy',
    sourcePdf: '2024 Design & Implementation of Human-Computer Interfaces - Complete Assignments PDF',
    sourcePage: 34,
    verificationStatus: 'verified'
  },
  {
    id: 'w11-q4',
    originalQuestionNumber: 4,
    week: 11,
    module: 'Unit 14: Empirical Usability Evaluation',
    topic: 'Null Hypothesis',
    questionText: 'When we form a hypothesis, essentially stating that the test condition is not going to affect the outcome (judgment). This hypothesis is called _________.',
    questionType: 'single',
    options: [
      { id: 'a', text: 'null hypothesis' },
      { id: 'b', text: 'alternative hypothesis' }
    ],
    correctAnswer: 'a',
    explanation: 'The null hypothesis (H0) assumes no significant difference exists between experimental conditions or treatments.',
    difficulty: 'easy',
    sourcePdf: '2024 Design & Implementation of Human-Computer Interfaces - Complete Assignments PDF',
    sourcePage: 34,
    verificationStatus: 'verified'
  },
  {
    id: 'w11-q5',
    originalQuestionNumber: 5,
    week: 11,
    module: 'Unit 14: Empirical Usability Evaluation',
    topic: 'Measurement Scales: Nominal',
    questionText: 'In _______, we assign some (arbitrary) codes to attributes of observational data.',
    questionType: 'single',
    options: [
      { id: 'a', text: 'nominal' },
      { id: 'b', text: 'ordinal' },
      { id: 'c', text: 'interval' },
      { id: 'd', text: 'ratio' }
    ],
    correctAnswer: 'a',
    explanation: 'Nominal scale data represents categories or labels with arbitrary numerical codes that do not imply order or quantitative distance (e.g., Male=1, Female=2).',
    difficulty: 'easy',
    sourcePdf: '2024 Design & Implementation of Human-Computer Interfaces - Complete Assignments PDF',
    sourcePage: 34,
    verificationStatus: 'verified'
  },
  {
    id: 'w11-q6',
    originalQuestionNumber: 6,
    week: 11,
    module: 'Unit 14: Empirical Usability Evaluation',
    topic: 'Measurement Scales: Interval',
    questionText: 'Recording data from a thermometer is an example of interval scaled data.',
    questionType: 'true_false',
    options: [
      { id: 'a', text: 'True' },
      { id: 'b', text: 'False' }
    ],
    correctAnswer: 'a',
    explanation: 'True. Celsius and Fahrenheit temperatures have ordered degrees with equal intervals, but no absolute meaningful zero point (0°C does not equal absence of heat).',
    difficulty: 'easy',
    sourcePdf: '2024 Design & Implementation of Human-Computer Interfaces - Complete Assignments PDF',
    sourcePage: 34,
    verificationStatus: 'verified'
  },
  {
    id: 'w11-q7',
    originalQuestionNumber: 7,
    week: 11,
    module: 'Unit 14: Empirical Usability Evaluation',
    topic: 'Confounding Variables',
    questionText: '__________ are variables that influence both the independent and dependent variables in a study, potentially leading to incorrect conclusions about the relationship between the two.',
    questionType: 'single',
    options: [
      { id: 'a', text: 'Dependant variables' },
      { id: 'b', text: 'Independent variables' },
      { id: 'c', text: 'Confounding variables' },
      { id: 'd', text: 'Control variables' }
    ],
    correctAnswer: 'c',
    explanation: 'Confounding variables are extraneous factors not accounted for that mask or falsely exaggerate the real relationship between independent and dependent variables.',
    difficulty: 'easy',
    sourcePdf: '2024 Design & Implementation of Human-Computer Interfaces - Complete Assignments PDF',
    sourcePage: 34,
    verificationStatus: 'verified'
  },
  {
    id: 'w11-q8',
    originalQuestionNumber: 8,
    week: 11,
    module: 'Unit 14: Empirical Usability Evaluation',
    topic: 'Pilot Study Sample Size',
    questionText: 'For any pilot study (or small-scale studies), 5 is probably a good number.',
    questionType: 'true_false',
    options: [
      { id: 'a', text: 'True' },
      { id: 'b', text: 'False' }
    ],
    correctAnswer: 'a',
    explanation: 'True. In usability testing literature, evaluating with 5 users uncovers around 80% of major interaction hurdles in preliminary/pilot studies.',
    difficulty: 'easy',
    sourcePdf: '2024 Design & Implementation of Human-Computer Interfaces - Complete Assignments PDF',
    sourcePage: 35,
    verificationStatus: 'verified'
  },
  {
    id: 'w11-q9',
    originalQuestionNumber: 9,
    week: 11,
    module: 'Unit 14: Empirical Usability Evaluation',
    topic: 'Formal Participant Sizing',
    questionText: 'To draw reliable conclusions from empirical data, we should use between _____ and _____ participants.',
    questionType: 'single',
    options: [
      { id: 'a', text: '1, 5' },
      { id: 'b', text: '2, 5' },
      { id: 'c', text: '12, 25' },
      { id: 'd', text: '10, 12' }
    ],
    correctAnswer: 'c',
    explanation: 'For formal quantitative and statistical hypothesis testing in HCI, sample sizes between 12 and 25 participants provide appropriate statistical power.',
    difficulty: 'easy',
    sourcePdf: '2024 Design & Implementation of Human-Computer Interfaces - Complete Assignments PDF',
    sourcePage: 35,
    verificationStatus: 'verified'
  },
  {
    id: 'w11-q10',
    originalQuestionNumber: 10,
    week: 11,
    module: 'Unit 14: Empirical Usability Evaluation',
    topic: 'Between-Subject Study Design',
    questionText: 'When we distribute the tasks to participants such that separate groups test different conditions, we call the study as __________.',
    questionType: 'single',
    options: [
      { id: 'a', text: 'between-subject' },
      { id: 'b', text: 'within-subject' },
      { id: 'c', text: 'uni-subject' },
      { id: 'd', text: 'center-subject' }
    ],
    correctAnswer: 'a',
    explanation: 'In a between-subjects experimental design, each participant tests only one interface condition, preventing transfer/learning effects between conditions.',
    difficulty: 'easy',
    sourcePdf: '2024 Design & Implementation of Human-Computer Interfaces - Complete Assignments PDF',
    sourcePage: 35,
    verificationStatus: 'verified'
  },

  // ==================== WEEK 12 ====================
  {
    id: 'w12-q1',
    originalQuestionNumber: 1,
    week: 12,
    module: 'Unit 15: Conclusion',
    topic: 'Significance Testing',
    questionText: 'With the significance test, we try to _______ the null hypothesis.',
    questionType: 'single',
    options: [
      { id: 'a', text: 'Accept' },
      { id: 'b', text: 'Refute' }
    ],
    correctAnswer: 'b',
    explanation: 'Hypothesis testing seeks to reject or refute the null hypothesis in favor of the alternative hypothesis based on observed p-values.',
    difficulty: 'easy',
    sourcePdf: '2024 Design & Implementation of Human-Computer Interfaces - Complete Assignments PDF',
    sourcePage: 36,
    verificationStatus: 'verified'
  },
  {
    id: 'w12-q2',
    originalQuestionNumber: 2,
    week: 12,
    module: 'Unit 15: Conclusion',
    topic: 'Type I Error',
    questionText: 'Type I error is also known as __________.',
    questionType: 'single',
    options: [
      { id: 'a', text: 'False positive' },
      { id: 'b', text: 'False negative' },
      { id: 'c', text: 'True positive' },
      { id: 'd', text: 'True negative' }
    ],
    correctAnswer: 'a',
    explanation: 'A Type I error is rejecting a null hypothesis that is actually true (a false positive finding).',
    difficulty: 'easy',
    sourcePdf: '2024 Design & Implementation of Human-Computer Interfaces - Complete Assignments PDF',
    sourcePage: 36,
    verificationStatus: 'verified'
  },
  {
    id: 'w12-q3',
    originalQuestionNumber: 3,
    week: 12,
    module: 'Unit 15: Conclusion',
    topic: 'Statistical Tests Scope',
    questionText: 't-statistic is the ONLY way to test for statistical significance.',
    questionType: 'true_false',
    options: [
      { id: 'a', text: 'True' },
      { id: 'b', text: 'False' }
    ],
    correctAnswer: 'b',
    explanation: 'False. Multiple statistical tests exist, including ANOVA, Mann-Whitney U, Wilcoxon signed-rank, Chi-Square, and Kruskal-Wallis.',
    difficulty: 'easy',
    sourcePdf: '2024 Design & Implementation of Human-Computer Interfaces - Complete Assignments PDF',
    sourcePage: 36,
    verificationStatus: 'verified'
  },
  {
    id: 'w12-q4',
    originalQuestionNumber: 4,
    week: 12,
    module: 'Unit 15: Conclusion',
    topic: 'Statistical Test Types',
    questionText: 'There are broadly two categories of techniques for significance testing: ______ and _______.',
    questionType: 'single',
    options: [
      { id: 'a', text: 'Parametric and Non-parametric' },
      { id: 'b', text: 't-test and non t-test' }
    ],
    correctAnswer: 'a',
    explanation: 'Significance tests are divided into Parametric tests (which assume a normal distribution and interval/ratio data) and Non-parametric tests (distribution-free).',
    difficulty: 'easy',
    sourcePdf: '2024 Design & Implementation of Human-Computer Interfaces - Complete Assignments PDF',
    sourcePage: 37,
    verificationStatus: 'verified'
  },
  {
    id: 'w12-q5',
    originalQuestionNumber: 5,
    week: 12,
    module: 'Unit 15: Conclusion',
    topic: 'Project Planning Dimensions',
    questionText: 'Project planning involves estimation of Project size, Cost, Duration and Effort.',
    questionType: 'true_false',
    options: [
      { id: 'a', text: 'True' },
      { id: 'b', text: 'False' }
    ],
    correctAnswer: 'a',
    explanation: 'True. Core software project planning centers on accurately predicting product size, total financial cost, calendar duration, and human effort.',
    difficulty: 'easy',
    sourcePdf: '2024 Design & Implementation of Human-Computer Interfaces - Complete Assignments PDF',
    sourcePage: 37,
    verificationStatus: 'verified'
  },
  {
    id: 'w12-q6',
    originalQuestionNumber: 6,
    week: 12,
    module: 'Unit 15: Conclusion',
    topic: 'COCOMO Acronym',
    questionText: 'COCOMO stands for ________.',
    questionType: 'single',
    options: [
      { id: 'a', text: 'Conducive Cost Estimation Model' },
      { id: 'b', text: 'Constructive Cost Estimation Model' },
      { id: 'c', text: 'Constructive Category Estimation Model' },
      { id: 'd', text: 'Conducive Category Estimation Model' }
    ],
    correctAnswer: 'b',
    explanation: 'COCOMO stands for Constructive Cost Estimation Model (or Constructive Cost Model), introduced by Barry Boehm.',
    difficulty: 'easy',
    sourcePdf: '2024 Design & Implementation of Human-Computer Interfaces - Complete Assignments PDF',
    sourcePage: 37,
    verificationStatus: 'verified'
  },
  {
    id: 'w12-q7',
    originalQuestionNumber: 7,
    week: 12,
    module: 'Unit 15: Conclusion',
    topic: 'COCOMO Stages',
    questionText: 'According to Boehm, software cost estimation should be done through ________ stages.',
    questionType: 'single',
    options: [
      { id: 'a', text: 'Two' },
      { id: 'b', text: 'Three' },
      { id: 'c', text: 'Four' },
      { id: 'd', text: 'Five' }
    ],
    correctAnswer: 'b',
    explanation: 'Boehm formulated COCOMO across 3 hierarchy stages of increasing depth: Basic COCOMO, Intermediate COCOMO, and Detailed COCOMO.',
    difficulty: 'easy',
    sourcePdf: '2024 Design & Implementation of Human-Computer Interfaces - Complete Assignments PDF',
    sourcePage: 37,
    verificationStatus: 'verified'
  },
  {
    id: 'w12-q8',
    originalQuestionNumber: 8,
    week: 12,
    module: 'Unit 15: Conclusion',
    topic: 'Agile Development',
    questionText: 'Agile development ensures quick turn-around of projects.',
    questionType: 'true_false',
    options: [
      { id: 'a', text: 'True' },
      { id: 'b', text: 'False' }
    ],
    correctAnswer: 'a',
    explanation: 'True. Working in short sprint iterations enables teams to deliver shippable increments rapidly and respond adaptively to feedback.',
    difficulty: 'easy',
    sourcePdf: '2024 Design & Implementation of Human-Computer Interfaces - Complete Assignments PDF',
    sourcePage: 37,
    verificationStatus: 'verified'
  },
  {
    id: 'w12-q9',
    originalQuestionNumber: 9,
    week: 12,
    module: 'Unit 15: Conclusion',
    topic: 'Scrum Classification',
    questionText: 'Scrum is a _______ method.',
    questionType: 'single',
    options: [
      { id: 'a', text: 'Traditional SDLC' },
      { id: 'b', text: 'Agile' }
    ],
    correctAnswer: 'b',
    explanation: 'Scrum is a leading Agile management framework centered around sprint backlogs, standups, and retrospective reviews.',
    difficulty: 'easy',
    sourcePdf: '2024 Design & Implementation of Human-Computer Interfaces - Complete Assignments PDF',
    sourcePage: 38,
    verificationStatus: 'verified'
  },
  {
    id: 'w12-q10',
    originalQuestionNumber: 10,
    week: 12,
    module: 'Unit 15: Conclusion',
    topic: 'Gantt Chart Representation',
    questionText: 'In a Gantt chart the length of a bar is proportional to _______ for an activity.',
    questionType: 'single',
    options: [
      { id: 'a', text: 'duration planned' },
      { id: 'b', text: 'effort' },
      { id: 'c', text: 'cost' }
    ],
    correctAnswer: 'a',
    explanation: 'In Gantt charts, the horizontal axis represents calendar time; each task bar length corresponds directly to planned duration.',
    difficulty: 'easy',
    sourcePdf: '2024 Design & Implementation of Human-Computer Interfaces - Complete Assignments PDF',
    sourcePage: 38,
    verificationStatus: 'verified'
  }
];
