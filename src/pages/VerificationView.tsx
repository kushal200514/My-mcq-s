import React, { useState } from 'react';
import { 
  FileCheck, 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  Search, 
  Edit3, 
  Save, 
  X, 
  Upload, 
  Download, 
  Database,
  ExternalLink,
  PlusCircle,
  Filter
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Question, VerificationStatus } from '../types';

export const VerificationView: React.FC = () => {
  const { questions, updateQuestion, addQuestions } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWeek, setSelectedWeek] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);

  // Import modal states
  const [showImportModal, setShowImportModal] = useState(false);
  const [importJsonText, setImportJsonText] = useState('');
  const [importMessage, setImportMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Source PDFs metadata summary
  const SOURCE_DOCUMENTS = [
    {
      name: '2024 Design & Implementation of Human-Computer Interfaces - Complete Assignments PDF',
      pages: 38,
      source: 'Swayam NPTEL Student Assessment Submissions',
      coverage: 'Weeks 1 to 12 Assignments',
      extractedCount: questions.filter(q => q.sourcePdf.includes('2024 Design')).length
    },
    {
      name: 'Assignment Detailed Solution - IIT Guwahati',
      pages: 27,
      source: 'IIT Guwahati Official Faculty Detailed Solutions',
      coverage: 'Weeks 1 to 12 Solutions & Rationale',
      extractedCount: questions.filter(q => q.sourcePdf.includes('IIT Guwahati')).length
    },
    {
      name: 'Design and Implementation of human computer interaction all assignments 2025',
      pages: 27,
      source: 'NPTEL 2025 Comprehensive Assignment Question Bank',
      coverage: 'Curriculum variants and alternative questions',
      extractedCount: questions.filter(q => q.sourcePdf.includes('2025')).length
    }
  ];

  const totalExtracted = questions.length;
  const verifiedCount = questions.filter(q => q.verificationStatus === 'verified').length;
  const dualAcceptedCount = questions.filter(q => q.verificationStatus === 'dual_accepted').length;
  const needsReviewCount = questions.filter(q => q.verificationStatus === 'needs_review').length;

  // Filter questions for the audit table
  const filteredQuestions = questions.filter(q => {
    if (selectedWeek !== 'all' && q.week !== parseInt(selectedWeek, 10)) return false;
    if (selectedStatus !== 'all' && q.verificationStatus !== selectedStatus) return false;
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      const matchText = q.questionText.toLowerCase().includes(query);
      const matchSource = q.sourcePdf.toLowerCase().includes(query);
      const matchTopic = q.topic.toLowerCase().includes(query);
      if (!matchText && !matchSource && !matchTopic) return false;
    }
    return true;
  });

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingQuestion) {
      updateQuestion(editingQuestion);
      setEditingQuestion(null);
    }
  };

  const handleImportJson = () => {
    try {
      const parsed = JSON.parse(importJsonText);
      const newItems: Question[] = Array.isArray(parsed) ? parsed : (parsed.questions || []);

      if (newItems.length === 0) {
        setImportMessage({ type: 'error', text: 'No question objects found in JSON array.' });
        return;
      }

      // Validate required fields
      const valid = newItems.filter(item => item.id && item.questionText && item.options && item.correctAnswer);
      if (valid.length === 0) {
        setImportMessage({ type: 'error', text: 'Supplied items lack required fields (id, questionText, options, correctAnswer).' });
        return;
      }

      addQuestions(valid);
      setImportMessage({ type: 'success', text: `Successfully imported ${valid.length} new question(s)!` });
      setImportJsonText('');
      setTimeout(() => setShowImportModal(false), 1500);
    } catch (err: unknown) {
      setImportMessage({ type: 'error', text: `JSON Parse error: ${err instanceof Error ? err.message : 'Invalid JSON'}` });
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-16">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            Source PDF Verification & Traceability
          </h2>
          <p className="text-sm text-slate-400 mt-0.5">
            Compare extracted question bank against source documents and manage verification audits
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => { setShowImportModal(true); setImportMessage(null); }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-xs transition-colors shadow-md shadow-brand-600/20"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Import New Questions</span>
          </button>
        </div>
      </div>

      {/* Extraction Statistics Overview */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Total PDFs Processed</div>
          <div className="text-3xl font-extrabold font-mono text-white">3</div>
          <div className="text-[11px] text-slate-500 mt-1">92 source pages audited</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Questions Extracted</div>
          <div className="text-3xl font-extrabold font-mono text-brand-400">{totalExtracted}</div>
          <div className="text-[11px] text-slate-500 mt-1">Across 12 Weeks</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Verified Accurate</div>
          <div className="text-3xl font-extrabold font-mono text-emerald-400">{verifiedCount}</div>
          <div className="text-[11px] text-emerald-500/80 mt-1">100% matched with keys</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Special Flagged</div>
          <div className="text-3xl font-extrabold font-mono text-amber-400">{dualAcceptedCount + needsReviewCount}</div>
          <div className="text-[11px] text-amber-500/80 mt-1">Dual-accepted key noted</div>
        </div>
      </div>

      {/* Source PDF Documents Breakdown */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
        <h3 className="text-base font-bold text-white">Audit of Source PDF Documents</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {SOURCE_DOCUMENTS.map((doc, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-brand-400 font-semibold text-xs">
                <FileText className="w-4 h-4" />
                <span>PDF #{idx + 1} ({doc.pages} Pages)</span>
              </div>
              <h4 className="text-sm font-bold text-white line-clamp-2">{doc.name}</h4>
              <p className="text-xs text-slate-400">{doc.source}</p>
              <div className="pt-2 flex items-center justify-between text-xs text-slate-500 border-t border-slate-800/80">
                <span>{doc.coverage}</span>
                <span className="font-mono text-brand-300 font-bold">{doc.extractedCount} items</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Live Question Bank Inspector Table */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-white">Question Bank Audit Table</h3>
            <p className="text-xs text-slate-400">Search and audit every question against original page numbers and correct answers</p>
          </div>

          <span className="text-xs text-slate-400 font-mono">
            Showing {filteredQuestions.length} of {questions.length} questions
          </span>
        </div>

        {/* Filter controls */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search text, topic, or PDF name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950/70 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-brand-500"
            />
          </div>

          <select
            value={selectedWeek}
            onChange={(e) => setSelectedWeek(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-950/70 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-brand-500"
          >
            <option value="all">All Weeks (1 to 12)</option>
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i + 1} value={i + 1}>Week {i + 1}</option>
            ))}
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-950/70 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-brand-500"
          >
            <option value="all">All Verification Statuses</option>
            <option value="verified">Verified Accurate</option>
            <option value="dual_accepted">Dual Accepted by NPTEL</option>
            <option value="needs_review">Needs Review</option>
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider font-semibold">
                <th className="pb-3 pl-2">Week / Q#</th>
                <th className="pb-3">Question Text</th>
                <th className="pb-3 text-center">Correct Answer</th>
                <th className="pb-3">Source PDF Reference</th>
                <th className="pb-3 text-center">Status</th>
                <th className="pb-3 text-right pr-2">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredQuestions.map((q) => (
                <tr key={q.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 pl-2 font-mono font-semibold text-brand-300 whitespace-nowrap">
                    W{q.week}-Q{q.originalQuestionNumber}
                  </td>
                  <td className="py-3 max-w-md">
                    <p className="font-medium text-slate-200 line-clamp-2">{q.questionText}</p>
                    <span className="text-[10px] text-slate-500">{q.topic}</span>
                  </td>
                  <td className="py-3 text-center font-mono font-bold text-emerald-400 uppercase">
                    {Array.isArray(q.correctAnswer) ? q.correctAnswer.join(', ') : q.correctAnswer}
                  </td>
                  <td className="py-3 text-slate-400 text-[11px]">
                    <span className="font-medium text-slate-300 block truncate max-w-xs">{q.sourcePdf}</span>
                    <span className="text-slate-500 font-mono">Page {q.sourcePage}</span>
                  </td>
                  <td className="py-3 text-center whitespace-nowrap">
                    {q.verificationStatus === 'verified' ? (
                      <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-semibold">
                        Verified
                      </span>
                    ) : q.verificationStatus === 'dual_accepted' ? (
                      <span className="px-2 py-0.5 rounded text-[10px] bg-amber-500/15 text-amber-300 border border-amber-500/30 font-semibold">
                        Dual Accepted
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded text-[10px] bg-rose-500/15 text-rose-300 border border-rose-500/30 font-semibold">
                        Review Needed
                      </span>
                    )}
                  </td>
                  <td className="py-3 text-right pr-2">
                    <button
                      onClick={() => setEditingQuestion({ ...q })}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
                      title="Edit question data"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* In-app Question Editor Modal */}
      {editingQuestion && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="max-w-2xl w-full p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl space-y-4 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-brand-400" />
                <span>Edit Question Details ({editingQuestion.id})</span>
              </h3>
              <button
                onClick={() => setEditingQuestion(null)}
                className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-400 font-semibold mb-1">Question Text</label>
                <textarea
                  value={editingQuestion.questionText}
                  onChange={(e) => setEditingQuestion({ ...editingQuestion, questionText: e.target.value })}
                  rows={3}
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-brand-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Topic</label>
                  <input
                    type="text"
                    value={editingQuestion.topic}
                    onChange={(e) => setEditingQuestion({ ...editingQuestion, topic: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-brand-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Correct Answer (e.g. 'a' or 'a, b')</label>
                  <input
                    type="text"
                    value={Array.isArray(editingQuestion.correctAnswer) ? editingQuestion.correctAnswer.join(', ') : editingQuestion.correctAnswer}
                    onChange={(e) => {
                      const val = e.target.value.trim();
                      if (val.includes(',')) {
                        setEditingQuestion({
                          ...editingQuestion,
                          correctAnswer: val.split(',').map(s => s.trim())
                        });
                      } else {
                        setEditingQuestion({
                          ...editingQuestion,
                          correctAnswer: val
                        });
                      }
                    }}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono text-xs focus:outline-none focus:border-brand-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Verification Status</label>
                <select
                  value={editingQuestion.verificationStatus}
                  onChange={(e) => setEditingQuestion({ ...editingQuestion, verificationStatus: e.target.value as VerificationStatus })}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-brand-500"
                >
                  <option value="verified">Verified Accurate</option>
                  <option value="dual_accepted">Dual Accepted in NPTEL</option>
                  <option value="needs_review">Needs Review</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Explanation & Rationale</label>
                <textarea
                  value={editingQuestion.explanation || ''}
                  onChange={(e) => setEditingQuestion({ ...editingQuestion, explanation: e.target.value })}
                  rows={3}
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-brand-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingQuestion(null)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold shadow-lg"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* JSON Import Modal */}
      {showImportModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-xl w-full p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Upload className="w-5 h-5 text-brand-400" />
                <span>Import Additional Questions (JSON)</span>
              </h3>
              <button
                onClick={() => setShowImportModal(false)}
                className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-400">
              Paste a JSON array of question objects adhering to the schema (id, questionText, week, options, correctAnswer, sourcePdf, sourcePage). Newly added questions will integrate immediately into the question bank and persist locally.
            </p>

            <textarea
              value={importJsonText}
              onChange={(e) => setImportJsonText(e.target.value)}
              placeholder='[ { "id": "w1-q11", "week": 1, "topic": "...", "questionText": "...", "options": [...], "correctAnswer": "a", "sourcePdf": "...", "sourcePage": 1 } ]'
              rows={8}
              className="w-full p-3 rounded-xl bg-slate-950 font-mono text-xs border border-slate-800 text-white focus:outline-none focus:border-brand-500"
            />

            {importMessage && (
              <div className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
                importMessage.type === 'success' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
              }`}>
                {importMessage.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                <span>{importMessage.text}</span>
              </div>
            )}

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowImportModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleImportJson}
                className="px-5 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold shadow-lg"
              >
                Validate & Import
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
