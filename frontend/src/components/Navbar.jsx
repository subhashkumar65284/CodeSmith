import { Menu } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../slices/authSlice";
import { useNavigate } from "react-router";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(useGSAP);

export default function Navbar() {
  const { user, isAuthenticated, loading, error } = useSelector(
    (state) => state.auth,
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const navRef = useRef();
  const tl = useRef();

  useGSAP(() => {
      tl.current = gsap.timeline({ paused: true });

      tl.current.from(".navTo", {
        y: -15,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
      });
    },
    { scope: navRef },
  );

  useEffect(() => {
    if (!loading && tl.current) {
      tl.current.play();
    }
  }, [loading]);

  const onLogoutClick = () => {
    dispatch(logoutUser());
  };
  const onAdminDashboardClick = () => {
    navigate("/admin");
  };
  const onProblemsClick = () => {
    navigate("/");
  };
  return (
    <div ref={navRef} className="navbar shadow-sm sticky top-0 z-50 bg-linear-to-r from-indigo-700/70 via-purple-800/70 to-purple-900/70 backdrop-blur-lg border-b border-white/10 px-4 md:px-8">
      {/* Mobile Menu & Logo */}
      <div className="navbar-start w-full md:w-auto flex-1 md:flex-none">
        <div className="dropdown md:hidden">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle text-white"
          >
            <Menu className="w-6 h-6" />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-1 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a className="navTo inline-block cursor-pointer">Problems</a>
            </li>
            <li>
              <a className="navTo inline-block cursor-pointer">Resources</a>
            </li>
            <li>
              <a className="navTo inline-block cursor-pointer">About Us</a>
            </li>
          </ul>
        </div>

        <div className="flex items-center gap-3 shrink-0 ml-2 md:ml-0">
          <img src="/favicon.svg" className="w-10 h-10" alt="Logo" />
          <a className="text-xl md:text-2xl font-black text-white">CodeSmith</a>
        </div>
      </div>

      {/* Desktop Navigation */}
      <div className="navbar-center hidden md:flex flex-1 justify-center">
        <ul className="flex gap-8 text-white/90 font-medium">
          <li>
            <a
              onClick={onProblemsClick}
              className="navTo inline-block cursor-pointer hover:text-white transition-colors"
            >
              Problems
            </a>
          </li>
          <li>
            <a className="navTo inline-block cursor-pointer hover:text-white transition-colors">
              Resources
            </a>
          </li>
          <li>
            <a className="navTo inline-block cursor-pointer hover:text-white transition-colors">
              About Us
            </a>
          </li>
        </ul>
      </div>

      {/* User Profile */}
      <div className="navbar-end shrink-0 w-auto">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar flex justify-center items-center hover:bg-white/20 transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
              <span className="text-2xl">{user.firstName.charAt(0)}</span>
            </div>
          </div>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <a className="justify-between">Profile</a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li onClick={onLogoutClick}>
              <a>Logout</a>
            </li>
            {user?.role === "admin" ? (
              <li onClick={onAdminDashboardClick}>
                <a>Admin Dashboard</a>
              </li>
            ) : null}
          </ul>
        </div>
      </div>
    </div>
  );
}
