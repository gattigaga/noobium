import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Button from "../components/Button";

import NavBar from "../components/NavBar";

const NotFoundPage: NextPage = () => {
  return (
    <div>
      <Head>
        <title>404 | Noobium</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavBar hasSearchInput={false} />
      <div
        style={{ height: "calc(100vh - 4rem)" }}
        className="w-[720px] flex flex-col items-center justify-center mx-auto py-24"
      >
        <h1 className="text-8xl text-slate-900 font-sans text-center font-bold mb-6">
          404
        </h1>
        <p className="font-sans text-slate-900 text-center mb-14">
          There&lsquo;s no content here.
        </p>
        <Link href="/">

          <Button type="button" size="large">
            Back to Home
          </Button>

        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
