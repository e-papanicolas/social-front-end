export const CreatedDate = (date) => {
  const monthName = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const year = date.created_at.slice(0, 4);
  const month = monthName[parseInt(date.created_at.slice(5, 7)) - 1];
  const day = date.created_at.slice(8, 10);

  return `${month} ${day}, ${year}`;
};
