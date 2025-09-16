import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilExternalLink,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
  cilBusAlt,
  cilList,
  cilFork,
  cilMap,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    component: CNavTitle,
    name: 'Inicializaciones',
  },
  {
    component: CNavItem,
    name: 'Cooperativa Buses',
    to: '/cooperativas',
    icon: <CIcon icon={cilBusAlt} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Líneas Buses',
    to: '/lineas',
    icon: <CIcon icon={cilList} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Rutas por Líneas',
    to: '/rutas',
    icon: <CIcon icon={cilFork} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Recorridos y Paradas',
  },
  {
    component: CNavItem,
    name: 'Mapa de Rutas',
    to: '/rutas/rutas_paradas',
    icon: <CIcon icon={cilMap} customClassName="nav-icon" />,
  },
]

export default _nav
