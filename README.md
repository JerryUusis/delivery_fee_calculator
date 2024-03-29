# Delivery fee calculator

This is my implementation of the Wolt 2024 preliminary assignment for a frontend development internship.

It is hosted live [here](https://funny-meringue-7f38f9.netlify.app/) using Netlify.

Full description for the requirements and details can be found at here [https://github.com/woltapp/engineering-internship-2024](https://github.com/woltapp/engineering-internship-2024)

## Dependencies

Make sure you have the following dependencies installed before running the application:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) (Node Package Manager)

## Installation

1. Navigate to the root folder
2. Run `npm install` to install required Node modules
```bash
npm install
```
3. Run development server using following command
```bash
npm run dev
```
4. Open the development server in browser:
[http://localhost:5173/](http://localhost:5173/)

5. Insert different values in the inputs on the page and press submit to see the results appear in the Summary section

## Specification

### Description

Your task is to write a delivery fee calculator. This code is needed when a customer is ready with their shopping cart and we’d like to show them how much the delivery will cost. The delivery price depends on the cart value, the number of items in the cart, the time of the order, and the delivery distance.

### Rules for calculating a delivery fee

- If the cart value is less than 10€, a small order surcharge is added to the delivery price. The surcharge is the difference between the cart value and 10€. For example if the cart value is 8.90€, the surcharge will be 1.10€.
- A delivery fee for the first 1000 meters (=1km) is 2€. If the delivery distance is longer than that, 1€ is added for every additional 500 meters that the courier needs to travel before reaching the destination. Even if the distance would be shorter than 500 meters, the minimum fee is always 1€.
    - Example 1: If the delivery distance is 1499 meters, the delivery fee is: 2€ base fee + 1€ for the additional 500 m => 3€
    - Example 2: If the delivery distance is 1500 meters, the delivery fee is: 2€ base fee + 1€ for the additional 500 m => 3€
    - Example 3: If the delivery distance is 1501 meters, the delivery fee is: 2€ base fee + 1€ for the first 500 m + 1€ for the second 500 m => 4€
- If the number of items is five or more, an additional 50 cent surcharge is added for each item above and including the fifth item. An extra "bulk" fee applies for more than 12 items of 1,20€
    - Example 1: If the number of items is 4, no extra surcharge
    - Example 2: If the number of items is 5, 50 cents surcharge is added
    - Example 3: If the number of items is 10, 3€ surcharge (6 x 50 cents) is added
    - Example 4: If the number of items is 13, 5,70€ surcharge is added ((9 * 50 cents) + 1,20€)
    - Example 5: If the number of items is 14, 6,20€ surcharge is added ((10 * 50 cents) + 1,20€)
- The delivery fee can never be more than 15€, including possible surcharges.
- The delivery is free (0€) when the cart value is equal or more than 200€.
- During the Friday rush, 3 - 7 PM, the delivery fee (the total fee including possible surcharges) will be multiplied by 1.2x. However, the fee still cannot be more than the max (15€). Considering timezone, for simplicity, use UTC as a timezone in backend solutions (so Friday rush is 3 - 7 PM UTC). In frontend solutions, use the timezone of the browser (so Friday rush is 3 - 7 PM in the timezone of the browser).

## Author

**Jerry Uusitalo**

- [GitHub](https://github.com/JerryUusis)
- [LinkedIn](https://www.linkedin.com/in/jerry-uusitalo-383a02127)

As a web development student with a background in music education and performance, I'm venturing into a new career path in web development. My journey is fueled by a combination of perseverance, a positive attitude and unwavering determination, which serve as my guiding forces in achieving the goals I set for myself.
