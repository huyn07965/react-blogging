export const theme = {
  primary: "#00A7B4",
  secondary: "#A4D96C",
  greyDark: "#808080",
  greyLight: "#E7ECF3",
  greyBf: "#bfbfbf",
  blueLight: "#00D1ED",
  purpleLight: "#F3EDFF",
  purpleDark: "#F3EDFF",
  greenLight: "#e5f6f7",
  greenDark: "#468499",
  orangeLignt: "#fdecea",
  orangeDark: "#f44336",
  redLight: "#f9e5e5",
  redDark: "#cc0000",
};
export const postValue = {
  Active: 1,
  Pending: 2,
  Reject: 3,
};
export const categoryValue = {
  Approved: 1,
  UnApproved: 2,
};
export const userStatus = {
  Active: 1,
  Pending: 2,
  Reject: 3,
};
export const roleStatus = {
  Admin: 1,
  Mod: 2,
  User: 3,
};

const api = "http://localhost:3001";
// const api = "https://node-app-blogging.onrender.com";

export const baseUrl = {
  getCategory: `${api}/category`,
  getALLCategory: `${api}/getAllCategory`,
  getCategoryFilter: `${api}/getCategoryFilter/`,
  creteCategory: `${api}/createCategory`,
  deleteCategory: `${api}/deleteCategory/`,
  deleteCategoryReject: `${api}/deleteCategoryReject`,
  getCategoryById: `${api}/getCategory/`,
  updateCategory: `${api}/updateCategory/`,
  getPost: `${api}/post`,
  getAllPost: `${api}/allPost`,
  getPostManage: `${api}/getPostManage`,
  getPostHot: `${api}/postHot`,
  getPostFilter: `${api}/postFilter`,
  getPostInMonth: `${api}/getPostInMonth`,
  getTotalAllPost: `${api}/getTotalAllPost`,
  getPostFilterManage: `${api}/getPostFilterManage/`,
  getPostCategory: `${api}/postCategory/`,
  getPostAuthor: `${api}/postAuthor/`,
  cretePost: `${api}/createPost`,
  deletePost: `${api}/deletePost/`,
  deletePostReject: `${api}/deletePostReject`,
  getPostById: `${api}/getPost/`,
  getPostAuthorId: `${api}/postAuthorId/`,
  getPostDetail: `${api}/postDetail/`,
  updatePost: `${api}/updatePost/`,
  getUser: `${api}/user`,
  getUserActive: `${api}/userActive`,
  getUserInMonth: `${api}/getUserInMonth`,
  getUserFilter: `${api}/userFilter/`,
  getTotalAllUser: `${api}/getTotalAllUser`,
  creteUser: `${api}/createUser`,
  deleteUser: `${api}/deleteUser/`,
  deleteUserReject: `${api}/deleteUserReject`,
  getUserById: `${api}/getUser/`,
  updateUser: `${api}/updateUser/`,
  getComment: `${api}/comment/`,
  getReplyComment: `${api}/getReplyComment/`,
  createComment: `${api}/createComment`,
  updateComment: `${api}/updateComment/`,
  deleteComment: `${api}/deleteComment/`,
  createContact: `${api}/createContact`,
  getContact: `${api}/getContact/`,
  updateContact: `${api}/updateContact/`,
  createBanner: `${api}/createBanner`,
  getBanner: `${api}/getBanner/`,
  updateBanner: `${api}/updateBanner/`,
  createRule: `${api}/createRule`,
  getRule: `${api}/getRule/`,
  updateRule: `${api}/updateRule/`,
  signIn: `${api}/login`,
  sendOtp: `${api}/send-otp/`,
  createReport: `${api}/createReport`,
  getReport: `${api}/getAllReport`,
  getTotalAllReport: `${api}/getTotalAllReport`,
  getReportById: `${api}/getReport/`,
  getReportInMonth: `${api}/getReportInMonth`,
  updateReport: `${api}/updateReport/`,
  deleteReport: `${api}/deleteReport/`,
  getReportFilter: `${api}/reportFilter/`,
  createNotification: `${api}/createNotification`,
  getNotificationById: `${api}/getNotificationById/`,
  updateNotification: `${api}/updateNotification/`,
};
