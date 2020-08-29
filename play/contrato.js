const play = {};
export default play;

export const character = play .character = {};
character .events = [ 'contrato', '#contrato' ];
character .action = function action ( script, cue, blooper ) {

const { scenarist, teatro, key, production, venue, signature } = this;
const { participant, argument } = script .details;
let stamp;

switch ( script .action ) {

case 'start':
case 'new':

if ( ! argument || ! production [ argument ] )
return blooper (
new ReferenceError ( 'Play does not exist' )
);

const playKey = teatro .host ( production [ argument ] ( {} ), signature );

if ( ! playKey )
return blooper (
new Error ( 'Could not host Play on Teatro' )
);

stamp = teatro .issue ( playKey );

venue [ stamp ] = playKey;

cue ( `#maitre #stamp ${ stamp }` );

break;

case 'play':

const ticket = teatro .retrieve ( argument );

if ( ! ticket )
return blooper ( '#maitre #ticket undefined' );

teatro .play (
participant,
ticket,
scenarist, cue, blooper
);

break;

case 'end':

if ( teatro .end ( venue [ argument ], signature ) )
cue ( `#maitre #end ${ argument } ${ delete venue [ argument ] }` );

return blooper ( `#maitre #end ${ argument } false` );

case 'issue':

stamp = teatro .issue ( venue [ argument ] );

cue ( `#maitre #stamp ${ stamp }` );

case 'cancel':

if ( teatro .cancel ( argument, signature ) )
cue ( `#maitre #cancel ${ argument } true` );

return blooper ( `#maitre #cancel ${ argument } false` );

default:

return blooper ( '#maitre #order false\n' );

}

};
