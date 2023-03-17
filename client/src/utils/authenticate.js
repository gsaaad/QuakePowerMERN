import decode from "jwt-decode";

// class to decode jw

const formatSeconds = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const paddedSeconds =
    remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds;
  return `${minutes} mins & ${paddedSeconds} seconds `;
};

class AuthService {
  // retrive data token

  getProfile() {
    // console.log("getting profile");
    console.log("THIS IS THE OKEN", !!this.getToken());
    const profileToken = this.getToken();

    if (!!profileToken) {
      const decodedToken = decode(this.getToken());
      console.log("decoded token", decodedToken);
      return decodedToken;
    }
    return false;
  }

  //   check if user still loggedin

  loggedIn() {
    // check token
    const token = this.getToken();
    console.log("DO WE HAVE A TOKEN", !!token);
    console.log("IS EXPIRED?", this.isTokenExpired(token));
    console.log("TOTAL EXPRESSION", token && this.isTokenExpired(token));

    // use type coersion, not undefined, and not expired!
    return !!token && this.isTokenExpired(token);
  }

  //   expired token
  isTokenExpired(token) {
    const decodedToken = decode(token);
    const decodedExp = decodedToken.exp;
    console.log("LENGTH OF EXP", decodedExp);
    // time, milliseconds/1000, now in seconds
    const timeNow = Math.round(Date.now() / 1000);
    console.log("TIME NOW", timeNow);
    const timeDiff = timeNow - decodedExp;
    console.log("TIME DIFFERENCE IS...", timeDiff);
    console.log("or formatted", formatSeconds(Math.abs(timeDiff)));
    if (timeDiff < 0) {
      return true;
    } else {
      return false;
    }
    // ! return true;
    // try {
    //   const decoded = decode(token);

    //   if (timeDiff < 0) {
    //     return true;
    //   } else {
    //     return false;
    //   }
    // } catch (e) {
    //   console.error(e);
    //   return false;
    // }
  }

  getToken() {
    // token from localstorage
    const getToken = localStorage.getItem("id_token");
    if (!getToken) {
      console.log("token was not recieved... problem starts here");
      // return "eyJhbGciOiJIUzI1NiJ9.eyJkYXRhIjp7InVzZXJuYW1lIjoidGVzdDEyMyIsImVtYWlsIjoidGVzdDEyM0BsaXZlLmNvbSIsIl9pZCI6IjYzZTJmMjUxMDNkYTE5NTU5Y2ViODU3ZSJ9LCJpYXQiOjEuNjc5MDIxNTgyZSsyMSwiZXhwIjoxLjY3OTAyMTU4MmUrMjF9.IArMZRHGGtY7Q7QLVpOqIVnTtxDU2wQo8OfzwhLvfsw";
      return "eyJhbGciOiJIUzI1NiJ9.eyJkYXRhIjp7InVzZXJuYW1lIjoidGVzdDEyMyIsImVtYWlsIjoidGVzdDEyM0BsaXZlLmNvbSIsIl9pZCI6IjYzZTJmMjUxMDNkYTE5NTU5Y2ViODU3ZSJ9LCJpYXQiOjE1LCJleHAiOjE1fQ.k6gnsgz9VZfDDv5hqTDKQCCaw4-YIs5dnGF4NDUsOBg";
    }

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
