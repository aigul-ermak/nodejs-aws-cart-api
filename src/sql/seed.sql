CREATE TABLE carts (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  status VARCHAR(10) CHECK (status IN ('OPEN', 'ORDERED')) NOT NULL
);

-- Create cart_items table
CREATE TABLE cart_items (
  cart_id UUID REFERENCES carts(id),
  product_id UUID NOT NULL,
  count INTEGER NOT NULL
);

INSERT INTO carts (id, user_id, status)
VALUES (
  '11111111-1111-1111-1111-111111111111',
  '22222222-2222-2222-2222-222222222222',
  'OPEN'
);

INSERT INTO cart_items (cart_id, product_id, count)
VALUES (
  '11111111-1111-1111-1111-111111111111',
  '33333333-3333-3333-3333-333333333333',
  3
);