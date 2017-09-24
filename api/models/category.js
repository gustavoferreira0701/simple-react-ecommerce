const category = {
    set: function set(sequelizeInstance, sequelizeDataType) {
        return sequelizeInstance.define('category', {
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
        models.category.model.hasMany(models.product.model, {
            foreignKey: 'category_id',
            sourceKey: 'id'
        });
    }
};

module.exports = category;