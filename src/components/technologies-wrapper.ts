import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('cd-technologies-wrapper')
export class TecnologiesWrapper extends LitElement {

    @property()
    image?: string;

    @property()
    tech?: string;

    static styles = [
        css`
            :host{
                display: flex;
                align-items: center;
                flex-direction: column;
                gap: 2em;
            }
            .technologies{
                display: flex;
                align-items: center;
                justify-content: center;
                flex-wrap: wrap;
                gap: 1em 2em;
            }
        `
    ];

    render() {
        return html`
            <slot name="title"></slot>
            <div class="technologies">
                <slot></slot>
            </div>
        `
    }
}

declare global {
  interface HTMLElementTagNameMap {
    'cd-technologies-wrapper': TecnologiesWrapper
  }
}
