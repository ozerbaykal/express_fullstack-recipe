import fs from "fs";

//Json dosyasının içeriğini okur ve döndürür
export const readRecipes = async () => {
    try {
        const text = await fs.readFileSync("../data.json", "utf-8")

        const data = JSON.parse(text);

        return data

    } catch (error) {
        console.log(data)
    }
}
// param olarak aldığı veriyi json dosyasına yazar
export const writeRecipes = (data) => {

    try {
        const text = fs.writeFileSync("../data.json", JSON.stringify(data))

    } catch (error) {
        console.log(data)
    }

}

