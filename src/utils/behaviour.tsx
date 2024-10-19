export const scrollToDynamicView = (dt: string) => {
    const scrolledEl = document.getElementById(dt);
    if (scrolledEl)
        scrolledEl.scrollIntoView({
            behavior: "smooth",
        });
};
