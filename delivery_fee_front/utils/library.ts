import { Dayjs } from "dayjs";
import { SetStateAction } from "react";

// Handle the state of number inputs. If input type is float, then replace comma with dot.
export const handleNumberInput = (
  inputValue: string,
  setState: React.Dispatch<SetStateAction<number>>,
  isFloat: boolean
) => {
  if (inputValue === "") {
    setState(0);
  }
  if (isFloat) {
    inputValue.replace(",", ".");
    const floatValue = parseFloat(inputValue).toFixed(2);
    setState(parseFloat(floatValue));
  } else {
    setState(parseInt(inputValue));
  }
};

export const handleDateInput = (
  inputValue: Dayjs,
  setIsRushHour: React.Dispatch<SetStateAction<boolean>>,
  setDate: React.Dispatch<SetStateAction<Dayjs>>
) => {
  setDate(inputValue);
  const hour = inputValue.hour();
  const weekday = inputValue.format("ddd");

  // Check is rush hour
  if (weekday === "Fri" && hour > 14 && hour < 20) {
    setIsRushHour(true);
  } else {
    setIsRushHour(false);
  }
};

// If the number of items is five or more, an additional 50 cent surcharge is added for each item above and including the fifth item.
// An extra "bulk" fee applies for more than 12 items of 1,20€
export const calculateSmallCartSurcharge = (cartValue: number): number => {
  if (cartValue >= 10) {
    return 0;
  } else {
    const surcharge = 10 - cartValue;
    return parseFloat(surcharge.toFixed(2));
  }
};

// If the distance would be shorter than 500 meters, the minimum fee is always 1€.
// A delivery fee for the first 1000 meters (=1km) is 2€.
// If the delivery distance is longer than that, 1€ is added for every additional 500 meters that the courier needs to travel before reaching the destination.
// Maximum delivery fee is 15€
export const calculateDistancePrice = (distance: number): number => {
  if (distance > 7000) {
    return 15;
  } else {
    let deliveryPrice = 1;
    for (distance; distance > 500; distance -= 500) {
      deliveryPrice++;
    }
    return deliveryPrice;
  }
};

// number of items is five or more, an additional 50 cent surcharge is added for each item above and including the fifth item.
// An extra "bulk" fee applies for more than 12 items of 1,20€
export const calculateItemsPrice = (itemsAmount: number): number => {
  let itemsPrice = 0;
  const smallItems = itemsAmount - 4;
  if (itemsAmount < 5) {
    return itemsPrice;
  } else if (itemsAmount > 4 && itemsAmount < 13) {
    itemsPrice = smallItems * 0.5;
  } else {
    itemsPrice = smallItems * 0.5 + 1.2;
  }
  if (itemsPrice > 15) {
    return (itemsPrice = 15);
  }
  return itemsPrice;
};

// The delivery fee can never be more than 15€, including possible surcharges.
// The delivery is free (0€) when the cart value is equal or more than 200€.
// During the Friday rush, 3 - 7 PM, the delivery fee (the total fee including possible surcharges) will be multiplied by 1.2x.
// However, the fee still cannot be more than the max (15€).
export const calculateDeliveryFee = (
  cartValue: number,
  smallCartSurcharge: number,
  distancePrice: number,
  itemsPrice: number,
  isRushHour: boolean
) => {
  if (cartValue >= 200) {
    return 0;
  }

  let sum = smallCartSurcharge + distancePrice + itemsPrice;
  if (isRushHour) {
    sum *= 1.2;
  }

  if (sum >= 15) {
    return 15;
  } else {
    return parseFloat(sum.toFixed(2));
  }
};
