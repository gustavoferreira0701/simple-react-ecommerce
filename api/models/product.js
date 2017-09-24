const product = {
    set: function set(sequelizeInstance, sequelizeDataType) {
        return sequelizeInstance.define('product', {
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
            brand_id:{
                type: sequelizeDataType.BIGINT,
                allowNull: false
            },
            category_id:{
                type: sequelizeDataType.BIGINT,
                allowNull: false
            }
        });
    },
    bind:(models)=>{        
        models.product.model.hasMany(models.sku.model, {
            foreignKey: 'product_id',
            sourceKey: 'id'
        });
    }
};

module.exports = product;