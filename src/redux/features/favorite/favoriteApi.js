import { apiSlice } from "../api/apiSlice";
import { setUserFavorite } from "./favoriteSlice";

export const favoriteApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserFavorite: builder.query({
      query: () => ({
        url: `/favorite/`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: [{ type: "Favorite", id: "USER_FAVORITE" }],
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(setUserFavorite(result.data.success === true ? result.data.data : null));
        } catch {
          dispatch(setUserFavorite(null));
        }
      },
    }),
    addFavorite: builder.mutation({
      query: (storeId) => ({
        url: `/favorite/add/${storeId}`,
        method: "POST",
        credentials: "include",
      }),
      invalidatesTags: [{ type: "Favorite", id: "USER_FAVORITE" }],
    }),
    removeFavorite: builder.mutation({
      query: (storeId) => ({
        url: `/favorite/remove/${storeId}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: [{ type: "Favorite", id: "USER_FAVORITE" }],
    }),
    removeAllFavorite: builder.mutation({
      query: () => ({
        url: `/favorite/remove-all`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: [{ type: "Favorite", id: "USER_FAVORITE" }],
    }),
  }),
});

export const {
  useGetUserFavoriteQuery,
  useAddFavoriteMutation,
  useRemoveFavoriteMutation,
  useRemoveAllFavoriteMutation,
} = favoriteApi;
