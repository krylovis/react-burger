import { Middleware, MiddlewareAPI } from "redux";
import { RootState, AppDispatch } from "../../index";
import { setOrders } from "../../slices/orders/orders.slice";
import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_START,
  WS_SEND_MESSAGE,
  WS_GET_MESSAGE,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  TWSActions
} from "./types";

export const socketMiddleware = (): Middleware => {
  return (({ dispatch }: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return next => (action: { type: string, payload: string }) => {
      const { type, payload } = action;

      if (type === WS_CONNECTION_START) {
        socket = new WebSocket(payload);
      }

      if (socket) {
        socket.onopen = (event) => {
          dispatch({ type: WS_CONNECTION_SUCCESS });
        };

        socket.onmessage = ({ data }) => {
          const parsedData = JSON.parse(data);
          dispatch(setOrders({ data: parsedData }));
        };

        socket.onclose = ({ code }) => {
          dispatch({ type: WS_CONNECTION_CLOSED, payload: code.toString() });
        };

        socket.onerror = (event) => {
          dispatch({ type: WS_CONNECTION_ERROR });
        };

        console.log('type', type);
        if (type === WS_CONNECTION_CLOSED) {
          socket.close(1000, WS_CONNECTION_CLOSED);
          socket = null;
        }
      }

      next(action);
    };
  }) as Middleware;
}; 
