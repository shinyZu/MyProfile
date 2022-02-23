function Orders (orderId, orderDate, orderCost, custId) {
    var __orderId = orderId;
    var __orderDate = orderDate;
    var __orderCost = orderCost;
    var __discount = discount;
    var __custId = custId;

    this.getOrderId = function () {
        return __orderId;
    }

    this.setOrderId = function (orderId) {
        __orderId = orderId;
    }

    this.getOrderDate = function () {
        return __orderDate;
    }

    this.setOrderDate = function (orderDate) {
        __orderDate = orderDate;
    }

    this.getOrderCost = function () {
        return orderCost;
    }

    this.setOrderCost = function (orderCost) {
        __orderCost = orderCost;
    }

    this.getOrderDiscount = function () {
        return discount;
    }

    this.setOrderDiscount = function (discount) {
        __discount = discount;
    }

    this.getCustomerID = function () {
        return __custId;
    }

    this.setCustomerID = function (custId) {  
        __custId = custId;
    }
}