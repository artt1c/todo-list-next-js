export interface ICollaborator {
  uid: string;
  email: string;
  role: "admin" | "viewer";
}