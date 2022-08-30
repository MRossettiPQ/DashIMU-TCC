class AuthenticateUtils {
  getToken = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      return user.accessToken;
    } else {
      return null;
    }
  };

  getHeader = () => {
    let user = JSON.parse(localStorage.getItem("user"));

    if (user && user.accessToken) {
      return { "x-access-token": user.accessToken }; // for Node.js Express back-end
    } else {
      return null;
    }
  };
}

export default new AuthenticateUtils();
