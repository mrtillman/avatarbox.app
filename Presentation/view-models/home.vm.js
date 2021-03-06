import { NavBarVM } from "./navbar.vm";

export class HomeVM {
  constructor() {
    this.title = "Home | Avatar Box";
    this.navbar = new NavBarVM();
    this.formAction = "/home/sign-in";
    this.validationMessage = null;
    this.prompt = null;
    this.user = null;
  }
  get User() {
    return this.user;
  }
  set User(value) {
    this.user = value;
    this.navbar.user = value;
  }
  toObject() {
    return JSON.parse(JSON.stringify(this));
  }
}
