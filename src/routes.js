import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Rutas_Paradas = React.lazy(() => import('./views/rutas/rutas_paradas'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/rutas/rutas_paradas', name: 'Rutas_Paradas', element: Rutas_Paradas },
]

export default routes
