import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

import useSignOutMutation from "../hooks/mutations/use-sign-out-mutation";
import useUserQuery from "../hooks/queries/use-user-query";

type Props = {};

const AccountDropdown: React.FC<Props> = ({}) => {
  const userQuery = useUserQuery();
  const signOutMutation = useSignOutMutation();
  const queryClient = useQueryClient();
  const router = useRouter();

  const signOut = async () => {
    try {
      await signOutMutation.mutateAsync();

      queryClient.removeQueries(["user"]);
      toast.success("Sign out successfully !");
      localStorage.removeItem("access_token");
      localStorage.removeItem("access_token_generated_at");
      localStorage.removeItem("access_token_expired_at");
      router.push("/");
    } catch (error) {
      toast.error("Failed to sign out !");
    }
  };

  return (
    <div className="w-48 rounded-md border border-slate-200 absolute bg-white right-0 top-full">
      <div className="p-4 border-b border-slate-200">
        <p className="font-sans text-slate-900 font-bold">
          {userQuery.data?.name || ""}
        </p>
        <p className="font-sans text-slate-400 text-xs">
          {userQuery.data?.email || ""}
        </p>
      </div>

      <div className="p-4">
        <ul>
          <li className="mb-3">
            <Link href="/my-profile">

              <p className="font-sans text-slate-900 text-xs">My Profile</p>

            </Link>
          </li>
          <li className="mb-3">
            <Link href="/my-articles">

              <p className="font-sans text-slate-900 text-xs">My Articles</p>

            </Link>
          </li>
          <li>
            <button
              className="h-4 font-sans text-red-500 text-xs"
              type="button"
              onClick={signOut}
            >
              Sign Out
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AccountDropdown;
