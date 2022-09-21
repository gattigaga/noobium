import Link from "next/link";
import { useState } from "react";
import { MdSearch } from "react-icons/md";

import Button from "./Button";
import AccountDropdown from "./AccountDropdown";

type Props = {};

const NavBar: React.FC<Props> = () => {
  const [keyword, setKeyword] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const isLoggedIn = true;

  return (
    <header className="h-16 border-b border-slate-200 flex items-center justify-between px-24">
      <Link href="/">
        <a>
          <img src="/images/logo-with-text.svg" />
        </a>
      </Link>

      <div className="w-[720px] absolute left-1/2 -translate-x-1/2 flex items-center">
        <MdSearch className="text-slate-400 mr-4" size={24} />
        <input
          className="font-sans text-sm placeholder-slate-400 text-slate-900 outline-none"
          type="text"
          placeholder="Search"
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
        />
      </div>

      {isLoggedIn && (
        <div className="relative">
          <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            <img
              className="w-10 h-10 rounded-full object-cover"
              src="/images/dummy-avatar.png"
              alt="John Doe"
            />
          </button>

          {isDropdownOpen && <AccountDropdown />}
        </div>
      )}
      {!isLoggedIn && (
        <Link href="/auth/sign-in">
          <a>
            <Button>Sign In</Button>
          </a>
        </Link>
      )}
    </header>
  );
};

export default NavBar;
