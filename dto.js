/**
 * Data Transfer Objects for User module
 */

class CreateUserDTO {
  constructor(data) {
    this.name = data.name;
    this.email = data.email;
    this.password = data.password;
  }
}

class UpdateUserDTO {
  constructor(data) {
    if (data.name !== undefined) this.name = data.name;
    if (data.email !== undefined) this.email = data.email;
    if (data.password !== undefined) this.password = data.password;
  }
}

class UserResponseDTO {
  constructor(user) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.created_at = user.created_at;
    this.updated_at = user.updated_at;
  }
}

class LoginDTO {
  constructor(data) {
    this.email = data.email;
    this.password = data.password;
  }
}

module.exports = {
  CreateUserDTO,
  UpdateUserDTO,
  UserResponseDTO,
  LoginDTO
};
