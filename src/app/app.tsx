import { Component, h } from '@stencil/core';
import { theme as scania } from 'scania-theme';
import '@stencil/router';

import { Main } from './components/main/main';
import { addTheme } from '../helpers/utils';

addTheme(scania);

@Component({
  tag: 'app-root',
  styleUrl: 'app.scss'
})
export class App {

  render() {
    return [
      <c-theme name="scania"></c-theme>,
      <app-navigation></app-navigation>,
      <Main />
    ];
  }
}
