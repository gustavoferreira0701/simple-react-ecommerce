const basket = {
    set: function set(sequelizeInstance, sequelizeDataType) {
        return sequelizeInstance.define('basket', {
            id: {
                type: sequelizeDataType.BIGINT,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            user_id:{
                type: sequelizeDataType.BIGINT,
                allowNull: false
            },
            state_basket_id:{
                type: sequelizeDataType.INTEGER,
                allowNull: false
            },
            name: {
                type: sequelizeDataType.STRING,
                allowNull: true
            }
        });
    },
    bind:(models)=>{
        
    }
};

module.exports = basket;