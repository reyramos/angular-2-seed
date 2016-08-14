import { Component }          from '@angular/core';

import './rxjs-extensions.ts';

require('../css/styles.css');

@Component({
    selector: 'my-app',
    template: require('./app.component.html'),
    styles: [require('./app.component.less')]
})


export class AppComponent {
    title = 'Tour of Heroes';
}
