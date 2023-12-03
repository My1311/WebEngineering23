const x = {a: 1, b: 2, c: [{d: 3}, 4] };

const deepCopy = (struct) =>
    Array.isArray( struct ) ? struct.map( item => deepCopy( item ) ) :
        typeof struct === "object" && struct !== null ? Object.fromEntries( Object.entries( struct ).map( ([key, value]) => [ key, deepCopy( value ) ] ) ) :
            struct;

const deepEqual = (x,y) =>{
    if(x === y) {
        return true;
    }
    else if ((typeof x == "object" && x != null) && (typeof y == "object" && y != null)) {
        if (Object.keys(x).length !== Object.keys(y).length)
            return false;

        for (var prop in x) {
            if (y.hasOwnProperty(prop))
            {
                if (! deepEqual(x[prop], y[prop]))
                    return false;
            }
            else
                return false;
        }

        return true;
    }
    else
        return false;
};
console.log( deepCopy( x ) );
console.assert( deepEqual( x, deepCopy( x )) );
