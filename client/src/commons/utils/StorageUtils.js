import dayjs from "dayjs";

class StorageUtils {
  async store(key, value, timeout) {
    if (key && value) {
      value = JSON.stringify(value);
      window.localStorage[key] = value;
      if (timeout) {
        window.localStorage[key + "-timeout"] = JSON.stringify({
          timeout: timeout,
          date: dayjs().toISOString(),
        });
      }
    }
  }

  async get(key) {
    let timeout = window.localStorage[key + "-timeout"];
    if (timeout && timeout !== "undefined") {
      timeout = JSON.parse(timeout);
      if (dayjs().diff(timeout.date, "minutes") > timeout.timeout) {
        return;
      }
    }

    let result = window.localStorage[key];
    if (result && result !== "undefined") {
      return JSON.parse(result);
    }
  }

  async remove(key) {
    window.localStorage[key] = undefined;
    window.localStorage[key + "-timeout"] = undefined;
    window.localStorage.removeItem(key);
    window.localStorage.removeItem(key + "-timeout");
  }

  async eraseLocalStorage() {
    window.localStorage.clear();
  }

  //
  async getUser() {
    return JSON.parse(localStorage.getItem("user"));
  }

  async getToken() {
    const user = await this.getUser();

    if (user) {
      return user.accessToken;
    } else {
      return null;
    }
  }

  async setUser(user) {
    await this.store("user", user);
  }

  async saveToken(token) {
    await this.store("token", token);
  }

  async removeToken() {
    await this.remove("token");
  }
}

export default new StorageUtils();
