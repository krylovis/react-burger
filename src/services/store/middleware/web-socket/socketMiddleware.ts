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

export const socketMiddleware = (wsUrl: string): Middleware => {
  return (({ dispatch }: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return next => (action: TWSActions) => {
      const { type } = action;

      if (type === WS_CONNECTION_START) {
        socket = new WebSocket(wsUrl);
      } else if (type === WS_CONNECTION_CLOSED) {
        socket?.close(1000, WS_CONNECTION_CLOSED)
        socket = null;
      }

      if (socket) {
        socket.onopen = (event) => {
          dispatch({ type: WS_CONNECTION_SUCCESS });
        };

        socket.onmessage = ({ data }) => {
          const parsedData = JSON.parse(data);
          dispatch(setOrders(parsedData));
        };

        socket.onclose = ({ code }) => {
          dispatch({ type: WS_CONNECTION_CLOSED, payload: code.toString() });
        };

        socket.onerror = (event) => {
          dispatch({ type: WS_CONNECTION_ERROR });
        };
      }

      next(action);
    };
  }) as Middleware;
}; 
