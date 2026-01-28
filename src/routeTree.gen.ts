

import { Route as rootRouteImport } from './routes/__root'
import { Route as TodoRouteImport } from './routes/todo'
import { Route as DashboardRouteImport } from './routes/Dashboard'
import { Route as IndexRouteImport } from './routes/index'

const TodoRoute = TodoRouteImport.update({
  id: '/todo',
  path: '/todo',
  getParentRoute: () => rootRouteImport,
} as any)
const DashboardRoute = DashboardRouteImport.update({
  id: '/Dashboard',
  path: '/Dashboard',
  getParentRoute: () => rootRouteImport,
} as any)
const IndexRoute = IndexRouteImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRouteImport,
} as any)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/Dashboard': typeof DashboardRoute
  '/todo': typeof TodoRoute
}
export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/Dashboard': typeof DashboardRoute
  '/todo': typeof TodoRoute
}
export interface FileRoutesById {
  __root__: typeof rootRouteImport
  '/': typeof IndexRoute
  '/Dashboard': typeof DashboardRoute
  '/todo': typeof TodoRoute
}
export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/Dashboard' | '/todo'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/Dashboard' | '/todo'
  id: '__root__' | '/' | '/Dashboard' | '/todo'
  fileRoutesById: FileRoutesById
}
export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  DashboardRoute: typeof DashboardRoute
  TodoRoute: typeof TodoRoute
}

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/todo': {
      id: '/todo'
      path: '/todo'
      fullPath: '/todo'
      preLoaderRoute: typeof TodoRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/Dashboard': {
      id: '/Dashboard'
      path: '/Dashboard'
      fullPath: '/Dashboard'
      preLoaderRoute: typeof DashboardRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexRouteImport
      parentRoute: typeof rootRouteImport
    }
  }
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  DashboardRoute: DashboardRoute,
  TodoRoute: TodoRoute,
}
export const routeTree = rootRouteImport
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()
