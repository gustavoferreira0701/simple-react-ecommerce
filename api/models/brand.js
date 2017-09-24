const brand = {
    set: function set(sequelizeInstance, sequelizeDataType) {
        return sequelizeInstance.define('brand', {
            id: {
                type: sequelizeDataType.BIGINT,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            name: {
                type: sequelizeDataType.STRING,
                allowNull: false
            }
        });
    },
    bind:(models)=>{
        models.brand.model.hasMany(models.product.model, {
            foreignKey: 'state_basket_id',
            sourceKey: 'id'
        });
    }
};

module.exports = brand;