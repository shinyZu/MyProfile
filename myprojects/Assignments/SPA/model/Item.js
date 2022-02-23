function Item (code, description, unitPrice, qtyOnHand) {
    var __code = code;
    var __description = description;
    var __unitPrice = unitPrice;
    var __qtyOnHand = qtyOnHand;


    this.getItemCode = function () {  
        return __code;
    }

    this.setItemCode = function (code) {  
        __code = code;
    }

    this.getDescription = function () {  
        return __description;
    }

    this.setDescription = function (description) {  
        __description = description;
    }

    this.getUnitPrice = function () {  
        return __unitPrice;
    }

    this.setUnitPrice = function (unitPrice) {  
        __unitPrice = unitPrice;
    }

    this.getQtyOnHand = function () {  
        return __qtyOnHand;
    }

    this.setQtyOnHand = function (qtyOnHand) {  
        __qtyOnHand = qtyOnHand;
    }
}