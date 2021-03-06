import React, { useState } from "react";
import MenuButton from "./menu-button";
import classNames from "classnames";

function NavBar({ model }) {
  const menuButton = model.user ? <MenuButton user={model.user} /> : null;
  const logoUrl = model.pathName == "/" ? "https://www.avatarbox.io" : "/";
  return (
    <nav
      className={classNames("navbar", {
        "is-centered": model.isCosmetic,
        "is-transparent": model.isTransparent,
        "has-background-grey-darker": !model.isTransparent,
      })}
    >
      <div className="container">
        <div className="navbar-brand">
          <a className="navbar-item is-transparent" href={logoUrl}>
            <img
              src="https://www.avatarbox.io/images/avatarbox.png"
              alt="Logo"
            />
          </a>
          <span
            data-target="navbar-menu"
            className={classNames("navbar-burger burger script-enabled cloak", {
              "is-hidden": model.isCosmetic || !model.user,
            })}
          >
            {menuButton}
          </span>
          <noscript>
            <a
              href="#menu"
              data-target="navbar-menu"
              className={classNames("navbar-burger", "burger", "noscript", {
                "is-hidden": model.isCosmetic || !model.user,
                "has-background-grey-darker": !model.isTransparent,
              })}
            >
              {menuButton}
            </a>
          </noscript>
        </div>
        <div
          id="navbar-menu"
          className={classNames(
            "navbar-menu",
            "has-text-centered",
            "is-transparent",
            {
              "is-hidden": model.isCosmetic || !model.user,
              "has-background-grey-darker": !model.isTransparent,
            }
          )}
        >
          <div className="navbar-end">
            <span className={model.user ? "navbar-item" : "is-hidden"}>
              <a className="has-text-white" href="/calendar">
                Calendar
              </a>
            </span>
            <span className={model.user ? "navbar-item" : "is-hidden"}>
              <a className="has-text-white" href="/avatars">
                Avatars
              </a>
            </span>
            <span className={model.user ? "navbar-item" : "is-hidden"}>
              <a className="has-text-white" href="/api/sign-out">
                Sign Out
              </a>
            </span>
            <div className={model.user ? "avatar-icon" : "is-hidden"}>
              {menuButton}
            </div>
            <noscript>
              <a href="#" className="button is-transparent">
                <span className="navbar-burger burger is-active noscript">
                  <span></span>
                  <span></span>
                  <span></span>
                </span>
              </a>
            </noscript>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
