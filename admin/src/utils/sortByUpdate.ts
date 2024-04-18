export const toTimestamp = (time: string) => {
    const date = new Date(time);
    return date.getTime();
}

export const sortByUpdate = (list: { updatedAt: string }[]) => {
    return list.toSorted((a, b) => toTimestamp(b.updatedAt) - toTimestamp(a.updatedAt));
}