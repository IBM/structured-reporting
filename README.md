# Structured Reporting

Structured Reporting is a generic web application that takes JSON Schema and generates a multilingual UI form for data capturing, stores that data locally (in-browser using pouchdb), sync's the data to other databases (couchdb or cloudant), and can work completely offline. 

It supports validation of inputs, collapsible sections, dependencies (sections that are visible based on the values of inputs), array inputs (add as many of a section as you like), signing off of reports (using a PIN code), and multilingual forms.

It is typically used to capture health or other data on computers and mobile devices.

## Front End stack

- JS framework: React - [Visit site](https://reactjs.org/)
- Design system: IBM Carbon - [Visit site](https://www.carbondesignsystem.com/) and [visit components site](http://react.carbondesignsystem.com/?path=/story/accordion--default)
- Form management library: React-jsonschema-form - [Visit site](https://react-jsonschema-form.readthedocs.io/en/latest/
- Internationalization - [React-Intl](https://github.com/formatjs/react-intl)

## Back End stack

This web application does not require an application server, it can simply be hosted on a static server. Optionally, a CouchDB or Cloudant server can be used to sync data from the client browser(s), which can be set up in `src/api/constants.js`

## Get started


### To work with React

1. As pre-requirements, you will need to have basic knowledge in HTML, CSS, JS and modern JS(ES6).
 
- Here is a very good article with the 10 ES6 most used features: [10 ES6 most used features](https://blog.pragmatists.com/top-10-es6-features-by-example-80ac878794bb)
 
- Also some knowledge in NPM and Git. If you don't have it don't worry... this is learned on the fly.
 
- And finally a good editor. I recommend VSCODE or Atom. In that order.
 
2. Recommended articler to understand the methodology behind building React apps: [Atomic Design Thinking](https://medium.com/@carlos.parreno/atomic-design-thinking-154edb2d2a71)
 
3. As you start with React you will encounter many new concepts. It might seem overwhelming but don't worry they are all very easy to understand. Just go one step at a time. 
 
Some of the most basic concepts you will need to get familiar with are...
 
- Atomic Design
- JSX
- Stateful component
- Stateless component (aka function component)
- Props and PropTypes
- Refs
- Lifecycle methods
- Hooks (This is a super feature released this year that replace many of other old features as stateful components and lifecycle methods)
- Virtual DOM
- Testing: Jest and (enzyme or react-testing-library)
 
One step at a time will make it 😆
 
 
4. Some free react courses: They are from two/three years ago and you won't be using some of the things they explain. However, it's critical to understand how the previous versions of React work. There are tones of old code out there and you will be needing to know how to read that code.
 
egghead.io/courses/start-learning-react

egghead.io/courses/the-beginner-s-guide-to-react


### To install this project

Pre-requirements:

- Install nodejs
- Install an editor, I recommend VSCode
- Install git


Once all above is installed:

> git clone https://github.ibm.com/carlos-parreno/service-corps-frontend-stack-test.git

> cd service-corps-frontend-stack-test

> npm install

> npm run build

> npm run start

The application will be running on http://localhost:3000/

Happy coding 🤗
 
## Creating forms

Forms are stored in the `/public/schemas` folder. There are sub-folders for each language (using language code). The `/public/schemas/schemas.json` file contains an array of schemas to make available to the user, which maps to a JSON Schema file of the same name (see the `general-report.json` example). The language-specific sections are stored in the language sub-folders with the same name (e.g. `/public/schemas/en/general-report.json`), which are then combined with the language-specific `/public/schemas/en/common.json` schema that contains fields common to all forms, and then combined with the root-level schema (e.g. `/public/schemas/general-report.json`) to generate the final JSON Schema file that is used to create the form.

To add a new form, follow the example of the `general-report.json` as noted above, and add the new form to the `/public/schemas/schemas.json` file to make it available. 

## Issues

- User authentication has not been implemented.
