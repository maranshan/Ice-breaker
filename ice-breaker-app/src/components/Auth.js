import { auth, db } from "../index";
import {
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

let email = "";
let password = "";
let userName = "";

export const setEmail = (newEmail) => {
  email = newEmail;
};

export const setPassword = (newPassword) => {
  password = newPassword;
};

export const setUserName = (newserName) => {
  userName = newserName;
};

export const signIn = async () => {
  try {
    const newUserCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await setDoc(doc(db, "users", newUserCredentials.user.uid), {
      username: userName,
      games: [],
    });
  } catch (error) {
    window.alert(error);
  }
};

export const logIn = async () => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    window.alert(error);
  }
};

export const logout = async () => {
  try {
    if (auth.currentUser !== null) {
      await signOut(auth);
      window.alert("Du er nå logget ut.");
    } else {
      window.alert("Allerede logget ut.");
    }
  } catch (error) {
    window.alert(error);
  }
};
