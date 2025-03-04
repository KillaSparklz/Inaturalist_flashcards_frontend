import L from 'leaflet'
import inatLogo from '../inatLogo.png';

const inatIcon = new L.Icon({
  iconUrl: inatLogo,
  iconRetinaUrl: inatLogo,
  iconSize: new L.Point(60, 75),
  className: 'leaflet-div-icon'
});

export { inatIcon };