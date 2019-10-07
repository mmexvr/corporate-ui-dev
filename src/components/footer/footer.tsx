import {
  Component, h, Prop, State, Element, Watch,
} from '@stencil/core';

import { ITheme } from '../../helpers/utils';

@Component({
  tag: 'c-footer',
  styleUrl: 'footer.scss',
  shadow: true,
})
export class Footer implements ITheme {
  @Prop({ context: 'store' }) ContextStore: any;

  /** Per default, this will inherit the value from c-theme name property */
  @Prop({ mutable: true }) theme: string;

  /** Change default copyright text */
  @Prop() text = 'Copyright © Scania 2019';

  /** Set footer links */
  @Prop({ mutable: true }) items: any;

  /** Add social media icons */
  @Prop({ mutable: true }) socialItems: any;

  @State() store: any;

  @State() show = false;

  @State() initialSlot = '';

  @State() tagName: string;

  @State() currentTheme: object;

  @Element() el: HTMLElement;

  @Watch('items')
  setItems(items) {
    this.items = this.parse(items);
  }

  @Watch('socialItems')
  setSocialItems(items) {
    this.socialItems = this.parse(items);
  }

  @Watch('theme')
  setTheme(name = undefined) {
    this.theme = name || this.store.getState().theme.name;
    this.currentTheme = this.store.getState().themes[this.theme];
  }

  componentWillLoad() {
    this.store = this.ContextStore || (window as any).CorporateUi.store;

    this.setTheme(this.theme);
    this.setItems(this.items);
    this.setSocialItems(this.socialItems);

    this.store.subscribe(() => this.setTheme());
  }

  componentDidLoad() {
    this.initialSlot = this.el.innerHTML;
    this.tagName = this.el.nodeName.toLowerCase();
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

  render() {
    return [
      this.currentTheme ? <style>{ this.currentTheme[this.tagName] }</style> : '',

      <nav class='navbar navbar-expand-lg navbar-default'>
        <strong class='navbar-brand'></strong>

        <nav class='social-items'>

          { this.socialItems.map(item => (
            <a { ...item } class='social-item'>
              <c-icon name={item.icon} />
            </a>
          )) }

          <slot name='social-items' />
        </nav>
        { this.initialSlot.indexOf('slot="items"') > 0 || this.items
          ? <nav class='navbar-nav'>
            { this.items.map((item: any) => {
              item.class = this.combineClasses(item.class);
              return <a { ...item }></a>;
            }) }

            <slot name='items' />
          </nav>
          : '' }
        <p>
          {this.text}
          <slot name='text' />
        </p>
      </nav>,
    ];
  }
}
