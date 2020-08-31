import { createInterface } from 'readline';

const play = {};
export default play;

export const establishment = play .establishment = function establishment () {

const { teatro, scenarist, participant } = this;
let { prompt } = scenarist .setting;

participant .input .setEncoding ( 'utf8' );
participant .output .setEncoding ( 'utf8' );

const cli = createInterface ( {

input: participant .input,
output: participant .output,
prompt: prompt

} );

participant .input .on ( 'error', ( error ) => {

cli .removeAllListeners ();
cli .close ();

participant .output .write ( `\n#error ${ error .trim () }\n` );

} );

cli .on ( 'line', ( line ) => {

line = line .trim ();

if ( ! line )
return;

line = line .split ( ' ' );

if ( line .length === 0 )
return;

const script = {

event: line [ 0 ],
action: line [ 1 ],
details: {

participant: participant,
argument: line .splice ( 2 ) .join ( ' ' )

}

};

scenarist .play ( script )
.then ( ( message ) => {

cli .setPrompt ( scenarist .setting .prompt );
cli .prompt ();

if ( typeof message === 'string' )
cli .write ( `${ message .trim () }\n` );

} )
.catch ( ( error ) => {

if ( typeof error === 'string' )
participant .output .write ( `\n${ error .trim () }\n` );

else if ( error instanceof Error )
participant .output .write ( `\n#error ${ error .message .trim () }\n` );

cli .setPrompt ( scenarist .setting .prompt );
cli .prompt ();

} );

} );

cli .prompt ();
cli .write ( '#maitre #ready\n' );

};
