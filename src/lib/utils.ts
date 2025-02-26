import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
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
