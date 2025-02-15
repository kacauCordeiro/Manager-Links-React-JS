module.exports = (sequelize, DataTypes) => {

    const Link = sequelize.define('Link', {
        label: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        img: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isSocial: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            default: 0
        },
    });

    Link.associate = (models) => {
        Link.belongsTo(models.Account, {foreignKey: 'accountId'})
    }
    Link.prototype.toJSON = function() {
        const values = {...this.get};
        delete values.password;
        return values;
    };
    return Link;
}