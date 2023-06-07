import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/auth-context";
import {
  BlogPage,
  CategoryPage,
  ContactPage,
  DashBoardPage,
  DetailPage,
  HomePage,
  NotFoundPage,
  SearchPage,
  SignInPage,
  SignUpPage,
  UserPage,
  WatchLater,
} from "./pages";
import {
  CategoryAddNew,
  CategoryManage,
  CategoryUpdate,
  ContactUpdate,
  DashBoardLayout,
  PostAddNew,
  PostManage,
  PostUpdate,
  UserAddNew,
  UserCreatePost,
  UserEdit,
  UserInfo,
  UserManage,
  UserPost,
  UserUpdatePost,
  UserUpdate,
} from "./module";
import Translate from "./components/translate/Translate";

function App() {
  return (
    <div>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage></HomePage>}></Route>
          <Route path="/sign-up" element={<SignUpPage></SignUpPage>}></Route>
          <Route path="/sign-in" element={<SignInPage></SignInPage>}></Route>
          <Route path="/userInfo" element={<UserInfo></UserInfo>}></Route>
          <Route
            path="/create-post"
            element={<UserCreatePost></UserCreatePost>}
          ></Route>
          <Route path="/user-post" element={<UserPost></UserPost>}></Route>
          <Route
            path="/user/update-post"
            element={<UserUpdatePost></UserUpdatePost>}
          ></Route>
          <Route path="/edit-user" element={<UserEdit></UserEdit>}></Route>
          <Route path="/blog" element={<BlogPage></BlogPage>}></Route>
          <Route path="/search" element={<SearchPage></SearchPage>}></Route>
          <Route path="/contact" element={<ContactPage></ContactPage>}></Route>
          <Route path="/translate" element={<Translate></Translate>}></Route>
          <Route
            path="/watch-later"
            element={<WatchLater></WatchLater>}
          ></Route>
          <Route path="/post/:slug" element={<DetailPage></DetailPage>}></Route>
          <Route
            path="/category/:slug"
            element={<CategoryPage></CategoryPage>}
          ></Route>
          <Route path="/user/:slug" element={<UserPage></UserPage>}></Route>
          <Route element={<DashBoardLayout></DashBoardLayout>}>
            <Route
              path="/dashboard"
              element={<DashBoardPage></DashBoardPage>}
            ></Route>
            <Route
              path="/manage/post"
              element={<PostManage></PostManage>}
            ></Route>
            <Route
              path="/manage/add-post"
              element={<PostAddNew></PostAddNew>}
            ></Route>
            <Route
              path="/manage/update-post"
              element={<PostUpdate></PostUpdate>}
            ></Route>
            <Route
              path="/manage/category"
              element={<CategoryManage></CategoryManage>}
            ></Route>
            <Route
              path="/manage/add-category"
              element={<CategoryAddNew></CategoryAddNew>}
            ></Route>
            <Route
              path="/manage/update-category"
              element={<CategoryUpdate></CategoryUpdate>}
            ></Route>
            <Route
              path="/manage/user"
              element={<UserManage></UserManage>}
            ></Route>
            <Route
              path="/manage/add-user"
              element={<UserAddNew></UserAddNew>}
            ></Route>
            <Route
              path="/manage/update-user"
              element={<UserUpdate></UserUpdate>}
            ></Route>
            <Route
              path="/manage/update-contact"
              element={<ContactUpdate></ContactUpdate>}
            ></Route>
          </Route>
          <Route path="*" element={<NotFoundPage></NotFoundPage>}></Route>
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
