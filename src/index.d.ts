declare module '*.png';
declare module '*.css' {
    const exports: { [exportName: string]: string };
    export = exports;
  };
declare module 'lodash';