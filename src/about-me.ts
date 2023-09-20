import { LitElement, css, html } from 'lit'
import { customElement } from 'lit/decorators.js'

@customElement('cd-about-me')
export class AboutMe extends LitElement {

  static styles = [
    css`
        section{
            display: grid;
			grid-template-columns: 1fr 1fr;
			align-items: center;
            justify-items: center;
            min-height: 100vh;
            width: 80%;
            margin: auto;
            max-width: 1180px;
        }
    `
  ];

  render() {
    return html`
        <section>
			<div>
				<slot></slot>
			</div> 
			<slot name="picture"></slot>
        </section>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cd-about-me': AboutMe
  }
}
