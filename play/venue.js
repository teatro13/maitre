const play = {};
export default play;

const character = play .character = {};
character .events = [ 'venue' ];
character .action = function action ( script, cue, blooper ) {

const { scenarist, teatro, key, venue, production, signature } = this;
const { participant, argument } = script .details;

switch ( script .action ) {

case 'produce':

if ( ! argument || venue [ argument ] )
return blooper ( 
new ReferenceError ( 'Missing Play argument' )
);

import ( process .cwd () + '/' + argument )
.then ( ( { Play } ) => {

if ( typeof Play !== 'function' )
return blooper (
new TypeError ( "Play is not of type 'function'" )
);

production [ argument ] = Play;


return cue ();

} )
.catch ( ( error ) => {

return blooper ( error );

} );

break;

case 'close':

teatro .close ( key );

return;

default:

return cue ( '#order false\n' );

}

};
