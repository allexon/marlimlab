import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L, { LatLngBounds, LatLngExpression } from 'leaflet'
import { useEffect } from 'react'
import { mapStore, clientStore } from '../../../store/index'

export default function MapRoutes() {

    const uf: LatLngExpression = [-20.3222, -40.3381] // Espirito Santo
    const city: LatLngExpression = [-20.1294, -40.3081] // Serra
    const boundingBox: LatLngBounds = L.latLngBounds([-21.4366118, -17.8919535], [-41.8798147, -28.6289646])

    const map = mapStore(state => state)
    const client = clientStore(state => state)
        
    useEffect(() => {
        // return () => {socket.off(gas.IO_PRODUCT_REVENDA_GAS_LIST)}
    }, [])

    

    return (
        <div id='map' style={{height:'450px', width:'100%'}}>
            <MapContainer center={uf} zoom={12} scrollWheelZoom={false} style={{width:'100%', height:'100%'}} bounds={boundingBox}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    
                {/* Aqui você pode adicionar o seu código para delimitar as áreas que você deseja atender */}
    
                <Marker position={uf} icon={L.icon({ iconUrl: 'https://cdn4.iconfinder.com/data/icons/small-n-flat/24/map-marker-512.png', iconSize: [50, 50], iconAnchor: [25, 50] })}>
                    <Popup>Seu endereço aqui!</Popup>
                </Marker>
            </MapContainer>
        </div>
    )
}