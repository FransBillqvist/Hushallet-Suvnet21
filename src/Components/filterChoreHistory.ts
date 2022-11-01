import { ChoreHistory } from '../Data/choreHistory';

export function filterCurrentWeek(choreHistory: ChoreHistory[]) {
  const cDate = new Date().toISOString().slice(0, 10);
  const currentDate = new Date(cDate);

  const firstDayOfCurrentWeek = currentDate.getDate() - currentDate.getDay() + 1;
  const firstDateString = new Date(currentDate.setDate(firstDayOfCurrentWeek)).toISOString();
  const firstDate = new Date(firstDateString);

  const lastDayOfCurrentWeek = firstDate.getDate() + 6;
  const lastDateString = new Date(currentDate.setDate(lastDayOfCurrentWeek)).toISOString();
  const lastDate = new Date(lastDateString);

  const choreHistoryOfCurrentWeek: ChoreHistory[] = [];

  choreHistory.forEach((choreHistory) => {
    const choreHistoryDateString = new Date(choreHistory.date.slice(0, 10)).toISOString();
    const choreHistoryDate = new Date(choreHistoryDateString);
    if (
      choreHistoryDate.valueOf() >= firstDate.valueOf() &&
      choreHistoryDate.valueOf() <= lastDate.valueOf()
    )
      choreHistoryOfCurrentWeek.push(choreHistory);
  });
  console.log(choreHistory);
  console.log(choreHistoryOfCurrentWeek);

  return choreHistoryOfCurrentWeek;
}
