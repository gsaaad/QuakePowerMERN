import decode from "jwt-decode";

// class to decode jw

const formatSeconds = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const paddedSeconds =
    remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds;
  return `${minutes}:${paddedSeconds}`;
};

class AuthService {
  // retrive data token

  getProfile() {
    // console.log("getting profile");
    // console.log("THIS IS THE OKEN", this.getToken());
    const decodedToken = decode(this.getToken());
    console.log("decoded token", decodedToken);
    return decodedToken;
    // return decodedToken
  }

  //   check if user still loggedin

  loggedIn() {
    // check token
    const token = this.getToken();
    console.log("LOGGED IN?", !!token);
    console.log("IS EXPIRED?", this.isTokenExpired(token));
    console.log("TOTAL EXPRESSION", !!token && this.isTokenExpired(token));

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
    const timeDiff = timeNow - decodedExp;
    console.log("TIME DIFFERENCE IS...", Math.abs(timeDiff));
    console.log("or formatted", formatSeconds(Math.abs(timeDiff)));
    if (timeDiff > 0) {
      return false;
    } else {
      return true;
    }
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
    // return true;
  }

  getToken() {
    // token from localstorage
    const getToken = localStorage.getItem("id_token");
    // if (!getToken) {
    //   // console.log("token is not recieved..", !getToken);
    //   console.log("token was not recieved... sending GENERAL USER");
    //   return "yJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJuYW1lIjoidGVzdDEyMyIsImVtYWlsIjoidGVzdDEyM0BsaXZlLmNvbSIsIl9pZCI6IjYzZTJmMjUxMDNkYTE5NTU5Y2ViODU3ZSJ9LCJpYXQiOjE2NzkwMDM1ODIsImV4cCI6MTY3OTAyMTU4Mn0.HXfNFTB2vs6pz1eV3HpB3AJZ4aMAx9MeiLcbeqeLRGM";
    // }
    if (!getToken) {
      // Handle the error
      console.error("Could not obtain token");
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
