export const nbaTeams = [
    'Atlanta Hawks',
    'Boston Celtics',
    'Brooklyn Nets',
    'Charlotte Hornets',
    'Chicago Bulls',
    'Cleveland Cavaliers',
    'Dallas Mavericks',
    'Denver Nuggets',
    'Detroit Pistons',
    'Golden State Warriors',
    'Houston Rockets',
    'Indiana Pacers',
    'Los Angeles Clippers',
    'Los Angeles Lakers',
    'Memphis Grizzlies',
    'Miami Heat',
    'Milwaukee Bucks',
    'Minnesota Timberwolves',
    'New Orleans Pelicans',
    'New York Knicks',
    'Oklahoma City Thunder',
    'Orlando Magic',
    'Philadelphia 76ers',
    'Phoenix Suns',
    'Portland Trailblazers',
    'Sacramento Kings',
    'San Antonio Spurs',
    'Toronto Raptors',
    'Utah Jazz',
    'Washington Wizards'
]

export const nbaColours = [
    {AtlantaHawks: [
        {home: ["#C8102E", "#FDB927", "#FFFFFF"]},
        {away: ["#C8102E", "#FDB927", "#000000"]}
    ]},
    {BostonCeltics: [
        {home: ["#FFFFFF", "#007A33"]},
        {away: ["#007A33", "#FFFFFF"]}
    ]},
    {BrooklynNets: [
        {home: ["#C6CFD4", "#000000"]},
        {away: ["#000000", "#C6CFD4"]}
    ]},
    {CharlotteHornets: [
        {home: ["#FFFFFF", "#00788C"]},
        {away: ["#00788C", "#1d1160"]}
    ]},
    {ChicagoBulls: [
        {home: ["#FFFFFF", "#CE1141"]},
        {away: ["#CE1141", "#000000"]}
    ]},
    {ClevelandCavs: [
        {home: ["#FFFFFF", "#860038"]},
        {away: ["#860038", "#FDBB30"]}
    ]},
    {DallasMavericks: [
        {home: ["#FFFFFF", "#00538C"]},
        {away: ["#00538C", "#FFFFFF"]}
    ]},
    {DenverNuggets: [
        {home: ["#FFFFFF", "#1D428A"]},
        {away: ["#0E2240", "#FFFFFF"]}
    ]},
    {DetroitPistons: [
        {home: ["#FFFFFF", "#1D42BA"]},
        {away: ["#1D42BA", "#C8102E"]}
    ]},
    {GoldenStateWarriors: [
        {home: ["#FFFFFF", "#FDB927"]},
        {away: ["#006BB6", "#FDB927"]}
    ]},
    {HoustonRockets: [
        {home: ["#FFFFFF", "#CE1141"]},
        {away: ["#CE1141", "#FFFFFF"]}
    ]},
    {IndianaPacers: [
        {home: ["#FFFFFF", "#002D62"]},
        {away: ["#002D62", "#FDBB30"]}
    ]},
    {LosAngelesClippers: [
        {home: ["#FFFFFF", "#1D428A"]},
        {away: ["#1D428A", "#FFFFFF"]}
    ]},
    {LosAngelesLakers: [
        {home: ["#FDB927", "#552583"]},
        {away: ["#552583", "#FDB927"]}
    ]},
    {MemphisGrizzlies: [
        {home: ["#FFFFFF", "#12173F"]},
        {away: ["#12173F", "#5D76A9"]}
    ]},
    {MiamiHeat: [
        {home: ["#FFFFFF", "#98002E"]},
        {away: ["#000000", "#98002E"]}
    ]},
    {MilwaukeeBucks: [
        {home: ["#EEE1C6", "#00471B"]},
        {away: ["#00471B", "#EEE1C6"]}
    ]},

]

//Function will return first item in chosen teams home array, adjust as needed

// function getColours(team) {
//     const teamName = team.split(" ").join("")
//     return nbaColours[0][teamName][0].home[0]
// }