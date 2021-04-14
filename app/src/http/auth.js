import api from "./api";
import qs from "qs";

const client = api.getInstance();

export default {

  /**
   * HTTP Call for register new user
   *
   * @param data
   */
  register (data) {
    console.log("Attempting user registration.");
    return client.post("/user/register", data)
      .then(response => response.data);
  },
  /**
   * HTTP Call for requesting resending verification email
   *
   * @param userId - User ID
   * @param email - User email
   */
  resendVerificationEmail (userId, email) {
    return client.post("/user/verification/resend", {
      userId: userId,
      email: email
    }).then(response => response.data);
  },
  /**
   * HTTP Call to verify email
   *
   * @param userId - User ID
   * @param email - User email
   */
  verifyEmail (userId, hash) {
    return client.post("/user/verification/verify-account", {
      userId: userId,
      hash: hash
    }).then(response => response.data);
  },
  /**
   * HTTP Call for user login
   *
   * @param data
   */
  login (data) {
    console.log("Attempting logon.");
    return client.post("/user/login", data)
      .then(response => response.data);
  },
  /**
   * HTTP Call for resetting user password
   */
  forgotPassword (email) {
    return client.post("/user/password/forgot", { email: email }).then(response => response.data);
  },
  /**
   * HTTP Call to set new password
   */
  resetPassword (uid, hash, password, passwordConfirm) {
    return client.post("/user/password/reset", {
      userId: uid,
      hash: hash,
      password: password,
      password_confirmation: passwordConfirm
    }).then(response => response.data);
  },
  /**
   * Check user is authorized for page
   */
  authorize () {
    return client.get("/user/authorize").then(response => response.data);
  },
  /**
   * HTTP Call for user logout
   *
   * @param data
   */
  logout (data) {
    return client.get("/user/logout", {
      params: {
        data: data
      },
      paramsSerializer: params => {
        return qs.stringify(params);
      }
    });
  },
  /**
   * HTTP Call for password
   *
   * @param data
   */
  changePassword (data) {
    return client.get("/user/pass", {
      params: {
        data: data
      },
      paramsSerializer: params => {
        return qs.stringify(params);
      }
    });
  },
  /**
   * HTTP Call for email change
   *
   * @param data
   */
  changeEmail (data) {
    return client.get("/user/email", {
      params: {
        data: data
      },
      paramsSerializer: params => {
        return qs.stringify(params);
      }
    });
  }
};
