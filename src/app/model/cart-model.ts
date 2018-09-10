export class Order {
    
    constructor(
        private shirtId:number,
        private order_quantity:number) {}

    getShirtId():number {
        return this.shirtId;
    }

    setShirtId(id:number) {
        this.shirtId = id;
    }

    getOrderQuantity():number {
       return this.order_quantity;
    }

    increaseOrderQuantity(){
        this.order_quantity ++;
    }
}