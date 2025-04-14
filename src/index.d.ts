declare module '*.png';
declare module '*.css' {
    const exports: { [exportName: string]: string };
    export = exports;
  };
declare module '*.mp3';
declare module 'lodash';