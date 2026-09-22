import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axiosClient from "../utils/axiosClient";
import { Search, Code2, ChevronDown, ListFilter } from "lucide-react";
import Problems from "../components/Problems";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const TOPICS = [
  "All",
  "math",
  "arrays",
  "linked list",
  "hash table",
  "stack",
  "queue",
  "two pointers",
  "prefix sum",
  "trees",
  "dynamic programming",
  "tries",
  "segment trees",
  "graphs",
];

function Home() {
  const { user, loading, isAuthenticated, error } = useSelector(
    (state) => state.auth,
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [problems, setProblems] = useState([]);
  const [loadingProblems, setLoadingProblems] = useState(true);

  const [filters, setFilters] = useState({
    difficulty: "All",
    topic: "All",
    page: 1,
    status: "All",
    search: "",
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setFilters((prev) => {
        if (prev.search === searchTerm) return prev;
        return { ...prev, search: searchTerm, page: 1 };
      });
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    const fetchProblems = async () => {
      setLoadingProblems(true);
      try {
        if (filters.status === "All") {
          const response = await axiosClient.get("problem/", {
            params: {
              difficulty:
                filters.difficulty === "All" ? undefined : filters.difficulty,
              topic: filters.topic === "All" ? undefined : filters.topic,
              page: filters.page,
              search: filters.search || undefined,
            },
          });
          setProblems(response.data.problems);
          setTotalPages(response.data.totalPages);
        } else {
          const response = await axiosClient.get("problem/solvedByUser", {
            params: {
              difficulty:filters.difficulty === "All" ? undefined : filters.difficulty,
              topic: filters.topic === "All" ? undefined : filters.topic,
              page: filters.page,
              status:filters.status,
              search: filters.search || undefined,
            },
          });
          setProblems(response.data.problems);
          setTotalPages(response.data.totalPages);
        }
      } finally {
        setLoadingProblems(false);
      }
    };
    fetchProblems();
  }, [filters]);

  return (
    <div className="w-full min-h-[calc(100vh-4rem)] bg-[#030014] text-white p-4 sm:p-6 lg:p-8 overflow-x-hidden relative selection:bg-indigo-500/30">
      {/* Background Effects (Matching SignUp) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[5%] w-[40%] h-[40%] rounded-full bg-indigo-600/10 blur-[120px]" />
        <div className="absolute top-[40%] right-[5%] w-[30%] h-[30%] rounded-full bg-purple-600/10 blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10 space-y-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-indigo-300 font-medium shadow-sm backdrop-blur-md mb-4">
              <Code2 className="w-3.5 h-3.5" />
              <span>Problem Set</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              Hey There,{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-purple-400">
                {user?.firstName + " " + user?.lastName || "Developer"}
              </span>
            </h1>
            <p className="text-white/50 mt-2">
              Continue your journey to master software craftsmanship.
            </p>
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="flex flex-col lg:flex-row gap-4 bg-white/2 border border-white/5 p-4 rounded-2xl backdrop-blur-xl">
          <div className="relative grow">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/40">
              <Search className="w-4.5 h-4.5" />
            </div>
            <input
              type="text"
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all placeholder:text-white/20"
              placeholder="Search problems..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap sm:flex-nowrap gap-3">
            {/* Difficulty Filter */}
            <div className="relative group shrink-0">
              <select
                className="appearance-none bg-white/5 border border-white/10 rounded-xl pl-4 pr-10 py-2.5 text-sm text-white/80 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 cursor-pointer w-full sm:w-auto"
                value={filters.difficulty}
                onChange={(e) => {
                  setFilters((prev) => ({
                    ...prev,
                    difficulty: e.target.value,
                  }));
                }}
              >
                <option value="All" className="bg-[#0f172a]">
                  Difficulty
                </option>
                <option value="Easy" className="bg-[#0f172a]">
                  Easy
                </option>
                <option value="Medium" className="bg-[#0f172a]">
                  Medium
                </option>
                <option value="Hard" className="bg-[#0f172a]">
                  Hard
                </option>
              </select>
              <ChevronDown className="w-4 h-4 text-white/40 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none group-hover:text-white/80 transition-colors" />
            </div>

            {/* Status Filter */}
            <div className="relative group shrink-0">
              <select
                className="appearance-none bg-white/5 border border-white/10 rounded-xl pl-4 pr-10 py-2.5 text-sm text-white/80 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 cursor-pointer w-full sm:w-auto"
                value={filters.status}
                onChange={(e) => {
                  setFilters((prev) => ({
                    ...prev,
                    status: e.target.value,
                  }));
                }}
              >
                <option value="All" className="bg-[#0f172a]">
                  Status
                </option>
                <option value="Solved" className="bg-[#0f172a]">
                  Solved
                </option>
              </select>
              <ChevronDown className="w-4 h-4 text-white/40 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none group-hover:text-white/80 transition-colors" />
            </div>

            {/* Topic Filter */}
            <div className="relative group shrink-0">
              <select
                className="appearance-none bg-white/5 border border-white/10 rounded-xl pl-4 pr-10 py-2.5 text-sm text-white/80 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 cursor-pointer w-full sm:w-auto"
                value={filters.topic}
                onChange={(e) => {
                  setFilters((prev) => ({
                    ...prev,
                    topic: e.target.value,
                  }));
                }}
              >
                <option value="All" className="bg-[#0f172a]">
                  Topic
                </option>
                {TOPICS.filter((t) => t !== "All").map((topic) => (
                  <option key={topic} value={topic} className="bg-[#0f172a]">
                    {topic}
                  </option>
                ))}
              </select>
              <ListFilter className="w-4 h-4 text-white/40 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none group-hover:text-white/80 transition-colors" />
            </div>
          </div>
        </div>

        {/* Problems Table */}
        <Problems problems={problems} loadingProblems={loadingProblems} />

        {/* Pagination*/}
        <div className=" flex justify-between">
          <div>
            <span className="font-medium text-transparent bg-clip-text bg-linear-to-r from-indigo-500 to-purple-300">
              Showing page {filters.page} of {totalPages}
            </span>
          </div>
          <Stack spacing={2}>
            <Pagination
              count={totalPages}
              variant="outlined"
              shape="rounded"
              onChange={(event, value) => {
                setFilters((prev) => ({
                  ...prev,
                  page: value,
                }));
              }}
              sx={{
                "& .MuiPaginationItem-root": {
                  color: "#a5f3fc",
                  borderColor: "rgba(165, 243, 252, 0.35)",
                  textShadow: "0 0 8px rgba(34, 211, 238, 0.4)",
                },

                "& .MuiPaginationItem-root:hover": {
                  backgroundColor: "rgba(34, 211, 238, 0.12)",
                  borderColor: "#67e8f9",
                  boxShadow: "0 0 12px rgba(34, 211, 238, 0.35)",
                },

                "& .Mui-selected": {
                  backgroundColor: "rgba(34, 211, 238, 0.18)",
                  color: "#67e8f9",
                  borderColor: "#67e8f9",
                  boxShadow: "0 0 14px rgba(34, 211, 238, 0.2)",
                  textShadow: "0 0 10px rgba(103, 232, 249, 0.4)",
                },

                "& .Mui-selected:hover": {
                  backgroundColor: "rgba(34, 211, 238, 0.25)",
                },
              }}
            />
          </Stack>
        </div>
      </div>
    </div>
  );
}

export default Home;
