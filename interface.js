/**
 * User Interface
 * Defines the structure and types for User entities
 */

const UserInterface = {
  id: 'UUID',
  name: 'String',
  email: 'String',
  password: 'String (hashed)',
  created_at: 'Date',
  updated_at: 'Date',
  deleted_at: 'Date | null'
};

module.exports = UserInterface;
