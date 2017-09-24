const basket_state = {
    set: (sequelizeInstance, sequelizeDataType) => {
        return sequelizeInstance.define('basket_state', {
            id: {
                type: sequelizeDataType.INTEGER,
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
        models.basket_state.model.hasMany(models.basket.model, {
            foreignKey: 'state_basket_id',
            sourceKey: 'id'
        });
    }
};

module.exports = basket_state;