const agroEcoData = {
    biofilters: [
        {
            name: "Rainfall (mm/year)",
            label: "rainfall",
            minValue: 280,
            maxValue: 4290,
            value: (280 + 4290) / 2,
        },
        {
            name: "Temperature (mean °C/month)",
            label: "temp",
            minValue: 0,
            maxValue: 45,
            value: 45 / 2,
        },

        {
            name: "Altitude (average masl)",
            label: "alt",
            minValue: 0,
            maxValue: 3800,
            value: 3800 / 2,
        },

        {
            name: "Soil pH (average)",
            label: "soilpH",
            minValue: 4,
            maxValue: 9,
            value: (4 + 9) / 2,
        },
    ],
};

export default agroEcoData;
