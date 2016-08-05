import {Component, Input} from '@angular/core';

//library
import {Hero} from '../class/Hero';


@Component({
    selector: 'my-hero-detail',
    template: require('./hero-detail.component.html')
})


export class HeroDetailComponent {
    @Input()
    hero:Hero;
}
