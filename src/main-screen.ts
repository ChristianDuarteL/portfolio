import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ScrollData, ScrollEventElement, ScrollWatcher } from './ScrollWatcher';
import { styleMap } from 'lit/directives/style-map.js';

@customElement('cd-main-screen')
export class MainScreen extends LitElement {

  static styles = [
    css`
      main{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        min-height: 100vh;
      }
      
      *{
        margin: 0;
        padding: 0;
      }
      
      h1{
        font-size: 4em;
        color: var(--text-color-400);
      }

      h1 em{
        background: var(--text-gradient);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;      
      }

      h2{
        font-size: 1.5em;
        color: var(--text-color-500);
      }
    `
  ];

  scrollEventBound: ScrollEventElement | null = null;

  connectedCallback(): void {
    super.connectedCallback(); 
    this.scrollEventBound = ScrollWatcher.instance.addHandler(this.on_scroll.bind(this), this);
  }

  disconnectedCallback(): void {
    this.scrollEventBound && ScrollWatcher.instance.removeHandler(this.scrollEventBound);
    super.disconnectedCallback();
  }
  static i = 0;

  @property({ type: Number })
  nameOpacity = 1;

  @property({ type: Number })
  subtitleOpacity = 1;

  on_scroll(a: ScrollData) {
    this.nameOpacity = Math.max(0, 1 - (a.relative_screen_y * 4));
    this.subtitleOpacity = Math.max(0, 1 - (a.relative_screen_y * 3));
  }

  render() {
    return html`
      <main>
        <h1 style=${styleMap({opacity: this.nameOpacity})}>Soy <em>Christian Duarte</em></h1>
        <h2 style=${styleMap({opacity: this.subtitleOpacity})}>Estudiante de ingeniería de software</h2>
      </main>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cd-main-screen': MainScreen
  }
}
