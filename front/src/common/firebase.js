import firebase from "firebase/compat/app";
import "firebase/compat/storage";

const firebaseConfig = {
  type: "service_account",
  project_id: "diploma-186e3",
  private_key_id: "c6dc725bb3bffe4c8be85601e149c929e86f4179",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCf3duxzQ/LJYAR\nL2v9aJesTembeYoqvIRt7WXS6zatICYmZcZot8mki2Ny9uAgvLo/rYvo2oLbA56v\nXrB9a+V2N03bYgBofIyUdvc/NppCYm8z2ONCO9Ot4LrVeXz4WNxTLhmwr+kVtSs8\nicjJsbLxpYMmsnBf9sn/OgzUIcJeAZMTnXl9F5Ed5A09x7foYstgubcXE9faexct\nKdTG3YJJxx3H45L0sFgV0Ps+b9R0GcjeVILAIz6BIyhe2DeaqejNyqpmYTXUQl6D\njpRFB0qgp8M39h+VB3U/5VNRJltL5om6Zt2S1OHiu14D1H/zA4ywmju6eBQSlOEU\n3QZSlePDAgMBAAECggEACJCOmst1S13QKySsCewiOBS97Wztk/og2LqI2n4jWPfO\nLJG9JRvJ2PsdUg5bupVEH7rMRJRGnSNVuR8RV17UXp/Dc0TE6B1IF6WMRQujDMNH\na3LisWyjiX8BM3HqIyMd4hhe0dSuO1H97u4kOjBReZAF0PIh8Bo4bOhBVB6oUi8L\nBLAChpIjrY7bru7AlPN9heeYcKGjkaV+VekjSovB4sExYEz3Hi0nTOlBXfG83DK4\na8qi66IeGqLLruy9qs2W/ltRZj/2KM6atOqaJMn/t3To821uTOTdDnRqSixgvkhm\n9zRFMbjTH7f3ddxhqLESDKE819jP1+sAvNd9/3rHPQKBgQDM+yUiwThU5NVvkc+l\n0q5usfZKU7lEpky4tdir9mgVqOWjbsf7/TYskYaULASyk91U9XG9jt9Q06iiwEHw\nzo98QsGXdAtboVisGoSjWEVILUCNBagB5XSzL3o0UAF9cqEdLkZQk43babUK3Dbb\nvnrqZxrDJjyHd3N1N7nICV02ZwKBgQDHqCQ8EXLRRbW+jgcS6eUIZ1+pONdELsFJ\n1sLUmlgHsju9KYSgLgWVxWxYBEK7fbMn1ISutJUqpSCGZnXm63J4S9mUPbdFCZAW\nOGzvls9beCzGKxcaSuVFsxZxGOAIevAukxwJoXl4j8RHgwR/j72XoJdrYDF34H80\n05Bvkk+2RQKBgGTwBwlmPGcRiEi4dJgjduHroGxZbhHwEjei1F9Zp0eDNBGWq8Pa\nnKK1xp+QTX/icEs10hyWDkGu+IusQMxj6yQ1ez8pVa55dUDKjiYhgXxZTEAlWOYW\nJ7FU38iC3Tj5CX1lHBrxjhlNpGkEp77tvXlP7E3MtmG+4IwINOPcOJphAoGBALl1\n0brOhnYop+tLKP0DsVF+HNknSKc4OynoyXANswnrIRzUzTKxrVRzX/Hee1KIL/wm\np91VN162pqDR2mFXgiyGYKUYMv55JJPPdDmWQCV6WzT1X+93dMOq2ITUE38tG6BX\n3GqByUEZYrz+0hXgIsAPV7hRUYJGUkNy5q8NHOh1AoGATk6vJ6fNSt+lpm9OrjMo\noHWsk1ZoYQT7SMJxOgNdCt1pk1HCJUHbUXeaNIq9Nk5nkYW46p20QE/17LuvGVt2\n8mZP6fVoERGKLjz0BxxdYrUfHFbSXMZKi+eV97DDLuzBAyDM7V9RJW2m4TWsTMOH\n+7ZUhEsodwOjRs+L0zcaWdM=\n-----END PRIVATE KEY-----\n",
  client_email: "firebase-adminsdk-6yjvg@diploma-186e3.iam.gserviceaccount.com",
  client_id: "106103305573486518836",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-6yjvg%40diploma-186e3.iam.gserviceaccount.com",
};

// {
//   "type": "service_account",
//   "project_id": "diploma-186e3",
//   "private_key_id": "c6dc725bb3bffe4c8be85601e149c929e86f4179",
//   "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCf3duxzQ/LJYAR\nL2v9aJesTembeYoqvIRt7WXS6zatICYmZcZot8mki2Ny9uAgvLo/rYvo2oLbA56v\nXrB9a+V2N03bYgBofIyUdvc/NppCYm8z2ONCO9Ot4LrVeXz4WNxTLhmwr+kVtSs8\nicjJsbLxpYMmsnBf9sn/OgzUIcJeAZMTnXl9F5Ed5A09x7foYstgubcXE9faexct\nKdTG3YJJxx3H45L0sFgV0Ps+b9R0GcjeVILAIz6BIyhe2DeaqejNyqpmYTXUQl6D\njpRFB0qgp8M39h+VB3U/5VNRJltL5om6Zt2S1OHiu14D1H/zA4ywmju6eBQSlOEU\n3QZSlePDAgMBAAECggEACJCOmst1S13QKySsCewiOBS97Wztk/og2LqI2n4jWPfO\nLJG9JRvJ2PsdUg5bupVEH7rMRJRGnSNVuR8RV17UXp/Dc0TE6B1IF6WMRQujDMNH\na3LisWyjiX8BM3HqIyMd4hhe0dSuO1H97u4kOjBReZAF0PIh8Bo4bOhBVB6oUi8L\nBLAChpIjrY7bru7AlPN9heeYcKGjkaV+VekjSovB4sExYEz3Hi0nTOlBXfG83DK4\na8qi66IeGqLLruy9qs2W/ltRZj/2KM6atOqaJMn/t3To821uTOTdDnRqSixgvkhm\n9zRFMbjTH7f3ddxhqLESDKE819jP1+sAvNd9/3rHPQKBgQDM+yUiwThU5NVvkc+l\n0q5usfZKU7lEpky4tdir9mgVqOWjbsf7/TYskYaULASyk91U9XG9jt9Q06iiwEHw\nzo98QsGXdAtboVisGoSjWEVILUCNBagB5XSzL3o0UAF9cqEdLkZQk43babUK3Dbb\nvnrqZxrDJjyHd3N1N7nICV02ZwKBgQDHqCQ8EXLRRbW+jgcS6eUIZ1+pONdELsFJ\n1sLUmlgHsju9KYSgLgWVxWxYBEK7fbMn1ISutJUqpSCGZnXm63J4S9mUPbdFCZAW\nOGzvls9beCzGKxcaSuVFsxZxGOAIevAukxwJoXl4j8RHgwR/j72XoJdrYDF34H80\n05Bvkk+2RQKBgGTwBwlmPGcRiEi4dJgjduHroGxZbhHwEjei1F9Zp0eDNBGWq8Pa\nnKK1xp+QTX/icEs10hyWDkGu+IusQMxj6yQ1ez8pVa55dUDKjiYhgXxZTEAlWOYW\nJ7FU38iC3Tj5CX1lHBrxjhlNpGkEp77tvXlP7E3MtmG+4IwINOPcOJphAoGBALl1\n0brOhnYop+tLKP0DsVF+HNknSKc4OynoyXANswnrIRzUzTKxrVRzX/Hee1KIL/wm\np91VN162pqDR2mFXgiyGYKUYMv55JJPPdDmWQCV6WzT1X+93dMOq2ITUE38tG6BX\n3GqByUEZYrz+0hXgIsAPV7hRUYJGUkNy5q8NHOh1AoGATk6vJ6fNSt+lpm9OrjMo\noHWsk1ZoYQT7SMJxOgNdCt1pk1HCJUHbUXeaNIq9Nk5nkYW46p20QE/17LuvGVt2\n8mZP6fVoERGKLjz0BxxdYrUfHFbSXMZKi+eV97DDLuzBAyDM7V9RJW2m4TWsTMOH\n+7ZUhEsodwOjRs+L0zcaWdM=\n-----END PRIVATE KEY-----\n",
//   "client_email": "firebase-adminsdk-6yjvg@diploma-186e3.iam.gserviceaccount.com",
//   "client_id": "106103305573486518836",
//   "auth_uri": "https://accounts.google.com/o/oauth2/auth",
//   "token_uri": "https://oauth2.googleapis.com/token",
//   "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
//   "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-6yjvg%40diploma-186e3.iam.gserviceaccount.com"
// }

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();

export default storage;
