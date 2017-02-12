# Install
```bash
npm install
```

# Run
```bash
npm run start
```
After go to the [Local server](http://localhost:9001/)

# Test task for Frontend Developer

**Please, don't fork this repository. Make your own, clone this and change origin to your repository.**

## Description

Your task is to implement a dashboard with a stock chart. You will have real-time updates through WebSockets. Also, you can get a market history by making a request to `/market-history`.

Chart should load history data and show live updates.

There are two chart's types:

- intraday price chart. It shows a price in every moment. `F(t) = P(t)`
- intraday percent change chart. It shows a percent change from the start of the day. `F(t) = (P(t) - P(0))/P(0) * 100%`

Assumptions:
- The user can change the type of the chart.
- The chart should change in real-time.
- The chart uses data only for the current day.

## Tech info

Please, use this tools in the task:

- [webpack](https://webpack.github.io)
- [d3.js](https://d3js.org)
- [React](https://facebook.github.io/react/)

You are free to add more tools if needed.

Please, write your code in `client` folder. The bundle should be built in `public` folder. For this change script `build-client` in `package.json` file.

It will be plus, if you implement `npm test` command. This command should check eslint rules for your code and then run tests.
