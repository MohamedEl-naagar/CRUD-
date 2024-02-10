import express from 'express';
import user from './src/modules/User/user.routes.js'
import note from './src/modules/Note/note.routes.js';
const app = express();
app.use(express.json())


app.use('/users',user)
app.use('/notes',note)

app.listen(3000, () => {
  console.log('Server is started on port 3000');
});
