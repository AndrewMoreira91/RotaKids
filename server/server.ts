import 'dotenv/config'
import app from './src/app'

app.listen(process.env.PORT, () => {
	console.log(`Server is running on http://localhost:${process.env.PORT}`)
});