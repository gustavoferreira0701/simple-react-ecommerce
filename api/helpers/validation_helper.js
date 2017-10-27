class validation {
    constructor(){        
        this.messages = [];
    }

    isValid(){
        return this.messages.length === 0;
    }

    addMessage(message){
        this.messages.push(message);
    }
}

module.exports = validation;