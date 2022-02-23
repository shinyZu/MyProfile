function OrderDetails (orderId, itemCode, orderQty) {
    var __orderId = orderId;
    var __itemCode = itemCode;
    var __orderQty = orderQty;

    this.getOrderId = function () {
        return __orderId;
    }

    this.setOrderId = function (orderId) {
        __orderId = orderId;
    }

    this.getItemCode = function () {  
        return __itemCode;
    }

    this.setItemCode = function (itemCode) {  
        __itemCode = itemCode;
    }

    this.getOrderQty = function () {  
        return __orderQty;
    }

    this.setOrderQty = function (orderQty) {  
        __orderQty = orderQty;
    }
}