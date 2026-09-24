import { useState, useEffect } from 'react';
import axiosClient from '../utils/axiosClient';

function ProblemDesc({problem}){
    const [activeTab, setActiveTab] = useState('description');
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (activeTab === 'submissions' && problem?._id) {
            setLoading(true);
            setError(null);
            axiosClient.get(`/user/problem/submissions/${problem._id}`)
                .then(res => {
                    setSubmissions(res.data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error(err);
                    setError(err.response?.data?.message || 'Failed to fetch submissions');
                    setLoading(false);
                });
        }
    }, [activeTab, problem?._id]);

    return (
        <div className="flex-1 flex flex-col h-full overflow-hidden">
            <div className="flex border-b border-slate-700/50 px-4 pt-2">
                <button
                    onClick={() => setActiveTab('description')}
                    className={`px-6 py-3 text-sm font-medium transition-colors rounded-t-lg ${
                        activeTab === 'description' 
                        ? 'text-white bg-slate-800/50 border-b-2 border-emerald-500' 
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/30'
                    }`}
                >
                    Description
                </button>
                <button
                    onClick={() => setActiveTab('submissions')}
                    className={`px-6 py-3 text-sm font-medium transition-colors rounded-t-lg ${
                        activeTab === 'submissions' 
                        ? 'text-white bg-slate-800/50 border-b-2 border-emerald-500' 
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/30'
                    }`}
                >
                    Submissions
                </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                {activeTab === 'description' ? (
                    <>
                        <div className="mb-6 flex items-center justify-between">
                            <h1 className="text-3xl font-bold text-white tracking-tight">{problem?.title}</h1>
                        </div>
                        
                        <div className="mb-8 flex flex-wrap gap-3 items-center">
                            {problem?.difficulty && (
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${
                                    problem.difficulty.toLowerCase() === 'easy' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                                    problem.difficulty.toLowerCase() === 'medium' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                                    'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                                }`}>
                                    {problem.difficulty}
                                </span>
                            )}
                            
                            {Array.isArray(problem?.topics) ? problem.topics.map((topic, idx) => (
                                <span key={idx} className="px-3 py-1 rounded-full text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700/50">
                                    {topic}
                                </span>
                            )) : typeof problem?.topics === 'string' && problem.topics.split(',').map((topic, idx) => (
                                <span key={idx} className="px-3 py-1 rounded-full text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700/50">
                                    {topic.trim()}
                                </span>
                            ))}
                        </div>

                        <div className="prose prose-invert prose-slate max-w-none text-slate-300 leading-relaxed tracking-wide">
                            {problem?.description ? (
                                <div dangerouslySetInnerHTML={{ __html: problem.description }} />
                            ) : (
                                <p className="italic text-slate-500">No description provided.</p>
                            )}
                        </div>
                    </>
                ) : (
                    <div className="text-slate-300">
                        <h2 className="text-2xl font-bold text-white mb-6">Past Submissions</h2>
                        {loading ? (
                            <div className="flex justify-center items-center py-10">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
                            </div>
                        ) : error ? (
                            <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 px-4 py-3 rounded-lg">
                                {error}
                            </div>
                        ) : submissions.length === 0 ? (
                            <div className="bg-slate-800/30 border border-slate-700/50 text-slate-400 px-4 py-8 rounded-lg text-center">
                                No submissions found for this problem.
                            </div>
                        ) : (
                            <div className="overflow-x-auto rounded-lg border border-slate-700/50">
                                <table className="w-full text-left border-collapse">
                                    <thead className="bg-slate-800/80">
                                        <tr className="border-b border-slate-700/50 text-slate-400 text-sm uppercase tracking-wider">
                                            <th className="py-4 px-6 font-medium">Status</th>
                                            <th className="py-4 px-6 font-medium">Language</th>
                                            <th className="py-4 px-6 font-medium">Runtime</th>
                                            <th className="py-4 px-6 font-medium">Memory</th>
                                            <th className="py-4 px-6 font-medium">Testcases</th>
                                            <th className="py-4 px-6 font-medium">Time</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-sm divide-y divide-slate-700/50 bg-slate-800/30">
                                        {submissions.map((sub, idx) => (
                                            <tr key={idx} className="hover:bg-slate-800/50 transition-colors">
                                                <td className="py-4 px-6">
                                                    <span className={`inline-flex items-center gap-1.5 font-semibold ${
                                                        sub.status === 'accepted' ? 'text-emerald-400' :
                                                        sub.status === 'pending' ? 'text-amber-400' :
                                                        'text-rose-400'
                                                    }`}>
                                                        {sub.status === 'accepted' && (
                                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                            </svg>
                                                        )}
                                                        {sub.status === 'failed' && (
                                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                            </svg>
                                                        )}
                                                        {sub.status === 'pending' && (
                                                            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                                            </svg>
                                                        )}
                                                        {sub.status.charAt(0).toUpperCase() + sub.status.slice(1)}
                                                    </span>
                                                    {sub.errMessage && sub.status === 'failed' && (
                                                        <p className="text-xs text-rose-500 mt-1 truncate max-w-[200px]" title={sub.errMessage}>
                                                            {sub.errMessage}
                                                        </p>
                                                    )}
                                                </td>
                                                <td className="py-4 px-6 capitalize font-medium text-slate-300">{sub.language}</td>
                                                <td className="py-4 px-6 font-mono text-slate-400">{sub.runtime} ms</td>
                                                <td className="py-4 px-6 font-mono text-slate-400">{sub.memory} KB</td>
                                                <td className="py-4 px-6">
                                                    <div className="flex items-center gap-2">
                                                        <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden w-20">
                                                            <div 
                                                                className={`h-full ${sub.status === 'accepted' ? 'bg-emerald-500' : 'bg-rose-500'}`}
                                                                style={{ width: `${(sub.testcasesPassed / Math.max(sub.totalTestcases, 1)) * 100}%` }}
                                                            ></div>
                                                        </div>
                                                        <span className="text-xs font-mono text-slate-400">{sub.testcasesPassed}/{sub.totalTestcases}</span>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-6 text-slate-500 whitespace-nowrap">
                                                    {new Date(sub.createdAt).toLocaleDateString()} {new Date(sub.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default ProblemDesc