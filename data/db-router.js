const express = require('express');
const DB = require('./db');
const router = express.Router();

router.get('/posts', (req, res) => {
    DB.find(req.query)
    .then(data => {
        res.status(200).json(data)
    })
    .catch(err => {
        res.status(500).json({
            error: "The posts information could not be retrieved."
        })
    })
})

router.get('/posts/:id', (req, res) => {
    DB.findById(req.params.id)
    .then(data => {
        if(data){
            res.status(200).json(data)
        }else{
            res.status(404).json({
                message: "The post with the specified ID does not exist."
            })
        }
    })
    .catch(err => {
        res.status(500).json({
            error: "The post information could not be retrieved."
        })
    })
    
})

router.get('/posts/:id/comments', (req, res) => {
    DB.findCommentById(req.params.id)
    .then(data => {
        if(data){
            res.status(200).json(data)
        }else {
            res.status(404).json({
                message: "The post with the specified ID does not exist."
            })
        }
    })
    .catch(err => {
        res.status(500).json({
            error: "The comments information could not be retrieved." 
        })
    })
})

router.post('/posts', (req, res) => {
    DB.insert(req.body)
    .then(post => {
        if(!post.title || !post.content){
            res.status(404).json({
                errorMessage: "Please provide title and contents for the post."
            })
        }else{
            res.status(201).json(post)        }
    })
    .catch(err => {
        res.status(500).json({
            error: "There was an error while saving the post to the database"
        })
    })
})

router.post('/posts/:id/comments', (req, res) => {
    const changes = req.body;

    DB.insertComment(req.params.id, changes)
    .then(post => {
        if(!post.id){
            res.status(404).json({
                message: "The post with the specified ID does not exist." 
            })
        } else if (!post.text){
            res.status(400).json({
                errorMessage: "Please provide text for the comment."
            })
        } else {
            res.status(201).json(post)
        }
    })
    .catch(err => {
        res.status(500).json({
            error: "There was an error while saving the comment to the database"
        })
    })
})

router.delete('/posts/:id', (req, res) => {
    DB.remove(req.params.id)
    .then(post => {
        if(!post.id){
            res.status(404).json({
                message: "The post with the specified ID does not exist."
            })
        }else {
            res.status(200).json({
                message: "Post has been removed."
            })
        }
    })
    .catch(err => {
        res.status(500).json({
            error: "The post could not be removed"
        })
    })
})

router.put('/posts/:id', (req, res) => {
    const changes = req.body;
    DB.update(req.params.id, changes)
    .then(post => {
        if(!post.id){
            res.status(404).json({
                message: "The post with the specified ID does not exist." 
            })
        }else if(!post.title || !post.contents) {
            res.status(404).json({
                errorMessage: "Please provide title and contents for the post."
            })
        } else {
            res.status(200).json(post)
        }
    })
    .catch(err => {
        res.status(500).json({
            error: "The post information could not be modified."
        })
    })

})

module.exports = router;