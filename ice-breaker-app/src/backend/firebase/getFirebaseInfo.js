import { auth, db } from "../../index.js";
import {
  getDocs,
  getDoc,
  collection,
  addDoc,
  updateDoc,
  doc,
  arrayUnion,
  deleteDoc,
  arrayRemove,
} from "firebase/firestore";
import "../../App.css";
import { Game } from "../Game.js";
import { User } from "../User.js";

const getGamesCollectionRef = () => collection(db, "games");
const getUsersCollectionRef = () => collection(db, "users");

export const getGameList = async (setGameList) => {
  console.log("heii");
  try {
    const gamesCollectionRef = getGamesCollectionRef();
    const data = await getDocs(gamesCollectionRef);
    const games = data.docs.map((doc) => {
      const docData = doc.data();
      return new Game(
        docData.name,
        docData.description,
        docData.rules,
        docData.owner,
        doc.id,
        docData.categories,
        docData.estimatedTime
      );
    });
    setGameList(games);
  } catch (err) {
    console.error(err);
  }
};

export const getFavList = async (currentUser, setFavList) => {
  try {
    const userDocRef = doc(db, "users", currentUser.uid);
    const userDoc = await getDoc(userDocRef);
    const userFavGamesIds = userDoc.data().favGames || [];

    const gamesCollectionRef = getGamesCollectionRef();
    const allGamesSnapshot = await getDocs(gamesCollectionRef);
    const favGames = allGamesSnapshot.docs
      .filter((doc) => userFavGamesIds.includes(doc.id))
      .map((doc) => {
        const docData = doc.data();
        return new Game(
          docData.name,
          docData.description,
          docData.rules,
          docData.owner,
          doc.id,
          docData.categories,
          docData.estimatedTime
        );
      });
    setFavList(favGames);
  } catch (err) {
    console.error(err);
  }
};

/* const [filteredList, setFilteredList] = useState([]);

useEffect(() => {
  const fetchFilteredGames = async () => {
    const games = await getFilteredGames(["Drikke-lek", "Enkelt"]);
    setFilteredList(games);
  };

  fetchFilteredGames();
}, []); */
export const getFilteredGames = async (categorieList) => {
  try {
    const gamesCollectionRef = getGamesCollectionRef();
    const data = await getDocs(gamesCollectionRef);
    const filteredGames = data.docs
      .filter((doc) => {
        const docData = doc.data();

        return categorieList.every((category) =>
          docData.categories.includes(category)
        );
      })
      .map((doc) => {
        const docData = doc.data();
        return new Game(
          docData.name,
          docData.description,
          docData.rules,
          docData.owner,
          doc.id,
          docData.categories,
          docData.estimatedTime
        );
      });

    return filteredGames;
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const getUserList = async (setUserList) => {
  try {
    const usersCollectionRef = getUsersCollectionRef();
    const data = await getDocs(usersCollectionRef);
    const users = data.docs.map((doc) => {
      const docData = doc.data();
      return new User(
        docData.email,
        docData.username,
        doc.id,
        docData.games,
        docData.favGames
      );
    });
    setUserList(users);
  } catch (err) {
    console.error(err);
  }
};

export const onSubmitGame = async (
  newGameName,
  newGameDescription,
  newGameRules,
  selectedCategories,
  newGameTimer
) => {
  if (auth.currentUser !== null) {
    try {
      const gamesCollectionRef = getGamesCollectionRef();
      const gameDocRef = await addDoc(gamesCollectionRef, {
        name: newGameName,
        description: newGameDescription,
        rules: newGameRules,
        owner: auth.currentUser.uid,
        categories: selectedCategories,
        estimatedTime: newGameTimer,
      });

      const userDocRef = doc(db, "users", auth.currentUser.uid);
      await updateDoc(userDocRef, {
        games: arrayUnion(gameDocRef.id),
      });
    } catch (error) {
      console.error(error);
    }
  } else {
    window.alert("Need to be loged in to create a new game!");
  }
};

export const editGame = async (
  newGameName,
  newGameDescription,
  newGameRules,
  id,
  selectedCategories,
  newGameTimer
) => {
  try {
    const gameDocRef = doc(db, "games", id);
    await updateDoc(gameDocRef, {
      name: newGameName,
      description: newGameDescription,
      rules: newGameRules,
      categories: selectedCategories,
      estimatedTime: newGameTimer,
    });
  } catch (error) {
    console.error(error);
  }
};

export const deleteGame = async (id) => {
  try {
    await deleteDoc(doc(db, "games", id));
    console.log("Document deleted with ID:", id);
  } catch (error) {
    console.error("Error deleting document:", error);
  }
};

export const addToFav = async (id) => {
  try {
    const userDocRef = doc(db, "users", auth.currentUser.uid);
    await updateDoc(userDocRef, {
      favGames: arrayUnion(id),
    });
  } catch (error) {
    console.error("Error adding favgame: ", error);
  }
};

export const deleteFavGame = async (gameId) => {
  if (auth.currentUser !== null) {
    try {
      const userDocRef = doc(db, "users", auth.currentUser.uid);
      await updateDoc(userDocRef, {
        favGames: arrayRemove(gameId),
      });
      console.log("Game removed from favorites with ID:", gameId);
    } catch (error) {
      console.error("Error removing favGame: ", error);
    }
  } else {
    console.log("No user logged in!");
  }
};

export const getLegalCategories = async () => {
  const docRef = doc(db, "legalCategories", "aZvsIRJ0DbQYE2a5HAXj");
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data().legalCategories;
  } else {
    console.log("No such document!");
    return;
  }
};
