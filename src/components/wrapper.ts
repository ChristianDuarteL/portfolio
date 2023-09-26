import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ScrollData, ScrollEventElement, ScrollWatcher } from '../helpers/ScrollWatcher';
import { styleMap } from 'lit/directives/style-map.js';
import { clamp } from '../helpers/math';

@customElement('cd-wrapper')
export class Wrapper extends LitElement {
    
    static styles = [
        css`
        :root{
            display: flex;
            align-items: center;
        }
        
        *{
            margin: 0;
            padding: 0;
        }
        
        a, ::slotted(a) {
            text-decoration: inherit;
            color: inherit;
        }
        
        header{
            position: fixed;
            justify-content: center;
            width: 100%;
            color: var(--text-color-header);
            background-color: var(--header-bg);
            backdrop-filter: var(--header-filter);
        }
        
        header .header-wrapper{
            display: flex;
            width: 80%;
            max-width: 1180px;
            margin: auto;
            align-items: center;
            justify-content: space-between;
        }
        
        header a,  ::slotted(a) {
            padding: 1em!important;
        }
        
        nav{
            display: flex;
            justify-content: center;
        }

		@media screen and (max-width: 640px){
			header .header-wrapper{
				flex-direction: column;
			}
            nav{
                flex-grow: 1;
            }
		}
        `
    ];
    
    scrollEventBound: ScrollEventElement | null = null;
    
    connectedCallback(): void {
        super.connectedCallback(); 
        this.scrollEventBound = ScrollWatcher.instance.addHandler(this.on_scroll.bind(this));
    }
    
    disconnectedCallback(): void {
        this.scrollEventBound && ScrollWatcher.instance.removeHandler(this.scrollEventBound);
        super.disconnectedCallback();
    }
    
    @property({ type: Number })
    navGrow: number = 1;
    
    @property({ type: String })
    logo_display: string = "none";
    
    @property({ type: Number })
    logo_opacity: number = 0;
    
    @property({ type: String })
    logo_height: string = '0';
    
    @property({ type: String })
    header_flex: string = "space-between";
    
    on_scroll(a: ScrollData) {
        this.navGrow = Math.max(1 - a.relative_screen_y * 2, 0);
        this.logo_opacity = clamp((a.relative_screen_y - .25) / .25, 0, 1);
        this.logo_display = a.relative_screen_y > .25 ? 'inline-block' : 'none';
        this.logo_height = a.relative_screen_y > .25 ? clamp((a.relative_screen_y - .25) / .25, 0, 1) * 3.5 + 'em' : '0';
        this.header_flex = a.relative_screen_y > .25 ? 'space-between' : 'flex-end';
    }
    
    render() {
        return html`
        <header>
            <div class="header-wrapper" style=${styleMap({justifyContent: this.header_flex})}>
                <div class="main-link" style=${styleMap({height: this.logo_height})}>
                    <a href="#home" style=${styleMap({display: this.logo_display, opacity: this.logo_opacity})} href="/">Christian Duarte</a>
                </div>
                <nav style=${styleMap({flexGrow: this.navGrow})}>
                    <slot name="links"></slot>
                </nav>
            </div>
        </header>
        <slot></slot>
        `
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'cd-wrapper': Wrapper
    }
}
