import express from 'express';
import http from 'http';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import passport from "passport";
import path from 'path';

import { Server } from 'socket.io';

import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { startStandaloneServer } from '@apollo/server/standalone';

import { setupSocket } from './config/socket.js';
import { mergedResolvers, mergedTypeDefs } from './graphql/Merged.js';
import { GQL_Context } from './config/Context.js';
import { passportMiddleware, protectPassport } from './config/Passport.js';

dotenv.config();

const app = express();
const httpServer = http.createServer(app);

// 🧠 Set up Socket.IO
export const io = new Server(httpServer, {
    cors: {
        origin: 'http://localhost:5173',
    },
});

setupSocket(io);

// 🚀 Apollo GraphQL Server
const apolloServer = new ApolloServer({
    typeDefs: mergedTypeDefs,
    resolvers: mergedResolvers,
    cors: {
        origin: 'http://localhost:5173',
        credentials: true
    },

    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});


await apolloServer.start();
  
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(cookieParser());
app.use(express.json({ limit: '50mb' }));
app.use('/graphql', protectPassport, expressMiddleware(apolloServer, {
    context: GQL_Context,
}));

// Passport JS
app.use(passport.initialize());

app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get(
    "/auth/google/callback",
    passport.authenticate("google", {
        failureRedirect: "/login",
        session: false,
    }),
    passportMiddleware
);

const PORT = process.env.PORT;
  
httpServer.listen(PORT, () => {
    console.log(`🚀 GraphQL: http://localhost:${PORT}/graphql`);
    console.log(`⚡ Socket.IO running on port ${PORT}`);
});

// Deployment setup
const __dirname = path.resolve();

if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, '../client', 'dist', 'index.html'));
    });
}


// const { url } = await startStandaloneServer(apolloServer);
// console.log(`🚀 Server ready at ${url}`);