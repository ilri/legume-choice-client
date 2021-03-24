export const legfunc = [
    {
        name: "Food",
        label: "food",
    },
    {
        name: "Feed",
        label: "feed",
    },
    {
        name: "Income",
        label: "income",
    },
    {
        name: "Erosion Control",
        label: "erosion-control",
    },
    {
        name: "Fuel",
        label: "fuel",
    },
    {
        name: "Soil Fertility",
        label: "soil-fertility",
    },
];

export const typologies = [
    {
        name: "Low",
        label: "low",
    },
    {
        name: "Medium",
        label: "med",
    },
    {
        name: "High",
        label: "high",
    },
];

export const participants = [
    {
        name: "Farmer",
        label: "farmer",
    },
    {
        name: "Expert",
        label: "expert",
    },
];

export const attributes = [
    {
        name: "Land",
        label: "land",
    },
    {
        name: "Labour",
        label: "labour",
    },
    {
        name: "Seed",
        label: "seed",
    },
    {
        name: "Inputs and services",
        label: "inp-serv",
    },
    {
        name: "Knowledge and skills",
        label: "knowl-skill",
    },
    {
        name: "Water",
        label: "water",
    },
    {
        name: "Markets",
        label: "markets",
    },
];

export const biofilters = [
    {
        name: "Rainfall (mm/year)",
        label: "rainfall",
        minValue: 280,
        maxValue: 4290,
        value: (280 + 4290) / 2,
        validity: "Valid",
    },
    {
        name: "Temperature (mean °C/month)",
        label: "temp",
        minValue: 0,
        maxValue: 45,
        value: 45 / 2,
        validity: "Valid",
    },

    {
        name: "Altitude (average masl)",
        label: "alt",
        minValue: 0,
        maxValue: 3800,
        value: 3800 / 2,
        validity: "Valid",
    },

    {
        name: "Soil pH (average)",
        label: "soilpH",
        minValue: 4,
        maxValue: 9,
        value: (4 + 9) / 2,
        validity: "Valid",
    },
];
