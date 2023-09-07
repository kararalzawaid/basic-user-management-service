import { Model } from 'sequelize';

export default class User extends Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        fullName: DataTypes.STRING,
        phone: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        password_recovery_hash: DataTypes.STRING
      },
      {
        sequelize,
        tableName: 'users',
        modelName: 'User',
        updatedAt: 'updated_at',
        createdAt: 'created_at'
      }
    );
  }
}
