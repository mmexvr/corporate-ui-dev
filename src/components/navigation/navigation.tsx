import {
  Component, h, Prop, State, Element, Watch, Listen,
} from '@stencil/core';

import { actions } from '../../store';
import { ITheme } from '../../helpers/utils';

@Component({
  tag: 'c-navigation',
  styleUrls: [
    '../../components.scss',
    'navigation.scss'
  ],
  shadow: true,
})
export class Navigation implements ITheme {
  @Prop({ context: 'store' }) ContextStore: any;

  /** Per default, this will inherit the value from c-theme name property */
  @Prop({ mutable: true }) theme: string;

  /** Set the orientation for the navigation (vertical or horisontal). The default is horisontal navigation. */
  @Prop() orientation = '';

  /** Used to show a text in front of generated items on desktop and add a describing text for navigating back in mobile mode for sub navigation */
  @Prop() caption: string;

  /** Used to dynamically connect current node to a parent item in mobile mode interaction */
  @Prop() target: string;

  /** Option to disable sticky feature */
  @Prop() sticky = true;

  @State() store: any;

  @State() navigationOpen: boolean = true;

  @State() navigationExpanded: string = undefined;

  @State() isSub: boolean;

  @State() tagName: string;

  @State() currentTheme: object;

  @State() parentEl: any;

  @State() navWidth: any;

  @State() scrollPos = 0;

  @State() isIE: boolean;

  @Element() el: HTMLElement;

  @Watch('theme')
  setTheme(name = undefined) {
    this.theme = name || this.store.getState().theme.name;
    this.currentTheme = this.store.getState().themes[this.theme];
  }

  @Listen('scroll', { target: 'window' })
  handleScroll() {
    let isStick = false;
    // try catch is used to avoid error in IE with getBoundingClientRect
    if (this.sticky) {
      try {
        isStick = this.el.getBoundingClientRect().top <= 0;
      } catch (e) { console.log(e); }

      if (!this.isSub) {
        isStick ? this.el.setAttribute('stuck', 'true') : this.el.removeAttribute('stuck');
      }

      if (this.isIE) {
        if (this.el != null) {
          if ((window.pageYOffset || document.documentElement.scrollTop) <= this.scrollPos) this.el.removeAttribute('stuck');
        }
      }
    }
  }

  @Listen('resize', { target: 'window' })
  onResize() {
    this.navWidth = (document.querySelector('c-header') || {} as any).clientWidth;
    if (window.innerWidth < 992) this.el.removeAttribute('style');
  }

  toggleNavigation(open) {
    this.store.dispatch({ type: actions.TOGGLE_NAVIGATION, open });
  }

  toggleSubNavigation(expanded) {
    this.store.dispatch({ type: actions.TOGGLE_SUB_NAVIGATION, expanded });
  }

  componentWillLoad() {
    this.store = this.ContextStore || (window as any).CorporateUi.store;

    this.setTheme(this.theme);

    this.store.subscribe(() => {
      this.navigationOpen = this.store.getState().navigation.open;
      this.navigationExpanded = this.store.getState().navigation.expanded;

      this.setTheme();
    });

    if (this.el) this.isSub = this.el.getAttribute('slot') === 'sub';
  }

  componentDidLoad() {
    if (!this.el) return;

    this.tagName = this.el.nodeName.toLowerCase();

    this.isIE = !document.head.attachShadow;

    this.toggleSubNavigation(undefined);

    if (!document.querySelector('c-header')) this.toggleNavigation(true);
  }

  componentDidUpdate() {
    // fallback of sticky on IE
    if (this.isIE) {
      setTimeout(() => {
        try {
          this.scrollPos = this.scrollPos === 0 ? this.el.getBoundingClientRect().top : this.scrollPos;
        } catch (e) { console.log(e); }
        this.navWidth = (document.querySelector('c-header') || {} as any).clientWidth;
      }, 100);
    }

    // handle click behavior on mobile navigation
    const items: NodeListOf<HTMLAnchorElement> = this.el.querySelectorAll('a');
    for (let i = 0; i < items.length; i += 1) {
      const item = items[i];
      if (item) item.onclick = (event) => this.open(event);
    }
  }

  parse(items) {
    return Array.isArray(items) ? items : JSON.parse(items || '[]');
  }

  combineClasses(classes) {
    return [
      ...(classes || '').split(' '),
      ...['nav-item', 'nav-link'],
    ].join(' ');
  }

  open(ev) {
    const parent = (ev || ev[0]).target.className.includes('parent');
    const dropdown = (ev || ev[0]).target.className.includes('dropdown');
    const target = ev.target.getAttribute('href');
    const node = this.el.querySelector(`c-navigation[target="${target}"]`) || this.el.querySelector('c-navigation');

    if (window.innerWidth > 992) {
      return;
    }

    if ((parent && node) || dropdown) {
      ev.preventDefault ? ev.preventDefault() : (ev.returnValue = false);
      if (!dropdown) this.toggleSubNavigation(target);
    } else if (target === '#close') {
      ev.preventDefault ? ev.preventDefault() : (ev.returnValue = false);
      // TODO: Refactore toggle state in store into one object ( {open, expand} )
      this.toggleSubNavigation('');
    } else {
      this.toggleNavigation(false);
    }
  }

  hostData() {
    return {
      expand: (this.target && this.target === this.navigationExpanded) || (!this.isSub && this.navigationExpanded) ? 'true' : 'false',
    };
  }

  render() {
    if (this.isIE && window.innerWidth > 992) {
      this.el.style.width = `${this.navWidth}px`;
    }

    return [
      this.currentTheme ? <style id="themeStyle">{ this.currentTheme[this.tagName] }</style> : '',

      <div class={`navbar-container ${this.navigationOpen ? ' open' : ''}`}>
        <nav class={`navbar navbar-expand-lg ${this.orientation}`}>
            <nav class='navbar-nav'>
              <slot name="primary-items" />
            </nav>

            <nav class={`navbar-nav ${this.orientation !== 'vertical' ? 'ml-auto' : ''}`}>
              <slot name="secondary-items" />
            </nav>

          <a class='navbar-symbol'></a>
        </nav>

        <slot name="sub" />
      </div>,
    ];
  }
}
