/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root';
import { Route as UsersImport } from './routes/users';
import { Route as ProductsImport } from './routes/products';
import { Route as IndexImport } from './routes/index';

// Create/Update Routes

const UsersRoute = UsersImport.update({
    id: '/users',
    path: '/users',
    getParentRoute: () => rootRoute,
} as any);

const ProductsRoute = ProductsImport.update({
    id: '/products',
    path: '/products',
    getParentRoute: () => rootRoute,
} as any);

const IndexRoute = IndexImport.update({
    id: '/',
    path: '/',
    getParentRoute: () => rootRoute,
} as any);

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
    interface FileRoutesByPath {
        '/': {
            id: '/';
            path: '/';
            fullPath: '/';
            preLoaderRoute: typeof IndexImport;
            parentRoute: typeof rootRoute;
        };
        '/products': {
            id: '/products';
            path: '/products';
            fullPath: '/products';
            preLoaderRoute: typeof ProductsImport;
            parentRoute: typeof rootRoute;
        };
        '/users': {
            id: '/users';
            path: '/users';
            fullPath: '/users';
            preLoaderRoute: typeof UsersImport;
            parentRoute: typeof rootRoute;
        };
    }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
    '/': typeof IndexRoute;
    '/products': typeof ProductsRoute;
    '/users': typeof UsersRoute;
}

export interface FileRoutesByTo {
    '/': typeof IndexRoute;
    '/products': typeof ProductsRoute;
    '/users': typeof UsersRoute;
}

export interface FileRoutesById {
    __root__: typeof rootRoute;
    '/': typeof IndexRoute;
    '/products': typeof ProductsRoute;
    '/users': typeof UsersRoute;
}

export interface FileRouteTypes {
    fileRoutesByFullPath: FileRoutesByFullPath;
    fullPaths: '/' | '/products' | '/users';
    fileRoutesByTo: FileRoutesByTo;
    to: '/' | '/products' | '/users';
    id: '__root__' | '/' | '/products' | '/users';
    fileRoutesById: FileRoutesById;
}

export interface RootRouteChildren {
    IndexRoute: typeof IndexRoute;
    ProductsRoute: typeof ProductsRoute;
    UsersRoute: typeof UsersRoute;
}

const rootRouteChildren: RootRouteChildren = {
    IndexRoute: IndexRoute,
    ProductsRoute: ProductsRoute,
    UsersRoute: UsersRoute,
};

export const routeTree = rootRoute
    ._addFileChildren(rootRouteChildren)
    ._addFileTypes<FileRouteTypes>();

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/products",
        "/users"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/products": {
      "filePath": "products.tsx"
    },
    "/users": {
      "filePath": "users.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
