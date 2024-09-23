import fs from "fs"
import path from "path"
import { Express } from "express"

//Singleton pattern 
class RoutesConfig {
    static #instance: RoutesConfig
    private constructor(){}
    public static getInstance(): RoutesConfig{
        if(!RoutesConfig.#instance) 
            RoutesConfig.#instance = new RoutesConfig()
        return RoutesConfig.#instance
    }
    registerRoutes(app: Express){
        const base_dir: string = path.join(process.cwd() + "/routes/")
        // if file exists then
        const files: string[] = fs.readdirSync(base_dir)
        files.forEach(file => {
            const filePath: string = path.join(base_dir, file)
            const fileStat: fs.Stats = fs.lstatSync(filePath)
            if (filePath.endsWith(".ts") && fileStat.isFile()) 
                require(filePath)(app)
            //  else 
            //     throw new Error("Error in Routes Folder. There should be a .js file and n't have folder")
        })

    }   

}

const Routes = RoutesConfig.getInstance()
export default Routes