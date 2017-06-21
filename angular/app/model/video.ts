export class Video {
    constructor(
        public id: number,
        public title: string,
        public description: string,
        public status: string,
        public image: string,
        public videoPath: string,
        public createdAt: string,
        public updatedAt: string
    ) { }
}