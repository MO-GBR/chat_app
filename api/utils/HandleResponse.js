import moment from "moment";

const currentTime = moment().format('MMMM Do YYYY, h:mm:ss a');

class ErrorResponse extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
};

class AuthResponse {
    constructor(data, token, message, status) {
        this.data = data;
        this.token = token;
        this.message = message;
        this.status = status;
        this.time = currentTime;
    }
}

export{ ErrorResponse, AuthResponse, currentTime };