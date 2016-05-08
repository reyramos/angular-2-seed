### LessJs
Use lessc command to compile less file without extension
```sh
   lessc app.component.less app.component
```
Using the compiled less filed to be require within the @Component style tag.

### Angular 2
Assign styles to a component they are scoped to that specific component. Our styles will only apply to our AppComponent and won't "leak" to the outer HTML.

```ts

@Component({
	selector: 'my-app',
	template: `... `,
	styles: [function () {
		return require('raw!./less/app.component')
	}()],
	directives: [HeroDetailComponent]
})
```