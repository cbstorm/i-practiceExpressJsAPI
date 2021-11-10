require('dotenv').config();
const http = require('http');
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 9000;
const cors = require('cors');
const corsOptions = require('./config/cors_options.config');
const connectDB = require('./config/db.config');
const GlobalErrorHandler = require('./helpers/handleError');

// ROUTERS
const authRouters = require('./routers/auth.routers');
const practiceRouters = require('./routers/practice.routers');
const questionRouters = require('./routers/question.routers');
const recordRouters = require('./routers/record.routers');
const profileRouters = require('./routers/profile.routers');
const classRouters = require('./routers/class.routers');
const discussionRouters = require('./routers/discussion.routers');
const notificationRouters = require('./routers/notification.routers');
const relationshipRouters = require('./routers/relationship.routers');
const searchRouters = require('./routers/search.routers');

const { SpringApiTestConnection } = require('./config/springApiTestConnection');

// WS CONFIGS
const {
    socketAuthMiddleware,
} = require('./middlewares/socket.auth.middleware');
const { Server } = require('socket.io');
const io = new Server(server, {
    cors: {
        origin: '*',
    },
});

// WS SERVICES
const {
    practiceDiscussion,
} = require('./wsServices/practiceDiscussion.wsservice');
const { relationship } = require('./wsServices/relationship.wsservice');
const { donePractice } = require('./wsServices/donePractice.wsservice');
const { classWsService } = require('./wsServices/class.wsservice');

// CONNECTDB
connectDB();
SpringApiTestConnection();

app.use(cors(corsOptions));
//Logger
app.use(morgan('dev'));
// Serve static file
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.use('/api/auth', authRouters);
app.use('/api/profile', profileRouters);
app.use('/api/practice', practiceRouters);
app.use('/api/question', questionRouters);
app.use('/api/record', recordRouters);
app.use('/api/class', classRouters);
app.use('/api/discussion', discussionRouters);
app.use('/api/notification', notificationRouters);
app.use('/api/relationship', relationshipRouters);
app.use('/api/search', searchRouters);

app.get('/', (req, res) => {
    res.json('hello');
});

app.use(GlobalErrorHandler);

io.use(socketAuthMiddleware);

io.on('connection', (socket) => {
    donePractice(io, socket);
    practiceDiscussion(io, socket);
    relationship(io, socket);
    classWsService(io, socket);
    socket.on('socketDisconnect', () => {
        setTimeout(() => socket.disconnect(true), 2500);
    });
});

server.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`);
});
