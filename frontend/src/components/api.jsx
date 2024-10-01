import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001/api/v1/user",
    prepareHeaders: (headers, { getState }) => {
      const token = sessionStorage.getItem("token");
      console.log("Token récupéré:", token); // Pour déboguer
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    signup: builder.mutation({
      query: (userData) => ({
        url: "/signup",
        method: "POST}),",
        body: userData,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    getProfile: builder.query({
      query: (userData) => ({
        url: "/profile",
        method: "POST",
        body: userData,
      }),
    }),
    updateProfile: builder.mutation({
      query: (updatedProfile) => ({
        url: "/profile",
        method: "PUT",
        body: updatedProfile,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
} = api;

export default api;
