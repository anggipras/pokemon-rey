export const splitPokeUrl = (dt: string) => {
    return dt.split("/").filter(Boolean).pop();
};

export const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};
