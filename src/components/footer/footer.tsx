import * as React from 'react';
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import TrophyIcon from '@mui/icons-material/EmojiEvents';
import StarIcon from '@mui/icons-material/Star';
import TimelineIcon from '@mui/icons-material/Timeline';
import { RankingContext } from '../../App';

export default function Footer() {
    const [value, setValue] = React.useState(0);
    const { rankings, setRankings } = React.useContext(RankingContext)

    return (
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
            <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    switch (newValue) {
                        case "recent":
                            rankings.sort((a: any, b: any) => b.last_star_ts - a.last_star_ts)
                            break
                        case "points":
                            rankings.sort((a: any, b: any) => b.local_score - a.local_score)
                            break
                        case "stars":
                            rankings.sort((a: any, b: any) => b.stars - a.stars)
                            break
                        case "trophies":
                            rankings.sort((a: any, b: any) => b.trophies.gold * 3 + b.trophies.silver * 2 + b.trophies.bronze - a.trophies.gold * 3 - a.trophies.silver * 2 - a.trophies.bronze)
                            break
                    }
                    setValue(newValue);
                    setRankings([...rankings]);
                }}
            >
                <BottomNavigationAction value="recent" label="Recents" icon={<RestoreIcon />} />
                <BottomNavigationAction value="points" label="Points" icon={<TimelineIcon />} />
                <BottomNavigationAction value="stars" label="Stars" icon={<StarIcon />} />
                <BottomNavigationAction value="trophies" label="Trophies" icon={<TrophyIcon />} />
            </BottomNavigation>
        </Paper>
    );
}