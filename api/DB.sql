CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    unique_id VARCHAR(1000),
    username VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    user_image text,
    bio VARCHAR(10000),
    auth_provider_id VARCHAR(1000),
    chats VARCHAR(1000)[],
    reset_password_token VARCHAR(1000),
    reset_password_expire TIMESTAMP,
    is_active BOOLEAN,
    time VARCHAR(1000),
    created_at TIMESTAMP DEFAULT NOW()
)

CREATE TABLE messages(
    id SERIAL PRIMARY KEY,
    unique_id VARCHAR(1000),
    sender_id VARCHAR(1000),
    receiver_id VARCHAR(1000),
    text text,
    image VARCHAR(5000),
    time VARCHAR(1000),
    created_at TIMESTAMP DEFAULT NOW()
)