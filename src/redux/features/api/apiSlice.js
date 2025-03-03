import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { resetUserState } from "../user/userSlice";
import { resetUploadState } from "../upload/uploadSlice";
import { resetNotificationState } from "../notification/notificationSlice";
import { resetMessageState } from "../message/messageSlice";
import { resetChatState } from "../chat/chatSlice";
import { resetLocationState } from "../location/locationSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: `${process.env.NEXT_PUBLIC_SERVER_URI}/api/v1`,
  credentials: "include",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token") ? localStorage.getItem("token").replace(/^"|"$/g, "") : null;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReAuth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    const refreshResult = await baseQuery("/auth/refresh", api, extraOptions);

    if (refreshResult.data) {
      const { accessToken } = refreshResult.data;

      localStorage.setItem("token", JSON.stringify(accessToken));

      result = await baseQuery(args, api, extraOptions);
    } else {
      // Gửi yêu cầu logout lên server
      await baseQuery("/auth/logout", api, extraOptions);

      // Xóa dữ liệu người dùng
      api.dispatch(resetUserState());
      api.dispatch(resetUploadState());
      api.dispatch(resetNotificationState());
      api.dispatch(resetMessageState());
      api.dispatch(resetChatState());
      api.dispatch(resetLocationState());

      localStorage.removeItem("userId");
      localStorage.removeItem("token");
    }
  }
  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReAuth,
  tagTypes: ["Post"],
  endpoints: (builder) => ({}),
});

export const {} = apiSlice;
