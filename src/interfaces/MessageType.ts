interface Message {
  id: string; // Mesajın unique ID-si
  chatId: string; // Hansı chat-ə aid (foreign key)
  role: "user" | "assistant"; // Kim yazıb
  content: string; // Mətn məzmunu
  timestamp: number; // Nə vaxt göndərilib
  isThinking?: boolean; // Think mode aktiv?
  editedAt?: number; // Edit olunubsa
  reaction?: "like" | "dislike"; // User feedback
}
