# Company Incomes App

---

This is a react.js application based on by Material Table and nivo that provides the ability to track companies incomes.

[App Preview](https://ecuki.github.io/company-incomes/)

---

## Features

- Material Design
- Data sorting
- Data searching
- Company details site
- Total income
- Average of company incomes
- Incomes for period
- Incomes Bar Chart

.
![Table](https://github.com/Ecuki/company-incomes/blob/master/src/assets/table_preview.jpg)

.
![Company details site](https://github.com/Ecuki/company-incomes/blob/master/src/assets/company_preview.jpg)

#### Data :

- Company ID
- Company name
- Company city
- Company total income

#### Data sorting:

- Click on column **Header** to sort data
- Click again to sort from the end
- Click again and back to initial state

#### Data searching:

- Search in all data by text and numbers

#### Company details site:

- Main information about the company
- "Average incomes" - average of company incomes in data rage set in "Start" end "End".
- "Income for period" - company income in data rage set in "Start" end "End".
- "Start date" - by default, the first day of this month.
- "End date" - today's date by default.

#### Incomes Bar Chart:

- Shows the sums of the company's monthly incomes from all data

---

## Setup

Clone this repo to your desktop and run `npm install` to install all the dependencies.

You might want to look into `config.json` to make change the port you want to use and set up a SSL certificate.

---

## Usage

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

```
git clone https://github.com/Ecuki/company-incomes
```

After you clone this repo to your desktop, go to its root directory and run `npm install` to install its dependencies.

```
npm install
```

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## License

> You can check out the full license [here](https://github.com/Ecuki/company-incomes/blob/master/LIcense.txt)

## Acknowledgments

Inspiration, code snippets, etc.

- [Add a README and a License](http://www.davidketcheson.info/2015/05/13/add_a_readme.html)
- [awesome-readme](https://github.com/igorantun/node-chat/blob/master/README.md)
- [readme-template](https://gist.github.com/DomPizzie/7a5ff55ffa9081f2de27c315f5018afc)
- [How to write a good README](https://bulldogjob.com/news/449-how-to-write-a-good-readme-for-your-github-project)
