import { Component, h } from '@stencil/core';

@Component({
  tag: 'c-content',
  styleUrl: 'content.scss',
  shadow: true
})
export class Content {

  render() {
    return (
      <div>
        <slot></slot>
      </div>
    );
  }
}
