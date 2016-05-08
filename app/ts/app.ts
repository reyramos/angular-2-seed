/**
 * Created by reyra on 4/17/2016.
 */

import {Component} from '@angular/core';
import {enableProdMode} from '@angular/core';
import {bootstrap} from '@angular/platform-browser-dynamic';

// enableProdMode();
/*
 * Webpack
 */
require('../css/styles.less');


/**
 * @ngdoc overview
 * @name app.directive:reddit
 * @restrict E
 *
 * @description
 * This is a test document
 *
 * @example
 *
 * ```html
 * <reddit></reddit>
 * ```
 *
 */

/*
 * Components
 */
import {ArticleComponent} from './components/ArticleComponent';
import {Article} from './components/Article';


@Component({
	selector: 'reddit',
	directives: [ArticleComponent],
	template: `
    <form class="ui large form segment">
      <h3 class="ui header">Add a Link</h3>

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
        Submit link
      </button>
    </form>

    <div class="ui grid posts">
      <reddit-article
        *ngFor="#article of sortedArticles()"
        [article]="article">
      </reddit-article>
    </div>
  `
})

class RedditApp {
	articles:Article[];

	constructor() {
		this.articles = [
			new Article('Angular 2', 'http://angular.io', 3),
			new Article('Fullstack', 'http://fullstack.io', 2),
			new Article('Angular Homepage', 'http://angular.io', 1),
		];
	}

	addArticle(title:HTMLInputElement, link:HTMLInputElement):void {
		console.log(`Adding article title: ${title.value} and link: ${link.value}`);
		this.articles.push(new Article(title.value, link.value, 0));
		title.value = '';
		link.value = '';
	}

	sortedArticles():Article[] {
		return this.articles.sort((a:Article, b:Article) => b.votes - a.votes);
	}

}

bootstrap(RedditApp);
