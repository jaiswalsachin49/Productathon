from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    SECRET_KEY: str = "hackathon-secret-key-change-in-prod-if-missing"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 1440 # 24 hours

    class Config:
        env_file = ".env"
        extra = "ignore"

settings = Settings()
