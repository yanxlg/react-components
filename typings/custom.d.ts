declare module '*.svg'
declare module '*.png'
declare module '*.jpg'

declare module '*.less' {
    const resource: {[key: string]: string};
    export = resource;
}