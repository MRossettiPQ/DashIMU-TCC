export default function AutorizaHeader() {
  let user = JSON.parse(localStorage.getItem("user"));

  if (user && user.accessToken) {
    return { "x-access-token": user.accessToken }; // for Node.js Express back-end
  } else {
    return null;
  }
}
