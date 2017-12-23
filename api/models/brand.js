const brand = {
    set: function set(sequelizeInstance, sequelizeDataType) {
        let obj= sequelizeInstance.define('brand', {
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

        return obj;
    },
    bind:(models)=>{
        models.brand.model.hasMany(models.product.model, {
            foreignKey: 'brand_id',
            sourceKey: 'id'
        });
    }
};

module.exports = brand;