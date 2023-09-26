export type ScrollHandler = (data: ScrollData) => any;

export interface ScrollEventElement {
    f: ScrollHandler;
    element: HTMLElement | null;
}

export interface ScrollData{
    height: number;
    width: number;
    relative_y: number;
    relative_x: number;
    relative_screen_y: number;
    relative_screen_x: number;
}

export class ScrollWatcher{
    private static _instance: ScrollWatcher | null = null;
    private eventSet: Set<ScrollEventElement>;
    private boundedF: (ev: Event) => any;

    private constructor() {
        if(ScrollWatcher._instance) ScrollWatcher._instance.dispose();
        ScrollWatcher._instance = this;
        this.eventSet = new Set();
        window.addEventListener('scroll', this.boundedF = this.onScroll.bind(this))
    }

    getScrollData(e: HTMLElement): ScrollData {
        const scroll_x_amount = window.scrollX - e.offsetLeft;
        const scroll_y_amount = window.scrollY - e.offsetTop;
        return {
            height: document.body.clientHeight,
            width: document.body.clientWidth,
            relative_y: scroll_y_amount / (e.offsetHeight - document.documentElement.clientHeight),
            relative_x: scroll_x_amount / (e.offsetWidth - document.documentElement.clientWidth),

            relative_screen_y: scroll_y_amount / document.documentElement.clientHeight,
            relative_screen_x: scroll_x_amount / document.documentElement.clientWidth,
        }
    }

    onScroll() {
        const scroll_data: Map<HTMLElement, ScrollData> = new Map();
        const screen_scroll_data = {
            width: document.body.clientWidth,
            height: document.body.clientHeight,
            relative_x: window.scrollX / (document.body.scrollWidth - document.documentElement.clientWidth),
            relative_y: window.scrollY / (document.body.scrollHeight - document.documentElement.clientHeight),
            relative_screen_x: window.scrollX / document.documentElement.clientWidth,
            relative_screen_y: window.scrollY / document.documentElement.clientHeight,
        };
        this.eventSet.forEach(e => {
            const data: ScrollData = e.element == null ? screen_scroll_data : scroll_data.get(e.element) ?? this.getScrollData(e.element);
            e.f(data);
        })
    }

    dispose(){
        window.removeEventListener('scroll', this.boundedF);
    }

    static get instance() {
        return this._instance ?? new ScrollWatcher();
    }

    addHandler(f: ScrollHandler, bound: HTMLElement | null = null){
        const bound_data = Object.freeze({
            f,
            element: bound
        });
        this.eventSet.add(bound_data);
        return bound_data;
    }

    removeHandler(e: ScrollEventElement) {
        this.eventSet.delete(e);
    }
}