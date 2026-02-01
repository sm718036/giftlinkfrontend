export const formatDate = (timestamp) => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString("default", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

export const getConditionClass = (condition) =>
  condition === "New" ? "bg-green-500" : "bg-yellow-400";
