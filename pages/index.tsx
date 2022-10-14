import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Loading from "react-spinners/BeatLoader";
import { useEffect, Fragment } from "react";

import NavBar from "../components/NavBar";
import Article from "../components/Article";
import Category from "../components/Category";
import useCategoriesQuery from "../hooks/queries/use-categories-query";
import useArticlesQuery from "../hooks/queries/use-articles-query";

const Home: NextPage = () => {
  const categoriesQuery = useCategoriesQuery();
  const articlesQuery = useArticlesQuery();

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
        <title>Noobium</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavBar />
      <div className="w-[720px] mx-auto py-24">
        <div className="mb-16">
          {categoriesQuery.isSuccess && (
            <>
              <p className="font-sans text-slate-900 text-sm mb-4">
                Your Categories
              </p>
              <div className="flex flex-wrap gap-3">
                {categoriesQuery.data.map((category) => (
                  <Link key={category.id} href={`/categories/${category.slug}`}>
                    <a>
                      <Category label={category.name} />
                    </a>
                  </Link>
                ))}
              </div>
            </>
          )}
          {categoriesQuery.isLoading && (
            <div className="flex justify-center">
              <Loading size={16} color="rgb(30 64 175)" />
            </div>
          )}
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

export default Home;
