export const toTimestamp = (time: string) => {
    const date = new Date(time);
    return date.getTime();
}

export const sortByUpdate = (list: {
    stack: string;
    content: string;
    id: number; 
    title: string;
    updatedAt: string;
    members: string;
}[]) => {
    return list.toSorted((a, b) => toTimestamp(b.updatedAt) - toTimestamp(a.updatedAt));
}