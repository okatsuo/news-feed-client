export type Post = {
  id: string
    text: string
    imageUrl: string
    user: {
      id: string
      name: string
      picture: string
    }
    created_at: Date
    updated_at: Date
}