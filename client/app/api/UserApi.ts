import { DELETE, GET, POST, PUT } from './util/methods';

const serviceId = 'Users';

export interface UserResponse {
   id: string;
   email: string;
   firstName: string;
   lastName: string;
   initials: string;
   pictureUrl?: string | null;
   createdAt: string;
}

export interface UserCreateDTO {
   email: string;
   password: string;
   firstName: string;
   lastName: string;
   pictureUrl?: string | null;
}

export interface UserUpdateDTO {
   email: string;
   firstName: string;
   lastName: string;
   pictureUrl?: string | null;
}

export interface PasswordResetDTO {
   newPassword: string;
}

export function getAllUsers(): Promise<UserResponse[]> {
   return GET(serviceId);
}

export function getUserById(id: string): Promise<UserResponse> {
   return GET(`${serviceId}/${id}`);
}

export function createUser(data: UserCreateDTO) {
   return POST(serviceId, data);
}

export function updateUser(id: string, data: UserUpdateDTO) {
   return PUT(`${serviceId}/${id}`, data);
}

export function deleteUser(id: string) {
   return DELETE(`${serviceId}/${id}`);
}

export function resetUserPassword(id: string, data: PasswordResetDTO) {
   return POST(`${serviceId}/${id}/reset-password`, data);
}
