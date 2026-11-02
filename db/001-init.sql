CREATE TABLE customers (
  id uuid PRIMARY KEY,
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL UNIQUE,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE sessions (
  id uuid PRIMARY KEY,
  status text NOT NULL DEFAULT 'collecting',
  step text NOT NULL DEFAULT 'firstName',
  draft jsonb NOT NULL DEFAULT '{"firstName":"","lastName":"","email":""}',
  customer_id uuid REFERENCES customers(id),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE messages (
  id bigserial PRIMARY KEY,
  session_id uuid NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
  role text NOT NULL CHECK (role IN ('user', 'assistant')),
  content text NOT NULL,
  source text NOT NULL DEFAULT 'text',
  confidence real,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX messages_session_idx ON messages(session_id, id);
CREATE TABLE turn_metrics (
  id bigserial PRIMARY KEY,
  session_id uuid NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
  provider text NOT NULL,
  latency_ms integer NOT NULL,
  input_tokens integer NOT NULL DEFAULT 0,
  output_tokens integer NOT NULL DEFAULT 0,
  outcome text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
INSERT INTO customers(id, first_name, last_name, email) VALUES
('00000000-0000-4000-8000-000000000001', 'José María', 'De la Torre', 'jose.delatorre@example.com'),
('00000000-0000-4000-8000-000000000002', 'Sergio', 'Alcedo García', 'sergio.alcedo@example.com'),
('00000000-0000-4000-8000-000000000003', 'Xoán', 'O''Connor', 'xoan.oconnor@example.com'),
('00000000-0000-4000-8000-000000000004', 'Sergio', 'Alcedo García', 'sergio.trabajo@example.com');
