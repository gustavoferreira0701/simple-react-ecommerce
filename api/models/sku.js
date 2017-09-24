const sku = {
    set: function set(sequelizeInstance, sequelizeDataType) {
        return sequelizeInstance.define('sku', {
            id: {
                type: sequelizeDataType.BIGINT,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            product_id: {
                type: sequelizeDataType.BIGINT,
                allowNull: false
            },
            color:{
                type: sequelizeDataType.STRING,
                allowNull: true
            },
            weight:{
                type:sequelizeDataType.DECIMAL,
                allowNull: true
            },
            width:{
                type:sequelizeDataType.DECIMAL,
                allowNull: true
            },
            height:{
                type:sequelizeDataType.DECIMAL,
                allowNull: true
            },
            length:{
                type:sequelizeDataType.DECIMAL,
                allowNull: true
            },
            price:{
                type:sequelizeDataType.DECIMAL,
                allowNull: true
            }
        });
    },
    bind:(models)=>{
        models.sku.model.belongsToMany(models.basket.model, {
            through:models.sku_basket,
            foreignKey: 'basket_id',
            otherKey: 'sku_id'
        });
    }
};

module.exports = sku;