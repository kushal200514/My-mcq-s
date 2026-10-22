import { Question } from '../types';
import rawMegaQuestions from './mega_questions.json';

export const MEGA_QUESTIONS: Question[] = rawMegaQuestions as Question[];

export const MEGA_WEEKS_STATS = [
  { week: 1, count: 300, title: "Introduction to Interactive Systems", module: "Week 1: Introduction", pages: "1-100" },
  { week: 2, count: 150, title: "Usability Requirements & Contextual Inquiry", module: "Week 2: Usability Requirements", pages: "101-150" },
  { week: 3, count: 200, title: "Interface Design & Shneiderman 8 Rules", module: "Week 3: Interface Design", pages: "151-217" },
  { week: 4, count: 150, title: "Interaction Models & Prototyping", module: "Week 4: Interaction Models", pages: "218-267" },
  { week: 5, count: 200, title: "Rapid Usability Evaluation", module: "Week 5: Rapid Evaluation", pages: "268-334" },
  { week: 6, count: 200, title: "Converting Design to System: DFD & ERD", module: "Week 6: System Design", pages: "335-401" },
  { week: 7, count: 150, title: "Object-Oriented Design & UML", module: "Week 7: OOD & UML", pages: "402-451" },
  { week: 8, count: 200, title: "System Implementation & Code Review", module: "Week 8: Implementation", pages: "452-518" },
  { week: 9, count: 150, title: "System Implementation: Black-Box Testing", module: "Week 9: Black-Box Testing", pages: "519-568" },
  { week: 10, count: 200, title: "White-Box Testing & Program Flow", module: "Week 10: White-Box Testing", pages: "569-635" },
  { week: 11, count: 150, title: "Empirical Usability Evaluation", module: "Week 11: Empirical Usability", pages: "636-685" },
  { week: 12, count: 200, title: "Empirical Data Analysis & Project Management", module: "Week 12: Data Analysis", pages: "686-752" }
];
