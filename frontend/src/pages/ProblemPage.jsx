import { useParams } from "react-router";
import axiosClient from '../utils/axiosClient';
import { useEffect, useState } from "react";
import ProblemDesc from '../components/ProblemDesc'
import VisibleCases from '../components/VisibleCases'
import EditorArea from "../components/Editor";

function ProblemPage() {
    const [loadingProblem, setLoadingProblem] = useState(true);
    const [problem, setProblem] = useState(null);
    const [runResult,setRunResult] = useState([]);
    const [submitResult,setSubmitResult] = useState(null);
    const [loadingRun, setLoadingRun] = useState(false);
    const [loadingSubmit,setLoadingSubmit] = useState(false);
    
    const { Pid } = useParams();

    useEffect(() => {
        const fetchProblem = async () => {
            try {
                // Assuming axiosClient returns data in response.data, but handling both just in case
                const response = await axiosClient.get(`problem/${Pid}`);
                const problemData = response.data || response;
                setProblem(problemData);
                
            } catch (error) {
                console.error("Error fetching problem:", error);
            } finally {
                setLoadingProblem(false);
            }
        };
        fetchProblem();
    }, [Pid]);


    if (loadingProblem) {
        return (
            <div className="flex w-full h-[calc(100vh-4rem)] items-center justify-center bg-[#0F172A]">
                <span className="loading loading-infinity loading-xl text-indigo-500"></span>
            </div>
        );
    }

    if (!problem) {
        return (
            <div className="flex w-full h-[calc(100vh-4rem)] items-center justify-center bg-[#0F172A] text-white">
                <h2 className="text-2xl font-semibold">Problem not found</h2>
            </div>
        );
    }

    return (
        <div className="flex h-[calc(100vh-4rem)] w-full bg-[#0F172A] text-slate-300 font-sans overflow-hidden">

            {/* Left Panel - Problem Details & Testcases */}
            <div className="flex w-1/2 flex-col border-r border-slate-700/50 bg-[#141C2F] shadow-2xl z-10">
                {/* Top Left - Problem Details */}
                <ProblemDesc submitResult={submitResult} problem={problem} loadingSubmit={loadingSubmit}/>

                {/* Bottom Left - Visible Test Cases */}
                <VisibleCases runResult={runResult} problem={problem} loadingRun={loadingRun} />
            </div>

            {/* Right Panel - Code Editor Area */}
            <div className="flex w-1/2 flex-col bg-[#1E1E1E]">
                {/* Editor Area */}
                <EditorArea setSubmitResult={setSubmitResult} setRunResult={setRunResult} problem={problem} setLoadingRun={setLoadingRun} setLoadingSubmit={setLoadingSubmit} /> 
            </div>

        </div>
    );
}

export default ProblemPage;