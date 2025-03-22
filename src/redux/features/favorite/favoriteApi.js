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
          if (result.data.success === true) {
            dispatch(setUserFavorite(result.data.data));
          } else {
            dispatch(setUserFavorite(null));
          }
        } catch (error) {
          dispatch(setUserFavorite(null));
          console.error(error);
        }
      },
    }),
    addFavorite: builder.mutation({
      query: (data) => ({
        url: `/favorite/add`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(favoriteApi.util.invalidateTags([{ type: "Favorite", id: "USER_FAVORITE" }]));
        } catch (error) {
          console.error(error);
        }
      },
    }),
    removeFavorite: builder.mutation({
      query: (data) => ({
        url: `/favorite/remove`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(favoriteApi.util.invalidateTags([{ type: "Favorite", id: "USER_FAVORITE" }]));
        } catch (error) {
          console.error(error);
        }
      },
    }),
    removeAllFavorite: builder.mutation({
      query: () => ({
        url: `/favorite/remove-all`,
        method: "POST",
        credentials: "include",
      }),
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(favoriteApi.util.invalidateTags([{ type: "Favorite", id: "USER_FAVORITE" }]));
        } catch (error) {
          console.error(error);
        }
      },
    }),
  }),
});

export const {
  useGetUserFavoriteQuery,
  useAddFavoriteMutation,
  useRemoveFavoriteMutation,
  useRemoveAllFavoriteMutation,
} = favoriteApi;
