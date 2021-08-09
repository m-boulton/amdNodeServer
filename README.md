# Amd Product Website

---

## Core Concept for the project :

<!-- - Mobile first design
- Load all Content and Navigation dynamically using fetch requests
- Use strong Asynchronous event handling and REST API's
- Use SCSS files for styling and a SASS compiler
- Use EcmaScript 2015+ concepts in Javascript
- Institute a working contact form that POST's to a server for backend handling
- Maintain a Lighthouse score for all pages of above 90
- Use multiple GIT Branches for Continuous Integration/Continuous Developement -->

---

## Description

### Single Page Renders Dynamically
<!-- This website was my first fully functioning product display website that implemented loading each of the products on to the index.html page, this was done buy utilizing a url query with all links using an address of "/?p=" and adding the product name in that query field like "/?p=ryzen" or "/?p=rx6000".

### All Page Content Retrieved from Server
Then when the DOM loads its content scripts grab the query from the url address and then use it to fetch the relevant product content from the server, that data is returned as a deeply nested object and the client scripts recursively crawl it to build valid HTML that gets injected into the DOM body.

### Navigation Stored on Client
The navigation content is fetched from the server as well and loads it into the localstorage for faster page loads in the future, when the page loads it sends a query to the server with the current navigations version to check if the local storage data is out of date and if so the navigation will reload with the current version from the server.

### Contact Form
The contact form was designed to be delivered to the backend server using a REST API POST request and then render the server response in the DOM, this allowed the form validation to be processed on the server instead of the client to reduce errors. -->


---

## Technical Languages used

<!-- - HTML 5
- SASS Styling
- Vanilla Javascript
- EcmaScript 6+ syntax (ES2015+)
- REST api fetching JSON
- NPM modules
- Webpack compiler
- Git Server on VPS for deployment -->

---

## Notable Files

> `event-handlers.js`

- This file is the main entry point for loading all page content and starts all event listeners.


> `dom-builder.js`

- This file recursively crawls through the object data and compiles it into valid HTML that can the be inserted into the DOM, all nested objects are stored under the "children" key.


> `title-setter.js`

- This file uses the url search query to load a dynamic string to the title tag in the head, it also returns a string that declares the current product name for further use like querying the database.


