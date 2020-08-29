const play = {};
export default play;

export const establishment = play .establishment = function establishment () {

const { teatro, scenarist, participant } = this;
let { prompt } = scenarist .setting;

participant .input .setEncoding ( 'utf8' );
participant .output .setEncoding ( 'utf8' );

participant .output .write ( prompt );

participant .input .on ( 'error', ( error ) => {

participant .output .write ( `\n#error ${ error .trim () }\n` );

} );

participant .input .on ( 'data', ( line ) => {

line = line .trim () .split ( ' ' );

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

if ( message )
if ( typeof message === 'string' )
participant .output .write ( `\n${ message .trim () }\n` );

else
participant .output .write ( message );

return;

} )
.catch ( ( error ) => {

if ( typeof error === 'string' )
participant .output .write ( `\n${ error .trim () }\n` );

else if ( error instanceof Error )
participant .output .write ( `\n#error ${ error .message .trim () }\n` );

} )
.finally ( () => {

let { prompt } = scenarist .setting;

participant .output .write ( prompt );

} );

} );

teatro .on ( 'close', () => {

//participant .input .removeListener ( 'data', action );
participant .input .removeAllListeners ( 'data' );
participant .input .pause ();
//participant .input .end ();

} );

};
