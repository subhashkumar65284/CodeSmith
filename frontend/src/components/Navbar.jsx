export default function Navbar() {
  return (
    <div className="navbar glass shadow-sm flex-row justify-between sticky top-0 z-50">
      <div className="w-8 shrink-0 flex justify-around">
        <img
          alt=""
          src="favicon.svg"
        />

      <div className="flex-1 min-w-0">
        <a className="btn btn-ghost text-xl">CodeSmith</a>
      </div>
      </div>

      <div className="flex gap-2 shrink-0">
        <input
          type="text"
          placeholder="Search"
          className="input w-20 md:w-auto focus:outline-none rounded-3xl"
        />

        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Profile"
                src="src/assets/user-icon.svg"
              />
            </div>
          </div>

          <ul
            tabIndex={-1}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <a className="justify-between">Profile</a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
