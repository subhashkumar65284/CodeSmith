import { TerminalSquare, CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";

function VisibleCases({ problem, runResult, loadingRun }) {
    const [activeTab, setActiveTab] = useState("testcases");
    const [selectedCase, setSelectedCase] = useState(0);

    useEffect(() => {
        if (loadingRun) {
            setActiveTab("testresults");
            setSelectedCase(0);
        } else if (runResult && runResult.length > 0) {
            setActiveTab("testresults");
            setSelectedCase(0);
        }
    }, [runResult, loadingRun]);

    const getStatusInfo = (res) => {
        if (res.exception) return { type: "error", label: "Runtime Error", color: "text-rose-500", bg: "bg-rose-500/10", border: "border-rose-500/20", icon: AlertCircle };
        if (res.stderr) {
            if (res.stderr.toLowerCase().includes("wrong answer") || res.stderr.toLowerCase().includes("expected")) {
                return { type: "wrong", label: "Wrong Answer", color: "text-rose-500", bg: "bg-rose-500/10", border: "border-rose-500/20", icon: XCircle };
            }
            return { type: "error", label: "Error", color: "text-amber-500", bg: "bg-amber-500/10", border: "border-amber-500/20", icon: AlertCircle };
        }
        return { type: "success", label: "Accepted", color: "text-emerald-500", bg: "bg-emerald-500/10", border: "border-emerald-500/20", icon: CheckCircle2 };
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setSelectedCase(0);
    };

    return (
        <div className="h-[40%] flex flex-col font-sans bg-[#0B1121] z-20 border-t border-slate-700/50">
            {/* Top Tabs */}
            <div className="flex shrink-0 border-b border-slate-700/50 px-4 pt-2">
                <button
                    onClick={() => handleTabChange("testcases")}
                    className={`px-6 py-3 text-sm font-medium transition-colors rounded-t-lg flex items-center gap-2 ${
                        activeTab === "testcases"
                            ? "text-white bg-slate-800/50 border-b-2 border-emerald-500"
                            : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/30"
                    }`}
                >
                    <TerminalSquare className="w-4 h-4" />
                    Test Cases
                </button>
                {(loadingRun || (runResult && runResult.length > 0)) && (
                    <button
                        onClick={() => handleTabChange("testresults")}
                        className={`px-6 py-3 text-sm font-medium transition-colors rounded-t-lg flex items-center gap-2 ${
                            activeTab === "testresults"
                                ? "text-white bg-slate-800/50 border-b-2 border-emerald-500"
                                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/30"
                        }`}
                    >
                        <AlertCircle className="w-4 h-4" />
                        Test Results
                    </button>
                )}
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col overflow-hidden bg-[#0B1121]">
                {activeTab === "testcases" && (
                    <>
                        {problem.visibleTestCases && problem.visibleTestCases.length > 0 ? (
                            <>
                                {/* Pills Header - Always Visible */}
                                <div className="flex-shrink-0 px-4 pt-4 pb-2 bg-[#0B1121] z-10 border-b border-slate-800/50">
                                    <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
                                        {problem.visibleTestCases.map((_, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => setSelectedCase(idx)}
                                                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 border ${
                                                    selectedCase === idx
                                                        ? `bg-slate-800 shadow-sm border-slate-600 text-slate-100`
                                                        : `bg-slate-900/50 border-slate-800/50 text-slate-400 hover:bg-slate-800 hover:text-slate-300`
                                                }`}
                                            >
                                                <div className={`w-1.5 h-1.5 rounded-full ${selectedCase === idx ? 'bg-slate-400' : 'bg-slate-600'}`}></div>
                                                Case {idx + 1}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                
                                {/* Scrollable Input/Output */}
                                <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                                    <div className="bg-[#1E293B] rounded-xl p-4 border border-slate-700/50 shadow-inner">
                                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">Input:</span>
                                        <pre className="font-mono text-sm text-slate-200 whitespace-pre-wrap bg-[#0F172A] p-3 rounded-lg border border-slate-800">{problem.visibleTestCases[selectedCase]?.input}</pre>
                                    </div>
                                    <div className="bg-[#1E293B] rounded-xl p-4 border border-slate-700/50 shadow-inner">
                                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">Expected Output:</span>
                                        <pre className="font-mono text-sm text-emerald-400 whitespace-pre-wrap bg-[#0F172A] p-3 rounded-lg border border-slate-800">{problem.visibleTestCases[selectedCase]?.output}</pre>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="flex-1 flex items-center justify-center text-slate-500 italic p-4">
                                No visible test cases provided.
                            </div>
                        )}
                    </>
                )}

                {activeTab === "testresults" && (
                    <>
                        {loadingRun ? (
                            <div className="flex-1 flex flex-col items-center justify-center text-slate-400 space-y-5 py-10">
                                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-500"></div>
                                <p className="animate-pulse text-sm font-medium tracking-wide">Executing Code...</p>
                            </div>
                        ) : runResult && runResult.length > 0 ? (
                            <>
                                {/* Pills Header - Always Visible */}
                                <div className="flex-shrink-0 px-4 pt-4 pb-2 bg-[#0B1121] z-10 border-b border-slate-800/50">
                                    <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
                                        {runResult.map((res, idx) => {
                                            const statusInfo = getStatusInfo(res);
                                            const Icon = statusInfo.icon;
                                            return (
                                                <button
                                                    key={idx}
                                                    onClick={() => setSelectedCase(idx)}
                                                    className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 border ${
                                                        selectedCase === idx
                                                            ? `bg-slate-800 shadow-sm border-slate-600 text-slate-100`
                                                            : `bg-slate-900/50 border-slate-800/50 text-slate-400 hover:bg-slate-800 hover:text-slate-300`
                                                    }`}
                                                >
                                                    <Icon className={`w-3.5 h-3.5 ${statusInfo.color}`} />
                                                    Case {idx + 1}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                                
                                {/* Scrollable Results Details */}
                                <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                                    {(() => {
                                        const currentResult = runResult[selectedCase];
                                        if (!currentResult) return null;
                                        const statusInfo = getStatusInfo(currentResult);
                                        
                                        return (
                                            <div className="space-y-4 pb-4">
                                                <div className={`px-4 py-3 rounded-xl border flex items-center gap-3 ${statusInfo.bg} ${statusInfo.border}`}>
                                                    <statusInfo.icon className={`w-5 h-5 ${statusInfo.color}`} />
                                                    <div>
                                                        <h4 className={`text-sm font-bold ${statusInfo.color}`}>{statusInfo.label}</h4>
                                                        <div className="flex items-center gap-4 mt-1 text-xs text-slate-400 font-mono">
                                                            <span>Runtime: {currentResult.executionTime} ms</span>
                                                            <span>Memory: {currentResult.memoryUsed} KB</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="space-y-4">
                                                    <div className="bg-[#1E293B] rounded-xl p-4 border border-slate-700/50 shadow-inner">
                                                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">Input:</span>
                                                        <pre className="font-mono text-sm text-slate-200 whitespace-pre-wrap bg-[#0F172A] p-3 rounded-lg border border-slate-800">{currentResult.stdin}</pre>
                                                    </div>

                                                    <div className="bg-[#1E293B] rounded-xl p-4 border border-slate-700/50 shadow-inner">
                                                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">Output:</span>
                                                        <pre className="font-mono text-sm text-slate-300 whitespace-pre-wrap bg-[#0F172A] p-3 rounded-lg border border-slate-800">{currentResult.stdout || <span className="text-slate-600 italic">No output</span>}</pre>
                                                    </div>

                                                    {currentResult.stderr && (
                                                        <div className="bg-[#1E293B] rounded-xl p-4 border border-slate-700/50 shadow-inner">
                                                            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">Details:</span>
                                                            <pre className={`font-mono text-sm whitespace-pre-wrap bg-[#0F172A] p-3 rounded-lg border border-slate-800 ${currentResult.stderr.toLowerCase().includes('wrong answer') || currentResult.stderr.toLowerCase().includes('expected') ? 'text-amber-400' : 'text-rose-400'}`}>
                                                                {currentResult.stderr}
                                                            </pre>
                                                        </div>
                                                    )}

                                                    {currentResult.exception && (
                                                        <div className="bg-[#1E293B] rounded-xl p-4 border border-slate-700/50 shadow-inner">
                                                            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">Exception:</span>
                                                            <pre className="font-mono text-sm text-rose-400 whitespace-pre-wrap bg-[#0F172A] p-3 rounded-lg border border-slate-800">{currentResult.exception}</pre>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })()}
                                </div>
                            </>
                        ) : null}
                    </>
                )}
            </div>
        </div>
    );
}

export default VisibleCases;
