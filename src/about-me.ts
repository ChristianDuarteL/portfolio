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
			padding: 3em 0em;
			box-sizing: border-box;
            max-width: 1180px;
			gap: 2em;
        }
		@media screen and (max-width: 910px){
			section{
				grid-template-columns: 1fr;
			}
			.first-section{
				grid-row: 2;
			}
		}
    `
  ];

  render() {
    return html`
        <section>
			<div class="first-section">
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
