export default {
    info: (message, args) => {
        args ? console.log(message, args) : console.log(message);
    },
    verbose: (message, args) => {
        args ? console.log(message, args) : console.log(message);
    },
    http: (message, args) => {
        args ? console.log(message, args) : console.log(message);
    },
    error: (message, args) => {
        args ? console.log(message, args) : console.log(message);
    },
    debug: (message, args) => {
        args ? console.log(message, args) : console.log(message);
    },
};