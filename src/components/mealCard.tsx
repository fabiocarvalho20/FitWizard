import { Card, CardContent, CardMedia, Typography } from "@mui/material";

export default function MealCard({
  content,
  macros,
  image,
  name,
}: {
  name: string;
  content: string;
  macros: string;
  image: string;
}) {
  return (
    <div>
      <Card sx={{ width: 250, height: 300, margin: 1 }}>
        <CardMedia
          component="img"
          sx={{ height: 120 }}
          image={image}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {content} <br />
            {macros}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
