import "dotenv/config"
interface envObject {
    port: number,
    dbURL: string,
    salt: string 
}
function getEnvString(key:string): string {
    const value = process.env[key]
    if (!value) {
        throw new Error(`Environment variable ${key} is not defined`);
      }
    return value
}
const env: envObject = {
    port: parseInt(getEnvString("PORT")),
    dbURL: getEnvString("DB_URL"),
    salt: getEnvString("SALT")
}

export { env, getEnvString }