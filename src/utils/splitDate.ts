export function splitDate(date: string) {
  // 2024-04-23T15:12:51.373Z
  const year = date.split('-')[0];
  const month = date.split('-')[1];
  const day = date.split('-')[2].split('T')[0];
  const hour = date.split('T')[1].split(':')[0];
  const minute = date.split('T')[1].split(':')[1];
  const second = date.split('T')[1].split(':')[2].split('.')[0];
  const millisecond = date.split('T')[1].split('.')[1].split('Z')[0];

  return {
    year,
    month,
    day,
    hour,
    minute,
    second,
    millisecond,
    fullDate: `${year}-${month}-${day} ${hour}:${minute}:${second}`,
    timestamp:new Date(date).getTime(),
};
}
