import { Component, h } from '@stencil/core';

@Component({
  tag: 'v-none',
  styleUrl: 'none.scss'
})
export class None {

  render() {
    return (
      <section>
        <h1>Not found</h1>
        <p>This page does not exist.</p>
      </section>
    );
  }
}
