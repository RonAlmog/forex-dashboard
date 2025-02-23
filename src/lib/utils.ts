import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import Big from "big.js";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number) {
  return Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(value);
}

// $12.30 = > 1230
export function convertAmountToMiliunits(amount: number) {
  return Math.round(amount * 100);
}

// 1230 => $12.30
export function convertMiliunitsToAmount(amount: number) {
  return amount / 100;
}

export const toCents = (amount: number): number =>
  new Big(amount).times(100).toNumber();

export const convertCurrencyToNumber = (amount: string): number =>
  parseFloat(amount.replace(",", "."));

export const MAX_VALUE = 99999999.99;
export const isAmountWithinRange = (amount: number) =>
  MAX_VALUE * -1 <= amount && amount <= MAX_VALUE;
