import express from 'express';

/// <reference types="node" />

declare global {
    namespace Server {
        export interface ResponseBody<T = any> {
            data?: T;
            error?: string;
        }

        export interface Request<Body = any, Params = any> extends express.Request<Params> {
            body: Body;
        }

        export interface Response extends express.Response {
            json: (body?: ResponseBody) => this;
        }
    }
}

export {};
