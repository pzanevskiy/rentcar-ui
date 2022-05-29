import { InputLabel, Select, MenuItem, FormControl, Typography, Button, Grid } from "@mui/material"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { City, Country } from "../../api"
import { getCities, getCountries } from "../../api/requests"

export const ChooseLocation = () => {
  const [countries, setCountries] = useState<Country[]>([])
  const [isCity, setisCity] = useState<boolean>(false)
  const [country, setCountry] = useState<string>('')

  const [cities, setCities] = useState<City[]>([])
  const [city, setCity] = useState<string>('')

  useEffect(() => {
    getCountriesList()
  }, [])

  const getCountriesList = () => {
    getCountries().then((response: any) => {
      setCountries(response)
    })
  }

  const getCitiesList = (value: any) => {
    // debugger
    const countryId = countries.find((i: Country) => i.countryName === value)?.countryId
    getCities(countryId!)
      .then((response: City[]) => {
        setCity('')
        if (response.length === 0) {
          setisCity(false)
        } else {
          setCities(response)
          setisCity(true)
        }
      })
    setCountry(value ?? '')
  }

  const onCityChange = (value: any) => {
    setCity(value)
  }
  const navigate = useNavigate()
  const handle = (event: any) => {
    event.preventDefault()
    navigate(`/cars/${cities.find((i: City) => i.cityName === city)?.cityId}`)
  }

  return (
    <div>
      <form onSubmit={handle}>
        <Grid container spacing={2} >
          <Grid item xs={12} mt={2}>
            <Typography variant="h4" align="center">
              Choose your location
            </Typography>
          </Grid>
          <Grid item xs={12} md={isCity ? 6 : 12} sx={{ textAlign: 'center' }}>
            <FormControl sx={{ m: 1, minWidth: 300 }}>
              <InputLabel id="country-label">Country</InputLabel>
              <Select
                labelId="country-label"
                value={country}
                label="Country"
                onChange={(e) => getCitiesList(e.target.value)}
                renderValue={(value) => value}
              >
                <MenuItem value="" disabled>
                  <em>None</em>
                </MenuItem>
                {countries.map((country: Country) =>
                  (<MenuItem key={country.countryId} value={country.countryName}>{country.countryName}</MenuItem>))}
              </Select>
            </FormControl>
          </Grid>
          {isCity ? (
            <Grid item xs={12} md={5} sx={{ textAlign: 'center' }}>
              <FormControl sx={{ m: 1, minWidth: 300 }}>
                <InputLabel id="city-label">City</InputLabel>
                <Select
                  labelId="city-label"
                  value={city}
                  label="City"
                  onChange={(e) => onCityChange(e.target.value)}
                  renderValue={(value) => value}
                >
                  <MenuItem value="" disabled>
                    <em>None</em>
                  </MenuItem>
                  {cities.map((city: any) =>
                    (<MenuItem key={city['cityId']} value={city['cityName']}>{city['cityName']}</MenuItem>))}
                </Select>
              </FormControl>
            </Grid>
          ) : (<div></div>)
          }
        </Grid>
        <Grid item xs={12} sx={{ mt: 2, textAlign: 'center' }}>
          <Button variant="contained" type="submit" >
            Go next
          </Button>
        </Grid>

      </form >

    </div >
  )
}