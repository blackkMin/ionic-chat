import {animate, AnimationTriggerMetadata, state, style, transition, trigger} from "@angular/animations";

export const CustomAnimations: {
    readonly flyInOut: AnimationTriggerMetadata;
} = {
    //cubic-bezier(.23,.24,0,.91)
    flyInOut1: trigger('flyInOut1', [
        state('in', style({top: '0',  })),
        state('out', style({top: '-44px', })),
        transition('* => *', animate(`250ms ease`))
    ]),
    flyInOut2: trigger('flyInOut2', [
        state('in', style({position: 'relative', top: '0',  })),
        state('out', style({position: 'relative', top: '-56px', })),
        transition('* => *', animate(`250ms ease`))
    ]),
}