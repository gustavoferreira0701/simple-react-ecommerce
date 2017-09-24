const user = {
    set: function set(sequelizeInstance, sequelizeDataType) {
        return sequelizeInstance.define('user', {
            id: {
                type: sequelizeDataType.BIGINT,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            name: {
                type: sequelizeDataType.STRING,
                allowNull: false
            },
            email:{
                type: sequelizeDataType.STRING,
                allowNull: false
            },
            password:{
                type: sequelizeDataType.STRING,
                allowNull: false
            },
            birth_date:{
                type: sequelizeDataType.DATEONLY,
                allowNull: false
            },
            sex:{
                type: sequelizeDataType.STRING,
                allowNull: false
            }
        });
    },
    bind:(models)=>{
        models.user.model.hasMany(models.basket.model, {
            foreignKey: 'user_id',
            sourceKey: 'id'
        });
    }
};

module.exports = user;