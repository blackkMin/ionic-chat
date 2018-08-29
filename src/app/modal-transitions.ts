import {Animation, PageTransition} from 'ionic-angular';

export class ModalFromBottomEnter extends PageTransition {
    public init() {
        super.init();
        const ele = this.enteringView.pageRef().nativeElement;

        const backdrop = new Animation(this.plt, ele.querySelector('ion-backdrop'));
        backdrop.beforeStyles({'z-index': 0, 'opacity': 0.5, 'visibility': 'visible'});

        const wrapper = new Animation(this.plt, ele.querySelector('.modal-wrapper'));
        // wrapper.beforeStyles({'width': '73%', 'left': '13%', 'height': '27%', 'top': '36.5%', 'position': 'relative'});
        wrapper.fromTo('opacity', 0.01, 1).fromTo('scale', 1.1, 1);

        const contentWrapper = new Animation(this.plt, ele.querySelector('ion-content.content'));
        // contentWrapper.beforeStyles({'width': '80%', 'height': '60%' });

        this
            .element(this.enteringView.pageRef())
            .duration(300)
            .easing('cubic-bezier(.25, .1, .25, 1)')
            .add(backdrop)
            .add(wrapper)
            .add(contentWrapper);
    }
}


export class ModalFromBottomLeave extends PageTransition {
    public init() {
        super.init();
        const ele = this.leavingView.pageRef().nativeElement;
        const backdrop = new Animation(this.plt, ele.querySelector('ion-backdrop'));
        backdrop.beforeStyles({'visibility': 'hidden'});

        const wrapper = new Animation(this.plt, ele.querySelector('.modal-wrapper'));
        wrapper.fromTo('opacity', 0.99, 0).fromTo('scale', 1, 0.9);

        this
            .element(this.leavingView.pageRef())
            .duration(300)
            .easing('cubic-bezier(.25, .1, .25, 1)')
            .add(backdrop)
            .add(wrapper);
    }
}
