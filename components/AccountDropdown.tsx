import Link from "next/link";

type Props = {};

const AccountDropdown: React.FC<Props> = ({}) => {
  const user = {
    name: "John Doe",
    email: "john.doe@gmail.com",
  };

  return (
    <div className="w-48 rounded-md border border-slate-200 absolute bg-white right-0 top-full">
      <div className="p-4 border-b border-slate-200">
        <p className="font-sans text-slate-900 font-bold">{user.name}</p>
        <p className="font-sans text-slate-400 text-xs">{user.email}</p>
      </div>

      <div className="p-4">
        <ul>
          <li className="mb-3">
            <Link href="#">
              <a>
                <p className="font-sans text-slate-900 text-xs">My Profile</p>
              </a>
            </Link>
          </li>
          <li className="mb-3">
            <Link href="/my-articles">
              <a>
                <p className="font-sans text-slate-900 text-xs">My Articles</p>
              </a>
            </Link>
          </li>
          <li>
            <button className="h-4 font-sans text-red-500 text-xs" type="button">
              Sign Out
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AccountDropdown;
