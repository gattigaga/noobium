import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, Fragment } from "react";
import Loading from "react-spinners/BeatLoader";

import NavBar from "../components/NavBar";
import Article from "../components/Article";
import useArticlesQuery from "../hooks/queries/use-articles-query";

const SearchPage: NextPage = () => {
  const router = useRouter();

  const articlesQuery = useArticlesQuery({
    search: router.query.keyword as string,
  });

  useEffect(() => {
    const handler = () => {
      const { scrollHeight, scrollTop, clientHeight } =
        document.documentElement;

      const isScrollToBottom = scrollHeight - scrollTop === clientHeight;

      if (isScrollToBottom) {
        if (articlesQuery.hasNextPage && !articlesQuery.isFetchingNextPage) {
          articlesQuery.fetchNextPage();
        }
      }
    };

    document.addEventListener("scroll", handler);

    return () => {
      document.removeEventListener("scroll", handler);
    };
  }, [articlesQuery.isSuccess, articlesQuery.data]);

  return (
    <div>
      <Head>
        <title>Results for {router.query.keyword} | Noobium</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavBar />
      <div className="w-[720px] mx-auto py-24">
        <div className="mb-16">
          <p className="font-sans font-bold text-slate-400 mb-3">Results for</p>
          <p className="font-sans font-bold text-slate-900 text-5xl">
            {router.query.keyword}
          </p>
        </div>

        {articlesQuery.isSuccess && (
          <>
            {articlesQuery.data.pages.map((page, index) => (
              <Fragment key={index}>
                {page.data.map((article) => (
                  <Article
                    key={article.id}
                    url={`/articles/${article.slug}`}
                    title={article.title}
                    content={article.content_preview}
                    thumbnail={article.featured_image}
                    category={article.category.name}
                    date={article.created_at}
                    author={{
                      name: article.user.name,
                      photo: article.user.picture,
                    }}
                  />
                ))}
              </Fragment>
            ))}

            {articlesQuery.isFetchingNextPage && (
              <div className="flex justify-center mt-8">
                <Loading size={16} color="rgb(30 64 175)" />
              </div>
            )}
          </>
        )}
        {articlesQuery.isLoading && (
          <div className="flex justify-center">
            <Loading size={16} color="rgb(30 64 175)" />
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
