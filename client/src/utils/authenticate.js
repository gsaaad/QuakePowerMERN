import decode from "jwt-decode";

// class to decode jw

class AuthService {
  // retrive data token

  getProfile() {
    return decode(this.getToken());
  }

  //   check if user still loggedin

  loggedIn() {
    // check token
    const token = this.getToken();

    // use type coersion, not undefined, and not expired!
    return !!token && !this.isTokenExpired(token);
  }

  //   expired token
  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  getToken() {
    // token from localstorage
    return localStorage.getItem("id_token");
  }

  //   set token to localstorage, reload page to home
  login(idToken) {
    // save token to localstorage
    localStorage.setItem("id_token", idToken);

    window.location.assign("/");
  }

  //   clear token, force logout
  logout() {
    localStorage.removeItem("id_token");

    // reload page, reset state of application, without token = need re-Auth user
    window.location.assign("/");
  }
}

export default new AuthService();
