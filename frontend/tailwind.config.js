module.exports = {
  purge: {
    content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],

    // These options are passed through directly to PurgeCSS
    options: {
      safelist: [
        'bg-ATL', "bg-ATL-secondary",
        'bg-BOS', "bg-BOS-secondary",
        'bg-BKN', "bg-BKN-secondary",
        'bg-CHA', "bg-CHA-secondary",
        'bg-CHI', "bg-CHI-secondary",
        'bg-CLE', "bg-CLE-secondary",
        'bg-DAL', "bg-DAL-secondary",
        'bg-DEN', "bg-DEN-secondary",
        'bg-DET', "bg-DET-secondary",
        'bg-GSW', "bg-GSW-secondary",
        'bg-HOU', "bg-HOU-secondary",
        'bg-IND', "bg-IND-secondary",
        'bg-LAC', "bg-LAC-secondary",
        'bg-LAL', "bg-LAL-secondary",
        'bg-MEM', "bg-MEM-secondary",
        'bg-MIA', "bg-MIA-secondary",
        'bg-MIL', "bg-MIL-secondary",
        'bg-MIN', "bg-MIN-secondary",
        'bg-NOP', "bg-NOP-secondary",
        'bg-NYK', "bg-NYK-secondary",
        'bg-OKC', "bg-OKC-secondary",
        'bg-ORL', "bg-ORL-secondary",
        'bg-PHI', "bg-PHI-secondary",
        'bg-PHX', "bg-PHX-secondary",
        'bg-POR', "bg-POR-secondary",
        'bg-SAC', "bg-SAC-secondary",
        'bg-SAS', "bg-SAS-secondary",
        'bg-TOR', "bg-TOR-secondary",
        'bg-UTA', "bg-UTA-secondary",
        'bg-WAS', "bg-WAS-secondary",
        'px-4'],
    },
  },
  darkMode: false, // or 'media' or 'class'
  theme: {

    extend: {
      colors: {
        ATL: {
          DEFAULT: "#E03A3E",
          secondary: "#C4D600"
        },
        BKN: {
          DEFAULT: "#000000",
          secondary: "#FFFFFF"
        },
        BOS: {
          DEFAULT: "#007A33",
          secondary: "#BA9653"
        },
        CHA: {
          DEFAULT: "#1D1160",
          secondary: "#00788C"
        },
        CHI: {
          DEFAULT: "#CE1141",
          secondary: "#000000"
        },
        CLE: {
          DEFAULT: "#6F263D",
          secondary: "#FFB81C"
        },
        DAL: {
          DEFAULT: "#00538C",
          secondary: "#B8C4CA"
        },
        DEN: {
          DEFAULT: "#0E2240",
          secondary: "#FEC524"
        },
        DET: {
          DEFAULT: "#C8102E",
          secondary: "#1D428A"
        },
        GSW: {
          DEFAULT: "#1D428A",
          secondary: "#FFC72C"
        },
        HOU: {
          DEFAULT: "#DE2F5B",
          secondary: "#000000"
        },
        IND: {
          DEFAULT: "#002D62",
          secondary: "#FDBB30"
        },
        LAC: {
          DEFAULT: "#C8102E",
          secondary: "#1D428A"
        },
        LAL: {
          DEFAULT: "#FDB927",
          secondary: "#552583"
        },
        MEM: {
          DEFAULT: "#5D76A9",
          secondary: "#12173F"
        },
        MIA: {
          DEFAULT: "#98002E",
          secondary: "#F9A01B"
        },
        MIL: {
          DEFAULT: "#00471B",
          secondary: "#EEE1C6"
        },
        MIN: {
          DEFAULT: "#0C2340",
          secondary: "#78BE20"
        },
        NOP: {
          DEFAULT: "#0C2340",
          secondary: "#85714D"
        },
        NYK: {
          DEFAULT: "#F58426",
          secondary: "#006BB6"
        },
        OKC: {
          DEFAULT: "#007AC1",
          secondary: "#F05133"
        },
        ORL: {
          DEFAULT: "#0077C0",
          secondary: "#C4CED3"
        },
        PHI: {
          DEFAULT: "#ED174C",
          secondary: "#006BB6"
        },
        PHX: {
          DEFAULT: "#1D1160",
          secondary: "#E56020"
        },
        POR: {
          DEFAULT: "#E03A3E",
          secondary: "#000000"
        },
        SAC: {
          DEFAULT: "#5A2D81",
          secondary: "#63727A"
        },
        SAS: {
          DEFAULT: "#C4CED3",
          secondary: "#000000"
        },
        TOR: {
          DEFAULT: "#CE1141",
          secondary: "#000000"
        },
        UTA: {
          DEFAULT: "#002B5C",
          secondary: "#F9A01B"
        },
        WAS: {
          DEFAULT: "#002B5C",
          secondary: "#E31837"
        },
        FA: {
          DEFAULT: "#333333",
          secondary: "#CCCCCC"
        }
      },
      padding: {
        '2/3': '66.666667%',
        "921/1024": "89.99414%",
        "732/1023": "71.55435%"


      },
      backgroundImage: theme => ({
        'wood-pattern': "url('/src/images/retina_wood.png')",
        "bb-sm": "url('/src/images/bb-sm.jpg')",
        "bb-lg": "url('/src/images/bb-lg.jpg')",
      })
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
