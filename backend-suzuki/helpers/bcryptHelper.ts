"use strict" 
import "dotenv/config"
import bcrypt from "bcryptjs"
import { getEnvString } from "../config/default"

// Singleton Pattern
class bcryptSingleton { // private properties for not to set salt from anyway else in project
    salt:string
    static #instance: bcryptSingleton
    private constructor() {
        this.salt = getEnvString("SALT")
    }

    public static getInstance(): bcryptSingleton {
        if (!bcryptSingleton.#instance)
            bcryptSingleton.#instance = new bcryptSingleton();
        return bcryptSingleton.#instance;
    }
    async encrypt(password: string): Promise<string> {
        const saltRounds:number = 12
        // Generate salt
        const serverSalt: string = await bcrypt.genSalt(saltRounds);

        // Combine server-generated salt with user-defined salt
        const combinedSalt: string = serverSalt + this.salt;
        const hashedPassword:string = await bcrypt.hash(password, combinedSalt)
        return hashedPassword
    }
    async decrypt(password: string, hash:string): Promise<boolean> {
        const result: boolean = await bcrypt.compare(password, hash)
        return result
    }
    public validateEmail(email: string): boolean{
        const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    public validatePassword(password: string): boolean{
        const passwordRegex: RegExp = /^(?=.*[a-zA-Z]).{6,}$/;
        return passwordRegex.test(password);
    }
}

const bcryptHelpers = bcryptSingleton.getInstance()
export default bcryptHelpers
