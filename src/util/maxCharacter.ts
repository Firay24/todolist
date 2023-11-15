export const truncateText = (text) => {
  const words = text.split(" ");
  const truncatedText = words.slice(0, 9).join(" ");
  return truncatedText + (words.length > 6 ? "..." : "");
};
