export class Trip {
    constructor(
        public id: string,
        public name: string,
        public date: string,
        public time: string,
        public origin: string,
        public destination: string,
        public editing: boolean = false
    ) { }
}