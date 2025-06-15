const { Model } = require('sequelize');

module.exports = ( sequelize , DataTypes ) =>{
    class connectionRequest extends Model{
       static associate(models){
            connectionRequest.belongsTo(models.user,{
                foreignKey: 'senderId',
                as: 'sender'
            } );
            connectionRequest.belongsTo(models.user,{
                foreignKey: 'receiverId',
                as: 'receiver'
            })
       }
    }

    connectionRequest.init({
        senderId :{
            type : DataTypes.INTEGER,
            allowNull : false,
            references:{
                model: 'user',
                key: 'id',
            },
            onDelete : 'CASCADE',
            onUpdate : 'CASCADE'
        },
        receiverId :{
            type : DataTypes.INTEGER,
            allowNull : false,
            references:{
                model: 'user',
                key: 'id',
            },
            onDelete : 'CASCADE',
            onUpdate : 'CASCADE'
        },
        status :{
            type: DataTypes.ENUM('ignore', 'interested', 'accepted', 'rejected'),
            allowNull: false,
            validate: {
                isIn: {
                    args : [['ignore', 'interested', 'accepted', 'rejected']],
                    msg : 'invalid status'
                }
            }
        },
    },
    {
        sequelize,
        modelName : 'connectionRequest',
        tableName : 'connectionRequests',
        timestamps : true,
        indexes : [
            {
                name : 'connectionRequests_senderId_receiverId_status_idx',
                unique : false,
                fields : ['senderId', 'receiverId', 'status']
            },
        ]
    })
    return connectionRequest
}

