import Link from "next/link";

import Button from "./Button";

type Props = {};

const NavBar: React.FC<Props> = () => {
  return (
    <header className="h-16 border-b border-slate-200 flex items-center justify-between px-24">
      <Link href="/">
        <a>
          <img src="/images/logo-with-text.svg" />
        </a>
      </Link>

      <Link href="/auth/sign-in">
        <a>
          <Button>Sign In</Button>
        </a>
      </Link>
    </header>
  );
};

export default NavBar;
