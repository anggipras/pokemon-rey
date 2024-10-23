import { muiColor } from "@helpers/styles";
import {
    AppBar,
    Box,
    Button,
    Container,
    Popover,
    Toolbar,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import { css } from "@emotion/react";
import Icon from "@constants/icons";
import { ROUTES_PATH } from "@constants/config";
import useTranslation from "next-translate/useTranslation";
import setLanguage from "next-translate/setLanguage";
import { useState } from "react";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { t } = useTranslation();
    const route = useRouter();
    const { locale } = route;
    const pages: { title: string; route: string; basePath: string }[] = [
        { title: "Home", route: ROUTES_PATH.home, basePath: "/" },
        {
            title: "Pokemon Type",
            route: ROUTES_PATH.pokemon_type("normal"),
            basePath: "/pokemon/type",
        },
    ];
    const localeBar = ["en", "id"];
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const handleChangeLanguage = async (v: string) => {
        setAnchorEl(null);
        await setLanguage(v || locale);
    };

    const handleClickLang = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseLang = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <div style={{ backgroundColor: muiColor(100).grey }}>
                <div
                    style={{
                        display: "flex",
                        maxWidth: "1200px",
                        margin: "0 auto",
                        justifyContent: "flex-end",
                    }}
                >
                    <button
                        aria-describedby={
                            anchorEl ? "simple-popover" : undefined
                        }
                        onClick={handleClickLang}
                        css={css`
                            display: flex;
                            gap: 0.7rem;
                            align-items: center;
                            cursor: pointer;
                            padding: 0.5rem 0;
                            color: gray;
                            border: none;
                            background-color: ${muiColor(100).grey};
                        `}
                    >
                        <Icon.Language sx={{ color: "gray" }} />
                        <div>{t(`common:language-${locale}`)}</div>
                        <Icon.KeyboardArrowDown sx={{ color: "gray" }} />
                    </button>
                </div>
            </div>
            <Popover
                id={anchorEl ? "simple-popover" : undefined}
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={handleCloseLang}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                }}
            >
                {localeBar.map((v, idx) => (
                    <div
                        key={`lang-${idx}`}
                        css={css`
                            padding: 1rem;
                            cursor: pointer;
                            &:hover {
                                background-color: ${muiColor(500).amber};
                            }
                        `}
                        onClick={() => handleChangeLanguage(v)}
                    >
                        {t(`common:language-${v}`)}
                    </div>
                ))}
            </Popover>
            <AppBar
                position="sticky"
                color="transparent"
                style={{
                    background: "white",
                    boxShadow: "none",
                    padding: "1rem 0",
                }}
            >
                <Container maxWidth="lg">
                    <Toolbar disableGutters>
                        <Image
                            src="/imgs/poke_logo.svg"
                            width={167}
                            height={59}
                            alt="Poke-Rey"
                            css={css`
                                cursor: pointer;
                            `}
                            onClick={() => route.replace("/")}
                        />
                        <Box
                            sx={{
                                flexGrow: 1,
                                display: "flex",
                                marginLeft: "3rem",
                                gap: "2rem",
                            }}
                        >
                            {pages.map((page, idx) => (
                                <Button
                                    key={idx}
                                    onClick={() => route.replace(page.route)}
                                    sx={{
                                        my: 2,
                                        color:
                                            page.basePath === route.asPath ||
                                            route.asPath ===
                                                `${page.basePath}/${route.query.id}/`
                                                ? muiColor(600).amber
                                                : muiColor(500).grey,
                                        display: "block",
                                        borderBottom:
                                            page.basePath === route.asPath ||
                                            route.asPath ===
                                                `${page.basePath}/${route.query.id}/`
                                                ? `1px solid ${
                                                      muiColor(600).amber
                                                  }`
                                                : muiColor(500).grey,
                                        textTransform: "capitalize",
                                    }}
                                >
                                    {page.title}
                                </Button>
                            ))}
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            {children}
        </>
    );
}
