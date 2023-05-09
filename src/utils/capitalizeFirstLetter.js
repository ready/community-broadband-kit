export default function capitalizeFirstLetter (title) {
  return title?.charAt(0).toUpperCase() + title?.slice(1)
}

export const capitalizeTitleCase = (str) => {
  const splitStr = str.toLowerCase().split(' ')
  for (let i = 0; i < splitStr.length; i++) {
    splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1)
  }

  return splitStr.join(' ')
}

export const capitalizePlaceTypes = (str, state) => {
  if (str === 'county_sub') return 'County Subdivision'
  if (str === 'county' && state === 'LA') return 'Parish'
  const splitStr = str.toLowerCase().split('_')
  return splitStr[0]?.charAt(0).toUpperCase() + splitStr[0]?.slice(1)
}

export const addPlaceTypeToPlaceName = (placeName, placeType, state) => {
  if (state === 'LA' && placeType === 'County') {
    return placeName + ' Parish'
  } else {
    return placeName + ' ' + placeType
  }
}
