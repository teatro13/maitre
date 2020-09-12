import { Scenarist } from '@teatro13/scenarist';
import { argv } from './argv.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath ( import .meta .url );
const __dirname = dirname ( __filename );

/*
import script from './script.js';
import venue from './venue.js';
import contrato from './contrato.js';
*/

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
paths: [

'script.js',
'venue.js',
'contrato.js'

] .map ( ( path ) => {

return `${ __dirname }/${ path }`;

} )
.concat ( argv .paths ?
argv .paths .map ( ( path ) => {

return `${ process .cwd () }/${ path }`;

} ) : [] ),
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
