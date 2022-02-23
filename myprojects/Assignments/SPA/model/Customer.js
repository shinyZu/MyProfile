function Customer (id, name, address, contact) {
    var __id = id;
    var __name = name;
    var __address = address;
    var __contact = contact;

    this.getCustomerID = function () {
        return __id;
    }

    this.setCustomerID = function (id) {  
        __id = id;
    }

    this.getCustomerName = function () {
        return __name;
    }

    this.setCustomerName = function (name) {
        __name = name;
    }

    this.getCustomerAddress = function () {
        return __address;
    }

    this.setCustomerAddress = function (address) {
        __address = address;
    }

    this.getCustomerContact = function () {
        return __contact;
    }

    this.setCustomerContact = function (contact) {
        __contact = contact;
    }
}