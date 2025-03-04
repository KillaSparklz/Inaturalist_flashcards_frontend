import { inatIcon } from '../icons/inatIcon';
import { Marker } from 'react-leaflet';
import { useRef, useMemo} from 'react';

function DraggableMarker({ position, setPosition }) {
    const markerRef = useRef(null)

    const eventHandlers = useMemo(
      () => ({
        dragend() {
          const marker = markerRef.current
          if (marker != null) {
            setPosition(marker.getLatLng())
          }
        },
      }),
      [],
    )
  
    return (
      <Marker
        draggable={true}
        eventHandlers={eventHandlers}
        position={position}
        ref={markerRef}
        icon={inatIcon}>
      </Marker>
    )
  }

export default DraggableMarker;