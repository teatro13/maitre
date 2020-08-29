#!/usr/bin/env node

'use strict';

import { argv } from './argv.js';
import Teatro from '@teatro13/teatro';
import { Opening } from './opening.js';

const options = {};
options .ws = {

host: argv .host,
port: argv .port

};

const key = options .lock = Symbol ();

const teatro = new Teatro ();

teatro .on ( 'error', ( error ) => {

process .exitCode = -1;

console .error ( '#error', '#teatro', '#code', error .code, '#message', error .message );

} );

 teatro .on ( 'open', Opening ( key ) );
/*
teatro .on ( 'close', () => {

console .log ( '#teatro #close' );
process .stdin .removeAllListeners ();
process .stdin .end ();

} );
*/
process .on ( 'SIGINT', () => {

process .exitCode = 1;

teatro .close ( key );

console .error ( '#SIGINT' );

} );

process .on ( 'exit', ( code ) => {

console .error ( '#exit', code );

} );

process .stdout .on ( 'close', () => {

console .error ( 'bye' );

teatro .close ( key );

} );

process .stdout .on ( 'error', ( error ) => {

process .exitCode = -1;

console .error ( '#error', '#stdout', '#code', error .code, '#message', error .message );

teatro .close ( key );

} );

process .stdin .on ( 'end', () => {

teatro .close ( key );

} );

teatro .open ( options );
