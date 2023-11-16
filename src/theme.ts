import { MantineColorsTuple, createTheme } from "@mantine/core";

const bmColors: MantineColorsTuple = [
    '#e5f4ff',
    '#cde2ff',
    '#9bc2ff',
    '#64a0ff',
    '#3984fe',
    '#1d72fe',
    '#0969ff',
    '#0058e4',
    '#004ecc',
    '#0043b5'
];

export const bmApplyTheme = createTheme({
    colors: {
        bmColors,
    }
});

// testing that the branch protection rule works :)
