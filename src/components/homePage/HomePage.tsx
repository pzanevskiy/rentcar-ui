import {
  Box,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Link,
  Paper,
  Stack,
  Card,
  Button,
  Typography
} from "@mui/material"
import { useKeycloak } from "@react-keycloak/web"
import { Carousel, CarouselItem } from "react-bootstrap"

const cars = [
  {
    description: `Get a fantastic deal on a RENTALCAR SUV rental car - the perfect vehicle for action packed vacations with the whole family. 
    Make sure that everyone has plenty of leg room and that you can fit all your luggage with a spacious, luxurious SUV. 
    With plenty of top quality SUV rental cars to choose from, SIXT is your one stop destination for a safe, fun-filled vacation or road trip.`,
    type: 'SUV',
    pic: 'https://www.pngplay.com/wp-content/uploads/13/SUV-Free-Picture-PNG.png'
  },
  {
    description: `We are offers a wide range of convertibles at almost all of our locations. 
    Explore the stunning sights with the top down. Navigating to any destination is made more enjoyable and memorable with a convertible rental. 
    Make your next road trip or vacation extra special and choose a stylish convertible from us.`,
    type: 'CONVERTIBLE',
    pic: 'https://www.pngplay.com/wp-content/uploads/6/Convertible-Car-PNG-Clipart-Background.png'
  },
  {
    description: `When you rent a sedan with RENTCAR, you and your passengers will be able to travel in comfort. 
    If you are planning to do a lot of driving and won't be solely in urban areas, a regular or premium sedan could be right for your trip. 
    In a sedan, you have more seating and trunk space than in smaller cars, and they are a more economical choice than larger vehicles such as SUVs. 
    From more compact models to luxury brands, select from a wide range of sedan types in the RENTCAR fleet to suit your needs.`,
    type: 'SEDAN',
    pic: 'https://www.pngplay.com/wp-content/uploads/13/Sedan-Background-PNG-Image.png'
  },
  {
    description: `By renting an electric car from RENTCAR, you and your passengers can travel in peace and comfort. 
    Electric cars are good because they do not make any noise. 
    If you plan to drive around the city, then an electric car is the best choice. 
    From smaller models to luxury brands, choose from the wide range of RENTCAR eletric carss that suits your needs.`,
    type: 'ELECTRIC CARS',
    pic: 'https://www.pngplay.com/wp-content/uploads/13/Tesla-Download-Free-PNG.png'
  },
  {
    description: `With a sports car rental, you can get to your destination while turning heads. 
    Whether you are renting in the Belarus or at one of our locations worldwide, you can be sure to get a sports car rental from a top carmaker. 
    Any trip can be made better with a RENTCAR sports car rental!`,
    type: 'SPORTS CAR',
    pic: 'https://pngimg.com/uploads/ferrari/ferrari_PNG10657.png'
  }
]

const discount = [
  {
    desctiption: `Silver discount is suitable for those who plan to spend their holidays in comfort`,
    type: `Silver`,
    pic: `https://upload.wikimedia.org/wikipedia/commons/b/b1/Silver_star.png`,
    discount: `5%`,
    price: `149$`,
  },
  {
    desctiption: `With a golden discount, you can travel around the country without fear of finances`,
    type: `Gold`,
    pic: `https://www.pngmart.com/files/16/Vector-Gold-Star-PNG-Photos.png`,
    discount: `10%`,
    price: `349$`
  },
  {
    desctiption: `With a platinum discount, you will get an unforgettable experience with our cars`,
    type: `Platinum`,
    pic: `https://i.pinimg.com/originals/ee/20/d6/ee20d64932ad3df04f6da6d222da7f5b.jpg`,
    discount: `20%`,
    price: `449$`
  },
]

export const HomePage = () => {
  const { keycloak } = useKeycloak()

  return (
    <div>
      <Box p={1}>
        <Grid container>
          <Grid container m={2}>
            <Grid item xs={12}>
              <Typography variant="h5" gutterBottom>Explore discounts</Typography>
            </Grid>
            {discount.map((d, i) => (
              <Grid item xs={12} sm={12} md={4} p={1} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Card key={i} sx={{ maxWidth: '350px' }}>
                  <CardActionArea>
                    <CardMedia
                      sx={{ transform: 'scale(0.9)' }}
                      loading='lazy'
                      component="img"
                      height="200"
                      image={d.pic}
                      alt={d.type}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {d.type} - {d.discount}
                      </Typography>
                      <Typography gutterBottom variant="body2" color="text.secondary">
                        {d.desctiption}
                      </Typography>
                      <Typography variant="h5" component="div">
                        Price - {d.price}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  {keycloak.authenticated &&
                    <CardActions>
                      <Button size="small" color="primary">
                        Add
                      </Button>
                    </CardActions>
                  }
                </Card>
              </Grid>
            ))}
          </Grid>
          <Grid container m={1} sx={{ justifyContent: 'center' }}>
            <Grid item xs={12}>
              <Typography variant="h5" gutterBottom>Discover new types of cars with us</Typography>
            </Grid>
            <Grid item xs={12} maxWidth="100%">
              <Carousel variant="dark" className="h-100" interval={5000} indicators={false}>
                {cars.map((s, i) =>
                (<CarouselItem>
                  <Typography variant="subtitle1" sx={{ display: 'flex', justifyContent: 'center' }} gutterBottom>{s.type}</Typography>
                  <Typography variant="caption" sx={{ mx: 3, display: 'flex', justifyContent: 'center' }} gutterBottom>{s.description}</Typography>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <img
                      className="d-block mx-1"
                      loading="lazy"
                      height="250px"
                      src={s.pic}
                      alt={s.type}
                    />
                  </div>
                </CarouselItem>)
                )}
              </Carousel>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </div>
  )
}
