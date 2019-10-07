import { Component, h } from '@stencil/core';

@Component({
  tag: 'v-home',
  styleUrl: 'home.scss'
})
export class Home {

  render() {
    return (
      <section>
        <h1>Home</h1>
        <p>Some text goes here.</p>
        <c-header site-name="App">
          <a href="/global" slot="items">global</a>
        </c-header>
        <c-navigation>
          <a href="/" slot="primary-items">home</a>
          <a href="/info" slot="primary-items">info</a>
          <a href="/user" slot="secondary-items">user</a>
        </c-navigation>
        <c-header site-name="Cool">
          <a href="/global" slot="items">global</a>
          <a href="/contact" slot="items">contact</a>
        </c-header>
        <c-navigation>
          <a href="/" slot="primary-items">home</a>
          <a href="/info" slot="primary-items">info</a>
          <a href="/user" slot="secondary-items">user</a>
        </c-navigation>
        <c-header site-name="Banan">
          <a href="/global" slot="items">global</a>
          <a href="/contact" slot="items">contact</a>
        </c-header>
        <c-navigation>
          <a href="/" slot="primary-items">home</a>
          <a href="/info" slot="primary-items">info</a>
          <a href="/user" slot="secondary-items">user</a>
        </c-navigation>
        <c-header site-name="Palm">
          <a href="/global" slot="items">global</a>
        </c-header>
        <c-navigation>
          <a href="/" slot="primary-items">home</a>
          <a href="/info" slot="primary-items">info</a>
          <a href="/user" slot="secondary-items">user</a>
        </c-navigation>
        <c-header site-name="Andreas">
          <a href="/global" slot="items">global</a>
          <a href="/contact" slot="items">contact</a>
        </c-header>
        <c-navigation>
          <a href="/" slot="primary-items">home</a>
          <a href="/info" slot="primary-items">info</a>
          <a href="/user" slot="secondary-items">user</a>
        </c-navigation>
        <c-header site-name="Application">
          <a href="/global" slot="items">global</a>
        </c-header>
        <c-navigation>
          <a href="/" slot="primary-items">home</a>
          <a href="/info" slot="primary-items">info</a>
          <a href="/user" slot="secondary-items">user</a>
        </c-navigation>
        <c-footer></c-footer>
      </section>
    );
  }
}
