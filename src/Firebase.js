import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyALHuRddsIjvh2cjV1KN6Q56XSWdwqbWI8",
  authDomain: "emp-management-system-401712.firebaseapp.com",
  projectId: "emp-management-system-401712",
  storageBucket: "emp-management-system-401712.appspot.com",
  messagingSenderId: "139453235977",
  appId: "1:139453235977:web:8c514937b31aa625fd09d8",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export { auth, provider };
