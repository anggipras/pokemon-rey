import { muiColor } from "@helpers/styles";
import { AppBar, Box, Button, Container, Toolbar } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import { css } from "@emotion/react";
import Icon from "@constants/icons";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const route = useRouter();
    const pages: { title: string; route: string }[] = [
        { title: "Home", route: "/" },
        { title: "Pokemon Type", route: "/pokemon/type/" },
    ];

    return (
        <>
            <div style={{ backgroundColor: muiColor(100).grey }}>
                <div
                    style={{
                        display: "flex",
                        gap: "0.7rem",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        color: "gray",
                        padding: "0.5rem 0",
                        maxWidth: "1200px",
                        margin: "0 auto",
                    }}
                >
                    <Icon.Language sx={{ color: "gray" }} />
                    <div>English</div>
                    <Icon.KeyboardArrowDown sx={{ color: "gray" }} />
                </div>
            </div>
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
                            onClick={() => route.push("/")}
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
                                    onClick={() => route.push(page.route)}
                                    sx={{
                                        my: 2,
                                        color:
                                            route.asPath === page.route
                                                ? muiColor(600).amber
                                                : muiColor(500).grey,
                                        display: "block",
                                        fontWeight:
                                            route.asPath === page.route
                                                ? "bold"
                                                : "normal",
                                        borderBottom:
                                            route.asPath === page.route
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
