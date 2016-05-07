/**
 * Created by reyra on 4/17/2016.
 */

import {Component} from '@angular/core';
import {bootstrap} from '@angular/platform-browser-dynamic';

/*
 * Webpack
 */
require('../css/styles.less');


@Component({
	selector: 'reddit',
	template: `
	<form class="ui large form segment">
	<h3 class="ui header"> Add Link </h3>
	
	<div class="field">
	<label for="title">Title:</label>
	<input name="title" #newtitle>
</div>
<div class="field">
	<label for="link">Link:</label>
	<input name="link" #newlink>
</div>
<button (click)="addArticle(newtitle, newlink)"
    class="ui positive right floated button">
    Submit Link
</button>
</form>
`
})


class RedditApp {
	constructor() {
	}

	addArticle(title:HTMLInputElement, link:HTMLInputElement):void {
		console.log(`adding article title ${title.value} and link ${link.value}`);
	}
}

bootstrap(RedditApp);
