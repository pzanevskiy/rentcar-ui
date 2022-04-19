import Avatar from "@mui/material/Avatar"
import { useKeycloak } from "@react-keycloak/web"
import { KeycloakTokenParsed } from "keycloak-js"
import { useEffect, useState } from "react"

export const ProfilePicture = () => {
  const { keycloak } = useKeycloak()
  const [avatar, setAvatar] = useState<string>('')

  useEffect(() => {
    getAvatar()
  }, [avatar])

  const stringToColor = (string: string) => {
    let hash = 0
    let i

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash)
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff
      color += `00${value.toString(16)}`.slice(-2)
    }
    /* eslint-enable no-bitwise */

    return color
  }

  const stringAvatar = (name: string) => {
    return {
      sx: {
        width: 24,
        height: 24,
        bgcolor: stringToColor(name),
        fontSize: 12
      },
      children: name,
    }
  }

  const getAvatar = () => {
    const tokenParsed: KeycloakTokenParsed = keycloak.idTokenParsed!
    const { picture: pictureUrl } = tokenParsed

    if (pictureUrl === undefined) {
      const { given_name: firstName, family_name: lastName } = tokenParsed
      setAvatar(firstName[0].toUpperCase() + lastName[0].toUpperCase())
    } else {
      setAvatar(pictureUrl)
    }
  }
  
  return (
    <>
      {
        avatar.length === 2 ?
          <Avatar {...stringAvatar(avatar)} /> :
          <Avatar sx={{ width: 24, height: 24, fontSize: 12 }} src={avatar} />
      }
    </>
  )
}