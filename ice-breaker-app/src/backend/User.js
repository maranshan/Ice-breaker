export class User {
  constructor(email, brukernavn, uid, games, favGames) {
    this.email = email;
    this.brukernavn = brukernavn;
    this.uid = uid;
    this.games = games;
    this.favGames = favGames;
  }

  getEmail() {
    return this.email;
  }

  getBrukernavn() {
    return this.brukernavn;
  }

  getUID() {
    return this.uid;
  }

  getGames() {
    return this.games;
  }

  getFavGames() {
    return this.favGames;
  }
  getCategories() {
    return this.categories;
  }
}
