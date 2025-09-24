CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(200) NOT NULL,
  role VARCHAR(20) NOT NULL
);

CREATE TABLE IF NOT EXISTS stocks (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  quantity INT NOT NULL,
  satuan VARCHAR(20) NOT NULL,
  price NUMERIC NOT NULL
);

CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  quantity INT NOT NULL,
  satuan VARCHAR(20) NOT NULL,
  price NUMERIC NOT NULL,
  status VARCHAR(50) DEFAULT 'Belum Diproses',
  date DATE,
  time TIME,
  driver_code VARCHAR(100),
  outlet_code VARCHAR(100)
);

-- bikin admin default (password: admin123)
INSERT INTO users (username, password, role)
VALUES ('admin', '$2b$10$2rErevLywXBTX5t5ZY4x4uYyo.768WkDgzKr3iiJBfOhYC/1x9ARS', 'admin')
ON CONFLICT (username) DO NOTHING;
