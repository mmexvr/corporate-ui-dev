import { Component, h } from '@stencil/core';

@Component({
  tag: 'v-profile',
  styleUrl: 'profile.scss'
})
export class Profile {

  render() {
    return (
      <section>
        <h1>Profile</h1>
        <p>Some text goes here.</p>
      </section>
    );
  }
}
