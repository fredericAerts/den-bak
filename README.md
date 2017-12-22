# nazka mapps - Legal Pages

## Deployment

Put the contents of the build folder on a server

## Development
### Requirements

* [Gulp](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md)

### Getting Started

#### 1. Git clone this project:

```sh
git clone https://github.com/nazka/nazka.cookieservice.git
```

#### 2. In terminal, navigate to legal_pages/ folder of project

#### 3. Install node dev dependencies listed from package.json:

```sh
$ npm install
```

#### 4. Run project:

```sh
$ npm start
```

This will start gulp default task, building the project, starting up a server, livereload etc...

#### 4. Build project:

```sh
$ npm run build
```

This will start gulp build task, producing all required assets for the build folder (css, scripts, img, fonts, ...).

See [gulp](gulp/) folder for more information

### Coding guidelines

#### JavaScript
- [eslint](.eslintrc)

## TODO: Implement "Disable All Cookies"

When a user clicks the "Disable All Cookies" in our Cookie Policy, we need to remove all cookies from our domains.

### Proposal on how to implement this

#### 1. When "Disable All Cookies" button is clicked, a request is sent to each nazka mapps website/domain to remove all cookies that they have set in the past

#### 2. All our websites (aircheckr.com, nostalgeo.be, ...) should allow cross-origin requests from domain name of Nazka Legal Pages website, and respond to their request by removing cookies they have set in the past

The "Disable All Cookies" button click handler can be found [here](src/js/app/remove-all-cookies.js)
