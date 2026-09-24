import { TerminalSquare } from "lucide-react"

function VisibleCases({problem}){
    return(
        <>
                        <div className="h-[40%] border-t border-slate-700/50 bg-[#0B1121] flex flex-col">
                            <div className="px-6 py-3 border-b border-slate-700/50 bg-[#0F172A] flex items-center gap-2">
                                <TerminalSquare className="w-4 h-4 text-slate-400" />
                                <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wider">Test Cases</h3>
                            </div>
                            <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
                                {problem.visibleTestCases && problem.visibleTestCases.length > 0 ? (
                                    <div className="space-y-6">
                                        {problem.visibleTestCases.map((tc, index) => (
                                            <div key={index} className="space-y-3">
                                                <h4 className="text-sm font-medium text-slate-400">Case {index + 1}</h4>
                                                <div className="bg-[#1E293B] rounded-lg p-4 border border-slate-700/50 shadow-inner">
                                                    <div className="mb-3">
                                                        <span className="text-xs font-semibold text-slate-500 uppercase block mb-1">Input:</span>
                                                        <pre className="font-mono text-sm text-slate-200 whitespace-pre-wrap">{tc.input}</pre>
                                                    </div>
                                                    <div>
                                                        <span className="text-xs font-semibold text-slate-500 uppercase block mb-1">Output:</span>
                                                        <pre className="font-mono text-sm text-emerald-400 whitespace-pre-wrap">{tc.output}</pre>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center h-full text-slate-500 italic">
                                        No visible test cases provided.
                                    </div>
                                )}
                            </div>
                        </div>
        </>
    )
}

export default VisibleCases