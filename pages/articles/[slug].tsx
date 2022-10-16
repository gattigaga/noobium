import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { parseISO, format } from "date-fns";

import NavBar from "../../components/NavBar";
import axios from "../../helpers/axios";

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  try {
    const response = await axios.get(`/articles/${query.slug}`);

    return {
      props: {
        article: response.data.data,
      },
    };
  } catch (error: any) {
    if (error.response.status === 404) {
      return {
        notFound: true,
      };
    }

    return {
      props: {},
    };
  }
};

type Props = {
  article: {
    id: number;
    user_id: number;
    category_id: number;
    title: string;
    slug: string;
    content_preview: string;
    content: string;
    featured_image: string;
    created_at: string;
    updated_at: string;
    category: {
      id: number;
      name: string;
      slug: string;
    };
    user: {
      id: number;
      name: string;
      email: string;
      picture: string;
    };
  };
};

const ArticleDetailPage: NextPage<Props> = ({ article }) => {
  const formattedDate = format(parseISO(article.created_at), "MMM dd");

  return (
    <div>
      <Head>
        <title>{article.title} | Noobium</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavBar />
      <div className="w-[720px] mx-auto py-24">
        <div className="flex items-center mb-8">
          <img
            className="w-12 h-12 rounded-full object-cover mr-4"
            src={article.user.picture}
            alt={article.user.name}
          />
          <div>
            <p className="text-sm font-sans text-slate-900 mb-1">
              {article.user.name}
            </p>
            <p className="text-sm font-sans text-slate-400">{formattedDate}</p>
          </div>
        </div>

        <h1 className="font-bold font-sans text-slate-900 text-5xl mb-4">
          {article.title}
        </h1>
        <div className="px-3 bg-slate-200 rounded-full w-fit h-6 flex items-center mb-12">
          <p className="text-slate-900 font-sans text-xs">{article.category.name}</p>
        </div>

        <img
          className="w-full aspect-video object-cover mb-12"
          src={article.featured_image}
          alt={article.title}
        />

        <p className="font-serif text-slate-900 whitespace-pre-line">
          {article.content}
        </p>
      </div>
    </div>
  );
};

export default ArticleDetailPage;
