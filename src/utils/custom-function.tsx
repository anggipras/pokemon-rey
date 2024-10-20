export const splitPokeUrl = (dt: string) => {
    return dt.split("/").filter(Boolean).pop();
};
