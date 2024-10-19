import React, { FC } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import setLanguage from "next-translate/setLanguage";

import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Container,
    Grid2,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography,
} from "@mui/material";
import { Check } from "@mui/icons-material";
import { ROUTES_PATH } from "@constants/config";
import HeroBg from "@components/modules/hero-bg";

const Index = () => {
    const { t } = useTranslation();
    const route = useRouter();
    const { locale } = route;

    const tempRequirements = [
        { desc: "requirement-desc-1", action: null },
        { desc: "requirement-desc-2", action: "change-language" },
        { desc: "requirement-desc-3", action: null },
        { desc: "requirement-desc-4", action: null },
        { desc: "requirement-desc-5", action: null },
    ];

    const handleChangeLanguage = async () => {
        await setLanguage(locale === "id" ? "en" : "id");
    };

    return (
        <>
            <Head>
                <title>REY - Project Test</title>
            </Head>
            <Container maxWidth="lg">
                <HeroBg />
                {/* <Box component="div" m={10}>
                    <Grid2 container>
                        <Grid2 size={12}>
                            <Typography
                                align="center"
                                variant="h4"
                                component="h3"
                            >
                                {t("home:welcome-title")}
                            </Typography>
                        </Grid2>
                        <Grid2 size={12}>
                            <Box component="div" m={2}>
                                <Container maxWidth="sm">
                                    <Typography variant="body1" component="p">
                                        {t("home:welcome-description")}
                                        <Button
                                            target="_blank"
                                            href="https://pokeapi.co/"
                                            color="primary"
                                            style={{
                                                color: "##0082a3",
                                                fontWeight: "bold",
                                                textTransform: "capitalize",
                                            }}
                                        >
                                            Pokemon API
                                        </Button>
                                    </Typography>
                                    <Box m="5" height={30} />
                                    <Card variant="elevation" elevation={8}>
                                        <CardContent>
                                            <Typography
                                                color="textPrimary"
                                                variant="h6"
                                                gutterBottom
                                            >
                                                {t("home:requirement-title")}
                                            </Typography>
                                            <List>
                                                {tempRequirements.map(
                                                    (requirement, key) => (
                                                        <ListItem
                                                            disableGutters
                                                            key={`requirement-list-${key}`}
                                                        >
                                                            <ListItemIcon>
                                                                <Check />
                                                            </ListItemIcon>
                                                            <ListItemText>
                                                                {t(
                                                                    `home:${requirement.desc}`,
                                                                )}
                                                                {requirement.action ===
                                                                    "change-language" && (
                                                                    <Button
                                                                        variant="contained"
                                                                        color="primary"
                                                                        size="small"
                                                                        onClick={
                                                                            handleChangeLanguage
                                                                        }
                                                                    >
                                                                        {t(
                                                                            `common:language-${locale}`,
                                                                        )}
                                                                    </Button>
                                                                )}
                                                            </ListItemText>
                                                        </ListItem>
                                                    ),
                                                )}
                                            </List>
                                        </CardContent>
                                        <CardActions>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                fullWidth
                                                onClick={() =>
                                                    route.push(
                                                        ROUTES_PATH.pokemon_list,
                                                    )
                                                }
                                            >
                                                {t("home:requirement-action")}
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </Container>
                            </Box>
                        </Grid2>
                        <Grid2 size={12}>
                            <Box component="div" m={5}>
                                <Typography variant="h4" component="h3">
                                    {t("home:welcome-work")}
                                </Typography>
                            </Box>
                        </Grid2>
                    </Grid2>
                </Box> */}
            </Container>
        </>
    );
};

export default Index;
