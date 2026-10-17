const REMOVE_PHRASES = /\b(Championship|Women['’]s|Tag Team)\b/gi;

export function shortTitleName(name: string) {
  const short = name
		.replace(REMOVE_PHRASES, "")
		.replace(/\s{2,}/g, " ")
		.trim();

	return short || name; // fall back if everything got stripped
}

export function hideZero(n: number) {
	return n === 0 ? "" : n;
}

export function spread(n: number) {
  return n > 0 ? `+${n}` : String(n);
}

export function winPercentage(n: number) {
  if (isNaN(n)) return "-";
  return `${(n * 100).toFixed(1)}%`;
}
