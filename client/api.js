// export const localURL = 'http://localhost:3000/';
if(process.env.NODE_ENV === 'production') {
    export const localURL = 'https://ocelot13.herokuapp.com/';
} else {
    export const localURL = 'http://localhost:3000/';
}