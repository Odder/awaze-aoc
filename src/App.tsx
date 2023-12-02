import { createContext, useEffect, useState } from 'react';
import { Container, createTheme, CssBaseline, ThemeProvider, Typography } from '@mui/material';
import Footer from './components/footer/footer';
import Rankings from './components/rankings/rankings';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
})

export const RankingContext = createContext(null as any)

export default function MyApp() {
    const [rankings, setRankings] = useState([] as any)
    const [aocRankings, setAocRankings] = useState({} as any)

    useEffect(() => {
        fetch('https://advent-of-code.s3.eu-west-1.amazonaws.com/leaderboard.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setAocRankings(data);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }, [])

    useEffect(() => {
        // fetch rankings
        if (!aocRankings.members) return
        const members = Object.values(aocRankings.members).filter((m: any) => m.local_score > 0);
        const problems: any = members.reduce((acc: any, m: any) => {
            Object.keys(m.completion_day_level).forEach((day: any) => {
                Object.keys(m.completion_day_level[day]).forEach((part: any) => {
                    if (!acc[`${day}-${part}`]) {
                        acc[`${day}-${part}`] = []
                    }
                    acc[`${day}-${part}`].push({
                        'member': m,
                        'timestamp': m.completion_day_level[day][part].get_star_ts,
                    })
                })
            })
            return acc
        }, {} as any)
        const rankedProblems = Object.keys(problems).map((key: any) => {
            return problems[key].sort((a: any, b: any) => a.timestamp - b.timestamp)
        })
        const trophiesById: any = members.reduce((acc: any, m: any) => {
            return {
                ...acc,
                [m.id]: {
                    'gold': 0,
                    'silver': 0,
                    'bronze': 0,
                }
            }
        }, {})
        rankedProblems.forEach((problem: any) => {
            if (problem.length > 0) {
                trophiesById[problem[0].member.id]['gold'] += 1
            }
            if (problem.length > 1) {
                trophiesById[problem[1].member.id]['silver'] += 1
            }
            if (problem.length > 2) {
                trophiesById[problem[2].member.id]['bronze'] += 1
            }
        })

        members.sort((a: any, b: any) => b.local_score - a.local_score)
        members.forEach((m: any, index: number) => {
            m['trophies'] = trophiesById[m.id]
        })
        setRankings(members)
    }, [aocRankings])

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <RankingContext.Provider value={{ rankings, setRankings }}>
                <Typography variant="h2" component="h2" align="center" sx={{ margin: "50px 0" }}>
                    Advent of Code 2023
                </Typography>
                <Container sx={{ flexGrow: 1, marginBottom: "75px" }}>
                    <Rankings />
                </Container>
                <Footer />
            </RankingContext.Provider>
        </ThemeProvider>
    );
}