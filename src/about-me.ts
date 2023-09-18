import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ScrollData, ScrollEventElement, ScrollWatcher } from './ScrollWatcher';
import { styleMap } from 'lit/directives/style-map.js';
import { clamp } from './math';

@customElement('cd-about-me')
export class AboutMe extends LitElement {

  static styles = [
    css`
        section{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
        }
    `
  ];

  render() {
    return html`
        <section>
            
        </section>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cd-about-me': AboutMe
  }
}
