import Interface from 'interface.json';
import Core from '_core.js';
import './global-nav.scss';
import Template from './global-nav.html';
import SideNav from './side-nav/side-nav.js';
import TopNav from './top-nav/top-nav.js';
import SubNav from './sub-nav/sub-nav.js';

/**
 * Creates an GlobalNav
 *
 * @class
 */

class GlobalNav extends Core {
  constructor(options) {
    super(options);
    this._render(Template, options);
  }

  addSideNav(sideNavInstance) {
    if (sideNavInstance instanceof SideNav) {
      this.mountPartialToComment('SIDENAV', sideNavInstance);
    }
  }

  addTopNav(topNavInstance) {
    if (topNavInstance instanceof TopNav) {
      this.mountPartialToComment('TOPNAV', topNavInstance);
    }
  }

  addSubNav(subNavInstance) {
    if (subNavInstance instanceof SubNav) {
      this.mountPartialToComment('SUBNAV', subNavInstance);
    }
  }

  addSlot(slotElement) {
    this.mountPartialToComment('SLOT', slotElement);
  }

  showSideNav() {
    this.el.classList.add('hig__global-nav--open');
  }

  hideSideNav() {
    this.el.classList.remove('hig__global-nav--open');
  }

  onHoverOutside(fn) {
    return this._attachListener('hover', '.hig__global-nav__container', this.el, fn);
  }
}

GlobalNav._interface = Interface.components.GlobalNav;
GlobalNav._defaults = {};
GlobalNav._partials = {
  SideNav,
  TopNav,
  SubNav
};

export default GlobalNav;
