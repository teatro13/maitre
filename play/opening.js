import { Scenarist } from '@teatro13/scenarist';
import script from './script.js';
import venue from './venue.js';
import contrato from './contrato.js';

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
output: process .stdout

},
prompt: prompt,
signature: Symbol (),
production: production,
venue: {}

},
cast: [

script,
venue,
contrato

],
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
output: participant

},
prompt: prompt,
signature: Symbol (),
production: production,
venue: {}

},
cast: [

script,
contrato

],
establish: true

} );
participantScenarist .display = 'maitre';

} );

};

};
