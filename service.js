const User = require('./model');
const { CreateUserDTO, UpdateUserDTO, UserResponseDTO } = require('./dto');
const { generateToken } = require('../../utils/jwt');
const { Op } = require('sequelize');

class UserService {
  async createUser(userData) {
    const createDTO = new CreateUserDTO(userData);
    const user = await User.create(createDTO);
    return new UserResponseDTO(user);
  }

  async getUserById(id) {
    const user = await User.findOne({
      where: { 
        id,
        deleted_at: null
      }
    });
    
    if (!user) {
      const error = new Error('User not found');
      error.statusCode = 404;
      throw error;
    }
    
    return new UserResponseDTO(user);
  }

  async getAllUsers(page = 1, limit = 10) {
    const offset = (page - 1) * limit;
    
    const { count, rows } = await User.findAndCountAll({
      where: { deleted_at: null },
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['created_at', 'DESC']]
    });

    return {
      users: rows.map(user => new UserResponseDTO(user)),
      pagination: {
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(count / limit)
      }
    };
  }

  async updateUser(id, userData) {
    const user = await User.findOne({
      where: { id, deleted_at: null }
    });
    
    if (!user) {
      const error = new Error('User not found');
      error.statusCode = 404;
      throw error;
    }

    const updateDTO = new UpdateUserDTO(userData);
    await user.update(updateDTO);
    return new UserResponseDTO(user);
  }

  async deleteUser(id) {
    const user = await User.findOne({
      where: { id, deleted_at: null }
    });
    
    if (!user) {
      const error = new Error('User not found');
      error.statusCode = 404;
      throw error;
    }

    // Soft delete
    await user.update({ deleted_at: new Date() });
    return { message: 'User deleted successfully' };
  }

  async login(email, password) {
    const user = await User.findOne({
      where: { email, deleted_at: null }
    });

    if (!user) {
      const error = new Error('Invalid email or password');
      error.statusCode = 401;
      throw error;
    }

    const isPasswordValid = await user.comparePassword(password);
    
    if (!isPasswordValid) {
      const error = new Error('Invalid email or password');
      error.statusCode = 401;
      throw error;
    }

    const token = generateToken({
      id: user.id,
      email: user.email,
      name: user.name
    });

    return {
      user: new UserResponseDTO(user),
      token
    };
  }
}

module.exports = new UserService();
