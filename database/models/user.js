module.exports = (sequelize,dataTypes) => {
  let name= 'User';
  let cols= {
    id:{
        type: dataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    firstName:{
      type: dataTypes.STRING(45),
    },
    lastName:{
      type: dataTypes.STRING(45),
    },
    email:{
      type: dataTypes.STRING(45),
      allowNull: false,
      unique: true
    },
    password:{
      type: dataTypes.STRING(250),
      allowNull: false
    },
    role_id:{
      type: dataTypes.INTEGER,
      allowNull: false
    },
    image:{
      type: dataTypes.STRING(250),
    },
    phone:{
      type: dataTypes.STRING(45)
    },
  };
  let config={
      tableName: "users",
      timestamps: false
  };

  const User = sequelize.define(name, cols, config);
  
  User.associate = function(models){
    User.belongsTo(models.Role,{
      as: "roles",
      foreignKey: "role_id"
    }),
    User.hasMany(models.Sale,{
      as: "sales",
      foreignKey: "user_id"
    }),
    User.hasOne(models.Cart,{
      as: "carts",
      foreignKey: "user_id"
    }),
    User.hasMany(models.Direction,{
      as: "directions",
      foreignKey: "user_id"
    })
  }

  return User;
}