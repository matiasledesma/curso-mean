export class Song{
    constructor(
        public _id: string,
        public title: string,
        public duration: string,
        public file: string,
        public number: number,
        public album: string,
    ){}
}