import axios from "axios";

const api_url_get = "http://localhost:8080/";

class Service {
  async getData(target, restrictAccess = false) {
    let config = null;
    if (restrictAccess) {
      config = {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      };
    }
    const url_target = api_url_get + "api/" + target;
    return axios.get(url_target, config);
  }

  postData(target, jsondata, restrictAccess = false) {
    let config = null;
    if (restrictAccess) {
      config = {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      };
    }
    const url_target = api_url_get + "api/" + target;
    return axios.post(url_target, jsondata, config);
  }

  deleteData(target, jsondata) {
    const url_target = api_url_get + "api/" + target;
    return axios.post(url_target, jsondata);
  }

  putData(target, jsondata) {
    const url_target = api_url_get + "api/" + target;
    return axios.put(url_target, jsondata);
  }
}

export default new Service();
