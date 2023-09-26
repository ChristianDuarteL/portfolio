import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('cd-technology')
export class Tecnology extends LitElement {

    @property()
    image?: string;

    @property()
    tech?: string;

    static styles = [
        css`
            :host{
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                box-sizing: border-box;
                padding: .5em;
                gap: .5em;
                width: 200px;
            }
            img{
                height: 4em;
                max-width: 100%;
                object-fit: contain;
            }
        `
    ];

    render() {
        return html`
            ${ this.image && html`<img src=${this.image}>`}
            <span>${this.tech}</span>
        `
    }
}

declare global {
  interface HTMLElementTagNameMap {
    'cd-technology': Tecnology
  }
}
