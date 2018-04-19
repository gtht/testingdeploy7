# [The CLAssistant app | A BT3103 Project](https://potassiumflouride.github.io/testingdeploy7)
![version][version-badge] [![license][license-badge]][LICENSE]

The CLAssistant app is an education analytics app created for the purpose of BT3103 module. This app serves as a solution to help teachers become even better teachers than they already are. Through the use of visualisation and text analytics, the CLAssistant app analyzes data that is churned out by the existing Achievements app. With this app, teachers will be able to better-understand their students in greater depth. 

The CLAssistant app is designed to be very user-friendly, with easy navigations and instructions on how to interpret the each visualisation. The minimalistic design allows for the visualisation to be the main focus of the app. 

This app uses the material-UI-react template, [Material Dashboard React - Free Material-UI Design Admin](https://creativetimofficial.github.io/material-dashboard-react/), by [Creative Tim](https://github.com/creativetimofficial/) as a base to this project.

## Links:

+ [Live Preview](https://bt3103-project.firebaseapp.com/)
+ [Video Guide - How To Interpret The Visualisations]

## Getting Started

### Quick start options:

- [Download from Github](https://github.com/potassiumflouride/testingdeploy7/archive/master.zip).
- Clone the repo: `git clone https://github.com/potassiumflouride/testingdeploy7.git`.

### Terminal Commands

1. Install NodeJs from [NodeJs Official Page](https://nodejs.org/en).
2. Open Terminal
3. Go to your file project
4. Run in terminal: ```npm install```
5. Then: ```npm start```
6. Navigate to `http://localhost:3000/`

### What's included

Within the download you'll find the following directories and files:

```
material-dashboard-react
├── CHANGELOG.md
├── LICENSE.md
├── README.md
├── documentation
│   ├── assets
│   │   ├── css
│   │   ├── img
│   │   └── js
│   └── tutorial-components.html
├── package.json
├── public
│   ├── apple-icon.png
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
└── src
    ├── assets
    │   ├── css
    │   │   └── material-dashboard-react.css
    │   └── img
    │       ├── apple-icon.png
    │       ├── cover.jpeg
    │       ├── faces
    │       │   └── marc.jpg
    │       ├── favicon.png
    │       ├── mask.png
    │       ├── new_logo.png
    │       ├── reactlogo.png
    │       ├── sidebar-1.jpg
    │       ├── sidebar-2.jpg
    │       ├── sidebar-3.jpg
    │       ├── sidebar-4.jpg
    │       └── tim_80x80.png
    ├── components
    │   ├── Cards
    │   │   ├── ChartCard.jsx
    │   │   ├── RegularCard.jsx
    │   │   ├── StatsCard.jsx
    │   ├── CustomButtons
    │   │   ├── Button.jsx
    │   │   └── IconButton.jsx
    │   ├── Footer
    │   │   └── Footer.jsx
    │   ├── Grid
    │   │   └── ItemGrid.jsx
    │   ├── Header
    │   │   ├── Header.jsx
    │   │   └── HeaderLinks.jsx
    │   ├── Sidebar
    │   │   └── Sidebar.jsx
    │   ├── Table
    │   │   └── Table.jsx
    │   ├── Tasks
    │   │   └── Tasks.jsx
    │   ├── TextAnalytics
    │   │   └── LessonList.jsx
    │   │   └── Message.jsx
    │   │   └── TextA.jsx
    │   │   └── ResponseList.jsx
    │   │   └── Displays.jsx
    │   ├── Typography
    │   │   ├── Muted.jsx
    │   └── index.js
    ├── containers
    │   └── App
    │       └── App.jsx
    ├── index.js
    ├── logo.svg
    ├── registerServiceWorker.js
    ├── routes
    │   ├── app.jsx
    │   └── index.jsx
    ├── variables
    │   ├── charts.jsx
    │   ├── general.jsx
    │   └── styles.jsx
    └── views
        ├── Dashboard
        │   └── Dashboard.jsx
        └── CodeCombat
            └── CodeCombat.jsx
```

## Built With

* [React](https://reactjs.org/) - The web framework used
* [Firebase](https://firebase.google.com/) - The cloud storage used to store the data to be used by the app
* [Colaboratory]() - The Jupyter notebook environment used to retrieve the Achievements app data and reformat the data that is deem usable by our preferred charting libraries
* [ReCharts](http://recharts.org/en-US/) & [Victory](https://formidable.com/open-source/victory/docs/victory-chart/) - The charting libraries used 

## Authors

* [Kuan Fei](https://github.com/potassiumflouride)
* [Yan Rong](https://github.com/yanrongabc)
* [Genevieve](https://github.com/gtht)
* [Shudan](https://github.com/Maplezzsd)

See also the list of [contributors](https://github.com/potassiumflouride/testingdeploy7/graphs/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

### Reference:
* [Material Dashboard React - Free Material-UI Design Admin](https://creativetimofficial.github.io/material-dashboard-react/)
* [Getting Started with React and Firebase](https://medium.com/@diananina247/getting-started-with-react-and-firebase-b07346f8a355)
* [ReCharts](http://recharts.org/en-US/)
* [Victory | VictoryChart - FormidableLabs](https://formidable.com/open-source/victory/docs/victory-chart/)
* [Material-UI](https://material-ui-next.com/)
* [npm](https://www.npmjs.com/)

### Inspiration:
* The Achievements app
* Prof Chris

"We would like to thank our prof, Prof Chris, for his patience, guidance, constructive feedback and advice throughout these 13 weeks." - Group 4

[LICENSE]: ./LICENSE.md
[version-badge]: https://img.shields.io/badge/version-1.0.0-blue.svg
[license-badge]: https://img.shields.io/badge/license-MIT-blue.svg
