import Editor from "@monaco-editor/react";
import { useRef, useState,useEffect } from "react";
import { Play, Send, Code2 } from "lucide-react";

function EditorArea({ problem }) {
  const editorRef = useRef(null);
  const [language, setLanguage] = useState("cpp");
  const [code, setCode] = useState("");

  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    setLanguage(newLang);
    if (problem?.boilerPlateCode) {
      const bp = problem.boilerPlateCode.find((b) => b.language === newLang);
      setCode(bp.boilerPlate);
    }
  };

  useEffect(() => {
  if (problem?.boilerPlateCode?.length > 0 && code === "") {
    const defaultBp = problem.boilerPlateCode.find(
      (bp) => bp.language === "cpp"
    );

    if (defaultBp) {
      setCode(defaultBp.boilerPlate || "");
    }
  }
}, [problem]);

  //   function handleEditorDidMount(editor) {
  //     editorRef.current = editor;
  //   }

  //   function showValue() {
  //     alert(editorRef.current.getValue());
  //   }
  return (
    <>
      {/* Editor Top Bar */}
      <div className="flex h-14 items-center justify-between px-4 bg-[#252526] border-b border-[#333333] shadow-md z-10">
        <div className="flex items-center gap-3">
          <Code2 className="w-5 h-5 text-slate-400" />
          <div className="relative">
            <select
              className="appearance-none bg-[#3C3C3C] border border-[#454545] text-slate-200 text-sm rounded-md pl-3 pr-8 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all cursor-pointer font-medium"
              value={language}
              onChange={handleLanguageChange}
            >
              <option value="cpp">C++</option>
              <option value="java">Java</option>
              <option value="python">Python</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-400">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-1.5 px-4 py-1.5 bg-slate-700/50 hover:bg-slate-600 text-slate-200 text-sm font-medium rounded-md transition-colors border border-slate-600">
            <Play className="w-4 h-4 text-emerald-400" />
            <span>Run</span>
          </button>
          <button className="flex items-center gap-1.5 px-4 py-1.5 bg-emerald-600/90 hover:bg-emerald-500 text-white text-sm font-medium rounded-md transition-colors shadow-lg shadow-emerald-900/20">
            <Send className="w-4 h-4" />
            <span>Submit</span>
          </button>
        </div>
      </div>

      <Editor
        language={language}
        value={code || "// some comment"}
        theme="vs-dark"
        options={{
          quickSuggestions: false,
          suggestOnTriggerCharacters: false,
          parameterHints: {
            enabled: false,
          },
          hover: {
            enabled: false,
          },
          suggest: {
            showSuggestions: false,
          },
        }}
      />
    </>
  );
}

export default EditorArea;
