import express from "express";
import cors from "cors";
import recipeRouter from "./routes/recipeRoutes.js";


//express kurulumu
const app = express();
const port = 4004;

//cors hatalarını önleyen mw (oto header ekler)
app.use(cors());


//bodydeki json verilerini çeviren mw
app.use(express.json());

//tarifler için crud operasyonalarını gerçekleştireceğimiz endpointleri tanımla

app.use(recipeRouter)










//dinlenecek portu belirle
app.listen(port, () => {
    console.log(`Server ${port} portunda çalışmaya başladı`)
})