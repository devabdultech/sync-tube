import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function extractDateFromTimestamp(timestamp: string) {
	const createdAtDate = new Date(timestamp);
	const dateStr = createdAtDate.toISOString().split("T")[0];
	return dateStr;
}
