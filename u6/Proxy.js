class Vorrang {
    constructor( list ) {
        this._predecessors = {};
        const all = new Set();
        for ( const [ pre, post ] of list ){
            all.add( pre ); all.add( post );
            if ( ! this._predecessors[ post ] ) this._predecessors[ post ] = [];
            this._predecessors[ post ].push( pre );
        }
        all.forEach( item => {
            if ( ! this._predecessors[ item ] ) this._predecessors[ item ] = [];
        })
    }
    predecessors( item ){
        return this._predecessors[ item ];
    }
    * [Symbol.iterator]() {
        while ( Object.keys( this._predecessors ).length > 0 ){
            const find = Object.entries( this._predecessors )
                .find( ([ item, pres ]) => pres.length === 0 );
            const next = find[ 0 ];
            delete this._predecessors[ next ];
            for ( const [ item, pres ] of Object.entries( this._predecessors ) ){
                this._predecessors[ item ] = pres.filter( x => x !== next );
            }
            yield next;
        }
    }
}

const studentenLeben = new Vorrang([ ["schlafen", "studieren"], ["essen", "studieren"], ["studieren", "prüfen"] ]);
console.assert( studentenLeben.predecessors( "studieren" ).includes( "schlafen" ) );
console.assert( studentenLeben.predecessors( "studieren" ).includes( "essen" ) );

const reihenfolge = [...studentenLeben];
console.assert( [ "schlafen", "essen" ].includes( reihenfolge[0] ) );
console.assert( [ "schlafen", "essen" ].includes( reihenfolge[1] ) );
console.assert( reihenfolge[2] === "studieren" );
console.assert( reihenfolge[3] === "prüfen" );