import Icon from "@constants/icons";
import { useEffect, useState } from "react";
import { css } from "@emotion/react";
import { breakpoints, mediaFrom } from "@helpers/styles";

interface PaginationProps {
    listTheme: string;
    mainTheme: string;
    active: number;
    size: number;
    step: number;
    onClickHandler: (value: number | string) => void;
}

const Pagination = (props: PaginationProps) => {
    const [screenWidth, setScreenWidth] = useState(0);
    const { active, size, step, onClickHandler } = props;

    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };
        handleResize();
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const showingNumbers = step * 2 + 1;
    let startNumber = screenWidth > 1279 ? 2 : 1;
    let startArrayNumber = props.step;

    let needStartDots = false;
    let needEndDots = false;

    if (active > step) {
        startArrayNumber = active - step;

        needStartDots = active > step + startNumber;
    }

    if (size > showingNumbers) {
        needEndDots = size > active + step + 1;

        if (size < active + step + 1) {
            startArrayNumber =
                size - showingNumbers + (screenWidth < 1280 ? 1 : 0);
        }
    }

    return (
        <div
            css={css`
                display: flex;
                justify-content: center;
                align-items: center;
                width: 100%;
                list-style-type: none;
                user-select: none;
            `}
        >
            {size > 1 && (
                <div
                    aria-hidden="true"
                    css={css`
                        display: hidden;
                        ${mediaFrom(breakpoints.lg)} {
                            display: flex;
                        }
                        justify-content: center;
                        align-items: center;
                        border: 0.2rem solid ${props.listTheme};
                        width: 2.5rem;
                        height: 3rem;
                        border-radius: 0.5rem;
                        margin-right: 1rem;
                        cursor: pointer;
                    `}
                    onClick={() => {
                        onClickHandler(1);
                    }}
                >
                    <Icon.KeyboardDoubleArrowLeft
                        sx={{ color: props.listTheme }}
                    />
                </div>
            )}
            {size > 1 ? (
                active > 1 ? (
                    <div
                        aria-hidden="true"
                        css={css`
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            border: 0.2rem solid ${props.listTheme};
                            width: 2.5rem;
                            height: 3rem;
                            border-radius: 0.5rem;
                            margin-right: 1rem;
                            cursor: pointer;
                        `}
                        onClick={() => {
                            onClickHandler(active - 1);
                        }}
                    >
                        <Icon.KeyboardArrowLeft
                            sx={{ color: props.listTheme }}
                        />
                    </div>
                ) : (
                    <div
                        css={css`
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            border: 0.2rem solid ${props.listTheme};
                            width: 2.5rem;
                            height: 3rem;
                            border-radius: 0.5rem;
                            margin-right: 1rem;
                            cursor: pointer;
                        `}
                        aria-disabled
                    >
                        <Icon.KeyboardArrowLeft
                            sx={{ color: props.listTheme }}
                        />
                    </div>
                )
            ) : null}
            {size > showingNumbers + startNumber ? (
                <div
                    css={css`
                        display: flex;
                        gap: 1rem;
                    `}
                >
                    <div
                        aria-hidden="true"
                        css={css`
                            display: hidden;
                            ${mediaFrom(breakpoints.lg)} {
                                display: flex;
                            }
                            justify-content: center;
                            align-items: center;
                            border: 0.2rem solid ${props.listTheme};
                            width: 2.5rem;
                            height: 3rem;
                            border-radius: 0.5rem;
                            cursor: pointer;
                            background: ${active === 1
                                ? props.listTheme
                                : props.mainTheme};
                            color: ${active === 1
                                ? props.mainTheme
                                : props.listTheme};
                        `}
                        onClick={(e) => {
                            onClickHandler(
                                parseInt(e.currentTarget.textContent!, 10),
                            );
                        }}
                    >
                        1
                    </div>

                    {needStartDots && (
                        <span
                            css={css`
                                display: hidden;
                                ${mediaFrom(breakpoints.lg)} {
                                    display: flex;
                                }
                                align-self: center;
                                margin: 0 1rem;
                                color: ${props.listTheme};
                            `}
                        >
                            ...
                        </span>
                    )}
                    {Array.from({ length: showingNumbers }, (_, i) => {
                        const contentNumber = needStartDots
                            ? startArrayNumber
                            : startNumber;
                        startNumber++;
                        startArrayNumber++;
                        return (
                            <div
                                aria-hidden="true"
                                css={css`
                                    display: flex;
                                    justify-content: center;
                                    align-items: center;
                                    border: 0.2rem solid ${props.listTheme};
                                    width: 2.5rem;
                                    height: 3rem;
                                    border-radius: 0.5rem;
                                    cursor: pointer;
                                    background: ${active === contentNumber
                                        ? props.listTheme
                                        : props.mainTheme};
                                    color: ${active === contentNumber
                                        ? props.mainTheme
                                        : props.listTheme};
                                `}
                                key={i}
                                onClick={(e) => {
                                    onClickHandler(
                                        parseInt(
                                            e.currentTarget.textContent!,
                                            10,
                                        ),
                                    );
                                }}
                            >
                                {contentNumber}
                            </div>
                        );
                    })}
                    {needEndDots && (
                        <span
                            css={css`
                                display: hidden;
                                ${mediaFrom(breakpoints.lg)} {
                                    display: flex;
                                }
                                align-self: center;
                                margin: 0 1rem;
                                color: ${props.listTheme};
                            `}
                        >
                            ...
                        </span>
                    )}
                    <div
                        aria-hidden="true"
                        css={css`
                            display: hidden;
                            ${mediaFrom(breakpoints.lg)} {
                                display: flex;
                            }
                            justify-content: center;
                            align-items: center;
                            border: 0.2rem solid ${props.listTheme};
                            width: 2.5rem;
                            height: 3rem;
                            border-radius: 0.5rem;
                            cursor: pointer;
                            background: ${active === size
                                ? props.listTheme
                                : props.mainTheme};
                            color: ${active === size
                                ? props.mainTheme
                                : props.listTheme};
                        `}
                        onClick={(e) => {
                            onClickHandler(
                                parseInt(e.currentTarget.textContent!, 10),
                            );
                        }}
                    >
                        {size}
                    </div>
                </div>
            ) : (
                <div
                    css={css`
                        display: flex;
                        gap: 1rem;
                    `}
                >
                    {
                        ((startArrayNumber = 1),
                        Array.from({ length: size }, (_, i) => (
                            <div
                                aria-hidden="true"
                                css={css`
                                    display: hidden;
                                    justify-content: center;
                                    align-items: center;
                                    border: 0.2rem solid ${props.listTheme};
                                    width: 2.5rem;
                                    height: 3rem;
                                    border-radius: 0.5rem;
                                    cursor: pointer;
                                    background: ${active === startArrayNumber
                                        ? props.listTheme
                                        : props.mainTheme};
                                    color: ${active === startArrayNumber
                                        ? props.mainTheme
                                        : props.listTheme};
                                `}
                                key={i}
                                onClick={(e) => {
                                    onClickHandler(
                                        parseInt(
                                            e.currentTarget.textContent!,
                                            10,
                                        ),
                                    );
                                }}
                            >
                                {startArrayNumber++}
                            </div>
                        )))
                    }
                </div>
            )}
            {size > 1 ? (
                active < size ? (
                    <div
                        aria-hidden="true"
                        css={css`
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            border: 0.2rem solid ${props.listTheme};
                            width: 2.5rem;
                            height: 3rem;
                            border-radius: 0.5rem;
                            margin-left: 1rem;
                            cursor: pointer;
                        `}
                        onClick={() => {
                            onClickHandler(active + 1);
                        }}
                    >
                        <Icon.KeyboardArrowRight
                            sx={{ color: props.listTheme }}
                        />
                    </div>
                ) : (
                    <div
                        css={css`
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            border: 0.2rem solid ${props.listTheme};
                            width: 2.5rem;
                            height: 3rem;
                            border-radius: 0.5rem;
                            margin-left: 1rem;
                            cursor: pointer;
                        `}
                        aria-disabled
                    >
                        <Icon.KeyboardArrowRight
                            sx={{ color: props.listTheme }}
                        />
                    </div>
                )
            ) : null}
            {size > 1 && (
                <div
                    aria-hidden="true"
                    css={css`
                        display: hidden;
                        ${mediaFrom(breakpoints.lg)} {
                            display: flex;
                        }
                        justify-content: center;
                        align-items: center;
                        border: 0.2rem solid ${props.listTheme};
                        width: 2.5rem;
                        height: 3rem;
                        border-radius: 0.5rem;
                        margin-left: 1rem;
                        cursor: pointer;
                    `}
                    onClick={() => {
                        onClickHandler(size);
                    }}
                >
                    <Icon.KeyboardDoubleArrowRight
                        sx={{ color: props.listTheme }}
                    />
                </div>
            )}
        </div>
    );
};

export default Pagination;
