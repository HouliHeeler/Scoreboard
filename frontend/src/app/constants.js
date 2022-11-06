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
        {home: ["#C8102E", "#FDB927"]},
        {away: ["#C8102E", "#FDB927"]}
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
    {MinnesotaTimberwolves: [
        {home: ["#FFFFFF", "#236192"]},
        {away: ["#236192", "#9EA2A2"]}
    ]},
    {NewOrleansPelicans: [
        {home: ["#FFFFFF", "#85714D"]},
        {away: ["#0C2340", "#85714D"]}
    ]},
    {NewYorkKnicks: [
        {home: ["#FFFFFF", "#F58426"]},
        {away: ["#006BB6", "#F58426"]}
    ]},
    {OklahomaCityThunder: [
        {home: ["#FFFFFF", "#007AC1"]},
        {away: ["#007AC1", "#F58426"]}
    ]},
    {OrlandoMagic: [
        {home: ["#FFFFFF", "#0077C0"]},
        {away: ["#0077C0", "#F58426"]}
    ]},
    {Philadelphia76ers: [
        {home: ["#FFFFFF", "#006BB6"]},
        {away: ["#ED174C", "#006BB6"]}
    ]},
    {PhoenixSuns: [
        {home: ["#FFFFFF", "#E56020"]},
        {away: ["#1D1160", "#E56020"]}
    ]},
    {PortlandTrailblazers: [
        {home: ["#FFFFFF", "#E03A3E"]},
        {away: ["#000000", "#E03A3E"]}
    ]},
    {SacramentoKings: [
        {home: ["#FFFFFF", "#5A2D81"]},
        {away: ["#5A2D81", "#FFFFFF"]}
    ]},
    {SanAntonioSpurs: [
        {home: ["#C4CED4", "#000000"]},
        {away: ["#000000", "#C4CED4"]}
    ]},
    {TorontoRaptors: [
        {home: ["#FFFFFF", "#CE1141"]},
        {away: ["#CE1141", "#000000"]}
    ]},
    {UtahJazz: [
        {home: ["#FFFFFF", "#002B5C"]},
        {away: ["#002B5C", "#F9A01B"]}
    ]},
    {WashingtonWizards: [
        {home: ["#FFFFFF", "#002B5C"]},
        {away: ["#002B5C", "#E31837"]}
    ]},
]

//Function will return first item in chosen teams home array, adjust as needed

// function getColours(team) {
//     const teamName = team.split(" ").join("")
//     return nbaColours[0][teamName][0].home[0]
// }