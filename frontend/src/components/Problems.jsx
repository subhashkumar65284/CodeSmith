
import { CheckCircle2, Circle } from "lucide-react";
import { useSelector } from "react-redux";

function Problems({ problems, loadingProblems }) {
  const { user } = useSelector((state) => state.auth);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "easy":
        return "text-emerald-400 bg-emerald-400/10 border-emerald-400/20";
      case "medium":
        return "text-amber-400 bg-amber-400/10 border-amber-400/20";
      case "hard":
        return "text-rose-400 bg-rose-400/10 border-rose-400/20";
      default:
        return "text-white/60 bg-white/5 border-white/10";
    }
  };

  return (
    <div className="bg-white/2 border border-white/5 rounded-2xl backdrop-blur-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 bg-white/5 text-sm font-medium text-white/60">
              <th className="py-4 pl-6 pr-4 font-medium w-16">Status</th>
              <th className="py-4 px-4 font-medium">Title</th>
              <th className="py-4 pr-6 pl-4 font-medium w-32 text-right">
                Difficulty
              </th>
            </tr>
          </thead>
          {loadingProblems ? (
            <tbody>
              <tr>
                <td colSpan="3" className="py-20">
                  <div className="flex justify-center items-center">
                    <span className="loading loading-infinity loading-xl text-indigo-500"></span>
                  </div>
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody className="divide-y divide-white/5">
              {problems.length > 0 ? (
                problems.map((problem) => (
                  <tr
                    key={problem._id}
                    className="group hover:bg-white/3 transition-colors cursor-pointer"
                  >
                    <td className="py-4 pl-6 pr-4">
                      <div className="flex items-center justify-center w-6">
                        {user?.problemSolved?.includes(problem._id) ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                        ) : (
                          <Circle
                            className="w-5 h-5 text-amber-500 border-b-blue-800 rounded-full border-2 opacity-70"
                            strokeWidth={0}
                          />
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-medium text-white/90 group-hover:text-indigo-400 transition-colors">
                        {problem.title}
                      </div>
                    </td>
                    <td className="py-4 pr-6 pl-4 text-right">
                      <span
                        className={`text-xs capitalize font-semibold px-2.5 py-1 rounded-lg border inline-block ${getDifficultyColor(problem.difficulty)}`}
                      >
                        {problem.difficulty}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="py-12 text-center text-white/40">
                    No problems found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          )}
        </table>
      </div>
      
    </div>
  );
}

export default Problems;
