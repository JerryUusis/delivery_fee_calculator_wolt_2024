# Delivery fee calculator

This is a remake of my implementation of the Wolt 2024 preliminary assignment for a frontend development internship. You can go check the old version [here](https://github.com/JerryUusis/delivery_fee_calculator).

## Technologies used
- Material UI
- React & TypeScript
- Day.js
- Vitest
- React testing library
- Playwright

The calculator app is hosted live [here](https://deliveryfeecalculator2024.netlify.app/)

Full description for the requirements and details can be found at here [https://github.com/woltapp/engineering-internship-2024](https://github.com/woltapp/engineering-internship-2024)

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=JerryUusis_delivery_fee_calculator_wolt_2024&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=JerryUusis_delivery_fee_calculator_wolt_2024)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=JerryUusis_delivery_fee_calculator_wolt_2024&metric=bugs)](https://sonarcloud.io/summary/new_code?id=JerryUusis_delivery_fee_calculator_wolt_2024)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=JerryUusis_delivery_fee_calculator_wolt_2024&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=JerryUusis_delivery_fee_calculator_wolt_2024)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=JerryUusis_delivery_fee_calculator_wolt_2024&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=JerryUusis_delivery_fee_calculator_wolt_2024)


## Specification

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

I'm a Full Stack web developer student currently finishing up my studies in Business College Helsinki and looking for internship opportunities. Don't hesitate to contact me in [LinkedIn](https://www.linkedin.com/in/jerry-uusitalo-383a02127). Also feel free to go check out my other projects in [GitHub](https://github.com/JerryUusis)!

[![image](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/JerryUusis)

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/jerry-uusitalo-383a02127)


