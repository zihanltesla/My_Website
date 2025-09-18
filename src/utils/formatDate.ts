export function formatDate(date: string, includeRelative = false) {
  if (!date.includes("T")) {
    date = `${date}T00:00:00`;
  }

  const targetDate = new Date(date);

  // Use a fixed date format to avoid SSR/client hydration mismatches
  const fullDate = targetDate.toLocaleString("en-us", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  // Only calculate relative dates on client-side to avoid hydration issues
  if (includeRelative && typeof window !== 'undefined') {
    const currentDate = new Date();
    const yearsAgo = currentDate.getFullYear() - targetDate.getFullYear();
    const monthsAgo = currentDate.getMonth() - targetDate.getMonth();
    const daysAgo = currentDate.getDate() - targetDate.getDate();

    let formattedDate = "";

    if (yearsAgo > 0) {
      formattedDate = `${yearsAgo}y ago`;
    } else if (monthsAgo > 0) {
      formattedDate = `${monthsAgo}mo ago`;
    } else if (daysAgo > 0) {
      formattedDate = `${daysAgo}d ago`;
    } else {
      formattedDate = "Today";
    }

    return `${fullDate} (${formattedDate})`;
  }

  return fullDate;
}
