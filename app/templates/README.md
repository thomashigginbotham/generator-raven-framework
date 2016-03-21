# Raven Framework

Raven is a flexible, pluggable framework that is used to build everything from the most simplistic marketing websites to highly advanced web applications. At its core is a finely tuned grid system used for creating responsive layouts using Sass. It’s extensible architecture makes it easy to integrate with other systems, so you can add in whatever you need, whether it be a Grunt/Gulp build system, a unit testing environment, or an opinionated JavaScript framework. Here are some of the “add-ins” currently in development:

* **Raven Dev Environment** – Work in real-time with Sass auto-compilation and LiveReload, then build optimized code for production environments.
* **Raven Pattern Library** – Add a style guide and auto-updated documentation to your project, based on the principles of atomic design.
* **Raven UI** – Take advantage of common interfaces like carousels, accordions, off-canvas menus, and more.
* **Raven Forms** – Improve your form layouts and styles.
* **Raven RequireJS** – Create AMD-compliant JavaScript modules and keep your code organized.
* **Raven Unit Tests** – Write unit tests with Karma and Jasmine. Then automate them with Grunt or Gulp using the PhantomJS headless browser.
* **Raven Code Collaboration** – Specify EditorConfig rules and common linting configurations for your team.
* **Raven High-DPI Sprites** – Use the Compass sprite map generator to create separate sprite maps for low- and high-DPI images.

...and more to come.

## Getting Started

Use your preferred method to download the files.

* Yeoman: `npm install -g generator-raven-framework` then `yo raven-framework`
* Bower: `bower install raven-framework`
* NPM: `npm i raven-framework`
* Git: `git clone https://github.com/thomashigginbotham/raven-framework.git`
* [Download a ZIP file](https://github.com/thomashigginbotham/raven-framework/archive/master.zip)

Regardless of how you get the files, you’ll see a **demo.html** file. Open it in your browser and your code editor for more details on using Raven.

## Using the Grid system

Creating grids should be easy. If you have to remember to add an `end` class to the last element in a row, or if you have to include additional `<div>` tags in order to apply a simple background color, then your grid system is not making things easy for you. Doing more with less code should be the mantra, and Raven delivers.

### Rows and Columns

Use the `row()` mixin when you need a row of columns.

HTML
```
<section class="authors">
    <div class="author-featured">Roald Dahl</div>
    <div class="author">L. Frank Baum</div>
    <div class="author">J. K. Rowling</div>
</section>
```

SCSS
```
.authors {
    @include row(50% 25% 25%);
}
```

In the example above, we will have a row with three columns, each with the name of an author. The first column will fill half the page (50%). The two remaining columns will each take up a quarter of the page (25% each).

Even more impressive, you can mix units! That’s, right — try out something like `@include row(200px 100% 200px)` to get that perfect layout.

### Galleries

The `gallery()` mixin is for creating multiple rows and columns where the columns are all the same width (think of a thumbnail image grid).

HTML
```

<ul class="comedian-thumbnails">
    <li><img src="robin-williams.jpg" alt="Robin Williams"/></li>
    <li><img src="richard-pryor.jpg" alt="Richard Pryor"/></li>
    <li><img src="george-carlin.jpg" alt="George Carlin"/></li>
    <li><img src="jim-carrey.jpg" alt="Jim Carrey"/></li>
</ul>

```

SCSS
```
ul {
    @include gallery(2);
}
```

The above will create a 2-column grid of image thumbnails. If you continue to add thumbnails, they will automatically wrap to the next row, keeping the 2-column layout.

For additional grid features, see the **demo.html** file and the Sass files.

### Compiling Your Sass

Raven uses Sass to provide a number of advantages — semantic HTML classes, no bloat from unused CSS, and of course, the variables, functions, and mixins. See the Sass website for instructions on installing Sass.

For more advanced developers, take advantage of the minimal Gulp or Grunt config files to compile your Sass changes as you work. See the config files for details.

### Copyright/License

Raven Framework is freely available under the [MIT license](https://tldrlegal.com/license/mit-license).
