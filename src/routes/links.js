const express = require ('express');
const router = express.Router();
const pool = require ('../database');
const { isLoggedIn } = require ('../lib/auth'); 

router.get('/add', isLoggedIn,  (req, res) =>{

    res.render('links/add');

});

router.post('/add', async(req, res) =>{

    const {title, url, description} = req.body;
    const  user_id  = req.user.id;

    const newLink = {
        title,
        url,
        description,
        user_id
    };

    await pool.query('INSERT INTO links set ?', [newLink]);
    req.flash('success', 'link guardado correctamente');
    res.redirect('/links');

});


router.get('/', isLoggedIn, async (req,res)=>{

    const links = await pool.query('SELECT * FROM links WHERE user_id = ?', [req.user.id]);
    res.render('links/list', { links });


});


router.get('/delete/:id', isLoggedIn, async (req, res) =>{

    console.log(req.params.id);
    const { id } = req.params;
    await pool.query('DELETE FROM links WHERE id = ?', [id]);
    req.flash('success', 'Link Eliminado Correctamente');
    res.redirect('/links');


});


router.get('/edit/:id', isLoggedIn, async (req, res) => {

    const { id } = req.params;
    const links = await pool.query('SELECT * FROM links WHERE id = ?', [id]);
    res.render('links/edit', {link: links[0]});   

});


router.post('/edit/:id', async (req, res)=>{

    const { id } = req.params;
    const { title, url, description } = req.body;
    const newLink = { title, url, description };
    console.log(newLink);
    await pool.query('UPDATE links  SET ? WHERE id = ?', [newLink, id]);
    req.flash('success', 'Link Editado Correctamente');
    res.redirect('/links');
});



module.exports = router;