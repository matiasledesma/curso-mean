export class Album{
    constructor(
        public _id: string,
        public title: string,
        public description: string,
        public image: string,
        public year: number,
        public artist: string,
    ){}
}