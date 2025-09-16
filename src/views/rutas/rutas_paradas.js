/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CRow,
  CCol,
  CSpinner,
  CButton,
} from '@coreui/react'
import { GoogleMap, Marker, Polyline, useJsApiLoader } from '@react-google-maps/api'
import { getPuntosByRuta } from '../../services/puntosRutaService'

const containerStyle = {
  width: '100%',
  height: '100%',
}

const center = {
  lat: -1.0137,
  lng: -79.4646,
}

const Rutas = () => {
  const [puntos, setPuntos] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Estados para línea y sentido
  const [lineaSeleccionada, setLineaSeleccionada] = useState(12)
  const [sentido, setSentido] = useState(1) // 1 = IDA, 0 = VUELTA
  const [rutaSeleccionada, setRutaSeleccionada] = useState(23) // 12 * 2 - 1 = 23

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyAF0J8ZotuystEYO-lfOD6aEPmKsu-6DY4",
  })

  useEffect(() => {
    const idRuta = sentido === 1 ? lineaSeleccionada * 2 - 1 : lineaSeleccionada * 2
    setRutaSeleccionada(idRuta)
  }, [lineaSeleccionada, sentido])

  useEffect(() => {
    if (rutaSeleccionada) {
      cargarPuntos(rutaSeleccionada)
    }
  }, [rutaSeleccionada])

  const cargarPuntos = async (idRuta) => {
    try {
      setLoading(true)
      setError(null)
      const data = await getPuntosByRuta(idRuta)
      setPuntos(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader className="d-flex justify-content-between align-items-center">
            <strong>Visualización de Rutas</strong>
            
            <div className="d-flex align-items-center gap-2">
              <span className="fw-bold">Bus: </span>
              <div className="d-flex flex-wrap gap-1">
                {[...Array(15)].map((_, i) => {
                  const num = i + 1
                  return (
                    <CButton
                      key={num}
                      color={lineaSeleccionada === num ? "primary" : "secondary"}
                      shape="rounded-circle"
                      size="sm"
                      style={{ width: "35px", height: "35px", padding: 0 }}
                      onClick={() => setLineaSeleccionada(num)}
                    >
                      {num}
                    </CButton>
                  )
                })}
              </div>

              <span className="fw-bold">Sentido: </span>
              <div className="d-flex gap-1 ms-3">
                <CButton
                  color={sentido === 1 ? "success" : "secondary"}
                  shape="rounded-circle"
                  size="sm"
                  style={{ width: "35px", height: "35px", padding: 0 }}
                  onClick={() => setSentido(1)}
                >
                  ↑
                </CButton>
                <CButton
                  color={sentido === 0 ? "danger" : "secondary"}
                  shape="rounded-circle"
                  size="sm"
                  style={{ width: "35px", height: "35px", padding: 0 }}
                  onClick={() => setSentido(0)}
                >
                  ↓
                </CButton>
              </div>
            </div>
          </CCardHeader>

          <CCardBody style={{ height: 'calc(100vh - 200px)' }}>
            {loading && (
              <div className="text-center">
                <CSpinner color="primary" />
              </div>
            )}
            {error && <p className="text-danger">{error}</p>}

            {!loading && !error && isLoaded && (
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={13}
              >
                {puntos.map((p, i) => (
                  <Marker
                    key={i}
                    position={{
                      lat: parseFloat(p.latitude),
                      lng: parseFloat(p.longitude),
                    }}
                    label={`${i + 1}`}
                  />
                ))}

                <Polyline
                  path={puntos.map((p) => ({
                    lat: parseFloat(p.latitude),
                    lng: parseFloat(p.longitude),
                  }))}
                  options={{ strokeColor: '#FF0000', strokeWeight: 4 }}
                />
              </GoogleMap>
            )}

            {!isLoaded && (
              <div className="text-center">
                <CSpinner color="secondary" />
                <p>Cargando mapa...</p>
              </div>
            )}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Rutas
