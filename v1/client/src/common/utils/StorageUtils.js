import dayjs from "dayjs";

class StorageUtils {
  async store(key, value, timeout = null) {
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

    const result = window.localStorage[key];
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
  getUser() {
    const user = localStorage.getItem("user");
    if (user) {
      return JSON.parse(user);
    }
    return null;
  }

  async getToken() {
    const user = this.getUser();
    if (user) {
      return user.accessToken;
    } else {
      return null;
    }
  }

  getTokenSync() {
    const user = this.getUser();

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

const Storage = new StorageUtils();
export { StorageUtils, Storage as default };
