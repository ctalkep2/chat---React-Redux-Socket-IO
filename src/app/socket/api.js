import openSocket from 'socket.io-client';
import { store } from '../store/store';
import { connect } from "react-redux";

export const socket = openSocket('http://localhost:8081');
// export const socket = openSocket('https://ambiguous-education-1.glitch.me');

export { };