import express from 'express';
import { Server } from '@overnightjs/core';

export abstract class AbstractApplication extends Server {
    protected constructor() {
        super(process.env.NODE_ENV === 'development');
        this.setupMiddlewares();
        this.setupControllers();
    }

    public start(port: number): void {
        this.app.listen(port, () => {
            console.log(`Server listening on port: ${port}`);
        });
    }

    protected abstract setupControllers(): void

    protected setupMiddlewares() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }
}
