export function splitDate(date: string) {
  // 2024-04-23T15:12:51.373Z
  const regex = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}).(\d{3})Z$/;
  const matches = date.match(regex);
  if (matches) {
    const [
      ,
      year,
      month,
      day,
      hour,
      minute,
      second,
      millisecond,
      ,
    ] = Array.from(matches);

    return {
      year,
      month,
      day,
      hour,
      minute,
      second,
      millisecond,
      fullDate: `${year}-${month}-${day} ${hour}:${minute}:${second}`,
      timestamp: new Date(date).getTime(),
    };
  } else {
    return null;
  }


}
