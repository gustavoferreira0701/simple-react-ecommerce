const sku_basket = {
    set: function set(sequelizeInstance, sequelizeDataType) {
        return sequelizeInstance.define('sku_basket', {
            id: {
                type: sequelizeDataType.BIGINT,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            sku_id: {
                type: sequelizeDataType.BIGINT,
                allowNull: false
            },
            basket_id: {
                type: sequelizeDataType.BIGINT,
                allowNull: false
            }
        });
    },
    bind:()=>{}
};

module.exports = sku_basket;