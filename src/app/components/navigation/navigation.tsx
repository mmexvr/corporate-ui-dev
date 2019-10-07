import { Component, h, State } from '@stencil/core';

import { routes } from '../../routes';

// export const Navigation = () => {

//   let items = routes.filter(item => item.path);
//   let filtered = items;
//   let filter = undefined;

//   let filterItems = function(event) {
//     filtered = items.filter(item => item.name.indexOf(event.target.value) > -1);
//     console.log(filtered)
//   }

//   return [
//     <nav>
//       <input type="text" value={filter} onInput={(event) => filterItems(event)} />,
//       { filtered.map(item =>
//         <stencil-route-link url={item.path} activeClass="active" slot="primary-items">{item.name}</stencil-route-link>
//       ) }
//     </nav>
//   ];
// }

@Component({
  tag: 'app-navigation',
  styleUrl: 'navigation.scss',
  // shadow: true
})
export class AppNavigation {

  @State() items = routes.filter(item => item.path);
  @State() filtered = this.items;
  @State() filter;

  filterItems(event) {
    this.filtered = this.items.filter(item => item.name.indexOf(event.target.value) > -1);
  }

  render() {
    return [
      <input type="text" value={this.filter} onInput={(event) => this.filterItems(event)} />,
      <nav>
        { this.filtered.map(item =>
          <stencil-route-link url={item.path} activeClass="active" slot="primary-items">{item.name}</stencil-route-link>
        ) }
      </nav>
    ];
  }
}
