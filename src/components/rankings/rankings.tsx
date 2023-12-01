import { useContext } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { RankingContext } from '../../App';
import RankingCard from '../ranking-card/ranking-card';

export default function Rankings() {
  const { rankings } = useContext(RankingContext)

  return (
    <Grid container spacing={2}>
      {rankings.map((ranking: any, index: number) => (
        <Grid key={index} xs={12} md={4}>
          <RankingCard ranking={ranking} rank={index + 1} />
        </Grid>
      ))}
    </Grid>
  );
}