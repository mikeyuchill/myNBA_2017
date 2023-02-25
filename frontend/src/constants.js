import React from 'react';

export const PROFILE_PIC_URL_PREFIX =
    'https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190';
export const TEAM_PIC_URL_PREFIX =
    'http://stats.nba.com/media/img/teams/logos';

export const DEFAULT_PLAYER_INFO = {
    personId: 2544,
    jersey: 23,
    pos: 'F',
    yearsPro: 13,
    heightFeet: 6,
    heightInches: 8,
    heightMeters: 2.03,
    weightPounds: 250,
    weightKilograms: 113.4
};

export const DEFAULT_PLAYER_STATS = {
    PLAYER: 'Lebron James',
    TEAM: 'CLE',
    GP: 81,
    MIN: 34.6,
    FGM: 10.2,
    FGA: 24,
    FG_PCT: 0.425,
    FG3M: 2.5,
    FG3A: 7.2,
    FG3_PCT: 0.343,
    FTM: 8.8,
    FTA: 10.4,
    FT_PCT: 0.845,
    OREB: 1.7,
    DREB: 9,
    REB: 10.7,
    AST: 10.4,
    STL: 1.63,
    BLK: 0.38,
    TOV: 5.41,
    PTS: 31.6,
    EFF: 33.8
};

export const STATS_HEADER = ["PLAYER_ID", "RANK", "PLAYER", "TEAM", "GP", "MIN", "FGM", "FGA", "FG_PCT", "FG3M", "FG3A", "FG3_PCT", "FTM", "FTA", "FT_PCT", "OREB", "DREB", "REB", "AST", "STL", "BLK", "TOV", "PTS", "EFF"];

export const CHART_ITEMS = [
    "Team",
    "Season",
    "Shoot",
    "S_Hit",
    "S_Shot",
    "Threes",
    "T_Hit",
    "T_Shot",
    "Penalty",
    "P_Hit",
    "P_Shot",
    "Assists",
    "Backboard",
    "Forecourt",
    "Backcourt",
    "Block",
    "Foul",
    "Steals",
    "Turnover",
    "Score",
    "Win",
    "Lose",
    "Lose_points",
];

export const SEASON = [
    "00-01",
    "01-02",
    "02-03",
    "03-04",
    "04-05",
    "05-06",
    "06-07",
    "07-08",
    "08-09",
    "09-10",
    "10-11",
    "11-12",
    "12-13",
    "13-14",
    "14-15",
    "15-16",
    "16-17",
    "17-18",
    "18-19",
];

export const TEAM_LIST = [
    {
        "Team": "Hawks",
        "abb": "ATL",
        "EASTorWEST": "East",
        "NO": 0
    },
    {
        "Team": "Nets",
        "abb": "BKN",
        "EASTorWEST": "East",
        "NO": 1
    },
    {
        "Team": "Celtics",
        "abb": "BOS",
        "EASTorWEST": "East",
        "NO": 2
    },
    {
        "Team": "Hornets",
        "abb": "CHA",
        "EASTorWEST": "East",
        "NO": 3
    },
    {
        "Team": "Bulls",
        "abb": "CHI",
        "EASTorWEST": "East",
        "NO": 4
    },
    {
        "Team": "Cavaliers",
        "abb": "CLE",
        "EASTorWEST": "East",
        "NO": 5
    },
    {
        "Team": "Mavericks",
        "abb": "DAL",
        "EASTorWEST": "West",
        "NO": 6
    },
    {
        "Team": "Nuggets",
        "abb": "DEN",
        "EASTorWEST": "West",
        "NO": 7
    },
    {
        "Team": "Pistons",
        "abb": "DET",
        "EASTorWEST": "East",
        "NO": 8
    },
    {
        "Team": "Warriors",
        "abb": "GSW",
        "EASTorWEST": "West",
        "NO": 9
    },
    {
        "Team": "Rockets",
        "abb": "HOU",
        "EASTorWEST": "West",
        "NO": 10
    },
    {
        "Team": "Pacers",
        "abb": "IND",
        "EASTorWEST": "East",
        "NO": 11
    },
    {
        "Team": "Clippers",
        "abb": "LAC",
        "EASTorWEST": "West",
        "NO": 12
    },
    {
        "Team": "Lakers",
        "abb": "LAL",
        "EASTorWEST": "West",
        "NO": 13
    },
    {
        "Team": "Grizzlies",
        "abb": "MEM",
        "EASTorWEST": "West",
        "NO": 14
    },
    {
        "Team": "Heat",
        "abb": "MIA",
        "EASTorWEST": "East",
        "NO": 15
    },
    {
        "Team": "Bucks",
        "abb": "MIL",
        "EASTorWEST": "East",
        "NO": 16
    },
    {
        "Team": "Timberwolves",
        "abb": "MIN",
        "EASTorWEST": "West",
        "NO": 17
    },
    {
        "Team": "Pelicans",
        "abb": "NOP",
        "EASTorWEST": "West",
        "NO": 18
    },
    {
        "Team": "Knicks",
        "abb": "NYK",
        "EASTorWEST": "East",
        "NO": 19
    },
    {
        "Team": "Thunder",
        "abb": "OKC",
        "EASTorWEST": "West",
        "NO": 20
    },
    {
        "Team": "Magic",
        "abb": "ORL",
        "EASTorWEST": "East",
        "NO": 21
    },
    {
        "Team": "76ers",
        "abb": "PHI",
        "EASTorWEST": "East",
        "NO": 22
    },
    {
        "Team": "Suns",
        "abb": "PHX",
        "EASTorWEST": "West",
        "NO": 23
    },
    {
        "Team": "TrailBlazers",
        "abb": "POR",
        "EASTorWEST": "West",
        "NO": 24
    },
    {
        "Team": "Kings",
        "abb": "SAC",
        "EASTorWEST": "West",
        "NO": 25
    },
    {
        "Team": "Spurs",
        "abb": "SAS",
        "EASTorWEST": "West",
        "NO": 26
    },
    {
        "Team": "Raptors",
        "abb": "TOR",
        "EASTorWEST": "East",
        "NO": 27
    },
    {
        "Team": "Jazz",
        "abb": "UTA",
        "EASTorWEST": "West",
        "NO": 28
    },
    {
        "Team": "Wizards",
        "abb": "WAS",
        "EASTorWEST": "East",
        "NO": 29
    }
];

export const TEAM_LIST2 = [
    {
        "Team": "Atlanta Hawks",
        "abb": "ATL",
        "EASTorWEST": "East",
        "NO": 0
    },
    {
        "Team": "Brooklyn Nets",
        "abb": "BKN",
        "EASTorWEST": "East",
        "NO": 1
    },
    {
        "Team": "Boston Celtics",
        "abb": "BOS",
        "EASTorWEST": "East",
        "NO": 2
    },
    {
        "Team": "Charlotte Hornets",
        "abb": "CHA",
        "EASTorWEST": "East",
        "NO": 3
    },
    {
        "Team": "Chicago Bulls",
        "abb": "CHI",
        "EASTorWEST": "East",
        "NO": 4
    },
    {
        "Team": "Cleveland Cavaliers",
        "abb": "CLE",
        "EASTorWEST": "East",
        "NO": 5
    },
    {
        "Team": "Dallas Mavericks",
        "abb": "DAL",
        "EASTorWEST": "West",
        "NO": 6
    },
    {
        "Team": "Denver Nuggets",
        "abb": "DEN",
        "EASTorWEST": "West",
        "NO": 7
    },
    {
        "Team": "Detroit Pistons",
        "abb": "DET",
        "EASTorWEST": "East",
        "NO": 8
    },
    {
        "Team": "Golden State Warriors",
        "abb": "GSW",
        "EASTorWEST": "West",
        "NO": 9
    },
    {
        "Team": "Houston Rockets",
        "abb": "HOU",
        "EASTorWEST": "West",
        "NO": 10
    },
    {
        "Team": "Indiana Pacers",
        "abb": "IND",
        "EASTorWEST": "East",
        "NO": 11
    },
    {
        "Team": "Los Angeles Clippers",
        "abb": "LAC",
        "EASTorWEST": "West",
        "NO": 12
    },
    {
        "Team": "Los Angeles Lakers",
        "abb": "LAL",
        "EASTorWEST": "West",
        "NO": 13
    },
    {
        "Team": "Memphis Grizzlies",
        "abb": "MEM",
        "EASTorWEST": "West",
        "NO": 14
    },
    {
        "Team": "Miami Heat",
        "abb": "MIA",
        "EASTorWEST": "East",
        "NO": 15
    },
    {
        "Team": "Milwaukee Bucks",
        "abb": "MIL",
        "EASTorWEST": "East",
        "NO": 16
    },
    {
        "Team": "Minnesota Timberwolves",
        "abb": "MIN",
        "EASTorWEST": "West",
        "NO": 17
    },
    {
        "Team": "New Orleans Pelicans",
        "abb": "NOP",
        "EASTorWEST": "West",
        "NO": 18
    },
    {
        "Team": "New York Knicks",
        "abb": "NYK",
        "EASTorWEST": "East",
        "NO": 19
    },
    {
        "Team": "Oklahoma City Thunder",
        "abb": "OKC",
        "EASTorWEST": "West",
        "NO": 20
    },
    {
        "Team": "Orlando Magic",
        "abb": "ORL",
        "EASTorWEST": "East",
        "NO": 21
    },
    {
        "Team": "Philadelphia 76ers",
        "abb": "PHI",
        "EASTorWEST": "East",
        "NO": 22
    },
    {
        "Team": "Phoenix Suns",
        "abb": "PHX",
        "EASTorWEST": "West",
        "NO": 23
    },
    {
        "Team": "Portland Trail Blazers",
        "abb": "POR",
        "EASTorWEST": "West",
        "NO": 24
    },
    {
        "Team": "Sacramento Kings",
        "abb": "SAC",
        "EASTorWEST": "West",
        "NO": 25
    },
    {
        "Team": "San Antonio Spurs",
        "abb": "SAS",
        "EASTorWEST": "West",
        "NO": 26
    },
    {
        "Team": "Toronto Raptors",
        "abb": "TOR",
        "EASTorWEST": "East",
        "NO": 27
    },
    {
        "Team": "Utah Jazz",
        "abb": "UTA",
        "EASTorWEST": "West",
        "NO": 28
    },
    {
        "Team": "Washington Wizards",
        "abb": "WAS",
        "EASTorWEST": "East",
        "NO": 29
    }
];

