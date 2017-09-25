class validation {
    constructor(_valid, ..._messages){
        this.valid = _valid;
        this.messages = _messages || [];
    }
}

module.exports = validation;