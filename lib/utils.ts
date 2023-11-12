import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Function to merge Tailwind classes
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

// Function to extract date from timestamp
export function extractDateFromTimestamp(timestamp: string) {
	const createdAtDate = new Date(timestamp);
	const dateStr = createdAtDate.toISOString().split("T")[0];
	return dateStr;
}

// Function to generate a random color
export function getRandomColor() {
	const letters = "0123456789ABCDEF";
	let color = "#";
	for (let i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
}
