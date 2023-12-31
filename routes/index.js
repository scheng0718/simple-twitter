const express = require('express')
const router = express.Router()
const userController = require('../controllers/user-controller')
const tweetController = require('../controllers/tweet-controller')
const apiController = require('../controllers/api-controller')
const replyController = require('../controllers/reply-controller')
const admin = require('./modules/admin')
const passport = require('../config/passport')
const upload = require('../middleware/multer')
const { authenticated } = require('../middleware/auth')
const { generalErrorHandler } = require('../middleware/error-handler')
const { getTopUsers } = require('../middleware/top-users')

router.use('/admin', admin)

// user related

router.get('/users/:id/edit', authenticated, userController.editUser)
router.put('/users/:id', authenticated, userController.putUser)
router.get('/users/:id/tweets', authenticated, getTopUsers, userController.getUserTweets)
router.get('/users/:id/followers', authenticated, getTopUsers, userController.getFollowers)
router.get('/users/:id/followings', authenticated, getTopUsers, userController.getFollowings)
router.get('/users/:id/likes', authenticated, getTopUsers, userController.getLikes)
router.get('/users/:id/replies', authenticated, getTopUsers, userController.getReplies)

// followship related
router.post('/followships', authenticated, userController.addFollowing)
router.delete('/followships/:id', authenticated, userController.deleteFollowing)

// tweet related
router.get('/tweets/:id/replies', authenticated, getTopUsers, replyController.getReplies)
router.post('/tweets/:id/replies', authenticated, replyController.postReply)
router.post('/tweets/:id/like', authenticated, userController.likeTweet)
router.post('/tweets/:id/unlike', authenticated, userController.unlikeTweet)

router.get('/signin', userController.signInPage)
router.post('/signin', passport.authenticate('local', { failureRedirect: '/signin', failureFlash: true }), userController.signIn)

router.get('/tweets', authenticated, getTopUsers, tweetController.getTweets)
router.post('/tweets', authenticated, tweetController.postTweet)
router.get('/signup', userController.signUpPage)
router.post('/signup', userController.signUp)
router.get('/logout', userController.logOut)

router.get('/api/users/:id', authenticated, apiController.apiEditUser)
router.post('/api/users/:id', authenticated, upload, apiController.apiPostUser)

router.get('/', (req, res) => { res.redirect('/tweets') })
router.use('/', generalErrorHandler)

module.exports = router
