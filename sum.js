// By default we can not use var and methods from one module to another because it is protected, We have to export the modules.
// If we want to export multiple variables, we can do that by using object
console.log(
    "Hello"
)

const x = "Exporting mul Variables";

function calculteSum(a,b) {
    const sum = a+b;
    console.log(sum)
};

module.exports ={ 
    x : x,
    calculteSum : calculteSum
};

