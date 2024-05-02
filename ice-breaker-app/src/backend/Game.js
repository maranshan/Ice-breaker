import React from "react";

export class Game {
  constructor(name, description, rules, owner, id, categories, estimatedTime) {
    this.name = name;
    this.description = description;
    this.rules = rules;
    this.owner = owner;
    this.id = id;
    this.categories = categories;
    this.estimatedTime = estimatedTime;
  }

  getName() {
    return this.name;
  }

  getDescription() {
    return this.description;
  }

  printRules() {
    let string = "";
    for (let index = 0; index < this.rules.length - 1; index++) {
      string += this.rules[index] + "\n";
    }
    string += this.rules[this.rules.length - 1];
    return string;
  }

  getRules() {
    return this.rules;
  }

  getOwner() {
    return this.owner;
  }

  getId() {
    return this.id;
  }

  getCategories() {
    return this.categories;
  }

  getEstimatedTime() {
    return this.estimatedTime;
  }
}
