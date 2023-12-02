import { Avatar, Card, CardContent, CardHeader, Typography, ListItem, CardActions, Button, Stack } from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import TrophyIcon from '@mui/icons-material/EmojiEvents';
import StarIcon from '@mui/icons-material/Star';
import TimelineIcon from '@mui/icons-material/Timeline';
import List from '@mui/material/List';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import moment from 'moment';
import { useState } from 'react';

function SimpleDialog({ onClose, user, open }: any) {

    const handleClose = () => {
        onClose(user);
    };

    const timeString = (timestamp: number | null) => {
        if (!timestamp) return "Not solved"
        return moment(timestamp * 1000).fromNow()
    }

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Submissions</DialogTitle>
            <List sx={{ pt: 0 }}>
                {user.completion_day_level && Object.keys(user.completion_day_level).map((day: any) => (
                    <ListItem button onClick={() => (2)}>
                        <ListItemAvatar>
                            <Avatar>
                                {day}
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={`Solved: ${timeString(user.completion_day_level[day]["2"]?.get_star_ts)}`}
                            secondary={`Part 1: ${timeString(user.completion_day_level[day]["1"]?.get_star_ts)}`}
                        />
                    </ListItem>
                ))}
            </List>
        </Dialog>
    );
}

export default function RankingCard({ ranking, rank }: { ranking: any, rank: number }) {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value: string) => {
        setOpen(false);
    };

    return (
        <Card>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" src={`https://www.robohash.org/${ranking.name}?set=set4`}>
                        {ranking.name[0]}
                    </Avatar>
                }
                title={ranking.name}
                subheader={ranking.local_score > 0 ? `#${rank}` : "Not started yet"}
            />
            <CardContent>
                <Stack direction="row" spacing={2}>
                    <Typography variant="body2">
                        <TimelineIcon color="warning" sx={{ verticalAlign: "middle" }} /> {ranking.local_score} points
                    </Typography>
                    <Typography variant="body2">
                        <StarIcon color="warning" sx={{ verticalAlign: "middle" }} /> {ranking.stars} stars
                    </Typography>
                </Stack>
                <Stack direction="row" spacing={2}>
                    <Typography variant="body2">
                        <TrophyIcon color="warning" sx={{ verticalAlign: "middle" }} /> {ranking.trophies.gold}
                    </Typography>
                    <Typography variant="body2">
                        <TrophyIcon sx={{ verticalAlign: "middle", color: "#C0C0C0" }} /> {ranking.trophies.silver}
                    </Typography>
                    <Typography variant="body2">
                        <TrophyIcon sx={{ verticalAlign: "middle", color: "#cd7f32" }} /> {ranking.trophies.bronze}
                    </Typography>
                </Stack>
                <Typography variant="body2">
                    <RestoreIcon color="success" sx={{ verticalAlign: "middle" }} /> Latest solved: {moment(ranking.last_star_ts * 1000).fromNow()}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={handleClickOpen}>Submissions</Button>
            </CardActions>
            <SimpleDialog user={ranking} open={open} onClose={handleClose} />
        </Card>
    )
}