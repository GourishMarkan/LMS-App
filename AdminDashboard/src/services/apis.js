// export const BASE_URL = "https://bookish-fiesta-5pw7j94v67g3pvpw-4000.app.github.dev"
// export const BASE_URL = "https://lrzp6q-4000.csb.app"
// export const BASE_URL = "https://stunning-robot-5gqr475wv5xpc576-3000.app.github.dev"


// local     
export const BASE_URL = "http://127.0.0.1:4000"

///prod url  
// export const BASE_URL = "https://lms-app-1-eoim.onrender.com"

// development
// export const BASE_URL = "https://lms-app-wqwt.onrender.com"


export const endpoints = {
  SENDOTP_API: BASE_URL + "api/v1/auth/sendotp",
  SIGNUP_API: BASE_URL + "/auth/signup",
  LOGIN_API: BASE_URL + "/api/v1/auth/adminlogin",
  RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
  RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
};

// PROFILE ENDPOINTS
export const profileEndpoints = {
  GET_USER_DETAILS_API: BASE_URL + "/profile/getUserDetails",
  GET_USER_ENROLLED_COURSES_API: BASE_URL + "/profile/getEnrolledCourses",
  GET_INSTRUCTOR_DATA_API: BASE_URL + "/api/v1/auth/getUserById",
};

// STUDENTS ENDPOINTS
export const studentEndpoints = {
  COURSE_PAYMENT_API: BASE_URL + "/payment/capturePayment",
  COURSE_VERIFY_API: BASE_URL + "/payment/verifyPayment",
  SEND_PAYMENT_SUCCESS_EMAIL_API: BASE_URL + "/payment/sendPaymentSuccessEmail",
};

// COURSE ENDPOINTS
export const courseEndpoints = {
  GET_ALL_COURSE_API: BASE_URL + "/course/getAllCourses",
  COURSE_DETAILS_API: BASE_URL + "/course/getCourseDetails",
  EDIT_COURSE_API: BASE_URL + "/course/editCourse",

  COURSE_CATEGORIES_API: BASE_URL + "/api/v1/course/showAllCategories",

  CREATE_COURSE_API: BASE_URL + "api/v1/course/createCourse",
  CREATE_SECTION_API: BASE_URL + "/course/addSection",
  CREATE_SUBSECTION_API: BASE_URL + "/course/addSubSection",
  UPDATE_SECTION_API: BASE_URL + "/course/updateSection",
  UPDATE_SUBSECTION_API: BASE_URL + "/course/updateSubSection",
  GET_ALL_INSTRUCTOR_COURSES_API: BASE_URL + "/course/getInstructorCourses",
  DELETE_SECTION_API: BASE_URL + "/course/deleteSection",
  DELETE_SUBSECTION_API: BASE_URL + "/course/deleteSubSection",
  DELETE_COURSE_API: BASE_URL + "/course/deleteCourse",
  GET_FULL_COURSE_DETAILS_AUTHENTICATED:
    BASE_URL + "/course/getFullCourseDetails",
  LECTURE_COMPLETION_API: BASE_URL + "/course/updateCourseProgress",
  CREATE_RATING_API: BASE_URL + "/course/createRating",
};

// RATINGS AND REVIEWS
export const ratingsEndpoints = {
  REVIEWS_DETAILS_API: BASE_URL + "/course/getReviews",
};

// CATAGORIES API
export const categories = {
  CATEGORIES_API: BASE_URL + "/course/showAllCategories",
};

// CATALOG PAGE DATA
export const catalogData = {
  CATALOGPAGEDATA_API: BASE_URL + "/course/getCategoryPageDetails",
};
// CONTACT-US API
export const contactusEndpoint = {
  CONTACT_US_API: BASE_URL + "/reach/contact",
};

// SETTINGS PAGE API
export const settingsEndpoints = {
  UPDATE_DISPLAY_PICTURE_API: BASE_URL + "/profile/updateUserProfileImage",
  UPDATE_PROFILE_API: BASE_URL + "/profile/updateProfile",
  CHANGE_PASSWORD_API: BASE_URL + "/auth/changepassword",
  DELETE_PROFILE_API: BASE_URL + "/profile/deleteProfile",
};
