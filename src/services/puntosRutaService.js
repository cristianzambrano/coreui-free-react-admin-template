/* eslint-disable prettier/prettier */
import api from './api'

// Obtener todos los puntos
export const getPuntos = async () => {
  const res = await api.get('/puntos')
  return res.data
}

// Obtener un punto por ID
export const getPuntoById = async (id) => {
  const res = await api.get(`/puntos/${id}`)
  return res.data
}

// Crear un nuevo punto de ruta
export const createPunto = async (punto) => {
  const res = await api.post('/puntos', punto)
  return res.data
}

// Actualizar un punto existente
export const updatePunto = async (id, punto) => {
  const res = await api.put(`/puntos/${id}`, punto)
  return res.data
}

// Eliminar un punto
export const deletePunto = async (id) => {
  await api.delete(`/puntos/${id}`)
  return true
}

export const getPuntosByRuta = async (idRuta) => {
  const res = await api.get(`/puntos/ruta/${idRuta}`)
  return res.data
}
