import firebase from "firebase/compat/app";
import "firebase/compat/storage";

const firebaseConfig = {
  type: "service_account",
  project_id: "diploma-dab94",
  private_key_id: "d2c3f860371b0b8d68bfdce81e1be72f8c2fd5b9",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDXJJlv8vGmgeH3\nfEVB9Hxb/XUV3Brb7xTUwajBpaEqQV3QzRHlNiJX1/b5MCeQNf55Bf3Ai0njI09h\n5t9Y7AU0RMtsrbYUNPPDKwgOpocxdhw+CSfd+6FSAQaKZwgAiMpZ12VShArNn5SM\nT+TFiE1aUb9IVYNbk5g7Zq4u5pr2sD+1o6/LWFXlGGnWS+XQWW2S4w7/XxhuAPDj\ncKlXcxdg90XIAr0rF+zLXWJ+RQWPjSTer2rrSclFF2HJEv+scWxzXOYhSShJZi+9\nYIfWAk6kjYXszAZaFaCnO+fzxO4UubFUYIKXxDrWdE93FS/pUVV2DJpvYDaSvvAr\nFejULYGjAgMBAAECggEAGPrxa+u3/j7fd2Zw/jb+h4nW4fpkDfxlHUz9JLrwCyF6\n3Kcq+EPAWhXD4ewi894pFXFKJOSnaB2t9m6hqUgCVK7WNeC3nwIE+bjR3y2bzfTq\nU5Opkt9IPGbNFR3gcntvj13wsFOPk49/ZolSRVNNs/qA7MutDGGHUAJcoCp7fMAE\njxSj3YAgEwl4sJMDT/NE/gF1j7yX9EgtqL7T3FSvxcmndFCOVTos1mVcaqC8ih8B\nypzUagyCMLz6fzdHij5sHjeWGcKT/fWWyFW4bPoplC7DU3YSFTPE3X0OCBD8HroV\nUDfFBiE+cA3cI5zodejVncQQA/5KNQzDESwh0azMbQKBgQD60iSg8kBRUYSXh9hN\nRl3D4ScOp8wvX0LAhzliToVxX0DgpamgZeYtDkJp5ad94yriQz396Em/n6YbxgT6\n1L4Lwvqy3nsjm1Pqy2PTDTQ7RUj5N1nQQNDNbB1Gsqu6l51hJa25VBv7O09SVu9i\nWz8R5p7jBWLL74KdRqtbFEthPwKBgQDbldw/pCiAAQwm4ZzCxyiYCioX0VYhIF3w\n0BAqNwzUzcV+A3snPYPmpLmVVdjraQwn8ReId8ICo/CRR5uxupWtItga9ayRym3R\nfOmOFtoRNRpHKbM5KvPp2Lxglwlqq+q03P7gadlQMssXJhEthn3vTNPyDOiaJVBn\ne8P93leinQKBgBXlLE9kdlri69kygZ5VSzAjQn6UBU4JWdFmvIqpYhrAfvBdZc5b\nttkuCnwmERX7M64mwo2crnts21pHUf33flOWhL4Cj+tOzueLM76jw3B9Ht6qh0uX\nrOKR0ohuZnFWdOWbHWw1PHAVAFqmviTu5DWS1UHqIXK+CL/kAGdmASKPAoGAUXZK\nLE4BPGOnF3GRj20FMUpsDUP6+PUiBKmbpZ2go/3mq3YtJQScP1+S/cTIYaUp/lNh\n0J3lGsepAqyXJRs8VevcUjwcFkYL8bCukKkHo2SY6BefRrEZpgJi+E5wDuPSgeCO\nqcB6/1aoo2Da9JG1fKZ65oxFapI3PvzaW/81cb0CgYAA8UUr8d2yILuSDTN/xbF4\nkPL6qJwaYphJGwsj8wTKnGdngPJQsRiQWlhAhy8YPTY+EBe/pwisH6Hli+BnhKKH\nmOmcE4VQKuHHfJvVYzprQL+93jLsPS7njLXp9EKlK3tKhWj/895CRZiyPNZg2FfT\nynrThJShAkmi6lD0XaKQNw==\n-----END PRIVATE KEY-----\n",
  client_email: "firebase-adminsdk-dmqv1@diploma-dab94.iam.gserviceaccount.com",
  client_id: "100447457766989799765",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-dmqv1%40diploma-dab94.iam.gserviceaccount.com",
  storageBucket: "diploma-dab94.appspot.com",
};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();

export default storage;
