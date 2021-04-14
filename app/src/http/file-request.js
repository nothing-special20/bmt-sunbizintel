import api from "./api";

const client = api.getInstance();

export default {
  /**
   * HTTP Call to fetch file data from search
   */
  getFileRequestData (filters) {
    return client.get("/request/file/data", {
      params: {
        filters: filters
      }
    }).then(response => response.data);
  },
  /**
   * HTTP Call to fetch user file request history
   */
  fetchUserFileRequestHistory (user) {
    return client.get("/request/file/history", {
      params: user
    }).then(response => response.data);
  },
  /**
   * HTTP Call to download previous file request in user history
   */
  downloadFileRequest (requestData) {
    return client.get("/request/file/history/download/", {
      params: requestData
    }).then(response => response);
  },
  /**
   * HTTP Call to download sample file
   */
  getSampleFile () {
    return client.get("/request/file/sample").then(response => response);
  }
};
