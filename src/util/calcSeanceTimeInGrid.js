const calcSeanceTimeInGrid = (time) => {
  const [hours, minutes] = time.split(':');
  const minutesInDay = 60 * 24;
  const timeInMinutes = +hours * 60 + +minutes;
  const timeInPercent = timeInMinutes * 100 / minutesInDay;
  return timeInPercent;
};

export default calcSeanceTimeInGrid;