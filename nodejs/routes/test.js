const router = require('express').Router({mergeParams: true});
module.exports = router;

/*** ----controllers---- */
const test = require('../controller/test');
// const customerDetail = require('../controller/customerDetail');
const User = require('../controller/user');
const Room = require('../controller/rooms');
const Manager = require('../controller/manager');
const BookRoom = require('../controller/bookedrooms');
// /** ----route---- */
router.post('/test', test.sample);//**** DUMMY *****//

/**----Manager Details----- */
router.post('/managerDetail', Manager.createManager);
router.get('/managerDetail', Manager.getManager);

/** -----User details----- */
router.post('/userSignUp', User.createUser);
router.post('/userSignIn', User.userSignIn);
router.put('/userupdate', User.userUpdate);
router.delete('/userDelete', User.userDelete);

/**----Rooms Details----*/
router.post('/roomDetail', Room.addRooms);
router.get('/roomDetail', Room.getRoomDetail);
router.put('/roomDetail', Room.updateRoomDetail);
router.delete('/roomDetail', Room.deleteRoomDetail);

/**----booked rooms---- */
router.post('/bookRoom', BookRoom.createBooking);
router.get('/bookRoom', BookRoom.checkBooking);
router.put('/bookRoom', BookRoom.updateBooking);
router.delete('/bookRoom', BookRoom.deleteBooking);

/**For room images */
router.post('/roomImages', Room.createUpload);
router.delete('/roomImages', Room.deleteUpload);

/**-----update status either acceptance or rejection by manager----- */
router.put('/updateStatus', Manager.updateStatus);
