const NavBarView = require("./_navbar");

class CalendarView {
  constructor() {
    this.images = [];
    this.navbar = new NavBarView();
    this.navbar.isCosmetic = false;
    this.navbar.isTransparent = false;
    this.isEnabled = false;
  }
}

module.exports = CalendarView;