module.exports = (sequelize,dataTypes) => {
  let name= 'Role';
  let cols= {
    id:{
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
  },
  name:{
    type: dataTypes.STRING(45),
  },
    
  };
  let config={
      tableName: "roles",
      timestamps: false
  };
  
  const Role = sequelize.define(name, cols, config);

  Role.associate = function(models){
    Role.hasMany(models.User,{
      as: "users",
      foreignKey: "role_id"
    })
  }

  return Role;
}