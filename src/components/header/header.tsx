import { Component, Prop, State, Element, Watch } from '@stencil/core';

import { store, actions } from '../../global';
import * as themes from '../../tmp/c-header';

@Component({
  tag: 'c-header',
  styleUrl: 'header.scss',
  shadow: true
})
export class Header {
  @Prop() theme: string;
  @Prop() siteName: string;
  @Prop() siteUrl = '/';
  @Prop() items: any = [];
  @Prop() primaryItems: any;
  @Prop() secondaryItems: any;

  @State() currentTheme: string = this.theme || store.getState().theme.name;
  @State() navigationOpen = store.getState().navigation.open;
  // There should be a better way of solving this, either by "{ mutable: true }"
  // or "{ reflectToAttr: true }" or harder prop typing Array<Object>
  @State() _items: object[] = [];
  @State() navigationSlot: any;

  @Element() el: HTMLElement;

  @Watch('items')
  setItems(items) {
    this._items = Array.isArray(items) ? items : JSON.parse(items);
  }

  @Watch('theme')
  updateTheme(name) {
    this.currentTheme = name;
  }

  toggleNavigation(open) {
    store.dispatch({ type: actions.TOGGLE_NAVIGATION, open });
  }

  componentWillLoad() {
    store.subscribe(() => {
      this.currentTheme = store.getState().theme.name
      this.navigationOpen = store.getState().navigation.open;
    });

    this.setItems(this.items);
  }

  componentDidLoad() {
    const elem = this.el.shadowRoot.querySelector('slot[name=navigation');
    elem.addEventListener('slotchange', e => this.getNavSlotItems(e.target) );

    this.getNavSlotItems(elem);
  }

  getNavSlotItems(node) {
    this.navigationSlot = (node.assignedNodes() || node.children || [])[0];
  }

  render() {
    return [
      this.currentTheme ? <style>{ themes[this.currentTheme] }</style> : '',

      <nav class='navbar navbar-expand-lg navbar-default'>
        {this.primaryItems || this.secondaryItems || this.navigationSlot ?
          <button
            class='navbar-toggler collapsed'
            type='button'
            onClick={() => this.toggleNavigation(!this.navigationOpen) }>
            <span class='navbar-toggler-icon'></span>
          </button>
        : ''}

        <a href={ this.siteUrl } class='navbar-brand collapse'></a>
        <strong class='navbar-title'>{ this.siteName }</strong>

        <div class='collapse navbar-collapse'>
          <ul class='navbar-nav ml-auto'>
            { this._items.map(item => (
              <li class='nav-item'>
                <a class='nav-link' href={item['location']}>
                  <span>{item['text']}</span>
                </a>
              </li>
            )) }

            <slot name="items" />
          </ul>
        </div>
      </nav>,

      <a href={ this.siteUrl } class='navbar-symbol'></a>,

      <slot name="navigation" />,

      (this.primaryItems || this.secondaryItems
        ? <c-navigation primary-items={this.primaryItems} secondary-items={this.secondaryItems}></c-navigation>
        : '')
    ];
  }
}
