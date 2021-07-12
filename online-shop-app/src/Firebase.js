import firebase from "firebase";

const config = {
  projectId: "react-chat-1579f",
  apiKey:
    "AAAAQ5VactY:APA91bHyXiou7jSQomCrEjuPRGzXYbXhm68E_kCYBtWWr0eH9_cRfsor0fxOTyzZVG9fZALjCPjticP46FDas-be6l-BLdBaeQlloYreTz_q0xscp_QsKnbsC5PXu_Qt7y7VN3wXH0bM",
  databaseURL: "https://react-chat-1579f-default-rtdb.firebaseio.com",
};
firebase.initializeApp(config);

export default firebase;
