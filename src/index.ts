import app from './app';

const port = 3000;
app.listen(port, () => {
    return console.log(`Express is listening on port: ${port} - testing`);
});
