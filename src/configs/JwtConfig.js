import "./environments/LoadEnv"

const JwtConfig = {
    TOKEN_SECRET_KEY: process.env.TOKEN_SECRET_KEY,
    TOKEN_LIFE: process.env.TOKEN_LIFE,
    REFRESH_TOKEN_SECRET_KEY: process.env.REFRESH_TOKEN_SECRET_KEY,
    REFRESH_TOKEN_LIFE: process.env.REFRESH_TOKEN_LIFE,
}

export default JwtConfig
