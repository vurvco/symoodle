# Symoodle

Symoodle is a tool to use symbols to unlock secrets.

## Install / Run

Symoodle is scaffolded with [Create-React-App](https://github.com/facebook/create-react-app).

### Install

You'll need [git](https://git-scm.com/) and [npm](https://www.npmjs.com/). If you run into trouble, ask a JavaScript developer; they should know what to do.

1. `git clone https://github.com/vurvco/symoodle.git`
2. `cd symoodle`
3. `npm install`

### Other commands

- `npm run start`: runs development server
- `npm run build`: builds production package
- `npm run deploy`: builds and deploys to Netlify

### Change clues

Clues are kept in `/src/clues.js`. Right now there's not an easy way to determine what a Symoodle's code will be, you're best bet is to `console.log` the code in the `SubmitPage` and copy/paste.