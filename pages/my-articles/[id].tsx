import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import Loading from "react-spinners/BeatLoader";
import toast from "react-hot-toast";

import NavBar from "../../components/NavBar";
import ThumbnailPicker from "../../components/ThumbnailPicker";
import Category from "../../components/Category";
import useMyArticleDetailQuery from "../../hooks/queries/use-my-article-detail-query";
import useCategoriesQuery from "../../hooks/queries/use-categories-query";
import useEditArticleMutation from "../../hooks/mutations/use-edit-article-mutation";

type FormValues = {
  title: string;
  content: string;
  thumbnail: File | null;
  categoryId: number | null;
};

const EditArticleSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  content: Yup.string().required("Content is required"),
  categoryId: Yup.number().nullable().required("Category is required"),
});

const EditArticlePage: NextPage = () => {
  const refContentInput = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();

  const myArticleDetailQuery = useMyArticleDetailQuery(
    router.query.id as string
  );

  const categoriesQuery = useCategoriesQuery();
  const editArticleMutation = useEditArticleMutation();

  const initialValues: FormValues = {
    title: "",
    content: "",
    thumbnail: null,
    categoryId: null,
  };

  const formik = useFormik({
    initialValues,
    validationSchema: EditArticleSchema,
    validateOnMount: true,
    onSubmit: async (values) => {
      if (!values.categoryId || !myArticleDetailQuery.data) return;

      try {
        await editArticleMutation.mutateAsync({
          id: myArticleDetailQuery.data.id,
          title: values.title,
          content: values.content,
          category_id: values.categoryId,
          featured_image: values.thumbnail,
        });

        router.push("/my-articles");
        toast.success("Update an article successful !");
      } catch (error) {
        toast.error("Failed to update an article !");
      }
    },
  });

  const hasError =
    !!formik.errors.title ||
    !!formik.errors.content ||
    !!formik.errors.thumbnail ||
    !!formik.errors.categoryId;

  const handleContentInputGrow = () => {
    if (!refContentInput.current) return;

    refContentInput.current.style.height = "auto";

    refContentInput.current.style.height =
      refContentInput.current.scrollHeight + "px";
  };

  useEffect(() => {
    formik.setValues({
      title: myArticleDetailQuery.data?.title || "",
      content: myArticleDetailQuery.data?.content || "",
      thumbnail: null,
      categoryId: myArticleDetailQuery.data?.category_id || null,
    });

    setTimeout(() => {
      handleContentInputGrow();
    }, 200);
  }, [myArticleDetailQuery.data]);

  return (
    <div>
      <Head>
        <title>Edit Article | Noobium</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavBar
        hasSearchInput={false}
        hasSubmitButton={true}
        isSubmitDisabled={hasError}
        submitLabel="Publish"
        onClickSubmit={formik.handleSubmit}
      />
      {editArticleMutation.isLoading && (
        <div className="h-screen flex justify-center items-center">
          <Loading size={16} color="rgb(30 64 175)" />
        </div>
      )}
      {!editArticleMutation.isLoading && (
        <div className="w-[720px] mx-auto py-24">
          <input
            className="font-sans font-bold text-5xl placeholder-slate-200 text-slate-900 w-full outline-none mb-12"
            placeholder="Title"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
          />
          <ThumbnailPicker
            preview={myArticleDetailQuery.data?.featured_image}
            onPick={(file) => formik.setFieldValue("thumbnail", file)}
          />
          <textarea
            ref={refContentInput}
            className="w-full outline-none mt-12 font-serif text-slate-900 placeholder-slate-400 resize-none"
            placeholder="Write an article here..."
            name="content"
            value={formik.values.content}
            onChange={formik.handleChange}
            onInput={handleContentInputGrow}
          />
          <div className="pt-12 mt-40 border-t border-slate-200">
            {categoriesQuery.isSuccess && (
              <>
                <p className="font-sans text-slate-900 text-sm mb-4">
                  Choose a Category
                </p>
                <div className="flex flex-wrap gap-3">
                  {categoriesQuery.data.map((category) => (
                    <Category
                      key={category.id}
                      label={category.name}
                      isSelected={formik.values.categoryId === category.id}
                      onClick={() =>
                        formik.setFieldValue("categoryId", category.id)
                      }
                    />
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
        </div>
      )}
    </div>
  );
};

export default EditArticlePage;
