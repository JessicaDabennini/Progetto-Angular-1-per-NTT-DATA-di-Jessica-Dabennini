export class Comments {
    constructor(
        public id: number,
        public post_id: number,
        public name: string,
        public email: string,
        public body: string,
    ){}
}
