# custom-it-server

### Schema

type Query {
  stores: [Store!]!
  store(id: String!): Store
  products: [Product!]!
  product(id: String!): Product!
  me: User
  comments: [Comment!]!
  comment(id: String!): Comment
}

type Store {
  id: ID!
  name: String!
  username: String!
  address: String!
  products: [Product!]!
}

type Product {
  id: ID!
  name: String!
  description: String!
  price: Float!
  stock: Float!
  storeId: String!
  store: Store!
  comments: [Comment!]!
  likes: Float!
  imageUrl: String!
}

type Comment {
  id: ID!
  userId: String!
  productId: String!
  text: String!
  createAt: String!
  user: User!
}

type User {
  id: ID!
  username: String!
}

type Mutation {
  createStore(data: CreateStoreInput!): Store
  updateStore(data: UpdateStoreInput!, id: String!): Store
  createProduct(data: CreateProductInput!): Product
  updateProduct(data: UpdateProductInput!, id: String!): Product!
  register(data: RegisterInput!): User
  login(data: LoginInput!): User
  logout: Boolean!
  createComment(data: CreateCommentInput!): Comment
  createLike(data: CreateLikeInput!): Like
}

input CreateStoreInput {
  name: String!
  address: String!
}

input UpdateStoreInput {
  name: String!
  address: String!
}

input CreateProductInput {
  name: String!
  description: String!
  price: Float!
  stock: Float!
}

input UpdateProductInput {
  name: String
  description: String
}

input RegisterInput {
  username: String!
  password: String!
}

input LoginInput {
  username: String!
  password: String!
}

input CreateCommentInput {
  productId: String!
  text: String!
}

type Like {
  id: ID!
  userId: String!
  productId: String!
  createAt: String!
}

input CreateLikeInput {
  productId: String!
}
