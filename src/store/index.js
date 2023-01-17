import { configureStore } from "@reduxjs/toolkit";
import commentSlice from "./CommentSlice";
import communitySlice from "./CommunitySlice";
import postSlice from "./PostSlice";
import userSlice from "./UserSlice";

export default configureStore({
  reducer: {
    user: userSlice.reducer,
    community: communitySlice.reducer,
    post: postSlice.reducer,
    comment: commentSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
