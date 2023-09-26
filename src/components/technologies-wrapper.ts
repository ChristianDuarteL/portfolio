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
            section{
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                min-height: 100vh;
                width: 80%;
                margin: auto;
                padding: 3em 0em;
                box-sizing: border-box;
                max-width: 1180px;
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
            <section>
                <slot name="title"></slot>
                <div class="technologies">
                    <slot></slot>
                </div>
            </section>
        `
    }
}

declare global {
  interface HTMLElementTagNameMap {
    'cd-technologies-wrapper': TecnologiesWrapper
  }
}
