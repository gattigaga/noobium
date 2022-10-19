import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Loading from "react-spinners/BeatLoader";

import NavBar from "../components/NavBar";
import PhotoPicker from "../components/PhotoPicker";
import TextInput from "../components/TextInput";
import useUserQuery from "../hooks/queries/use-user-query";
import useEditProfileMutation from "../hooks/mutations/use-edit-profile-mutation";

type FormValues = {
  fullname: string;
  photo: File | null;
};

const MyProfileSchema = Yup.object().shape({
  fullname: Yup.string()
    .min(8, "Full Name should have at least 8 characters")
    .max(30, "Full Name should have maximum 30 characters")
    .required("Full Name is required"),
});

const MyProfilePage: NextPage = () => {
  const router = useRouter();
  const userQuery = useUserQuery();
  const editProfileMutation = useEditProfileMutation();
  const queryClient = useQueryClient();

  const initialValues: FormValues = {
    fullname: "",
    photo: null,
  };

  const formik = useFormik({
    initialValues,
    validationSchema: MyProfileSchema,
    validateOnMount: true,
    onSubmit: async (values) => {
      try {
        const response = await editProfileMutation.mutateAsync({
          name: values.fullname,
          picture: values.photo,
        });

        queryClient.setQueryData(["user"], response);
        router.push("/");
        toast.success("Edit profile successful !");
      } catch (error) {
        toast.error("Failed to edit profile !");
      }
    },
  });

  useEffect(() => {
    formik.setValues({
      fullname: userQuery.data?.name || "",
      photo: null,
    });
  }, [userQuery.data]);

  return (
    <div>
      <Head>
        <title>My Profile | Noobium</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavBar
        hasSearchInput={false}
        hasSubmitButton={true}
        isSubmitDisabled={!!formik.errors.fullname}
        submitLabel="Save"
        onClickSubmit={formik.handleSubmit}
      />

      {editProfileMutation.isLoading && (
        <div className="h-screen flex justify-center items-center">
          <Loading size={16} color="rgb(30 64 175)" />
        </div>
      )}
      {!editProfileMutation.isLoading && (
        <div className="w-[400px] flex flex-col items-center mx-auto py-24">
          <PhotoPicker
            preview={userQuery.data?.picture}
            onPick={(file) => formik.setFieldValue("photo", file)}
          />
          <div className="h-16" />
          <TextInput
            name="fullname"
            label="Full Name"
            type="text"
            placeholder="Enter your full name"
            value={formik.values.fullname}
            hasError={!!formik.errors.fullname}
            errorMessage={formik.errors.fullname}
            onChange={formik.handleChange}
          />
        </div>
      )}
    </div>
  );
};

export default MyProfilePage;
