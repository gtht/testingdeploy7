# [The CLAssistant app | A BT3103 Project](https://github.com/potassiumflouride/testingdeploy7)
![version][version-badge] [![license][license-badge]][LICENSE]

The CLAssistant app is an education analytics web-application created for the purpose of BT3103 module. This app serves as a solution to help teachers become even better teachers than they already are. Through the use of data visualisation & analytics, the CLAssistant app aids teachers in gaining better understanding of their class by analyzing the student data collected within the [Achievements App](http://nus.edu.sg/alset/apps/achievements/#/home). 


With this app, teachers will be able to:
#### [Classroom Analytics](https://bt3103-project.firebaseapp.com/dashboard)
1. Have an overview of the class assignments, the submission situation and the time periods.
2. Check the doability of the class assignments, so as to increase/decrease the difficulty accordingly.
3. Check the effort distribution so as to decide next class & assignment plan.
4. Understand his/her students' study-patterns including peak studying periods, so as to be able to better plan & set deadlines 
5. Take note of the possibly-struggling students
6. Have a summary of the short-answer/open-ended answers submitted by students so as to be able to set plans and achieve an insight about current learning effect. 

#### [Code Combat Analytics](https://bt3103-project.firebaseapp.com/codecombat):
1. Have an overview of the student’s participation in code combat and identify the students who are most active and consistent
2. Classify the students according to their coding competency 
3. Identify the better performing students on Code Combat
3. Take note of the possibly-struggling students on Code Combat
4. Have a snap shot of individual student's recent code combat activity


Much thought & effort has been put into designing the app's 2 dashboards. The dashboards are designed to be user-friendly, easy to naviagate, with instructions on how to interpret each visualisation. The minimalistic design layout allows for the visualisations to stand out and be the main focus of the app. To ensure optimal amount of insights gained, we ensured that the visualisation presented is not overloaded with too much information.

This app uses the material-UI-react template, [Material Dashboard React - Free Material-UI Design Admin](https://creativetimofficial.github.io/material-dashboard-react/), by [Creative Tim](https://github.com/creativetimofficial/) as a base to this project.

## Links:

+ [Live Preview](https://bt3103-project.firebaseapp.com/)
+ [Video Guide - How To Interpret The Visualisations](https://youtu.be/b2DVP0EyZEY)
+ [Documentation](https://docs.google.com/document/d/1QlKL6bljvA135ZgKS4cNoUDEByYrv1h5F6avFeopuNc/edit?usp=sharing)

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

* [React](https://reactjs.org/) - The web framework used for the app
* [Firebase](https://firebase.google.com/) - The cloud storage used to store the data that's used in this app
* [Colaboratory]() - The Jupyter notebook environment used to retrieve, calculate, reformat and push the modified Achievements data into the cloud storage
* [ReCharts](http://recharts.org/en-US/) & [Victory](https://formidable.com/open-source/victory/docs/victory-chart/) - The charting libraries used to display charts & graphs in the app

## Authors

* [Kuan Fei](https://github.com/potassiumflouride)
* [Yan Rong](https://github.com/yanrongabc)
* [Genevieve](https://github.com/gtht)
* [Shudan](https://github.com/Maplezzsd)

See also the list of [contributors](https://github.com/potassiumflouride/testingdeploy7/graphs/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

### Reference(s):
* [Material Dashboard React - Free Material-UI Design Admin](https://creativetimofficial.github.io/material-dashboard-react/) - Creative Tim 
* [CodeCombat](https://codecombat.com/) 
* [Getting Started with React and Firebase](https://medium.com/@diananina247/getting-started-with-react-and-firebase-b07346f8a355) - Nina Diana
* [ReCharts](http://recharts.org/en-US/) - ReCharts Group
* [Victory | VictoryChart - FormidableLabs](https://formidable.com/open-source/victory/docs/victory-chart/)
* [Material-UI](https://material-ui-next.com/) Material-UI
* [npm](https://www.npmjs.com/) - npm Orgs

### Inspirations:
* [The Achievements App](http://nus.edu.sg/alset/apps/achievements/#/home)
* Prof [Chris Boesch](http://nus.edu.sg/alset/staff.html) 

"We would like to thank our Prof, Prof Chris, for his patience, guidance, constructive feedback and advice throughout these 13 weeks. The app would not have been possible without him." - Group 4

[LICENSE]: ./LICENSE.md
[version-badge]: https://img.shields.io/badge/version-1.0.0-blue.svg
[license-badge]: https://img.shields.io/badge/license-MIT-blue.svg
