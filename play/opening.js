import { Scenarist } from '@teatro13/scenarist';
import { cast } from './cast.js';

const prompt = '\n?maitre\n... ';

export const Opening = ( key ) => {

return function opening () {

const production = {};
const teatro = this;
const ownerScenarist = new Scenarist ();
ownerScenarist .scenario ( {

name: 'maitre',
setting: {

teatro: teatro,
key: key,
participant: {

input: process .stdin,
output: process .stdout,
error: process .stderr

},
prompt: prompt,
signature: Symbol (),
production: production,
venue: {}

},
paths: cast ( [

'script.js',
'venue.js',
'contrato.js'

] ),
establish: true

} );
ownerScenarist .display = 'maitre';

teatro .on ( 'participant', ( participant ) => {

const participantScenarist = new Scenarist ();
participantScenarist .scenario ( {

name: 'maitre',
setting: {

teatro: teatro,
participant: {

input: participant,
output: participant,
error: participant

},
prompt: prompt,
signature: Symbol (),
production: production,
venue: {}

},
paths: cast ( [

'./script.js',
'./contrato.js'

] ),
establish: true

} );
participantScenarist .display = 'maitre';

} );

};

};
