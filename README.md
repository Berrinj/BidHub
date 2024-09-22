# Semester Project 2 - BidHub

[![Automated Unit Testing](https://github.com/Berrinj/BidHub/actions/workflows/unit-test.yml/badge.svg)](https://github.com/Berrinj/BidHub/actions/workflows/unit-test.yml)

[![Automated E2E Testing](https://github.com/Berrinj/BidHub/actions/workflows/e2e-test.yml/badge.svg)](https://github.com/Berrinj/BidHub/actions/workflows/e2e-test.yml)

This is my semester project for semester 3 at Noroff.<br>
Fall 2024

## Description

Goal: To take the skills learned over the past three semesters and create an auction website.<br>
brief: An auction site is looking to launch a website where users can add items to be bid on and bid on items other users have put up for auction.
When a new user joins the website, they are given 1000 credits to use on the site. They can get credits by selling items and use credit by buying items. Non-registered users can search through the listings, but only registered users can make bids on listings<br>
<br>
All API functionality is managed by an existing application. This project only covers the front-end application for the API.<br>
<br>

### Project requirements

- "A user with a stud.noroff.no email may register"
- "A registered user may login"
- "A registered user may logout"
- "A registered user may update their avatar // I added the ability to upadte bio as well"
- "A registered user may view their total credit"
- "A registered user may create a listing with a title, deadline date, media gallery and description // I added the ability to update title, description and tags, and to delete listing"
- "A registered user may add a bid to another user’s listing"
- "A registered user may view bids made on a listing"
- "An unregistered user may search through listings"

- The site also had to use approved: css framework, static host, design application, and planning application.

## Built With

- Eslint
- prettier
- jest
- cypress
- HTML
- SCSS
- Bootstrap

## Installaing

1. Clone the repo:

```bash
git clone https://github.com/Berrinj/BidHub.git
```

2. Install the dependencies:

```bash
npm install
```

## Running

Run the app:

```bash
npm run watch
```

Check Format:

```bash
npm run format
```

Check Lint:

```bash
npm run lint
```

## Testing

Run UNIT-tests:

```bash
npm run test-unit
```

Run E2E-tests:

```bash
npm run test-e2e-cli
```

## Contributing

A review is highly appriciated

## Contact

[Send me an email](mailto:berremarte@gmail.com)

[www.linkedin.com](https://www.linkedin.com/in/marte-lilleberre-1013b326a/)
