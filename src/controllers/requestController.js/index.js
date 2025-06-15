const logger = require("../../utils/logger")
const { DB } = require("../../../models")


const sendingRequest = async (params) => {
   try {
     if(!params){
         logger.error('params not found');
         throw new Error('params not found');
         return
     }
     if(!params.toUserId || !params.fromUserId || !params.status){
         logger.error('params not found', params);
         throw new Error('params not found');
         return
     }
     if(params.toUserId == params.fromUserId){
         logger.error('fromUserId and toUserId can not be same', params);
         throw new Error('You can not send request to yourself');
         return
     }
     const [ request , created] = await DB.connectionRequest.findOrCreate({
         where : {
            receiverId : params.toUserId,
         senderId : params.fromUserId,
         status : params.status
         },
         defaults : {
            // receiverId : params.toUserId,
            // senderId : params.fromUserId,
            // status : params.status
         }
     })
     if(!created){
         logger.error('request already exist', params);
         throw new Error('request already exist');
     }
     return { success : true , data : request , message : 'request sent successfully' }
   } catch (error) {
    logger.error(error, params);
    return { success : false , message :  error.message }
   }
}

module.exports = {
    sendingRequest
}