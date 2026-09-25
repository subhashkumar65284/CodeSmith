import { useState, useEffect } from "react";
import axiosClient from "../utils/axiosClient";

function ProblemDesc({ problem, submitResult, loadingSubmit }) {
  const [activeTab, setActiveTab] = useState("description");
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (loadingSubmit) {
      setActiveTab("result");
    } else if (submitResult) {
      setActiveTab("result");
    }
    async function fetchSubmissions() {
        setLoading(true);
        try{
            const response = await axiosClient.get(`user/problem/submissions/${problem._id}`);
            setSubmissions(response.data);
            setLoading(false)
        }catch(err){
            setError(err);
        }
    }
    fetchSubmissions();
  }, [submitResult, loadingSubmit]);

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      <div className="flex border-b border-slate-700/50 px-4 pt-2">
        <button
          onClick={() => setActiveTab("description")}
          className={`px-6 py-3 text-sm font-medium transition-colors rounded-t-lg ${
            activeTab === "description"
              ? "text-white bg-slate-800/50 border-b-2 border-emerald-500"
              : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/30"
          }`}
        >
          Description
        </button>
        <button
          onClick={() => setActiveTab("submissions")}
          className={`px-6 py-3 text-sm font-medium transition-colors rounded-t-lg ${
            activeTab === "submissions"
              ? "text-white bg-slate-800/50 border-b-2 border-emerald-500"
              : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/30"
          }`}
        >
          Submissions
        </button>

        {(loadingSubmit || submitResult !== null) && (
          <button
            onClick={() => setActiveTab("result")}
            className={`px-6 py-3 text-sm font-medium transition-colors rounded-t-lg ${
              activeTab === "result"
                ? "text-white bg-slate-800/50 border-b-2 border-emerald-500"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/30"
            }`}
          >
            Result
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
        {activeTab === "description" && (
          <>
            <div className="mb-6 flex items-center justify-between">
              <h1 className="text-3xl font-bold text-white tracking-tight">
                {problem?.title}
              </h1>
            </div>

            <div className="mb-8 flex flex-wrap gap-3 items-center">
              {problem?.difficulty && (
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${
                    problem.difficulty.toLowerCase() === "easy"
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                      : problem.difficulty.toLowerCase() === "medium"
                        ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                        : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                  }`}
                >
                  {problem.difficulty}
                </span>
              )}

              {Array.isArray(problem?.topics)
                ? problem.topics.map((topic, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700/50"
                    >
                      {topic}
                    </span>
                  ))
                : typeof problem?.topics === "string" &&
                  problem.topics.split(",").map((topic, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700/50"
                    >
                      {topic.trim()}
                    </span>
                  ))}
            </div>

            <div className="prose prose-invert prose-slate max-w-none text-slate-300 leading-relaxed tracking-wide">
              {problem?.description ? (
                <div
                  dangerouslySetInnerHTML={{ __html: problem.description }}
                />
              ) : (
                <p className="italic text-slate-500">
                  No description provided.
                </p>
              )}
            </div>
          </>
        )}

        {activeTab === "submissions" && (
          <div className="text-slate-300">
            <h2 className="text-2xl font-bold text-white mb-6">
              Past Submissions
            </h2>
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
                      <tr
                        key={idx}
                        className="hover:bg-slate-800/50 transition-colors"
                      >
                        <td className="py-4 px-6">
                          <span
                            className={`inline-flex items-center gap-1.5 font-semibold ${
                              sub.status === "accepted"
                                ? "text-emerald-400"
                                : sub.status === "pending"
                                  ? "text-amber-400"
                                  : "text-rose-400"
                            }`}
                          >
                            {sub.status === "accepted" && (
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            )}
                            {sub.status === "failed" && (
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                            )}
                            {sub.status === "pending" && (
                              <svg
                                className="w-4 h-4 animate-spin"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                />
                              </svg>
                            )}
                            {sub.status.charAt(0).toUpperCase() +
                              sub.status.slice(1)}
                          </span>
                          {sub.errMessage && sub.status === "failed" && (
                            <p
                              className="text-xs text-rose-500 mt-1 truncate max-w-[200px]"
                              title={sub.errMessage}
                            >
                              {sub.errMessage}
                            </p>
                          )}
                        </td>
                        <td className="py-4 px-6 capitalize font-medium text-slate-300">
                          {sub.language}
                        </td>
                        <td className="py-4 px-6 font-mono text-slate-400">
                          {sub.runtime} ms
                        </td>
                        <td className="py-4 px-6 font-mono text-slate-400">
                          {sub.memory} KB
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden w-20">
                              <div
                                className={`h-full ${sub.status === "accepted" ? "bg-emerald-500" : "bg-rose-500"}`}
                                style={{
                                  width: `${(sub.testcasesPassed / Math.max(sub.totalTestcases, 1)) * 100}%`,
                                }}
                              ></div>
                            </div>
                            <span className="text-xs font-mono text-slate-400">
                              {sub.testcasesPassed}/{sub.totalTestcases}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-slate-500 whitespace-nowrap">
                          {new Date(sub.createdAt).toLocaleDateString()}{" "}
                          {new Date(sub.createdAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeTab === "result" && (
          <div className="text-slate-300 h-full">
            {loadingSubmit ? (
              <div className="flex flex-col items-center justify-center h-full py-20 text-slate-400 space-y-6">
                <div className="relative">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-emerald-500"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-8 w-8 rounded-full bg-[#141C2F] border-2 border-slate-700/50"></div>
                  </div>
                </div>
                <p className="animate-pulse text-lg font-medium tracking-wide text-emerald-400/80">Your code is being submitted...</p>
              </div>
            ) : submitResult ? (
              <>
            <h2
              className={`text-2xl font-bold mb-6 flex items-center gap-3 ${
                submitResult.status === "accepted"
                  ? "text-emerald-400"
                  : submitResult.status === "pending"
                    ? "text-amber-400"
                    : "text-rose-400"
              }`}
            >
              {submitResult.status === "accepted" && (
                <svg
                  className="w-8 h-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              )}
              {submitResult.status === "failed" && (
                <svg
                  className="w-8 h-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              )}
              {submitResult.status === "pending" && (
                <svg
                  className="w-8 h-8 animate-spin"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              )}
              Submission{" "}
              {submitResult.status.charAt(0).toUpperCase() +
                submitResult.status.slice(1)}
            </h2>

            <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 mb-6 shadow-lg">
              <div
                className={`grid ${submitResult.language ? "grid-cols-2 md:grid-cols-4" : "grid-cols-1"} gap-6 mb-6`}
              >
                <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700/30">
                  <p className="text-slate-400 text-sm mb-1 font-medium">
                    Status
                  </p>
                  <p
                    className={`text-lg font-bold ${
                      submitResult.status === "accepted"
                        ? "text-emerald-400"
                        : submitResult.status === "pending"
                          ? "text-amber-400"
                          : "text-rose-400"
                    }`}
                  >
                    {submitResult.status.charAt(0).toUpperCase() +
                      submitResult.status.slice(1)}
                  </p>
                </div>
                {submitResult.language && (
                  <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700/30">
                    <p className="text-slate-400 text-sm mb-1 font-medium">
                      Language
                    </p>
                    <p className="text-lg font-bold text-slate-200 capitalize">
                      {submitResult.language}
                    </p>
                  </div>
                )}
                {submitResult.runtime !== undefined && (
                  <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700/30">
                    <p className="text-slate-400 text-sm mb-1 font-medium">
                      Runtime
                    </p>
                    <p className="text-lg font-bold text-slate-200">
                      {submitResult.runtime} ms
                    </p>
                  </div>
                )}
                {submitResult.memory !== undefined && (
                  <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700/30">
                    <p className="text-slate-400 text-sm mb-1 font-medium">
                      Memory
                    </p>
                    <p className="text-lg font-bold text-slate-200">
                      {submitResult.memory}{" "}
                      {submitResult.language === "cpp" ||
                      submitResult.language === "c" ||
                      submitResult.language === "java"
                        ? "MB"
                        : "KB"}
                    </p>
                  </div>
                )}
              </div>

              {submitResult.totalTestcases !== undefined && (
                <div className="mb-2 bg-slate-900/50 p-5 rounded-lg border border-slate-700/30">
                  <div className="flex justify-between items-end mb-3">
                    <p className="text-slate-300 font-medium text-lg">
                      Testcases Passed
                    </p>
                    <p className="font-mono text-xl">
                      <span
                        className={
                          submitResult.status === "accepted"
                            ? "text-emerald-400 font-bold"
                            : "text-rose-400 font-bold"
                        }
                      >
                        {submitResult.testcasesPassed}
                      </span>
                      <span className="text-slate-500">
                        {" "}
                        / {submitResult.totalTestcases}
                      </span>
                    </p>
                  </div>
                  <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden shadow-inner border border-slate-700/50">
                    <div
                      className={`h-full rounded-full transition-all duration-1000 ease-out ${submitResult.status === "accepted" ? "bg-emerald-500" : "bg-rose-500"}`}
                      style={{
                        width: `${(submitResult.testcasesPassed / Math.max(submitResult.totalTestcases, 1)) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
              )}

              {(submitResult.errMessage || submitResult.error) && (
                <div className="mt-6">
                  <p className="text-slate-400 text-sm mb-2 font-medium">
                    Error Message
                  </p>
                  <div className="bg-rose-500/10 border border-rose-500/30 text-rose-300 px-5 py-4 rounded-lg font-mono text-sm overflow-x-auto whitespace-pre-wrap shadow-inner">
                    {submitResult.errMessage || submitResult.error}
                  </div>
                </div>
              )}
            </div>

            {submitResult.code && (
              <div>
                <p className="text-slate-400 text-sm mb-2 font-medium">
                  Submitted Code
                </p>
                <div className="bg-[#0d1117] border border-slate-700/50 rounded-xl p-5 overflow-x-auto shadow-inner">
                  <pre className="font-mono text-sm text-slate-300">
                    <code>{submitResult.code}</code>
                  </pre>
                </div>
              </div>
            )}
              </>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProblemDesc;
